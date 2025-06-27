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
export const HR_STATS: readonly Statistic[] = [
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
] as const

export const KEY_FEATURES: readonly Feature[] = [
  {
    icon: 'FaUserTie',
    title: 'Strategic HR Leadership',
    description: 'Senior-level HR executives providing strategic guidance, organizational development, and people strategy alignment.'
  },
  {
    icon: 'FaExpandArrowsAlt',
    title: 'Flexible Engagement Models',
    description: 'Scalable HR support from part-time leadership to project-based consulting, adapting to your business needs.'
  },
  {
    icon: 'FaShieldAlt',
    title: 'Compliance & Risk Management',
    description: 'Expert guidance on HR policies, procedures, and regulatory compliance to protect your organization.'
  },
  {
    icon: 'FaChartLine',
    title: 'Performance & Analytics',
    description: 'Data-driven HR insights and metrics to support strategic decision-making and operational excellence.'
  },
  {
    icon: 'FaUsers',
    title: 'Talent Management',
    description: 'Comprehensive talent acquisition, development, and retention strategies for sustainable growth.'
  },
  {
    icon: 'FaRocket',
    title: 'Immediate Impact',
    description: 'Experienced professionals who contribute from day one without the typical ramp-up time.'
  }
] as const

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    icon: 'FaSearch',
    title: 'Needs Assessment',
    description: 'Comprehensive analysis of your HR requirements and organizational goals'
  },
  {
    icon: 'FaUserCheck',
    title: 'Expert Matching',
    description: 'Careful selection of HR professionals with relevant industry experience'
  },
  {
    icon: 'FaHandshake',
    title: 'Engagement Setup',
    description: 'Flexible arrangement design with clear deliverables and success metrics'
  },
  {
    icon: 'FaChartBar',
    title: 'Continuous Value',
    description: 'Ongoing strategic support with regular reviews and adaptable scope'
  }
] as const

export const KEY_BENEFITS: readonly Benefit[] = [
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
] as const 