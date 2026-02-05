// Service page components - barrel export

// Related services component
export { RelatedServices, type ServiceKey } from './RelatedServices'

// Static components (server-compatible)
export { ServiceSection } from './ServiceSection'
export { ServiceSectionHeader } from './ServiceSectionHeader'
export { ServiceHero } from './ServiceHero'
export { StatCard } from './StatCard'
export { FeatureCard } from './FeatureCard'
export { ProcessStepCard } from './ProcessStepCard'
export { BenefitCard } from './BenefitCard'
export { ServiceCTA } from './ServiceCTA'

// Motion-enabled components (client-only)
export { MotionServiceSection } from './MotionServiceSection'
export { MotionSectionHeader } from './MotionSectionHeader'
export { MotionStatCard } from './MotionStatCard'
export { MotionFeatureCard } from './MotionFeatureCard'
export { MotionProcessStepCard } from './MotionProcessStepCard'
export { MotionBenefitCard } from './MotionBenefitCard'
export { MotionServiceCTA } from './MotionServiceCTA'
export { ServiceContent } from './ServiceContent'

// Styles and animations
export { SERVICE_STYLES } from './styles'
export { containerVariants, itemVariants } from './animations'

// Re-export types
export type {
  Statistic,
  Feature,
  ProcessStep,
  Benefit,
  HeroContent,
  CTAContent,
} from './types'
