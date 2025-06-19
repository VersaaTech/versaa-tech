'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'

export default function HRProcessOutsourcingPageClient() {
    return (
        <div className="min-h-screen bg-[#f7fffc]">
            {/* Hero Section */}
            <section className="relative h-auto min-h-[50vh] py-10 sm:min-h-[60vh] md:h-[70vh] flex items-center justify-center">
                <Image
                    src="/images/process-outsourcing.png"
                    alt="HR Process Outsourcing"
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
                            HR Process Outsourcing
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 px-4">
                            Streamline your human resources operations with our comprehensive HR Process Outsourcing solutions, designed to enhance efficiency while reducing costs and administrative burden.
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
                            Transform Your HR Operations
                        </h2>
                        <p className="text-lg text-gray-600">
                            Transform your HR operations by outsourcing complex processes to our expert team, allowing you to focus on strategic business initiatives while we handle the operational complexities.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            {
                                icon: 'FaMoneyBillWave',
                                title: 'Payroll Processing',
                                content: 'Complete payroll management from calculation to disbursement with full compliance and accuracy for all your employees.',
                            },
                            {
                                icon: 'FaShieldAlt',
                                title: 'Benefits Administration',
                                content: 'Comprehensive employee benefits management and enrollment services to ensure your team receives the support they need.',
                            },
                            {
                                icon: 'FaFileAlt',
                                title: 'HR Administration',
                                content: 'End-to-end HR administrative support including record keeping and documentation to maintain organizational efficiency.',
                            },
                            {
                                icon: 'FaGavel',
                                title: 'Compliance Management',
                                content: 'Ensuring adherence to local labor laws and regulatory requirements to protect your organization from legal risks.',
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
                            Benefits of HR Process Outsourcing
                        </h2>
                        <p className="text-lg text-gray-600 md:px-20">
                            Unlock operational excellence through strategic HR outsourcing partnerships
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="mb-12 max-w-3xl mx-auto space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: 'FaChartLine',
                                    title: 'Cost Efficiency',
                                    content: 'Reduce HR operational costs by up to 30% through optimized processes and economies of scale',
                                },
                                {
                                    icon: 'FaShieldAlt',
                                    title: 'Enhanced Compliance',
                                    content: 'Ensure full regulatory compliance with expert knowledge of local labor laws',
                                },
                                {
                                    icon: 'FaExpandArrowsAlt',
                                    title: 'Scalability',
                                    content: 'Easily scale HR operations up or down based on business needs',
                                },
                                {
                                    icon: 'FaLaptop',
                                    title: 'Technology Access',
                                    content: 'Leverage advanced HR technology platforms without significant capital investment',
                                },
                                {
                                    icon: 'FaRocket',
                                    title: 'Focus on Core Business',
                                    content: 'Free up internal resources to concentrate on strategic business growth initiatives',
                                },
                                {
                                    icon: 'FaLock',
                                    title: 'Data Security',
                                    content: 'Enterprise-grade security and data encryption for complete protection',
                                },
                            ].map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="text-center p-4"
                                >
                                    <div className="text-blue-600 text-3xl mb-3 flex justify-center">
                                        <DynamicIcon iconName={benefit.icon} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {benefit.content}
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
                            Our HR Outsourcing Approach
                        </h2>
                        <p className="text-lg text-gray-600">
                            We provide scalable, technology-driven HR outsourcing solutions tailored to your organization&apos;s specific needs.
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-12">
                        {[
                            {
                                icon: 'FaSearch',
                                title: 'Process Assessment',
                                content: 'Evaluate your current HR processes to identify optimization opportunities and determine outsourcing scope.',
                            },
                            {
                                icon: 'FaCogs',
                                title: 'Solution Design',
                                content: 'Develop customized HR outsourcing solutions that align with your business objectives and operational requirements.',
                            },
                            {
                                icon: 'FaPlug',
                                title: 'Implementation & Integration',
                                content: 'Seamlessly integrate our HR systems with your existing infrastructure for smooth operations.',
                            },
                            {
                                icon: 'FaHeadset',
                                title: 'Ongoing Management & Support',
                                content: 'Provide continuous HR process management with dedicated support and regular performance reviews.',
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
                            Ready to Transform Your HR Operations?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Let&apos;s discuss how our comprehensive HR process outsourcing solutions can streamline your operations and reduce costs.
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