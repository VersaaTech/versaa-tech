import { MapPin, Phone, Clock } from 'lucide-react'
import { RoleSelector } from './RoleSelector'
import { ContactFormsDialog } from './ContactFormsDialog'

export default function ContactPage() {
    return (
        <section className="py-12 bg-background">
            <div className="px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold font-display text-center mb-16 text-foreground">
                        Let&apos;s Have a Conversation...
                    </h1>

                    {/* Contact Information Grid - 2x3 Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {/* Get in Touch Section */}
                        <div className="p-6 border-b border-border md:border-r">
                            <RoleSelector />

                            <p className="text-sm text-muted-foreground text-center">
                                Prefer form submission?{' '}
                                <ContactFormsDialog />
                            </p>
                        </div>

                        {/* Dubai Office */}
                        <div className="p-6 border-b border-border lg:border-r">
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="h-6 w-6 text-blue-600" />
                                <h2 className="text-xl font-bold text-foreground">Dubai Office</h2>
                            </div>
                            <div className="text-muted-foreground">
                                <a
                                    href="https://maps.app.goo.gl/mqRjPrPCXqfYwNWx5"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    <p>Meydan Grandstand, 6th Floor</p>
                                    <p>Meydan Road, Nad Al Sheba</p>
                                    <p>Dubai, U.A.E</p>
                                </a>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="p-6 border-b border-border md:border-r lg:border-r-0">
                            <div className="flex items-center gap-3 mb-4">
                                <Phone className="h-6 w-6 text-blue-600" />
                                <h2 className="text-xl font-bold text-foreground">Contact</h2>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                                    <a
                                        href="mailto:info@versaatech.com"
                                        className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                                    >
                                        info@versaatech.com
                                    </a>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                                    <a
                                        href="tel:+254781126819"
                                        className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                                    >
                                        +254 781 126 819
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="p-6 border-b md:border-b-0 border-border md:border-r">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="h-6 w-6 text-blue-600" />
                                <h2 className="text-xl font-bold text-foreground">Business Hours</h2>
                            </div>
                            <div className="text-muted-foreground font-medium">
                                <p>Monday - Friday: 8AM - 5PM</p>
                                <p>Saturday: 8AM - 1PM</p>
                            </div>
                        </div>

                        {/* Kenya Office */}
                        <div className="p-6 border-b md:border-b-0 border-border lg:border-r">
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="h-6 w-6 text-blue-600" />
                                <h2 className="text-xl font-bold text-foreground">Kenya Office</h2>
                            </div>
                            <div className="text-muted-foreground">
                                <a
                                    href="https://maps.app.goo.gl/vGGmdSy6AnNkeGxGA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    <p>The Mirage, Tower 2</p>
                                    <p>Floor M1, Unit 7</p>
                                    <p>Nairobi, Kenya</p>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}
