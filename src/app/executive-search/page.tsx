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
  backgroundImage: '/images/executive-search-hero.avif',
  imageAlt: 'Executive Search',
  title: 'Executive Search: Find Your Game-Changing Leader',
  description:
    'Connect with visionary executives who transform organizations. Our global network and AI-enhanced process deliver exceptional leaders in record time.',
  ctaText: 'Start Your Search',
}

const CTA_CONTENT: CTAContent = {
  title: 'Ready to Find Your Next Executive Leader?',
  description:
    "Let's discuss your leadership requirements and how we can help you secure exceptional talent that drives transformation.",
  buttonText: 'Get Executive Search Consultation',
}

const HERO_STATS: readonly Statistic[] = [
  {
    number: '95%',
    label: 'Success Rate',
    description: 'Executive placements still thriving after 2+ years',
  },
  {
    number: '40%',
    label: 'Faster Hiring',
    description: 'Reduced time-to-hire with our AI-enhanced process',
  },
  {
    number: '6',
    label: 'Continents',
    description: 'Global talent network reach',
  },
  {
    number: '50+',
    label: 'Industries',
    description: "Sectors where we've placed executives",
  },
]

const KEY_FEATURES: readonly Feature[] = [
  {
    icon: 'FaGlobe',
    title: 'Global Talent Network',
    description:
      'Access to executive talent across 6 continents through our proprietary network and strategic partnerships.',
  },
  {
    icon: 'FaUserCheck',
    title: 'Advanced Assessment',
    description:
      'Multi-layered evaluation including psychometric testing and leadership competency analysis.',
  },
  {
    icon: 'FaClock',
    title: 'Rapid Deployment',
    description:
      'AI-enhanced screening reduces hiring time by 40% without compromising quality standards.',
  },
  {
    icon: 'FaShieldAlt',
    title: 'Confidential Process',
    description:
      'Secure virtual data rooms and blind profiles protect both client and candidate privacy.',
  },
  {
    icon: 'FaChartLine',
    title: 'Success Tracking',
    description:
      '360° integration programs with measurable KPIs ensure long-term executive success.',
  },
  {
    icon: 'FaIndustry',
    title: 'Industry Expertise',
    description:
      'Deep vertical knowledge enables precise matching of leadership styles to market dynamics.',
  },
]

const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    icon: 'FaSearch',
    title: 'Strategic Assessment',
    description:
      'Deep-dive analysis of your leadership needs and organizational culture',
  },
  {
    icon: 'FaNetworkWired',
    title: 'Global Talent Mapping',
    description:
      'Proprietary network activation and AI-driven candidate identification',
  },
  {
    icon: 'FaClipboardCheck',
    title: 'Advanced Screening',
    description:
      'Multi-layered evaluation with psychometric and competency testing',
  },
  {
    icon: 'FaHandshake',
    title: 'Seamless Integration',
    description: 'Expert negotiation support and 360° onboarding assistance',
  },
]

const KEY_BENEFITS: readonly Benefit[] = [
  {
    title: 'Reduced Risk',
    description: '95% of our placements remain successful after 2+ years',
  },
  {
    title: 'Market Intelligence',
    description:
      'Access to real-time industry benchmarks and compensation data',
  },
  {
    title: 'Cultural Alignment',
    description:
      'Behavioral analytics ensure perfect cultural and strategic fit',
  },
  {
    title: 'Global Reach',
    description:
      'Tap into passive talent markets across emerging and developed economies',
  },
]

const WHY_EXECUTIVE_SEARCH_CONTENT = [
  "In today's competitive business landscape, leadership quality directly determines organizational success. Executive search goes far beyond traditional recruitment by focusing exclusively on identifying, attracting, and securing C-suite executives, board members, and senior leaders who possess the strategic vision and operational expertise to transform organizations. Unlike conventional hiring approaches, executive search involves proactive talent mapping, confidential outreach to passive candidates, and comprehensive assessment methodologies that evaluate not just skills and experience, but leadership potential, cultural alignment, and long-term strategic fit.",
  "The stakes of executive hiring are significant. Research consistently shows that poor leadership appointments can cost organizations millions in direct expenses, lost productivity, damaged morale, and missed strategic opportunities. Conversely, the right executive leader can catalyze growth, drive innovation, and build high-performing teams that deliver sustainable competitive advantages. This is why forward-thinking organizations partner with specialized executive search firms rather than relying on internal recruiting capabilities or general staffing agencies for their most critical leadership positions.",
  "Versaatech's executive search practice combines deep industry expertise with global reach and AI-enhanced assessment capabilities. Our consultants bring decades of combined experience across technology, financial services, healthcare, manufacturing, and professional services sectors. We understand that each executive search is unique, requiring tailored strategies that account for organizational culture, market dynamics, competitive landscape, and specific leadership requirements. Our proprietary methodology ensures thorough candidate evaluation while maintaining the confidentiality and discretion that senior-level searches demand.",
  "Beyond placement, we focus on long-term success through comprehensive onboarding support and integration programs. Our 95% placement success rate after two years demonstrates our commitment to finding leaders who not only meet immediate needs but drive lasting organizational transformation. When you partner with Versaatech for executive search, you gain access to a trusted advisor who understands that your leadership decisions shape your organization's future."
]

export default function ExecutiveSearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <LazyMotion features={domAnimation}>
        <ServiceHero content={HERO_CONTENT} />

        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { name: 'Services', href: '/#overview' },
              { name: 'Executive Search', href: '/executive-search' }
            ]}
          />
        </div>

        {/* Statistics Section */}
        <MotionServiceSection className="bg-card">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {HERO_STATS.map((stat, index) => (
              <MotionStatCard
                key={index}
                stat={stat}
                isLast={index === HERO_STATS.length - 1}
              />
            ))}
          </div>
        </MotionServiceSection>

        {/* Key Features Section */}
        <MotionServiceSection className="bg-background">
          <MotionSectionHeader
            title="Why Choose Our Executive Search"
            subtitle="We combine global reach with local expertise, using cutting-edge technology to identify and secure exceptional leadership talent."
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
            title="Our Proven 4-Step Process"
            subtitle="From strategic assessment to seamless integration, we ensure every placement drives organizational success."
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
              title="The Versaatech Advantage"
              subtitle="Experience the difference of working with a truly global executive search partner."
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

        {/* Why Executive Search Matters Section */}
        <ServiceContent
          title="Why Executive Search Matters"
          content={WHY_EXECUTIVE_SEARCH_CONTENT}
          className="bg-card"
        />

        {/* Related Services Section */}
        <RelatedServices
          currentService="executive-search"
          relatedKeys={['rpo-recruitment', 'industry-benchmarking', 'fractional-hr-services']}
        />

        <MotionServiceCTA content={CTA_CONTENT} />
      </LazyMotion>
    </div>
  )
}
