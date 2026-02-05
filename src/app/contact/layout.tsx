import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { generateContactPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contact Versaatech | Dubai & Kenya HR Consulting',
  description:
    'Get in touch with Versaatech for HR consulting, recruitment, and payroll services. Offices in Dubai (UAE) and Nairobi (Kenya). Email: info@versaatech.com',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contactSchema = generateContactPageSchema()

  return (
    <>
      <JsonLd data={contactSchema} />
      {children}
    </>
  )
}
