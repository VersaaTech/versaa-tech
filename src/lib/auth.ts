import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import pool from './db';

// Production-safe logging utility
const isDevelopment = process.env.NODE_ENV === 'development';
const log = {
  info: (message: string, ...args: unknown[]) => {
    if (isDevelopment) console.log(message, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(message, ...args); // Always log errors
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(message, ...args); // Always log warnings
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        log.info('🔐 Auth attempt initiated');
        
        if (!credentials?.email || !credentials?.password) {
          log.info('❌ Missing credentials');
          return null;
        }

        try {
          // Query the database for user
          log.info('🔍 Querying database for user...');
          
          const result = await pool.query(
            'SELECT id, email, password, name, is_admin FROM users WHERE email = $1',
            [credentials.email]
          );

          log.info('📋 Query result:', result.rows.length, 'rows found');
          const user = result.rows[0];
          
          if (!user) {
            log.info('❌ User not found');
            return null;
          }

          log.info('👤 User authentication in progress');

          // Check password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          log.info('✅ Password validation:', isValidPassword ? 'success' : 'failed');
          
          if (!isValidPassword) {
            log.info('❌ Invalid password');
            return null;
          }

          log.info('✅ Authentication successful');
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            isAdmin: user.is_admin,
          };
        } catch (error) {
          log.error('❌ Auth error:', error);
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
      
      // Always refresh admin status from database on every token refresh
      // This ensures admin privileges are up-to-date even if changed in database
      if (token.email) {
        try {
          const result = await pool.query(
            'SELECT is_admin FROM users WHERE email = $1',
            [token.email as string]
          );
          
          const isAdmin = result.rows.length > 0 && result.rows[0].is_admin === true;
          token.isAdmin = isAdmin;
        } catch (error) {
          log.error('Error refreshing admin status in JWT:', error);
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
  debug: isDevelopment,
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
  } catch (error) {
    log.error('Error checking admin status:', error);
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