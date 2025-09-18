import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'
import { CheckCircle } from 'lucide-react'

// SEO metadata for Next.js
export const metadata = {
  title: "Fractional HR Services | Versaatech",
  description:
    "Expert Fractional HR Services providing strategic HR leadership and flexible engagement models to scale your human resources capabilities cost-effectively.",
};

// Static data
const HR_STATS = [
  {
    number: "70%",
    label: "Cost Savings",
    description: "Reduction in HR leadership costs vs full-time hire"
  },
  {
    number: "90%",
    label: "Client Satisfaction",
    description: "Organizations renew fractional HR partnerships"
  },
  {
    number: "3x",
    label: "Faster Setup",
    description: "Quicker HR implementation than traditional hiring"
  },
  {
    number: "25+",
    label: "Industries Served",
    description: "Cross-sector expertise and best practices"
  }
];

const KEY_FEATURES = [
  {
    icon: 'FaUserTie',
    title: 'Strategic HR Leadership',
    description: 'Senior-level HR executives providing strategic guidance, organizational development, and people strategy alignment.'
  },
  {
    icon: 'FaExpandArrowsAlt',
    title: 'Flexible Engagement Models',
    description: 'Scalable HR support from part-time leadership to project-based consulting, adapting to your business needs.'
  },
  {
    icon: 'FaShieldAlt',
    title: 'Compliance & Risk Management',
    description: 'Expert guidance on HR policies, procedures, and regulatory compliance to protect your organization.'
  },
  {
    icon: 'FaChartLine',
    title: 'Performance & Analytics',
    description: 'Data-driven HR insights and metrics to support strategic decision-making and operational excellence.'
  },
  {
    icon: 'FaUsers',
    title: 'Talent Management',
    description: 'Comprehensive talent acquisition, development, and retention strategies for sustainable growth.'
  },
  {
    icon: 'FaRocket',
    title: 'Immediate Impact',
    description: 'Experienced professionals who contribute from day one without the typical ramp-up time.'
  }
];

const PROCESS_STEPS = [
  {
    icon: 'FaSearch',
    title: 'Needs Assessment',
    description: 'Comprehensive analysis of your HR requirements and organizational goals'
  },
  {
    icon: 'FaUserCheck',
    title: 'Expert Matching',
    description: 'Careful selection of HR professionals with relevant industry experience'
  },
  {
    icon: 'FaHandshake',
    title: 'Engagement Setup',
    description: 'Flexible arrangement design with clear deliverables and success metrics'
  },
  {
    icon: 'FaChartBar',
    title: 'Continuous Value',
    description: 'Ongoing strategic support with regular reviews and adaptable scope'
  }
];

const KEY_BENEFITS = [
  {
    title: "Cost-Effective Leadership",
    description: "Access senior HR expertise at a fraction of the cost of a full-time executive hire"
  },
  {
    title: "Immediate Expertise",
    description: "Leverage experienced professionals who can contribute immediately without ramp-up time"
  },
  {
    title: "Scalable Flexibility",
    description: "Adjust HR support based on your changing business needs and growth trajectory"
  },
  {
    title: "Strategic Innovation",
    description: "Gain fresh perspectives and best practices from leaders across multiple organizations"
  }
];

export default function FractionalHRServicesPage() {
  return (
    <div className="min-h-screen bg-[#f7fffc]">
      {/* Hero Section */}
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
          <div className="max-w-4xl text-center mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Strategic HR Leadership
              <span className="bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text block">
                On-Demand
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-6">
              Access senior HR expertise with flexible engagement models that scale with your business needs while reducing costs and accelerating results.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 px-6 py-3 text-base font-semibold transition-colors">
                Explore Fractional HR Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {HR_STATS.map((stat, index) => (
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
              Comprehensive Fractional HR Solutions
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Our fractional HR services provide strategic leadership and operational excellence with the flexibility your growing business needs.
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
              Our Engagement Process
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              A streamlined approach to deliver immediate value and strategic HR leadership tailored to your organization&apos;s unique needs.
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
                The Fractional HR Advantage
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Experience the benefits of senior HR leadership without the full-time commitment or cost.
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
              Ready to Scale Your HR Capabilities?
            </h2>
            <p className="text-base md:text-lg mb-6 text-blue-100">
              Discover how our fractional HR services can provide the strategic leadership your business needs to grow.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-base font-semibold transition-colors">
                Get Your HR Strategy
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}