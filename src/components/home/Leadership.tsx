'use client'

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface TeamMember {
    name: string;
    role: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Ramit Walia",
        role: "Chief Growth Officer",
    },
    {
        name: "Bhawna Arora",
        role: "Head Strategy and Business Development",
    }
];

const globalAdvisors = {
    name: "Global Advisors",
    role: "Team of Advisors in USA, Dubai, Mexico, India and Kenya",
    isAdvisors: true
};

const cardStyles = "border shadow-md rounded-2xl";

const GlobalAdvisorsIcon = () => (
    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
        <svg 
            className="w-8 h-8 text-green-600"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
            />
        </svg>
    </div>
);

export function Team() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-12 px-4 md:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">
                    Our Leadership
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                {/* Description Card */}
                <div className="lg:w-1/2">
                    <Card className={`${cardStyles} relative`}>
                        <CardContent className="p-6">
                            <div className={`relative transition-all duration-300 ${!isExpanded ? 'max-h-[12rem] overflow-hidden lg:max-h-none lg:overflow-visible' : 'max-h-[1000px]'}`}>
                                <p className="text-gray-600">
                                    Versaa Tech is led by a team of visionary leaders dedicated to driving innovation, excellence, and sustainable growth in the area of Human Capital Management. Committed to empowering human capital, our leadership team and our global advisors focus on job trends, professional development, skill enhancement, and creating tailored solutions for growth.
                                </p>
                                <p className="text-gray-600 mt-4">
                                    With a deep understanding of industry trends and workforce dynamics, they specialize in targeted recruiting and delivering customized human capital solutions. By aligning talent strategies with organizational needs, they ensure Versaa Tech remains a trusted partner in driving individual and business success. Their dedication to nurturing talent and fostering meaningful connections reflects Versaa Tech&apos;s mission to be a trusted partner creating positive economic impact.
                                </p>
                                {!isExpanded && (
                                    <div className="absolute inset-x-0 bottom-0 h-12 bg-white/50 bg-gradient-to-t from-white to-transparent backdrop-blur-sm flex items-end justify-center lg:hidden">
                                        <button 
                                            onClick={() => setIsExpanded(true)}
                                            className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                                        >
                                            Expand
                                            <svg 
                                                className="w-4 h-4 ml-1 transition-transform group-hover:translate-y-0.5"
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24" 
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M19 9l-7 7-7-7" 
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Team Members Section */}
                <div className="lg:w-1/2">
                    {/* Desktop Layout */}
                    <div className="hidden lg:flex lg:flex-col gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.name}>
                                <Card className={cardStyles}>
                                    <CardContent className="p-6 flex flex-col items-center text-center">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                                        <p className="text-blue-600">{member.role}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                        
                        <div>
                            <Card className={cardStyles}>
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    <GlobalAdvisorsIcon />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{globalAdvisors.name}</h3>
                                    <div>
                                        <p className="text-blue-600">
                                            {globalAdvisors.role}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Mobile/Tablet Layout */}
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8 lg:hidden">
                        {teamMembers.map((member) => (
                            <div key={member.name}>
                                <Card className={cardStyles}>
                                    <CardContent className="p-6 flex flex-col items-center text-center">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                                        <p className="text-blue-600">{member.role}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                        
                        <div className="sm:col-span-2">
                            <Card className={cardStyles}>
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    <GlobalAdvisorsIcon />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{globalAdvisors.name}</h3>
                                    <div>
                                        <p className="text-gray-600">
                                            {globalAdvisors.role}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
