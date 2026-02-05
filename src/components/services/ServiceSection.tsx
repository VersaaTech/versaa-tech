import { SERVICE_STYLES } from './styles'

interface ServiceSectionProps {
  className?: string
  children: React.ReactNode
}

export function ServiceSection({ className = '', children }: ServiceSectionProps) {
  return (
    <section className={`${SERVICE_STYLES.section} ${className}`}>
      <div className={SERVICE_STYLES.container}>
        {children}
      </div>
    </section>
  )
}
