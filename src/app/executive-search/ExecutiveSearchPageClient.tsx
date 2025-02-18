'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'

export default function ExecutiveSearchPageClient() {
    return (
        <div className="min-h-screen bg-[#f7fffc]">
            {/* Modified Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] md:h-[70vh] flex items-center justify-center">
                <Image
                    src="/images/executive-search-hero.avif"
                    alt="Executive Search"
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
                            Executive Search Excellence
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 px-4">
                            Connecting visionary leaders with transformative opportunities. Our executive search services combine deep industry insight with global reach to identify exceptional talent that drives organizational success.
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

            <section className="pt-20 pb-8 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl mx-auto text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                            Why Versaatech Stands Out in Executive Search
                        </h2>
                        <p className="text-lg text-gray-600">
                            We redefine leadership recruitment through strategic innovation and global connectivity
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: 'FaGlobe',
                                title: 'Global Talent Ecosystem',
                                content: 'Our proprietary network spans 6 continents, connecting us with passive candidates and industry leaders across technology, finance, and manufacturing sectors.',
                            },
                            {
                                icon: 'FaUserCheck',
                                title: 'Precision Candidate Profiling',
                                content: 'Leveraging advanced assessment frameworks, we evaluate leadership competencies, cultural alignment, and strategic vision through immersive case simulations and behavioral analytics.',
                            },
                            {
                                icon: 'FaClock',
                                title: 'Accelerated Time-to-Impact',
                                content: 'Our AI-enhanced vetting process reduces time-to-hire by 40% while maintaining rigorous quality standards, ensuring leadership continuity for your organization.',
                            },
                            {
                                icon: 'FaShieldAlt',
                                title: 'Discreet Search Solutions',
                                content: 'Utilizing secure virtual data rooms and blind candidate profiles, we protect your organizational privacy while conducting C-suite searches.',
                            },
                            {
                                icon: 'FaChartLine',
                                title: 'Success Mapping',
                                content: 'Post-placement, we provide 360° leadership integration programs with measurable KPIs to ensure sustainable executive performance.',
                            },
                            {
                                icon: 'FaIndustry',
                                title: 'Sector-Specific Expertise',
                                content: 'Deep vertical knowledge in different key industries enables precise matching of leadership styles to organizational challenges and market dynamics.',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="p-6 bg-[#f7fffc] rounded-xl border border-blue-50 hover:border-blue-100 transition-all"
                            >
                                <div className="text-blue-600 text-3xl mb-4">
                                    <DynamicIcon iconName={feature.icon} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {feature.title}
                                </h3>
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
                            Our Strategic Advantages
                        </h2>
                        <p className="text-lg text-gray-600 md:px-20">
                            Blending global perspective with localized expertise to deliver transformational leadership solutions
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="mb-12 max-w-3xl mx-auto space-y-6"
                    >
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our executive search approach is rooted in cross-cultural leadership intelligence, enabling us to identify candidates who thrive in complex global environments while maintaining strong local relevance. We combine proprietary market mapping techniques with behavioral science insights to predict leadership success in dynamic business landscapes.
                        </p>
                        
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Through strategic partnerships with industry think tanks and leadership development organizations, we maintain a pulse on emerging executive competencies before they become industry standards. This forward-looking perspective allows us to align your leadership needs with both current operational demands and future strategic objectives, ensuring sustainable organizational growth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Updated Methodology Section */}
            <section className="pt-0 pb-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl mx-auto text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                            Our Comprehensive Executive Search Methodology
                        </h2>
                        <p className="text-lg text-gray-600">
                            A rigorous, multi-phase approach to identifying and securing transformative leadership talent.
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto space-y-12">
                        {/* 1. Strategic Needs Assessment */}
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
                                        Strategic Needs Assessment
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        We begin with an in-depth analysis of your organization's strategic objectives, cultural dynamics, and leadership requirements. Through structured interviews with key stakeholders and comprehensive market analysis, we develop a detailed leadership profile that aligns with your long-term vision.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. Market Intelligence & Competitive Analysis */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-6"
                        >
                            <div className="flex items-start space-x-6">
                                <div className="text-blue-600 text-3xl pt-1">
                                    <DynamicIcon iconName="FaChartBar" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                        Market Intelligence & Competitive Analysis
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        We leverage advanced market research methods to evaluate industry dynamics, competitor benchmarks, and emerging trends. This analysis provides actionable insights, ensuring our search strategy is aligned with both global trends and local market realities.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. Global Talent Mapping */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-6"
                        >
                            <div className="flex items-start space-x-6">
                                <div className="text-blue-600 text-3xl pt-1">
                                    <DynamicIcon iconName="FaNetworkWired" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                        Global Talent Mapping
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        Our proprietary network spans 6 continents, enabling us to identify both active and passive candidates across industries and geographies. We combine traditional search techniques with AI-driven market mapping to uncover hidden talent pools and emerging leadership trends.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 4. Advanced Candidate Screening & Psychometric Evaluation */}
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
                                        Advanced Candidate Screening & Psychometric Evaluation
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        Our multi-layered screening process includes structured interviews, psychometric testing, and behavioral analysis. This rigorous evaluation ensures candidates not only meet the technical requirements but also embody the leadership qualities and cultural fit essential for your organization.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 5. Candidate Engagement & Relationship Management */}
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
                                        Candidate Engagement &amp; Relationship Management
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        We prioritize transparent communication and personalized engagement with potential candidates throughout the search process. Our approach fosters trust and ensures confidentiality, building long-term relationships that benefit both clients and candidates.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 6. Leadership Integration, Negotiation & Success Measurement */}
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
                                        Leadership Integration, Negotiation &amp; Success Measurement
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        Our commitment extends beyond candidate placement. We facilitate seamless leadership integration, provide expert negotiation support, and implement robust success metrics—including quarterly performance reviews—to ensure the sustained impact of every placement.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
