import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
import AdminPageClient from './AdminPageClient';

// Build-time safe database check
async function checkAdminStatus(email: string): Promise<boolean> {
  // Skip database queries during build time
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                     process.env.npm_lifecycle_event === 'build' ||
                     process.argv.includes('build');
                     
  if (isBuildTime) {
    console.warn('⚠️ Skipping admin check during build time');
    return false; // Default to false during build
  }

  try {
    const result = await pool.query(
      'SELECT is_admin FROM users WHERE email = $1',
      [email]
    );
    
    return result.rows.length > 0 && result.rows[0].is_admin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export const metadata = {
  title: 'Admin Dashboard | Versaatech',
  description: 'Administrative dashboard for managing jobs and content at Versaatech.',
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/admin');
  }

  // Check if user is admin using database
  if (!session.user.email) {
    redirect('/auth/error?error=AdminAccessRequired');
  }

  const isAdmin = await checkAdminStatus(session.user.email);
  
  if (!isAdmin) {
    redirect('/auth/error?error=AdminAccessRequired');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminPageClient session={session} />
    </div>
  );
} 