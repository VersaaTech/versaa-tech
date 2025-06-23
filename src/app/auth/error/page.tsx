'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const errorMessages = {
  AdminAccessRequired: {
    title: 'Admin Access Required',
    description: 'You need admin privileges to access this resource. Please contact your administrator if you believe this is an error.',
  },
  Signin: {
    title: 'Sign In Error',
    description: 'There was an error signing you in. Please try again.',
  },
  OAuthSignin: {
    title: 'OAuth Sign In Error',
    description: 'There was an error with OAuth sign in.',
  },
  OAuthCallback: {
    title: 'OAuth Callback Error',
    description: 'There was an error during OAuth callback.',
  },
  OAuthCreateAccount: {
    title: 'OAuth Account Creation Error',
    description: 'Could not create OAuth account.',
  },
  EmailCreateAccount: {
    title: 'Email Account Creation Error',
    description: 'Could not create email account.',
  },
  Callback: {
    title: 'Callback Error',
    description: 'There was an error in the authentication callback.',
  },
  OAuthAccountNotLinked: {
    title: 'Account Not Linked',
    description: 'To confirm your identity, sign in with the same account you used originally.',
  },
  EmailSignin: {
    title: 'Email Sign In Error',
    description: 'Check your email address.',
  },
  CredentialsSignin: {
    title: 'Invalid Credentials',
    description: 'Sign in failed. Check the details you provided are correct.',
  },
  default: {
    title: 'Authentication Error',
    description: 'An unexpected error occurred during authentication.',
  },
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'default';
  
  const errorInfo = errorMessages[error as keyof typeof errorMessages] || errorMessages.default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Authentication Error</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 text-center">
              {errorInfo.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              {errorInfo.description}
            </p>

            {error === 'AdminAccessRequired' && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
                <p className="font-medium">Admin Access Information:</p>
                <p>Only authorized administrators can access the admin dashboard. If you were recently granted admin privileges, you may need to refresh your session.</p>
                <div className="mt-2">
                  <Link href="/auth/refresh-session" className="font-medium text-blue-600 hover:text-blue-500 underline">
                    Refresh Session
                  </Link>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/auth/signin">
                  Try Again
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Error Code: {error}</p>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Loading...</h1>
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
} 