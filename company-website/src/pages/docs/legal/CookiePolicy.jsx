import { Helmet } from 'react-helmet-async';
import DocsLayout from '../DocsLayout';

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | Hemmingway Technologies</title>
        <meta name="description" content="How Hemmingway Technologies uses cookies and similar tracking technologies." />
      </Helmet>
      <DocsLayout title="Cookie Policy" updated="July 9, 2026">
        <section className="docs-section">
          <h2>1. What Are Cookies</h2>
          <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners. Cookies can be "persistent" (remaining on your device until deleted) or "session" (deleted when you close your browser).</p>
        </section>

        <section className="docs-section">
          <h2>2. Cookies We Use</h2>
          <p>We use the following categories of cookies:</p>
          <ul>
            <li><strong>Strictly Necessary Cookies:</strong> Essential for the website to function. These cannot be disabled. Examples include cookies that remember your theme preference (light/dark mode).</li>
            <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymised analytics data (page views, time on page, bounce rate).</li>
            <li><strong>Functionality Cookies:</strong> Remember choices you make (such as your preferred display settings) to provide a more personalised experience.</li>
          </ul>
        </section>

        <section className="docs-section">
          <h2>3. Specific Cookies Used</h2>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Cookie Name</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>theme</code></td>
                  <td>Stores your light/dark mode preference</td>
                  <td>Persistent (localStorage)</td>
                </tr>
                <tr>
                  <td>Analytics</td>
                  <td>Anonymised page view tracking</td>
                  <td>Session</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="docs-section">
          <h2>4. Managing Cookies</h2>
          <p>You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
          <ul>
            <li>View what cookies are stored and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block all cookies from specific sites</li>
            <li>Block all cookies from being set</li>
          </ul>
          <p>Please note that disabling certain cookies may affect the functionality of our website.</p>
        </section>

        <section className="docs-section">
          <h2>5. Third-Party Cookies</h2>
          <p>Our website does not currently use third-party advertising or tracking cookies. Any third-party tools we integrate are configured to anonymise data and respect user privacy.</p>
        </section>

        <section className="docs-section">
          <h2>6. Contact</h2>
          <p>For questions about our use of cookies, contact us at:<br />
          <a href="mailto:hemmingways.tech@gmail.com" className="docs-link">hemmingways.tech@gmail.com</a></p>
        </section>
      </DocsLayout>
    </>
  );
}
