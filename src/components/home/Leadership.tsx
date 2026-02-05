'use client'

import { useState } from "react";

interface TeamMember {
    name: string;
    role: string;
    initials: string;
    gradientFrom: string;
    gradientTo: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Ramit Walia",
        role: "Chief Growth Officer",
        initials: "RW",
        gradientFrom: "from-blue-500",
        gradientTo: "to-blue-600",
    },
    {
        name: "Monisha Gossain",
        role: "Chief Operating Officer",
        initials: "MG",
        gradientFrom: "from-indigo-500",
        gradientTo: "to-indigo-600",
    }
];

const globalAdvisors = {
    name: "Global Advisors",
    role: "Team of Advisors in USA, Dubai, Mexico, India and Kenya",
    isAdvisors: true
};

export function Team() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-12 px-4 md:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-foreground mb-4">
                    Our Leadership
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
                {/* Description Section */}
                <div className="lg:w-1/2 lg:border-r border-border">
                    <div className="p-6">
                        <div className={`relative transition-all duration-300 ${!isExpanded ? 'max-h-[12rem] overflow-hidden lg:max-h-none lg:overflow-visible' : 'max-h-[1000px]'}`}>
                            <p className="text-muted-foreground">
                                Versaatech&apos;s leadership brings deep experience in HR and talent management, with a focus on practical results. Our leaders and global advisors stay close to job market trends, professional development, and skill-building, creating solutions that help businesses and people grow.
                            </p>
                            <p className="text-muted-foreground mt-4">
                                They specialize in targeted recruiting and building workforce strategies that fit each organization&apos;s needs. Their focus on developing talent and making strong connections is at the heart of what Versaatech does: helping individuals succeed and creating real economic value.
                            </p>
                            {!isExpanded && (
                                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent flex items-end justify-center lg:hidden">
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
                    </div>
                </div>

                {/* Team Members Section */}
                <div className="lg:w-1/2 border-t lg:border-t-0 border-border">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        {teamMembers.map((member, index) => {
                            const isLastInRow = (index + 1) % 2 === 0;

                            return (
                                <div
                                    key={member.name}
                                    className={`
                                        p-6 flex flex-col items-center text-center group
                                        border-b border-border
                                        ${!isLastInRow ? 'sm:border-r' : ''}
                                    `}
                                >
                                    {/* Profile Avatar with Initials */}
                                    <div className={`w-20 h-20 rounded-full mb-4 bg-gradient-to-br ${member.gradientFrom} ${member.gradientTo} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}>
                                        <span className="text-2xl font-bold text-white">{member.initials}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <p className="text-blue-600">{member.role}</p>
                                </div>
                            );
                        })}

                        {/* Global Advisors - Full width */}
                        <div className="sm:col-span-2 p-6 flex flex-col items-center text-center group border-t border-b border-border">
                            {/* Globe Icon with Gradient Background */}
                            <div className="w-20 h-20 rounded-full mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                                <svg
                                    className="w-10 h-10 text-white"
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
                            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                {globalAdvisors.name}
                            </h3>
                            <p className="text-blue-600">{globalAdvisors.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
