import { Link } from 'react-router-dom';

const COLS = [
  {
    title: 'Pages',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Team', to: '/team' },
      { label: 'Contact', to: '/contact' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Twitter', href: 'https://twitter.com' },
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Careers', href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ftr">
      {/* top separator */}
      <div className="ftr-sep" />

      {/* ── MAIN ROW ── */}
      <div className="ftr-main">
        {/* LEFT: brand + copyright */}
        <div className="ftr-brand">
          <div className="ftr-brand-id">
            <img src="/logo-icon.webp" alt="Hemmingway" className="ftr-brand-icon" />
            <span className="ftr-brand-name">Hemmingway Technologies</span>
          </div>
          <p className="ftr-copyright">
            © copyright Hemmingway Technologies {year}.<br />All rights reserved.
          </p>
        </div>

        {/* RIGHT: link columns */}
        <div className="ftr-cols">
          {COLS.map(col => (
            <div key={col.title} className="ftr-col">
              <p className="ftr-col-title">{col.title}</p>
              <ul>
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className="ftr-link">{link.label}</Link>
                    ) : (
                      <a href={link.href} className="ftr-link" target="_blank" rel="noopener noreferrer">{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── GIANT WATERMARK ── */}
      <div className="ftr-watermark" aria-hidden="true">Hemmingway</div>
      
    </footer>
  );
}
