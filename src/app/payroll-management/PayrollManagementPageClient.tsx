'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'

export default function PayrollManagementPageClient() {
    return (
        <div className="min-h-screen bg-[#f7fffc]">
            {/* Hero Section */}
            <section className="relative h-auto min-h-[50vh] py-10 sm:min-h-[60vh] md:h-[70vh] flex items-center justify-center">
                <Image
                    src="/images/payroll-outsourcing.png"
                    alt="Payroll Management Services"
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
                            Payroll Outsourcing
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 px-4">
                            Comprehensive payroll processing solutions that ensure accurate, timely, and compliant payroll management while reducing administrative burden and operational costs.
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
                            Complete Payroll Solutions
                        </h2>
                        <p className="text-lg text-gray-600">
                            Our payroll management services cover every aspect of payroll processing, from basic salary calculations to complex compensation structures and regulatory compliance.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            {
                                icon: 'FaCalculator',
                                title: 'Payroll Processing',
                                content: 'End-to-end payroll calculation and disbursement services with complete accuracy and timeliness.',
                            },
                            {
                                icon: 'FaFileInvoiceDollar',
                                title: 'Tax Management',
                                content: 'Complete tax calculation, deduction, and filing services ensuring full compliance with regulations.',
                            },
                            {
                                icon: 'FaShieldAlt',
                                title: 'Benefits Administration',
                                content: 'Integration of employee benefits with payroll systems for seamless management.',
                            },
                            {
                                icon: 'FaGavel',
                                title: 'Compliance Management',
                                content: 'Ensuring adherence to local labor laws and tax regulations for complete protection.',
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
                            Advanced Payroll Features
                        </h2>
                        <p className="text-lg text-gray-600 md:px-20">
                            Sophisticated payroll capabilities designed to handle complex organizational requirements and diverse workforce structures
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="mb-12 max-w-5xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: 'FaGlobe',
                                    title: 'Multi-Country Payroll',
                                    content: 'Seamless payroll processing across different countries and currencies',
                                },
                                {
                                    icon: 'FaDollarSign',
                                    title: 'Variable Pay Management',
                                    content: 'Handling commissions, bonuses, and performance-based compensation',
                                },
                                {
                                    icon: 'FaClock',
                                    title: 'Time & Attendance Integration',
                                    content: 'Automated integration with time tracking and attendance systems',
                                },
                                {
                                    icon: 'FaCalendarCheck',
                                    title: 'Leave Management',
                                    content: 'Comprehensive leave tracking and payroll impact calculations',
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
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
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className="pt-0 pb-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl mx-auto text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                            Our Payroll Process
                        </h2>
                        <p className="text-lg text-gray-600">
                            Systematic approach to payroll management ensuring accuracy, timeliness, and complete transparency.
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-12">
                        {[
                            {
                                icon: 'FaDatabase',
                                title: 'Data Collection & Validation',
                                content: 'Secure collection and verification of employee data, time records, and compensation information.',
                            },
                            {
                                icon: 'FaCalculator',
                                title: 'Payroll Calculation',
                                content: 'Accurate calculation of gross pay, deductions, taxes, and net pay using advanced algorithms.',
                            },
                            {
                                icon: 'FaCheckCircle',
                                title: 'Review & Approval',
                                content: 'Comprehensive payroll review process with client approval before final processing.',
                            },
                            {
                                icon: 'FaMoneyCheckAlt',
                                title: 'Payment Disbursement',
                                content: 'Secure and timely salary payments through multiple payment channels and methods.',
                            },
                            {
                                icon: 'FaFileAlt',
                                title: 'Reporting & Documentation',
                                content: 'Detailed payroll reports, pay slips, and regulatory documentation for compliance.',
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
                            Ready to Streamline Your Payroll?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Let&apos;s discuss how our comprehensive payroll management services can reduce your administrative burden and ensure compliance.
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