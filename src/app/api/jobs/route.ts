import { NextRequest, NextResponse } from 'next/server';
import { JobsDB, CreateJobData } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions, isUserAdmin } from '@/lib/auth';

// GET /api/jobs - Get all jobs with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Check if this is a stats request
    if (searchParams.get('stats') === 'true') {
      // Check authentication for stats
      const session = await getServerSession(authOptions);
      if (!session?.user?.email) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        );
      }

      // Check if user is admin using database
      const userIsAdmin = await isUserAdmin(session.user.email);
      if (!userIsAdmin) {
        return NextResponse.json(
          { success: false, error: 'Admin access required' },
          { status: 403 }
        );
      }

      const stats = await JobsDB.getJobStats();
      return NextResponse.json({
        success: true,
        data: stats
      });
    }
    
    // Parse query parameters for regular job fetching
    const filters = {
      is_active: searchParams.get('active') === 'true' ? true : searchParams.get('active') === 'false' ? false : undefined,
      featured: searchParams.get('featured') === 'true' ? true : searchParams.get('featured') === 'false' ? false : undefined,
      job_type: searchParams.get('type') || undefined,
      work_mode: searchParams.get('mode') || undefined,
      experience_level: searchParams.get('level') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined,
    };

    // Remove undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    );

    const jobs = await JobsDB.getAllJobs(cleanFilters);
    return NextResponse.json({
      success: true,
      data: jobs,
      count: jobs.length
    });
  } catch (error) {
    console.error('❌ API Error fetching jobs:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch jobs',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create a new job (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user is admin using database
    const userIsAdmin = await isUserAdmin(session.user.email);
    if (!userIsAdmin) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.company || !body.description) {
      return NextResponse.json(
        { success: false, error: 'Title, company, and description are required' },
        { status: 400 }
      );
    }

    // Prepare job data
    const jobData: CreateJobData = {
      title: body.title,
      company: body.company,
      location: body.location,
      job_type: body.job_type,
      work_mode: body.work_mode,
      salary_min: body.salary_min ? parseInt(body.salary_min) : undefined,
      salary_max: body.salary_max ? parseInt(body.salary_max) : undefined,
      salary_currency: body.salary_currency || 'USD',
      description: body.description,
      requirements: body.requirements,
      responsibilities: body.responsibilities,
      benefits: body.benefits,
      skills: Array.isArray(body.skills) ? body.skills : [],
      experience_level: body.experience_level,
      department: body.department,
      application_deadline: body.application_deadline ? new Date(body.application_deadline) : undefined,
      is_active: body.is_active !== undefined ? body.is_active : true,
      featured: body.featured !== undefined ? body.featured : false,
      created_by: session.user.email,
      application_email: body.application_email,
      application_url: body.application_url,
    };

    const newJob = await JobsDB.createJob(jobData);

    return NextResponse.json({
      success: true,
      data: newJob,
      message: 'Job created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    );
  }
} 