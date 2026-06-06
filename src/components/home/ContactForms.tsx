'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import Link from 'next/link'
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from 'react'
import { toast } from 'sonner'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

interface JobSeekersFormData {
    jobSeekersFirstName: string;
    jobSeekersLastName: string;
    jobSeekersEmail: string;
    jobSeekersPhone?: string;
    jobSeekersMessage: string;
    jobSeekersPrivacy: boolean;
}

interface EmployersFormData {
    employersFirstName: string;
    employersLastName: string;
    employersOrganization: string;
    employersEmail: string;
    employersPhone?: string;
    employersMessage: string;
    employersPrivacy: boolean;
}

export function ContactForms() {
    const [isLoadingJobSeekers, setIsLoadingJobSeekers] = useState(false);
    const [isLoadingEmployers, setIsLoadingEmployers] = useState(false);

    const {
        register: registerJobSeekers,
        handleSubmit: handleSubmitJobSeekers,
        formState: { errors: errorsJobSeekers, isValid: isValidJobSeekers },
        setValue: setValueJobSeekers
    } = useForm<JobSeekersFormData>({ mode: 'onChange' });

    const {
        register: registerEmployers,
        handleSubmit: handleSubmitEmployers,
        formState: { errors: errorsEmployers, isValid: isValidEmployers },
        setValue: setValueEmployers
    } = useForm<EmployersFormData>({ mode: 'onChange' });

    const onSubmitJobSeekers = async (data: JobSeekersFormData) => {
        try {
            setIsLoadingJobSeekers(true);
            const formData = {
                ...data,
                access_key: "b1f9505c-237c-42b3-aacb-bcde90f8b2ea",
                from_name: `${data.jobSeekersFirstName} ${data.jobSeekersLastName}`,
                subject: "New Job Seeker Contact Form Submission",
                form_type: "job_seeker"
            };
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.success) {
                toast.success("Thank you for your submission! We'll be in touch soon.");
            } else {
                throw new Error("Submission failed");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
            console.error(error);
        } finally {
            setIsLoadingJobSeekers(false);
        }
    };

    const onSubmitEmployers = async (data: EmployersFormData) => {
        try {
            setIsLoadingEmployers(true);
            const formData = {
                ...data,
                access_key: "b1f9505c-237c-42b3-aacb-bcde90f8b2ea",
                from_name: `${data.employersFirstName} ${data.employersLastName}`,
                subject: "New Employer Contact Form Submission",
                form_type: "employer"
            };
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.success) {
                toast.success("Thank you for your submission! We'll be in touch soon.");
            } else {
                throw new Error("Submission failed");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
            console.error(error);
        } finally {
            setIsLoadingEmployers(false);
        }
    };

    return (
        <div className="space-y-10">

            {/* Contact Info Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="bg-muted/30 rounded-xl border border-border p-5 flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1 font-medium">Email</p>
                        <a href="mailto:info@versaatech.com" className="text-sm font-semibold text-blue-600 hover:underline">
                            info@versaatech.com
                        </a>
                    </div>
                </div>

                <div className="bg-muted/30 rounded-xl border border-border p-5 flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1 font-medium">Phone</p>
                        <a href="tel:+254781126819" className="text-sm font-semibold text-blue-600 hover:underline">
                            +254 781 126 819
                        </a>
                    </div>
                </div>

                <div className="bg-muted/30 rounded-xl border border-border p-5 flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1 font-medium">Nairobi Office</p>
                        <p className="text-sm text-foreground leading-relaxed">
                            The Mirage, Tower 2<br />
                            Floor M1, Unit 7
                        </p>
                    </div>
                </div>

                <div className="bg-muted/30 rounded-xl border border-border p-5 flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1 font-medium">Dubai Office</p>
                        <p className="text-sm text-foreground leading-relaxed">
                            Meydan Grandstand, 6th Floor<br />
                            Meydan Road, Dubai
                        </p>
                    </div>
                </div>

            </div>

            {/* Business Hours */}
            <div className="flex items-center gap-3 bg-muted/30 rounded-xl border border-border px-5 py-4">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Business Hours: </span>
                    Monday – Friday: 8AM – 5PM &nbsp;|&nbsp; Saturday: 8AM – 1PM
                </p>
            </div>

            {/* Forms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Job Seekers Form */}
                <Card className="rounded-2xl border border-border shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-lg">
                                🔍
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Job Seekers</h3>
                                <p className="text-xs text-muted-foreground">Looking for your next opportunity?</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmitJobSeekers(onSubmitJobSeekers)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="jobSeekersFirstName">First Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="jobSeekersFirstName"
                                        {...registerJobSeekers("jobSeekersFirstName", { required: true })}
                                        className={errorsJobSeekers.jobSeekersFirstName ? "border-red-500" : ""}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="jobSeekersLastName">Last Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="jobSeekersLastName"
                                        {...registerJobSeekers("jobSeekersLastName", { required: true })}
                                        className={errorsJobSeekers.jobSeekersLastName ? "border-red-500" : ""}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="jobSeekersEmail">Email <span className="text-red-500">*</span></Label>
                                <Input
                                    id="jobSeekersEmail"
                                    type="email"
                                    {...registerJobSeekers("jobSeekersEmail", { required: true })}
                                    className={errorsJobSeekers.jobSeekersEmail ? "border-red-500" : ""}
                                />
                            </div>
                            <div>
                                <Label htmlFor="jobSeekersPhone">Phone <span className="text-xs text-muted-foreground">(include country code)</span></Label>
                                <Input
                                    id="jobSeekersPhone"
                                    type="tel"
                                    {...registerJobSeekers("jobSeekersPhone")}
                                />
                            </div>
                            <div>
                                <Label htmlFor="jobSeekersMessage">Message <span className="text-red-500">*</span></Label>
                                <Textarea
                                    id="jobSeekersMessage"
                                    {...registerJobSeekers("jobSeekersMessage", { required: true })}
                                    className={`${errorsJobSeekers.jobSeekersMessage ? "border-red-500" : ""} min-h-[120px]`}
                                />
                            </div>
                            <div className="flex items-start gap-2">
                                <Checkbox
                                    id="jobSeekersPrivacyCheckbox"
                                    {...registerJobSeekers("jobSeekersPrivacy", {
                                        required: "You must accept the privacy policy to continue",
                                        validate: (value) => value === true || "You must accept the privacy policy"
                                    })}
                                    onCheckedChange={(checked) => {
                                        setValueJobSeekers("jobSeekersPrivacy", checked === true, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="jobSeekersPrivacyCheckbox"
                                    className={`text-xs leading-relaxed ${errorsJobSeekers.jobSeekersPrivacy ? "text-red-500" : "text-muted-foreground"}`}
                                >
                                    I have read and agree to the{' '}
                                    <Link href="/privacy" className="text-blue-600 hover:underline">
                                        Privacy Policy
                                    </Link>
                                    <span className="text-red-500"> *</span>
                                </label>
                            </div>
                            {errorsJobSeekers.jobSeekersPrivacy && (
                                <p className="text-xs text-red-500">{errorsJobSeekers.jobSeekersPrivacy.message?.toString()}</p>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                                disabled={!isValidJobSeekers || isLoadingJobSeekers}
                            >
                                {isLoadingJobSeekers ? "Sending..." : "Send Enquiry"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Employers Form */}
                <Card className="rounded-2xl border border-border shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-lg">
                                🏢
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Employers</h3>
                                <p className="text-xs text-muted-foreground">Looking to hire the right talent?</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmitEmployers(onSubmitEmployers)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="employersFirstName">First Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="employersFirstName"
                                        {...registerEmployers("employersFirstName", { required: true })}
                                        className={errorsEmployers.employersFirstName ? "border-red-500" : ""}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="employersLastName">Last Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="employersLastName"
                                        {...registerEmployers("employersLastName", { required: true })}
                                        className={errorsEmployers.employersLastName ? "border-red-500" : ""}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="employersOrganization">Organization <span className="text-red-500">*</span></Label>
                                <Input
                                    id="employersOrganization"
                                    {...registerEmployers("employersOrganization", { required: true })}
                                    className={errorsEmployers.employersOrganization ? "border-red-500" : ""}
                                />
                            </div>
                            <div>
                                <Label htmlFor="employersEmail">Email <span className="text-red-500">*</span></Label>
                                <Input
                                    id="employersEmail"
                                    type="email"
                                    {...registerEmployers("employersEmail", { required: true })}
                                    className={errorsEmployers.employersEmail ? "border-red-500" : ""}
                                />
                            </div>
                            <div>
                                <Label htmlFor="employersPhone">Phone <span className="text-xs text-muted-foreground">(include country code)</span></Label>
                                <Input
                                    id="employersPhone"
                                    type="tel"
                                    {...registerEmployers("employersPhone")}
                                />
                            </div>
                            <div>
                                <Label htmlFor="employersMessage">Message <span className="text-red-500">*</span></Label>
                                <Textarea
                                    id="employersMessage"
                                    {...registerEmployers("employersMessage", { required: true })}
                                    className={`${errorsEmployers.employersMessage ? "border-red-500" : ""} min-h-[120px]`}
                                />
                            </div>
                            <div className="flex items-start gap-2">
                                <Checkbox
                                    id="employersPrivacyCheckbox"
                                    {...registerEmployers("employersPrivacy", {
                                        required: "You must accept the privacy policy to continue",
                                        validate: (value) => value === true || "You must accept the privacy policy"
                                    })}
                                    onCheckedChange={(checked) => {
                                        setValueEmployers("employersPrivacy", checked === true, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="employersPrivacyCheckbox"
                                    className={`text-xs leading-relaxed ${errorsEmployers.employersPrivacy ? "text-red-500" : "text-muted-foreground"}`}
                                >
                                    I have read and agree to the{' '}
                                    <Link href="/privacy" className="text-blue-600 hover:underline">
                                        Privacy Policy
                                    </Link>
                                    <span className="text-red-500"> *</span>
                                </label>
                            </div>
                            {errorsEmployers.employersPrivacy && (
                                <p className="text-xs text-red-500">{errorsEmployers.employersPrivacy.message?.toString()}</p>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                                disabled={!isValidEmployers || isLoadingEmployers}
                            >
                                {isLoadingEmployers ? "Sending..." : "Send Enquiry"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
