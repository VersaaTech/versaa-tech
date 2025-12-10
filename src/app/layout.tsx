import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import ScrollToTopButton from "@/components/ScrollToTopButton"
import { ChatButton } from "@/components/chat/ChatButton"
import SessionProvider from "@/components/SessionProvider"
import LazyToaster from "@/components/LazyToaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Versaa Tech",
  description: "Versaa Tech - Global human capital solutions provider specializing in executive search and selection, recruitment services, workforce planning, HR process outsourcing, and payroll management across diverse industries. Partner with us for innovative talent acquisition strategies.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        
        {/* Favicon and manifest */}
        <link rel="icon" href="/favicons/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicons/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" sizes="180x180" />
        <link rel="icon" href="/favicons/android-chrome-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicons/android-chrome-512x512.png" sizes="512x512" type="image/png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="Versaa Tech" />
        
        {/* Performance optimization meta tags */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
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
