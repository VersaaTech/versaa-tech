import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.users.findUnique({
            where: { email: credentials.email },
            select: { id: true, email: true, password: true, name: true, is_admin: true },
          });

          if (!user) {
            return null;
          }

          // Check password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);

          if (!isValidPassword) {
            return null;
          }
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            isAdmin: user.is_admin === true,
          };
        } catch (error) {
          console.error('Error during user authorization:', error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add custom properties to session from JWT token
      if (session?.user) {
        (session.user as { isAdmin?: boolean }).isAdmin = token.isAdmin || false;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add custom properties to JWT token from user object during login
      if (user) {
        token.isAdmin = (user as { isAdmin?: boolean }).isAdmin || false;
      }

      // Always refresh admin status from database to ensure up-to-date privileges
      // This is important for when admin status changes after login
      if (token.email) {
        try {
          const dbUser = await prisma.users.findUnique({
            where: { email: token.email as string },
            select: { is_admin: true },
          });

          if (dbUser) {
            token.isAdmin = dbUser.is_admin === true;
          } else {
            token.isAdmin = false;
          }
        } catch (error) {
          console.error('Error refreshing admin status in JWT callback:', error);
          // Keep existing value if database query fails
        }
      }

      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    // Add security: JWT max age (7 days)
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Security: Enable CSRF protection
  useSecureCookies: process.env.NODE_ENV === 'production',
};

// Helper function to check if user is admin by querying database
export async function isUserAdmin(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;

  try {
    const user = await prisma.users.findUnique({
      where: { email },
      select: { is_admin: true },
    });

    return user?.is_admin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// Type extensions for NextAuth
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
    };
  }

  interface User {
    isAdmin?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isAdmin?: boolean;
  }
}
