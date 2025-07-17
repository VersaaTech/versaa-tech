import { MapPin, Phone, Clock } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { RoleSelector } from './RoleSelector'
import { ContactFormsDialog } from './ContactFormsDialog'

export default function ContactPage() {
    return (
        <section className="py-12 bg-[#f7fffc] overflow-hidden">
            <div className="px-4 md:px-8 w-full max-w-[100vw]">
                <div className="max-w-6xl mx-auto w-full animate-slide-up">
                    <h1 className="text-3xl font-bold text-center mb-16 text-blue-600 px-4 animate-slide-up">
                        Let&apos;s Have a Conversation...
                    </h1>

                    {/* Contact Information Grid - 2x3 Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Get in Touch Section */}
                        <Card className="rounded-2xl shadow-lg p-6 bg-blue-50 animate-slide-up-delay-100">
                            <CardContent className="p-0">
                                <RoleSelector />
                                
                                <p className="text-sm text-gray-600 text-center">
                                    Prefer form submission?{' '}
                                    <ContactFormsDialog />
                                </p>
                            </CardContent>
                        </Card>

                        {/* Registered Office */}
                        <Card className="rounded-2xl shadow-lg p-6 animate-slide-up-delay-200">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <MapPin className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Registered Office</h3>
                                </div>
                                <div className="text-gray-600">
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
                            </CardContent>
                        </Card>

                        {/* Contact Details */}
                        <Card className="rounded-2xl shadow-lg p-6 animate-slide-up-delay-300">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <Phone className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Contact</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Email</p>
                                        <a
                                            href="mailto:info@versaatech.com"
                                            className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                                        >
                                            info@versaatech.com
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                                        <a
                                            href="tel:+254781126819"
                                            className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                                        >
                                            +254 781 126 819
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Business Hours */}
                        <Card className="rounded-2xl shadow-lg p-6 animate-slide-up-delay-400">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-orange-100 rounded-full">
                                        <Clock className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Business Hours</h3>
                                </div>
                                <div className="text-gray-600 font-medium">
                                    <p>Monday - Friday</p>
                                    <p>9AM - 5PM</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Kenya Office */}
                        <Card className="rounded-2xl shadow-lg p-6 animate-slide-up-delay-500">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-green-100 rounded-full">
                                        <MapPin className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Kenya Office</h3>
                                </div>
                                <div className="text-gray-600">
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
                            </CardContent>
                        </Card>

                        {/* US Office */}
                        <Card className="rounded-2xl shadow-lg p-6 animate-slide-up-delay-100">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-100 rounded-full">
                                        <MapPin className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">US Office</h3>
                                </div>
                                <div className="text-gray-600">
                                    <p>Bloomfield, Michigan, USA</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </section>
    )
} 