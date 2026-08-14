import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-ink text-parchment pt-28 sm:pt-36 pb-24 px-6 lg:px-12 select-none">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-[11px] uppercase tracking-[0.3em] text-bronze font-semibold block mb-3">
            Studio Vibhor Sogani
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-light text-parchment leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-xs uppercase tracking-widest text-mute">
            Last updated: December 2024
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base font-light text-mute leading-relaxed border-t border-mute/20 pt-8">
          <div className="p-6 rounded-xl bg-surface-2/60 border border-mute/15 text-parchment/90">
            <p>
              At Vibhor Sogani Studio (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), we respect and are committed to protecting the privacy of our visitors and clients. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.vibhorsogani.com/" target="_blank" rel="noreferrer" className="text-bronze-light hover:underline">www.vibhorsogani.com</a>. By accessing this website, you consent to the terms of this Privacy Policy.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-base sm:text-lg font-medium text-parchment">1. Information We Collect</h2>
            <p>We may collect both personal data and non-personal data about you when you interact with our website. The information collected includes:</p>
            
            <div className="space-y-3 pl-3 border-l border-bronze/40">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-parchment">a) Personal Data:</h3>
              <p><strong className="text-parchment font-medium">Contact Information:</strong> Your name, email address, phone number, and postal address.</p>
            </div>

            <div className="space-y-3 pl-3 border-l border-bronze/40">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-parchment">b) Non-Personal Data:</h3>
              <p><strong className="text-parchment font-medium">Usage Data:</strong> Information about how you use our website, such as pages viewed, time spent on the site, browser type, IP address, and referring site.</p>
              <p><strong className="text-parchment font-medium">Cookies:</strong> We use cookies to enhance your browsing experience. Cookies are small data files placed on your device, allowing us to understand how you interact with our website and improve its functionality.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">2. How We Use Your Information</h2>
            <p>We use the information collected for the following purposes, in line with the practices of leading designers and design firms:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-parchment/80">
              <li><strong className="text-parchment font-medium">To Provide Services:</strong> To process and respond to inquiries, orders, or collaborations related to our installations and artwork.</li>
              <li><strong className="text-parchment font-medium">To Improve Our Website:</strong> We analyze data to enhance the performance and user experience of our website, ensuring that it reflects the high standards of design and accessibility.</li>
              <li><strong className="text-parchment font-medium">To Communicate with You:</strong> To send newsletters, updates about exhibitions, product launches, and other marketing communications, if you have opted in to receive them.</li>
              <li><strong className="text-parchment font-medium">To Comply with Legal Obligations:</strong> To fulfill any legal obligations or defend against claims, where necessary.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">3. Sharing Your Information</h2>
            <p>We respect the privacy of your information and do not sell, rent, or trade your personal data to third parties. However, we may share your information in the following situations:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-parchment/80">
              <li><strong className="text-parchment font-medium">Service Providers:</strong> We may share data with trusted third-party service providers (e.g., website hosting, email marketing services, payment processors) to help us operate the website and provide services. These providers have access to your information only to perform tasks on our behalf and are obligated to protect it.</li>
              <li><strong className="text-parchment font-medium">Legal Compliance:</strong> If required by law, we may disclose your personal information in response to a valid legal request or to protect the rights, property, or safety of Vibhor Sogani, our clients, or others.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">4. Data Security</h2>
            <p>
              We implement security measures that are aligned with global standards to protect your data from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">5. Your Data Protection Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-parchment/80">
              <li><strong className="text-parchment font-medium">Access:</strong> The right to request access to the personal data we hold about you.</li>
              <li><strong className="text-parchment font-medium">Correction:</strong> The right to request that we correct any inaccurate or incomplete personal data.</li>
              <li><strong className="text-parchment font-medium">Deletion:</strong> The right to request that we delete your personal data, subject to certain conditions.</li>
              <li><strong className="text-parchment font-medium">Objection:</strong> The right to object to the processing of your personal data for marketing purposes.</li>
            </ul>
            <p>To exercise any of these rights, please contact us using the details provided below.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">6. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites, including online galleries, press features, or design collaborations. These websites are governed by their own privacy policies, and we are not responsible for their content or practices. We recommend reviewing the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">7. International Data Transfers</h2>
            <p>
              As a globally recognized design practice, your data may be transferred to and processed in countries other than your own. These countries may have different data protection laws than your country of residence. We take steps to ensure that appropriate safeguards are in place to protect your data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">8. Retention of Data</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">9. Changes to This Policy</h2>
            <p>
              We reserve the right to update this Privacy Policy at any time, reflecting changes in our practices or legal requirements. Any updates will be posted on this page, and we encourage you to review this policy periodically to stay informed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">10. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy or how we handle your personal data, please contact us at:
            </p>
            <p className="text-parchment font-normal">
              Email: <a href="mailto:info@vibhorsogani.com" className="text-bronze-light hover:underline">info@vibhorsogani.com</a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-mute/15 flex items-center justify-between text-xs uppercase tracking-widest text-mute">
          <span>&copy; {new Date().getFullYear()} Vibhor Sogani</span>
          <Link to="/" className="text-bronze hover:text-bronze-light transition-colors">
            &larr; Return to Studio
          </Link>
        </div>
      </div>
    </main>
  );
}
