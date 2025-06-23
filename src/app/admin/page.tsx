import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions, isUserAdmin } from '@/lib/auth';
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

  const isAdmin = await isUserAdmin(session.user.email);
  
  if (!isAdmin) {
    redirect('/auth/error?error=AdminAccessRequired');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminPageClient session={session} />
    </div>
  );
} 