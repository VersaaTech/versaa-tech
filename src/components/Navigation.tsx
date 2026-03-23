"use client"

import React from "react"
import Link from "next/link"
import { LayoutGrid, Building2, Lightbulb, Info, Users, ChevronDown, Building, Phone, Briefcase, Search, UserCheck, Banknote, UserCog, Settings, BarChart3, Layers } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { MobileMenu } from "./MobileMenu"


export const navItems = [
    { title: "Overview", href: "/#overview", icon: LayoutGrid },
    { title: "Industries", href: "/#industries", icon: Building2 },
    { title: "How We Work", href: "/#differentiators", icon: Lightbulb },
    { title: "Jobs", href: "/jobs", icon: Briefcase },
    { title: "Contact", href: "/contact", icon: Phone },
]

export const serviceItems = [
    { title: "Executive Search", href: "/executive-search", icon: Search },
    { title: "RPO Recruitment", href: "/rpo-recruitment", icon: UserCheck },
    { title: "Payroll Management", href: "/payroll-management", icon: Banknote },
    { title: "Fractional HR Services", href: "/fractional-hr-services", icon: UserCog },
    { title: "HR Process Outsourcing", href: "/hr-process-outsourcing", icon: Settings },
    { title: "Industry Benchmarking", href: "/industry-benchmarking", icon: BarChart3 },
]

export const aboutItems = [
    { title: "About Versaatech", href: "/#about", icon: Building },
    { title: "Leadership", href: "/#about-leadership", icon: Users },
]

export function Navigation() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 h-24 md:h-28">
            <div className="px-4 md:px-6 flex items-center h-full">
                <nav className="flex items-center justify-between w-full h-full">
                    <Link href="/" className="flex items-center h-full">
                        <Image
                            src="/images/ProRecruit-Versaatech-Logo.svg"
                            alt="Versaatech Logo"
                            width={90}
                            height={90}
                            className="dark:invert object-contain h-full w-auto"
                            priority
                        />
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="text-sm font-medium text-black hover:opacity-80 flex items-center gap-2 relative group"
                            >
                                {React.createElement(item.icon, {
                                    size: 16,
                                    className: "stroke-black"
                                })}
                                <span className="relative z-10">{item.title}</span>
                                <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={`text-sm font-medium transition-opacity flex items-center gap-2 p-0 h-auto bg-transparent hover:bg-transparent hover:text-black hover:opacity-80 text-black`}
                                >
                                    <Layers className="stroke-black" size={16} />
                                    Services
                                    <ChevronDown className="stroke-black" size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                {serviceItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className="w-full"
                                    >
                                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer relative group">
                                            {React.createElement(item.icon, {
                                                size: 16,
                                                className: "stroke-black"
                                            })}
                                            <span className="text-black group-hover:opacity-80 transition-opacity relative z-10">
                                                {item.title}
                                            </span>
                                            <span className="absolute bottom-[0px] left-0 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                        </DropdownMenuItem>
                                    </Link>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={`text-sm font-medium transition-opacity flex items-center gap-2 p-0 h-auto bg-transparent hover:bg-transparent hover:text-black hover:opacity-80 text-black`}
                                >
                                    <Info className="stroke-black" size={16} />
                                    About
                                    <ChevronDown className="stroke-black" size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {aboutItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className="w-full"
                                    >
                                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer relative group">
                                            {React.createElement(item.icon, {
                                                size: 16,
                                                className: "stroke-black"
                                            })}
                                            <span className="text-black group-hover:opacity-80 transition-opacity relative z-10">
                                                {item.title}
                                            </span>
                                            <span className="absolute bottom-[0px] left-0 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                        </DropdownMenuItem>
                                    </Link>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <MobileMenu />
                </nav>
            </div>
        </header>
    )
}
