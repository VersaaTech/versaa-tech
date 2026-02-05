import { Hero } from "@/components/home/Hero";
import { Team } from "@/components/home/Leadership";
import { OurTeam } from "@/components/home/OurTeam";
import { About } from "@/components/home/About";
import { Overview } from "@/components/home/Overview";
import { Industries } from "@/components/home/Industries";
import { Differentiators } from "@/components/home/Differentiators";
import { Regions } from "@/components/home/Regions";
import ContactPage from "./contact/page";

const sectionSpacing = "pt-[90px] -mt-[90px]";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="bg-background">
        <Hero />
        <section id="overview" className={sectionSpacing}>
          <Overview />
        </section>
        <section id="industries" className={sectionSpacing}>
          <Industries />
        </section>
        <section id="differentiators" className={sectionSpacing}>
          <Differentiators />
        </section>
        <section id="regions" className={sectionSpacing}>
          <Regions />
        </section>
        <section id="about" className={sectionSpacing}>
          <About />
          <section id="about-leadership" className={sectionSpacing}>
            <Team />
          </section>
          <section id="our-team" className={sectionSpacing}>
            <OurTeam />
          </section>
          <section id="contact">
            <ContactPage />
          </section>
        </section>
      </main>
    </div>
  )
}
