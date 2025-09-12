'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Linkedin } from "lucide-react";

const cardStyles = "border shadow-md rounded-2xl";

export function OurTeam() {
    const name = "Fredrick Maeba";
    const role = "Executive Recruiter";
    const description = "Fredrick Maeba is an Executive Recruiter with over 6 years of experience, specializing in talent acquisition across industries such as FMCG, technology, manufacturing, healthcare, financial services just to mention. He has successfully delivered more than 60 strategic placements ranging from junior to C-suite level through connecting exceptional talent with opportunities that drive both organizational performance and individual career growth.";

    return (
        <section className="py-12 px-4 md:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">
                    Our Team
                </h2>
            </div>

            <div className="max-w-4xl mx-auto">
                <Card className={cardStyles}>
                    <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col items-center text-center mb-4">
                            <div className="flex items-center gap-4 mb-1">
                                <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
                                <a 
                                    href="https://www.linkedin.com/in/fredrick-maeba/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700 transition-colors"
                                    aria-label="Fredrick Maeba's LinkedIn profile"
                                >
                                    <Linkedin size={20} />
                                </a>
                            </div>
                            <p className="text-blue-600">{role}</p>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            {description}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}


