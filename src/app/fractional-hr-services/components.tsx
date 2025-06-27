import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'
import { CheckCircle } from 'lucide-react'
import { STYLES, ANIMATION_VARIANTS } from './constants'
import type { Statistic, Feature, ProcessStep, Benefit } from './types'

interface SectionProps {
  className?: string
  children: React.ReactNode
}

interface SectionHeaderProps {
  title: string
  subtitle: string
  className?: string
}

// Reusable Section Component
export const Section = ({ className = '', children }: SectionProps) => (
  <section className={`${STYLES.section} ${className}`}>
    <div className={STYLES.container}>
      {children}
    </div>
  </section>
)

// Reusable Section Header Component
export const SectionHeader = ({ title, subtitle, className = '' }: SectionHeaderProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={ANIMATION_VARIANTS.container}
    className={`${STYLES.centerText} mb-12 ${className}`}
  >
    <h2 className={`text-3xl font-bold ${STYLES.gradientText} mb-4`}>
      {title}
    </h2>
    <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
      {subtitle}
    </p>
  </motion.div>
)

// Hero Section Component
export const HeroSection = () => (
  <section className="relative h-auto min-h-[50vh] py-12 flex items-center justify-center">
    <Image
      src="/images/fractional-hr.jpg"
      alt="Fractional HR Services"
      fill
      className="object-cover brightness-[0.4]"
      priority
      sizes="100vw"
    />
    <div className="relative z-10 container mx-auto px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={ANIMATION_VARIANTS.container}
        className="max-w-4xl text-center mx-auto"
      >
        <motion.h1 
          variants={ANIMATION_VARIANTS.item}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Strategic HR Leadership
          <span className="bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text block">
            When You Need It
          </span>
        </motion.h1>
        <motion.p 
          variants={ANIMATION_VARIANTS.item}
          className="text-base md:text-lg text-gray-200 mb-6"
        >
          Access senior-level HR expertise without full-time commitment. Our fractional HR services deliver strategic guidance and operational excellence tailored to your growth stage.
        </motion.p>
        <motion.div variants={ANIMATION_VARIANTS.item}>
          <Link href="/contact">
            <Button className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 ${STYLES.button}`}>
              Explore HR Solutions
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
)

// Statistics Card Component
export const StatCard = ({ stat }: { stat: Statistic }) => (
  <motion.div
    variants={ANIMATION_VARIANTS.card}
    className={STYLES.centerText}
  >
    <div className={`text-3xl md:text-4xl font-bold ${STYLES.gradientText} mb-2`}>
      {stat.number}
    </div>
    <div className="text-base md:text-lg font-semibold text-gray-800 mb-2">
      {stat.label}
    </div>
    <div className="text-sm text-gray-600">
      {stat.description}
    </div>
  </motion.div>
)

// Feature Card Component
export const FeatureCard = ({ feature }: { feature: Feature }) => (
  <motion.div
    variants={ANIMATION_VARIANTS.card}
    className="group"
  >
    <Card className={STYLES.card}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <DynamicIcon iconName={feature.icon} className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {feature.title}
          </h3>
        </div>
        <p className="text-gray-600 text-base leading-relaxed">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
)

// Process Step Component
export const ProcessStepCard = ({ step, index }: { step: ProcessStep; index: number }) => (
  <motion.div
    variants={ANIMATION_VARIANTS.item}
    className={STYLES.centerText}
  >
    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300 h-full">
      <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
        {index + 1}
      </div>
      <div className="text-blue-600 text-2xl mb-4">
        <DynamicIcon iconName={step.icon} className="w-6 h-6 mx-auto" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {step.title}
      </h3>
      <p className="text-gray-600 text-sm">
        {step.description}
      </p>
    </div>
  </motion.div>
)

// Benefit Card Component
export const BenefitCard = ({ benefit }: { benefit: Benefit }) => (
  <motion.div
    variants={ANIMATION_VARIANTS.item}
    className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100"
  >
    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {benefit.title}
      </h3>
      <p className="text-gray-600 text-base">
        {benefit.description}
      </p>
    </div>
  </motion.div>
)

// CTA Section Component
export const CTASection = () => (
  <Section className={STYLES.gradientBg}>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={ANIMATION_VARIANTS.container}
      className="max-w-3xl mx-auto text-center text-white"
    >
      <motion.h2 
        variants={ANIMATION_VARIANTS.item}
        className="text-3xl font-bold mb-4"
      >
        Ready to Access Fractional HR Leadership?
      </motion.h2>
      <motion.p 
        variants={ANIMATION_VARIANTS.item}
        className="text-base md:text-lg mb-6 text-blue-100"
      >
        Discover how our flexible HR expertise can accelerate your organizational growth and strategic initiatives.
      </motion.p>
      <motion.div variants={ANIMATION_VARIANTS.item}>
        <Link href="/contact">
          <Button className={`bg-white text-blue-600 hover:bg-gray-100 ${STYLES.button}`}>
            Start Your HR Journey
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  </Section>
) 