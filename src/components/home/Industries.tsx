"use client"

import { LazyMotion, domAnimation } from 'framer-motion';
import * as m from 'framer-motion/m';
import { Monitor, Phone, Flame, Building2, Factory, Stethoscope, GraduationCap, Home, HardHat, ShoppingBag, Landmark, Shield } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

interface Industry {
    title: string
    icon: React.ElementType
    description: string
    color: string
    image: string
}

const industries: Industry[] = [
    {
        title: "Information Technology",
        icon: Monitor,
        description: "Specialized IT talent acquisition including software development, cloud computing, and cybersecurity professionals.",
        color: "text-blue-400",
        image: "/images/industries/it.webp"
    },
    {
        title: "Telecom",
        icon: Phone,
        description: "Supporting telecommunications companies with network engineers, system architects, and technical specialists.",
        color: "text-green-400",
        image: "/images/industries/telecom.webp"
    },
    {
        title: "Oil & Gas",
        icon: Flame,
        description: "Connecting energy sector organizations with experienced professionals in exploration, production, and operations.",
        color: "text-orange-400",
        image: "/images/industries/oil-gas.webp"
    },
    {
        title: "Hospitality",
        icon: Building2,
        description: "Staffing solutions for hotels, restaurants, and tourism businesses with customer-focused professionals.",
        color: "text-purple-400",
        image: "/images/industries/hospitality.webp"
    },
    {
        title: "Manufacturing",
        icon: Factory,
        description: "Recruiting skilled workers and management professionals for modern manufacturing environments.",
        color: "text-slate-300",
        image: "/images/industries/manufacturing.webp"
    },
    {
        title: "Pharma & Health",
        icon: Stethoscope,
        description: "Specialized recruitment for pharmaceutical companies and healthcare organizations.",
        color: "text-red-400",
        image: "/images/industries/pharma-health.webp"
    },
    {
        title: "Education & EdTech",
        icon: GraduationCap,
        description: "Connecting educational institutions with teaching professionals and EdTech specialists.",
        color: "text-yellow-400",
        image: "/images/industries/education.webp"
    },
    {
        title: "Real Estate",
        icon: Home,
        description: "Talent solutions for property development, management, and real estate services.",
        color: "text-cyan-400",
        image: "/images/industries/real-estate.webp"
    },
    {
        title: "Construction",
        icon: HardHat,
        description: "Recruiting professionals for construction projects, from skilled trades to project management.",
        color: "text-amber-400",
        image: "/images/industries/construction.webp"
    },
    {
        title: "Retail",
        icon: ShoppingBag,
        description: "Staffing solutions for retail operations, from store management to e-commerce specialists.",
        color: "text-pink-400",
        image: "/images/industries/retail.webp"
    },
    {
        title: "Financial Services / Banking",
        icon: Landmark,
        description: "Connecting financial institutions with qualified professionals in banking, investment, and fintech.",
        color: "text-emerald-400",
        image: "/images/industries/financial.webp"
    },
    {
        title: "Insurance",
        icon: Shield,
        description: "Recruiting specialists for insurance companies, from actuaries to claims professionals.",
        color: "text-indigo-400",
        image: "/images/industries/insurance.webp"
    }
]

export function Industries() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
        dragFree: true,
        inViewThreshold: 0.7,
        containScroll: 'trimSnaps'
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const
            }
        }
    } as const;

    const buttonVariants = {
        hover: {
            scale: 1.1,
            transition: {
                type: "spring" as const,
                stiffness: 300
            }
        }
    } as const;

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
    const autoplayRef = useRef<NodeJS.Timeout | null>(null)

    const startAutoplay = useCallback(() => {
        if (!emblaApi) return

        if (autoplayRef.current) {
            clearInterval(autoplayRef.current)
        }

        autoplayRef.current = setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext()
            } else {
                emblaApi.scrollTo(0)
            }
        }, 5000)
    }, [emblaApi])

    const resetAutoplay = useCallback(() => {
        startAutoplay()
    }, [startAutoplay])

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
        startAutoplay()
    }, [emblaApi, startAutoplay])

    const scrollNext = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
        startAutoplay()
    }, [emblaApi, startAutoplay])

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setPrevBtnEnabled(emblaApi.canScrollPrev())
            setNextBtnEnabled(emblaApi.canScrollNext())
        }

        emblaApi.on('select', onSelect)
        onSelect()

        startAutoplay()

        emblaApi.on('pointerDown', resetAutoplay)

        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current)
            }
            emblaApi.off('select', onSelect)
            emblaApi.off('pointerDown', resetAutoplay)
        }
    }, [emblaApi, startAutoplay, resetAutoplay])

    return (
        <LazyMotion features={domAnimation}>
            <m.section
                className="py-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <div className="px-4 md:px-8">
                    <m.div
                        className="text-center mb-12"
                        variants={containerVariants}
                    >
                        <h2 className="text-3xl font-bold font-display text-foreground mb-4">
                            Our Industry Practices
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We work across a wide range of industries, bringing a grounded understanding of the challenges and talent needs specific to each sector.
                        </p>
                    </m.div>

                    <div className="relative">
                        {/* Carousel Container */}
                        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                            <div className="flex">
                                {industries.map((industry, index) => {
                                    const Icon = industry.icon
                                    return (
                                        <m.div
                                            key={index}
                                            className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_calc(33.333%)] p-1"
                                            variants={cardVariants}
                                        >
                                            <m.div
                                                whileHover="hover"
                                                variants={cardVariants}
                                                className="group h-full"
                                            >
                                                <div className="relative h-[320px] rounded-lg overflow-hidden">
                                                    {/* Background Image */}
                                                    <Image
                                                        src={industry.image}
                                                        alt={industry.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                                    />
                                                    {/* Gradient Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/20 transition-all duration-500 group-hover:from-slate-900/90 group-hover:via-slate-900/50" />

                                                    {/* Content */}
                                                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                                            <div className="flex items-center gap-3 mb-3">
                                                                <div className={`p-2 rounded-lg bg-white/10 backdrop-blur-sm ${industry.color}`}>
                                                                    <Icon className="w-6 h-6" />
                                                                </div>
                                                            </div>
                                                            <h3 className="font-semibold font-display text-xl mb-2 text-white">
                                                                {industry.title}
                                                            </h3>
                                                            <p className="text-sm text-gray-200 line-clamp-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                                                {industry.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </m.div>
                                        </m.div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-center gap-4 mt-8">
                            <m.div
                                whileHover="hover"
                                variants={buttonVariants}
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className={`rounded-full ${
                                        !prevBtnEnabled ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    onClick={scrollPrev}
                                    disabled={!prevBtnEnabled}
                                    aria-label="Previous"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                            </m.div>

                            <m.div
                                whileHover="hover"
                                variants={buttonVariants}
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className={`rounded-full ${
                                        !nextBtnEnabled ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    onClick={scrollNext}
                                    disabled={!nextBtnEnabled}
                                    aria-label="Next"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </m.div>
                        </div>
                    </div>
                </div>
            </m.section>
        </LazyMotion>
    )
}
