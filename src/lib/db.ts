import prisma from './prisma';
import { Prisma } from '../../generated/prisma/client';

// Re-export Prisma client for direct access if needed
export { prisma };

// Type definitions for our database entities
// Keep original interface for backward compatibility (Prisma uses null, existing code uses undefined)
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
  is_closed?: boolean;
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
  is_closed?: boolean;
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
    const where: Prisma.jobsWhereInput = {};

    if (filters) {
      if (filters.is_active !== undefined) where.is_active = filters.is_active;
      if (filters.featured !== undefined) where.featured = filters.featured;
      if (filters.job_type) where.job_type = filters.job_type;
      if (filters.work_mode) where.work_mode = filters.work_mode;
      if (filters.experience_level) where.experience_level = filters.experience_level;
    }

    const jobs = await prisma.jobs.findMany({
      where,
      orderBy: [
        { is_closed: 'asc' },
        { posted_date: 'desc' },
      ],
      ...(filters?.limit && { take: filters.limit }),
      ...(filters?.offset && { skip: filters.offset }),
    });

    return jobs as unknown as Job[];
  }

  // Get a single job by ID
  static async getJobById(id: number): Promise<Job | null> {
    const job = await prisma.jobs.findUnique({ where: { id } });
    return job as unknown as Job | null;
  }

  // Create a new job
  static async createJob(jobData: CreateJobData): Promise<Job> {
    const job = await prisma.jobs.create({
      data: {
        title: jobData.title,
        company: jobData.company,
        location: jobData.location,
        job_type: jobData.job_type,
        work_mode: jobData.work_mode,
        salary_min: jobData.salary_min,
        salary_max: jobData.salary_max,
        salary_currency: jobData.salary_currency,
        description: jobData.description,
        requirements: jobData.requirements,
        responsibilities: jobData.responsibilities,
        benefits: jobData.benefits,
        skills: jobData.skills ?? Prisma.JsonNull,
        experience_level: jobData.experience_level,
        department: jobData.department,
        application_deadline: jobData.application_deadline,
        is_active: jobData.is_active,
        featured: jobData.featured,
        is_closed: jobData.is_closed,
        created_by: jobData.created_by,
        application_email: jobData.application_email,
        application_url: jobData.application_url,
      },
    });

    return job as unknown as Job;
  }

  // Update a job
  static async updateJob(id: number, jobData: Partial<CreateJobData>): Promise<Job | null> {
    // Build the update data, handling skills JSONB separately
    const { skills, ...rest } = jobData;
    const data: Prisma.jobsUpdateInput = { ...rest };

    if (skills !== undefined) {
      data.skills = skills;
    }

    try {
      const job = await prisma.jobs.update({
        where: { id },
        data,
      });
      return job as unknown as Job;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

  // Delete a job
  static async deleteJob(id: number): Promise<boolean> {
    try {
      await prisma.jobs.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return false;
      }
      throw error;
    }
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
      const result = await prisma.$queryRaw<
        Array<{
          total: bigint;
          active: bigint;
          featured: bigint;
          by_type: Record<string, number>;
          by_level: Record<string, number>;
        }>
      >`
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
      `;

      const row = result[0];
      return {
        total: Number(row.total) || 0,
        active: Number(row.active) || 0,
        featured: Number(row.featured) || 0,
        by_type: row.by_type || {},
        by_level: row.by_level || {},
      };
    } catch (error) {
      console.error('Error fetching job stats:', error);
      return {
        total: 0,
        active: 0,
        featured: 0,
        by_type: {},
        by_level: {},
      };
    }
  }
}
