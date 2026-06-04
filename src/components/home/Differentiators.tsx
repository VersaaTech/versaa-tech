import { Users, Rocket, Building, Search, Badge, Handshake, Target, Award, Globe } from 'lucide-react'

const differentiators = [
  {
    icon: Globe,
    title: "Your Right Shore Partner",
    description: "We work as an extension of your team, tapping into global talent to help you move faster and work smarter.",
  },
  {
    icon: Users,
    title: "Customer First Approach",
    description: "We shape our solutions around your specific needs, so the partnership always puts your goals first.",
  },
  {
    icon: Rocket,
    title: "Consistent Delivery",
    description: "We deliver on time and at a high standard, every time.",
  },
  {
    icon: Building,
    title: "Industry Expertise",
    description: "Our team knows these industries well, which means better, more practical solutions for you.",
  },
  {
    icon: Search,
    title: "Market Research & Benchmarking",
    description: "We use real market data to help you make smarter hiring and workforce decisions.",
  },
  {
    icon: Badge,
    title: "Customer Delight",
    description: "We aim to go beyond what's expected and build relationships that last.",
  },
  {
    icon: Handshake,
    title: "Winning Together",
    description: "We work alongside you, not just for you, to reach shared goals.",
  },
  {
    icon: Target,
    title: "Talent Curators",
    description: "We're focused on finding and attracting the right talent, so the people you hire are the people you need.",
  },
  {
    icon: Award,
    title: "Brand Ambassadors",
    description: "We represent your brand with care, making sure every candidate interaction reflects well on you.",
  },
]

export function Differentiators() {
  return (
    <section className="py-16 px-4 md:px-8">

      {/* Header */}
      <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
        What sets us apart
      </p>
      <h2 className="text-3xl font-bold font-display text-foreground mb-3">
        Our Differentiators
      </h2>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        The principles and practices that make Versaatech a partner worth choosing.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border border-border rounded-xl overflow-hidden">
        {differentiators.map((item, index) => {
          const IconComponent = item.icon
          const isLastInRow = (index + 1) % 3 === 0
          const isLastRow = index >= 6

          return (
            <div
              key={index}
              className={`
                group relative p-6 flex flex-col gap-4
                hover:bg-blue-50/50 transition-colors duration-200
                border-b border-border
                ${!isLastInRow ? 'md:border-r border-border' : ''}
                ${isLastRow ? 'md:border-b-0' : ''}
                last:border-b-0
              `}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200 flex-shrink-0">
                <IconComponent className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}
