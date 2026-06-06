import { Linkedin } from 'lucide-react'
import Link from 'next/link'

const team = [
  {
    initials: "JM",
    name: "Joslyn Mbae",
    role: "Head — HR Projects",
    color: "from-violet-500 to-violet-700",
    linkedin: "https://www.linkedin.com/in/joslyn-mbae-5b6852b0/",
  },
  {
    initials: "FN",
    name: "Fredrick Nyambedha",
    role: "HR Project Manager",
    color: "from-amber-500 to-amber-700",
    linkedin: null,
  },
  {
    initials: "JN",
    name: "Joyce Nyamaidu",
    role: "Business Dev Manager",
    color: "from-cyan-500 to-cyan-700",
    linkedin: "https://www.linkedin.com/in/joyce-ndamaiyu-715a02a1/",
  },
]

export function OurTeam() {
  return (
    <section className="py-16 px-4 md:px-8 bg-muted/30">

      {/* Header */}
      <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
        The crew
      </p>
      <h2 className="text-3xl font-bold font-display text-foreground mb-3">
        Meet the Team
      </h2>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        The people doing the work every day, making sure every client and candidate gets the best experience.
      </p>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.name}
            className="group bg-background rounded-xl border border-border p-6 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            {/* Avatar */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl mb-4`}>
              {member.initials}
            </div>

            {/* Info */}
            <h3 className="font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-200 mb-1">
              {member.name}
            </h3>
            <p className="text-xs text-blue-600 font-medium mb-3">
              {member.role}
            </p>

            {/* LinkedIn */}
            {member.linkedin && (
              <Link
                href={member.linkedin}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-blue-600 transition-colors duration-200 border border-border rounded-full px-3 py-1"
              >
                <Linkedin className="w-3 h-3" />
                LinkedIn
              </Link>
            )}
          </div>
        ))}
      </div>

    </section>
  )
}
