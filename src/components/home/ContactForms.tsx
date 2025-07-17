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

// Form Data interfaces
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

    // Update form hooks with separate types
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
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
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
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Job Seekers Form */}
            <div>
                <Card className="rounded-2xl shadow-md border-blue-100">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-6">
                            Job Seekers
                        </h3>
                        <form onSubmit={handleSubmitJobSeekers(onSubmitJobSeekers)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="jobSeekersFirstName">
                                        First Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="jobSeekersFirstName"
                                        {...registerJobSeekers("jobSeekersFirstName", { required: true })}
                                        className={errorsJobSeekers.jobSeekersFirstName ? "border-red-500" : ""}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="jobSeekersLastName">
                                        Last Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="jobSeekersLastName"
                                        {...registerJobSeekers("jobSeekersLastName", { required: true })}
                                        className={errorsJobSeekers.jobSeekersLastName ? "border-red-500" : ""}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="jobSeekersEmail">
                                    Email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="jobSeekersEmail"
                                    type="email"
                                    {...registerJobSeekers("jobSeekersEmail", { required: true })}
                                    className={errorsJobSeekers.jobSeekersEmail ? "border-red-500" : ""}
                                />
                            </div>
                            <div>
                                <Label htmlFor="jobSeekersPhone">
                                    Phone <span className="text-gray-400 text-sm">(include country code)</span>
                                </Label>
                                <Input
                                    id="jobSeekersPhone"
                                    type="tel"
                                    {...registerJobSeekers("jobSeekersPhone")}
                                />
                            </div>
                            <div>
                                <Label htmlFor="jobSeekersMessage">
                                    Message <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="jobSeekersMessage"
                                    {...registerJobSeekers("jobSeekersMessage", { required: true })}
                                    className={`${errorsJobSeekers.jobSeekersMessage ? "border-red-500" : ""} md:min-h-[160px]`}
                                />
                            </div>
                            <div className="flex items-center space-x-2 mt-4">
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
                                    aria-label="Job Seekers Privacy Policy Checkbox"
                                />
                                <label
                                    htmlFor="jobSeekersPrivacyCheckbox"
                                    className={`text-sm font-medium leading-none ${
                                        errorsJobSeekers.jobSeekersPrivacy ? "text-red-500" : "text-gray-700"
                                    }`}
                                >
                                    I have read and agree to the{' '}
                                    <Link href="/privacy" className="text-blue-600 hover:underline">
                                        Privacy Policy <span className="text-red-500">*</span>
                                    </Link>
                                </label>
                            </div>
                            {errorsJobSeekers.jobSeekersPrivacy && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errorsJobSeekers.jobSeekersPrivacy.message?.toString()}
                                </p>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 mt-4"
                                disabled={!isValidJobSeekers || isLoadingJobSeekers}
                            >
                                {isLoadingJobSeekers ? "Sending..." : "Send Enquiry"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Employers Form */}
            <div>
                <Card className="rounded-2xl shadow-md border-green-100">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent mb-6">
                            Employers
                        </h3>
                        <form onSubmit={handleSubmitEmployers(onSubmitEmployers)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="employersFirstName">
                                        First Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="employersFirstName"
                                        {...registerEmployers("employersFirstName", { required: true })}
                                        className={errorsEmployers.employersFirstName ? "border-red-500" : ""}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="employersLastName">
                                        Last Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="employersLastName"
                                        {...registerEmployers("employersLastName", { required: true })}
                                        className={errorsEmployers.employersLastName ? "border-red-500" : ""}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="employersOrganization">
                                    Organization <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="employersOrganization"
                                    {...registerEmployers("employersOrganization", { required: true })}
                                    className={errorsEmployers.employersOrganization ? "border-red-500" : ""}
                                />
                            </div>
                            <div>
                                <Label htmlFor="employersEmail">
                                    Email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="employersEmail"
                                    type="email"
                                    {...registerEmployers("employersEmail", { required: true })}
                                    className={errorsEmployers.employersEmail ? "border-red-500" : ""}
                                />
                            </div>
                            <div>
                                <Label htmlFor="employersPhone">
                                    Phone <span className="text-gray-400 text-sm">(include country code)</span>
                                </Label>
                                <Input
                                    id="employersPhone"
                                    type="tel"
                                    {...registerEmployers("employersPhone")}
                                />
                            </div>
                            <div>
                                <Label htmlFor="employersMessage">
                                    Message <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="employersMessage"
                                    {...registerEmployers("employersMessage", { required: true })}
                                    className={errorsEmployers.employersMessage ? "border-red-500" : ""}
                                />
                            </div>
                            <div className="flex items-center space-x-2 mt-4">
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
                                    aria-label="Employers Privacy Policy Checkbox"
                                />
                                <label
                                    htmlFor="employersPrivacyCheckbox"
                                    className={`text-sm font-medium leading-none ${
                                        errorsEmployers.employersPrivacy ? "text-red-500" : "text-gray-700"
                                    }`}
                                >
                                    I have read and agree to the{' '}
                                    <Link href="/privacy" className="text-green-600 hover:underline">
                                        Privacy Policy <span className="text-red-500">*</span>
                                    </Link>
                                </label>
                            </div>
                            {errorsEmployers.employersPrivacy && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errorsEmployers.employersPrivacy.message?.toString()}
                                </p>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 mt-4"
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