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
  UserCog,
  Maximize2,
  Shield,
  TrendingUp,
  Users,
  Rocket,
  Search,
  UserCheck,
  Handshake,
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
const HR_STATS = [
  {
    number: "70%",
    label: "Cost Savings",
    description: "Reduction in HR leadership costs vs full-time hire"
  },
  {
    number: "90%",
    label: "Client Satisfaction",
    description: "Organizations renew fractional HR partnerships"
  },
  {
    number: "3x",
    label: "Faster Setup",
    description: "Quicker HR implementation than traditional hiring"
  },
  {
    number: "25+",
    label: "Industries Served",
    description: "Cross-sector expertise and best practices"
  }
]

const KEY_FEATURES: Feature[] = [
  {
    icon: UserCog,
    title: 'Strategic HR Leadership',
    description: 'Senior-level HR executives providing strategic guidance, organizational development, and people strategy alignment.'
  },
  {
    icon: Maximize2,
    title: 'Flexible Engagement Models',
    description: 'Scalable HR support from part-time leadership to project-based consulting, adapting to your business needs.'
  },
  {
    icon: Shield,
    title: 'Compliance & Risk Management',
    description: 'Expert guidance on HR policies, procedures, and regulatory compliance to protect your organization.'
  },
  {
    icon: TrendingUp,
    title: 'Performance & Analytics',
    description: 'Data-driven HR insights and metrics to support strategic decision-making and operational excellence.'
  },
  {
    icon: Users,
    title: 'Talent Management',
    description: 'Comprehensive talent acquisition, development, and retention strategies for sustainable growth.'
  },
  {
    icon: Rocket,
    title: 'Immediate Impact',
    description: 'Experienced professionals who contribute from day one without the typical ramp-up time.'
  }
]

const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Search,
    title: 'Needs Assessment',
    description: 'Comprehensive analysis of your HR requirements and organizational goals'
  },
  {
    icon: UserCheck,
    title: 'Expert Matching',
    description: 'Careful selection of HR professionals with relevant industry experience'
  },
  {
    icon: Handshake,
    title: 'Engagement Setup',
    description: 'Flexible arrangement design with clear deliverables and success metrics'
  },
  {
    icon: BarChart3,
    title: 'Continuous Value',
    description: 'Ongoing strategic support with regular reviews and adaptable scope'
  }
]

const KEY_BENEFITS = [
  {
    title: "Cost-Effective Leadership",
    description: "Access senior HR expertise at a fraction of the cost of a full-time executive hire"
  },
  {
    title: "Immediate Expertise",
    description: "Leverage experienced professionals who can contribute immediately without ramp-up time"
  },
  {
    title: "Scalable Flexibility",
    description: "Adjust HR support based on your changing business needs and growth trajectory"
  },
  {
    title: "Strategic Innovation",
    description: "Gain fresh perspectives and best practices from leaders across multiple organizations"
  }
]

const FRACTIONAL_HR_CONTENT = [
  "The modern business landscape presents a unique challenge for growing organizations: they need sophisticated HR leadership to scale effectively, but may not have the budget, workload, or organizational complexity to justify a full-time Chief Human Resources Officer or VP of HR. This is precisely where fractional HR services provide transformative value. Versaatech's fractional HR model gives you access to seasoned HR executives who work with your organization on a part-time or project basis, delivering strategic guidance and operational expertise when you need it most.",
  "Fractional HR is not simply about cost savings, though organizations typically save 60-70% compared to full-time executive hires. The real value lies in gaining access to HR leaders who have built and scaled people functions across multiple organizations and industries. These professionals bring battle-tested frameworks for talent management, performance optimization, compensation design, and organizational development that would take years to develop internally. They've navigated complex situations from rapid scaling and mergers to workforce reductions and cultural transformations.",
  "Versaatech's fractional HR professionals seamlessly integrate with your leadership team, participating in strategic planning sessions, developing people strategies aligned with business objectives, and providing guidance on critical decisions. They establish HR infrastructure including policies, processes, and technology systems that scale with your growth. Whether you need help developing your first employee handbook, designing a compensation philosophy, implementing performance management, or navigating a complex employee relations issue, our fractional HR leaders bring the expertise to guide you effectively.",
  "The flexibility of fractional HR engagements makes this model particularly valuable for organizations experiencing transition or growth. Startups preparing for Series A funding often engage fractional HR to professionalize their people operations. Companies entering new markets use fractional HR to navigate unfamiliar labor regulations. Organizations implementing major changes leverage fractional HR for change management expertise. Whatever your situation, Versaatech's fractional HR services provide the strategic leadership your organization needs to build a high-performing workforce."
]

export default function FractionalHRServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <LazyMotion features={domAnimation}>
        {/* Hero Section */}
        <section className="relative h-auto min-h-[50vh] py-12 flex items-center justify-center">
          <Image
            src="/images/fractional-hr.webp"
            alt="Fractional HR Services"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl text-center mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-4">
                Fractional HR: Strategic Leadership On-Demand
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 px-2 sm:px-0">
                Access senior HR expertise with flexible engagement models that scale with your business needs while reducing costs and accelerating results.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-sm sm:max-w-none mx-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <div className="transition-transform duration-300 ease-in-out hover:scale-105 w-full">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 px-6 py-3 text-base font-semibold w-full sm:w-auto">
                      Explore Fractional HR Solutions
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
              { name: 'Fractional HR Services', href: '/fractional-hr-services' }
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
              {HR_STATS.map((stat, index) => (
                <m.div
                  key={index}
                  className={`text-center p-4 group ${index !== HR_STATS.length - 1 ? 'md:border-r border-border' : ''}`}
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
                Comprehensive Fractional HR Solutions
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Our fractional HR services provide strategic leadership and operational excellence with the flexibility your growing business needs.
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
                Our Engagement Process
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                A streamlined approach to deliver immediate value and strategic HR leadership tailored to your organization&apos;s unique needs.
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
                  The Fractional HR Advantage
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Experience the benefits of senior HR leadership without the full-time commitment or cost.
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

        {/* Is Fractional HR Right for You Section */}
        <ServiceContent
          title="Is Fractional HR Right for You?"
          content={FRACTIONAL_HR_CONTENT}
          className="bg-card"
        />

        {/* Related Services Section */}
        <RelatedServices
          currentService="fractional-hr-services"
          relatedKeys={['hr-process-outsourcing', 'executive-search', 'industry-benchmarking']}
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
                Ready to Scale Your HR Capabilities?
              </h2>
              <p className="text-base md:text-lg mb-6 text-blue-100">
                Discover how our fractional HR services can provide the strategic leadership your business needs to grow.
              </p>
              <Link href="/contact">
                <div className="inline-block transition-transform duration-300 ease-in-out hover:scale-105">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-base font-semibold">
                    Request Fractional HR Consultation
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
