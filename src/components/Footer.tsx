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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Contact Us</h3>
                            <div className="space-y-2 text-gray-200">
                                <div>
                                    <p className="text-sm font-semibold">Registered Office:</p>
                                    <p className="text-sm">
                                        Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm font-semibold">Operations Office:</p>
                                    <p className="text-sm">The Mirage, Nairobi</p>
                                </div>
                                <a href="mailto:info@versaatech.com" className="text-sm hover:text-white transition-colors flex items-center gap-2 pt-2">
                                    <Mail size={16} />
                                    info@versaatech.com
                                </a>
                            </div>
                        </div>
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
