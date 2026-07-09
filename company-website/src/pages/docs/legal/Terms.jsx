import { Helmet } from 'react-helmet-async';
import DocsLayout from '../DocsLayout';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Hemmingway Technologies</title>
        <meta name="description" content="Terms and conditions governing your use of Hemmingway Technologies services." />
      </Helmet>
      <DocsLayout title="Terms of Service" updated="July 9, 2026">
        <section className="docs-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the website and services of Hemmingway Technologies ("we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        </section>

        <section className="docs-section">
          <h2>2. Services</h2>
          <p>Hemmingway Technologies provides custom software development, AI/ML solutions, cloud architecture, cybersecurity, mobile and web development, and API integration services. The specific scope, deliverables, and terms of any engagement are defined in a separate Statement of Work (SOW) or service agreement signed between both parties.</p>
        </section>

        <section className="docs-section">
          <h2>3. Use of Website</h2>
          <p>You agree to use our website only for lawful purposes and in a manner that does not infringe upon the rights of others. You must not:</p>
          <ul>
            <li>Use the site in any way that violates applicable laws or regulations</li>
            <li>Transmit unsolicited or unauthorised advertising material</li>
            <li>Attempt to gain unauthorised access to any part of our systems</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use of the website</li>
          </ul>
        </section>

        <section className="docs-section">
          <h2>4. Intellectual Property</h2>
          <p>All content on this website — including text, graphics, logos, images, and software — is the property of Hemmingway Technologies and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our explicit written permission.</p>
          <p>Custom software developed for clients remains subject to the intellectual property terms defined in each individual service agreement.</p>
        </section>

        <section className="docs-section">
          <h2>5. Confidentiality</h2>
          <p>Any information you share with us regarding your business, project requirements, or operations will be treated as confidential and will not be disclosed to third parties without your consent, except as required by law.</p>
        </section>

        <section className="docs-section">
          <h2>6. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Hemmingway Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim.</p>
        </section>

        <section className="docs-section">
          <h2>7. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them.</p>
        </section>

        <section className="docs-section">
          <h2>8. Modifications</h2>
          <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of our website constitutes acceptance of the modified terms.</p>
        </section>

        <section className="docs-section">
          <h2>9. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.</p>
        </section>

        <section className="docs-section">
          <h2>10. Contact</h2>
          <p>For questions about these Terms, contact us at:<br />
          <a href="mailto:hemmingways.tech@gmail.com" className="docs-link">hemmingways.tech@gmail.com</a></p>
        </section>
      </DocsLayout>
    </>
  );
}
