'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { navItems, aboutItems } from "./Navigation"
import Image from "next/image"
import { useState } from "react"
import { Menu } from 'lucide-react'
import Link from "next/link";
import React from "react";

export function MobileMenu() {
    const [open, setOpen] = useState(false)

    const handleLinkClick = () => {
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden p-0 hover:bg-transparent" size="icon">
                    <Menu className="h-6 w-6 stroke-black" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <SheetDescription>
                        Access all sections of our website
                    </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-4">
                    <Link href="/" className="flex items-center" onClick={handleLinkClick}>
                        <Image 
                            src="/images/versaatech-logo.png"
                            alt="Versaa Tech Logo"
                            width={90}
                            height={90}
                            className="dark:invert object-contain"
                        />
                    </Link>
                    {[...navItems, ...aboutItems].map((item) => (
                        <div key={item.title} onClick={handleLinkClick}>
                            <Link
                                href={`/${item.href}`}
                                className="text-md font-medium flex items-center gap-2 text-black hover:opacity-90 relative group"
                            >
                                {React.createElement(item.icon, { 
                                    size: 20,
                                    className: "stroke-black"
                                })}
                                <span className="relative z-10">
                                    {item.title}
                                </span>
                                <span className="absolute bottom-[-1px] left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-700 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </div>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
} 