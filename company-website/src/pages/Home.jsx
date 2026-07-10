import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Brain, Cloud, Lock, Smartphone, Link as LinkIcon, BarChart3, Bot, Globe } from 'lucide-react';
import { useScrollReveal, useGSAPReveal } from '../hooks/useAnimations';
import { Helmet } from "react-helmet-async";
import EncryptedText from '../components/ui/EncryptedText';
import CometCard from '../components/ui/CometCard';
import Antigravity from '../components/ui/Antigravity';

const SERVICES = [
  { Icon: Zap, title: 'Custom Software', desc: 'Bespoke applications engineered for your unique business challenges, built to scale from day one.' },
  { Icon: Brain, title: 'AI & Machine Learning', desc: 'Intelligent systems that learn, adapt, and make data-driven decisions — transforming your operations.' },
  { Icon: Cloud, title: 'Cloud Architecture', desc: 'Scalable, resilient cloud infrastructure designed for 99.99% uptime and global performance.' },
  { Icon: Lock, title: 'Cybersecurity', desc: 'Enterprise-grade security solutions protecting your data, users, and business continuity.' },
  { Icon: Smartphone, title: 'Mobile & Web', desc: 'Beautiful, performant applications across every platform — web, iOS, and Android.' },
  { Icon: LinkIcon, title: 'API & Integrations', desc: 'Seamless connectivity between your tools, platforms, and third-party services.' },
];

const MARQUEE_ITEMS = [
  { Icon: Zap, text: 'Custom Software' },
  { Icon: Brain, text: 'Artificial Intelligence' },
  { Icon: Cloud, text: 'Cloud Solutions' },
  { Icon: Lock, text: 'Cybersecurity' },
  { Icon: Smartphone, text: 'Mobile Apps' },
  { Icon: LinkIcon, text: 'API Integration' },
  { Icon: BarChart3, text: 'Data Analytics' },
  { Icon: Bot, text: 'Process Automation' },
  { Icon: Globe, text: 'Web Platforms' },
];

export default function Home() {
  useScrollReveal();
  const servicesRef = useRef(null);
  const bentoRef = useRef(null);
  useGSAPReveal(servicesRef);
  useGSAPReveal(bentoRef);

  return (
    <>
      <Helmet>
        <title>Hemmingway Technologies | AI-Powered Software Safety Solutions</title>

        <meta
          name="description"
          content="Hemmingway Technologies develops AI-powered software, cloud infrastructure, cybersecurity, and industrial safety solutions."
        />
      </Helmet>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-content container">
          <div className="hero-badge">
            <span />
            Now Available — Enterprise Plans
          </div>
          <h1>
            Software That<br />
            <span className="gradient-text">Moves the World</span>
          </h1>
          <p className="hero-sub">
            <EncryptedText
              text="We build transformative digital products — from AI platforms to cloud-native infrastructure — for companies that refuse to stand still."
              speed={20}
            />
          </p>
          <div className="hero-cta">
            <Link to="/contact" className="btn-primary">
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link to="/about" className="btn-ghost">Our Story</Link>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <div key={i} className="marquee-inner">
              {MARQUEE_ITEMS.map((item, j) => {
                const IconComponent = item.Icon;
                return (
                  <div key={j} className="marquee-item">
                    <IconComponent size={18} style={{ display: 'inline-block', marginRight: '8px' }} />
                    {item.text}
                    {j < MARQUEE_ITEMS.length - 1 && <span style={{ margin: '0 12px', opacity: 0.2 }}>·</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="services" id="services" ref={servicesRef}>
        <div className="container">
          <div className="section-header fade-up">
            <div className="tag">What We Do</div>
            <h2>End-to-end software<br />engineering excellence</h2>
            <p>From concept to deployment, we handle every layer of your digital stack with precision and craft.</p>
          </div>
          <div className="services-grid" style={{ marginTop: '64px' }}>
            {SERVICES.map((s, i) => {
              const IconComponent = s.Icon;
              return (
                <div key={i} className="service-card" data-reveal style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="service-icon"><IconComponent size={32} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BENTO ── */}
      <section className="bento" ref={bentoRef}>
        <div className="container">
          <div className="section-header fade-up">
            <div className="tag">Why Hemmingway</div>
            <h2>Built for scale,<br />crafted for humans</h2>
          </div>
          <div className="bento-grid">
            <CometCard className="bento-card bento-1" >
              <div data-reveal>
                <div className="bento-badge">Performance</div>
                <h3>10x faster delivery without compromising quality</h3>
                <p>Our agile-first methodology and battle-tested frameworks let us ship production-ready code in record time.</p>
                <div className="bento-visual-chart">
                  {[40, 65, 55, 80, 70, 90, 85, 100].map((h, i) => (
                    <div key={i} className="chart-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
            </CometCard>

            <CometCard className="bento-card bento-2">
              <div data-reveal>
                <div className="bento-badge">Security</div>
                <h3>Zero-compromise security baked in from line one</h3>
                <p>SOC 2 compliant. GDPR ready. Every system we build meets enterprise security standards by default.</p>
                <div className="bento-orbit">
                  <div className="orbit-ring"><div className="orbit-dot" /></div>
                  <div className="orbit-center">🔐</div>
                </div>
              </div>
            </CometCard>

            <CometCard className="bento-card bento-3">
              <div data-reveal>
                <div className="bento-badge">AI-First</div>
                <h3>Intelligent by default</h3>
                <p>Every product we build can integrate machine learning — from recommendation engines to predictive analytics.</p>
                <div style={{ marginTop: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['GPT-4o', 'Gemini', 'Claude', 'LLaMA', 'Custom Models'].map((t) => (
                    <span key={t} style={{ background: 'var(--primary)', color: '#fff', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            </CometCard>

            <CometCard className="bento-card bento-4">
              <div data-reveal>
                <div className="bento-badge">Partnership</div>
                <h3>We're not a vendor — we're your engineering partner</h3>
                <p>Dedicated teams, transparent communication, and a shared stake in your success. We celebrate when you win.</p>
                <div style={{ display: 'flex', gap: '20px', marginTop: '28px', flexWrap: 'wrap' }}>
                  {[['98%', 'Retention'], ['24/7', 'Support']].map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontSize: '32px', fontWeight: 800, background: 'linear-gradient(135deg, #fff, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{n}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-bright)', opacity: 0.7, marginTop: '4px' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CometCard>
          </div>
        </div>
      </section>

      

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-antigravity-bg">
          <Antigravity
            count={250}
            magnetRadius={8}
            ringRadius={8}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={1.4}
            lerpSpeed={0.05}
            color={'#6367F1'}
            autoAnimate={true}
            particleVariance={1}
            fieldStrength ={1}
          />
        </div>
        <div className="container">
          <div className="cta-inner fade-up">
            <div className="tag" style={{ margin: '0 auto 24px' }}>Ready to Build?</div>
            <h2>Let's build something<br /><span className="gradient-text">extraordinary together</span></h2>
            <p>Whether you have a full spec or just an idea on a napkin — we'd love to hear from you.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">
                Start Your Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/about" className="btn-ghost">Meet the Team</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
