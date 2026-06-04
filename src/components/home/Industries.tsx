const industries = [
  {
    icon: "💻",
    name: "Information Technology",
    description: "Software development, cloud computing & cybersecurity professionals.",
  },
  {
    icon: "📡",
    name: "Telecommunications",
    description: "Network engineers, system architects & technical specialists.",
  },
  {
    icon: "⚡",
    name: "Energy & Oil",
    description: "Experienced professionals in exploration, production & operations.",
  },
  {
    icon: "🏦",
    name: "Banking & Finance",
    description: "Skilled professionals across financial services & banking.",
  },
  {
    icon: "🏨",
    name: "Hospitality",
    description: "Customer-focused professionals for hotels, restaurants & tourism.",
  },
  {
    icon: "🏭",
    name: "Manufacturing",
    description: "Skilled workers & management for modern manufacturing environments.",
  },
  {
    icon: "💊",
    name: "Pharma & Healthcare",
    description: "Specialist recruitment for pharmaceutical & healthcare organizations.",
  },
  {
    icon: "🚛",
    name: "Logistics & Supply Chain",
    description: "Operations & distribution talent for complex supply chains.",
  },
  {
    icon: "🏗️",
    name: "Construction & Real Estate",
    description: "Project managers, engineers & skilled tradespeople.",
  },
  {
    icon: "📺",
    name: "Media & Communications",
    description: "Creative and technical talent for media organizations.",
  },
  {
    icon: "✈️",
    name: "Aviation & Transport",
    description: "Aviation professionals and transport sector specialists.",
  },
  {
    icon: "🎓",
    name: "Education & NGOs",
    description: "Educators, administrators & professionals for social impact.",
  },
];

export function Industries() {
  return (
    <section className="py-16 px-4 md:px-8 bg-muted/30">

      {/* Header */}
      <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
        Sectors we cover
      </p>
      <h2 className="text-3xl font-bold font-display text-foreground mb-3">
        Industries We Serve
      </h2>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Deep expertise across 12+ sectors — we understand your talent challenges before you explain them.
      </p>

      {/* Industries Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {industries.map((industry) => (
          <div
            key={industry.name}
            className="group bg-background rounded-xl border border-border p-5 flex flex-col gap-3 hover:border-blue-400 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-2xl group-hover:bg-blue-100 transition-colors duration-200">
              {industry.icon}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-1 group-hover:text-blue-600 transition-colors duration-200">
                {industry.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {industry.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
