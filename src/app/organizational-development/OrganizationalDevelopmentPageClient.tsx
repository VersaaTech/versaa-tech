'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import DynamicIcon from '@/components/DynamicIcon'

export default function OrganizationalDevelopmentPageClient() {
  return (
    <div className="min-h-screen bg-[#f7fffc]">
      {/* Hero Section */}
      <section className="relative h-auto min-h-[50vh] py-10 flex items-center justify-center">
        <Image
          src="/images/organizational-development-hero.avif"
          alt="Organizational Development Consulting"
          fill
          className="object-cover brightness-[0.3]"
          priority
          sizes="(max-width: 768px) 100vw, 75vw"
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Organizational Development Consulting
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Transforming organizations for sustained growth and innovation.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 text-lg hover:from-blue-600 hover:to-blue-800 transition-colors">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Empowering Organizational Transformation
            </h2>
            <p className="text-lg text-gray-600">
              Our Organizational Development Consulting services are designed to drive strategic change, optimize performance, and foster a culture of continuous improvement. We partner with businesses to assess current operations, develop tailored strategies, and implement sustainable solutions that align with your vision.
            </p>
            <p className="text-lg text-gray-600 mt-4">
              We leverage data-driven insights and proven methodologies to ensure that every change initiative results in measurable outcomes and lasting impact. Our experienced consultants guide you meticulously through each phase of organizational transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Our Approach
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We follow a comprehensive, multi-phase process to drive organizational change:
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                step: "Organizational Assessment",
                description:
                  "Through detailed data gathering, interviews, and performance metrics analysis, we identify strengths and areas for improvement. Our approach uses both qualitative and quantitative methods to understand your organizational landscape.",
                icon: "FaSearch",
              },
              {
                step: "Change Management Strategy",
                description:
                  "We develop a bespoke roadmap that addresses potential barriers, aligns with your vision, and ensures smooth transitions. Our strategy includes stakeholder engagement and risk mitigation for lasting change.",
                icon: "FaChartLine",
              },
              {
                step: "Leadership & Culture Development",
                description:
                  "We invest in leadership training and cultural workshops that empower your leaders and promote a collaborative environment. Our programs build a sustainable culture of innovation and accountability.",
                icon: "FaUserCheck",
              },
              {
                step: "Process Improvement & Implementation",
                description:
                  "By optimizing workflows and leveraging continuous improvement methodologies, we enhance operational efficiency. Our hands-on approach ensures that improvements are both practical and scalable.",
                icon: "FaCogs",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="p-4"
              >
                <div className="flex items-center mb-3">
                  <DynamicIcon iconName={item.icon} className="text-blue-600 text-3xl mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">{item.step}</h3>
                </div>
                <p className="text-gray-600 ml-10">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600">
              Our expertise in organizational development helps you build resilient and agile organizations. We help you:
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Enhance Efficiency",
                content:
                  "Our process improvement strategies help streamline operations, eliminate redundancies, and promote effective interdepartmental communication, ensuring your organization runs at its best.",
              },
              {
                title: "Drive Strategic Change",
                content:
                  "We implement change management initiatives that align with your long-term vision, delivering measurable and sustainable outcomes tailored to your business goals.",
              },
              {
                title: "Empower Leadership",
                content:
                  "Through robust development programs, we cultivate strategic leaders who inspire innovation, drive growth, and foster an environment of continuous improvement.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="p-4"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In-depth Methodology Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              In-depth Methodology
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our process is designed to ensure that every facet of your organization is aligned with your strategic goals. We combine industry best practices with innovative solutions to deliver transformative results.
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <ul className="list-disc space-y-4 text-gray-700 ml-6">
              <li><strong>Comprehensive Diagnosis:</strong> We begin with a detailed assessment of your organizational culture, structure, leadership, and operational processes. This stage involves interviews, surveys, and data analysis to diagnose your current state.</li>
              <li><strong>Tailored Strategy Design:</strong> Utilizing our findings, we craft a customized roadmap that addresses your unique challenges while leveraging your core strengths.</li>
              <li><strong>Collaborative Implementation:</strong> We work alongside your teams to implement changes, providing workshops and training sessions to ensure smooth integration of new practices.</li>
              <li><strong>Continuous Improvement:</strong> Transformation is an ongoing process. We establish metrics and benchmarks to monitor progress and sustain success over time.</li>
            </ul>
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
              Ready to Transform Your Organization?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Let us help you drive sustainable change and unlock your full potential.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 text-lg hover:from-blue-600 hover:to-blue-800 transition-colors">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 