import { Target, Eye } from 'lucide-react'

export function About() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                {/* About Versaatech Header */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-6">
                        About Versaatech
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Versaatech is an HR consulting firm built around real job market data and hands-on recruitment know-how. We help organizations turn workforce challenges into strengths through focused recruitment, practical HR services, and clear, data-backed guidance.
                    </p>
                </div>

                {/* Mission and Vision */}
                <div className="grid md:grid-cols-2 relative">

                    {/* Mission */}
                    <div className="p-8 md:border-r border-border group">
                        <div className="flex items-center mb-6">
                            <Target className="h-7 w-7 text-blue-600 mr-4 transition-transform duration-300 group-hover:scale-110" />
                            <h3 className="text-xl font-bold font-display text-foreground">Our Mission</h3>
                        </div>
                        <p className="text-muted-foreground text-base leading-relaxed">
                            Making HR simpler through practical solutions that help organizations and their people do their best work, building workplaces where talent grows and businesses reach their goals.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="p-8 border-t md:border-t-0 border-border group">
                        <div className="flex items-center mb-6">
                            <Eye className="h-7 w-7 text-indigo-600 mr-4 transition-transform duration-300 group-hover:scale-110" />
                            <h3 className="text-xl font-bold font-display text-foreground">Our Vision</h3>
                        </div>
                        <p className="text-muted-foreground text-base leading-relaxed">
                            To lead the way in HR by helping build inclusive, adaptable workplaces that bring out the best in people, across both growing and established markets around the world.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
