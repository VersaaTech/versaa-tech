import { CheckCircle } from 'lucide-react'
import { SERVICE_STYLES } from './styles'
import type { Benefit } from './types'

interface BenefitCardProps {
  benefit: Benefit
  isLastInRow?: boolean
  isLastRow?: boolean
}

export function BenefitCard({ benefit, isLastInRow = false, isLastRow = false }: BenefitCardProps) {
  return (
    <div
      className={`
        flex items-start gap-4 p-6 group
        border-b border-border
        ${!isLastInRow ? 'md:border-r' : ''}
        ${isLastRow ? 'md:border-b-0' : ''}
        last:border-b-0 md:last:border-b-0
      `}
    >
      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
      <div>
        <h3 className={`text-lg font-semibold font-display text-foreground mb-2 ${SERVICE_STYLES.titleHover}`}>
          {benefit.title}
        </h3>
        <p className="text-muted-foreground text-base">
          {benefit.description}
        </p>
      </div>
    </div>
  )
}
