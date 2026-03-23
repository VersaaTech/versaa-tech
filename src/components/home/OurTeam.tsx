'use client'

import { Linkedin } from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    linkedIn?: string;
    initials: string;
    gradientFrom: string;
    gradientTo: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Joslyn Mbae",
        role: "Head - HR Projects",
        linkedIn: "https://www.linkedin.com/in/joslyn-mbae-5b6852b0/",
        initials: "JM",
        gradientFrom: "from-violet-500",
        gradientTo: "to-purple-600",
    },
    {
        name: "Fredrick Maeba",
        role: "Lead - Recruitments",
        linkedIn: "https://www.linkedin.com/in/fredrick-maeba/",
        initials: "FM",
        gradientFrom: "from-rose-500",
        gradientTo: "to-pink-600",
    },
    {
        name: "Fredrick Nyambedha",
        role: "HR Project Manager",
        initials: "FN",
        gradientFrom: "from-amber-500",
        gradientTo: "to-orange-600",
    },
    {
        name: "Joyce Nyamaidu",
        role: "Business Development Manager",
        linkedIn: "https://www.linkedin.com/in/joyce-ndamaiyu-715a02a1/",
        initials: "JN",
        gradientFrom: "from-cyan-500",
        gradientTo: "to-blue-600",
    },
];

export function OurTeam() {
    return (
        <section className="py-12 px-4 md:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-foreground mb-4">
                    Our Team
                </h2>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {teamMembers.map((member, index) => {
                        const isLastInRow = (index + 1) % 4 === 0;
                        const isLastTwoInRow = (index + 1) % 2 === 0;

                        return (
                            <div
                                key={member.name}
                                className={`
                                    p-6 flex flex-col items-center text-center group
                                    border-b border-border lg:border-b-0
                                    ${!isLastTwoInRow ? 'sm:border-r' : ''}
                                    ${!isLastInRow ? 'lg:border-r' : ''}
                                    last:border-b-0
                                `}
                            >
                                {/* Profile Avatar with Initials and LinkedIn Overlay */}
                                <div className="relative mb-4">
                                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.gradientFrom} ${member.gradientTo} flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
                                        <span className="text-xl font-bold text-white">{member.initials}</span>
                                    </div>
                                    {/* LinkedIn Overlay on Hover */}
                                    {member.linkedIn && (
                                        <a
                                            href={member.linkedIn}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute inset-0 w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            aria-label={`${member.name}'s LinkedIn profile`}
                                        >
                                            <Linkedin className="w-7 h-7 text-white" />
                                        </a>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    {member.linkedIn && (
                                        <a
                                            href={member.linkedIn}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-700 transition-colors lg:hidden"
                                            aria-label={`${member.name}'s LinkedIn profile`}
                                        >
                                            <Linkedin size={18} />
                                        </a>
                                    )}
                                </div>
                                <p className="text-blue-600 text-sm">{member.role}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
