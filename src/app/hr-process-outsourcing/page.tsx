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
  Banknote,
  Shield,
  FileText,
  Scale,
  Laptop,
  Headphones,
  Search,
  Settings,
  Plug,
  BarChart3
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
const HPO_STATS = [
  {
    number: "40%",
    label: "Cost Reduction",
    description: "Average savings on HR operational costs"
  },
  {
    number: "99%",
    label: "Compliance Rate",
    description: "Regulatory compliance accuracy maintained"
  },
  {
    number: "60%",
    label: "Efficiency Gain",
    description: "Improvement in HR process efficiency"
  },
  {
    number: "24/7",
    label: "Support Available",
    description: "Continuous operational support coverage"
  }
]

const KEY_FEATURES: Feature[] = [
  {
    icon: Banknote,
    title: 'Payroll Processing',
    description: 'Complete payroll management from calculation to disbursement with full compliance and accuracy.'
  },
  {
    icon: Shield,
    title: 'Benefits Administration',
    description: 'Comprehensive employee benefits management and enrollment services for seamless operations.'
  },
  {
    icon: FileText,
    title: 'HR Documentation',
    description: 'Complete HR record keeping, documentation management, and administrative support systems.'
  },
  {
    icon: Scale,
    title: 'Compliance Management',
    description: 'Expert oversight ensuring adherence to labor laws and regulatory requirements.'
  },
  {
    icon: Laptop,
    title: 'Technology Integration',
    description: 'Advanced HRIS platforms and automation tools for optimized workflow efficiency.'
  },
  {
    icon: Headphones,
    title: 'Employee Support',
    description: 'Dedicated HR helpdesk and employee service center for immediate assistance.'
  }
]

const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Search,
    title: 'Process Assessment',
    description: 'Comprehensive evaluation of current HR processes and optimization opportunities'
  },
  {
    icon: Settings,
    title: 'Solution Design',
    description: 'Custom HR outsourcing solutions aligned with business objectives'
  },
  {
    icon: Plug,
    title: 'System Integration',
    description: 'Seamless integration with existing infrastructure and workflows'
  },
  {
    icon: BarChart3,
    title: 'Ongoing Management',
    description: 'Continuous process management with performance monitoring and support'
  }
]

const KEY_BENEFITS = [
  {
    title: "Operational Efficiency",
    description: "Streamlined HR processes reduce administrative burden and enhance productivity"
  },
  {
    title: "Cost Optimization",
    description: "Significant reduction in HR operational costs through economies of scale"
  },
  {
    title: "Enhanced Compliance",
    description: "Expert management ensures full regulatory compliance and risk mitigation"
  },
  {
    title: "Strategic Focus",
    description: "Free internal resources to concentrate on core business and strategic initiatives"
  }
]

const HR_OPERATIONS_CONTENT = [
  "HR process outsourcing represents a fundamental shift in how organizations approach their people operations. Rather than building and maintaining internal HR infrastructure, forward-thinking companies are partnering with specialized providers like Versaatech to handle transactional HR functions with greater efficiency, accuracy, and compliance. This allows internal HR teams to evolve from administrative support functions to strategic business partners focused on talent development, culture building, and organizational effectiveness.",
  "The scope of HR process outsourcing extends across the entire employee lifecycle. From pre-hire background screening and onboarding document management to benefits enrollment, leave administration, and offboarding processes, Versaatech delivers consistent, compliant, and employee-friendly experiences. Our HRIS platforms provide self-service capabilities that empower employees while reducing administrative workload. Managers gain access to real-time workforce data and analytics that inform better decisions about team composition, performance management, and resource allocation.",
  "Compliance represents one of the most compelling drivers for HR outsourcing. Labor regulations, tax requirements, and employment laws vary significantly across jurisdictions and change frequently. Staying current with these requirements demands specialized expertise that most organizations cannot maintain internally. Versaatech's compliance specialists monitor regulatory developments across all the regions where our clients operate, ensuring policies and practices remain current and defensible. This proactive approach to compliance significantly reduces the risk of costly violations and litigation.",
  "Versaatech's HR process outsourcing solutions are designed for flexibility and scalability. Whether you need comprehensive HR administration covering all transactional functions or targeted support in specific areas like benefits administration or compliance management, we customize our engagement to match your needs. Our technology infrastructure scales seamlessly as your organization grows, whether you're adding employees in existing locations or expanding into new markets. Transform your HR operations from a cost center to a competitive advantage with Versaatech's HR process outsourcing expertise."
]

export default function HRProcessOutsourcingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LazyMotion features={domAnimation}>
        {/* Hero Section */}
        <section className="relative h-auto min-h-[50vh] py-12 flex items-center justify-center">
          <Image
            src="/images/hr-outsourcing.webp"
            alt="HR Process Outsourcing Services"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl text-center mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-4">
                HR Process Outsourcing: Streamline Your Operations
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 px-2 sm:px-0">
                Transform your HR processes with comprehensive outsourcing solutions that reduce costs, enhance efficiency, and ensure compliance while freeing your team to focus on strategic initiatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-sm sm:max-w-none mx-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <div className="transition-transform duration-300 ease-in-out hover:scale-105 w-full">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 px-6 py-3 text-base font-semibold w-full sm:w-auto">
                      Explore HR Outsourcing
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
              { name: 'HR Process Outsourcing', href: '/hr-process-outsourcing' }
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
              {HPO_STATS.map((stat, index) => (
                <m.div
                  key={index}
                  className={`text-center p-4 group ${index !== HPO_STATS.length - 1 ? 'md:border-r border-border' : ''}`}
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
                Comprehensive HR Outsourcing Services
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                From payroll processing to compliance management, we handle all your HR operational needs with expertise and precision.
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
                Our Outsourcing Process
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                A proven methodology that ensures seamless transition and continuous optimization of your HR operations.
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
                  Strategic Business Benefits
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Transform your HR operations into a strategic advantage that drives business growth and operational excellence.
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

        {/* Transform Your HR Operations Section */}
        <ServiceContent
          title="Transform Your HR Operations"
          content={HR_OPERATIONS_CONTENT}
          className="bg-card"
        />

        {/* Related Services Section */}
        <RelatedServices
          currentService="hr-process-outsourcing"
          relatedKeys={['payroll-management', 'fractional-hr-services', 'rpo-recruitment']}
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
                Ready to Transform Your HR Operations?
              </h2>
              <p className="text-base md:text-lg mb-6 text-blue-100">
                Discover how our HR process outsourcing can streamline your operations, reduce costs, and enhance strategic focus.
              </p>
              <Link href="/contact">
                <div className="inline-block transition-transform duration-300 ease-in-out hover:scale-105">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-base font-semibold">
                    Get HR Outsourcing Proposal
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
