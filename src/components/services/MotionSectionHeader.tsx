'use client'

import * as m from 'framer-motion/m'
import { SERVICE_STYLES } from './styles'
import { itemVariants } from './animations'

interface MotionSectionHeaderProps {
  title: string
  subtitle: string
  className?: string
}

export function MotionSectionHeader({
  title,
  subtitle,
  className = '',
}: MotionSectionHeaderProps) {
  return (
    <m.div
      className={`${SERVICE_STYLES.centerText} mb-12 ${className}`}
      variants={itemVariants}
    >
      <h2
        className="text-3xl font-bold font-display text-foreground mb-4"
      >
        {title}
      </h2>
      <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
        {subtitle}
      </p>
    </m.div>
  )
}
