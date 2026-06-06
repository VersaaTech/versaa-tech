"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import type * as LType from 'leaflet'

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

// ✅ UPDATED: Full Africa, Middle East, India, USA
const targetRegions = {
    Africa: [
        'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
        'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros',
        'Democratic Republic of the Congo', 'Republic of Congo', 'Djibouti',
        'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia',
        'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast',
        'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali',
        'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger',
        'Nigeria', 'Rwanda', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia',
        'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia',
        'Uganda', 'Zambia', 'Zimbabwe'
    ],
    MiddleEast: [
        'Israel', 'Jordan', 'Saudi Arabia', 'Kuwait', 'Oman',
        'Bahrain', 'Qatar', 'United Arab Emirates', 'Iraq', 'Lebanon',
        'Syria', 'Yemen'
    ],
    India: ['India'],
    USA: ['United States of America', 'United States'],
}

const getCountryRegion = (countryName: string): string | null => {
    if (!countryName) return null

    const normalizedCountryName = countryName.toLowerCase().trim()

    for (const [region, countries] of Object.entries(targetRegions)) {
        if (countries.some(country => {
            const normalizedTarget = country.toLowerCase().trim()

            if (normalizedCountryName === normalizedTarget) {
                return true
            }

            if (normalizedTarget === 'united states of america' || normalizedTarget === 'united states') {
                return normalizedCountryName === 'united states of america' ||
                    normalizedCountryName === 'united states' ||
                    normalizedCountryName === 'usa'
            }

            if (normalizedTarget === 'united arab emirates' || normalizedTarget === 'uae') {
                return normalizedCountryName === 'united arab emirates' ||
                    normalizedCountryName === 'uae'
            }

            if (normalizedTarget === 'south sudan') {
                return normalizedCountryName === 'south sudan'
            }

            if (normalizedTarget === 'sudan') {
                return normalizedCountryName === 'sudan' && !normalizedCountryName.includes('south')
            }

            const words = normalizedCountryName.split(/\s+/)
            const targetWords = normalizedTarget.split(/\s+/)

            return targetWords.every(targetWord =>
                words.some(word => word === targetWord)
            )
        })) {
            return region
        }
    }
    return null
}

const getDefaultStyle = () => ({
    fillColor: '#e5e7eb',
    weight: 1,
    opacity: 0.5,
    color: '#d1d5db',
    fillOpacity: 0.2
})

const getHighlightedStyle = () => ({
    fillColor: '#374151',
    weight: 2,
    opacity: 1,
    color: '#1f2937',
    fillOpacity: 0.5
})

const getHoverStyle = () => ({
    fillColor: '#1f2937',
    weight: 3,
    opacity: 1,
    color: '#111827',
    fillOpacity: 0.7
})

const processCountriesInChunks = async (
    features: GeoJSONFeature[],
    chunkSize: number = 50,
    onChunkProcessed?: (processedCount: number, totalCount: number) => void
): Promise<ProcessCountriesResult> => {
    const highlightedFeatures: GeoJSONFeature[] = []
    const regularFeatures: GeoJSONFeature[] = []

    for (let i = 0; i < features.length; i += chunkSize) {
        const chunk = features.slice(i, i + chunkSize)

        await new Promise<void>((resolve) => {
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

                onChunkProcessed?.(Math.min(i + chunkSize, features.length), features.length)
                resolve()
            })
        })

        if (i + chunkSize < features.length) {
            await new Promise(resolve => setTimeout(resolve, 1))
        }
    }

    return { highlightedFeatures, regularFeatures }
}

const LeafletMap = () => {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<LType.Map | null>(null)
    const geoJsonLayerRef = useRef<LType.GeoJSON | null>(null)
    const leafletRef = useRef<typeof LType | null>(null)
    const [isMapVisible, setIsMapVisible] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [loadingStage, setLoadingStage] = useState<'idle' | 'downloading' | 'processing' | 'rendering' | 'complete'>('idle')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isMapVisible) {
                        setIsMapVisible(true)
                    }
                })
            },
            { rootMargin: '100px' }
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

    const loadCountryBoundaries = useCallback(async () => {
        const L = leafletRef.current
        if (!mapInstanceRef.current || !mapRef.current || !L) {
            console.warn('Map not ready, skipping GeoJSON load')
            return
        }

        try {
            setLoadingStage('downloading')
            setLoadingProgress(0)

            const response = await fetch('/world.geojson')

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const geoJsonData: GeoJSONData = await response.json()

            setLoadingStage('processing')
            setLoadingProgress(25)

            if (!mapInstanceRef.current) {
                console.warn('Map instance no longer available')
                return
            }

            const { highlightedFeatures, regularFeatures } = await processCountriesInChunks(
                geoJsonData.features,
                30,
                (processed, total) => {
                    setLoadingProgress(25 + (processed / total) * 50)
                }
            )

            setLoadingStage('rendering')
            setLoadingProgress(75)

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

                        if (isHighlighted && region) {
                            layer.on({
                                mouseover: (e) => {
                                    const targetLayer = e.target as LType.Path
                                    targetLayer.setStyle(getHoverStyle())
                                    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                                        targetLayer.bringToFront()
                                    }
                                },
                                mouseout: (e) => {
                                    const targetLayer = e.target as LType.Path
                                    targetLayer.setStyle(getHighlightedStyle())
                                },
                                click: (e) => {
                                    const targetLayer = e.target as LType.Layer & { getBounds?: () => LType.LatLngBounds }
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

            const regularLayer = createCountryLayer(regularFeatures, false)
            const highlightedLayer = createCountryLayer(highlightedFeatures, true)

            if (mapInstanceRef.current) {
                regularLayer.addTo(mapInstanceRef.current)

                setTimeout(() => {
                    if (mapInstanceRef.current) {
                        highlightedLayer.addTo(mapInstanceRef.current)
                        geoJsonLayerRef.current = highlightedLayer
                    }
                }, 50)
            }

            setLoadingProgress(90)

            const calculateBoundsAsync = async () => {
                const highlightedBounds = L.latLngBounds([])
                let hasHighlightedCountries = false

                return new Promise<void>((resolve) => {
                    requestAnimationFrame(() => {
                        highlightedLayer.eachLayer((layer) => {
                            const layerWithBounds = layer as LType.Layer & { getBounds?: () => LType.LatLngBounds }
                            if (layerWithBounds.getBounds) {
                                highlightedBounds.extend(layerWithBounds.getBounds())
                                hasHighlightedCountries = true
                            }
                        })

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

            setTimeout(() => {
                setLoadingStage('idle')
            }, 1000)

        } catch (error) {
            console.error('Error loading country boundaries:', error)
            setLoadingStage('idle')

            const L = leafletRef.current
            if (mapInstanceRef.current && L) {
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
            .leaflet-tile {
                transition: opacity 0.2s;
            }
            .leaflet-tile-loaded {
                opacity: 1;
            }
        `

        if (typeof document !== 'undefined' && document.head) {
            document.head.appendChild(style)
        }

        import('leaflet').then((L) => {
            if (!mapRef.current || mapInstanceRef.current) return

            leafletRef.current = L.default

            // ✅ UPDATED: Better center and zoom to show all 4 regions
            const map = L.default.map(mapRef.current, {
                center: [20, 40],
                zoom: 2,
                minZoom: 2,
                maxZoom: 8,
                zoomControl: true,
                scrollWheelZoom: true,
                doubleClickZoom: true,
                dragging: true,
                touchZoom: true,
                preferCanvas: true,
                renderer: L.default.canvas({ padding: 0.5 })
            })

            mapInstanceRef.current = map

            const tileLayer = L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 8,
                className: 'map-tiles',
                keepBuffer: 2,
                updateWhenZooming: false,
                updateWhenIdle: true,
                crossOrigin: 'anonymous'
            })

            tileLayer.on('load', () => {
                setIsInitialized(true)
            })

            tileLayer.addTo(map)

            map.whenReady(() => {
                loadCountryBoundaries()
            })
        })

        return () => {
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
                {!isMapVisible && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                        <div className="text-center">
                            <div className="animate-spin w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p className="text-gray-600 text-sm">Loading interactive map...</p>
                        </div>
                    </div>
                )}

                {isMapVisible && !isInitialized && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md z-[1000]">
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full"></div>
                            <span className="text-sm text-gray-600">Loading map data...</span>
                        </div>
                    </div>
                )}

                {loadingStage !== 'idle' && loadingStage !== 'complete' && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg z-[1000] min-w-[200px]">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <div className="animate-spin w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full"></div>
                                <span className="text-sm font-medium text-gray-700">
                                    {loadingStage === 'downloading' && 'Downloading map data...'}
                                    {loadingStage === 'processing' && 'Processing countries...'}
                                    {loadingStage === 'rendering' && 'Rendering map...'}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gray-700 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${loadingProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{Math.round(loadingProgress)}%</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-4 mb-2">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-700 rounded border border-gray-800 opacity-60"></div>
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
