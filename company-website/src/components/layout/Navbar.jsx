import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Brain, Cloud, Lock, Moon, Sun } from 'lucide-react';

/* ─────────────────────────────────────────
   Aceternity-style dropdown components
───────────────────────────────────────── */

function HoveredLink({ href, to, children }) {
  const style = {
    display: 'block',
    padding: '6px 0',
    color: 'var(--text)',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'color 0.2s',
    textDecoration: 'none',
  };
  const onEnter = e => (e.currentTarget.style.color = 'var(--primary)');
  const onLeave = e => (e.currentTarget.style.color = 'var(--text)');
  if (to) return <Link to={to} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</Link>;
  return <a href={href} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</a>;
}

function ProductItem({ title, description, href, Icon }) {
  return (
    <a
      href={href}
      className="product-item"
      style={{ textDecoration: 'none', display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '8px', borderRadius: '10px', transition: 'background 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-light)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'var(--primary-light)', border: '1px solid rgba(99,103,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
        <Icon size={24} />
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-bright)', marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{description}</div>
      </div>
    </a>
  );
}

function MenuItem({ label, children, active, setActive }) {
  const isOpen = active === label;
  return (
    <div
      className="menu-item-wrap"
      onMouseEnter={() => setActive(label)}
      onMouseLeave={() => setActive(null)}
    >
      <button className={`menu-item-btn${isOpen ? ' open' : ''}`}>
        {label}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', marginLeft: 4 }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className={`menu-dropdown${isOpen ? ' open' : ''}`}>
        <div className="menu-dropdown-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Encrypted text hook (for nav hover)
───────────────────────────────────────── */
function useEncrypt(text, active) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const raf = useRef(null);
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let iter = 0;
    const step = () => {
      setDisplay(text.split('').map((c, i) => c === ' ' ? ' ' : i < iter ? text[i] : chars[Math.floor(Math.random() * chars.length)]).join(''));
      if (iter < text.length) { iter += 0.7; raf.current = requestAnimationFrame(step); }
      else setDisplay(text);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [active, text]);
  return display;
}

function NavLink({ to, label, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  const display = useEncrypt(label.toUpperCase(), hovered);
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`nav-link${isActive ? ' active' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {display}
    </Link>
  );
}

/* ─────────────────────────────────────────
   Theme Toggle
───────────────────────────────────────── */
function ThemeToggle({ theme, toggle }) {
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" />
        <span className="theme-icon">{theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}</span>
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────── */
export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setActiveMenu(null); window.scrollTo(0, 0); }, [location.pathname]);

  const isActive = p => location.pathname === p;

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} onMouseLeave={() => setActiveMenu(null)}>
        <div className="nav-inner">

          {/* ── LOGO: leaf icon + brand text ── */}
          <Link to="/" className="nav-logo">
            <img src="/logo-icon.webp" alt="" className="nav-logo-icon" />
            <div className="nav-logo-text">
              <span className="nav-logo-name">Hemmingway</span>
              <span className="nav-logo-sub">Technologies</span>
            </div>
          </Link>

          {/* ── CENTER: Aceternity-style menu ── */}
          <div className="nav-menu-center">
            <NavLink to="/" label="Home" isActive={isActive('/')} />
            <NavLink to="/about" label="About" isActive={isActive('/about')} />
            <NavLink to="/team" label="Team" isActive={isActive('/team')} />
            {/* <NavLink to="/blog" label="Blog" isActive={isActive('/blog')} /> */}

            <MenuItem label="Solutions" active={activeMenu} setActive={setActiveMenu}>
              <div className="dropdown-products">
                <ProductItem Icon={Rocket} title="Launchpad" description="From idea to production-ready MVP in 6 weeks." href="#" />
                <ProductItem Icon={Brain} title="AI Suite" description="Custom LLM integrations & intelligent automation." href="#" />
                <ProductItem Icon={Cloud} title="CloudOps" description="Managed cloud infrastructure at enterprise scale." href="#" />
                <ProductItem Icon={Lock} title="SecureStack" description="Full-stack security audit & hardening service." href="#" />
              </div>
            </MenuItem>
          </div>

          {/* ── RIGHT ── */}
          <div className="nav-cta">
            <ThemeToggle theme={theme} toggle={toggleTheme} />
            <Link to="/contact" className="nav-btn primary">
              Get in Touch
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        <div className="nav-inner-mob">

          <div className="logo">
            {/* ── LOGO: leaf icon + brand text ── */}
            <Link to="/" className="nav-logo">
              <img src="/logo-icon.webp" alt="" className="nav-logo-icon" />
              <div className="nav-logo-text">
                <span className="nav-logo-name">Hemmingway</span>
                <span className="nav-logo-sub">Technologies</span>
              </div>
            </Link>

            {/* ── RIGHT ── */}
            <div className="nav-cta">
              <ThemeToggle theme={theme} toggle={toggleTheme} />
              <Link to="/contact" className="nav-btn primary">
                Get in Touch
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
          {/* ── CENTER: Aceternity-style menu ── */}
          <div className="nav-menu-center">
            <NavLink to="/" label="Home" isActive={isActive('/')} />
            <NavLink to="/about" label="About" isActive={isActive('/about')} />
            <NavLink to="/team" label="Team" isActive={isActive('/team')} />
            {/* <NavLink to="/blog" label="Blog" isActive={isActive('/blog')} /> */}

            <MenuItem label="Solutions" active={activeMenu} setActive={setActiveMenu}>
              <div className="dropdown-products">
                <ProductItem Icon={Rocket} title="Launchpad" description="From idea to production-ready MVP in 6 weeks." href="#" />
                <ProductItem Icon={Brain} title="AI Suite" description="Custom LLM integrations & intelligent automation." href="#" />
                <ProductItem Icon={Cloud} title="CloudOps" description="Managed cloud infrastructure at enterprise scale." href="#" />
                <ProductItem Icon={Lock} title="SecureStack" description="Full-stack security audit & hardening service." href="#" />
              </div>
            </MenuItem>
          </div>
        </div>
      </nav>
    </>
  );
}
