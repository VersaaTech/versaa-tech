'use client'

import * as m from 'framer-motion/m'
import { SERVICE_STYLES } from './styles'
import { containerVariants, itemVariants } from './animations'

interface ServiceContentProps {
  title: string
  content: string[]
  className?: string
}

export function ServiceContent({ title, content, className = '' }: ServiceContentProps) {
  return (
    <m.section
      className={`${SERVICE_STYLES.section} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={SERVICE_STYLES.container}>
        <div className="max-w-4xl mx-auto">
          <m.h2
            className="text-3xl font-bold font-display text-foreground mb-6 text-center"
            variants={itemVariants}
          >
            {title}
          </m.h2>
          <div className="prose prose-lg max-w-none">
            {content.map((paragraph, index) => (
              <m.p
                key={index}
                className="text-muted-foreground text-base leading-relaxed mb-4 last:mb-0"
                variants={itemVariants}
              >
                {paragraph}
              </m.p>
            ))}
          </div>
        </div>
      </div>
    </m.section>
  )
}
