'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'

export default function RPORecruitmentPageClient() {
    return (
        <div className="min-h-screen bg-[#f7fffc]">
            {/* Hero Section */}
            <section className="relative h-auto min-h-[50vh] py-10 sm:min-h-[60vh] md:h-[70vh] flex items-center justify-center">
                <Image
                    src="/images/recruitment-outsourcing.webp"
                    alt="RPO Recruitment Process Outsourcing"
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
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4">
                            RPO (Recruitment Process Outsourcing)
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 px-4">
                            Transform your talent acquisition with our comprehensive Recruitment Process Outsourcing solutions, delivering scalable, efficient, and cost-effective recruitment services that drive organizational growth.
                        </p>
                        <div className="flex justify-center">
                            <Link href="/contact">
                                <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg hover:from-blue-600 hover:to-blue-800 transition-colors">
                                    Discuss Your Requirements
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="pt-20 pb-8 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl mx-auto text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                            Strategic Recruitment Partnership
                        </h2>
                        <p className="text-lg text-gray-600">
                            Our RPO services provide end-to-end recruitment solutions, from sourcing to onboarding, ensuring you attract and secure top talent while optimizing recruitment costs and improving hiring quality.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            {
                                icon: 'FaRecycle',
                                title: 'Full-Cycle Recruitment',
                                content: 'Complete recruitment lifecycle management from job posting to candidate onboarding with dedicated support.',
                            },
                            {
                                icon: 'FaSearch',
                                title: 'Candidate Sourcing',
                                content: 'Advanced sourcing strategies utilizing multiple channels and passive candidate networks for optimal results.',
                            },
                            {
                                icon: 'FaClipboardCheck',
                                title: 'Screening & Assessment',
                                content: 'Comprehensive candidate evaluation including skills testing and cultural fit assessment.',
                            },
                            {
                                icon: 'FaCalendarAlt',
                                title: 'Interview Coordination',
                                content: 'Professional interview scheduling and coordination with hiring managers for seamless processes.',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="p-6 bg-[#f7fffc] rounded-xl border border-blue-50 hover:border-blue-100 transition-all"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="text-blue-600 text-2xl">
                                        <DynamicIcon iconName={feature.icon} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600">
                                    {feature.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-5xl mx-auto text-center mb-4"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-5">
                            RPO Service Models
                        </h2>
                        <p className="text-lg text-gray-600 md:px-20">
                            Flexible engagement models designed to meet diverse organizational needs and recruitment volumes
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="mb-12 max-w-4xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: 'FaBuilding',
                                    title: 'Full RPO',
                                    content: 'Complete recruitment function outsourcing with dedicated recruitment teams',
                                },
                                {
                                    icon: 'FaPuzzlePiece',
                                    title: 'Hybrid RPO',
                                    content: 'Selective process outsourcing combined with internal recruitment capabilities',
                                },
                                {
                                    icon: 'FaProjectDiagram',
                                    title: 'Project RPO',
                                    content: 'Targeted recruitment projects for specific roles or business initiatives',
                                },
                                {
                                    icon: 'FaClock',
                                    title: 'Recruiter-on-Demand',
                                    content: 'Flexible recruitment support for peak hiring periods',
                                },
                            ].map((model, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="p-6 bg-[#f7fffc] rounded-xl border border-blue-50 hover:border-blue-100 transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="text-blue-600 text-2xl">
                                            <DynamicIcon iconName={model.icon} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {model.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600">
                                        {model.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Technology & Results Section */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl mx-auto text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                            Advanced Technology & Measurable Results
                        </h2>
                        <p className="text-lg text-gray-600">
                            Leverage cutting-edge recruitment technology and data analytics for superior talent acquisition outcomes
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                        {[
                            {
                                icon: 'FaRobot',
                                title: 'AI-Powered Sourcing',
                                content: 'Intelligent candidate matching using machine learning algorithms',
                            },
                            {
                                icon: 'FaChartBar',
                                title: 'Predictive Analytics',
                                content: 'Data-driven insights for improved hiring decisions and candidate success prediction',
                            },
                            {
                                icon: 'FaAutomobile',
                                title: 'Automated Workflows',
                                content: 'Streamlined recruitment processes with automated candidate communications',
                            },
                            {
                                icon: 'FaChartLine',
                                title: 'Real-Time Reporting',
                                content: 'Comprehensive dashboards with recruitment metrics and performance analytics',
                            },
                        ].map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="p-6 bg-[#f7fffc] rounded-xl border border-blue-50 hover:border-blue-100 transition-all"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="text-blue-600 text-2xl">
                                        <DynamicIcon iconName={tech.icon} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {tech.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600">
                                    {tech.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Results Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="max-w-4xl mx-auto"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Our RPO Solutions Deliver</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { metric: '50%', title: 'Faster Time-to-Fill', subtitle: 'Accelerated hiring cycles' },
                                { metric: '40%', title: 'Cost Reduction', subtitle: 'Significant savings' },
                                { metric: '95%', title: 'Quality Hires', subtitle: 'Higher candidate quality' },
                                { metric: '98%', title: 'Client Satisfaction', subtitle: 'Enhanced experience' },
                            ].map((result, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="text-center p-4 bg-blue-50 rounded-lg"
                                >
                                    <div className="text-3xl font-bold text-blue-600 mb-2">{result.metric}</div>
                                    <div className="text-lg font-semibold text-gray-800 mb-1">{result.title}</div>
                                    <div className="text-sm text-gray-600">{result.subtitle}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
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
                            Ready to Transform Your Talent Acquisition?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Let&apos;s explore how our comprehensive RPO solutions can optimize your recruitment processes and deliver superior results.
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