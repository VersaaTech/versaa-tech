import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SERVICE_STYLES } from './styles'
import type { HeroContent } from './types'

interface ServiceHeroProps {
  content: HeroContent
}

export function ServiceHero({ content }: ServiceHeroProps) {
  const { backgroundImage, imageAlt, title, description, ctaText, ctaHref = '/contact' } = content

  return (
    <section className="relative h-auto min-h-[50vh] py-12 flex items-center justify-center">
      <Image
        src={backgroundImage}
        alt={imageAlt}
        fill
        className="object-cover brightness-[0.4]"
        priority
        fetchPriority="high"
        sizes="100vw"
      />
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl text-center mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
            {title}
          </h1>
          <p className="text-base md:text-lg text-gray-200 mb-6">
            {description}
          </p>
          <div>
            <Link href={ctaHref}>
              <Button className={`${SERVICE_STYLES.buttonPrimary} ${SERVICE_STYLES.button}`}>
                {ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
