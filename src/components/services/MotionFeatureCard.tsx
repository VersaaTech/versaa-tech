'use client'

import * as m from 'framer-motion/m'
import DynamicIcon from '@/components/DynamicIcon'
import { SERVICE_STYLES } from './styles'
import { itemVariants } from './animations'
import type { Feature } from './types'

interface MotionFeatureCardProps {
  feature: Feature
  isLastInRow?: boolean
  isLastRow?: boolean
}

export function MotionFeatureCard({
  feature,
  isLastInRow = false,
  isLastRow = false,
}: MotionFeatureCardProps) {
  return (
    <m.div
      className={`
        ${SERVICE_STYLES.gridItem}
        ${!isLastInRow ? 'md:border-r' : ''}
        ${isLastRow ? 'md:border-b-0' : ''}
        last:border-b-0 md:last:border-b-0
      `}
      variants={itemVariants}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          <DynamicIcon
            iconName={feature.icon}
            className={`w-7 h-7 ${SERVICE_STYLES.iconContainer}`}
          />
        </div>
        <h3
          className={`text-xl font-semibold font-display text-foreground mb-2 ${SERVICE_STYLES.titleHover}`}
        >
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-sm">{feature.description}</p>
      </div>
    </m.div>
  )
}
