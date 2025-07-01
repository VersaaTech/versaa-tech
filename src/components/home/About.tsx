'use client'

import { Target, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5 }
    }
};

export function About() {
    return (
        <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="py-12"
        >
            <div className="container mx-auto px-4">
                {/* Main Introduction */}
                <motion.div 
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-6">
                        About Versaa Tech
                    </h2>
                    <motion.p 
                        className="text-gray-700 max-w-4xl mx-auto text-lg leading-relaxed"
                        variants={itemVariants}
                    >
                        Versaa Tech is a results-driven organization that leverages deep job market data and human capital expertise to deliver specialized solutions. We are your trusted partner in transforming human capital challenges into competitive advantages.
                    </motion.p>
                </motion.div>

                {/* Mission and Vision Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div 
                        className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg hover:shadow-xl p-8 border border-blue-100 transition-shadow duration-150"
                        variants={cardVariants}
                    >
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl mr-4 shadow-md">
                                <Target className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Our Mission</h3>
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Streamlining HR processes through solutions that empower organizations and indivividuals, drive success and foster thriving workplaces.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg hover:shadow-xl p-8 border border-green-100 transition-shadow duration-150"
                        variants={cardVariants}
                    >
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl mr-4 shadow-md">
                                <Eye className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Our Vision</h3>
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed">
                            To shape the future of HR by creating inclusive and adaptive work environemnts that insipre excellence globally.
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}