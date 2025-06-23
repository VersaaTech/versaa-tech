import { Pool } from 'pg';

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  max: 20,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err);
});

export default pool;

// Helper function to execute queries
export async function query(text: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
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
  skills?: string[];
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

  // Get job statistics
  static async getJobStats(): Promise<{
    total: number;
    active: number;
    featured: number;
    by_type: { [key: string]: number };
    by_level: { [key: string]: number };
  }> {
    try {
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
      console.error('Error fetching job stats:', error);
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