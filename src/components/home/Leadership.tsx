import { Linkedin } from 'lucide-react'
import Link from 'next/link'

const leaders = [
  {
    initials: "RW",
    name: "Ramit Walia",
    role: "Chief Growth Officer",
    bio: "Drives Versaatech's growth strategy across Africa and the Middle East, bringing deep expertise in talent acquisition and business development.",
    color: "from-blue-500 to-blue-700",
    linkedin: null,
  },
  {
    initials: "MG",
    name: "Monisha Gossain",
    role: "Chief Operating Officer",
    bio: "Oversees day-to-day operations and service delivery, ensuring every client engagement meets Versaatech's high standards of quality and consistency.",
    color: "from-indigo-500 to-indigo-700",
    linkedin: null,
  },
]

const advisors = [
  { flag: "🇺🇸", region: "USA" },
  { flag: "🇦🇪", region: "Dubai" },
  { flag: "🇲🇽", region: "Mexico" },
  { flag: "🇮🇳", region: "India" },
  { flag: "🇰🇪", region: "Kenya" },
]

export function Team() {
  return (
    <section className="py-16 px-4 md:px-8">

      {/* Header */}
      <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
        The people behind Versaatech
      </p>
      <h2 className="text-3xl font-bold font-display text-foreground mb-3">
        Our Leadership
      </h2>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Led by experienced executives and supported by a global network of advisors across 5 regions.
      </p>

      {/* Leadership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {leaders.map((leader) => (
          <div
            key={leader.name}
            className="group bg-background rounded-xl border border-border p-6 flex gap-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            {/* Avatar */}
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${leader.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
              {leader.initials}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-200">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-blue-600 font-medium">
                    {leader.role}
                  </p>
                </div>
                {leader.linkedin && (
                  <Link
                    href={leader.linkedin}
                    target="_blank"
                    className="text-muted-foreground hover:text-blue-600 transition-colors duration-200 flex-shrink-0"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Link>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                {leader.bio}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Global Advisors */}
      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <h3 className="font-semibold text-foreground mb-1">
          Global Advisors
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Our advisory network spans 5 regions, bringing local expertise to every market we serve.
        </p>
        <div className="flex flex-wrap gap-2">
          {advisors.map((advisor) => (
            <span
              key={advisor.region}
              className="inline-flex items-center gap-2 bg-background border border-border text-foreground text-xs font-medium px-3 py-1.5 rounded-full"
            >
              <span>{advisor.flag}</span>
              {advisor.region}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
