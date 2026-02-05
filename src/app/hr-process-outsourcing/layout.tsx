import type { Metadata } from 'next'
import { ServiceSchema } from '@/components/ServiceSchema'

export const metadata: Metadata = {
  title: 'HR Process Outsourcing (HRO) Services',
  description:
    'Transform HR operations with comprehensive outsourcing. Achieve 40% cost reduction, 99% compliance rate, and 60% efficiency gains with Versaatech HRO solutions.',
  alternates: {
    canonical: '/hr-process-outsourcing',
  },
}

export default function HRProcessOutsourcingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ServiceSchema
        name="HR Process Outsourcing (HRO)"
        description="Transform HR operations with comprehensive outsourcing. Achieve 40% cost reduction, 99% compliance rate, and 60% efficiency gains with professional HRO solutions."
        slug="hr-process-outsourcing"
        serviceType="HR Outsourcing Services"
      />
      {children}
    </>
  )
}
