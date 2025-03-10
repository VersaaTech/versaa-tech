'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { ContactForms } from '@/components/home/ContactForms'

const slideFromBottom = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ContactPage() {
    return (
        <section className="py-12 bg-[#f7fffc] overflow-hidden">
            <div className="px-4 md:px-8 w-full max-w-[100vw]">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto w-full"
                >
                    <motion.h2
                        className="text-3xl font-bold text-center mb-12 text-blue-600 px-4"
                    >
                        Lets Have a Conversation ...
                    </motion.h2>

                    {/* Forms Section */}
                    <div className="w-full overflow-hidden">
                        <ContactForms />
                    </div>

                    {/* Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-full">
                        {/* Email Card */}
                        <motion.div
                            className="w-full"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                ...slideFromBottom,
                                hover: {
                                    scale: 1.02,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                    }
                                }
                            }}
                            whileHover="hover"
                        >
                            <Card className="rounded-2xl shadow-md h-full">
                                <CardContent className="p-7 flex flex-col items-center">
                                    <div className="p-2.5 bg-[#08314e]/10 rounded-full mb-3">
                                        <Mail className="h-7 w-7 text-red-500" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                        Email
                                    </h3>
                                    <a
                                        href="mailto:info@versaatech.com"
                                        className="text-gray-600 hover:text-gray-600/80 transition-colors text-center"
                                    >
                                        info@VersaaTech.com
                                    </a>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Address Card */}
                        <motion.div
                            className="w-full"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                ...slideFromBottom,
                                hover: {
                                    scale: 1.02,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                    }
                                }
                            }}
                            whileHover="hover"
                        >
                            <Card className="rounded-2xl shadow-md h-full">
                                <CardContent className="p-7 flex flex-col items-center">
                                    <div className="p-2.5 bg-[#08314e]/10 rounded-full mb-3">
                                        <MapPin className="h-7 w-7 text-blue-500" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                        Address
                                    </h3>
                                    <div className="text-gray-600 text-center">
                                        <p>Meydan Grandstand, 6th floor</p>
                                        <p>Meydan Road, Nad Al Sheba</p>
                                        <p>Dubai, U.A.E</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
} 