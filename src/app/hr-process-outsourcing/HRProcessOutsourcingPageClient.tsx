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
  HPO_STATS,
  KEY_FEATURES,
  PROCESS_STEPS,
  KEY_BENEFITS,
  ANIMATION_VARIANTS
} from './constants'

export default function HRProcessOutsourcingPageClient() {
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
          {HPO_STATS.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </motion.div>
      </Section>

      {/* Key Features Section */}
      <Section className="bg-[#f7fffc]">
        <SectionHeader
          title="Why Choose Our HR Process Outsourcing"
          subtitle="Transform HR efficiency with comprehensive process outsourcing that delivers operational excellence and strategic value."
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
          title="Our HR Outsourcing Process"
          subtitle="From strategic assessment to ongoing management, we ensure seamless HR operations that drive organizational efficiency."
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
            title="The Versaatech HR Outsourcing Advantage"
            subtitle="Experience the benefits of comprehensive HR process outsourcing that transforms operations and drives business success."
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