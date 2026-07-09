import { Helmet } from 'react-helmet-async';
import DocsLayout from '../DocsLayout';

export default function Disclaimer() {
  return (
    <>
      <Helmet>
        <title>Disclaimer | Hemmingway Technologies</title>
        <meta name="description" content="Important disclaimers regarding the use of Hemmingway Technologies website and services." />
      </Helmet>
      <DocsLayout title="Disclaimer" updated="July 9, 2026">
        <section className="docs-section">
          <h2>1. General Information</h2>
          <p>The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and accurate, Hemmingway Technologies makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on it.</p>
        </section>

        <section className="docs-section">
          <h2>2. No Professional Advice</h2>
          <p>The content on this website does not constitute professional legal, financial, technical, or business advice. Any reliance you place on such information is strictly at your own risk. Before making any business or technical decisions, please consult with a qualified professional.</p>
        </section>

        <section className="docs-section">
          <h2>3. Results Disclaimer</h2>
          <p>Any case studies, examples, or testimonials presented on this website are illustrative only and do not guarantee similar results for your specific project or business. Individual results will vary depending on project complexity, requirements, and other factors.</p>
        </section>

        <section className="docs-section">
          <h2>4. Availability</h2>
          <p>We do not guarantee that our website will be available at all times or that it will be free from errors or viruses. We reserve the right to withdraw or amend our services without notice.</p>
        </section>

        <section className="docs-section">
          <h2>5. External Links</h2>
          <p>Through this website, you may be able to link to other websites not under the control of Hemmingway Technologies. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.</p>
        </section>

        <section className="docs-section">
          <h2>6. Technology Disclaimer</h2>
          <p>Software development inherently involves technical complexity and risk. While we apply professional standards and best practices to every engagement, we cannot warrant that software developed will be entirely free from bugs or will meet every business requirement without iterative refinement. All deliverables are subject to the acceptance criteria defined in the relevant service agreement.</p>
        </section>

        <section className="docs-section">
          <h2>7. AI and Machine Learning</h2>
          <p>AI and machine learning systems built by Hemmingway Technologies are designed to augment human decision-making, not replace it. Outputs from AI systems should be reviewed by qualified personnel before being acted upon. We disclaim liability for decisions made solely on the basis of AI-generated outputs.</p>
        </section>

        <section className="docs-section">
          <h2>8. Contact</h2>
          <p>For questions about this Disclaimer, contact us at:<br />
          <a href="mailto:hemmingways.tech@gmail.com" className="docs-link">hemmingways.tech@gmail.com</a></p>
        </section>
      </DocsLayout>
    </>
  );
}
