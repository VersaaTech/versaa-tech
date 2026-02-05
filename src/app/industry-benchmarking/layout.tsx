import type { Metadata } from 'next'
import { ServiceSchema } from '@/components/ServiceSchema'

export const metadata: Metadata = {
  title: 'Industry HR Benchmarking Services',
  description:
    'Comprehensive HR benchmarking services providing strategic insights to optimize human capital strategies and strengthen competitive positioning.',
  alternates: {
    canonical: '/industry-benchmarking',
  },
}

export default function IndustryBenchmarkingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ServiceSchema
        name="Industry HR Benchmarking"
        description="Comprehensive HR benchmarking services providing strategic insights to optimize human capital strategies. Compensation analysis, talent market intelligence, and competitive positioning."
        slug="industry-benchmarking"
        serviceType="HR Benchmarking and Analytics"
      />
      {children}
    </>
  )
}
