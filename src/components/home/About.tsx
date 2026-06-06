import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const values = [
  {
    icon: "🎯",
    title: "Our Mission",
    description: "Making HR simpler through practical solutions that help organizations and their people do their best work — building workplaces where talent grows and businesses reach their goals.",
  },
  {
    icon: "👁️",
    title: "Our Vision",
    description: "To lead the way in HR by helping build inclusive, adaptable workplaces that bring out the best in people, across both growing and established markets around the world.",
  },
  {
    icon: "💡",
    title: "Our Approach",
    description: "We combine real job market data with hands-on recruitment experience. Every solution we deliver is shaped around your specific priorities — not a one-size-fits-all template.",
  },
]

export function About() {
  return (
    <section className="py-16 px-4 md:px-8">

      {/* Header */}
      <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
        Who we are
      </p>
      <h2 className="text-3xl font-bold font-display text-foreground mb-3">
        About Versaatech
      </h2>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        An HR consulting firm built around real job market data and hands-on recruitment know-how. We help organizations across Africa, the Middle East, India and the USA turn workforce challenges into strengths.
      </p>

      {/* Mission, Vision, Approach */}
      <div className="grid grid-cols-1 md:grid-cols-3 border border-border rounded-xl overflow-hidden mb-10">
        {values.map((value, index) => {
          const isLast = index === values.length - 1
          return (
            <div
              key={value.title}
              className={`
                group p-6 flex flex-col gap-3
                hover:bg-blue-50/50 transition-colors duration-200
                ${!isLast ? 'border-b md:border-b-0 md:border-r border-border' : ''}
              `}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl group-hover:bg-blue-100 transition-colors duration-200">
                {value.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA Strip */}
      <div className="rounded-xl border border-border bg-muted/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            Ready to build a stronger team?
          </h3>
          <p className="text-sm text-muted-foreground">
            Let's talk about what you need — we'll shape a solution around it.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
        >
          Get in Touch <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </section>
  )
}
