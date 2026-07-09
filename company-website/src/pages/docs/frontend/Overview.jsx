import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DocsLayout from '../DocsLayout';

export default function Overview() {
  return (
    <>
      <Helmet>
        <title>Frontend Overview | Hemmingway Technologies Docs</title>
      </Helmet>
      <DocsLayout title="Frontend Overview">
        <section className="docs-section">
          <h2>Introduction</h2>
          <p>This documentation covers the frontend architecture, design system, and component library powering the Hemmingway Technologies company website. The site is a single-page React application built for performance, accessibility, and a polished user experience.</p>
        </section>

        <section className="docs-section">
          <h2>Quick Links</h2>
          <div className="docs-card-grid">
            <Link to="/docs/frontend/design" className="docs-card">
              <span className="docs-card-icon">🎨</span>
              <strong>Design System</strong>
              <p>Colours, typography, spacing, and theming tokens.</p>
            </Link>
            <Link to="/docs/frontend/components" className="docs-card">
              <span className="docs-card-icon">⚡</span>
              <strong>Components</strong>
              <p>Reusable UI components — CometCard, EncryptedText, SIHGallery, and more.</p>
            </Link>
            <Link to="/docs/frontend/stack" className="docs-card">
              <span className="docs-card-icon">🛠️</span>
              <strong>Tech Stack</strong>
              <p>Libraries, tools, and build pipeline used in this project.</p>
            </Link>
          </div>
        </section>

        <section className="docs-section">
          <h2>Project Structure</h2>
          <div className="docs-code-block">
            <pre>{`src/
├── components/
│   ├── layout/        # Navbar, Footer
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── pages/
│   ├── docs/          # This documentation
│   └── ...            # Home, About, Team, Contact, Blog
└── styles/            # Global CSS files`}</pre>
          </div>
        </section>

        <section className="docs-section">
          <h2>Getting Started</h2>
          <p>Prerequisites: Node.js 18+ and npm 9+.</p>
          <div className="docs-code-block">
            <pre>{`# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build`}</pre>
          </div>
        </section>
      </DocsLayout>
    </>
  );
}
