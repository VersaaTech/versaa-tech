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
  RelatedServices,
  ServiceContent,
  type Statistic,
  type Feature,
  type ProcessStep,
  type Benefit,
  type HeroContent,
  type CTAContent,
} from '@/components/services'

// Page-specific content
const HERO_CONTENT: HeroContent = {
  backgroundImage: '/images/hr-benchmarking.webp',
  imageAlt: 'Industry HR Benchmarking Services',
  title: 'Strategic HR Industry Benchmarking',
  description:
    'Gain competitive intelligence through comprehensive industry benchmarking studies that optimize your HR strategies and drive organizational excellence.',
  ctaText: 'Explore Benchmarking Solutions',
}

const CTA_CONTENT: CTAContent = {
  title: 'Ready to Gain Competitive Intelligence?',
  description:
    'Discover how our industry benchmarking services can provide the strategic insights your organization needs to excel.',
  buttonText: 'Request Industry Benchmarking Analysis',
}

const BENCHMARKING_STATS: readonly Statistic[] = [
  {
    number: '500+',
    label: 'Industry Reports',
    description: 'Comprehensive benchmark studies delivered annually',
  },
  {
    number: '50+',
    label: 'Industry Sectors',
    description: 'Specialized benchmarking across diverse verticals',
  },
  {
    number: '85%',
    label: 'Strategic Impact',
    description: 'Organizations report improved decision-making',
  },
  {
    number: '30%',
    label: 'Cost Optimization',
    description: 'Average improvement in HR cost efficiency',
  },
]

const KEY_FEATURES: readonly Feature[] = [
  {
    icon: 'FaChartBar',
    title: 'Compensation Benchmarking',
    description:
      'Comprehensive salary and benefits analysis across industry verticals for competitive positioning and market alignment.',
  },
  {
    icon: 'FaUsers',
    title: 'Talent Market Intelligence',
    description:
      'Real-time insights into talent availability, skill gaps, and competitive landscape for strategic workforce planning.',
  },
  {
    icon: 'FaIndustry',
    title: 'HR Practice Analysis',
    description:
      'Detailed comparison of HR policies, procedures, and practices against industry standards and best performers.',
  },
  {
    icon: 'FaChartLine',
    title: 'Performance Metrics',
    description:
      'Key performance indicator evaluation against industry benchmarks for operational optimization and strategic alignment.',
  },
  {
    icon: 'FaGlobe',
    title: 'Multi-Region Analysis',
    description:
      'Cross-regional benchmarking studies providing global perspective and localized market intelligence.',
  },
  {
    icon: 'FaLightbulb',
    title: 'Best Practice Identification',
    description:
      'Discovery and documentation of industry-leading practices for organizational transformation and competitive advantage.',
  },
]

const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    icon: 'FaClipboardList',
    title: 'Scope Definition',
    description:
      'Define benchmarking objectives, metrics, and target comparison groups for focused analysis',
  },
  {
    icon: 'FaDatabase',
    title: 'Data Collection',
    description:
      'Comprehensive data gathering from industry sources and proprietary databases',
  },
  {
    icon: 'FaChartBar',
    title: 'Analysis & Comparison',
    description:
      'Statistical analysis comparing your organization against relevant industry benchmarks',
  },
  {
    icon: 'FaFileAlt',
    title: 'Insights & Recommendations',
    description:
      'Strategic recommendations based on findings and best practice identification',
  },
]

const KEY_BENEFITS: readonly Benefit[] = [
  {
    title: 'Strategic Decision Making',
    description:
      'Data-driven insights enable informed strategic decisions and competitive positioning',
  },
  {
    title: 'Market Intelligence',
    description:
      'Real-time access to industry trends, salary benchmarks, and competitive intelligence',
  },
  {
    title: 'Performance Optimization',
    description:
      'Identify gaps and opportunities for operational improvement and best practice adoption',
  },
  {
    title: 'Competitive Advantage',
    description:
      'Stay ahead of industry trends and maintain competitive edge through strategic insights',
  },
]

const DATA_DRIVEN_HR_CONTENT = [
  "In an era where talent is the primary differentiator between organizations, HR decisions can no longer rely on intuition or anecdotal evidence. Industry benchmarking provides the objective data foundation that transforms HR from a cost center to a strategic driver of business value. By comparing your organization's HR practices, compensation structures, and workforce metrics against industry peers and best-in-class performers, you gain the intelligence needed to make confident decisions about talent investments, policy changes, and strategic initiatives.",
  "Compensation benchmarking stands at the core of effective talent management. Versaatech's comprehensive salary surveys and compensation analyses provide granular insights into base pay, variable compensation, equity grants, and benefits packages across job families, experience levels, and geographic markets. This intelligence enables you to develop compensation strategies that attract top talent while maintaining fiscal responsibility. Our clients consistently report improved offer acceptance rates and reduced turnover after implementing data-driven compensation adjustments based on our benchmarking insights.",
  "Beyond compensation, our benchmarking services examine the full spectrum of HR practices. We analyze recruiting metrics including time-to-fill, cost-per-hire, and source effectiveness to optimize your talent acquisition investment. Employee engagement scores, turnover rates by tenure and department, and promotion velocity provide insights into retention and development effectiveness. Benefits utilization and cost data inform decisions about plan design and vendor selection. Training investment and development program outcomes reveal opportunities to enhance workforce capability.",
  "Versaatech's benchmarking methodology combines multiple data sources including proprietary surveys, public filings, industry associations, and our extensive client network to deliver the most accurate and comprehensive market intelligence available. Our analysts contextualize data within industry dynamics and regional factors, ensuring benchmarks are truly comparable and actionable. Every benchmarking engagement concludes with strategic recommendations that translate data into action, helping you prioritize initiatives that deliver the greatest impact on organizational performance."
]

export default function IndustryBenchmarkingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LazyMotion features={domAnimation}>
        <ServiceHero content={HERO_CONTENT} />

        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { name: 'Services', href: '/#overview' },
              { name: 'Industry Benchmarking', href: '/industry-benchmarking' }
            ]}
          />
        </div>

        {/* Statistics Section */}
        <MotionServiceSection className="bg-card">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {BENCHMARKING_STATS.map((stat, index) => (
              <MotionStatCard
                key={index}
                stat={stat}
                isLast={index === BENCHMARKING_STATS.length - 1}
              />
            ))}
          </div>
        </MotionServiceSection>

        {/* Key Features Section */}
        <MotionServiceSection className="bg-background">
          <MotionSectionHeader
            title="Comprehensive Benchmarking Solutions"
            subtitle="Our industry benchmarking services provide deep insights into market trends, competitive positioning, and strategic opportunities for your organization."
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
            title="Our Benchmarking Methodology"
            subtitle="Systematic approach to deliver accurate, actionable insights that drive strategic decision-making and organizational transformation."
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
              title="Strategic Advantages"
              subtitle="Leverage industry intelligence to make informed decisions and maintain competitive advantage in your market."
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

        {/* Data-Driven HR Decisions Section */}
        <ServiceContent
          title="Data-Driven HR Decisions"
          content={DATA_DRIVEN_HR_CONTENT}
          className="bg-card"
        />

        {/* Related Services Section */}
        <RelatedServices
          currentService="industry-benchmarking"
          relatedKeys={['executive-search', 'rpo-recruitment', 'fractional-hr-services']}
        />

        <MotionServiceCTA content={CTA_CONTENT} />
      </LazyMotion>
    </div>
  )
}
