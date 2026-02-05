'use client'

import { Linkedin, User } from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    linkedIn?: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Fredrick Maeba",
        role: "Lead - Recruitments",
        linkedIn: "https://www.linkedin.com/in/fredrick-maeba/",
    },
    {
        name: "Joslyn Mbae",
        role: "Head - HR Recruitments",
        linkedIn: "https://www.linkedin.com/in/joslyn-mbae-5b6852b0/",
    },
    {
        name: "Fredrick Nyambedha",
        role: "HR Project Manager",
    },
    {
        name: "Joyce Nyamaidu",
        role: "Business Development Manager",
        linkedIn: "https://www.linkedin.com/in/joyce-ndamaiyu-715a02a1/",
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
                                <User className="w-10 h-10 text-blue-600 mb-3 transition-transform duration-300 group-hover:scale-110" />
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    {member.linkedIn && (
                                        <a
                                            href={member.linkedIn}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-700 transition-colors"
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
