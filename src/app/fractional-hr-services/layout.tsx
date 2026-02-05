import type { Metadata } from 'next'
import { ServiceSchema } from '@/components/ServiceSchema'

export const metadata: Metadata = {
  title: 'Fractional HR Services | On-Demand HR Leadership',
  description:
    'Access senior HR expertise with flexible engagement models. Save up to 70% vs full-time hires while gaining strategic HR leadership that scales with your business.',
  alternates: {
    canonical: '/fractional-hr-services',
  },
}

export default function FractionalHRServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ServiceSchema
        name="Fractional HR Services"
        description="Access senior HR expertise with flexible engagement models. Save up to 70% vs full-time hires while gaining strategic HR leadership that scales with your business needs."
        slug="fractional-hr-services"
        serviceType="Human Resources Consulting"
      />
      {children}
    </>
  )
}
