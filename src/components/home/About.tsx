import { Target, Eye } from 'lucide-react'

export function About() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                {/* Main Introduction */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-6">
                        About Versaa Tech
                    </h2>
                    <p className="text-gray-700 max-w-4xl mx-auto text-lg leading-relaxed">
                        Versaa Tech is a results-driven organization that leverages deep job market data and human capital expertise to deliver specialized solutions. We are your trusted partner in transforming human capital challenges into competitive advantages.
                    </p>
                </div>

                {/* Mission and Vision Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg hover:shadow-xl p-8 border border-blue-100 transition-all duration-500 ease-out">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl mr-4 shadow-md">
                                <Target className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Our Mission</h3>
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Streamlining HR processes through solutions that empower organizations and indivividuals, drive success and foster thriving workplaces.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg hover:shadow-xl p-8 border border-green-100 transition-all duration-500 ease-out">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl mr-4 shadow-md">
                                <Eye className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Our Vision</h3>
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed">
                            To shape the future of HR by creating inclusive and adaptive work environemnts that insipre excellence globally.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}