import { SERVICE_STYLES } from './styles'

interface ServiceSectionHeaderProps {
  title: string
  subtitle: string
  className?: string
}

export function ServiceSectionHeader({ title, subtitle, className = '' }: ServiceSectionHeaderProps) {
  return (
    <div className={`${SERVICE_STYLES.centerText} mb-12 ${className}`}>
      <h2 className="text-3xl font-bold font-display text-foreground mb-4">
        {title}
      </h2>
      <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
        {subtitle}
      </p>
    </div>
  )
}
