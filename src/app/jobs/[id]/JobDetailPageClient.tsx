'use client'

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      <div className="min-h-screen bg-[#f7fffc] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#f7fffc] flex items-center justify-center">
        <div className="text-center">
          <DynamicIcon iconName="FaExclamationTriangle" />
          <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Job Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The job you are looking for does not exist or has been removed.'}
          </p>
          <div className="space-x-4">
            <Button onClick={() => router.back()} variant="outline">
              Go Back
            </Button>
            <Link href="/jobs">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Browse All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7fffc] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href="/jobs">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
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
          className="bg-white rounded-lg shadow-md p-8 mb-6"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
                {job.featured && (
                  <Badge className="bg-yellow-500 text-white">
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <DynamicIcon iconName="FaBuilding" />
                <span className="text-xl font-semibold">{job.company}</span>
              </div>

              <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                {job.location && (
                  <div className="flex items-center gap-2">
                    <DynamicIcon iconName="FaMapMarkerAlt" />
                    <span>{job.location}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <DynamicIcon iconName="FaCalendarAlt" />
                  <span>Posted {formatDate(job.posted_date || job.created_at)}</span>
                </div>
              </div>

              {/* Job Type Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {job.job_type && (
                  <Badge>
                    {job.job_type}
                  </Badge>
                )}
                {job.work_mode && (
                  <Badge className="bg-green-100 text-green-800">
                    {job.work_mode}
                  </Badge>
                )}
                {job.experience_level && (
                  <Badge className="bg-purple-100 text-purple-800">
                    {job.experience_level}
                  </Badge>
                )}
              </div>

              {/* Salary Information */}
              {(job.salary_min || job.salary_max) && (
                <div className="flex items-center gap-3 mb-6">
                  <DynamicIcon iconName="FaDollarSign" />
                  <span className="text-lg font-semibold text-green-600">
                    {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
                  </span>
                  <span className="text-gray-500">per year</span>
                </div>
              )}
            </div>

            {/* Apply Button */}
            <div className="ml-6">
              {job.application_url ? (
                <a 
                  href={job.application_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                    Apply Now
                  </Button>
                </a>
              ) : job.application_email ? (
                <a 
                  href={`mailto:${job.application_email}?subject=Application for ${job.title}`}
                  className="inline-block"
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                    Apply via Email
                  </Button>
                </a>
              ) : (
                <Link href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                    Contact Us
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* Job Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DynamicIcon iconName="FaFileAlt" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-gray-700">
                  {job.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            {job.responsibilities && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DynamicIcon iconName="FaTasks" />
                    Key Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none text-gray-700">
                    {job.responsibilities.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
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
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DynamicIcon iconName="FaCheckCircle" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none text-gray-700">
                    {job.requirements.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
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
            className="space-y-6"
          >
            {/* Job Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Job Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.department && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department</label>
                    <p className="text-gray-800">{job.department}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Employment Type</label>
                  <p className="text-gray-800">{job.job_type || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Work Location</label>
                  <p className="text-gray-800">{job.work_mode || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Experience Level</label>
                  <p className="text-gray-800">{job.experience_level || 'Not specified'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Required Skills */}
            {job.skills && job.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} className="border border-blue-300">
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
          className="mt-12"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Explore More Opportunities
              </h2>
              <p className="text-gray-600 mb-6">
                Discover other exciting career opportunities at Versaatech
              </p>
              <Link href="/jobs">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
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