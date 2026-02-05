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
        iconColor: "text-blue-600",
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
                title: "Industry Benchmarking",
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
        iconColor: "text-blue-600",
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
        iconColor: "text-blue-600",
        content: "Versaatech brings together a unique blend of corporate acumen and consulting prowess, led by globally recognized executives and industry veterans.",
        highlights: [
            "Leadership team with decades of experience",
            "Agile and adaptive methodologies",
            "Client-centric approach to solutions",
            "Proven track record of success"
        ]
    }
];

// Reusable component for service links - Editorial Style
const ServiceLinkCard = ({ service, isLastInRow }: { service: ServiceLink; isLastInRow: boolean }) => {
    return (
        <div className={`group ${!isLastInRow ? 'lg:border-r border-border' : ''}`}>
            <Link href={service.href} className="block h-full p-6">
                <h3 className="text-xl font-semibold font-display text-foreground mb-4 group-hover:text-blue-600 transition-colors duration-300 inline bg-gradient-to-r from-blue-600 to-blue-600 bg-no-repeat bg-[length:0%_2px] bg-[position:0_100%] group-hover:bg-[length:100%_2px] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                    {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                </p>
            </Link>
        </div>
    );
};

// Reusable component for highlight lists
const HighlightList = ({ highlights }: { highlights: string[] }) => {
    return (
        <ul className="space-y-3">
            {highlights.map((highlight, index) => {
                return (
                    <li key={index} className="flex items-start">
                        <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1 text-blue-600" />
                        <span className="text-muted-foreground">{highlight}</span>
                    </li>
                );
            })}
        </ul>
    );
};

// Reusable component for section headers
const SectionHeader = ({ section }: { section: OverviewSection }) => {
    const IconComponent = section.icon;

    return (
        <div className="flex items-center gap-4 mb-4 group/header">
            <div className="transition-transform duration-300 group-hover/header:scale-110">
                <IconComponent className={`w-8 h-8 ${section.iconColor}`} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-semibold font-display text-foreground">
                {section.title}
            </h2>
        </div>
    );
};

export function Overview() {
    // Separate services section from other sections
    const servicesSection = overviewData.find(section => section.title === "Our Services");
    const otherSections = overviewData.filter(section => section.title !== "Our Services");

    return (
        <section className="py-16 px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Services Section - Full Width */}
                {servicesSection && (
                    <div className="p-6 space-y-6 md:col-span-2">
                        <SectionHeader section={servicesSection} />
                        <div>
                            <p className="text-muted-foreground mb-6">{servicesSection.content}</p>
                        </div>
                        {servicesSection.serviceLinks && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {servicesSection.serviceLinks.map((service, index) => {
                                    const isLastInRow = (index + 1) % 3 === 0;
                                    const rowIndex = Math.floor(index / 3);
                                    const isLastRow = rowIndex === Math.floor((servicesSection.serviceLinks!.length - 1) / 3);

                                    return (
                                        <div
                                            key={service.href}
                                            className={`
                                                border-b border-border
                                                ${isLastRow ? 'lg:border-b-0' : ''}
                                                last:border-b-0
                                            `}
                                        >
                                            <ServiceLinkCard
                                                service={service}
                                                isLastInRow={isLastInRow}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Other Sections - Half Width Each */}
                {otherSections.map((section, index) => {
                    const isLast = index === otherSections.length - 1;
                    return (
                        <div
                            key={section.title}
                            className={`p-6 space-y-6 md:col-span-1 ${!isLast ? 'md:border-r border-border' : ''}`}
                        >
                            <SectionHeader section={section} />
                            <div>
                                <p className="text-muted-foreground mb-6">{section.content}</p>
                            </div>
                            {section.highlights && <HighlightList highlights={section.highlights} />}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
