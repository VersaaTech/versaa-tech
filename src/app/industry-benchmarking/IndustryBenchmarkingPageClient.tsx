'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'

export default function IndustryBenchmarkingPageClient() {
    return (
        <div className="min-h-screen bg-[#f7fffc]">
            {/* Hero Section */}
            <section className="relative h-auto min-h-[50vh] py-10 sm:min-h-[60vh] md:h-[70vh] flex items-center justify-center">
                <Image
                    src="/images/hr-benchmarking.jpg"
                    alt="Industry Benchmarking"
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
                            Industry HR Benchmarking
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 px-4">
                            Comprehensive industry analysis and benchmarking services that provide strategic insights to optimize your human capital strategies and competitive positioning.
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
                            Strategic Industry Intelligence
                        </h2>
                        <p className="text-lg text-gray-600">
                            Our industry benchmarking services deliver data-driven insights that enable informed decision-making across compensation, talent acquisition, and organizational development initiatives.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            {
                                icon: 'FaDollarSign',
                                title: 'Compensation Benchmarking',
                                content: 'Comprehensive salary and benefits analysis across industry verticals to ensure competitive positioning.',
                            },
                            {
                                icon: 'FaChartBar',
                                title: 'Talent Market Analysis',
                                content: 'In-depth assessment of talent availability and competitive landscape for strategic planning.',
                            },
                            {
                                icon: 'FaUsers',
                                title: 'HR Practice Benchmarking',
                                content: 'Comparison of HR policies and practices against industry standards and best practices.',
                            },
                            {
                                icon: 'FaChartLine',
                                title: 'Performance Metrics Analysis',
                                content: 'Evaluation of key performance indicators against industry benchmarks for optimization.',
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
                            Industry Focus Areas
                        </h2>
                        <p className="text-lg text-gray-600 md:px-20">
                            Specialized benchmarking services across diverse industry sectors and functional areas
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="mb-12 max-w-5xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: 'FaLaptopCode',
                                    title: 'Technology Sector',
                                    content: 'Software, hardware, and emerging technology companies',
                                },
                                {
                                    icon: 'FaUniversity',
                                    title: 'Financial Services',
                                    content: 'Banking, insurance, and investment firms',
                                },
                                {
                                    icon: 'FaIndustry',
                                    title: 'Manufacturing',
                                    content: 'Automotive, aerospace, and industrial manufacturing',
                                },
                                {
                                    icon: 'FaHeartbeat',
                                    title: 'Healthcare',
                                    content: 'Hospitals, pharmaceutical companies, and medical device manufacturers',
                                },
                                {
                                    icon: 'FaBolt',
                                    title: 'Energy & Utilities',
                                    content: 'Oil & gas, renewable energy, and utility companies',
                                },
                                {
                                    icon: 'FaStore',
                                    title: 'Retail & Consumer',
                                    content: 'Retail chains, consumer goods, and e-commerce companies',
                                },
                            ].map((industry, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="p-6 bg-[#f7fffc] rounded-xl border border-blue-50 hover:border-blue-100 transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="text-blue-600 text-2xl">
                                            <DynamicIcon iconName={industry.icon} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {industry.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        {industry.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="pt-0 pb-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl mx-auto text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                            Our Benchmarking Process
                        </h2>
                        <p className="text-lg text-gray-600">
                            Rigorous methodology that ensures accuracy, relevance, and actionable insights for your organization.
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-12">
                        {[
                            {
                                icon: 'FaTarget',
                                title: 'Scope Definition',
                                content: 'Clear definition of benchmarking objectives, metrics, and target comparison groups.',
                            },
                            {
                                icon: 'FaDatabase',
                                title: 'Data Collection & Validation',
                                content: 'Comprehensive data gathering from reliable industry sources and proprietary databases.',
                            },
                            {
                                icon: 'FaChartBar',
                                title: 'Analysis & Comparison',
                                content: 'Detailed statistical analysis comparing your organization against relevant industry benchmarks.',
                            },
                            {
                                icon: 'FaLightbulb',
                                title: 'Insights & Recommendations',
                                content: 'Strategic recommendations based on benchmarking findings and best practice identification.',
                            },
                            {
                                icon: 'FaHandsHelping',
                                title: 'Implementation Support',
                                content: 'Ongoing support for implementing recommendations and tracking progress against benchmarks.',
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="space-y-6"
                            >
                                <div className="flex items-start space-x-6">
                                    <div className="text-blue-600 text-3xl pt-1">
                                        <DynamicIcon iconName={step.icon} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            {step.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
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
                            Ready to Benchmark Your Performance?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Let&apos;s discuss how our comprehensive industry benchmarking services can provide strategic insights for your organization.
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