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
      <Link href={service.href} className="flex flex-col h-full p-6 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
          <h3 className="text-base font-semibold font-display text-foreground group-hover:text-blue-600 transition-colors duration-300">
            {service.title}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed pl-4">
          {service.description}
        </p>
        <div className="pl-4 mt-auto pt-2">
          <span className="text-xs font-medium text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Learn more <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>
    </div>
  );
};

const HighlightList = ({ highlights }: { highlights: string[] }) => {
  return (
    <ul className="space-y-3">
      {highlights.map((highlight, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ArrowRight className="w-3 h-3 text-blue-600" />
          </div>
          <span className="text-muted-foreground text-sm leading-relaxed">{highlight}</span>
        </li>
      ))}
    </ul>
  );
};

const SectionHeader = ({ section }: { section: OverviewSection }) => {
  const IconComponent = section.icon;
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <IconComponent className={`w-5 h-5 ${section.iconColor}`} strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-0.5">
          What we offer
        </p>
        <h2 className="text-xl font-bold font-display text-foreground">
          {section.title}
        </h2>
      </div>
    </div>
  );
};

export function Overview() {
  const servicesSection = overviewData.find(section => section.title === "Our Services");
  const otherSections = overviewData.filter(section => section.title !== "Our Services");

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="grid grid-cols-1 gap-0">

        {/* Services Section */}
        {servicesSection && (
          <div className="p-6 space-y-6">
            <SectionHeader section={servicesSection} />
            <p className="text-muted-foreground text-sm">{servicesSection.content}</p>
            {servicesSection.serviceLinks && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border rounded-xl overflow-hidden">
                {servicesSection.serviceLinks.map((service, index) => {
                  const isLastInRow = (index + 1) % 3 === 0;
                  const rowIndex = Math.floor(index / 3);
                  const isLastRow = rowIndex === Math.floor((servicesSection.serviceLinks!.length - 1) / 3);
                  return (
                    <div
                      key={service.href}
                      className={`border-b border-border hover:bg-blue-50/50 transition-colors duration-200
                        ${isLastRow ? 'lg:border-b-0' : ''}
                        last:border-b-0
                      `}
                    >
                      <ServiceLinkCard service={service} isLastInRow={isLastInRow} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Technical Expertise & Why Choose Us */}
        {otherSections.map((section, index) => {
          const isReversed = index % 2 === 1;
          return (
            <div key={section.title} className="border-t border-border">
              <div className={`grid grid-cols-1 lg:grid-cols-5 min-h-[380px]`}>

                {/* Text */}
                <div className={`lg:col-span-3 p-8 flex flex-col justify-center gap-4 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <SectionHeader section={section} />
                  <p className="text-muted-foreground text-sm leading-relaxed">{section.content}</p>
                  {section.highlights && <HighlightList highlights={section.highlights} />}
                </div>

                {/* Image */}
                {section.image && (
                  <div className={`lg:col-span-2 relative min-h-[260px] lg:min-h-full ${isReversed ? 'lg:order-1 lg:border-r border-border' : 'lg:order-2 lg:border-l border-border'}`}>
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
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
