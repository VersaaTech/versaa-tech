'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import DynamicIcon from '@/components/DynamicIcon';
import { Job } from '@/lib/db';

interface JobsResponse {
  success: boolean;
  data: Job[];
  count: number;
}

interface FilterState {
  search: string;
  jobType: string;
  workMode: string;
  experienceLevel: string;
}

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
const WORK_MODES = ['Remote', 'On-site', 'Hybrid'];
const EXPERIENCE_LEVELS = ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'];

// Simple Badge component since we might not have it
const Badge = ({ children, variant = 'default', className = '' }: { 
  children: React.ReactNode; 
  variant?: 'default' | 'secondary' | 'outline'; 
  className?: string; 
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-300 text-gray-700'
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default function JobsPageClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    jobType: '',
    workMode: '',
    experienceLevel: ''
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      // Only add active jobs for public view
      queryParams.append('active', 'true');
      
      if (filters.jobType) queryParams.append('type', filters.jobType);
      if (filters.workMode) queryParams.append('mode', filters.workMode);
      if (filters.experienceLevel) queryParams.append('level', filters.experienceLevel);

      const response = await fetch(`/api/jobs?${queryParams.toString()}`);
      const data: JobsResponse = await response.json();

      if (data.success) {
        let filteredJobs = data.data;
        
        // Apply search filter on client side for title, company, and description
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            (job.location && job.location.toLowerCase().includes(searchTerm))
          );
        }
        
        setJobs(filteredJobs);
      } else {
        setError('Failed to fetch jobs');
      }
    } catch (err) {
      setError('An error occurred while fetching jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters.jobType, filters.workMode, filters.experienceLevel]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters.search]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      jobType: '',
      workMode: '',
      experienceLevel: ''
    });
  };

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
      month: 'short',
      day: 'numeric'
    });
  };

  const JobCard = ({ job, index }: { job: Job; index: number }) => {
    const cardVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          delay: index * 0.1,
          duration: 0.5
        }
      }
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        <Card className="h-full border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <CardTitle className="text-xl font-semibold text-gray-800">
                {job.title}
              </CardTitle>
              {job.featured && (
                <Badge variant="default" className="bg-yellow-500 text-white">
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <DynamicIcon iconName="FaBuilding" />
              <span className="font-medium">{job.company}</span>
            </div>
            {job.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <DynamicIcon iconName="FaMapMarkerAlt" />
                <span>{job.location}</span>
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {/* Job Type and Work Mode Badges */}
              <div className="flex flex-wrap gap-2">
                {job.job_type && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {job.job_type}
                  </Badge>
                )}
                {job.work_mode && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {job.work_mode}
                  </Badge>
                )}
                {job.experience_level && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {job.experience_level}
                  </Badge>
                )}
              </div>

              {/* Salary Information */}
              {(job.salary_min || job.salary_max) && (
                <div className="flex items-center gap-2 text-gray-700">
                  <DynamicIcon iconName="FaDollarSign" />
                  <span className="font-medium">
                    {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
                  </span>
                </div>
              )}

              {/* Job Description Preview */}
              <p className="text-gray-600 line-clamp-3">
                {job.description.length > 150 
                  ? `${job.description.substring(0, 150)}...` 
                  : job.description
                }
              </p>

              {/* Skills */}
              {job.skills && job.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {job.skills.slice(0, 3).map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="outline" 
                      className="text-xs border-gray-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs border-gray-300">
                      +{job.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Posted Date */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  Posted {formatDate(job.posted_date || job.created_at)}
                </span>
                <Link href={`/jobs/${job.id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7fffc] py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            Career Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our global team and make an impact in human capital management. 
            Discover opportunities that match your skills and aspirations.
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2">
              <Input
                placeholder="Search jobs, companies, or locations..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Job Type Filter */}
            <select
              value={filters.jobType}
              onChange={(e) => handleFilterChange('jobType', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {JOB_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Work Mode Filter */}
            <select
              value={filters.workMode}
              onChange={(e) => handleFilterChange('workMode', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Modes</option>
              {WORK_MODES.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>

            {/* Experience Level Filter */}
            <select
              value={filters.experienceLevel}
              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              {EXPERIENCE_LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
            </span>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="text-sm"
            >
              Clear Filters
            </Button>
          </div>
        </motion.div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading opportunities...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchJobs}>Try Again</Button>
          </div>
        ) : jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            {/* Check if any filters are active */}
            {filters.search || filters.jobType || filters.workMode || filters.experienceLevel ? (
              // Message when filters are applied but no results
              <>
                <div className="mb-6">
                  <DynamicIcon iconName="FaSearch" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-3">No jobs found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your search criteria or clear the filters to see more opportunities.
                </p>
                <Button onClick={clearFilters} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Clear All Filters
                </Button>
              </>
            ) : (
                             // Message when no jobs are available at all
               <>
                 <h3 className="text-2xl font-semibold text-gray-700 mb-3">No Current Openings</h3>
                <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                  We don't have any open positions at the moment, but we're always growing! 
                  Check back soon or get in touch to learn about future opportunities.
                </p>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                        Contact Us About Future Roles
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      onClick={fetchJobs}
                      className="px-6 py-3"
                    >
                      Refresh Page
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Want to be notified when new positions open up? Reach out to us and we'll keep you in mind.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {jobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </motion.div>
        )}

        {/* Contact Section */}
        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Don&apos;t see the right opportunity?
              </h2>
              <p className="text-gray-600 mb-6">
                We&apos;re always looking for talented individuals. Send us your resume 
                and we&apos;ll keep you in mind for future openings.
              </p>
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 