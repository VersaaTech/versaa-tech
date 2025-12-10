import type { MetadataRoute } from 'next'
import { JobsDB } from '@/lib/db'

const BASE_URL = 'https://www.versaatech.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/executive-search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/rpo-recruitment`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/industry-benchmarking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fractional-hr-services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/hr-process-outsourcing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/payroll-management`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  let jobPages: MetadataRoute.Sitemap = []

  try {
    const jobs = await JobsDB.getAllJobs({ is_active: true })
    jobPages = jobs
      .filter((job) => !job.is_closed)
      .map((job) => ({
        url: `${BASE_URL}/jobs/${job.id}`,
        lastModified: job.updated_at || job.created_at || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
  } catch (error) {
    console.error('Error fetching jobs for sitemap:', error)
  }

  return [...staticPages, ...jobPages]
}
