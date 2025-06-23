import { NextRequest, NextResponse } from 'next/server';
import { JobsDB } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions, isUserAdmin } from '@/lib/auth';

// GET /api/jobs/[id] - Get a specific job by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id);
    
    if (isNaN(jobId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid job ID' },
        { status: 400 }
      );
    }

    const job = await JobsDB.getJobById(jobId);

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

// PUT /api/jobs/[id] - Update a job (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const jobId = parseInt(id);
    
    if (isNaN(jobId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid job ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Prepare update data
    const updateData: Partial<import('@/lib/db').CreateJobData> = {};
    
    if (body.title !== undefined) updateData.title = body.title;
    if (body.company !== undefined) updateData.company = body.company;
    if (body.location !== undefined) updateData.location = body.location;
    if (body.job_type !== undefined) updateData.job_type = body.job_type;
    if (body.work_mode !== undefined) updateData.work_mode = body.work_mode;
    if (body.salary_min !== undefined) updateData.salary_min = parseInt(body.salary_min);
    if (body.salary_max !== undefined) updateData.salary_max = parseInt(body.salary_max);
    if (body.salary_currency !== undefined) updateData.salary_currency = body.salary_currency;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.requirements !== undefined) updateData.requirements = body.requirements;
    if (body.responsibilities !== undefined) updateData.responsibilities = body.responsibilities;
    if (body.benefits !== undefined) updateData.benefits = body.benefits;
    if (body.skills !== undefined && Array.isArray(body.skills)) updateData.skills = body.skills;
    if (body.experience_level !== undefined) updateData.experience_level = body.experience_level;
    if (body.department !== undefined) updateData.department = body.department;
    if (body.application_deadline !== undefined) {
      updateData.application_deadline = body.application_deadline ? new Date(body.application_deadline) : undefined;
    }
    if (body.is_active !== undefined) updateData.is_active = body.is_active;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.application_email !== undefined) updateData.application_email = body.application_email;
    if (body.application_url !== undefined) updateData.application_url = body.application_url;

    const updatedJob = await JobsDB.updateJob(jobId, updateData);

    if (!updatedJob) {
      return NextResponse.json(
        { success: false, error: 'Job not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedJob,
      message: 'Job updated successfully'
    });

  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs/[id] - Delete a job (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const jobId = parseInt(id);
    
    if (isNaN(jobId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid job ID' },
        { status: 400 }
      );
    }

    const deleted = await JobsDB.deleteJob(jobId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete job' },
      { status: 500 }
    );
  }
} 