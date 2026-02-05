import type { Metadata } from 'next'
import { ServiceSchema } from '@/components/ServiceSchema'

export const metadata: Metadata = {
  title: 'Payroll Management & Outsourcing Services',
  description:
    'Comprehensive payroll outsourcing with 99.9% accuracy, full tax compliance, and timely disbursements. Reduce costs and administrative burden with Versaatech.',
  alternates: {
    canonical: '/payroll-management',
  },
}

export default function PayrollManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ServiceSchema
        name="Payroll Management and Outsourcing"
        description="Comprehensive payroll outsourcing with 99.9% accuracy, full tax compliance, and timely disbursements. Reduce costs and administrative burden with professional payroll services."
        slug="payroll-management"
        serviceType="Payroll Processing Services"
      />
      {children}
    </>
  )
}
