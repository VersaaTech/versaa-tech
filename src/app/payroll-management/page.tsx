import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import DynamicIcon from '@/components/DynamicIcon'
import { CheckCircle } from 'lucide-react'

// SEO metadata for Next.js
export const metadata = {
  title: "Payroll Outsourcing Services | Versaatech",
  description:
    "Comprehensive Payroll Outsourcing solutions that ensure accurate, timely, and compliant payroll management while reducing administrative burden and operational costs.",
};

// Static data
const PAYROLL_STATS = [
  {
    number: "99.9%",
    label: "Accuracy Rate",
    description: "Payroll processing accuracy maintained consistently"
  },
  {
    number: "50%",
    label: "Time Savings",
    description: "Reduction in payroll administration time"
  },
  {
    number: "100%",
    label: "Compliance",
    description: "Full adherence to tax and labor regulations"
  },
  {
    number: "24h",
    label: "Processing Time",
    description: "Maximum payroll processing turnaround"
  }
];

const KEY_FEATURES = [
  {
    icon: 'FaCalculator',
    title: 'Payroll Processing',
    description: 'End-to-end payroll calculation and disbursement services with complete accuracy and timeliness.'
  },
  {
    icon: 'FaFileInvoiceDollar',
    title: 'Tax Management',
    description: 'Complete tax calculation, deduction, and filing services ensuring full regulatory compliance.'
  },
  {
    icon: 'FaShieldAlt',
    title: 'Benefits Integration',
    description: 'Seamless integration of employee benefits with payroll systems for comprehensive management.'
  },
  {
    icon: 'FaGlobe',
    title: 'Multi-Location Support',
    description: 'Centralized payroll processing across multiple locations and jurisdictions with local compliance.'
  },
  {
    icon: 'FaClock',
    title: 'Time & Attendance',
    description: 'Automated integration with time tracking systems for accurate hours and attendance management.'
  },
  {
    icon: 'FaChartBar',
    title: 'Reporting & Analytics',
    description: 'Comprehensive payroll reports and analytics for strategic decision-making and compliance documentation.'
  }
];

const PROCESS_STEPS = [
  {
    icon: 'FaDatabase',
    title: 'Data Collection',
    description: 'Secure collection and verification of employee data and time records'
  },
  {
    icon: 'FaCalculator',
    title: 'Payroll Calculation',
    description: 'Accurate calculation of gross pay, deductions, taxes, and net pay'
  },
  {
    icon: 'FaCheckCircle',
    title: 'Review & Approval',
    description: 'Comprehensive payroll review process with client approval workflow'
  },
  {
    icon: 'FaMoneyCheckAlt',
    title: 'Payment Processing',
    description: 'Secure and timely salary payments through multiple disbursement channels'
  }
];

const KEY_BENEFITS = [
  {
    title: "Guaranteed Accuracy",
    description: "99.9% accuracy rate with comprehensive error detection and correction processes"
  },
  {
    title: "Cost Efficiency",
    description: "Significant reduction in payroll administration costs and resource requirements"
  },
  {
    title: "Full Compliance",
    description: "Expert management of tax regulations and labor law compliance across jurisdictions"
  },
  {
    title: "Time Liberation",
    description: "Free internal resources to focus on strategic business activities and growth initiatives"
  }
];

export default function PayrollManagementPage() {
  return (
    <div className="min-h-screen bg-[#f7fffc]">
      {/* Hero Section */}
      <section className="relative h-auto min-h-[50vh] py-12 flex items-center justify-center">
        <Image
          src="/images/payroll-outsourcing.png"
          alt="Payroll Management Services"
          fill
          className="object-cover brightness-[0.4]"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl text-center mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Precision
              <span className="bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text block">
                Payroll Management
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-6">
              Experience flawless payroll processing with our comprehensive outsourcing solutions that guarantee accuracy, compliance, and timely payments while reducing your administrative burden.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 px-6 py-3 text-base font-semibold transition-colors">
                Explore Payroll Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {PAYROLL_STATS.map((stat, index) => (
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
              Complete Payroll Solutions
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              From calculation to compliance, our comprehensive payroll services ensure accuracy, timeliness, and peace of mind for your organization.
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
              Our Payroll Process
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              A streamlined, secure, and accurate payroll processing workflow that ensures timely payments and complete compliance.
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
                Payroll Excellence Benefits
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Experience the advantages of professional payroll management that drives operational efficiency and strategic focus.
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
              Ready for Perfect Payroll?
            </h2>
            <p className="text-base md:text-lg mb-6 text-blue-100">
              Discover how our payroll management services can ensure accuracy, compliance, and efficiency for your organization.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-base font-semibold transition-colors">
                Transform Your Payroll
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}