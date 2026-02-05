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
        description: "We provide a seamless extension of your team, leveraging global talent to drive efficiency and innovation."
    },
    {
        icon: Users,
        title: "Customer First Approach",
        color: "text-blue-600",
        description: "Our solutions are tailored to your specific needs, ensuring a partnership that prioritizes your success."
    },
    {
        icon: Rocket,
        title: "Consistent Delivery",
        color: "text-blue-600",
        description: "We are committed to on-time and high-quality project delivery, every time."
    },
    {
        icon: Building,
        title: "Industry Expertise",
        color: "text-blue-600",
        description: "Our team has deep knowledge across various industries, allowing us to provide informed and effective solutions."
    },
    {
        icon: Search,
        title: "Market Research & Benchmarking",
        color: "text-blue-600",
        description: "We use data-driven insights to ensure you stay ahead of the curve and make informed decisions."
    },
    {
        icon: Badge,
        title: "Customer Delight",
        color: "text-blue-600",
        description: "We strive to exceed expectations, creating positive experiences and lasting relationships."
    },
    {
        icon: Handshake,
        title: "Winning Together",
        color: "text-blue-600",
        description: "We believe in collaborative partnerships, working with you to achieve shared goals."
    },
    {
        icon: Target,
        title: "Talent Curators",
        color: "text-blue-600",
        description: "We specialize in identifying and attracting top talent, ensuring you have the right people for the job."
    },
    {
        icon: Award,
        title: "Brand Ambassadors",
        color: "text-blue-600",
        description: "We represent your brand with pride, ensuring a positive and professional experience for all."
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
