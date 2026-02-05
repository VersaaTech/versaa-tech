import { notFound } from 'next/navigation';
import JobDetailPageClient from './JobDetailPageClient';
import { JsonLd } from '@/components/JsonLd';
import { generateJobPostingSchema } from '@/lib/schema';
import { Job } from '@/lib/db';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/jobs/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return {
        title: 'Job Not Found | Versaatech',
        description: 'The requested job posting could not be found.'
      };
    }

    const data = await response.json();
    const job = data.data;

    return {
      title: `${job.title} at ${job.company} | Versaatech`,
      description: job.description.substring(0, 160) + '...',
      keywords: [
        job.title,
        job.company,
        job.job_type,
        job.work_mode,
        job.experience_level,
        ...(job.skills || [])
      ].filter(Boolean).join(', '),
      alternates: {
        canonical: `/jobs/${id}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Job Details | Versaatech',
      description: 'View detailed information about this career opportunity at Versaatech.'
    };
  }
}

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  // Pre-fetch job data on server side for SEO
  let job = null;
  let error = null;

  try {
    const { id } = await params;
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/jobs/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch job');
    }

    const data = await response.json();
    job = data.data;

    // Check if job is active for public viewing
    if (!job.is_active) {
      notFound();
    }
  } catch (err) {
    console.error('Error fetching job:', err);
    error = 'Failed to load job details';
  }

  const { id } = await params;

  // Generate JobPosting schema if job data is available
  const jobPostingSchema = job ? generateJobPostingSchema(job as Job) : null;

  return (
    <>
      {jobPostingSchema && <JsonLd data={jobPostingSchema} />}
      <JobDetailPageClient jobId={id} initialJob={job} initialError={error} />
    </>
  );
} 