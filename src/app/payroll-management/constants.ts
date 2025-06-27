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
export const PAYROLL_STATS: readonly Statistic[] = [
  {
    number: "99.9%",
    label: "Accuracy Rate",
    description: "Payroll processing accuracy maintained consistently"
  },
  {
    number: "50%",
    label: "Time Savings",
    description: "Reduction in payroll administration time"
  },
  {
    number: "100%",
    label: "Compliance",
    description: "Full adherence to tax and labor regulations"
  },
  {
    number: "24h",
    label: "Processing Time",
    description: "Maximum payroll processing turnaround"
  }
] as const

export const KEY_FEATURES: readonly Feature[] = [
  {
    icon: 'FaCalculator',
    title: 'Payroll Processing',
    description: 'End-to-end payroll calculation and disbursement services with complete accuracy and timeliness.'
  },
  {
    icon: 'FaFileInvoiceDollar',
    title: 'Tax Management',
    description: 'Complete tax calculation, deduction, and filing services ensuring full regulatory compliance.'
  },
  {
    icon: 'FaShieldAlt',
    title: 'Benefits Integration',
    description: 'Seamless integration of employee benefits with payroll systems for comprehensive management.'
  },
  {
    icon: 'FaGlobe',
    title: 'Multi-Location Support',
    description: 'Centralized payroll processing across multiple locations and jurisdictions with local compliance.'
  },
  {
    icon: 'FaClock',
    title: 'Time & Attendance',
    description: 'Automated integration with time tracking systems for accurate hours and attendance management.'
  },
  {
    icon: 'FaChartBar',
    title: 'Reporting & Analytics',
    description: 'Comprehensive payroll reports and analytics for strategic decision-making and compliance documentation.'
  }
] as const

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    icon: 'FaDatabase',
    title: 'Data Collection',
    description: 'Secure collection and verification of employee data and time records'
  },
  {
    icon: 'FaCalculator',
    title: 'Payroll Calculation',
    description: 'Accurate calculation of gross pay, deductions, taxes, and net pay'
  },
  {
    icon: 'FaCheckCircle',
    title: 'Review & Approval',
    description: 'Comprehensive payroll review process with client approval workflow'
  },
  {
    icon: 'FaMoneyCheckAlt',
    title: 'Payment Processing',
    description: 'Secure and timely salary payments through multiple disbursement channels'
  }
] as const

export const KEY_BENEFITS: readonly Benefit[] = [
  {
    title: "Guaranteed Accuracy",
    description: "99.9% accuracy rate with comprehensive error detection and correction processes"
  },
  {
    title: "Cost Efficiency",
    description: "Significant reduction in payroll administration costs and resource requirements"
  },
  {
    title: "Full Compliance",
    description: "Expert management of tax regulations and labor law compliance across jurisdictions"
  },
  {
    title: "Time Liberation",
    description: "Free internal resources to focus on strategic business activities and growth initiatives"
  }
] as const 