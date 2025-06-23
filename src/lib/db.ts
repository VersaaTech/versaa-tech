import { Pool } from 'pg';

// Production-safe logging
const isDevelopment = process.env.NODE_ENV === 'development';
const log = {
  info: (message: string, ...args: unknown[]) => {
    if (isDevelopment) console.log(message, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(message, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(message, ...args);
  }
};

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create a connection pool for better performance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  max: process.env.NODE_ENV === 'production' ? 20 : 10, // More connections in production
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  statement_timeout: 30000, // 30 second query timeout
});

// Set search path for all connections
pool.on('connect', async (client) => {
  try {
    // Set search path to include common schemas
    await client.query('SET search_path TO public, "$user"');
    log.info('✅ Search path set for connection');
  } catch (error) {
    log.error('❌ Error setting search path:', error);
  }
});

// Connection event handlers
pool.on('connect', () => {
  log.info('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  log.error('❌ PostgreSQL connection error:', err);
});

// Test database connection on startup
async function testConnection() {
  try {
    const client = await pool.connect();
    log.info('🔄 Testing database connection...');
    
    // Test basic connection
    const result = await client.query('SELECT NOW()');
    log.info('✅ Database connection successful:', result.rows[0]);
    
    if (isDevelopment) {
      // Only run detailed diagnostics in development
      const dbInfo = await client.query('SELECT current_database(), current_schema(), current_user');
      log.info('📋 Database info:', dbInfo.rows[0]);
      
      const searchPath = await client.query('SHOW search_path');
      log.info('📋 Search path:', searchPath.rows[0]);
      
      const tables = await client.query(`
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname NOT IN ('information_schema', 'pg_catalog')
        ORDER BY schemaname, tablename
      `);
      log.info('📋 Available tables:', tables.rows);
      
      const jobsCheck = await client.query(`
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE tablename = 'jobs'
      `);
      log.info('📋 Jobs table found in schemas:', jobsCheck.rows);
    }
    
    client.release();
  } catch (error) {
    log.error('❌ Database connection failed:', error);
    log.error('📋 DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    
    // In production, exit process if database connection fails
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

// Test connection on startup
testConnection();

export default pool;

// Helper function to execute queries with better error handling
export async function query(text: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    log.info('🔍 Executing query:', text.substring(0, 50) + (text.length > 50 ? '...' : ''));
    const result = await client.query(text, params);
    log.info('✅ Query successful, rows returned:', result.rows.length);
    return result;
  } catch (error) {
    log.error('❌ Database query error:', error);
    log.error('📋 Query:', text);
    log.error('📋 Params:', params);
    throw error;
  } finally {
    client.release();
  }
}

// Helper to get the correct table name with schema if needed
export async function getTableName(tableName: string): Promise<string> {
  // Since we know our tables are in the public schema, we can return the table name directly
  // This avoids unnecessary database queries that were causing connection timeouts
  return tableName;
}

// Type definitions for our database entities
export interface Job {
  id: number;
  title: string;
  company: string;
  location?: string;
  job_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  work_mode?: 'Remote' | 'On-site' | 'Hybrid';
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  benefits?: string;
  skills?: string[]; // Will be stored as JSONB
  experience_level?: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
  department?: string;
  posted_date?: Date;
  application_deadline?: Date;
  is_active?: boolean;
  featured?: boolean;
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  application_email?: string;
  application_url?: string;
  external_job_id?: string;
}

export interface CreateJobData {
  title: string;
  company: string;
  location?: string;
  job_type?: Job['job_type'];
  work_mode?: Job['work_mode'];
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  benefits?: string;
  skills?: string[];
  experience_level?: Job['experience_level'];
  department?: string;
  application_deadline?: Date;
  is_active?: boolean;
  featured?: boolean;
  created_by?: string;
  application_email?: string;
  application_url?: string;
}

export interface UpdateJobData extends Partial<CreateJobData> {
  id: number;
}

// Database operations for jobs
export class JobsDB {
  // Get all jobs with optional filtering
  static async getAllJobs(filters?: {
    is_active?: boolean;
    featured?: boolean;
    job_type?: string;
    work_mode?: string;
    experience_level?: string;
    limit?: number;
    offset?: number;
  }): Promise<Job[]> {
    let queryText = `SELECT * FROM jobs`;
    const params: unknown[] = [];
    const conditions: string[] = [];

    if (filters) {
      if (filters.is_active !== undefined) {
        conditions.push(`is_active = $${params.length + 1}`);
        params.push(filters.is_active);
      }
      if (filters.featured !== undefined) {
        conditions.push(`featured = $${params.length + 1}`);
        params.push(filters.featured);
      }
      if (filters.job_type) {
        conditions.push(`job_type = $${params.length + 1}`);
        params.push(filters.job_type);
      }
      if (filters.work_mode) {
        conditions.push(`work_mode = $${params.length + 1}`);
        params.push(filters.work_mode);
      }
      if (filters.experience_level) {
        conditions.push(`experience_level = $${params.length + 1}`);
        params.push(filters.experience_level);
      }
    }

    if (conditions.length > 0) {
      queryText += ` WHERE ${conditions.join(' AND ')}`;
    }

    queryText += ' ORDER BY featured DESC, posted_date DESC';

    if (filters?.limit) {
      queryText += ` LIMIT $${params.length + 1}`;
      params.push(filters.limit);
    }

    if (filters?.offset) {
      queryText += ` OFFSET $${params.length + 1}`;
      params.push(filters.offset);
    }

    const result = await query(queryText, params);
    return result.rows;
  }

  // Get a single job by ID
  static async getJobById(id: number): Promise<Job | null> {
    const result = await query(`SELECT * FROM jobs WHERE id = $1`, [id]);
    return result.rows[0] || null;
  }

  // Create a new job
  static async createJob(jobData: CreateJobData): Promise<Job> {
    const {
      title,
      company,
      location,
      job_type,
      work_mode,
      salary_min,
      salary_max,
      salary_currency,
      description,
      requirements,
      responsibilities,
      benefits,
      skills,
      experience_level,
      department,
      application_deadline,
      is_active,
      featured,
      created_by,
      application_email,
      application_url
    } = jobData;

    const result = await query(
      `INSERT INTO jobs (
        title, company, location, job_type, work_mode, salary_min, salary_max,
        salary_currency, description, requirements, responsibilities, benefits,
        skills, experience_level, department, application_deadline, is_active,
        featured, created_by, application_email, application_url
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
      ) RETURNING *`,
      [
        title, company, location, job_type, work_mode, salary_min, salary_max,
        salary_currency, description, requirements, responsibilities, benefits,
        JSON.stringify(skills), experience_level, department, application_deadline,
        is_active, featured, created_by, application_email, application_url
      ]
    );

    return result.rows[0];
  }

  // Update a job
  static async updateJob(id: number, jobData: Partial<CreateJobData>): Promise<Job | null> {
    const fields: string[] = [];
    const values: unknown[] = [];
    let paramCount = 1;

    Object.entries(jobData).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        fields.push(`${key} = $${paramCount}`);
        values.push(key === 'skills' ? JSON.stringify(value) : value);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      return null;
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await query(
      `UPDATE jobs SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }

  // Delete a job
  static async deleteJob(id: number): Promise<boolean> {
    const result = await query(`DELETE FROM jobs WHERE id = $1`, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  // Get job statistics - optimized version with fewer queries
  static async getJobStats(): Promise<{
    total: number;
    active: number;
    featured: number;
    by_type: { [key: string]: number };
    by_level: { [key: string]: number };
  }> {
    try {
      // Use a single query to get comprehensive stats
      const statsResult = await query(`
        WITH job_stats AS (
          SELECT 
            COUNT(*) as total_jobs,
            COUNT(*) FILTER (WHERE is_active = true) as active_jobs,
            COUNT(*) FILTER (WHERE featured = true) as featured_jobs
          FROM jobs
        ),
        type_stats AS (
          SELECT 
            COALESCE(job_type, 'Unspecified') as job_type,
            COUNT(*) as count
          FROM jobs 
          WHERE is_active = true 
          GROUP BY job_type
        ),
        level_stats AS (
          SELECT 
            COALESCE(experience_level, 'Unspecified') as experience_level,
            COUNT(*) as count
          FROM jobs 
          WHERE is_active = true 
          GROUP BY experience_level
        )
        SELECT 
          (SELECT total_jobs FROM job_stats) as total,
          (SELECT active_jobs FROM job_stats) as active,
          (SELECT featured_jobs FROM job_stats) as featured,
          COALESCE(
            (SELECT json_object_agg(job_type, count) FROM type_stats), 
            '{}'::json
          ) as by_type,
          COALESCE(
            (SELECT json_object_agg(experience_level, count) FROM level_stats), 
            '{}'::json
          ) as by_level
      `);

      const result = statsResult.rows[0];
      
      return {
        total: parseInt(result.total) || 0,
        active: parseInt(result.active) || 0,
        featured: parseInt(result.featured) || 0,
        by_type: result.by_type || {},
        by_level: result.by_level || {}
      };
    } catch (error) {
      log.error('❌ Error fetching job stats:', error);
      // Return default stats if query fails
      return {
        total: 0,
        active: 0,
        featured: 0,
        by_type: {},
        by_level: {}
      };
    }
  }
} 