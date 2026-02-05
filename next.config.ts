import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    qualities: [50, 75],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
    optimizePackageImports: ['@/lib/db', 'lucide-react', 'framer-motion'],
    // Enable modern CSS features
    cssChunking: 'strict',
  },
};

export default nextConfig;
