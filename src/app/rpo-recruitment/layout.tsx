import type { Metadata } from 'next'
import { ServiceSchema } from '@/components/ServiceSchema'

export const metadata: Metadata = {
  title: 'RPO (Recruitment Process Outsourcing)',
  description:
    'Transform talent acquisition with scalable RPO solutions. Cost-effective recruitment services that drive organizational growth and reduce time-to-hire.',
  alternates: {
    canonical: '/rpo-recruitment',
  },
}

export default function RPORecruitmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ServiceSchema
        name="Recruitment Process Outsourcing (RPO)"
        description="Transform talent acquisition with scalable RPO solutions. Cost-effective recruitment services that drive organizational growth and reduce time-to-hire by up to 50%."
        slug="rpo-recruitment"
        serviceType="Recruitment Process Outsourcing"
      />
      {children}
    </>
  )
}
