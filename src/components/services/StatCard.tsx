import { SERVICE_STYLES } from './styles'
import type { Statistic } from './types'

interface StatCardProps {
  stat: Statistic
  isLast?: boolean
}

export function StatCard({ stat, isLast = false }: StatCardProps) {
  return (
    <div
      className={`
        ${SERVICE_STYLES.centerText} p-4 group
        ${!isLast ? 'md:border-r border-border' : ''}
      `}
    >
      <div className={`text-3xl md:text-4xl font-bold font-display ${SERVICE_STYLES.gradientText} mb-2`}>
        {stat.number}
      </div>
      <div className={`text-base md:text-lg font-semibold text-foreground mb-2 ${SERVICE_STYLES.titleHover}`}>
        {stat.label}
      </div>
      <div className="text-sm text-muted-foreground">
        {stat.description}
      </div>
    </div>
  )
}
