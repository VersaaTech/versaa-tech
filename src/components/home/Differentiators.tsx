import { createElement } from 'react'
import { Users, Rocket, Building, Search, Badge, Handshake, Target, Award } from 'lucide-react'
import Image from 'next/image'

interface Differentiator {
    icon: React.ElementType | string
    title: string
    color: string
    description: string
}

const differentiators: Differentiator[] = [
    {
        icon: "/images/globe.svg",
        title: "Your Right Shore Partner",
        color: "text-blue-600",
        description: "We provide a seamless extension of your team, leveraging global talent to drive efficiency and innovation."
    },
    {
        icon: Users,
        title: "Customer First Approach",
        color: "text-green-600",
        description: "Our solutions are tailored to your specific needs, ensuring a partnership that prioritizes your success."
    },
    {
        icon: Rocket,
        title: "Consistent Delivery",
        color: "text-purple-600",
        description: "We are committed to on-time and high-quality project delivery, every time."
    },
    {
        icon: Building,
        title: "Industry Expertise",
        color: "text-orange-600",
        description: "Our team has deep knowledge across various industries, allowing us to provide informed and effective solutions."
    },
    {
        icon: Search,
        title: "Market Research & Benchmarking",
        color: "text-cyan-600",
        description: "We use data-driven insights to ensure you stay ahead of the curve and make informed decisions."
    },
    {
        icon: Badge,
        title: "Customer Delight",
        color: "text-pink-600",
        description: "We strive to exceed expectations, creating positive experiences and lasting relationships."
    },
    {
        icon: Handshake,
        title: "Winning Together",
        color: "text-indigo-600",
        description: "We believe in collaborative partnerships, working with you to achieve shared goals."
    },
    {
        icon: Target,
        title: "Talent Curators",
        color: "text-red-600",
        description: "We specialize in identifying and attracting top talent, ensuring you have the right people for the job."
    },
    {
        icon: Award,
        title: "Brand Ambassadors",
        color: "text-yellow-600",
        description: "We represent your brand with pride, ensuring a positive and professional experience for all."
    }
]

export function Differentiators() {
    return (
        <section className="py-12 overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-8 text-center">
                    Our Differentiators
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {differentiators.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="relative p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(8,49,78,0.12)] group"
                            >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/3 group-hover:via-blue-500/5 group-hover:to-blue-500/3 transition-all duration-300 -z-10" />
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="p-3 bg-[#08314e]/10 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110">
                                    {typeof item.icon === 'string' ? (
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            width={28}
                                            height={28}
                                            className={`${item.color} transition-all duration-300 group-hover:brightness-110`}
                                            fetchPriority="low"
                                            loading="lazy"
                                        />
                                    ) : (
                                        createElement(item.icon, { 
                                            className: `w-7 h-7 ${item.color} transition-all duration-300 group-hover:brightness-110` 
                                        })
                                    )}
                                </div>
                                <h3 className={`text-xl font-semibold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-gray-900`}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-gray-700">
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