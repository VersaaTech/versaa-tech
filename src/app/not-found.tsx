'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">404</h1>
        
        <div className="relative mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>
        </div>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full 
                     hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          <FaHome className="text-xl" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
}
