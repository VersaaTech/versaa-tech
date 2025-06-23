'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  User,
  LogOut,
  Briefcase,
  Plus,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Save,
  X,
  RefreshCw,
  AlertCircle,
  Search, Star,
  MapPin,
  Calendar
} from 'lucide-react';
import { Job } from '@/lib/db';
import { toast } from 'sonner';

interface AdminPageClientProps {
  session: Session;
}

interface JobStats {
  total: number;
  active: number;
  featured: number;
  by_type: { [key: string]: number };
  by_level: { [key: string]: number };
}

interface JobFormData {
  title: string;
  company: string;
  location: string;
  job_type: string;
  work_mode: string;
  salary_min: string;
  salary_max: string;
  salary_currency: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  skills: string;
  experience_level: string;
  department: string;
  application_deadline: string;
  is_active: boolean;
  featured: boolean;
  application_email: string;
  application_url: string;
}

const initialJobForm: JobFormData = {
  title: '',
  company: 'Versaatech',
  location: '',
  job_type: 'Full-time',
  work_mode: 'Remote',
  salary_min: '',
  salary_max: '',
  salary_currency: 'USD',
  description: '',
  requirements: '',
  responsibilities: '',
  benefits: '',
  skills: '',
  experience_level: 'Mid',
  department: '',
  application_deadline: '',
  is_active: true,
  featured: false,
  application_email: 'info@versaatech.com',
  application_url: '',
};

// Separate optimized form component
interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingJob: Job | null;
  onSubmit: (formData: JobFormData) => Promise<void>;
  submitting: boolean;
}

const JobFormModal = memo(({ isOpen, onClose, editingJob, onSubmit, submitting }: JobFormModalProps): JSX.Element => {
  const [formData, setFormData] = useState<JobFormData>(initialJobForm);

  // Initialize form data when modal opens or editing job changes
  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title,
        company: editingJob.company,
        location: editingJob.location || '',
        job_type: editingJob.job_type || 'Full-time',
        work_mode: editingJob.work_mode || 'Remote',
        salary_min: editingJob.salary_min?.toString() || '',
        salary_max: editingJob.salary_max?.toString() || '',
        salary_currency: editingJob.salary_currency || 'USD',
        description: editingJob.description,
        requirements: editingJob.requirements || '',
        responsibilities: editingJob.responsibilities || '',
        benefits: editingJob.benefits || '',
        skills: Array.isArray(editingJob.skills) ? editingJob.skills.join(', ') : '',
        experience_level: editingJob.experience_level || 'Mid',
        department: editingJob.department || '',
        application_deadline: editingJob.application_deadline ? 
          new Date(editingJob.application_deadline).toISOString().split('T')[0] : '',
        is_active: editingJob.is_active || false,
        featured: editingJob.featured || false,
        application_email: editingJob.application_email || 'info@versaatech.com',
        application_url: editingJob.application_url || '',
      });
    } else {
      setFormData(initialJobForm);
    }
  }, [editingJob, isOpen]);

  // Optimized field update - simplified to avoid function creation on each render
  const updateField = useCallback((field: keyof JobFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  }, [formData, onSubmit]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingJob ? 'Edit Job' : 'Create New Job'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                                 onChange={(e) => updateField('title', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="e.g., Remote, New York, London"
              />
            </div>
            
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => updateField('department', e.target.value)}
                placeholder="e.g., Engineering, Marketing"
              />
            </div>
            
            <div>
              <Label htmlFor="job_type">Job Type</Label>
              <select
                id="job_type"
                value={formData.job_type}
                onChange={(e) => updateField('job_type', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="work_mode">Work Mode</Label>
              <select
                id="work_mode"
                value={formData.work_mode}
                onChange={(e) => updateField('work_mode', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="experience_level">Experience Level</Label>
              <select
                id="experience_level"
                value={formData.experience_level}
                onChange={(e) => updateField('experience_level', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="salary_currency">Currency</Label>
              <select
                id="salary_currency"
                value={formData.salary_currency}
                onChange={(e) => updateField('salary_currency', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <optgroup label="Major Currencies">
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CNY">CNY - Chinese Yuan</option>
                  <option value="CHF">CHF - Swiss Franc</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="SEK">SEK - Swedish Krona</option>
                  <option value="NOK">NOK - Norwegian Krone</option>
                  <option value="DKK">DKK - Danish Krone</option>
                  <option value="SGD">SGD - Singapore Dollar</option>
                  <option value="HKD">HKD - Hong Kong Dollar</option>
                </optgroup>
                <optgroup label="Middle East">
                  <option value="AED">AED - UAE Dirham</option>
                  <option value="SAR">SAR - Saudi Riyal</option>
                  <option value="QAR">QAR - Qatari Riyal</option>
                  <option value="KWD">KWD - Kuwaiti Dinar</option>
                  <option value="BHD">BHD - Bahraini Dinar</option>
                  <option value="OMR">OMR - Omani Rial</option>
                  <option value="JOD">JOD - Jordanian Dinar</option>
                  <option value="EGP">EGP - Egyptian Pound</option>
                  <option value="LBP">LBP - Lebanese Pound</option>
                  <option value="ILS">ILS - Israeli Shekel</option>
                  <option value="TRY">TRY - Turkish Lira</option>
                  <option value="IRR">IRR - Iranian Rial</option>
                </optgroup>
                <optgroup label="East Africa">
                  <option value="KES">KES - Kenyan Shilling</option>
                  <option value="TZS">TZS - Tanzanian Shilling</option>
                  <option value="UGX">UGX - Ugandan Shilling</option>
                  <option value="ETB">ETB - Ethiopian Birr</option>
                  <option value="RWF">RWF - Rwandan Franc</option>
                  <option value="BIF">BIF - Burundian Franc</option>
                  <option value="DJF">DJF - Djiboutian Franc</option>
                  <option value="ERN">ERN - Eritrean Nakfa</option>
                  <option value="SOS">SOS - Somali Shilling</option>
                  <option value="SSP">SSP - South Sudanese Pound</option>
                </optgroup>
                <optgroup label="Mexico">
                  <option value="MXN">MXN - Mexican Peso</option>
                </optgroup>
                <optgroup label="Other Regions">
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="BRL">BRL - Brazilian Real</option>
                  <option value="ZAR">ZAR - South African Rand</option>
                  <option value="RUB">RUB - Russian Ruble</option>
                  <option value="KRW">KRW - South Korean Won</option>
                  <option value="THB">THB - Thai Baht</option>
                  <option value="MYR">MYR - Malaysian Ringgit</option>
                  <option value="PHP">PHP - Philippine Peso</option>
                  <option value="IDR">IDR - Indonesian Rupiah</option>
                  <option value="VND">VND - Vietnamese Dong</option>
                </optgroup>
              </select>
            </div>
            
            <div>
              <Label htmlFor="salary_min">Minimum Salary</Label>
              <Input
                id="salary_min"
                type="number"
                value={formData.salary_min}
                onChange={(e) => updateField('salary_min', e.target.value)}
                placeholder="50000"
              />
            </div>
            
            <div>
              <Label htmlFor="salary_max">Maximum Salary</Label>
              <Input
                id="salary_max"
                type="number"
                value={formData.salary_max}
                onChange={(e) => updateField('salary_max', e.target.value)}
                placeholder="80000"
              />
            </div>
            
            <div>
              <Label htmlFor="application_deadline">Application Deadline</Label>
              <Input
                id="application_deadline"
                type="date"
                value={formData.application_deadline}
                onChange={(e) => updateField('application_deadline', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="application_email">Application Email</Label>
              <Input
                id="application_email"
                type="email"
                value={formData.application_email}
                onChange={(e) => updateField('application_email', e.target.value)}
                placeholder="info@versaatech.com"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              required
              rows={4}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
            />
          </div>
          
          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => updateField('requirements', e.target.value)}
              rows={3}
              placeholder="List the required qualifications, experience, and skills..."
            />
          </div>
          
          <div>
            <Label htmlFor="responsibilities">Responsibilities</Label>
            <Textarea
              id="responsibilities"
              value={formData.responsibilities}
              onChange={(e) => updateField('responsibilities', e.target.value)}
              rows={3}
              placeholder="Outline the key responsibilities and duties..."
            />
          </div>
          
          <div>
            <Label htmlFor="benefits">Benefits</Label>
            <Textarea
              id="benefits"
              value={formData.benefits}
              onChange={(e) => updateField('benefits', e.target.value)}
              rows={3}
              placeholder="Describe the benefits, perks, and compensation package..."
            />
          </div>
          
          <div>
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              value={formData.skills}
              onChange={(e) => updateField('skills', e.target.value)}
              placeholder="React, TypeScript, Node.js, PostgreSQL"
            />
          </div>
          
          <div>
            <Label htmlFor="application_url">Application URL</Label>
            <Input
              id="application_url"
              type="url"
              value={formData.application_url}
              onChange={(e) => updateField('application_url', e.target.value)}
              placeholder="https://apply.versaatech.com/jobs/..."
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => updateField('is_active', checked as boolean)}
              />
              <Label htmlFor="is_active">Active (publish immediately)</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => updateField('featured', checked as boolean)}
              />
              <Label htmlFor="featured">Featured (highlight this job)</Label>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={submitting}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  {editingJob ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {editingJob ? 'Update Job' : 'Create Job'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

JobFormModal.displayName = 'JobFormModal';

export default function AdminPageClient({ session }: AdminPageClientProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<JobStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch jobs and stats in parallel for better performance
      const [jobsRes, statsRes] = await Promise.all([
        fetch('/api/jobs'),
        fetch('/api/jobs?stats=true')
      ]);
      
      if (!jobsRes.ok) {
        throw new Error('Failed to fetch jobs');
      }
      if (!statsRes.ok) {
        throw new Error('Failed to fetch stats');
      }
      
      const jobsData = await jobsRes.json();
      const statsData = await statsRes.json();
      
      setJobs(jobsData.data || []);
      setStats(statsData.data || {
        total: 0,
        active: 0,
        featured: 0,
        by_type: {},
        by_level: {}
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load admin data');
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoized filtered jobs to prevent unnecessary recalculations
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = filterStatus === 'all' || 
        (filterStatus === 'active' && job.is_active) ||
        (filterStatus === 'inactive' && !job.is_active);
      
      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, filterStatus]);

  const handleCreateJob = useCallback(() => {
    setEditingJob(null);
    setShowJobModal(true);
  }, []);

  const handleEditJob = useCallback((job: Job) => {
    setEditingJob(job);
    setShowJobModal(true);
  }, []);

  const handleJobFormSubmit = useCallback(async (jobFormData: JobFormData) => {
    setSubmitting(true);

    try {
      const formData = {
        ...jobFormData,
        salary_min: jobFormData.salary_min ? parseInt(jobFormData.salary_min) : undefined,
        salary_max: jobFormData.salary_max ? parseInt(jobFormData.salary_max) : undefined,
        skills: jobFormData.skills ? jobFormData.skills.split(',').map(s => s.trim()).filter(s => s) : [],
        application_deadline: jobFormData.application_deadline || undefined,
      };

      const url = editingJob ? `/api/jobs/${editingJob.id}` : '/api/jobs';
      const method = editingJob ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save job');
      }

      toast.success(editingJob ? 'Job updated successfully!' : 'Job created successfully!');
      setShowJobModal(false);
      fetchData();
    } catch (err) {
      console.error('Error saving job:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to save job');
    } finally {
      setSubmitting(false);
    }
  }, [editingJob, fetchData]);

  const handleDeleteJob = useCallback(async (jobId: number) => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      toast.success('Job deleted successfully!');
      fetchData();
    } catch (err) {
      console.error('Error deleting job:', err);
      toast.error('Failed to delete job');
    }
  }, [fetchData]);

  const toggleJobStatus = useCallback(async (jobId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_active: !currentStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job status');
      }

      toast.success(`Job ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
      fetchData();
    } catch (err) {
      console.error('Error updating job status:', err);
      toast.error('Failed to update job status');
    }
  }, [fetchData]);

  const toggleJobFeatured = useCallback(async (jobId: number, currentFeatured: boolean) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featured: !currentFeatured,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job featured status');
      }

      toast.success(`Job ${!currentFeatured ? 'featured' : 'unfeatured'} successfully!`);
      fetchData();
    } catch (err) {
      console.error('Error updating job featured status:', err);
      toast.error('Failed to update job featured status');
    }
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Button onClick={fetchData} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage jobs and content for Versaatech</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={fetchData} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>{session.user?.email}</span>
          </div>
          <Button
            variant="outline"
            onClick={() => signOut()}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total || 0}</div>
                <p className="text-xs text-muted-foreground">
                  All job postings
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats?.active || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Currently published
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured Jobs</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats?.featured || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Promoted positions
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inactive Jobs</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {(stats?.total || 0) - (stats?.active || 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Unpublished positions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          job.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.is_active ? "Active" : "Inactive"}
                        </span>
                        {job.featured && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            Featured
                          </span>
                        )}
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          {job.job_type}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditJob(job)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {jobs.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No jobs found. Create your first job posting!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Jobs Management Tab */}
        <TabsContent value="jobs" className="mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold">Jobs Management</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white w-full sm:w-auto"
              >
                <option value="all">All Jobs</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
              <Button onClick={handleCreateJob} className="flex items-center gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                Add New Job
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type & Mode
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <span>{job.company}</span>
                              {job.location && (
                                <>
                                  <span>•</span>
                                  <MapPin className="h-3 w-3" />
                                  <span>{job.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 w-fit">
                              {job.job_type}
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 w-fit">
                              {job.work_mode}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className={`px-2 py-1 text-xs rounded-full w-fit ${
                              job.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {job.is_active ? "Active" : "Inactive"}
                            </span>
                            {job.featured && (
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 w-fit">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{job.posted_date ? new Date(job.posted_date).toLocaleDateString() : 'N/A'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1 flex-wrap">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
                              title="View Job"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditJob(job)}
                              title="Edit Job"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleJobStatus(job.id, job.is_active || false)}
                              title={job.is_active ? "Deactivate Job" : "Activate Job"}
                            >
                              {job.is_active ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleJobFeatured(job.id, job.featured || false)}
                              title={job.featured ? "Remove from Featured" : "Make Featured"}
                              className={job.featured ? "text-yellow-600 hover:text-yellow-700" : ""}
                            >
                              <Star className={`h-4 w-4 ${job.featured ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteJob(job.id)}
                              className="text-red-600 hover:text-red-700"
                              title="Delete Job"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredJobs.length === 0 && jobs.length > 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No jobs match your search criteria</p>
                    <p className="text-gray-400">Try adjusting your search or filters.</p>
                  </div>
                )}
                {jobs.length === 0 && (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No jobs found</p>
                    <p className="text-gray-400">Create your first job posting to get started.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Jobs by Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats?.by_type || {}).map(([type, count]) => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{type}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${((count / (stats?.total || 1)) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 min-w-[2rem] text-center">
                          {count}
                        </span>
                      </div>
                    </div>
                  ))}
                  {Object.keys(stats?.by_type || {}).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No data available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Jobs by Experience Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats?.by_level || {}).map(([level, count]) => (
                    <div key={level} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{level}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${((count / (stats?.total || 1)) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 min-w-[2rem] text-center">
                          {count}
                        </span>
                      </div>
                    </div>
                  ))}
                  {Object.keys(stats?.by_level || {}).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No data available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Active Rate</span>
                    <span className="text-sm font-bold text-green-600">
                      {stats?.total ? Math.round(((stats.active || 0) / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Featured Rate</span>
                    <span className="text-sm font-bold text-blue-600">
                      {stats?.total ? Math.round(((stats.featured || 0) / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Avg. per Type</span>
                    <span className="text-sm font-bold">
                      {Object.keys(stats?.by_type || {}).length ? 
                        Math.round((stats?.total || 0) / Object.keys(stats?.by_type || {}).length) : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Most Common Type</span>
                    <span className="text-sm font-bold">
                      {Object.entries(stats?.by_type || {}).length ? 
                        Object.entries(stats?.by_type || {}).reduce((a, b) => a[1] > b[1] ? a : b)[0] : 'N/A'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Optimized Job Form Modal */}
      <JobFormModal
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        editingJob={editingJob}
        onSubmit={handleJobFormSubmit}
        submitting={submitting}
      />
    </div>
  );
} 