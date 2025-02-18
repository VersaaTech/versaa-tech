'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import DynamicIcon from '@/components/DynamicIcon'

export default function WorkforcePlanningPageClient() {
    return (
        <div className="min-h-screen bg-[#f7fffc]">
            {/* Hero Section */}
            <section className="relative h-auto min-h-[400px] py-10 sm:min-h-[60vh] md:h-[70vh] flex items-center justify-center">
                <Image
                    src="/images/workforce-planning-hero.avif"
                    alt="Workforce Planning & Placement"
                    fill
                    className="object-cover brightness-[0.3]"
                    priority
                    sizes="(max-width: 768px) 100vw, 75vw"
                />
                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl text-center mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 px-4">
                            Workforce Planning & Placement
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 px-4">
                            Aligning your business strategy with the perfect talent from forecasting workforce needs to seamless candidate placement, we provide a strategic approach to drive organizational success.
                        </p>
                        <div className="flex justify-center">
                            <Link href="/contact">
                                <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-6 text-lg hover:from-blue-600 hover:to-blue-800 transition-colors">
                                    Discuss Your Requirements
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="pt-20 pb-8 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl mx-auto text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                            Optimizing Your Workforce Strategy
                        </h2>
                        <p className="text-lg text-gray-600">
                            Workforce planning and placement involve a comprehensive analysis of your current workforce, forecasting future needs, and strategically positioning talent to drive efficiency and support growth.
                        </p>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-center">
                                <DynamicIcon iconName="FaCogs" className="text-blue-600 mr-2" />
                                <span className="text-lg text-gray-600">Tailored Talent Solutions</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <DynamicIcon iconName="FaChartLine" className="text-blue-600 mr-2" />
                                <span className="text-lg text-gray-600">Data-Driven Forecasting</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <DynamicIcon iconName="FaHandshake" className="text-blue-600 mr-2" />
                                <span className="text-lg text-gray-600">Strategic Partnerships</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <DynamicIcon iconName="FaRocket" className="text-blue-600 mr-2" />
                                <span className="text-lg text-gray-600">Accelerated Growth</span>
                            </div>
                        </div>
                        <p className="text-base text-gray-500 mt-4">
                            Our approach combines industry insights with cutting-edge technology to not only anticipate your future needs but also to optimize the current deployment of talent. We take pride in developing proven strategies that drive superior results, ensuring that every piece of your workforce puzzle fits perfectly.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Comprehensive Approach */}
            <section className="pt-0 pb-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl mx-auto text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                            Our Comprehensive Approach
                        </h2>
                        <p className="text-lg text-gray-600">
                            We follow a structured process to ensure your organization has the right talent at the right time.
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto space-y-12">
                        {/* Step 1: Workforce Analysis */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-6"
                        >
                            <div className="flex items-start space-x-6">
                                <div className="text-blue-600 text-3xl pt-1">
                                    <DynamicIcon iconName="FaChartLine" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                        Workforce Analysis
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        We conduct an in-depth study of your current workforce capabilities, assessing strengths, weaknesses, and emerging trends to understand your talent landscape.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 2: Gap Identification */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-6"
                        >
                            <div className="flex items-start space-x-6">
                                <div className="text-blue-600 text-3xl pt-1">
                                    <DynamicIcon iconName="FaSearch" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                        Gap Identification
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        Through rigorous analysis, we pinpoint critical talent gaps that may limit your organization's growth and performance.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 3: Strategic Workforce Planning */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-6"
                        >
                            <div className="flex items-start space-x-6">
                                <div className="text-blue-600 text-3xl pt-1">
                                    <DynamicIcon iconName="FaClipboardCheck" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                        Strategic Workforce Planning
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        We integrate market insights and your business objectives to develop tailored strategies that ensure you have the right mix of skills and expertise.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 4: Talent Sourcing & Screening */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-6"
                        >
                            <div className="flex items-start space-x-6">
                                <div className="text-blue-600 text-3xl pt-1">
                                    <DynamicIcon iconName="FaHandshake" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                        Talent Sourcing & Screening
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        Leveraging advanced tools and extensive networks, we identify and vet top candidates to meet your strategic workforce needs.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 5: Seamless Onboarding */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-6"
                        >
                            <div className="flex items-start space-x-6">
                                <div className="text-blue-600 text-3xl pt-1">
                                    <DynamicIcon iconName="FaBalanceScale" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                        Seamless Onboarding
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        We ensure a smooth integration for new hires with personalized onboarding programs that quickly align them with your company culture and goals.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                            Ready to Optimize Your Workforce?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Let&apos;s discuss how our targeted approach to workforce planning and placement can transform your organization.
                        </p>
                        <Link href="/contact">
                            <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 text-lg hover:from-blue-600 hover:to-blue-800 transition-colors">
                                Get in Touch
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
} 