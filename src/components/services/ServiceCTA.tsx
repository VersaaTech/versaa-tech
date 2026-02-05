import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ServiceSection } from './ServiceSection'
import { SERVICE_STYLES } from './styles'
import type { CTAContent } from './types'

interface ServiceCTAProps {
  content: CTAContent
}

export function ServiceCTA({ content }: ServiceCTAProps) {
  const { title, description, buttonText, buttonHref = '/contact' } = content

  return (
    <ServiceSection className={SERVICE_STYLES.gradientBg}>
      <div className="max-w-3xl mx-auto text-center text-white">
        <h2 className="text-3xl font-bold font-display mb-4">
          {title}
        </h2>
        <p className="text-base md:text-lg mb-6 text-blue-100">
          {description}
        </p>
        <div>
          <Link href={buttonHref}>
            <Button className={`${SERVICE_STYLES.buttonSecondary} ${SERVICE_STYLES.button}`}>
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </ServiceSection>
  )
}
