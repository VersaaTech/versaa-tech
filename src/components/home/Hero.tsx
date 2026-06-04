'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown } from 'lucide-react'

const stats = [
  { value: "12+", label: "Industries Served" },
  { value: "2",   label: "Global Offices" },
  { value: "ISO", label: "9001 Certified" },
  { value: "E2E", label: "HR Solutions" },
]

export function Hero() {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/handshake.webp"
        alt="Background image of two people shaking hands"
        fill
        sizes="100vw"
        quality={80}
        className="object-cover"
        priority
        fetchPriority="high"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center flex-1 py-24">
        <div className="max-w-4xl mx-auto text-center text-white">

          {/* ISO Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            ISO 9001 Certified HR Partner
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            End-to-End{" "}
            <span className="text-blue-400">
              Recruitment, HR &amp; Payroll
            </span>{" "}
            Outsourcing.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            We find the right people, manage day-to-day HR and payroll, and
            provide expert guidance to build a stronger team — across Africa
            and the Middle East.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-base font-semibold rounded-lg shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                Talk to an Expert
              </Button>
            </Link>
            <Link href="/jobs">
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-6 text-base font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                Browse Job Openings
              </Button>
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm max-w-2xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-black/20 px-4 py-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

    </section>
  )
}
