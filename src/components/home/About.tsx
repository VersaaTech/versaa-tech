import { Target, Eye } from 'lucide-react'

export function About() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                {/* Main Introduction */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-display text-foreground mb-6">
                        About Versaatech
                    </h2>
                    <p className="text-muted-foreground max-w-4xl mx-auto text-lg leading-relaxed">
                        Versaatech is a results-driven HR consulting firm that leverages deep job market data and human capital expertise to deliver specialized talent acquisition and workforce solutions. As a trusted partner in human capital management, we transform organizational challenges into competitive advantages through strategic recruitment, comprehensive HR services, and data-driven insights.
                    </p>
                </div>

                {/* Mission and Vision - Editorial Style */}
                <div className="grid md:grid-cols-2">
                    {/* Mission */}
                    <div className="p-8 md:border-r border-border group">
                        <div className="flex items-center mb-6">
                            <Target className="h-7 w-7 text-blue-600 mr-4 transition-transform duration-300 group-hover:scale-110" />
                            <h3 className="text-xl font-bold font-display text-foreground">Our Mission</h3>
                        </div>
                        <p className="text-muted-foreground text-base leading-relaxed">
                            Streamlining HR processes through innovative solutions that empower organizations and individuals, drive success, and foster thriving workplaces where talent can flourish and businesses can achieve their full potential.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="p-8 border-t md:border-t-0 border-border group">
                        <div className="flex items-center mb-6">
                            <Eye className="h-7 w-7 text-navy-600 mr-4 transition-transform duration-300 group-hover:scale-110" />
                            <h3 className="text-xl font-bold font-display text-foreground">Our Vision</h3>
                        </div>
                        <p className="text-muted-foreground text-base leading-relaxed">
                            To shape the future of HR by creating inclusive and adaptive work environments that inspire excellence globally, positioning ourselves as the leading human capital solutions provider across emerging and established markets.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
