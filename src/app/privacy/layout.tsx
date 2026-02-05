import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Protection',
  description:
    'Versaatech privacy policy detailing how we collect, use, and protect your personal data in compliance with UAE PDPL, GDPR, and international privacy laws.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
