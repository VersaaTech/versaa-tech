"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Define our target countries for each region
const targetRegions = {
    EastAfrica: [
        'Burundi', 'Comoros', 'Djibouti', 'Ethiopia', 'Eritrea', 'Kenya', 
        'Rwanda', 'Seychelles', 'Somalia', 'South Sudan', 'Sudan', 
        'Tanzania', 'Uganda'
    ],
    MiddleEast: [
        'Turkey', 'Cyprus', 'Syria', 'Lebanon', 'Iraq', 'Iran', 'Israel', 
        'Jordan', 'Egypt', 'Saudi Arabia', 'Kuwait', 'Oman', 'Bahrain', 
        'Qatar', 'United Arab Emirates', 'UAE', 'Yemen', 'Afghanistan', 
        'Armenia'
    ],
    USA: ['United States of America', 'United States'],
    Mexico: ['Mexico']
}

// Function to determine which region a country belongs to
const getCountryRegion = (countryName: string): string | null => {
    if (!countryName) return null
    
    const normalizedCountryName = countryName.toLowerCase().trim()
    
    for (const [region, countries] of Object.entries(targetRegions)) {
        if (countries.some(country => {
            const normalizedTarget = country.toLowerCase().trim()
            
            // Exact match first
            if (normalizedCountryName === normalizedTarget) {
                return true
            }
            
            // Handle common variations
            if (normalizedTarget === 'united states of america' || normalizedTarget === 'united states') {
                return normalizedCountryName === 'united states of america' || 
                       normalizedCountryName === 'united states' ||
                       normalizedCountryName === 'usa'
            }
            
            if (normalizedTarget === 'united arab emirates' || normalizedTarget === 'uae') {
                return normalizedCountryName === 'united arab emirates' || 
                       normalizedCountryName === 'uae'
            }
            
            // Handle South Sudan specifically
            if (normalizedTarget === 'south sudan') {
                return normalizedCountryName === 'south sudan'
            }
            
            // Handle Sudan (but not South Sudan)
            if (normalizedTarget === 'sudan') {
                return normalizedCountryName === 'sudan' && !normalizedCountryName.includes('south')
            }
            
            // For other countries, only match if the country name exactly matches or 
            // the GeoJSON name contains the full target country name as a word boundary
            const words = normalizedCountryName.split(/\s+/)
            const targetWords = normalizedTarget.split(/\s+/)
            
            // Check if all target words are found in the country name
            return targetWords.every(targetWord => 
                words.some(word => word === targetWord)
            )
        })) {
            return region
        }
    }
    return null
}

// Style functions for different states
const getDefaultStyle = () => ({
    fillColor: '#e5e7eb',
    weight: 1,
    opacity: 0.5,
    color: '#d1d5db',
    fillOpacity: 0.2
})

const getHighlightedStyle = () => ({
    fillColor: '#3b82f6',
    weight: 2,
    opacity: 1,
    color: '#1d4ed8',
    fillOpacity: 0.5
})

const getHoverStyle = () => ({
    fillColor: '#1d4ed8',
    weight: 3,
    opacity: 1,
    color: '#1e40af',
    fillOpacity: 0.7
})

const LeafletMap = () => {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<L.Map | null>(null)
    const geoJsonLayerRef = useRef<L.GeoJSON | null>(null)

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return

        // Initialize map
        const map = L.map(mapRef.current, {
            center: [10, 0],
            zoom: 2,
            minZoom: 2,
            maxZoom: 8,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            dragging: true,
            touchZoom: true
        })

        mapInstanceRef.current = map

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 8,
            className: 'map-tiles'
        }).addTo(map)

        // Load GeoJSON country data
        const loadCountryBoundaries = async () => {
            try {
                // Ensure map is fully ready before proceeding
                if (!mapInstanceRef.current || !mapRef.current) {
                    console.warn('Map not ready, skipping GeoJSON load')
                    return
                }

                console.log('Loading country boundaries...')
                
                // Using a reliable GeoJSON source for world countries
                const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const geoJsonData = await response.json()
                console.log('GeoJSON data loaded successfully')

                // Double-check map is still available
                if (!mapInstanceRef.current) {
                    console.warn('Map instance no longer available')
                    return
                }

                // Create GeoJSON layer with proper styling and interactions
                const geoJsonLayer = L.geoJSON(geoJsonData, {
                    style: (feature) => {
                        const countryName = feature?.properties?.NAME || feature?.properties?.name || ''
                        const region = getCountryRegion(countryName)
                        
                        return region ? getHighlightedStyle() : getDefaultStyle()
                    },
                    onEachFeature: (feature, layer) => {
                        const countryName = feature?.properties?.NAME || feature?.properties?.name || 'Unknown'
                        const region = getCountryRegion(countryName)

                        // Add popup with country information
                        layer.bindPopup(`
                            <div class="p-3">
                                <h3 class="font-bold text-lg text-gray-800">${countryName}</h3>
                                ${region ? 
                                    `<p class="text-blue-600 font-medium mt-1">Region: ${region.replace(/([A-Z])/g, ' $1').trim()}</p>` : 
                                    '<p class="text-gray-500 mt-1">Not in our active regions</p>'
                                }
                            </div>
                        `, {
                            closeButton: true,
                            className: 'custom-popup'
                        })

                        // Add interactive effects only for highlighted countries
                        if (region) {
                            layer.on({
                                mouseover: (e) => {
                                    const targetLayer = e.target as L.Path
                                    targetLayer.setStyle(getHoverStyle())
                                    
                                    // Bring to front for better visibility
                                    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                                        targetLayer.bringToFront()
                                    }
                                },
                                mouseout: (e) => {
                                    const targetLayer = e.target as L.Path
                                    targetLayer.setStyle(getHighlightedStyle())
                                },
                                click: (e) => {
                                    const targetLayer = e.target as any
                                    if (targetLayer.getBounds) {
                                        mapInstanceRef.current?.fitBounds(targetLayer.getBounds(), {
                                            padding: [30, 30],
                                            maxZoom: 6
                                        })
                                    }
                                }
                            })
                        }
                    }
                })

                // Add layer to map with additional safety checks
                if (mapInstanceRef.current && geoJsonLayer) {
                    geoJsonLayer.addTo(mapInstanceRef.current)
                }

                geoJsonLayerRef.current = geoJsonLayer

                // Calculate bounds for all highlighted regions and fit map
                const highlightedBounds = L.latLngBounds([])
                let hasHighlightedCountries = false

                geoJsonLayer.eachLayer((layer) => {
                    const feature = (layer as any).feature
                    const countryName = feature?.properties?.NAME || feature?.properties?.name || ''
                    const region = getCountryRegion(countryName)
                    
                    if (region && (layer as any).getBounds) {
                        highlightedBounds.extend((layer as any).getBounds())
                        hasHighlightedCountries = true
                    }
                })

                // Fit map to show all highlighted regions
                if (hasHighlightedCountries && highlightedBounds.isValid() && mapInstanceRef.current) {
                    setTimeout(() => {
                        mapInstanceRef.current?.fitBounds(highlightedBounds, { 
                            padding: [50, 50],
                            maxZoom: 3
                        })
                    }, 500)
                }

                console.log('Country boundaries loaded and styled successfully')

            } catch (error) {
                console.error('Error loading country boundaries:', error)
                
                // Show error message on map
                if (mapInstanceRef.current) {
                    const errorPopup = L.popup()
                        .setLatLng([0, 0])
                        .setContent(`
                            <div class="p-4 text-center">
                                <p class="text-red-500 font-medium">Unable to load country boundaries</p>
                                <p class="text-sm text-gray-600 mt-2">Please check your internet connection and try again</p>
                            </div>
                        `)
                        .openOn(mapInstanceRef.current)
                }
            }
        }

        // Load the country boundaries after map is ready
        map.whenReady(() => {
            loadCountryBoundaries()
        })

        // Add custom CSS for better styling
        const style = document.createElement('style')
        style.textContent = `
            .leaflet-container {
                border-radius: 12px;
                font-family: inherit;
                background: #f8fafc;
            }
            .leaflet-popup-content-wrapper {
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border: none;
            }
            .leaflet-popup-tip {
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .custom-popup .leaflet-popup-content {
                margin: 0;
                min-width: 200px;
            }
            .map-tiles {
                filter: grayscale(10%) brightness(1.05);
            }
            .leaflet-control-zoom {
                border: none !important;
                border-radius: 8px !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
            }
            .leaflet-control-zoom a {
                border-radius: 6px !important;
                color: #374151 !important;
                border: none !important;
                font-weight: bold;
            }
            .leaflet-control-zoom a:hover {
                background-color: #f3f4f6 !important;
                color: #1f2937 !important;
            }
            .leaflet-control-attribution {
                background: rgba(255, 255, 255, 0.8) !important;
                border-radius: 4px !important;
                font-size: 10px !important;
            }
        `
        
        // Safely append style to document head with null check
        if (typeof document !== 'undefined' && document.head) {
            document.head.appendChild(style)
        }

        // Cleanup function
        return () => {
            // Safely remove style from document head with null checks
            if (typeof document !== 'undefined' && document.head && style && document.head.contains(style)) {
                document.head.removeChild(style)
            }
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
            }
        }
    }, [])

    return (
        <div className="w-full">
            <div 
                ref={mapRef} 
                className="w-full h-[400px] md:h-[500px] rounded-lg shadow-sm border border-gray-200"
                style={{ background: '#f8fafc', minHeight: '400px' }}
            />
            
            {/* Legend and instructions */}
            <div className="mt-4 text-center text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-4 mb-2">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded border border-blue-600 opacity-60"></div>
                        <span>Active Regions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-300 rounded border border-gray-400 opacity-60"></div>
                        <span>Other Countries</span>
                    </div>
                </div>
                <p className="text-xs text-gray-500">
                    Hover over highlighted countries for details • Click to zoom in
                </p>
            </div>
        </div>
    )
}

export default LeafletMap 