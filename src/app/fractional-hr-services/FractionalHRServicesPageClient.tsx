'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'

export default function FractionalHRServicesPageClient() {
    return (
        <div className="min-h-screen bg-[#f7fffc]">
            {/* Hero Section */}
            <section className="relative h-auto min-h-[50vh] py-10 sm:min-h-[60vh] md:h-[70vh] flex items-center justify-center">
                <Image
                    src="/images/fractional-hr.jpg"
                    alt="Fractional HR Services"
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
                            Fractional HR Services (Shared HR Service)
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 px-4">
                            Flexible and cost-effective HR solutions that provide professional human resources expertise on a shared basis, delivering comprehensive HR support for growing organizations.
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
                            Shared HR Expertise When You Need It
                        </h2>
                        <p className="text-lg text-gray-600">
                            Our fractional HR services provide access to senior-level HR expertise without the cost of a full-time hire, delivering strategic HR support tailored to your organization&apos;s specific needs and growth stage.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            {
                                icon: 'FaUserTie',
                                title: 'Strategic HR Leadership',
                                content: 'Senior HR executive guidance for strategic planning, organizational development, and people strategy alignment.',
                            },
                            {
                                icon: 'FaGavel',
                                title: 'HR Compliance & Policy',
                                content: 'Development and implementation of HR policies, procedures, and compliance frameworks.',
                            },
                            {
                                icon: 'FaUsers',
                                title: 'Talent Management',
                                content: 'Comprehensive talent acquisition, performance management, and employee development programs.',
                            },
                            {
                                icon: 'FaChartLine',
                                title: 'HR Analytics & Reporting',
                                content: 'Data-driven HR insights and metrics to support strategic decision-making and performance optimization.',
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
                            Flexible Engagement Models
                        </h2>
                        <p className="text-lg text-gray-600 md:px-20">
                            Customizable HR service arrangements designed to match your organization&apos;s needs and budget
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
                                    icon: 'FaClock',
                                    title: 'Part-Time HR Executive',
                                    content: 'Dedicated HR leadership for specific days per week or month',
                                },
                                {
                                    icon: 'FaProjectDiagram',
                                    title: 'Project-Based HR',
                                    content: 'Specialized HR expertise for specific initiatives and transformations',
                                },
                                {
                                    icon: 'FaLifeRing',
                                    title: 'HR Advisory & Consulting',
                                    content: 'Strategic HR guidance and consultation on-demand',
                                },
                                {
                                    icon: 'FaHandsHelping',
                                    title: 'Interim HR Leadership',
                                    content: 'Temporary HR leadership during transitions or absences',
                                },
                                {
                                    icon: 'FaBuilding',
                                    title: 'Startup HR Support',
                                    content: 'HR foundation building for emerging and growing companies',
                                },
                                {
                                    icon: 'FaExpandArrowsAlt',
                                    title: 'Scalable HR Solutions',
                                    content: 'Flexible HR support that grows with your organization',
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
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {model.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        {model.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="pt-0 pb-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl mx-auto text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                            Benefits of Fractional HR Services
                        </h2>
                        <p className="text-lg text-gray-600">
                            Strategic HR expertise that delivers immediate value while building sustainable people practices for long-term success.
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-12">
                        {[
                            {
                                icon: 'FaDollarSign',
                                title: 'Cost-Effective HR Leadership',
                                content: 'Access senior-level HR expertise at a fraction of the cost of a full-time executive, optimizing your HR investment.',
                            },
                            {
                                icon: 'FaRocket',
                                title: 'Immediate Impact & Expertise',
                                content: 'Leverage experienced HR professionals who can contribute immediately without the typical ramp-up time.',
                            },
                            {
                                icon: 'FaExpandArrowsAlt',
                                title: 'Scalable & Flexible Support',
                                content: 'Adjust the level of HR support based on your changing business needs and growth trajectory.',
                            },
                            {
                                icon: 'FaLightbulb',
                                title: 'Strategic HR Innovation',
                                content: 'Gain fresh perspectives and best practices from HR leaders who work across multiple organizations.',
                            },
                            {
                                icon: 'FaShieldAlt',
                                title: 'Risk Mitigation',
                                content: 'Ensure HR compliance and best practices without the commitment and risk of a permanent hire.',
                            },
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="space-y-6"
                            >
                                <div className="flex items-start space-x-6">
                                    <div className="text-blue-600 text-3xl pt-1">
                                        <DynamicIcon iconName={benefit.icon} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            {benefit.content}
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
                            Ready to Access Fractional HR Leadership?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Let&apos;s discuss how our flexible Fractional HR Services can provide the strategic HR expertise your organization needs to thrive.
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