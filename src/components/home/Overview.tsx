import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: "🔍",
    title: "Executive Search & Selection",
    description: "Find and recruit top-tier executives for your organization.",
    href: "/executive-search",
  },
  {
    icon: "👥",
    title: "Recruitment Process Outsourcing",
    description: "Let us handle your full recruitment cycle end-to-end.",
    href: "/rpo-recruitment",
  },
  {
    icon: "📊",
    title: "Industry Benchmarking",
    description: "Data-driven insights for competitive positioning.",
    href: "/industry-benchmarking",
  },
  {
    icon: "⚙️",
    title: "Fractional HR Services",
    description: "Flexible HR support tailored to your business needs.",
    href: "/fractional-hr-services",
  },
  {
    icon: "🔧",
    title: "HR Process Outsourcing",
    description: "Simplify your HR operations with hands-on support.",
    href: "/hr-process-outsourcing",
  },
  {
    icon: "💰",
    title: "Payroll Outsourcing",
    description: "End-to-end payroll management, handled for you.",
    href: "/payroll-management",
  },
];

const expertise = [
  "Up-to-date job market analytics",
  "Industry-specific recruitment strategies",
  "Modern talent acquisition methods",
  "Data-driven performance metrics",
];

const whyUs = [
  "Leadership team with decades of experience",
  "Flexible, hands-on approach",
  "Solutions shaped around your priorities",
  "Proven track record of success",
];

export function Overview() {
  return (
    <section className="py-16 px-4 md:px-8">

      {/* Label + Title */}
      <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
        What we do
      </p>
      <h2 className="text-3xl font-bold font-display text-foreground mb-3">
        Our Services
      </h2>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        A full range of HR and recruitment services, built to fit the specific challenges your business faces.
      </p>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border rounded-xl overflow-hidden mb-8">
        {services.map((service, index) => {
          const isLastInRow = (index + 1) % 3 === 0;
          const isLastRow = index >= services.length - 3;
          return (
            <Link
              key={service.href}
              href={service.href}
              className={`
                group flex flex-col gap-3 p-6
                border-b border-border
                hover:bg-blue-50/50 transition-colors duration-200
                ${!isLastInRow ? 'lg:border-r border-border' : ''}
                ${isLastRow ? 'lg:border-b-0' : ''}
                last:border-b-0
              `}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
                {service.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="mt-auto">
                <span className="text-xs font-medium text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Technical Expertise + Why Choose Us */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Technical Expertise */}
        <div className="rounded-xl border border-border bg-muted/30 p-6">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center text-sm">📈</span>
            Technical Expertise
          </h3>
          <ul className="space-y-3">
            {expertise.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why Choose Us */}
        <div className="rounded-xl border border-border bg-muted/30 p-6">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center text-sm">🏆</span>
            Why Choose Us
          </h3>
          <ul className="space-y-3">
            {whyUs.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
