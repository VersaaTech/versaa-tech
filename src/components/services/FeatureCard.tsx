'use client'

import DynamicIcon from '@/components/DynamicIcon'
import { SERVICE_STYLES } from './styles'
import type { Feature } from './types'

interface FeatureCardProps {
  feature: Feature
  isLastInRow?: boolean
  isLastRow?: boolean
}

export function FeatureCard({ feature, isLastInRow = false, isLastRow = false }: FeatureCardProps) {
  return (
    <div
      className={`
        ${SERVICE_STYLES.gridItem}
        ${!isLastInRow ? 'md:border-r' : ''}
        ${isLastRow ? 'md:border-b-0' : ''}
        last:border-b-0 md:last:border-b-0
      `}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          <DynamicIcon
            iconName={feature.icon}
            className={`w-7 h-7 ${SERVICE_STYLES.iconContainer}`}
          />
        </div>
        <h3 className={`text-xl font-semibold font-display text-foreground mb-2 ${SERVICE_STYLES.titleHover}`}>
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-sm">
          {feature.description}
        </p>
      </div>
    </div>
  )
}
