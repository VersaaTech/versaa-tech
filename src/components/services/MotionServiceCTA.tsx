'use client'

import * as m from 'framer-motion/m'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SERVICE_STYLES } from './styles'
import { containerVariants, itemVariants } from './animations'
import type { CTAContent } from './types'

interface MotionServiceCTAProps {
  content: CTAContent
}

export function MotionServiceCTA({ content }: MotionServiceCTAProps) {
  const { title, description, buttonText, buttonHref = '/contact' } = content

  return (
    <m.section
      className={`${SERVICE_STYLES.section} ${SERVICE_STYLES.gradientBg}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={SERVICE_STYLES.container}>
        <m.div
          className="max-w-3xl mx-auto text-center text-white"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold font-display mb-4">{title}</h2>
          <p className="text-base md:text-lg mb-6 text-blue-100">
            {description}
          </p>
          <Link href={buttonHref}>
            <div className="inline-block transition-transform duration-300 ease-in-out hover:scale-105">
              <Button
                className={`${SERVICE_STYLES.buttonSecondary} ${SERVICE_STYLES.button}`}
              >
                {buttonText}
              </Button>
            </div>
          </Link>
        </m.div>
      </div>
    </m.section>
  )
}
