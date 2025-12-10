# Web Security Best Practices

Comprehensive security guide for Next.js and React applications.

## Security Headers

Configure security headers in Next.js:

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

## Cross-Site Scripting (XSS) Prevention

### Never Use dangerouslySetInnerHTML with User Content

```typescript
// ❌ DANGEROUS: XSS vulnerable
function Comment({ text }: { text: string }) {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
}

// ✅ SAFE: React escapes by default
function Comment({ text }: { text: string }) {
  return <div>{text}</div>;
}

// ✅ SAFE: Use DOMPurify if you need HTML
import DOMPurify from 'isomorphic-dompurify';

function Comment({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href']
  });
  
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

### Sanitize URLs

```typescript
// ❌ DANGEROUS: javascript: URLs can execute code
function Link({ url, children }) {
  return <a href={url}>{children}</a>;
}

// ✅ SAFE: Validate URLs
function Link({ url, children }: { url: string; children: React.ReactNode }) {
  const isSafeUrl = (url: string) => {
    try {
      const parsed = new URL(url, window.location.origin);
      return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  if (!isSafeUrl(url)) {
    console.error('Unsafe URL blocked:', url);
    return <span>{children}</span>;
  }

  return <a href={url}>{children}</a>;
}
```

## Cross-Site Request Forgery (CSRF) Protection

### CSRF Tokens for Server Actions

```typescript
// lib/csrf.ts
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

export function setCSRFCookie(token: string) {
  cookies().set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  });
}

export function validateCSRFToken(token: string): boolean {
  const cookieToken = cookies().get('csrf-token')?.value;
  return cookieToken === token;
}

// app/actions.ts
'use server';

import { validateCSRFToken } from '@/lib/csrf';

export async function createPost(formData: FormData) {
  const csrfToken = formData.get('csrf-token') as string;
  
  if (!validateCSRFToken(csrfToken)) {
    throw new Error('Invalid CSRF token');
  }

  // Process form...
}

// app/create-post/page.tsx
import { generateCSRFToken, setCSRFCookie } from '@/lib/csrf';

export default function CreatePost() {
  const csrfToken = generateCSRFToken();
  setCSRFCookie(csrfToken);

  return (
    <form action={createPost}>
      <input type="hidden" name="csrf-token" value={csrfToken} />
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}
```

## Authentication and Authorization

### Secure Password Handling

```typescript
// lib/auth.ts
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  // Validate password strength
  if (password.length < 12) {
    throw new Error('Password must be at least 12 characters');
  }

  // Hash with bcrypt (cost factor 12)
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const attempt = loginAttempts.get(identifier);

  if (!attempt || now > attempt.resetAt) {
    loginAttempts.set(identifier, {
      count: 1,
      resetAt: now + 15 * 60 * 1000 // 15 minutes
    });
    return true;
  }

  if (attempt.count >= 5) {
    return false; // Rate limited
  }

  attempt.count++;
  return true;
}
```

### NextAuth.js Setup

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword, checkRateLimit } from '@/lib/auth';

export const authOptions = {
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

        // Rate limiting
        if (!checkRateLimit(credentials.email)) {
          throw new Error('Too many login attempts. Try again later.');
        }

        // Verify credentials
        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !await verifyPassword(credentials.password, user.password)) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Protected Routes

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*']
};

// Check roles in Server Components
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/unauthorized');
  }

  return <div>Admin content</div>;
}
```

## Input Validation

### Zod for Runtime Validation

```typescript
import { z } from 'zod';

// Define schemas
const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/[0-9]/, 'Password must contain number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain special character'),
  age: z.number().int().min(18).max(120),
  website: z.string().url().optional(),
});

// Server Action with validation
'use server';

export async function createUser(formData: FormData) {
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
    age: parseInt(formData.get('age') as string),
  };

  // Validate
  const result = userSchema.safeParse(rawData);

  if (!result.success) {
    return {
      error: 'Validation failed',
      fields: result.error.flatten().fieldErrors
    };
  }

  // Create user with validated data
  const user = await db.user.create({
    data: result.data
  });

  return { success: true, userId: user.id };
}
```

### API Route Validation

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  age: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validated = createUserSchema.parse(body);

    // Create user
    const user = await db.user.create({
      data: validated
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## SQL Injection Prevention

### Use Prisma or ORM

```typescript
// ✅ SAFE: Prisma ORM (parameterized queries)
async function getUser(email: string) {
  return db.user.findUnique({
    where: { email } // Automatically parameterized
  });
}

async function searchUsers(query: string) {
  return db.user.findMany({
    where: {
      name: {
        contains: query, // Safe with Prisma
        mode: 'insensitive'
      }
    }
  });
}

// ❌ DANGEROUS: Raw SQL without parameters
async function getUserDangerous(email: string) {
  return db.$queryRaw`SELECT * FROM users WHERE email = ${email}`;
  // This is actually SAFE because template literals are parameterized in Prisma
}

// ❌ REALLY DANGEROUS: String concatenation
async function getUserVeryDangerous(email: string) {
  return db.$queryRawUnsafe(`SELECT * FROM users WHERE email = '${email}'`);
  // NEVER DO THIS
}
```

## Rate Limiting

### API Route Rate Limiting

```typescript
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        return isRateLimited ? reject() : resolve();
      }),
  };
}

// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function GET(request: NextRequest) {
  try {
    // Use IP address as identifier
    const ip = request.ip ?? 'unknown';
    await limiter.check(10, ip); // 10 requests per minute

    // Process request...
    return NextResponse.json({ data: 'success' });
  } catch {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
}
```

## Environment Variables and Secrets

### Never Expose Secrets to Client

```typescript
// ❌ BAD: Exposes secret to client
// .env
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_test_...

// page.tsx (Client Component)
'use client';

const stripeKey = process.env.STRIPE_SECRET_KEY; // undefined or exposed!

// ✅ GOOD: Use NEXT_PUBLIC_ prefix for client vars only
// .env
DATABASE_URL=postgresql://... // Server-only
STRIPE_SECRET_KEY=sk_test_... // Server-only
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... // Client-safe

// Server Component - can access all env vars
export default async function Page() {
  const data = await fetch(process.env.API_URL); // OK
}

// Client Component - only NEXT_PUBLIC_ vars
'use client';

export function StripeForm() {
  const stripe = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! // OK
  );
}
```

### Use Runtime Config Validation

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
});

export const env = envSchema.parse(process.env);
```

## File Upload Security

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large' },
        { status: 400 }
      );
    }

    // Generate safe filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const hash = crypto.createHash('sha256')
      .update(buffer)
      .digest('hex');
    
    const ext = path.extname(file.name);
    const filename = `${hash}${ext}`;

    // Save to uploads directory (outside public)
    const uploadDir = path.join(process.cwd(), 'uploads');
    await writeFile(
      path.join(uploadDir, filename),
      buffer
    );

    return NextResponse.json({
      success: true,
      filename
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
```

## Logging and Monitoring

### Secure Logging

```typescript
// lib/logger.ts
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: [
      'password',
      'token',
      'apiKey',
      'secret',
      'creditCard',
      'ssn',
      '*.password',
      '*.token',
      'req.headers.authorization',
    ],
    remove: true,
  },
});

export function logSecurityEvent(
  event: string,
  details: Record<string, any>
) {
  logger.warn({
    type: 'security',
    event,
    ...details,
    timestamp: new Date().toISOString(),
  });
}

// Usage
logSecurityEvent('failed_login', {
  email: user.email,
  ip: request.ip,
  userAgent: request.headers['user-agent'],
});
```

## Security Checklist

### Before Deployment

- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] All forms have CSRF protection
- [ ] User input validated on client and server
- [ ] No secrets in client-side code
- [ ] Passwords hashed with bcrypt (cost ≥12)
- [ ] Rate limiting on sensitive endpoints
- [ ] File uploads validated by type and size
- [ ] SQL injection protection (use ORM)
- [ ] XSS prevention (sanitize HTML)
- [ ] Authentication implemented (NextAuth.js)
- [ ] Authorization checks in place
- [ ] HTTPS enforced in production
- [ ] Error messages don't leak sensitive info
- [ ] Logging doesn't include secrets
- [ ] Dependencies updated and scanned
- [ ] Environment variables validated

### Regular Security Practices

1. **Dependency Updates**: Weekly or monthly
2. **Security Audits**: Quarterly
3. **Penetration Testing**: Annually
4. **Log Review**: Daily for errors, weekly for patterns
5. **Incident Response Plan**: Documented and tested

### Common Vulnerabilities (OWASP Top 10)

1. **Broken Access Control** - Always verify permissions
2. **Cryptographic Failures** - Use HTTPS, hash passwords
3. **Injection** - Validate all inputs, use ORMs
4. **Insecure Design** - Security by design, not afterthought
5. **Security Misconfiguration** - Review all settings
6. **Vulnerable Components** - Keep dependencies updated
7. **Authentication Failures** - Implement MFA, rate limiting
8. **Software/Data Integrity** - Verify packages, use SRI
9. **Logging Failures** - Log security events, monitor
10. **SSRF** - Validate and sanitize URLs

## Tools and Resources

- **OWASP**: https://owasp.org/
- **npm audit**: Check for vulnerabilities
- **Snyk**: Continuous security scanning
- **Mozilla Observatory**: Test security headers
- **Security Headers**: https://securityheaders.com/
- **Next.js Security**: https://nextjs.org/docs/pages/building-your-application/configuring/security

Security is ongoing, not a one-time task. Stay vigilant and keep learning!
