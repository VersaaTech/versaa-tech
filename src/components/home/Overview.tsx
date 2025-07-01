'use client'

import { motion } from 'framer-motion';
import { ArrowRight, LineChart, Users2, Briefcase, LucideIcon } from 'lucide-react';
import Link from 'next/link';

// Unified data structure for all services and sections
interface ServiceLink {
    title: string;
    href: string;
    description: string;
}

interface OverviewSection {
    title: string;
    icon: LucideIcon;
    iconColor: string;
    content: string;
    highlights?: string[];
    serviceLinks?: ServiceLink[];
}

const overviewData: OverviewSection[] = [
    {
        title: "Our Services",
        icon: Briefcase,
        iconColor: "text-yellow-500",
        content: "We offer a comprehensive suite of human capital solutions, tailored to meet the unique challenges and opportunities in today's dynamic business landscape.",
        serviceLinks: [
            {
                title: "Executive Search and Selection",
                href: "/executive-search",
                description: "Find and recruit top-tier executives for your organization."
            },
            {
                title: "Recruitment Process Outsourcing (RPO)",
                href: "/rpo-recruitment",
                description: "Let us help you recruit the right talent."
            },
            {
                title: "Industry HR Benchmarking",
                href: "/industry-benchmarking",
                description: "Data-driven insights for competitive positioning."
            },
            {
                title: "Fractional HR Services (Shared HR Service)",
                href: "/fractional-hr-services",
                description: "Flexible HR support tailored to your needs."
            },
            {
                title: "HR Process Outsourcing",
                href: "/hr-process-outsourcing",
                description: "Streamline your HR operations with our expert services."
            },
            {
                title: "Payroll Outsourcing",
                href: "/payroll-management",
                description: "Comprehensive payroll management solutions."
            },
        ]
    },
    {
        title: "Technical Expertise",
        icon: LineChart,
        iconColor: "text-red-500",
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
        iconColor: "text-green-500",
        content: "Versaa Tech brings together a unique blend of corporate acumen and consulting prowess, led by globally recognized executives and industry veterans.",
        highlights: [
            "Leadership with Fortune 500 experience",
            "Agile and adaptive methodologies",
            "Client-centric approach to solutions",
            "Proven track record of success"
        ]
    }
];

// Reusable component for service links
const ServiceLinkCard = ({ service, index }: { service: ServiceLink; index: number }) => {
    const listItemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay: index * 0.1,
                duration: 0.4
            }
        }
    };

    return (
        <motion.div
            variants={listItemVariants}
            className="w-full"
            key={service.href}
        >
            <Link href={service.href} className="block h-full">
                <div className="h-full p-6 border shadow-md rounded-2xl bg-white hover:shadow-lg transition-all duration-300 group">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                    </p>
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                        <span className="mr-2">Learn more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

// Reusable component for highlight lists
const HighlightList = ({ highlights }: { highlights: string[] }) => {
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
        <ul className="space-y-3">
            {highlights.map((highlight, index) => (
                <motion.li
                    key={index}
                    className="flex items-start"
                    variants={listItemVariants}
                    custom={index}
                >
                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{highlight}</span>
                </motion.li>
            ))}
        </ul>
    );
};

// Reusable component for section headers
const SectionHeader = ({ section }: { section: OverviewSection }) => {
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

    const IconComponent = section.icon;

    return (
        <div className="flex items-center gap-4 mb-4">
            <motion.div
                whileHover="hover"
                variants={iconVariants}
            >
                <IconComponent className={`w-8 h-8 ${section.iconColor}`} strokeWidth={1.5} />
            </motion.div>
            <h2 className="text-2xl font-semibold text-gray-700 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
                {section.title}
            </h2>
        </div>
    );
};

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

    // Separate services section from other sections
    const servicesSection = overviewData.find(section => section.title === "Our Services");
    const otherSections = overviewData.filter(section => section.title !== "Our Services");

    return (
        <motion.section
            className="py-16 px-4 md:px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Services Section - Full Width */}
                {servicesSection && (
                    <motion.div
                        className="p-6 space-y-6 md:col-span-2"
                        variants={cardVariants}
                    >
                        <SectionHeader section={servicesSection} />
                        <div>
                            <p className="text-gray-700 mb-6">{servicesSection.content}</p>
                        </div>
                        {servicesSection.serviceLinks && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {servicesSection.serviceLinks.map((service, index) => (
                                    <ServiceLinkCard 
                                        key={service.href} 
                                        service={service} 
                                        index={index} 
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Other Sections - Half Width Each */}
                {otherSections.map((section) => (
                    <motion.div
                        key={section.title}
                        className="p-6 space-y-6 md:col-span-1"
                        variants={cardVariants}
                    >
                        <SectionHeader section={section} />
                        <div>
                            <p className="text-gray-700 mb-6">{section.content}</p>
                        </div>
                        {section.highlights && <HighlightList highlights={section.highlights} />}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

