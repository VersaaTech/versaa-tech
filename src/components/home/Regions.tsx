"use client"

import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] bg-muted/30 rounded-xl border border-border flex items-center justify-center">
      <div className="text-muted-foreground text-sm">Loading map...</div>
    </div>
  )
})

const regions = [
  { flag: "🌍", label: "Africa" },
  { flag: "🇸🇦", label: "Middle East" },
  { flag: "🇮🇳", label: "India" },
  { flag: "🇺🇸", label: "USA" },
]

export function Regions() {
  return (
    <section className="py-16 px-4 md:px-8 bg-muted/30">

      {/* Header */}
      <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
        Where we operate
      </p>
      <h2 className="text-3xl font-bold font-display text-foreground mb-3">
        Regions We Serve
      </h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        With offices in Nairobi and Dubai, we place talent and support organizations across Africa, the Middle East, India, and the USA.
      </p>

      {/* Region Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {regions.map((region) => (
          <span
            key={region.label}
            className="inline-flex items-center gap-2 bg-background border border-border text-foreground text-xs font-medium px-3 py-1.5 rounded-full"
          >
            <span>{region.flag}</span>
            {region.label}
          </span>
        ))}
      </div>

      {/* Map */}
      <div className="w-full max-w-5xl relative z-0">
        <LeafletMap />
      </div>

    </section>
  )
}
