import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import pool from './db';

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
          const result = await pool.query(
            'SELECT id, email, password, name, is_admin FROM users WHERE email = $1',
            [credentials.email]
          );

          const user = result.rows[0];
          
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
            isAdmin: user.is_admin,
          };
        } catch (_error) {
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
          const result = await pool.query(
            'SELECT is_admin FROM users WHERE email = $1',
            [token.email as string]
          );
          
          if (result.rows.length > 0) {
            token.isAdmin = result.rows[0].is_admin === true;
          } else {
            token.isAdmin = false;
          }
        } catch (_error) {
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
    const result = await pool.query(
      'SELECT is_admin FROM users WHERE email = $1',
      [email]
    );
    
    return result.rows.length > 0 && result.rows[0].is_admin === true;
  } catch (_error) {
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