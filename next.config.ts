import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
  
  // Build optimization: Set build-time environment
  env: {
    NEXT_PHASE: process.env.NEXT_PHASE || 'phase-production-build',
  },
  
  // Modern browser optimizations
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Performance optimizations
  poweredByHeader: false,
  
  // Experimental features to improve build performance
  experimental: {
    optimizePackageImports: ['@/lib/db'],
    // Enable modern CSS features
    cssChunking: 'strict',
  },
};

export default nextConfig;
