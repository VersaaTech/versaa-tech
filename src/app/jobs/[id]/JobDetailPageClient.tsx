'use client'

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import DynamicIcon from '@/components/DynamicIcon';
import { Job } from '@/lib/db';

interface JobDetailPageClientProps {
  jobId: string;
  initialJob?: Job | null;
  initialError?: string | null;
}

// Simple Badge component
const Badge = ({ children, className = '' }: { 
  children: React.ReactNode; 
  className?: string; 
}) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 ${className}`}>
    {children}
  </span>
);

export default function JobDetailPageClient({ 
  jobId, 
  initialJob, 
  initialError 
}: JobDetailPageClientProps) {
  const [job, setJob] = useState<Job | null>(initialJob || null);
  const [loading, setLoading] = useState(!initialJob);
  const [error, setError] = useState<string | null>(initialError || null);
  const router = useRouter();

  const fetchJob = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/jobs/${jobId}`);
      const data = await response.json();

      if (data.success) {
        setJob(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch job details');
      }
    } catch (err) {
      console.error('Error fetching job:', err);
      setError('An error occurred while fetching job details');
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    if (!initialJob && !initialError) {
      fetchJob();
    }
  }, [fetchJob, initialJob, initialError]);

  const formatSalary = (min?: number, max?: number, currency: string = 'USD') => {
    if (!min && !max) return null;
    if (min && max) return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
    if (min) return `${currency} ${min.toLocaleString()}+`;
    if (max) return `Up to ${currency} ${max.toLocaleString()}`;
  };

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return 'Recently posted';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7fffc] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#f7fffc] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <DynamicIcon iconName="FaExclamationTriangle" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mt-4 mb-2">Job Not Found</h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            {error || 'The job you are looking for does not exist or has been removed.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 sm:justify-center">
            <Button onClick={() => router.back()} variant="outline" className="w-full sm:w-auto">
              Go Back
            </Button>
            <Link href="/jobs" className="w-full sm:w-auto">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                Browse All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7fffc] py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { name: 'Jobs', href: '/jobs' },
              { name: job.title, href: `/jobs/${jobId}` }
            ]}
          />
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4 sm:mb-6"
        >
          <Link href="/jobs">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              <DynamicIcon iconName="FaArrowLeft" />
              Back to Jobs
            </Button>
          </Link>
        </motion.div>

        {/* Job Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 break-words">
                  {job.title}
                </h1>
                <div className="flex gap-2 self-start sm:self-auto">
                  {job.is_closed && (
                    <Badge className="bg-gray-500 text-white">
                      Closed
                    </Badge>
                  )}
                  {job.featured && !job.is_closed && (
                    <Badge className="bg-yellow-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>

              {/* Closed Notice */}
              {job.is_closed && (
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 sm:p-4 mb-4">
                  <p className="text-gray-700 text-sm sm:text-base">
                    <strong>This position is no longer accepting applications.</strong> The role has been filled or is no longer available.
                  </p>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <DynamicIcon iconName="FaBuilding" />
                <span className="text-lg sm:text-xl font-semibold break-words">{job.company}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-gray-600 mb-6 text-sm sm:text-base">
                {job.location && (
                  <div className="flex items-center gap-2">
                    <DynamicIcon iconName="FaMapMarkerAlt" />
                    <span className="break-words">{job.location}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <DynamicIcon iconName="FaCalendarAlt" />
                  <span>Posted {formatDate(job.posted_date || job.created_at)}</span>
                </div>
              </div>

              {/* Job Type Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                {job.job_type && (
                  <Badge className="text-xs sm:text-sm">
                    {job.job_type}
                  </Badge>
                )}
                {job.work_mode && (
                  <Badge className="bg-green-100 text-green-800 text-xs sm:text-sm">
                    {job.work_mode}
                  </Badge>
                )}
                {job.experience_level && (
                  <Badge className="bg-purple-100 text-purple-800 text-xs sm:text-sm">
                    {job.experience_level}
                  </Badge>
                )}
              </div>

              {/* Salary Information */}
              {(job.salary_min || job.salary_max) && (
                <div className="flex items-center gap-3 mb-6">
                  <DynamicIcon iconName="FaDollarSign" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="text-base sm:text-lg font-semibold text-green-600 break-words">
                      {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
                    </span>
                    <span className="text-gray-500 text-sm sm:text-base">per year</span>
                  </div>
                </div>
              )}
            </div>

            {/* Apply Button */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              {job.is_closed ? (
                <Button
                  disabled
                  className="bg-gray-400 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg w-full lg:w-auto cursor-not-allowed"
                >
                  Position Closed
                </Button>
              ) : job.application_url ? (
                <a
                  href={job.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full lg:w-auto"
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg w-full lg:w-auto">
                    Apply Now
                  </Button>
                </a>
              ) : job.application_email ? (
                <a
                  href={`mailto:${job.application_email}?subject=Application for ${job.title}`}
                  className="block w-full lg:w-auto"
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg w-full lg:w-auto">
                    Apply via Email
                  </Button>
                </a>
              ) : (
                <Link href="/contact" className="block w-full lg:w-auto">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg w-full lg:w-auto">
                    Contact Us
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* Job Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4 sm:space-y-6"
          >
            {/* Job Description */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <DynamicIcon iconName="FaFileAlt" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="prose prose-sm sm:prose max-w-none text-gray-700">
                  {job.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 sm:mb-4 last:mb-0 text-sm sm:text-base leading-relaxed break-words">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            {job.responsibilities && (
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <DynamicIcon iconName="FaTasks" />
                    Key Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="prose prose-sm sm:prose max-w-none text-gray-700">
                    {job.responsibilities.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3 sm:mb-4 last:mb-0 text-sm sm:text-base leading-relaxed break-words">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {job.requirements && (
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <DynamicIcon iconName="FaCheckCircle" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="prose prose-sm sm:prose max-w-none text-gray-700">
                    {job.requirements.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3 sm:mb-4 last:mb-0 text-sm sm:text-base leading-relaxed break-words">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Job Overview */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Job Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                {job.department && (
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-500">Department</label>
                    <p className="text-sm sm:text-base text-gray-800 break-words">{job.department}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-500">Employment Type</label>
                  <p className="text-sm sm:text-base text-gray-800 break-words">{job.job_type || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-500">Work Location</label>
                  <p className="text-sm sm:text-base text-gray-800 break-words">{job.work_mode || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-500">Experience Level</label>
                  <p className="text-sm sm:text-base text-gray-800 break-words">{job.experience_level || 'Not specified'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Required Skills */}
            {job.skills && job.skills.length > 0 && (
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">Required Skills</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} className="border border-blue-300 text-xs sm:text-sm break-words">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* More Jobs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 sm:mt-12"
        >
          <Card>
            <CardContent className="p-6 sm:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Explore More Opportunities
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Discover other exciting career opportunities at Versaatech
              </p>
              <Link href="/jobs">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
                  View All Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 