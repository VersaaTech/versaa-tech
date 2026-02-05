import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import ScrollToTopButton from "@/components/ScrollToTopButton"
import { ChatButton } from "@/components/chat/ChatButton"
import SessionProvider from "@/components/SessionProvider"
import LazyToaster from "@/components/LazyToaster"
import { JsonLd } from "@/components/JsonLd"
import { organizationSchema, websiteSchema } from "@/lib/schema"

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-jakarta',
  weight: ['500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.versaatech.com'),
  title: {
    default: 'Versaatech | Global HR & Recruitment Solutions',
    template: '%s | Versaatech',
  },
  description: "Global HR solutions provider specializing in executive search, recruitment, HR outsourcing, and payroll management across diverse industries.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.versaatech.com',
    siteName: 'Versaatech',
    title: 'Versaatech | Global HR & Recruitment Solutions',
    description: 'Global HR solutions provider specializing in executive search, recruitment, HR outsourcing, and payroll management across diverse industries.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Versaatech - Global HR & Recruitment Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Versaatech | Global HR & Recruitment Solutions',
    description: 'Global HR solutions provider specializing in executive search, recruitment, HR outsourcing, and payroll management across diverse industries.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data - Organization and WebSite Schema */}
        <JsonLd data={[organizationSchema, websiteSchema]} />

        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="https://unpkg.com" />

        {/* Favicon and manifest */}
        <link rel="icon" href="/favicons/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicons/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" sizes="180x180" />
        <link rel="icon" href="/favicons/android-chrome-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicons/android-chrome-512x512.png" sizes="512x512" type="image/png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="Versaatech" />

        {/* Performance optimization meta tags */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} font-body`} suppressHydrationWarning>
        <SessionProvider session={null}>
          <Navigation />
          {children}
          <Footer />
          <ScrollToTopButton />
          <ChatButton />
          <LazyToaster />
        </SessionProvider>
      </body>
    </html>
  )
}
