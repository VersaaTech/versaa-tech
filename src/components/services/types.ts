// TypeScript interfaces for service page components

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

export interface HeroContent {
  backgroundImage: string
  imageAlt: string
  titleLine1: string
  titleLine2: string
  description: string
  ctaText: string
  ctaHref?: string
}

export interface CTAContent {
  title: string
  description: string
  buttonText: string
  buttonHref?: string
}
