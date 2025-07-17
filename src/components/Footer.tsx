import React from 'react'
import Link from 'next/link'
import { LayoutGrid, Building2, Lightbulb, Users, Building, Phone, Shield, Mail, Briefcase } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'

export function Footer() {
    const regions = [
        "East Africa",
        "Middle East",
        "Mexico",
        "USA"
    ]

    const formatRegionUrl = (region: string) => {
        return `/?region=${region.toLowerCase().replace(/\s+/g, '-')}#regions`
    }

    return (
        <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <div className="container mx-auto px-6 pt-12 pb-8">
                {/* Top Row - Company Info, Quick Links, and Contact Us */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <Image 
                                src="/images/versaatech-logo.png"
                                alt="Versaa Tech Logo"
                                width={100}
                                height={100}
                                className="w-[100px] h-[100px]"
                                loading="lazy"
                                fetchPriority="low"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-200">
                            Versaa Tech is a knowledge-driven organization built on a foundation of deep expertise. Our core strengths exist in our comprehensive understanding of job trends, actionable market insights, and extensive experience, which enable us to deliver exceptional value.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Overview', href: '#overview', icon: LayoutGrid },
                                { name: 'Industries', href: '#industries', icon: Building2 },
                                { name: 'How We Work', href: '#differentiators', icon: Lightbulb },
                                { name: 'About', href: '#about', icon: Building },
                                { name: 'Leadership', href: '#about-leadership', icon: Users },
                                { name: 'Jobs', href: '/jobs', icon: Briefcase, isRoute: true },
                                { name: 'Contact', href: '/contact', icon: Phone, isRoute: true },
                                { name: 'Privacy Policy', href: '/privacy', icon: Shield, isRoute: true },
                            ].map((item) => (
                                <li key={item.name}>
                                    {item.isRoute ? (
                                        <Link href={item.href} className="text-sm text-gray-200 hover:text-white transition-colors flex items-center gap-2">
                                            {React.createElement(item.icon, { size: 16 })}
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <Link
                                            href={`/${item.href}`}
                                            className="text-sm text-gray-200 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            {React.createElement(item.icon, { size: 16 })}
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <div className="space-y-2 text-gray-200">
                            <div>
                                <p className="text-sm font-semibold">Registered Office:</p>
                                <p className="text-sm">
                                    Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E
                                </p>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm font-semibold">Kenya Office:</p>
                                <p className="text-sm">The Mirage, Tower 2, Floor M1, Unit 7, Nairobi, Kenya</p>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm font-semibold">US Office:</p>
                                <p className="text-sm">Bloomfield, Michigan, USA</p>
                            </div>
                            <a href="mailto:info@versaatech.com" className="text-sm hover:text-white transition-colors flex items-center gap-2 pt-2">
                                <Mail size={16} />
                                info@versaatech.com
                            </a>
                            <a href="tel:+254781126819" className="text-sm hover:text-white transition-colors flex items-center gap-2 pt-2">
                                <Phone size={16} />
                                +254 781 126 819
                            </a>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-white/20" />

                {/* Bottom Row - Certification, Regions, Connect with us */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Certification Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Credentials</h3>
                        <div className="flex flex-wrap gap-4">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                <Image
                                    src="/images/credentials/hr.jpg"
                                    alt="ISO Certification"
                                    width={100}
                                    height={100}
                                    className="rounded-full"
                                    loading="lazy"
                                    quality={50}
                                />
                            </div>
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                <Image
                                    src="/images/credentials/data-protection.jpg"
                                    alt="SNITA Approved Trainer"
                                    width={100}
                                    height={100}
                                    className="rounded-full"
                                    loading="lazy"
                                    quality={50}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Regions Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Regions</h3>
                        <ul className="space-y-3">
                            {regions.map((region) => (
                                <li key={region}>
                                    <Link
                                        href={formatRegionUrl(region)}
                                        className="text-sm text-gray-200 hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        <Building2 size={16} />
                                        {region}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect with us Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Connect with us</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://linkedin.com/company/versaatech"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-white/20" />
                <div className="text-center">
                    <p className="text-sm text-gray-200">
                        &copy; {new Date().getFullYear()} Versaa Tech. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
