import { notFound } from 'next/navigation';
import JobDetailPageClient from './JobDetailPageClient';
import { JsonLd } from '@/components/JsonLd';
import { generateJobPostingSchema } from '@/lib/schema';
import { JobsDB, Job } from '@/lib/db';

async function getJob(id: string): Promise<Job | null> {
  const jobId = parseInt(id);
  if (isNaN(jobId)) return null;
  try {
    return await JobsDB.getJobById(jobId);
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return {
      title: 'Job Not Found | Versaatech',
      description: 'The requested job posting could not be found.',
    };
  }

  return {
    title: `${job.title} at ${job.company} | Versaatech`,
    description: job.description.substring(0, 160) + '...',
    keywords: [
      job.title,
      job.company,
      job.job_type,
      job.work_mode,
      job.experience_level,
      ...(job.skills || []),
    ]
      .filter(Boolean)
      .join(', '),
    alternates: {
      canonical: `/jobs/${id}`,
    },
  };
}

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job || !job.is_active) {
    notFound();
  }

  const jobPostingSchema = generateJobPostingSchema(job);

  return (
    <>
      <JsonLd data={jobPostingSchema} />
      <JobDetailPageClient jobId={id} initialJob={job} initialError={null} />
    </>
  );
} 