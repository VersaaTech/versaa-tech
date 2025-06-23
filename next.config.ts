import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
  
  // Build optimization: Set build-time environment
  env: {
    NEXT_PHASE: process.env.NEXT_PHASE || 'phase-production-build',
  },
  
  // Experimental features to improve build performance
  experimental: {
    optimizePackageImports: ['@/lib/db'],
  },
};

export default nextConfig;
