'use client'

import * as m from 'framer-motion/m'
import DynamicIcon from '@/components/DynamicIcon'
import { SERVICE_STYLES } from './styles'
import { itemVariants } from './animations'
import type { ProcessStep } from './types'

interface MotionProcessStepCardProps {
  step: ProcessStep
  isLast?: boolean
}

export function MotionProcessStepCard({
  step,
  isLast = false,
}: MotionProcessStepCardProps) {
  return (
    <m.div
      className={`
        relative p-6 group text-center
        ${!isLast ? 'lg:border-r border-border' : ''}
      `}
      variants={itemVariants}
    >
      <div className="flex items-center justify-center mb-4">
        <DynamicIcon
          iconName={step.icon}
          className={`w-8 h-8 ${SERVICE_STYLES.iconContainerProcess}`}
        />
      </div>
      <h3
        className={`text-lg font-semibold font-display text-foreground mb-3 ${SERVICE_STYLES.titleHover}`}
      >
        {step.title}
      </h3>
      <p className="text-muted-foreground text-sm">{step.description}</p>
    </m.div>
  )
}
