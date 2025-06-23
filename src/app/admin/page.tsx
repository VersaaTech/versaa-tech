import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
import AdminPageClient from './AdminPageClient';

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

  // Query database to check admin status
  const result = await pool.query(
    'SELECT is_admin FROM users WHERE email = $1',
    [session.user.email]
  );
  
  const isAdmin = result.rows.length > 0 && result.rows[0].is_admin === true;
  
  if (!isAdmin) {
    redirect('/auth/error?error=AdminAccessRequired');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminPageClient session={session} />
    </div>
  );
} 