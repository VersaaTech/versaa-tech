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
export const RPO_STATS: readonly Statistic[] = [
  {
    number: "50%",
    label: "Faster Hiring",
    description: "Reduced time-to-fill with optimized processes"
  },
  {
    number: "40%",
    label: "Cost Savings",
    description: "Lower recruitment costs through efficiency"
  },
  {
    number: "98%",
    label: "Client Satisfaction",
    description: "Proven track record of successful partnerships"
  },
  {
    number: "95%",
    label: "Quality Hires",
    description: "Higher retention rates and performance"
  }
] as const

export const KEY_FEATURES: readonly Feature[] = [
  {
    icon: 'FaRecycle',
    title: 'End-to-End Recruitment',
    description: 'Complete recruitment lifecycle management from sourcing to onboarding with dedicated support teams.'
  },
  {
    icon: 'FaRobot',
    title: 'AI-Enhanced Sourcing',
    description: 'Advanced technology and machine learning algorithms for intelligent candidate matching and discovery.'
  },
  {
    icon: 'FaChartLine',
    title: 'Scalable Solutions',
    description: 'Flexible engagement models that adapt to your hiring volume and organizational needs.'
  },
  {
    icon: 'FaClock',
    title: 'Rapid Deployment',
    description: 'Quick setup and immediate impact with streamlined processes and proven methodologies.'
  },
  {
    icon: 'FaShieldAlt',
    title: 'Quality Assurance',
    description: 'Rigorous screening and assessment processes ensuring only top-tier candidates advance.'
  },
  {
    icon: 'FaChartBar',
    title: 'Data-Driven Insights',
    description: 'Comprehensive analytics and reporting for informed decision-making and continuous improvement.'
  }
] as const

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    icon: 'FaClipboardList',
    title: 'Requirements Analysis',
    description: 'Deep understanding of your hiring needs and organizational culture'
  },
  {
    icon: 'FaSearch',
    title: 'Talent Acquisition',
    description: 'Multi-channel sourcing and candidate identification using advanced tools'
  },
  {
    icon: 'FaUserCheck',
    title: 'Screening & Assessment',
    description: 'Comprehensive evaluation including skills testing and cultural fit'
  },
  {
    icon: 'FaHandshake',
    title: 'Onboarding Support',
    description: 'Seamless integration and post-hire success tracking'
  }
] as const

export const KEY_BENEFITS: readonly Benefit[] = [
  {
    title: "Reduced Overhead",
    description: "Eliminate recruitment infrastructure costs while maintaining quality standards"
  },
  {
    title: "Market Intelligence",
    description: "Access to real-time salary benchmarks and talent market insights"
  },
  {
    title: "Flexibility",
    description: "Scale recruitment efforts up or down based on business demands"
  },
  {
    title: "Technology Access",
    description: "Leverage cutting-edge recruitment tools without additional investment"
  }
] as const 