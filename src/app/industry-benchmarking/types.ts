export interface Statistic {
  number: string
  label: string
  description: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface ProcessStep {
  icon: string
  title: string
  description: string
}

export interface Benefit {
  title: string
  description: string
}

export interface AnimationVariants {
  hidden: Record<string, any>
  visible: Record<string, any>
} 