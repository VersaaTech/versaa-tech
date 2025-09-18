import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'
import { CheckCircle } from 'lucide-react'

// SEO metadata for Next.js
export const metadata = {
  title: "RPO (Recruitment Process Outsourcing) | Versaatech",
  description:
    "Transform your talent acquisition with our comprehensive Recruitment Process Outsourcing solutions, delivering scalable, efficient, and cost-effective recruitment services that drive organizational growth.",
};

// Static data
const RPO_STATS = [
  {
    number: "50%",
    label: "Faster Hiring",
    description: "Reduced time-to-fill with optimized processes"
  },
  {
    number: "40%",
    label: "Cost Savings",
    description: "Lower recruitment costs through efficiency"
  },
  {
    number: "98%",
    label: "Client Satisfaction",
    description: "Proven track record of successful partnerships"
  },
  {
    number: "95%",
    label: "Quality Hires",
    description: "Higher retention rates and performance"
  }
];

const KEY_FEATURES = [
  {
    icon: 'FaRecycle',
    title: 'End-to-End Recruitment',
    description: 'Complete recruitment lifecycle management from sourcing to onboarding with dedicated support teams.'
  },
  {
    icon: 'FaRobot',
    title: 'AI-Enhanced Sourcing',
    description: 'Advanced technology and machine learning algorithms for intelligent candidate matching and discovery.'
  },
  {
    icon: 'FaChartLine',
    title: 'Scalable Solutions',
    description: 'Flexible engagement models that adapt to your hiring volume and organizational needs.'
  },
  {
    icon: 'FaClock',
    title: 'Rapid Deployment',
    description: 'Quick setup and immediate impact with streamlined processes and proven methodologies.'
  },
  {
    icon: 'FaShieldAlt',
    title: 'Quality Assurance',
    description: 'Rigorous screening and assessment processes ensuring only top-tier candidates advance.'
  },
  {
    icon: 'FaChartBar',
    title: 'Data-Driven Insights',
    description: 'Comprehensive analytics and reporting for informed decision-making and continuous improvement.'
  }
];

const PROCESS_STEPS = [
  {
    icon: 'FaClipboardList',
    title: 'Requirements Analysis',
    description: 'Deep understanding of your hiring needs and organizational culture'
  },
  {
    icon: 'FaSearch',
    title: 'Talent Acquisition',
    description: 'Multi-channel sourcing and candidate identification using advanced tools'
  },
  {
    icon: 'FaUserCheck',
    title: 'Screening & Assessment',
    description: 'Comprehensive evaluation including skills testing and cultural fit'
  },
  {
    icon: 'FaHandshake',
    title: 'Onboarding Support',
    description: 'Seamless integration and post-hire success tracking'
  }
];

const KEY_BENEFITS = [
  {
    title: "Reduced Overhead",
    description: "Eliminate recruitment infrastructure costs while maintaining quality standards"
  },
  {
    title: "Market Intelligence",
    description: "Access to real-time salary benchmarks and talent market insights"
  },
  {
    title: "Flexibility",
    description: "Scale recruitment efforts up or down based on business demands"
  },
  {
    title: "Technology Access",
    description: "Leverage cutting-edge recruitment tools without additional investment"
  }
];

export default function RPORecruitmentPage() {
  return (
    <div className="min-h-screen bg-[#f7fffc]">
      {/* Hero Section */}
      <section className="relative h-auto min-h-[50vh] py-12 flex items-center justify-center">
        <Image
          src="/images/recruitment-outsourcing.webp"
          alt="RPO Recruitment Process Outsourcing"
          fill
          className="object-cover brightness-[0.4]"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl text-center mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Transform Your
              <span className="bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text block">
                Talent Acquisition
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-6">
              Scale your recruitment with our comprehensive RPO solutions. From sourcing to onboarding, we deliver quality candidates faster and more cost-effectively.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 px-6 py-3 text-base font-semibold transition-colors">
                Explore RPO Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {RPO_STATS.map((stat, index) => (
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
              Why Choose Our RPO Services
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              We transform your talent acquisition with comprehensive recruitment solutions that scale with your business needs and deliver measurable results.
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
              Our Proven RPO Process
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              From strategic planning to seamless delivery, we ensure every recruitment cycle drives organizational growth and talent excellence.
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
                The Versaatech RPO Advantage
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Experience the power of a truly integrated recruitment partnership that grows with your business.
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
              Ready to Revolutionize Your Recruitment?
            </h2>
            <p className="text-base md:text-lg mb-6 text-blue-100">
              Discover how our RPO solutions can transform your talent acquisition strategy and deliver exceptional results for your organization.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-base font-semibold transition-colors">
                Start Your Transformation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}