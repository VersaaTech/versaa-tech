import Image from 'next/image'
import Link from 'next/link';
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section 
            className="relative w-full min-h-[500px] sm:min-h-[400px] md:h-[50vh] md:min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#e0f7fa] to-[#b3e5fc] py-8 sm:py-12"
        >
            {/* Background Image */}
            <Image
                src="/images/handshake.webp"
                alt="Background images of two people shaking hands"
                fill
                quality={75}
                className="object-cover"
                priority
                fetchPriority="high"
            />

            {/* Fade Layer */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Hero Content */}
            <div 
                className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8"
            >
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h1 
                        className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 sm:mb-6"
                    >
                        End-to-End <span className="bg-gradient-to-r from-[#4EFF7D] to-[#48AFEC] text-transparent bg-clip-text">Recruitment, HR, and Payroll</span> Outsourcing.
                    </h1>
                    <p 
                        className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-2 sm:px-0"
                    >
                        We find the right people, manage the day-to-day HR and payroll, and provide the expert guidance you need to build a stronger team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-sm sm:max-w-none mx-auto">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <div
                                className="transition-transform duration-300 ease-in-out hover:scale-105 w-full"
                            >
                                <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-500/90 hover:to-blue-700/90 text-white px-6 py-3 sm:py-2 w-full sm:w-auto text-sm sm:text-base">
                                    Talk to an Expert
                                </Button>
                            </div>
                        </Link>
                        <Link href="/jobs" className="w-full sm:w-auto">
                            <div
                                className="transition-transform duration-300 ease-in-out hover:scale-105 w-full"
                            >
                                <Button className="bg-gradient-to-r from-green-500 to-green-700 hover:bg-gradient-to-r hover:from-green-500/90 hover:to-green-700/90 text-white px-6 py-3 sm:py-2 w-full sm:w-auto text-sm sm:text-base">
                                    Job Seekers
                                </Button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
