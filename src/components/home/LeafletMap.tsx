"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'

// TypeScript interfaces for GeoJSON structure
interface GeoJSONProperties {
    NAME?: string
    name?: string
    [key: string]: string | number | boolean | null | undefined
}

interface GeoJSONGeometry {
    type: string
    coordinates: number[][][] | number[][][][] | number[]
}

interface GeoJSONFeature {
    type: 'Feature'
    properties: GeoJSONProperties
    geometry: GeoJSONGeometry
}

interface GeoJSONData {
    type: 'FeatureCollection'
    features: GeoJSONFeature[]
}

interface ProcessCountriesResult {
    highlightedFeatures: GeoJSONFeature[]
    regularFeatures: GeoJSONFeature[]
}

// Define our target countries for each region
const targetRegions = {
    EastAfrica: [
        'Burundi', 'Comoros', 'Djibouti', 'Ethiopia', 'Eritrea', 'Kenya', 
        'Rwanda', 'Seychelles', 'Somalia', 'South Sudan', 'Sudan', 
        'Tanzania', 'Uganda'
    ],
    MiddleEast: [
        'Turkey', 'Cyprus', 'Israel', 'Jordan', 'Egypt', 'Saudi Arabia', 
        'Kuwait', 'Oman', 'Bahrain', 'Qatar', 'United Arab Emirates'
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

// Performance-optimized processing function
const processCountriesInChunks = async (
    features: GeoJSONFeature[], 
    chunkSize: number = 50,
    onChunkProcessed?: (processedCount: number, totalCount: number) => void
): Promise<ProcessCountriesResult> => {
    const highlightedFeatures: GeoJSONFeature[] = []
    const regularFeatures: GeoJSONFeature[] = []
    
    for (let i = 0; i < features.length; i += chunkSize) {
        const chunk = features.slice(i, i + chunkSize)
        
        // Process chunk asynchronously
        await new Promise<void>((resolve) => {
            // Use requestAnimationFrame for smooth processing
            requestAnimationFrame(() => {
                chunk.forEach(feature => {
                    const countryName = feature?.properties?.NAME || feature?.properties?.name || ''
                    const region = getCountryRegion(countryName)
                    
                    if (region) {
                        highlightedFeatures.push(feature)
                    } else {
                        regularFeatures.push(feature)
                    }
                })
                
                // Report progress
                onChunkProcessed?.(Math.min(i + chunkSize, features.length), features.length)
                resolve()
            })
        })
        
        // Small delay to prevent blocking the main thread
        if (i + chunkSize < features.length) {
            await new Promise(resolve => setTimeout(resolve, 1))
        }
    }
    
    return { highlightedFeatures, regularFeatures }
}

const LeafletMap = () => {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<L.Map | null>(null)
    const geoJsonLayerRef = useRef<L.GeoJSON | null>(null)
    const [isMapVisible, setIsMapVisible] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [loadingStage, setLoadingStage] = useState<'idle' | 'downloading' | 'processing' | 'rendering' | 'complete'>('idle')

    // Intersection Observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isMapVisible) {
                        setIsMapVisible(true)
                    }
                })
            },
            {
                rootMargin: '100px' // Start loading when map is 100px from viewport
            }
        )

        const currentMapRef = mapRef.current
        if (currentMapRef) {
            observer.observe(currentMapRef)
        }

        return () => {
            if (currentMapRef) {
                observer.unobserve(currentMapRef)
            }
        }
    }, [isMapVisible])

    // Optimized GeoJSON loading function
    const loadCountryBoundaries = useCallback(async () => {
        if (!mapInstanceRef.current || !mapRef.current) {
            console.warn('Map not ready, skipping GeoJSON load')
            return
        }

        try {
            setLoadingStage('downloading')
            setLoadingProgress(0)
            
            console.log('Loading country boundaries...')
            
            // Using fetch with streaming support for large files
            const response = await fetch('/world.geojson')
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Stream the response for better memory usage
            const geoJsonData: GeoJSONData = await response.json()
            console.log('GeoJSON data loaded successfully')
            
            setLoadingStage('processing')
            setLoadingProgress(25)

            // Double-check map is still available
            if (!mapInstanceRef.current) {
                console.warn('Map instance no longer available')
                return
            }

            // Process countries in chunks for better performance
            const { highlightedFeatures, regularFeatures } = await processCountriesInChunks(
                geoJsonData.features,
                30, // Smaller chunk size for smoother processing
                (processed, total) => {
                    setLoadingProgress(25 + (processed / total) * 50) // 25-75% for processing
                }
            )

            setLoadingStage('rendering')
            setLoadingProgress(75)

            // Create separate layers for highlighted and regular countries for better performance
            const createCountryLayer = (features: GeoJSONFeature[], isHighlighted: boolean) => {
                const featureCollection: GeoJSONData = {
                    type: 'FeatureCollection',
                    features: features
                }
                return L.geoJSON(featureCollection, {
                    style: () => isHighlighted ? getHighlightedStyle() : getDefaultStyle(),
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
                        if (isHighlighted && region) {
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
                                    const targetLayer = e.target as L.Layer & { getBounds?: () => L.LatLngBounds }
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
            }

            // Add regular countries first (they'll be in the background)
            const regularLayer = createCountryLayer(regularFeatures, false)
            const highlightedLayer = createCountryLayer(highlightedFeatures, true)

            // Add layers to map with staggered rendering for smoother experience
            if (mapInstanceRef.current) {
                regularLayer.addTo(mapInstanceRef.current)
                
                // Small delay before adding highlighted countries for smoother rendering
                setTimeout(() => {
                    if (mapInstanceRef.current) {
                        highlightedLayer.addTo(mapInstanceRef.current)
                        geoJsonLayerRef.current = highlightedLayer // Store reference to highlighted layer
                    }
                }, 50)
            }

            setLoadingProgress(90)

            // Calculate bounds for highlighted regions and fit map
            const calculateBoundsAsync = async () => {
                const highlightedBounds = L.latLngBounds([])
                let hasHighlightedCountries = false

                return new Promise<void>((resolve) => {
                    requestAnimationFrame(() => {
                        highlightedLayer.eachLayer((layer) => {
                            const layerWithBounds = layer as L.Layer & { getBounds?: () => L.LatLngBounds }
                            if (layerWithBounds.getBounds) {
                                highlightedBounds.extend(layerWithBounds.getBounds())
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
                            }, 100)
                        }
                        
                        resolve()
                    })
                })
            }

            await calculateBoundsAsync()
            
            setLoadingProgress(100)
            setLoadingStage('complete')
            
            // Hide loading indicator after a short delay
            setTimeout(() => {
                setLoadingStage('idle')
            }, 1000)

            console.log('Country boundaries loaded and styled successfully')

        } catch (error) {
            console.error('Error loading country boundaries:', error)
            setLoadingStage('idle')
            
            // Show error message on map
            if (mapInstanceRef.current) {
                L.popup()
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
    }, [])

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current || !isMapVisible) return

        // Load Leaflet CSS dynamically when map becomes visible
        const loadLeafletCSS = () => {
            if (!document.querySelector('link[href*="leaflet.css"]')) {
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
                link.crossOrigin = ''
                document.head.appendChild(link)
            }
        }
        
        loadLeafletCSS()

        // Initialize map only when visible
        const map = L.map(mapRef.current, {
            center: [10, 0],
            zoom: 2,
            minZoom: 2,
            maxZoom: 8,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            dragging: true,
            touchZoom: true,
            // Optimize rendering
            preferCanvas: true,
            renderer: L.canvas({ padding: 0.5 })
        })

        mapInstanceRef.current = map

        // Add tile layer with lazy loading optimizations
        const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 8,
            className: 'map-tiles',
            // Performance optimizations
            keepBuffer: 2, // Reduce tile buffer to minimize offscreen loading
            updateWhenZooming: false, // Don't update during zoom animation
            updateWhenIdle: true, // Only update when map is idle
            // Add loading attribute for better performance
            crossOrigin: 'anonymous'
        })

        // Add custom loading optimization
        tileLayer.on('loading', () => {
            // Optional: Add loading indicator
        })

        tileLayer.on('load', () => {
            setIsInitialized(true)
        })

        tileLayer.addTo(map)

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
            /* Optimize tile loading */
            .leaflet-tile {
                transition: opacity 0.2s;
            }
            .leaflet-tile-loaded {
                opacity: 1;
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
    }, [isMapVisible, loadCountryBoundaries])

    return (
        <div className="w-full">
            <div 
                ref={mapRef} 
                className="w-full h-[400px] md:h-[500px] rounded-lg shadow-sm border border-gray-200 relative"
                style={{ background: '#f8fafc', minHeight: '400px' }}
            >
                {/* Loading placeholder */}
                {!isMapVisible && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                        <div className="text-center">
                            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p className="text-gray-600 text-sm">Loading interactive map...</p>
                        </div>
                    </div>
                )}
                
                {/* Show loading indicator while tiles are loading */}
                {isMapVisible && !isInitialized && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md z-[1000]">
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                            <span className="text-sm text-gray-600">Loading map data...</span>
                        </div>
                    </div>
                )}

                {/* Enhanced loading indicator for GeoJSON processing */}
                {loadingStage !== 'idle' && loadingStage !== 'complete' && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg z-[1000] min-w-[200px]">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                <span className="text-sm font-medium text-gray-700">
                                    {loadingStage === 'downloading' && 'Downloading map data...'}
                                    {loadingStage === 'processing' && 'Processing countries...'}
                                    {loadingStage === 'rendering' && 'Rendering map...'}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${loadingProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{Math.round(loadingProgress)}%</p>
                        </div>
                    </div>
                )}
            </div>
            
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