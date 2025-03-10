'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import DynamicIcon from '@/components/DynamicIcon'

export default function HRTechnologyPageClient() {
  return (
    <div className="min-h-screen bg-[#f7fffc]">
      {/* Hero Section */}
      <section className="relative h-auto min-h-[50vh] py-10 sm:min-h-[60vh] md:h-[70vh] flex items-center justify-center">
        <Image
          src="/images/hr-technology-hero.avif"
          alt="HR Technology & Digital Transformation"
          fill
          className="object-cover brightness-[0.3]"
          priority
          sizes="(max-width: 768px) 100vw, 75vw"
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              HR Technology & Digital Transformation
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Empowering your HR operations with innovative, cloud-powered solutions that transform the way you manage talent.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-3 hover:from-blue-600 hover:to-blue-800 transition-colors">
                Discover Our Solutions
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HR Technology Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
              Innovative HR Tech Solutions
            </h2>
            <p className="text-lg text-gray-600">
              Leverage advanced technology to streamline HR processes, enhance employee engagement, and drive data-driven decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: 'FaCloud',
                title: 'Cloud-Powered Systems',
                content: 'Seamlessly manage HR operations with scalable, cloud-based platforms.'
              },
              {
                icon: 'FaRobot',
                title: 'AI-Driven Analytics',
                content: 'Gain deep insights into talent performance and optimize decision-making with AI.'
              },
              {
                icon: 'FaNetworkWired',
                title: 'Digital Workforce Integration',
                content: 'Connect your team with advanced digital tools for enhanced collaboration.'
              },
              {
                icon: 'FaCogs',
                title: 'Automated Processes',
                content: 'Automate routine tasks to free up time for strategic initiatives.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="p-6 bg-[#f7fffc] rounded-xl border border-blue-50 hover:border-blue-100 transition-all text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-blue-600 text-3xl">
                    <DynamicIcon iconName={feature.icon} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {feature.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Transformation Roadmap Section */}
      <section className="pt-12 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
              Our Digital Transformation Roadmap
            </h2>
            <p className="text-lg text-gray-600">
              We partner with you every step of the way from strategic assessment to continuous innovation.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-12">
            {[
              {
                icon: 'FaSearch',
                title: 'Strategic Assessment',
                content: 'Evaluate your current HR processes and pinpoint opportunities for digital enhancement.'
              },
              {
                icon: 'FaCogs',
                title: 'Technology Integration',
                content: 'Implement cutting-edge tools and customize platforms to meet your unique needs.'
              },
              {
                icon: 'FaChalkboardTeacher',
                title: 'Change Management & Training',
                content: 'Empower your team with the skills needed to embrace new digital technologies.'
              },
              {
                icon: 'FaLightbulb',
                title: 'Continuous Innovation',
                content: 'Leverage data-driven insights for ongoing improvement and sustainable growth.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-6 w-full">
                  <div className="text-blue-600 text-3xl pt-1 shrink-0">
                    <DynamicIcon iconName={step.icon} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Digital HR Transformation Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
              Benefits of Digital HR Transformation
            </h2>
            <p className="text-lg text-gray-600">
              Unlock unparalleled advantages by automating and streamlining your HR operations.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: 'FaBolt',
                title: 'Enhanced Efficiency',
                content: 'Streamline HR processes and reduce manual effort through automation and intelligent workflows.'
              },
              {
                icon: 'FaUsers',
                title: 'Improved Employee Engagement',
                content: 'Foster collaboration and satisfaction with intuitive interfaces and integrated communication tools.'
              },
              {
                icon: 'FaChartLine',
                title: 'Data-Driven Decisions',
                content: 'Leverage real-time analytics for strategic insights that optimize human capital management.'
              },
              {
                icon: 'FaMoneyBillWave',
                title: 'Cost Reduction & Scalability',
                content: 'Implement scalable, secure solutions that grow with your organization while reducing costs.'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 transition-all text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-blue-600 text-3xl">
                    <DynamicIcon iconName={benefit.icon} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {benefit.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack & Integrations Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
              Robust Technology Stack & Seamless Integrations
            </h2>
            <p className="text-lg text-gray-600">
              Our solutions are built on a modern, secure, and scalable technology platform designed to integrate effortlessly with your existing HR systems.
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4 flex flex-col items-center"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
              }}
            >
              {[
                "Cloud-based infrastructure for high availability and scalability",
                "Advanced AI & Machine Learning analytics for predictive insights",
                "Mobile-first design ensuring accessibility anytime, anywhere",
                "Seamless integration with leading HRIS and ATS platforms",
                "State-of-the-art security protocols and compliance standards"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start text-gray-700 max-w-[600px] w-full"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <span className="text-blue-600 mr-3 min-w-[25px]">✓</span>
                  <span className="text-left">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Ready to Transform Your HR?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Explore how our innovative HR tech solutions can elevate your organization.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 text-lg hover:from-blue-600 hover:to-blue-800 transition-colors">
                Contact Us Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 