import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import './styles/nav-hero.css';
import './styles/sections.css';
import './styles/pages.css';
import './styles/responsive.css';

import Loader from './components/ui/Loader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Team from './pages/Team';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/docs/legal/PrivacyPolicy';
import Terms from './pages/docs/legal/Terms';
import CookiePolicy from './pages/docs/legal/CookiePolicy';
import Disclaimer from './pages/docs/legal/Disclaimer';
import DocsOverview from './pages/docs/frontend/Overview';
import DocsDesign from './pages/docs/frontend/Design';
import DocsComponents from './pages/docs/frontend/Components';
import DocsStack from './pages/docs/frontend/Stack';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent({ theme, toggleTheme }) {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/docs/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/docs/legal/terms" element={<Terms />} />
          <Route path="/docs/legal/cookie-policy" element={<CookiePolicy />} />
          <Route path="/docs/legal/disclaimer" element={<Disclaimer />} />
          <Route path="/docs/frontend/overview" element={<DocsOverview />} />
          <Route path="/docs/frontend/design" element={<DocsDesign />} />
          <Route path="/docs/frontend/components" element={<DocsComponents />} />
          <Route path="/docs/frontend/stack" element={<DocsStack />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <BrowserRouter>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <AppContent theme={theme} toggleTheme={toggleTheme} />
    </BrowserRouter>
  );
}
