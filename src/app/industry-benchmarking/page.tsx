import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'
import { CheckCircle } from 'lucide-react'

// SEO metadata for Next.js
export const metadata = {
  title: "Industry HR Benchmarking Services | Versaatech",
  description:
    "Comprehensive Industry HR Benchmarking services that provide strategic insights to optimize your human capital strategies and competitive positioning.",
};

// Static data
const BENCHMARKING_STATS = [
  {
    number: "500+",
    label: "Industry Reports",
    description: "Comprehensive benchmark studies delivered annually"
  },
  {
    number: "50+",
    label: "Industry Sectors",
    description: "Specialized benchmarking across diverse verticals"
  },
  {
    number: "85%",
    label: "Strategic Impact",
    description: "Organizations report improved decision-making"
  },
  {
    number: "30%",
    label: "Cost Optimization",
    description: "Average improvement in HR cost efficiency"
  }
];

const KEY_FEATURES = [
  {
    icon: 'FaChartBar',
    title: 'Compensation Benchmarking',
    description: 'Comprehensive salary and benefits analysis across industry verticals for competitive positioning and market alignment.'
  },
  {
    icon: 'FaUsers',
    title: 'Talent Market Intelligence',
    description: 'Real-time insights into talent availability, skill gaps, and competitive landscape for strategic workforce planning.'
  },
  {
    icon: 'FaIndustry',
    title: 'HR Practice Analysis',
    description: 'Detailed comparison of HR policies, procedures, and practices against industry standards and best performers.'
  },
  {
    icon: 'FaChartLine',
    title: 'Performance Metrics',
    description: 'Key performance indicator evaluation against industry benchmarks for operational optimization and strategic alignment.'
  },
  {
    icon: 'FaGlobe',
    title: 'Multi-Region Analysis',
    description: 'Cross-regional benchmarking studies providing global perspective and localized market intelligence.'
  },
  {
    icon: 'FaLightbulb',
    title: 'Best Practice Identification',
    description: 'Discovery and documentation of industry-leading practices for organizational transformation and competitive advantage.'
  }
];

const PROCESS_STEPS = [
  {
    icon: 'FaClipboardList',
    title: 'Scope Definition',
    description: 'Define benchmarking objectives, metrics, and target comparison groups for focused analysis'
  },
  {
    icon: 'FaDatabase',
    title: 'Data Collection',
    description: 'Comprehensive data gathering from industry sources and proprietary databases'
  },
  {
    icon: 'FaChartBar',
    title: 'Analysis & Comparison',
    description: 'Statistical analysis comparing your organization against relevant industry benchmarks'
  },
  {
    icon: 'FaFileAlt',
    title: 'Insights & Recommendations',
    description: 'Strategic recommendations based on findings and best practice identification'
  }
];

const KEY_BENEFITS = [
  {
    title: "Strategic Decision Making",
    description: "Data-driven insights enable informed strategic decisions and competitive positioning"
  },
  {
    title: "Market Intelligence",
    description: "Real-time access to industry trends, salary benchmarks, and competitive intelligence"
  },
  {
    title: "Performance Optimization",
    description: "Identify gaps and opportunities for operational improvement and best practice adoption"
  },
  {
    title: "Competitive Advantage",
    description: "Stay ahead of industry trends and maintain competitive edge through strategic insights"
  }
];

export default function IndustryBenchmarkingPage() {
  return (
    <div className="min-h-screen bg-[#f7fffc]">
      {/* Hero Section */}
      <section className="relative h-auto min-h-[50vh] py-12 flex items-center justify-center">
        <Image
          src="/images/hr-benchmarking.jpg"
          alt="Industry HR Benchmarking Services"
          fill
          className="object-cover brightness-[0.4]"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl text-center mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Strategic HR
              <span className="bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text block">
                Industry Benchmarking
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-6">
              Gain competitive intelligence through comprehensive industry benchmarking studies that optimize your HR strategies and drive organizational excellence.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 px-6 py-3 text-base font-semibold transition-colors">
                Explore Benchmarking Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {BENCHMARKING_STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-[#f7fffc]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">
              Comprehensive Benchmarking Solutions
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Our industry benchmarking services provide deep insights into market trends, competitive positioning, and strategic opportunities for your organization.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KEY_FEATURES.map((feature, index) => (
              <div key={index} className="group">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">
              Our Benchmarking Methodology
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Systematic approach to deliver accurate, actionable insights that drive strategic decision-making and organizational transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="text-blue-600 text-3xl mb-6">
                    <DynamicIcon iconName={step.icon} className="w-8 h-8 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#f7fffc]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">
                Strategic Advantages
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Leverage industry intelligence to make informed decisions and maintain competitive advantage in your market.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {KEY_BENEFITS.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-base">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Gain Competitive Intelligence?
            </h2>
            <p className="text-base md:text-lg mb-6 text-blue-100">
              Discover how our industry benchmarking services can provide the strategic insights your organization needs to excel.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-base font-semibold transition-colors">
                Start Your Benchmarking Study
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}