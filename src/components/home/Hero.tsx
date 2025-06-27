"use client"

import { motion } from 'framer-motion';
import Image from 'next/image'
import Link from 'next/link';
import { Button } from "@/components/ui/button"

export function Hero() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 1 }
        }
    };

    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
                duration: 0.8,
                delay: 0.5
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: { 
                type: "spring",
                stiffness: 300
            }
        }
    };

    return (
        <motion.section 
            className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#e0f7fa] to-[#b3e5fc]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background Image */}
            <Image
                src="/images/handshake.webp"
                alt="Background images of two people shaking hands"
                fill
                quality={75}
                className="object-cover"
                priority
            />

            {/* Fade Layer */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Hero Content */}
            <motion.div 
                className="relative z-10 container mx-auto px-6 md:px-8"
                variants={textVariants}
            >
                <div className="max-w-4xl mx-auto text-center text-white">
                    <motion.h1 
                        className="text-3xl md:text-4xl font-bold leading-tight mb-4"
                        variants={textVariants}
                    >
                        Your <span className="bg-gradient-to-r from-[#4EFF7D] to-[#48AFEC] text-transparent bg-clip-text">Trusted Partner</span> for All Human Capital Services!
                    </motion.h1>
                    <motion.p 
                        className="text-base md:text-lg mb-6"
                        variants={textVariants}
                    >
                        Versaa Tech delivers innovative and results-driven human capital solutions to help organizations grow.
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact">
                            <motion.div
                                variants={buttonVariants}
                                whileHover="hover"
                            >
                                <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-500/90 hover:to-blue-700/90 text-white px-6 py-2 w-full sm:w-auto">
                                    HR Redefined
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href="/jobs">
                            <motion.div
                                variants={buttonVariants}
                                whileHover="hover"
                            >
                                <Button className="bg-gradient-to-r from-green-500 to-green-700 hover:bg-gradient-to-r hover:from-green-500/90 hover:to-green-700/90 text-white px-6 py-2 w-full sm:w-auto">
                                    Job Seekers
                                </Button>
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    )
}
