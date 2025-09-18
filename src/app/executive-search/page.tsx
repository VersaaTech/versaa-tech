import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'
import { CheckCircle } from 'lucide-react'

// TypeScript Interfaces
interface Statistic {
  number: string
  label: string
  description: string
}

interface Feature {
  icon: string
  title: string
  description: string
}

interface ProcessStep {
  icon: string
  title: string
  description: string
}

interface Benefit {
  title: string
  description: string
}

interface SectionProps {
  className?: string
  children: React.ReactNode
}

interface SectionHeaderProps {
  title: string
  subtitle: string
  className?: string
}

// Constants and Static Data
const STYLES = {
  gradientText: 'bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent',
  gradientBg: 'bg-gradient-to-r from-blue-600 to-blue-800',
  card: 'h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white',
  section: 'py-16',
  container: 'container mx-auto px-4',
  centerText: 'text-center',
  button: 'px-6 py-3 text-base font-semibold transition-colors',
} as const


const HERO_STATS: readonly Statistic[] = [
  {
    number: "95%",
    label: "Success Rate",
    description: "Executive placements still thriving after 2+ years"
  },
  {
    number: "40%",
    label: "Faster Hiring",
    description: "Reduced time-to-hire with our AI-enhanced process"
  },
  {
    number: "6",
    label: "Continents",
    description: "Global talent network reach"
  },
  {
    number: "50+",
    label: "Industries",
    description: "Sectors where we've placed executives"
  }
] as const

const KEY_FEATURES: readonly Feature[] = [
  {
    icon: 'FaGlobe',
    title: 'Global Talent Network',
    description: 'Access to executive talent across 6 continents through our proprietary network and strategic partnerships.'
  },
  {
    icon: 'FaUserCheck',
    title: 'Advanced Assessment',
    description: 'Multi-layered evaluation including psychometric testing and leadership competency analysis.'
  },
  {
    icon: 'FaClock',
    title: 'Rapid Deployment',
    description: 'AI-enhanced screening reduces hiring time by 40% without compromising quality standards.'
  },
  {
    icon: 'FaShieldAlt',
    title: 'Confidential Process',
    description: 'Secure virtual data rooms and blind profiles protect both client and candidate privacy.'
  },
  {
    icon: 'FaChartLine',
    title: 'Success Tracking',
    description: '360° integration programs with measurable KPIs ensure long-term executive success.'
  },
  {
    icon: 'FaIndustry',
    title: 'Industry Expertise',
    description: 'Deep vertical knowledge enables precise matching of leadership styles to market dynamics.'
  }
] as const

const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    icon: 'FaSearch',
    title: 'Strategic Assessment',
    description: 'Deep-dive analysis of your leadership needs and organizational culture'
  },
  {
    icon: 'FaNetworkWired',
    title: 'Global Talent Mapping',
    description: 'Proprietary network activation and AI-driven candidate identification'
  },
  {
    icon: 'FaClipboardCheck',
    title: 'Advanced Screening',
    description: 'Multi-layered evaluation with psychometric and competency testing'
  },
  {
    icon: 'FaHandshake',
    title: 'Seamless Integration',
    description: 'Expert negotiation support and 360° onboarding assistance'
  }
] as const

const KEY_BENEFITS: readonly Benefit[] = [
  {
    title: "Reduced Risk",
    description: "95% of our placements remain successful after 2+ years"
  },
  {
    title: "Market Intelligence",
    description: "Access to real-time industry benchmarks and compensation data"
  },
  {
    title: "Cultural Alignment",
    description: "Behavioral analytics ensure perfect cultural and strategic fit"
  },
  {
    title: "Global Reach",
    description: "Tap into passive talent markets across emerging and developed economies"
  }
] as const

// Component Definitions
const Section = ({ className = '', children }: SectionProps) => (
  <section className={`${STYLES.section} ${className}`}>
    <div className={STYLES.container}>
      {children}
    </div>
  </section>
)

const SectionHeader = ({ title, subtitle, className = '' }: SectionHeaderProps) => (
  <div className={`${STYLES.centerText} mb-12 ${className}`}>
    <h2 className={`text-3xl font-bold ${STYLES.gradientText} mb-4`}>
      {title}
    </h2>
    <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
      {subtitle}
    </p>
  </div>
)

const HeroSection = () => (
  <section className="relative h-auto min-h-[50vh] py-12 flex items-center justify-center">
    <Image
      src="/images/executive-search-hero.avif"
      alt="Executive Search"
      fill
      className="object-cover brightness-[0.4]"
      priority
      sizes="100vw"
    />
    <div className="relative z-10 container mx-auto px-4">
      <div className="max-w-4xl text-center mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Find Your Next
          <span className="bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text block">
            Game-Changing Leader
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-200 mb-6">
          Connect with visionary executives who transform organizations. Our global network and AI-enhanced process deliver exceptional leaders in record time.
        </p>
        <div>
          <Link href="/contact">
            <Button className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 ${STYLES.button}`}>
              Start Your Search
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
)

const StatCard = ({ stat }: { stat: Statistic }) => (
  <div className={STYLES.centerText}>
    <div className={`text-3xl md:text-4xl font-bold ${STYLES.gradientText} mb-2`}>
      {stat.number}
    </div>
    <div className="text-base md:text-lg font-semibold text-gray-800 mb-2">
      {stat.label}
    </div>
    <div className="text-sm text-gray-600">
      {stat.description}
    </div>
  </div>
)

const FeatureCard = ({ feature }: { feature: Feature }) => (
  <div className="group">
    <Card className={STYLES.card}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <DynamicIcon iconName={feature.icon} className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {feature.title}
          </h3>
        </div>
        <p className="text-gray-600 text-base leading-relaxed">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  </div>
)

const ProcessStepCard = ({ step }: { step: ProcessStep }) => (
  <div className={STYLES.centerText}>
    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300 h-full">
      <div className="text-blue-600 text-3xl mb-6">
        <DynamicIcon iconName={step.icon} className="w-8 h-8 mx-auto" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {step.title}
      </h3>
      <p className="text-gray-600 text-sm">
        {step.description}
      </p>
    </div>
  </div>
)

const BenefitCard = ({ benefit }: { benefit: Benefit }) => (
  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {benefit.title}
      </h3>
      <p className="text-gray-600 text-base">
        {benefit.description}
      </p>
    </div>
  </div>
)

const CTASection = () => (
  <Section className={STYLES.gradientBg}>
    <div className="max-w-3xl mx-auto text-center text-white">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Find Your Next Executive Leader?
      </h2>
      <p className="text-base md:text-lg mb-6 text-blue-100">
        Let&apos;s discuss your leadership requirements and how we can help you secure exceptional talent that drives transformation.
      </p>
      <div>
        <Link href="/contact">
          <Button className={`bg-white text-blue-600 hover:bg-gray-100 ${STYLES.button}`}>
            Schedule a Consultation
          </Button>
        </Link>
      </div>
    </div>
  </Section>
)

// Main Page Component
function ExecutiveSearchPage() {
  return (
    <div className="min-h-screen bg-[#f7fffc]">
      {/* Hero Section */}
      <HeroSection />

      {/* Statistics Section */}
      <Section className="bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {HERO_STATS.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </Section>

      {/* Key Features Section */}
      <Section className="bg-[#f7fffc]">
        <SectionHeader
          title="Why Choose Our Executive Search"
          subtitle="We combine global reach with local expertise, using cutting-edge technology to identify and secure exceptional leadership talent."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KEY_FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </Section>

      {/* Process Overview Section */}
      <Section className="bg-white">
        <SectionHeader
          title="Our Proven 4-Step Process"
          subtitle="From strategic assessment to seamless integration, we ensure every placement drives organizational success."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessStepCard key={index} step={step} />
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section className="bg-[#f7fffc]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="The Versaatech Advantage"
            subtitle="Experience the difference of working with a truly global executive search partner."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {KEY_BENEFITS.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} />
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}

// SEO metadata for Next.js
export const metadata = {
  title: "Executive Search and Selection Services | Versaatech",
  description:
    "Discover our tailored Executive Search and Selection solutions that connect your organization with visionary leadership talent. Our confidential and efficient process ensures the right fit for your executive team.",
};

export default ExecutiveSearchPage