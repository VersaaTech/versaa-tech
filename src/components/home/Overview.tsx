'use client'

import { motion } from 'framer-motion';
import { ArrowRight, LineChart, Users2, Briefcase } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        title: "Our Services",
        icon: Briefcase,
        content: "We offer a comprehensive suite of human capital solutions, tailored to meet the unique challenges and opportunities in today's dynamic business landscape.",
        highlights: [
            "Executive search",
            "Workforce planning & placement",
            "HR technology and digital transformation",
            "Organizational development consulting"
        ]
    },
    {
        title: "Technical Expertise",
        icon: LineChart,
        content: "Our cornerstone is deep knowledge of job trends and market insights, coupled with vast experience in recruitment across various industry verticals.",
        highlights: [
            "Cutting-edge job market analytics",
            "Industry-specific recruitment strategies",
            "Innovative talent acquisition techniques",
            "Data-driven performance metrics"
        ]
    },
    {
        title: "Why Choose Us",
        icon: Users2,
        content: "Versaa Tech brings together a unique blend of corporate acumen and consulting prowess, led by globally recognized executives and industry veterans.",
        highlights: [
            "Leadership with Fortune 500 experience",
            "Agile and adaptive methodologies",
            "Client-centric approach to solutions",
            "Proven track record of success"
        ]
    }
]

export function Overview() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const iconVariants = {
        hover: {
            scale: 1.1,
            transition: {
                type: "spring",
                stiffness: 300,
                duration: 0.8
            }
        }
    };

    const listItemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.4
            }
        })
    };

    return (
        <motion.section
            className="py-16 px-4 md:px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                <motion.div
                    key="Our Services"
                    className="p-6 space-y-6 md:col-span-2"
                    variants={cardVariants}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <motion.div
                            whileHover="hover"
                            variants={iconVariants}
                        >
                            <Briefcase className="w-8 h-8 text-yellow-500" strokeWidth={1.5} />
                        </motion.div>
                        <h2 className="text-2xl font-semibold text-gray-700 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
                            Our Services
                        </h2>
                    </div>
                    <div>
                        <p className="text-gray-700 mb-6">We offer a comprehensive suite of human capital solutions, tailored to meet the unique challenges and opportunities in today&apos;s dynamic business landscape.</p>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.li
                            variants={listItemVariants}
                            className="w-full"
                            key="exec-search"
                        >
                            <Link href="/executive-search" className="block">
                                <div className="flex items-start p-3 bg-[#e2eeff] rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:bg-blue-100 group">
                                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1 group-hover:text-blue-500 transition duration-200" />
                                    <span className="text-gray-700 group-hover:text-blue-500 transition duration-200">
                                        Executive search
                                    </span>
                                </div>
                            </Link>
                        </motion.li>

                        <motion.li
                            variants={listItemVariants}
                            className="w-full"
                            key="workforce"
                        >
                            <Link href="/workforce-planning" className="block">
                                <div className="flex items-start p-3 bg-[#e2eeff] rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:bg-blue-100 group">
                                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1 group-hover:text-blue-500 transition duration-200" />
                                    <span className="text-gray-700 group-hover:text-blue-500 transition duration-200">
                                        Workforce planning & placement
                                    </span>
                                </div>
                            </Link>
                        </motion.li>

                        <motion.li
                            variants={listItemVariants}
                            className="w-full"
                            key="hr-tech"
                        >
                            <Link href="/hr-technology" className="block">
                                <div className="flex items-start p-3 bg-[#e2eeff] rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:bg-blue-100 group">
                                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1 group-hover:text-blue-500 transition duration-200" />
                                    <span className="text-gray-700 group-hover:text-blue-500 transition duration-200">
                                        HR technology and digital transformation
                                    </span>
                                </div>
                            </Link>
                        </motion.li>

                        <motion.li
                            variants={listItemVariants}
                            className="w-full"
                            key="org-dev"
                        >
                            <Link href="/organizational-development" className="block">
                                <div className="flex items-start p-3 bg-[#e2eeff] rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:bg-blue-100 group">
                                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1 group-hover:text-blue-500 transition duration-200" />
                                    <span className="text-gray-700 group-hover:text-blue-500 transition duration-200">
                                        Organizational development consulting
                                    </span>
                                </div>
                            </Link>
                        </motion.li>
                    </ul>
                </motion.div>
                {services
                    .filter((service) => service.title !== "Our Services")
                    .map((service) => (
                        <motion.div
                            key={service.title}
                            className="p-6 space-y-6 md:col-span-1"
                            variants={cardVariants}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <motion.div
                                    whileHover="hover"
                                    variants={iconVariants}
                                >
                                    {service.title === "Technical Expertise" && <LineChart className="w-8 h-8 text-red-500" strokeWidth={1.5} />}
                                    {service.title === "Why Choose Us" && <Users2 className="w-8 h-8 text-green-500" strokeWidth={1.5} />}
                                </motion.div>
                                <h2 className="text-2xl font-semibold text-gray-700 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
                                    {service.title}
                                </h2>
                            </div>
                            <div>
                                <p className="text-gray-700 mb-6">{service.content}</p>
                            </div>
                            <ul className="space-y-3">
                                {service.highlights.map((highlight, hIndex) => (
                                    <motion.li
                                        key={hIndex}
                                        className="flex items-start"
                                        variants={listItemVariants}
                                        custom={hIndex}
                                    >
                                        <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                                        <span className="text-gray-700">{highlight}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
            </div>
        </motion.section>
    )
}

