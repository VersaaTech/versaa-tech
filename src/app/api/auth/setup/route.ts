import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Security: Only allow setup diagnostics in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, error: 'Setup diagnostics are disabled in production' },
        { status: 403 }
      );
    }

    console.log('🔧 Running database setup diagnostics...');
    
    // Test database connection
    const connectionTest = await pool.query('SELECT NOW() as current_time, current_database() as database');
    console.log('✅ Database connection successful:', connectionTest.rows[0]);
    
    // Check if users table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    
    const usersTableExists = tableCheck.rows[0].exists;
    console.log('📋 Users table exists:', usersTableExists);
    
    if (!usersTableExists) {
      return NextResponse.json({
        success: false,
        error: 'Users table does not exist. Please run database migrations first.',
        diagnostics: {
          database_connected: true,
          users_table_exists: false
        }
      }, { status: 500 });
    }
    
    // Check table structure
    const tableStructure = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position;
    `);
    
    console.log('📋 Users table structure:', tableStructure.rows);
    
    // Count existing users
    const userCount = await pool.query('SELECT COUNT(*) as total FROM users');
    const adminCount = await pool.query('SELECT COUNT(*) as total FROM users WHERE is_admin = true');
    
    console.log('👥 Total users:', userCount.rows[0].total);
    console.log('👑 Admin users:', adminCount.rows[0].total);
    
    // List admin users (without sensitive data)
    const adminUsers = await pool.query(
      'SELECT id, email, name, created_at FROM users WHERE is_admin = true ORDER BY created_at'
    );
    
    return NextResponse.json({
      success: true,
      message: 'Database setup diagnostics completed',
      diagnostics: {
        database_connected: true,
        users_table_exists: usersTableExists,
        table_structure: tableStructure.rows,
        total_users: parseInt(userCount.rows[0].total),
        admin_users: parseInt(adminCount.rows[0].total),
        admin_user_emails: adminUsers.rows.map(user => user.email)
      }
    });

  } catch (error) {
    console.error('❌ Setup diagnostics error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database diagnostics failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 