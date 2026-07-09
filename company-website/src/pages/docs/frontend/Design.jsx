import { Helmet } from 'react-helmet-async';
import DocsLayout from '../DocsLayout';

const COLORS = [
  { name: '--primary',     value: '#6367F1', label: 'Primary / Indigo' },
  { name: '--primary-2',   value: '#818CF8', label: 'Primary Light' },
  { name: '--bg',          value: '#04040A', label: 'Background (dark)' },
  { name: '--card-bg',     value: 'rgba(255,255,255,0.03)', label: 'Card Surface' },
  { name: '--text',        value: '#C8C8D4', label: 'Body Text' },
  { name: '--text-muted',  value: '#6B6B80', label: 'Muted Text' },
  { name: '--border',      value: 'rgba(255,255,255,0.08)', label: 'Border' },
];

export default function Design() {
  return (
    <>
      <Helmet>
        <title>Design System | Hemmingway Technologies Docs</title>
      </Helmet>
      <DocsLayout title="Design System">
        <section className="docs-section">
          <h2>Theming</h2>
          <p>The site supports <strong>dark</strong> and <strong>light</strong> modes driven by the <code>data-theme</code> attribute on <code>&lt;html&gt;</code>. All colours are CSS custom properties — components never hardcode colour values.</p>
          <div className="docs-code-block">
            <pre>{`// Toggling theme
document.documentElement.setAttribute('data-theme', 'light' | 'dark');
localStorage.setItem('theme', 'light' | 'dark');`}</pre>
          </div>
        </section>

        <section className="docs-section">
          <h2>Colour Tokens</h2>
          <div className="docs-color-grid">
            {COLORS.map(c => (
              <div key={c.name} className="docs-color-swatch">
                <div className="docs-color-preview" style={{ background: c.value }} />
                <div>
                  <code className="docs-color-var">{c.name}</code>
                  <p className="docs-color-label">{c.label}</p>
                  <p className="docs-color-value">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="docs-section">
          <h2>Typography</h2>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead>
                <tr><th>Token</th><th>Value</th><th>Usage</th></tr>
              </thead>
              <tbody>
                <tr><td><code>--font-sans</code></td><td>Inter, system-ui</td><td>All body text</td></tr>
                <tr><td><code>--font-mono</code></td><td>JetBrains Mono</td><td>Code blocks</td></tr>
                <tr><td>Hero H1</td><td>clamp(48px, 7vw, 80px)</td><td>Page hero headings</td></tr>
                <tr><td>Section H2</td><td>clamp(32px, 5vw, 52px)</td><td>Section headings</td></tr>
                <tr><td>Body</td><td>16–18px / line-height 1.7</td><td>Paragraphs</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="docs-section">
          <h2>Spacing & Layout</h2>
          <p>The site uses a 24px base grid with a max-width container of <strong>1200px</strong> centred via <code>.container</code>. Sections use <code>padding: 100px 0</code> on desktop, collapsing to <code>60px 0</code> on mobile.</p>
        </section>

        <section className="docs-section">
          <h2>Gradient Text</h2>
          <p>Apply the <code>.gradient-text</code> utility class to any inline element for the indigo → violet gradient used in headings.</p>
          <div className="docs-code-block">
            <pre>{`<span className="gradient-text">Stand-out text</span>`}</pre>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
