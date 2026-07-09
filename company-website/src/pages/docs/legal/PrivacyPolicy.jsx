import { Helmet } from 'react-helmet-async';
import DocsLayout from '../DocsLayout';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Hemmingway Technologies</title>
        <meta name="description" content="How Hemmingway Technologies collects, uses, and protects your personal information." />
      </Helmet>
      <DocsLayout title="Privacy Policy" updated="July 9, 2026">
        <section className="docs-section">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you fill out our contact form, subscribe to communications, or otherwise interact with our services. This includes:</p>
          <ul>
            <li><strong>Contact Information:</strong> Name, email address, phone number, and company name.</li>
            <li><strong>Project Information:</strong> Details about your project requirements, budget, and timeline shared through our contact form.</li>
            <li><strong>Communication Data:</strong> Records of correspondence when you contact us via email or our website.</li>
          </ul>
        </section>

        <section className="docs-section">
          <h2>2. Automatically Collected Information</h2>
          <p>When you visit our website, we automatically collect certain technical information including:</p>
          <ul>
            <li>IP address and browser type</li>
            <li>Pages visited and time spent on each page</li>
            <li>Referring URL and exit pages</li>
            <li>Device type and operating system</li>
          </ul>
        </section>

        <section className="docs-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your enquiries and provide requested services</li>
            <li>Send project updates and relevant communications</li>
            <li>Improve our website and service offerings</li>
            <li>Comply with legal obligations</li>
            <li>Prevent fraud and ensure website security</li>
          </ul>
        </section>

        <section className="docs-section">
          <h2>4. Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
          <ul>
            <li><strong>Service Providers:</strong> Trusted third parties who assist us in operating our website (e.g., email delivery via Resend).</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
          </ul>
        </section>

        <section className="docs-section">
          <h2>5. Data Retention</h2>
          <p>We retain personal data only as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. Contact form submissions are retained for a period of 2 years.</p>
        </section>

        <section className="docs-section">
          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have rights including:</p>
          <ul>
            <li>Right to access your personal data</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict or object to processing</li>
            <li>Right to data portability</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:hemmingways.tech@gmail.com" className="docs-link">hemmingways.tech@gmail.com</a>.</p>
        </section>

        <section className="docs-section">
          <h2>7. Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section className="docs-section">
          <h2>8. Contact</h2>
          <p>For questions about this Privacy Policy, contact us at:<br />
          <a href="mailto:hemmingways.tech@gmail.com" className="docs-link">hemmingways.tech@gmail.com</a></p>
        </section>
      </DocsLayout>
    </>
  );
}
