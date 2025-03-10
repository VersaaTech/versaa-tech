export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-8 text-center">
          Data Privacy Policy
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-600 mb-6">
            Versaa Tech is committed to protecting the privacy and security of your personal information. 
            This policy outlines how we collect, use, and protect the data you provide through our website 
            and services.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Data Collection</h2>
          <p className="text-gray-600 mb-4">
            We collect information when you:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>Submit forms on our website</li>
            <li>Contact us via email or phone</li>
            <li>Use our services</li>
          </ul>
          <p className="text-gray-600">
            Collected information may include: name, email address, phone number, company details, 
            and any other information you voluntarily provide.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Use of Data</h2>
          <p className="text-gray-600 mb-4">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>Provide and improve our services</li>
            <li>Respond to inquiries and requests</li>
            <li>Send relevant business communications</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Sharing</h2>
          <p className="text-gray-600 mb-6">
            We do not sell or rent your personal information to third parties. Data may be shared with:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Service providers assisting with our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Affiliated entities for business purposes</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
          <p className="text-gray-600 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Object to processing of your data</li>
            <li>Request deletion of your data</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Security</h2>
          <p className="text-gray-600 mb-6">
            We implement appropriate technical and organizational measures including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Secure server infrastructure</li>
            <li>Encryption of sensitive data</li>
            <li>Regular security audits</li>
            <li>Access controls</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookies</h2>
          <p className="text-gray-600 mb-6">
            Our website uses cookies to enhance user experience. You can manage cookie preferences 
            through your browser settings.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Policy Changes</h2>
          <p className="text-gray-600 mb-6">
            We may update this policy periodically. Changes will be posted on this page with an updated 
            effective date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
          <p className="text-gray-600 mb-2">
            For privacy-related inquiries or to exercise your rights, contact us at:
          </p>
          <div className="space-y-1">
            <p className="text-blue-600">
              Email: <a href="mailto:info@versaatech.com" className="hover:underline">info@versaatech.com</a>
            </p>
            <p className="text-gray-600">
              Address: Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E
            </p>
          </div>
        </section>
      </main>
    </div>
  )
} 