import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'
import { CheckCircle } from 'lucide-react'

// SEO metadata for Next.js
export const metadata = {
  title: "HR Process Outsourcing Services | Versaatech",
  description:
    "Streamline your human resources operations with our comprehensive HR Process Outsourcing solutions, designed to enhance efficiency while reducing costs and administrative burden.",
};

// Static data
const HPO_STATS = [
  {
    number: "40%",
    label: "Cost Reduction",
    description: "Average savings on HR operational costs"
  },
  {
    number: "99%",
    label: "Compliance Rate",
    description: "Regulatory compliance accuracy maintained"
  },
  {
    number: "60%",
    label: "Efficiency Gain",
    description: "Improvement in HR process efficiency"
  },
  {
    number: "24/7",
    label: "Support Available",
    description: "Continuous operational support coverage"
  }
];

const KEY_FEATURES = [
  {
    icon: 'FaMoneyBillWave',
    title: 'Payroll Processing',
    description: 'Complete payroll management from calculation to disbursement with full compliance and accuracy.'
  },
  {
    icon: 'FaShieldAlt',
    title: 'Benefits Administration',
    description: 'Comprehensive employee benefits management and enrollment services for seamless operations.'
  },
  {
    icon: 'FaFileAlt',
    title: 'HR Documentation',
    description: 'Complete HR record keeping, documentation management, and administrative support systems.'
  },
  {
    icon: 'FaGavel',
    title: 'Compliance Management',
    description: 'Expert oversight ensuring adherence to labor laws and regulatory requirements.'
  },
  {
    icon: 'FaLaptop',
    title: 'Technology Integration',
    description: 'Advanced HRIS platforms and automation tools for optimized workflow efficiency.'
  },
  {
    icon: 'FaHeadset',
    title: 'Employee Support',
    description: 'Dedicated HR helpdesk and employee service center for immediate assistance.'
  }
];

const PROCESS_STEPS = [
  {
    icon: 'FaSearch',
    title: 'Process Assessment',
    description: 'Comprehensive evaluation of current HR processes and optimization opportunities'
  },
  {
    icon: 'FaCogs',
    title: 'Solution Design',
    description: 'Custom HR outsourcing solutions aligned with business objectives'
  },
  {
    icon: 'FaPlug',
    title: 'System Integration',
    description: 'Seamless integration with existing infrastructure and workflows'
  },
  {
    icon: 'FaChartBar',
    title: 'Ongoing Management',
    description: 'Continuous process management with performance monitoring and support'
  }
];

const KEY_BENEFITS = [
  {
    title: "Operational Efficiency",
    description: "Streamlined HR processes reduce administrative burden and enhance productivity"
  },
  {
    title: "Cost Optimization",
    description: "Significant reduction in HR operational costs through economies of scale"
  },
  {
    title: "Enhanced Compliance",
    description: "Expert management ensures full regulatory compliance and risk mitigation"
  },
  {
    title: "Strategic Focus",
    description: "Free internal resources to concentrate on core business and strategic initiatives"
  }
];

export default function HRProcessOutsourcingPage() {
  return (
    <div className="min-h-screen bg-[#f7fffc]">
      {/* Hero Section */}
      <section className="relative h-auto min-h-[50vh] py-12 flex items-center justify-center">
        <Image
          src="/images/hr-outsourcing.jpg"
          alt="HR Process Outsourcing Services"
          fill
          className="object-cover brightness-[0.4]"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl text-center mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Streamline Your
              <span className="bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text block">
                HR Operations
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-6">
              Transform your HR processes with comprehensive outsourcing solutions that reduce costs, enhance efficiency, and ensure compliance while freeing your team to focus on strategic initiatives.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 px-6 py-3 text-base font-semibold transition-colors">
                Explore HR Outsourcing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {HPO_STATS.map((stat, index) => (
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
              Comprehensive HR Outsourcing Services
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              From payroll processing to compliance management, we handle all your HR operational needs with expertise and precision.
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
              Our Outsourcing Process
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures seamless transition and continuous optimization of your HR operations.
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
                Strategic Business Benefits
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Transform your HR operations into a strategic advantage that drives business growth and operational excellence.
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
              Ready to Transform Your HR Operations?
            </h2>
            <p className="text-base md:text-lg mb-6 text-blue-100">
              Discover how our HR process outsourcing can streamline your operations, reduce costs, and enhance strategic focus.
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