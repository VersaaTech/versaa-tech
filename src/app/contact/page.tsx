'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Phone, Clock } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ContactForms } from '@/components/home/ContactForms'

const slideFromBottom = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ContactPage() {
    const [selectedRole, setSelectedRole] = useState<'jobseeker' | 'employer' | ''>('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleInquire = () => {
        if (!selectedRole) {
            alert('Please select whether you are a Job Seeker or Employer before inquiring.')
            return
        }

        let subject = ''
        let body = ''
        
        if (selectedRole === 'jobseeker') {
            subject = 'Job Seeker Inquiry'
            body = `Hello,\n\nI am a job seeker interested in exploring opportunities with VersaaTech. I would like to learn more about available positions and how your services can help me in my career search.\n\nPlease describe your background, experience, and the type of opportunities you are seeking:\n[type message here]\n\nBest regards,\n[Your Name]`
        } else if (selectedRole === 'employer') {
            subject = 'Employer Inquiry'
            body = `Hello,\n\nI am an employer interested in VersaaTech's HR services. I would like to discuss how your solutions can help our organization with our talent acquisition and HR needs.\n\nPlease describe your organization and specific HR needs:\n[type message here]\n\nBest regards,\n[Your Name]\n[Your Company]\n[Your Contact Information]`
        }
        
        const mailtoLink = `mailto:info@versaatech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(mailtoLink, '_blank')
    }

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
                    <motion.h1
                        className="text-3xl font-bold text-center mb-16 text-blue-600 px-4"
                    >
                        Let's Have a Conversation...
                    </motion.h1>

                    {/* Contact Information Grid - 2x3 Layout */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideFromBottom}
                    >
                        {/* Get in Touch Section */}
                        <Card className="rounded-2xl shadow-lg p-6 bg-blue-50">
                            <CardContent className="p-0">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                        Select Your Role to Proceed
                                    </h3>
                                    <div className="flex space-x-6">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="jobseeker"
                                                name="role"
                                                value="jobseeker"
                                                checked={selectedRole === 'jobseeker'}
                                                onChange={(e) => setSelectedRole(e.target.value as 'jobseeker')}
                                                className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor="jobseeker" className="text-gray-700 cursor-pointer font-medium">
                                                Job Seeker
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="employer"
                                                name="role"
                                                value="employer"
                                                checked={selectedRole === 'employer'}
                                                onChange={(e) => setSelectedRole(e.target.value as 'employer')}
                                                className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor="employer" className="text-gray-700 cursor-pointer font-medium">
                                                Employer
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <Button
                                    onClick={handleInquire}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
                                >
                                    Inquire Directly
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                                
                                <p className="text-sm text-gray-600 text-center">
                                    Prefer form submission?{' '}
                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogTrigger asChild>
                                            <button className="text-blue-600 hover:text-blue-700 font-medium underline">
                                                Click here
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl font-bold text-center text-blue-600">
                                                    Contact Forms
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="mt-4">
                                                <ContactForms />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </p>
                            </CardContent>
                        </Card>
                        {/* Registered Office */}
                        <Card className="rounded-2xl shadow-lg p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <MapPin className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Registered Office</h3>
                                </div>
                                <div className="text-gray-600">
                                    <a 
                                        href="https://maps.app.goo.gl/mqRjPrPCXqfYwNWx5"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        <p>Meydan Grandstand, 6th Floor</p>
                                        <p>Meydan Road, Nad Al Sheba</p>
                                        <p>Dubai, U.A.E</p>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Details */}
                        <Card className="rounded-2xl shadow-lg p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <Phone className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Contact</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Email</p>
                                        <a
                                            href="mailto:info@versaatech.com"
                                            className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                                        >
                                            info@versaatech.com
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                                        <a
                                            href="tel:+254781126819"
                                            className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                                        >
                                            +254 781 126 819
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Business Hours */}
                        <Card className="rounded-2xl shadow-lg p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-orange-100 rounded-full">
                                        <Clock className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Business Hours</h3>
                                </div>
                                <div className="text-gray-600 font-medium">
                                    <p>Monday - Friday</p>
                                    <p>9AM - 5PM</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Kenya Office */}
                        <Card className="rounded-2xl shadow-lg p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-green-100 rounded-full">
                                        <MapPin className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Kenya Office</h3>
                                </div>
                                <div className="text-gray-600">
                                    <a 
                                        href="https://maps.app.goo.gl/vGGmdSy6AnNkeGxGA"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        <p>The Mirage, Tower 2</p>
                                        <p>Floor M1, Unit 7</p>
                                        <p>Nairobi, Kenya</p>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* US Office */}
                        <Card className="rounded-2xl shadow-lg p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-100 rounded-full">
                                        <MapPin className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">US Office</h3>
                                </div>
                                <div className="text-gray-600">
                                    <p>Bloomfield, Michigan, USA</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    )
} 