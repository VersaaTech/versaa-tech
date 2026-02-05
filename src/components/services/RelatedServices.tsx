'use client'

import Link from 'next/link'
import { ArrowRight, Search, Users, Banknote, UserCog, Settings, BarChart3 } from 'lucide-react'
import * as m from 'framer-motion/m'
import { containerVariants, itemVariants } from './animations'

// Service data with SEO-optimized descriptions
const SERVICES_DATA = {
  'executive-search': {
    title: 'Executive Search',
    href: '/executive-search',
    description: 'Find visionary leaders with our global executive recruitment services and AI-enhanced candidate matching.',
    icon: Search,
  },
  'rpo-recruitment': {
    title: 'RPO Recruitment',
    href: '/rpo-recruitment',
    description: 'Transform talent acquisition with scalable recruitment process outsourcing solutions.',
    icon: Users,
  },
  'payroll-management': {
    title: 'Payroll Management',
    href: '/payroll-management',
    description: 'Ensure accurate, compliant payroll processing with our comprehensive outsourcing services.',
    icon: Banknote,
  },
  'fractional-hr-services': {
    title: 'Fractional HR Services',
    href: '/fractional-hr-services',
    description: 'Access senior HR leadership on-demand with flexible, cost-effective engagement models.',
    icon: UserCog,
  },
  'hr-process-outsourcing': {
    title: 'HR Process Outsourcing',
    href: '/hr-process-outsourcing',
    description: 'Streamline HR operations with end-to-end outsourcing that reduces costs and enhances compliance.',
    icon: Settings,
  },
  'industry-benchmarking': {
    title: 'Industry Benchmarking',
    href: '/industry-benchmarking',
    description: 'Gain competitive intelligence through comprehensive HR benchmarking and market analysis.',
    icon: BarChart3,
  },
} as const

export type ServiceKey = keyof typeof SERVICES_DATA

interface RelatedServicesProps {
  currentService: ServiceKey
  relatedKeys: ServiceKey[]
}

export function RelatedServices({ currentService, relatedKeys }: RelatedServicesProps) {
  // Filter out the current service and get only the related ones
  const relatedServices = relatedKeys
    .filter((key) => key !== currentService)
    .slice(0, 3)
    .map((key) => SERVICES_DATA[key])

  if (relatedServices.length === 0) return null

  return (
    <m.section
      className="py-16 bg-slate-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <m.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-bold font-display text-foreground mb-4">
            Explore Related HR Services
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how our comprehensive HR solutions work together to drive organizational success and business growth.
          </p>
        </m.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {relatedServices.map((service) => {
            const IconComponent = service.icon
            return (
              <m.div key={service.href} variants={itemVariants}>
                <Link
                  href={service.href}
                  className="block h-full p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <IconComponent className="w-8 h-8 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-semibold font-display text-foreground mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-grow mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium text-sm">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </m.div>
            )
          })}
        </div>
      </div>
    </m.section>
  )
}
