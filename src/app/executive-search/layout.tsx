import type { Metadata } from 'next'
import { ServiceSchema } from '@/components/ServiceSchema'

export const metadata: Metadata = {
  title: 'Executive Search and Selection Services',
  description:
    'Tailored executive search solutions connecting organizations with visionary leadership talent. Confidential, efficient recruitment for C-suite and senior roles.',
  alternates: {
    canonical: '/executive-search',
  },
}

export default function ExecutiveSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ServiceSchema
        name="Executive Search and Selection"
        description="Tailored executive search solutions connecting organizations with visionary leadership talent. Confidential, efficient recruitment for C-suite and senior roles across Africa, Middle East, and beyond."
        slug="executive-search"
        serviceType="Executive Recruitment Services"
      />
      {children}
    </>
  )
}
