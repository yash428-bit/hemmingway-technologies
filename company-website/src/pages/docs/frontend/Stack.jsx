import { Helmet } from 'react-helmet-async';
import DocsLayout from '../DocsLayout';

const STACK = [
  { category: 'Core',        items: [{ name: 'React 18',      role: 'UI framework' }, { name: 'Vite',           role: 'Build tool & dev server' }, { name: 'React Router v6', role: 'Client-side routing' }] },
  { category: 'Styling',     items: [{ name: 'Vanilla CSS',   role: 'Custom properties, CSS Grid, Flexbox' }, { name: 'GSAP',          role: 'Scroll-triggered animations' }] },
  { category: 'UI & Icons',  items: [{ name: 'Lucide React',  role: 'Icon library' }, { name: 'React Helmet Async', role: 'SEO meta tags per page' }] },
  { category: 'Backend / Email', items: [{ name: 'Express.js', role: 'API server for contact form' }, { name: 'Resend',        role: 'Transactional email delivery' }] },
];

export default function Stack() {
  return (
    <>
      <Helmet>
        <title>Tech Stack | Hemmingway Technologies Docs</title>
      </Helmet>
      <DocsLayout title="Tech Stack">
        <section className="docs-section">
          <h2>Overview</h2>
          <p>The Hemmingway Technologies website is a lightweight, dependency-minimal React SPA. We favour native browser APIs and vanilla CSS over heavy frameworks, keeping bundle size small and performance high.</p>
        </section>

        {STACK.map(({ category, items }) => (
          <section className="docs-section" key={category}>
            <h2>{category}</h2>
            <div className="docs-table-wrap">
              <table className="docs-table">
                <thead><tr><th>Library / Tool</th><th>Role</th></tr></thead>
                <tbody>
                  {items.map(({ name, role }) => (
                    <tr key={name}>
                      <td><code>{name}</code></td>
                      <td>{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <section className="docs-section">
          <h2>Environment Variables</h2>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead><tr><th>Variable</th><th>Required</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>VITE_API_URL</code></td><td>Prod only</td><td>Backend API base URL (e.g. <code>https://api.yourdomain.com</code>). Omit in dev — Vite proxy handles it.</td></tr>
                <tr><td><code>RESEND_API_KEY</code></td><td>Yes</td><td>Resend API key for sending contact form emails.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="docs-section">
          <h2>Scripts</h2>
          <div className="docs-code-block">
            <pre>{`npm run dev      # Start Vite dev server (port 5173)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally`}</pre>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
