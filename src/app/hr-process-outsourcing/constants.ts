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
export const HPO_STATS: readonly Statistic[] = [
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
] as const

export const KEY_FEATURES: readonly Feature[] = [
  {
    icon: 'FaMoneyBillWave',
    title: 'Payroll Processing',
    description: 'Complete payroll management from calculation to disbursement with full compliance and accuracy.'
  },
  {
    icon: 'FaShieldAlt',
    title: 'Benefits Administration',
    description: 'Comprehensive employee benefits management and enrollment services for seamless operations.'
  },
  {
    icon: 'FaFileAlt',
    title: 'HR Documentation',
    description: 'Complete HR record keeping, documentation management, and administrative support systems.'
  },
  {
    icon: 'FaGavel',
    title: 'Compliance Management',
    description: 'Expert oversight ensuring adherence to labor laws and regulatory requirements.'
  },
  {
    icon: 'FaLaptop',
    title: 'Technology Integration',
    description: 'Advanced HRIS platforms and automation tools for optimized workflow efficiency.'
  },
  {
    icon: 'FaHeadset',
    title: 'Employee Support',
    description: 'Dedicated HR helpdesk and employee service center for immediate assistance.'
  }
] as const

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    icon: 'FaSearch',
    title: 'Process Assessment',
    description: 'Comprehensive evaluation of current HR processes and optimization opportunities'
  },
  {
    icon: 'FaCogs',
    title: 'Solution Design',
    description: 'Custom HR outsourcing solutions aligned with business objectives'
  },
  {
    icon: 'FaPlug',
    title: 'System Integration',
    description: 'Seamless integration with existing infrastructure and workflows'
  },
  {
    icon: 'FaChartBar',
    title: 'Ongoing Management',
    description: 'Continuous process management with performance monitoring and support'
  }
] as const

export const KEY_BENEFITS: readonly Benefit[] = [
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
] as const 