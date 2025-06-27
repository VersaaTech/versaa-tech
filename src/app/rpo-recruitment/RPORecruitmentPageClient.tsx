'use client'

import { motion } from 'framer-motion'
import {
  HeroSection,
  Section,
  SectionHeader,
  StatCard,
  FeatureCard,
  ProcessStepCard,
  BenefitCard,
  CTASection
} from './components'
import {
  RPO_STATS,
  KEY_FEATURES,
  PROCESS_STEPS,
  KEY_BENEFITS,
  ANIMATION_VARIANTS
} from './constants'

export default function RPORecruitmentPageClient() {
  return (
    <div className="min-h-screen bg-[#f7fffc]">
      {/* Hero Section */}
      <HeroSection />

      {/* Statistics Section */}
      <Section className="bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={ANIMATION_VARIANTS.container}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {RPO_STATS.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </motion.div>
      </Section>

      {/* Key Features Section */}
      <Section className="bg-[#f7fffc]">
        <SectionHeader
          title="Why Choose Our RPO Services"
          subtitle="We transform your talent acquisition with comprehensive recruitment solutions that scale with your business needs and deliver measurable results."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KEY_FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </Section>

      {/* Process Overview Section */}
      <Section className="bg-white">
        <SectionHeader
          title="Our Proven RPO Process"
          subtitle="From strategic planning to seamless delivery, we ensure every recruitment cycle drives organizational growth and talent excellence."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessStepCard key={index} step={step} index={index} />
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section className="bg-[#f7fffc]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="The Versaatech RPO Advantage"
            subtitle="Experience the power of a truly integrated recruitment partnership that grows with your business."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {KEY_BENEFITS.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} />
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
} 