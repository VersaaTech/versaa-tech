import { ArrowRight, LineChart, Users2, Briefcase, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    image?: string;
}

const overviewData: OverviewSection[] = [
    {
        title: "Our Services",
        icon: Briefcase,
        iconColor: "text-blue-600",
        content: "We offer a full range of HR and recruitment services, built to fit the specific challenges your business faces.",
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
                description: "Simplify your HR operations with hands-on support."
            },
            {
                title: "Payroll Outsourcing",
                href: "/payroll-management",
                description: "End-to-end payroll management, handled for you."
            },
        ]
    },
    {
        title: "Technical Expertise",
        icon: LineChart,
        iconColor: "text-blue-600",
        content: "We build on deep knowledge of job trends and market conditions, backed by years of hands-on recruitment experience across industries.",
        highlights: [
            "Up-to-date job market analytics",
            "Industry-specific recruitment strategies",
            "Modern talent acquisition methods",
            "Data-driven performance metrics"
        ],
        image: "/images/overview/technical-expertise.png"
    },
    {
        title: "Why Choose Us",
        icon: Users2,
        iconColor: "text-blue-600",
        content: "Versaatech combines strong corporate experience with a consulting mindset. Our team is led by executives and industry veterans who bring global perspective.",
        highlights: [
            "Leadership team with decades of experience",
            "Flexible, hands-on approach",
            "Solutions shaped around your priorities",
            "Proven track record of success"
        ],
        image: "/images/overview/why-choose-us.png"
    }
];

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
    const servicesSection = overviewData.find(section => section.title === "Our Services");
    const otherSections = overviewData.filter(section => section.title !== "Our Services");

    return (
        <section className="py-16 px-4 md:px-6">
            <div className="grid grid-cols-1 gap-0">
                {/* Services Section - Full Width */}
                {servicesSection && (
                    <div className="p-6 space-y-6">
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

                {/* Other Sections - With Images */}
                {otherSections.map((section, index) => {
                    const isReversed = index % 2 === 1;
                    return (
                        <div
                            key={section.title}
                            className="border-t border-border"
                        >
                            <div className={`grid grid-cols-1 lg:grid-cols-5 min-h-[400px]`}>
                                {/* Text Content */}
                                <div className={`lg:col-span-3 p-8 flex flex-col justify-center ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                                    <SectionHeader section={section} />
                                    <div>
                                        <p className="text-muted-foreground mb-6">{section.content}</p>
                                    </div>
                                    {section.highlights && <HighlightList highlights={section.highlights} />}
                                </div>

                                {/* Image */}
                                {section.image && (
                                    <div className={`lg:col-span-2 relative min-h-[280px] lg:min-h-full ${isReversed ? 'lg:order-1 lg:border-r border-border' : 'lg:order-2 lg:border-l border-border'}`}>
                                        <Image
                                            src={section.image}
                                            alt={section.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                        />
                                        {/* Subtle gradient overlay for text readability */}
                                        <div className={`absolute inset-0 bg-gradient-to-${isReversed ? 'l' : 'r'} from-background/20 to-transparent lg:from-background/40`} />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
