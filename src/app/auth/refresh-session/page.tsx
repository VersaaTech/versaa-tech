'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, LogOut, CheckCircle, AlertCircle } from 'lucide-react';

export default function RefreshSessionPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Auto-refresh session when component mounts
    handleRefreshSession();
  }, []);

  const handleRefreshSession = async () => {
    setRefreshing(true);
    setMessage('Refreshing your session...');
    
    try {
      // Force NextAuth to refresh the session
      await update();
      setMessage('Session refreshed successfully! Your privileges have been updated.');
      
      // Redirect to admin page after a short delay
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } catch (error) {
      console.error('Error refreshing session:', error);
      setMessage('Failed to refresh session. Please try signing out and back in.');
    } finally {
      setRefreshing(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Refresh Session</h1>
          <p className="mt-2 text-gray-600">Updating your access privileges</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
              Session Refresh
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {session && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Signed in as:</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">{session.user?.email}</p>
                <p className="text-sm text-blue-700">
                  Admin Status: {(session.user as any)?.isAdmin ? 'Yes' : 'No'}
                </p>
              </div>
            )}

            {message && (
              <div className={`p-3 border rounded-md ${
                message.includes('successfully') 
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : message.includes('Failed')
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}>
                <div className="flex items-center gap-2">
                  {message.includes('successfully') ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : message.includes('Failed') ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  )}
                  <span className="text-sm">{message}</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleRefreshSession}
                disabled={refreshing}
                className="w-full"
              >
                {refreshing ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Refreshing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Refresh Session
                  </div>
                )}
              </Button>

              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out & Sign Back In
              </Button>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="font-medium text-yellow-800">Why refresh your session?</p>
                <p className="text-yellow-700 mt-1">
                  If an administrator has recently granted you admin privileges, you need to refresh 
                  your session to access admin features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 