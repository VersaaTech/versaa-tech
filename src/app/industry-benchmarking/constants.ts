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
export const BENCHMARKING_STATS: readonly Statistic[] = [
  {
    number: "500+",
    label: "Industry Reports",
    description: "Comprehensive benchmark studies delivered annually"
  },
  {
    number: "50+",
    label: "Industry Sectors",
    description: "Specialized benchmarking across diverse verticals"
  },
  {
    number: "85%",
    label: "Strategic Impact",
    description: "Organizations report improved decision-making"
  },
  {
    number: "30%",
    label: "Cost Optimization",
    description: "Average improvement in HR cost efficiency"
  }
] as const

export const KEY_FEATURES: readonly Feature[] = [
  {
    icon: 'FaChartBar',
    title: 'Compensation Benchmarking',
    description: 'Comprehensive salary and benefits analysis across industry verticals for competitive positioning and market alignment.'
  },
  {
    icon: 'FaUsers',
    title: 'Talent Market Intelligence',
    description: 'Real-time insights into talent availability, skill gaps, and competitive landscape for strategic workforce planning.'
  },
  {
    icon: 'FaIndustry',
    title: 'HR Practice Analysis',
    description: 'Detailed comparison of HR policies, procedures, and practices against industry standards and best performers.'
  },
  {
    icon: 'FaChartLine',
    title: 'Performance Metrics',
    description: 'Key performance indicator evaluation against industry benchmarks for operational optimization and strategic alignment.'
  },
  {
    icon: 'FaGlobe',
    title: 'Multi-Region Analysis',
    description: 'Cross-regional benchmarking studies providing global perspective and localized market intelligence.'
  },
  {
    icon: 'FaLightbulb',
    title: 'Best Practice Identification',
    description: 'Discovery and documentation of industry-leading practices for organizational transformation and competitive advantage.'
  }
] as const

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    icon: 'FaClipboardList',
    title: 'Scope Definition',
    description: 'Define benchmarking objectives, metrics, and target comparison groups for focused analysis'
  },
  {
    icon: 'FaDatabase',
    title: 'Data Collection',
    description: 'Comprehensive data gathering from industry sources and proprietary databases'
  },
  {
    icon: 'FaChartBar',
    title: 'Analysis & Comparison',
    description: 'Statistical analysis comparing your organization against relevant industry benchmarks'
  },
  {
    icon: 'FaFileAlt',
    title: 'Insights & Recommendations',
    description: 'Strategic recommendations based on findings and best practice identification'
  }
] as const

export const KEY_BENEFITS: readonly Benefit[] = [
  {
    title: "Strategic Decision Making",
    description: "Data-driven insights enable informed strategic decisions and competitive positioning"
  },
  {
    title: "Market Intelligence",
    description: "Real-time access to industry trends, salary benchmarks, and competitive intelligence"
  },
  {
    title: "Performance Optimization",
    description: "Identify gaps and opportunities for operational improvement and best practice adoption"
  },
  {
    title: "Competitive Advantage",
    description: "Stay ahead of industry trends and maintain competitive edge through strategic insights"
  }
] as const 