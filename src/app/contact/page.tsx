import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import { RoleSelector } from './RoleSelector'
import { ContactFormsDialog } from './ContactFormsDialog'

export default function ContactPage() {
  return (
    <section className="py-16 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
          Get in touch
        </p>
        <h2 className="text-3xl font-bold font-display text-foreground mb-3">
          Let&apos;s Have a Conversation
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Whether you&apos;re looking for your next role or building your next team &mdash; we&apos;re here to help.
        </p>

        {/* Top Row — Role Selector + Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Role Selector */}
          <div className="lg:col-span-1 bg-background rounded-xl border border-border p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-lg">
                👤
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Select Your Role</h3>
                <p className="text-xs text-muted-foreground">To get started</p>
              </div>
            </div>
            <RoleSelector />
            <p className="text-xs text-muted-foreground text-center">
              Prefer form submission?{' '}
              <ContactFormsDialog />
            </p>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="bg-muted/30 rounded-xl border border-border p-5 flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Email</p>
                
                  href="mailto:info@versaatech.com"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  info@versaatech.com
                </a>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl border border-border p-5 flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Phone</p>
                
                  href="tel:+254781126819"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  +254 781 126 819
                </a>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl border border-border p-5 flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Nairobi Office</p>
                
                  href="https://maps.app.goo.gl/vGGmdSy6AnNkeGxGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-blue-600 transition-colors leading-relaxed"
                >
                  The Mirage, Tower 2<br />
                  Floor M1, Unit 7, Nairobi
                </a>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl border border-border p-5 flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Dubai Office</p>
                
                  href="https://maps.app.goo.gl/mqRjPrPCXqfYwNWx5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-blue-600 transition-colors leading-relaxed"
                >
                  Meydan Grandstand, 6th Floor<br />
                  Meydan Road, Dubai U.A.E
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Business Hours Bar */}
        <div className="flex items-center gap-3 bg-muted/30 rounded-xl border border-border px-5 py-4">
          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Business Hours: </span>
            Monday &ndash; Friday: 8AM &ndash; 5PM &nbsp;|&nbsp; Saturday: 8AM &ndash; 1PM
          </p>
        </div>

      </div>
    </section>
  )
}
}
