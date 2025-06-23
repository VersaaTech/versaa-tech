import { NextResponse } from 'next/server';

export async function GET() {
  // Security: Setup diagnostics disabled for production security
  return NextResponse.json(
    { success: false, error: 'Setup diagnostics are disabled for security' },
    { status: 403 }
  );
} 