'use client'

import * as m from 'framer-motion/m'
import { SERVICE_STYLES } from './styles'
import { containerVariants } from './animations'

interface MotionServiceSectionProps {
  className?: string
  children: React.ReactNode
  id?: string
}

export function MotionServiceSection({
  className = '',
  children,
  id,
}: MotionServiceSectionProps) {
  return (
    <m.section
      id={id}
      className={`${SERVICE_STYLES.section} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={SERVICE_STYLES.container}>{children}</div>
    </m.section>
  )
}
