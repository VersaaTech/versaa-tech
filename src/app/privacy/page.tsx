import Link from 'next/link'
import { ArrowRight, Search, Users, Banknote, UserCog, Settings, BarChart3, Phone, Home } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-8 text-center">
          Data Privacy Policy
        </h1>

        <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>Last Updated:</strong> January 2025<br/>
            <strong>Effective Date:</strong> January 2025
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-600 mb-4">
            Versaatech (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, &quot;the Company&quot;) is committed to protecting the privacy and security of your personal data. 
            This Privacy Policy explains how we collect, use, process, store, and protect your personal information in accordance with 
            applicable data protection laws, including the Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (&quot;UAE PDPL&quot;), 
            the General Data Protection Regulation (&quot;GDPR&quot;), and other relevant privacy laws in jurisdictions where we operate.
          </p>
          <p className="text-gray-600 mb-6">
            We are a human resources consulting firm headquartered in the United Arab Emirates, providing recruitment services, 
            executive search, HR outsourcing, payroll management, and related professional services globally. This policy applies to all personal 
            data we process in connection with our services, whether collected online, offline, or through third parties, regardless of geographic location.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Legal Basis and Controller Information</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Data Controller</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 mb-2"><strong>Company Name:</strong> Versaatech</p>
              <p className="text-gray-600 mb-2"><strong>Address:</strong> Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E</p>
              <p className="text-gray-600 mb-2"><strong>Email:</strong> info@versaatech.com</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            We process personal data based on the following legal grounds under applicable data protection laws:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Consent:</strong> Where you have given clear consent for specific processing activities</li>
            <li><strong>Contract Performance:</strong> Where processing is necessary for the performance of our services</li>
            <li><strong>Legal Obligations:</strong> Where we are required to process data to comply with applicable laws</li>
            <li><strong>Legitimate Interests:</strong> Where processing is necessary for our legitimate business interests (balanced against your rights and interests)</li>
            <li><strong>Vital Interests:</strong> Where processing is necessary to protect someone&apos;s life or physical safety</li>
            <li><strong>Public Task:</strong> Where processing is necessary for the performance of a task carried out in the public interest</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Territorial Scope and Applicable Laws</h2>
          <p className="text-gray-600 mb-4">
            This Privacy Policy applies globally to the processing of personal data of:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>All individuals who use our services or interact with our platforms</li>
            <li>Job candidates and employees regardless of location</li>
            <li>Corporate clients and their representatives worldwide</li>
            <li>Website visitors from any jurisdiction</li>
          </ul>
          <p className="text-gray-600 mb-4">
            <strong>Specific Legal Frameworks:</strong>
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>UAE:</strong> Federal Decree-Law No. 45 of 2021 (PDPL) - primary jurisdiction</li>
            <li><strong>European Union:</strong> General Data Protection Regulation (GDPR) - for EU residents</li>
            <li><strong>United Kingdom:</strong> UK GDPR and Data Protection Act 2018</li>
            <li><strong>Other Jurisdictions:</strong> Applicable local data protection and privacy laws</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Types of Personal Data We Collect</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">From Job Candidates</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>Personal identification: Full name, date of birth, nationality, Emirates ID/passport details</li>
              <li>Contact information: Email address, phone numbers, residential address</li>
              <li>Professional information: CV/resume, work history, qualifications, certifications</li>
              <li>Educational background: Degrees, institutions, academic achievements</li>
              <li>References and background check information</li>
              <li>Salary expectations and employment preferences</li>
              <li>Interview notes and assessments</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">From Corporate Clients</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>Company information: Business name, license details, industry sector</li>
              <li>Contact persons: Names, job titles, email addresses, phone numbers</li>
              <li>Job requirements and specifications</li>
              <li>Contract and billing information</li>
              <li>Employee data for outsourcing and payroll services</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Website and Digital Interactions</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>Website usage data: IP address, browser type, device information</li>
              <li>Cookies and tracking technologies data</li>
              <li>Form submissions and inquiries</li>
              <li>Communication preferences</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. How We Collect Personal Data</h2>
          <p className="text-gray-600 mb-4">We collect personal data through:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>Direct submission via our website forms, email, or in-person meetings</li>
            <li>Job applications and CV submissions</li>
            <li>Client engagement and service delivery processes</li>
            <li>Third-party sources (with appropriate consent): recruitment platforms, referrals, public directories</li>
            <li>Cookies and automated technologies on our website</li>
            <li>Background verification services (with consent)</li>
            <li>Social media platforms and professional networks (LinkedIn, etc.)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Purposes of Processing Personal Data</h2>
          <p className="text-gray-600 mb-4">We process your personal data for the following purposes:</p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Recruitment Services</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Matching candidates with suitable job opportunities</li>
                <li>Conducting interviews and assessments</li>
                <li>Background verification and reference checks</li>
                <li>Facilitating placement and onboarding processes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">HR Outsourcing & Payroll Services</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Processing payroll and benefits administration</li>
                <li>Managing employee records and compliance</li>
                <li>Handling leave management and attendance tracking</li>
                <li>Providing HR advisory and consulting services</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Business Operations</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Client relationship management and service delivery</li>
                <li>Contract administration and billing</li>
                <li>Quality assurance and service improvement</li>
                <li>Legal compliance and regulatory reporting</li>
                <li>Business analytics and market research</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Data Sharing and Third-Party Disclosure</h2>
          <p className="text-gray-600 mb-4">
            We do not sell, rent, or trade your personal data. We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li><strong>Prospective Employers:</strong> With explicit consent for recruitment purposes</li>
            <li><strong>Service Providers:</strong> IT services, background check providers, cloud storage (with data processing agreements)</li>
            <li><strong>Professional Partners:</strong> Other recruitment firms, HR consultants (with appropriate safeguards)</li>
            <li><strong>Legal Authorities:</strong> When required by UAE law, court orders, or regulatory requests</li>
            <li><strong>Affiliated Entities:</strong> Within our corporate group for legitimate business purposes</li>
          </ul>
          <p className="text-gray-600 mb-6">
            All third parties are contractually bound to protect your data and use it only for specified purposes.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. International Data Transfers</h2>
          <p className="text-gray-600 mb-4">
            As a global HR services provider, we may transfer personal data across international borders. We implement appropriate safeguards to ensure your data remains protected:
          </p>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Transfer Mechanisms</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li><strong>Adequacy Decisions:</strong> To countries with recognized adequate protection levels</li>
              <li><strong>Standard Contractual Clauses:</strong> EU-approved data transfer agreements</li>
              <li><strong>Binding Corporate Rules:</strong> Internal data protection standards</li>
              <li><strong>Explicit Consent:</strong> Where you have specifically agreed to the transfer</li>
              <li><strong>Contract Necessity:</strong> Where transfer is essential for service delivery</li>
            </ul>
          </div>
          <p className="text-gray-600 mb-6">
            We ensure all international transfers comply with applicable data protection laws including UAE PDPL, GDPR, and other relevant regulations in both source and destination jurisdictions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Your Data Protection Rights</h2>
          <p className="text-gray-600 mb-4">You have the following rights regarding your personal data (specific rights may vary by jurisdiction):</p>
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Right of Access</h3>
              <p className="text-gray-600 text-sm">Request copies of your personal data and information about how it&apos;s processed</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Right to Rectification</h3>
              <p className="text-gray-600 text-sm">Request correction of inaccurate or incomplete personal data</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Right to Erasure</h3>
              <p className="text-gray-600 text-sm">Request deletion of your personal data under certain circumstances</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Right to Restrict Processing</h3>
              <p className="text-gray-600 text-sm">Request limitation of processing activities under specific conditions</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Right to Data Portability</h3>
              <p className="text-gray-600 text-sm">Request transfer of your data to another service provider</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Right to Object</h3>
              <p className="text-gray-600 text-sm">Object to processing based on legitimate interests or for marketing purposes</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Right to Withdraw Consent</h3>
              <p className="text-gray-600 text-sm">Withdraw consent at any time where processing is based on consent</p>
            </div>
          </div>
          <p className="text-gray-600 mt-4">
            To exercise these rights, contact us at info@versaatech.com. We will respond within the timeframes required by applicable law (typically 30 days for most jurisdictions, 1 month for GDPR requests).
          </p>
          <p className="text-gray-600 mt-2 text-sm">
            <strong>Note:</strong> Some rights may be limited or not available in certain jurisdictions. We will inform you of any limitations when you submit a request.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Data Security Measures</h2>
          <p className="text-gray-600 mb-4">
            We implement comprehensive technical and organizational security measures to protect your personal data:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Technical Safeguards</h3>
              <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                <li>SSL/TLS encryption for data transmission</li>
                <li>AES-256 encryption for data at rest</li>
                <li>Secure cloud infrastructure with UAE data residency</li>
                <li>Regular security updates and patches</li>
                <li>Multi-factor authentication</li>
                <li>Intrusion detection and prevention systems</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Organizational Measures</h3>
              <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                <li>Role-based access controls</li>
                <li>Regular staff training on data protection</li>
                <li>Confidentiality agreements with employees</li>
                <li>Annual security audits and assessments</li>
                <li>Incident response procedures</li>
                <li>Data retention and disposal policies</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Data Retention</h2>
          <p className="text-gray-600 mb-4">We retain personal data only as long as necessary for the purposes outlined in this policy:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Candidate Data:</strong> 3 years after last contact or until withdrawal of consent (may vary by jurisdiction)</li>
            <li><strong>Client Data:</strong> 7 years after contract termination for legal and tax compliance</li>
            <li><strong>Employee Data (Outsourcing):</strong> As required by applicable labor laws (minimum 5-7 years depending on jurisdiction)</li>
            <li><strong>Website Data:</strong> 2 years for analytics, immediately upon opt-out for marketing</li>
            <li><strong>Legal Documentation:</strong> As required by applicable laws and regulations in relevant jurisdictions</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Data Breach Notification</h2>
          <p className="text-gray-600 mb-4">
            In the event of a personal data breach that poses a risk to your rights and freedoms, we will:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>Notify relevant data protection authorities within required timeframes (72 hours for GDPR, UAE PDPL, and other applicable laws)</li>
            <li>Inform affected individuals without undue delay if the breach poses a high risk to their rights and freedoms</li>
            <li>Provide clear information about the nature of the breach, potential consequences, and mitigation measures</li>
            <li>Document all breaches and remedial actions taken for regulatory compliance</li>
            <li>Cooperate with supervisory authorities in their investigation and follow-up actions</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Cookies and Tracking Technologies</h2>
          <p className="text-gray-600 mb-4">Our website uses cookies and similar technologies for:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for website functionality</li>
            <li><strong>Analytics Cookies:</strong> To understand website usage and improve user experience</li>
            <li><strong>Marketing Cookies:</strong> To provide relevant advertisements (with consent)</li>
          </ul>
          <p className="text-gray-600 mb-6">
            You can manage cookie preferences through your browser settings or our cookie consent banner.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Children&apos;s Privacy</h2>
          <p className="text-gray-600 mb-6">
            Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information 
            from children. If we become aware that we have collected personal data from a child, we will take steps to delete 
            such information promptly.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">15. Complaints and Regulatory Contact</h2>
          <p className="text-gray-600 mb-4">
            If you believe we have not handled your personal data in accordance with this policy or applicable data protection laws, 
            you have the right to lodge a complaint with the relevant supervisory authority:
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 mb-2"><strong>UAE Data Protection Authority</strong></p>
              <p className="text-gray-600 text-sm">
                For UAE residents and UAE PDPL matters (contact details to be updated when officially published)
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 mb-2"><strong>EU Supervisory Authorities</strong></p>
              <p className="text-gray-600 text-sm">
                For EU residents: Contact your local data protection authority or visit 
                <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" className="text-blue-600 hover:underline"> EDPB member list</a>
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 mb-2"><strong>Other Jurisdictions</strong></p>
              <p className="text-gray-600 text-sm">
                Contact your local data protection or privacy authority as applicable
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">16. Policy Updates</h2>
          <p className="text-gray-600 mb-6">
            We may update this Privacy Policy periodically to reflect changes in our practices, services, or applicable laws. 
            We will notify you of material changes by posting the updated policy on our website and updating the &quot;Last Updated&quot; date. 
            For significant changes, we may provide additional notice via email or prominent website notification.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">17. Contact Information</h2>
          <p className="text-gray-600 mb-4">
            For any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-medium text-gray-800 mb-3">Privacy Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:info@versaatech.com" className="text-blue-600 hover:underline">info@versaatech.com</a>
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E
              </p>
              <p className="text-gray-700">
                <strong>Response Time:</strong> We aim to respond to all inquiries within 30 days
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            This Privacy Policy is governed by applicable data protection and privacy laws including the UAE Federal Decree-Law No. 45 of 2021
            on the Protection of Personal Data, GDPR, and other relevant laws in jurisdictions where we operate.
          </p>
        </div>

        {/* Internal Links Section - Prevents Dead-End Page */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Explore Versaatech HR Solutions
          </h2>
          <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Learn more about our comprehensive HR services designed to support your organization&apos;s growth and talent management needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Link
              href="/executive-search"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <Search className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">Executive Search Services</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-auto transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/rpo-recruitment"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">RPO Recruitment Solutions</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-auto transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/payroll-management"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <Banknote className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">Payroll Management</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-auto transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/fractional-hr-services"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <UserCog className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">Fractional HR Leadership</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-auto transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/hr-process-outsourcing"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <Settings className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">HR Process Outsourcing</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-auto transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/industry-benchmarking"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">Industry Benchmarking</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-auto transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all font-medium"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}