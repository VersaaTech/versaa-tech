import type { Statistic, Feature, ProcessStep, Benefit } from './types'

// CSS Classes - DRY principle
export const STYLES = {
  gradientText: 'bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent',
  gradientBg: 'bg-gradient-to-r from-blue-600 to-blue-800',
  card: 'h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white',
  section: 'py-16',
  container: 'container mx-auto px-4',
  centerText: 'text-center',
  button: 'px-6 py-3 text-base font-semibold transition-colors',
} as const

// Animation variants - DRY principle
export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren" as const
      }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  card: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }
} as const

// Static data
export const HERO_STATS: readonly Statistic[] = [
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

export const KEY_FEATURES: readonly Feature[] = [
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

export const PROCESS_STEPS: readonly ProcessStep[] = [
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

export const KEY_BENEFITS: readonly Benefit[] = [
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