'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function RoleSelector() {
    const [selectedRole, setSelectedRole] = useState<'jobseeker' | 'employer' | ''>('')

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
        <>
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
        </>
    )
} 