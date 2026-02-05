"use client"

import { createElement } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import * as m from 'framer-motion/m'
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle,
  Calculator,
  Receipt,
  Shield,
  Globe,
  Clock,
  BarChart3,
  Database,
  CreditCard
} from 'lucide-react'
import { RelatedServices, ServiceContent } from '@/components/services'

// TypeScript interfaces
interface Feature {
  icon: React.ElementType
  title: string
  description: string
}

interface ProcessStep {
  icon: React.ElementType
  title: string
  description: string
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
}

// Static data
const PAYROLL_STATS = [
  {
    number: "99.9%",
    label: "Accuracy Rate",
    description: "Payroll processing accuracy maintained consistently"
  },
  {
    number: "50%",
    label: "Time Savings",
    description: "Reduction in payroll administration time"
  },
  {
    number: "100%",
    label: "Compliance",
    description: "Full adherence to tax and labor regulations"
  },
  {
    number: "24h",
    label: "Processing Time",
    description: "Maximum payroll processing turnaround"
  }
]

const KEY_FEATURES: Feature[] = [
  {
    icon: Calculator,
    title: 'Payroll Processing',
    description: 'End-to-end payroll calculation and disbursement services with complete accuracy and timeliness.'
  },
  {
    icon: Receipt,
    title: 'Tax Management',
    description: 'Complete tax calculation, deduction, and filing services ensuring full regulatory compliance.'
  },
  {
    icon: Shield,
    title: 'Benefits Integration',
    description: 'Seamless integration of employee benefits with payroll systems for comprehensive management.'
  },
  {
    icon: Globe,
    title: 'Multi-Location Support',
    description: 'Centralized payroll processing across multiple locations and jurisdictions with local compliance.'
  },
  {
    icon: Clock,
    title: 'Time & Attendance',
    description: 'Automated integration with time tracking systems for accurate hours and attendance management.'
  },
  {
    icon: BarChart3,
    title: 'Reporting & Analytics',
    description: 'Comprehensive payroll reports and analytics for strategic decision-making and compliance documentation.'
  }
]

const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Database,
    title: 'Data Collection',
    description: 'Secure collection and verification of employee data and time records'
  },
  {
    icon: Calculator,
    title: 'Payroll Calculation',
    description: 'Accurate calculation of gross pay, deductions, taxes, and net pay'
  },
  {
    icon: CheckCircle,
    title: 'Review & Approval',
    description: 'Comprehensive payroll review process with client approval workflow'
  },
  {
    icon: CreditCard,
    title: 'Payment Processing',
    description: 'Secure and timely salary payments through multiple disbursement channels'
  }
]

const KEY_BENEFITS = [
  {
    title: "Guaranteed Accuracy",
    description: "99.9% accuracy rate with comprehensive error detection and correction processes"
  },
  {
    title: "Cost Efficiency",
    description: "Significant reduction in payroll administration costs and resource requirements"
  },
  {
    title: "Full Compliance",
    description: "Expert management of tax regulations and labor law compliance across jurisdictions"
  },
  {
    title: "Time Liberation",
    description: "Free internal resources to focus on strategic business activities and growth initiatives"
  }
]

const PAYROLL_SOLUTIONS_CONTENT = [
  "Payroll management is one of the most critical yet administratively burdensome functions in any organization. Every pay cycle brings a complex web of calculations involving base salaries, overtime, bonuses, commissions, tax withholdings, benefits deductions, and statutory contributions that must be executed with precision. A single error can result in employee dissatisfaction, compliance penalties, and significant remediation costs. This is why leading organizations worldwide are turning to specialized payroll outsourcing partners like Versaatech to ensure accuracy, compliance, and efficiency.",
  "Versaatech's comprehensive payroll solutions go far beyond simple salary calculations. Our services encompass the entire payroll lifecycle, from time and attendance integration to tax filing and year-end reporting. We handle multi-state and multi-country payroll complexities, ensuring compliance with diverse tax jurisdictions and labor regulations. Our team stays current with constantly evolving tax codes, minimum wage requirements, and reporting obligations so you don't have to divert internal resources to tracking regulatory changes.",
  "Technology plays a central role in our payroll delivery. We deploy secure, cloud-based payroll platforms that provide real-time visibility into payroll data while maintaining the highest standards of data security and privacy. Our systems integrate seamlessly with your existing HRIS, time tracking, and benefits administration platforms, eliminating manual data entry and reducing error rates. Employees gain self-service access to pay stubs, tax documents, and benefits information, reducing HR inquiries while improving satisfaction.",
  "Beyond operational excellence, Versaatech provides strategic value through payroll analytics and reporting. Our clients receive detailed insights into labor costs, overtime trends, and compensation patterns that inform workforce planning and budgeting decisions. When you partner with Versaatech for payroll management, you gain not just a service provider but a strategic ally committed to helping you optimize your total cost of employment while ensuring every employee is paid accurately and on time."
]

export default function PayrollManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <LazyMotion features={domAnimation}>
        {/* Hero Section */}
        <section className="relative h-auto min-h-[50vh] py-12 flex items-center justify-center">
          <Image
            src="/images/payroll-outsourcing.png"
            alt="Payroll Management Services"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl text-center mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-4">
                Precision
                <span className="bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text block">
                  Payroll Management
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 px-2 sm:px-0">
                Experience flawless payroll processing with our comprehensive outsourcing solutions that guarantee accuracy, compliance, and timely payments while reducing your administrative burden.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-sm sm:max-w-none mx-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <div className="transition-transform duration-300 ease-in-out hover:scale-105 w-full">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 px-6 py-3 text-base font-semibold w-full sm:w-auto">
                      Explore Payroll Solutions
                    </Button>
                  </div>
                </Link>
                <Link href="#features" className="w-full sm:w-auto">
                  <div className="transition-transform duration-300 ease-in-out hover:scale-105 w-full">
                    <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 text-base font-semibold w-full sm:w-auto backdrop-blur-sm">
                      Learn More
                    </Button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { name: 'Services', href: '/#overview' },
              { name: 'Payroll Management', href: '/payroll-management' }
            ]}
          />
        </div>

        {/* Statistics Section */}
        <m.section
          className="py-16 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {PAYROLL_STATS.map((stat, index) => (
                <m.div
                  key={index}
                  className={`text-center p-4 group ${index !== PAYROLL_STATS.length - 1 ? 'md:border-r border-border' : ''}`}
                  variants={itemVariants}
                >
                  <div className="text-3xl md:text-4xl font-bold font-display bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-base md:text-lg font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-blue-600">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </m.section>

        {/* Key Features Section */}
        <m.section
          id="features"
          className="py-16 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <m.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl font-bold font-display text-foreground mb-4">
                Complete Payroll Solutions
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                From calculation to compliance, our comprehensive payroll services ensure accuracy, timeliness, and peace of mind for your organization.
              </p>
            </m.div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {KEY_FEATURES.map((feature, index) => {
                const isLastInRow = (index + 1) % 3 === 0
                const isLastRow = index >= KEY_FEATURES.length - 3
                return (
                  <m.div
                    key={index}
                    className={`
                      relative p-6 group
                      border-b border-border
                      ${!isLastInRow ? 'md:border-r' : ''}
                      ${isLastRow ? 'md:border-b-0' : ''}
                      last:border-b-0 md:last:border-b-0
                    `}
                    variants={itemVariants}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4">
                        {createElement(feature.icon, {
                          className: "w-7 h-7 text-blue-600 transition-transform duration-300 group-hover:scale-110"
                        })}
                      </div>
                      <h3 className="text-xl font-semibold font-display text-foreground mb-2 transition-colors duration-300 group-hover:text-blue-600">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </m.div>
                )
              })}
            </div>
          </div>
        </m.section>

        {/* Process Overview Section */}
        <m.section
          className="py-16 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <m.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-3xl font-bold font-display text-foreground mb-4">
                Our Payroll Process
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                A streamlined, secure, and accurate payroll processing workflow that ensures timely payments and complete compliance.
              </p>
            </m.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((step, index) => (
                <m.div
                  key={index}
                  className={`
                    relative p-6 group text-center
                    ${index !== PROCESS_STEPS.length - 1 ? 'lg:border-r border-border' : ''}
                  `}
                  variants={itemVariants}
                >
                  <div className="flex items-center justify-center mb-4">
                    {createElement(step.icon, {
                      className: "w-8 h-8 text-blue-600 transition-transform duration-300 group-hover:scale-110"
                    })}
                  </div>
                  <h3 className="text-lg font-semibold font-display text-foreground mb-3 transition-colors duration-300 group-hover:text-blue-600">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </m.section>

        {/* Benefits Section */}
        <m.section
          className="py-16 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <m.div className="text-center mb-12" variants={itemVariants}>
                <h2 className="text-3xl font-bold font-display text-foreground mb-4">
                  Payroll Excellence Benefits
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Experience the advantages of professional payroll management that drives operational efficiency and strategic focus.
                </p>
              </m.div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {KEY_BENEFITS.map((benefit, index) => {
                  const isLastInRow = (index + 1) % 2 === 0
                  const isLastRow = index >= KEY_BENEFITS.length - 2
                  return (
                    <m.div
                      key={index}
                      className={`
                        flex items-start gap-4 p-6 group
                        border-b border-border
                        ${!isLastInRow ? 'md:border-r' : ''}
                        ${isLastRow ? 'md:border-b-0' : ''}
                        last:border-b-0 md:last:border-b-0
                      `}
                      variants={itemVariants}
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
                      <div>
                        <h3 className="text-lg font-semibold font-display text-foreground mb-2 transition-colors duration-300 group-hover:text-blue-600">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground text-base">
                          {benefit.description}
                        </p>
                      </div>
                    </m.div>
                  )
                })}
              </div>
            </div>
          </div>
        </m.section>

        {/* Comprehensive Payroll Solutions Section */}
        <ServiceContent
          title="Comprehensive Payroll Solutions"
          content={PAYROLL_SOLUTIONS_CONTENT}
          className="bg-card"
        />

        {/* Related Services Section */}
        <RelatedServices
          currentService="payroll-management"
          relatedKeys={['hr-process-outsourcing', 'fractional-hr-services', 'industry-benchmarking']}
        />

        {/* CTA Section */}
        <m.section
          className="py-16 bg-gradient-to-r from-blue-600 to-blue-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <m.div className="max-w-3xl mx-auto text-center text-white" variants={itemVariants}>
              <h2 className="text-3xl font-bold font-display mb-4">
                Ready for Perfect Payroll?
              </h2>
              <p className="text-base md:text-lg mb-6 text-blue-100">
                Discover how our payroll management services can ensure accuracy, compliance, and efficiency for your organization.
              </p>
              <Link href="/contact">
                <div className="inline-block transition-transform duration-300 ease-in-out hover:scale-105">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-base font-semibold">
                    Get Payroll Management Quote
                  </Button>
                </div>
              </Link>
            </m.div>
          </div>
        </m.section>
      </LazyMotion>
    </div>
  )
}
