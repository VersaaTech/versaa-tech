'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import {
  ServiceHero,
  MotionServiceSection,
  MotionSectionHeader,
  MotionStatCard,
  MotionFeatureCard,
  MotionProcessStepCard,
  MotionBenefitCard,
  MotionServiceCTA,
  ServiceContent,
  RelatedServices,
  type Statistic,
  type Feature,
  type ProcessStep,
  type Benefit,
  type HeroContent,
  type CTAContent,
} from '@/components/services'

// Page-specific content
const HERO_CONTENT: HeroContent = {
  backgroundImage: '/images/recruitment-outsourcing.webp',
  imageAlt: 'RPO Recruitment Process Outsourcing',
  title: 'RPO Solutions: Transform Your Talent Acquisition',
  description:
    'Scale your recruitment with our comprehensive RPO solutions. From sourcing to onboarding, we deliver quality candidates faster and more cost-effectively.',
  ctaText: 'Explore RPO Solutions',
}

const CTA_CONTENT: CTAContent = {
  title: 'Ready to Revolutionize Your Recruitment?',
  description:
    'Discover how our RPO solutions can transform your talent acquisition strategy and deliver exceptional results for your organization.',
  buttonText: 'Start Your RPO Partnership',
}

const RPO_STATS: readonly Statistic[] = [
  {
    number: '50%',
    label: 'Faster Hiring',
    description: 'Reduced time-to-fill with optimized processes',
  },
  {
    number: '40%',
    label: 'Cost Savings',
    description: 'Lower recruitment costs through efficiency',
  },
  {
    number: '98%',
    label: 'Client Satisfaction',
    description: 'Proven track record of successful partnerships',
  },
  {
    number: '95%',
    label: 'Quality Hires',
    description: 'Higher retention rates and performance',
  },
]

const KEY_FEATURES: readonly Feature[] = [
  {
    icon: 'FaRecycle',
    title: 'End-to-End Recruitment',
    description:
      'Complete recruitment lifecycle management from sourcing to onboarding with dedicated support teams.',
  },
  {
    icon: 'FaRobot',
    title: 'AI-Enhanced Sourcing',
    description:
      'Advanced technology and machine learning algorithms for intelligent candidate matching and discovery.',
  },
  {
    icon: 'FaChartLine',
    title: 'Scalable Solutions',
    description:
      'Flexible engagement models that adapt to your hiring volume and organizational needs.',
  },
  {
    icon: 'FaClock',
    title: 'Rapid Deployment',
    description:
      'Quick setup and immediate impact with streamlined processes and proven methodologies.',
  },
  {
    icon: 'FaShieldAlt',
    title: 'Quality Assurance',
    description:
      'Rigorous screening and assessment processes ensuring only top-tier candidates advance.',
  },
  {
    icon: 'FaChartBar',
    title: 'Data-Driven Insights',
    description:
      'Comprehensive analytics and reporting for informed decision-making and continuous improvement.',
  },
]

const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    icon: 'FaClipboardList',
    title: 'Requirements Analysis',
    description:
      'Deep understanding of your hiring needs and organizational culture',
  },
  {
    icon: 'FaSearch',
    title: 'Talent Acquisition',
    description:
      'Multi-channel sourcing and candidate identification using advanced tools',
  },
  {
    icon: 'FaUserCheck',
    title: 'Screening & Assessment',
    description:
      'Comprehensive evaluation including skills testing and cultural fit',
  },
  {
    icon: 'FaHandshake',
    title: 'Onboarding Support',
    description: 'Seamless integration and post-hire success tracking',
  },
]

const KEY_BENEFITS: readonly Benefit[] = [
  {
    title: 'Reduced Overhead',
    description:
      'Eliminate recruitment infrastructure costs while maintaining quality standards',
  },
  {
    title: 'Market Intelligence',
    description:
      'Access to real-time salary benchmarks and talent market insights',
  },
  {
    title: 'Flexibility',
    description:
      'Scale recruitment efforts up or down based on business demands',
  },
  {
    title: 'Technology Access',
    description:
      'Leverage cutting-edge recruitment tools without additional investment',
  },
]

const RPO_ADVANTAGE_CONTENT = [
  "Recruitment Process Outsourcing (RPO) represents a strategic evolution in how organizations approach talent acquisition. Unlike traditional staffing agencies that simply fill positions, RPO providers like Versaatech become an extension of your internal team, assuming ownership of the design, management, and execution of your entire recruitment function. This comprehensive approach delivers consistent hiring outcomes, reduces costs, and enables internal HR teams to focus on strategic initiatives rather than administrative recruitment tasks.",
  "The RPO advantage extends far beyond cost savings. Organizations partnering with Versaatech gain access to sophisticated applicant tracking systems, AI-powered candidate matching technology, and comprehensive analytics platforms without the capital investment these tools typically require. Our recruitment specialists bring deep expertise in employer branding, candidate experience optimization, and multi-channel sourcing strategies that attract both active job seekers and passive talent. This combination of technology and expertise translates to faster time-to-fill, higher quality hires, and improved retention rates.",
  "Scalability is another critical benefit of RPO partnerships. Whether your organization faces seasonal hiring surges, rapid expansion initiatives, or needs to scale back during market contractions, our flexible engagement models adapt to your evolving requirements. You maintain control over hiring decisions while we handle sourcing, screening, scheduling, and administrative processes. This partnership model ensures consistent candidate quality regardless of hiring volume while providing the agility modern businesses need to compete for talent.",
  "Versaatech's RPO solutions are built on transparency and accountability. We establish clear metrics and KPIs from the outset, providing regular reporting on time-to-fill, cost-per-hire, source effectiveness, and candidate quality indicators. Our clients gain visibility into their recruitment performance with actionable insights that drive continuous improvement. When you choose Versaatech for RPO, you're not just outsourcing recruitment - you're gaining a strategic talent acquisition partner committed to your long-term success."
]

export default function RPORecruitmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <LazyMotion features={domAnimation}>
        <ServiceHero content={HERO_CONTENT} />

        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { name: 'Services', href: '/#overview' },
              { name: 'RPO Recruitment', href: '/rpo-recruitment' }
            ]}
          />
        </div>

        {/* Statistics Section */}
        <MotionServiceSection className="bg-card">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {RPO_STATS.map((stat, index) => (
              <MotionStatCard
                key={index}
                stat={stat}
                isLast={index === RPO_STATS.length - 1}
              />
            ))}
          </div>
        </MotionServiceSection>

        {/* Key Features Section */}
        <MotionServiceSection className="bg-background">
          <MotionSectionHeader
            title="Why Choose Our RPO Services"
            subtitle="We transform your talent acquisition with comprehensive recruitment solutions that scale with your business needs and deliver measurable results."
          />
          <div className="grid grid-cols-1 md:grid-cols-3">
            {KEY_FEATURES.map((feature, index) => {
              const isLastInRow = (index + 1) % 3 === 0
              const isLastRow = index >= KEY_FEATURES.length - 3
              return (
                <MotionFeatureCard
                  key={index}
                  feature={feature}
                  isLastInRow={isLastInRow}
                  isLastRow={isLastRow}
                />
              )
            })}
          </div>
        </MotionServiceSection>

        {/* Process Overview Section */}
        <MotionServiceSection className="bg-card">
          <MotionSectionHeader
            title="Our Proven RPO Process"
            subtitle="From strategic planning to seamless delivery, we ensure every recruitment cycle drives organizational growth and talent excellence."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <MotionProcessStepCard
                key={index}
                step={step}
                isLast={index === PROCESS_STEPS.length - 1}
              />
            ))}
          </div>
        </MotionServiceSection>

        {/* Benefits Section */}
        <MotionServiceSection className="bg-background">
          <div className="max-w-4xl mx-auto">
            <MotionSectionHeader
              title="The Versaatech RPO Advantage"
              subtitle="Experience the power of a truly integrated recruitment partnership that grows with your business."
            />
            <div className="grid grid-cols-1 md:grid-cols-2">
              {KEY_BENEFITS.map((benefit, index) => {
                const isLastInRow = (index + 1) % 2 === 0
                const isLastRow = index >= KEY_BENEFITS.length - 2
                return (
                  <MotionBenefitCard
                    key={index}
                    benefit={benefit}
                    isLastInRow={isLastInRow}
                    isLastRow={isLastRow}
                  />
                )
              })}
            </div>
          </div>
        </MotionServiceSection>

        {/* The RPO Advantage Section */}
        <ServiceContent
          title="The RPO Advantage"
          content={RPO_ADVANTAGE_CONTENT}
          className="bg-card"
        />

        {/* Related Services Section */}
        <RelatedServices
          currentService="rpo-recruitment"
          relatedKeys={['executive-search', 'hr-process-outsourcing', 'payroll-management']}
        />

        <MotionServiceCTA content={CTA_CONTENT} />
      </LazyMotion>
    </div>
  )
}
