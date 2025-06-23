import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5; // 5 attempts per 15 minutes

  const current = rateLimitMap.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (current.count >= maxAttempts) {
    return { allowed: false, remaining: 0 };
  }

  current.count++;
  return { allowed: true, remaining: maxAttempts - current.count };
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const { allowed, remaining } = getRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many registration attempts. Please try again later.',
          rateLimitExceeded: true
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '900', // 15 minutes
            'X-RateLimit-Remaining': '0'
          }
        }
      );
    }

    const { email, password, name } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { 
          status: 400,
          headers: { 'X-RateLimit-Remaining': remaining.toString() }
        }
      );
    }

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Enhanced password validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password with higher cost for better security
    const hashedPassword = await bcrypt.hash(password, 14);

    // Create user with is_admin = false by default
    const result = await pool.query(
      'INSERT INTO users (email, password, name, is_admin, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, email, name, is_admin, created_at',
      [email.toLowerCase(), hashedPassword, name.trim(), false]
    );

    const newUser = result.rows[0];

    console.log('✅ User registered successfully:', newUser.email);

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        is_admin: newUser.is_admin,
        created_at: newUser.created_at
      }
    }, {
      headers: { 'X-RateLimit-Remaining': remaining.toString() }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    
    // Don't expose internal errors to client
    const isDev = process.env.NODE_ENV === 'development';
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Registration failed. Please try again.',
        ...(isDev && { details: error instanceof Error ? error.message : 'Unknown error' })
      },
      { status: 500 }
    );
  }
} 