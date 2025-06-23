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
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-8 text-center">
                    Regions We Serve
                </h2>
                <div className="w-full max-w-5xl mx-auto relative z-0">
                    <LeafletMap />
                </div>
            </div>
        </div>
    )
}
