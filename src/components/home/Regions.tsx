"use client"

import dynamic from 'next/dynamic'

// Dynamically import leaflet to avoid SSR issues
const LeafletMap = dynamic(() => import('./LeafletMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-gray-500">Loading map...</div>
        </div>
    )
})

export function Regions() {
    return (
        <div className="container mx-auto px-4">
            <div>
                <h2 className="text-3xl font-bold font-display text-foreground mb-4 text-center">
                    Regions We Serve
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto text-center mb-8">
                    As a global HR consulting and international recruitment firm, Versaatech delivers human capital solutions across six continents. With established offices in Dubai (UAE) and Nairobi (Kenya), we provide strategic talent acquisition and HR services throughout the Americas, Europe, Middle East, Africa, and Asia-Pacific regions. Our local expertise combined with global reach enables us to source exceptional talent and implement effective workforce strategies for organizations operating in diverse markets and regulatory environments.
                </p>
                <div className="w-full max-w-5xl mx-auto relative z-0">
                    <LeafletMap />
                </div>
            </div>
        </div>
    )
}
