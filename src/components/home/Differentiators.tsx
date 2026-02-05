import { createElement } from 'react'
import { Users, Rocket, Building, Search, Badge, Handshake, Target, Award, Globe } from 'lucide-react'

interface Differentiator {
    icon: React.ElementType
    title: string
    color: string
    description: string
}

const differentiators: Differentiator[] = [
    {
        icon: Globe,
        title: "Your Right Shore Partner",
        color: "text-blue-600",
        description: "We work as an extension of your team, tapping into global talent to help you move faster and work smarter."
    },
    {
        icon: Users,
        title: "Customer First Approach",
        color: "text-blue-600",
        description: "We shape our solutions around your specific needs, so the partnership always puts your goals first."
    },
    {
        icon: Rocket,
        title: "Consistent Delivery",
        color: "text-blue-600",
        description: "We deliver on time and at a high standard, every time."
    },
    {
        icon: Building,
        title: "Industry Expertise",
        color: "text-blue-600",
        description: "Our team knows these industries well, which means better, more practical solutions for you."
    },
    {
        icon: Search,
        title: "Market Research & Benchmarking",
        color: "text-blue-600",
        description: "We use real market data to help you make smarter hiring and workforce decisions."
    },
    {
        icon: Badge,
        title: "Customer Delight",
        color: "text-blue-600",
        description: "We aim to go beyond what's expected and build relationships that last."
    },
    {
        icon: Handshake,
        title: "Winning Together",
        color: "text-blue-600",
        description: "We work alongside you, not just for you, to reach shared goals."
    },
    {
        icon: Target,
        title: "Talent Curators",
        color: "text-blue-600",
        description: "We're focused on finding and attracting the right talent, so the people you hire are the people you need."
    },
    {
        icon: Award,
        title: "Brand Ambassadors",
        color: "text-blue-600",
        description: "We represent your brand with care, making sure every candidate interaction reflects well on you."
    }
]

export function Differentiators() {
    return (
        <section className="py-12 overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold font-display text-foreground mb-8 text-center">
                    Our Differentiators
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3">
                    {differentiators.map((item, index) => {
                        // Determine border classes based on position
                        const isLastInRow = (index + 1) % 3 === 0
                        const isLastRow = index >= 6

                        return (
                            <div
                                key={index}
                                className={`
                                    relative p-6 group
                                    border-b border-border
                                    ${!isLastInRow ? 'md:border-r' : ''}
                                    ${isLastRow ? 'md:border-b-0' : ''}
                                    last:border-b-0 md:last:border-b-0
                                `}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4">
                                        {createElement(item.icon, {
                                            className: `w-7 h-7 ${item.color} transition-transform duration-300 group-hover:scale-110`
                                        })}
                                    </div>
                                    <h3 className="text-xl font-semibold font-display text-foreground mb-2 transition-colors duration-300 group-hover:text-blue-600">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
