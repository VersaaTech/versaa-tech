'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ContactForms } from '@/components/home/ContactForms'

export function ContactFormsDialog() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
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
    )
} 