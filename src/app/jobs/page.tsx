import JobsPageClient from "./JobsPageClient";
import { JsonLd } from "@/components/JsonLd";
import { JobsDB, Job } from "@/lib/db";
import { generateJobsListSchema } from "@/lib/schema";

// SEO metadata for the jobs page
export const metadata = {
  title: "Career Opportunities | Jobs at Versaatech",
  description:
    "Explore career opportunities at Versaatech. Browse open HR, recruitment, and consulting positions across our Dubai and Kenya offices.",
  alternates: {
    canonical: '/jobs',
  },
};

export default async function JobsPage() {
  // Fetch active jobs server-side for the ItemList schema
  let jobs: Job[] = [];
  try {
    jobs = await JobsDB.getAllJobs({ is_active: true });
  } catch (error) {
    // Log error but don't break the page - client component will still work
    console.error("Error fetching jobs for schema:", error);
  }

  const jobsListSchema = generateJobsListSchema(jobs);

  return (
    <>
      <JsonLd data={jobsListSchema} />
      <JobsPageClient />
    </>
  );
} 