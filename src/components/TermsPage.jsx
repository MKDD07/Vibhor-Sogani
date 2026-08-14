import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function TermsPage() {
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
            Terms of Use
          </h1>
          <p className="mt-3 text-xs uppercase tracking-widest text-mute">
            Last updated: December 2024
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base font-light text-mute leading-relaxed border-t border-mute/20 pt-8">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">1. Website Ownership</h2>
            <p>
              This website (<a href="https://www.vibhorsogani.com/" target="_blank" rel="noreferrer" className="text-bronze-light hover:underline">www.vibhorsogani.com</a>) is operated by Vibhor Sogani. The terms &ldquo;we,&rdquo; &ldquo;us,&rdquo; and &ldquo;our&rdquo; refer to Vibhor Sogani and his design practice. The term &ldquo;you&rdquo; refers to any person accessing or using this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">2. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to images of designs, artwork, text, graphics, logos, video content, and downloadable files, is the exclusive intellectual property of Vibhor Sogani, unless otherwise noted. Our design philosophy and approach aim to offer original, high-concept pieces. You may not:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-parchment/80">
              <li>Reproduce, distribute, or transmit any material from this website for commercial purposes without our express written consent.</li>
              <li>Modify or use any content for derivative works, except with explicit prior permission.</li>
            </ul>
            <p>
              We take the intellectual property rights of our designs seriously, and any infringement will be pursued to the fullest extent of the law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">3. Use of Website</h2>
            <p>
              This website is intended for personal and non-commercial use. The content posted on <a href="https://www.vibhorsogani.com/" target="_blank" rel="noreferrer" className="text-bronze-light hover:underline">www.vibhorsogani.com</a> may not be published, reproduced, copied, modified, uploaded, transmitted, posted, or distributed in any way, without prior written consent. The materials on <a href="https://www.vibhorsogani.com/" target="_blank" rel="noreferrer" className="text-bronze-light hover:underline">www.vibhorsogani.com</a> are provided for informational purposes only. Vibhor Sogani does not grant any express or implied right to you under any license, copyrights, patents, trademarks or trade secret information. Use of any image (photograph, illustration, computer rendering, etc.) from <a href="https://www.vibhorsogani.com/" target="_blank" rel="noreferrer" className="text-bronze-light hover:underline">www.vibhorsogani.com</a> requires written permission from Vibhor Sogani.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">4. Disclaimer</h2>
            <p>
              The content of this website is provided on an &ldquo;as-is&rdquo; basis, without warranties of any kind, either expressed or implied. While every effort is made to ensure the accuracy and timeliness of information, we make no representations about the completeness or suitability of the materials for any particular purpose. We continually update our portfolio and creative process; therefore, information may change without notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">5. Limitations of Liability</h2>
            <p>
              Under no circumstances will Vibhor Sogani or his company be liable for any damages, including indirect, incidental, or consequential damages, arising out of or in connection with the use of this website or the information contained herein. This limitation of liability applies to the fullest extent permitted by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">6. External Links and Third-Party Content</h2>
            <p>
              In the spirit of global design collaborations and inspiration, our website may contain links to external websites operated by third parties. These links are provided for your convenience only, and we do not endorse or accept responsibility for the content of these external sites. Vibhor Sogani is not responsible for any loss or damage resulting from your interaction with these third-party websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">7. Privacy Policy</h2>
            <p>
              We respect your privacy and are committed to protecting your personal data. Please refer to our{" "}
              <Link to="/privacy-policy" className="text-bronze-light hover:underline">
                Privacy Policy
              </Link>{" "}
              for more detailed information on how we collect, use, and safeguard your information, in line with the highest standards of data protection seen in international design practices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">8. Violation</h2>
            <p>
              If you violate any of these Terms of Use or if you misuse this website, you agree to defend, indemnify and hold harmless Vibhor Sogani and his Studio, its officers, directors, partners, employees, agents and licensees from any and all liability including costs, expenses and attorneys&rsquo; fees that arise out of or are related to your violation or misuse.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">9. Jurisdiction and Applicable Law</h2>
            <p>
              These terms of use are governed by and construed in accordance with the laws of India. Any disputes or claims arising out of or related to these terms shall be exclusively subject to the jurisdiction of the courts in Gurugram, Haryana. We believe in ethical practices that align with the global standards embraced by the creative community.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">10. Amendments to These Terms</h2>
            <p>
              We reserve the right to update these terms and conditions at any time without prior notice, reflecting our evolving practice and ethos. Continued use of the website following the posting of such changes constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium text-parchment">11. Contact Us</h2>
            <p>
              If you have any questions about these terms, or about Vibhor Sogani&rsquo;s work and how it aligns with the best practices in contemporary design, please contact us:
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
