import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BadgeInfo, Building2, Hash, Landmark, Layers3, School2, Trophy, MapPin, IndianRupee, Users } from 'lucide-react';
import { useScrollReveal, useGSAPReveal } from '../hooks/useAnimations';
import EncryptedText from '../components/ui/EncryptedText';
import CometCard from '../components/ui/CometCard';
import SIHGallery from '../components/ui/SIHGallery';
import { Helmet } from 'react-helmet-async';

const VALUES = [
  { num: '01', title: 'Craft Over Speed', desc: 'We take pride in the quality of every line of code, every pixel, every decision. Shortcuts are not in our vocabulary.' },
  { num: '02', title: 'Radical Transparency', desc: 'You will always know the state of your project. No surprises, no hidden costs — just honest communication.' },
  { num: '03', title: 'Human-Centred Design', desc: 'Technology should serve people. Every system we build starts with the user and works backward to the code.' },
  { num: '04', title: 'Continuous Learning', desc: "The tech landscape evolves daily. We invest in our team's growth so you always get the most current thinking." },
];

const SIH_META = [
  { icon: BadgeInfo, label: 'Problem ID', value: 'SIH25181' },
  { icon: Landmark, label: 'Ministry', value: 'Ministry of Coal (MoC)' },
  { icon: Building2, label: 'Organisation', value: 'CMPDI' },
  { icon: School2, label: 'Institution', value: 'NSUT, Delhi' },
  { icon: Layers3, label: 'Category', value: 'Software' },
  { icon: Hash, label: 'Team ID', value: '102387' },
];

const FOUNDERS = ['Janardhan Verma', 'Devyansh Dingolia', 'Manish Mandia', 'Yash Kumar', 'Bhardwaj Kartikay', 'Sakshi Yadav'];

export default function About() {
  useScrollReveal();
  const valuesRef = useRef(null);
  useGSAPReveal(valuesRef);

  return (
    <>
      <Helmet>
        <title>About Us | Hemmingway Technologies</title>
        <meta
          name="description"
          content="Learn about Hemmingway Technologies, our mission, team, and vision for AI-powered software innovation."
        />
      </Helmet>

      {/* ── PAGE HERO ── */}
      <section className="page-hero" style={{ backgroundImage: 'url("/bg-hero.webp")' }}>
        <div className="page-hero-glow" />
        <div className="container">
          <div className="tag">About Us</div>
          <h1>
            Built by engineers,<br />
            <span className="gradient-text">for ambitious teams</span>
          </h1>
          <p>
            6 NSUT Founders. One hackathon win. <br /> A company born from 36 hours of relentless building.
          </p>
        </div>
      </section>

      {/* ── UNIFIED STORY + SIH ── */}
      <section className="origin-section">
        <div className="container">
          <div className="origin-grid">

            {/* ── LEFT: Story + SIH Card ── */}
            <div className="origin-left">
              <div className="tag">Our Origin Story</div>
              <h2 className="fade-up origin-headline">
                We won <span className="gradient-text">Smart India<br />Hackathon</span> — then<br />built a company.
              </h2>

              <p className="fade-up origin-lead" style={{ transitionDelay: '0.1s' }}>
                Team <strong>Vajra Dev</strong> from <strong>Netaji Subhas University of Technology, Delhi</strong> was assigned
                a real government problem: build a software solution for the{' '}
                <strong>Ministry of Coal</strong> through <strong>Central Mine Planning & Design Institute (CMPDI)</strong>.
                We shipped a production-grade app prototype in 36 sleepless hours — and Won!
              </p>

              {/* SIH Detail Card */}
              <div className="sih-card fade-up" style={{ transitionDelay: '0.2s' }}>
                {/* Trophy Header */}
                <div className="sih-card-header">
                  <div className="sih-trophy-wrap">
                    <Trophy size={22} />
                  </div>
                  <div>
                    <div className="sih-card-title">Smart India Hackathon — Grand Winner</div>
                    <div className="sih-card-team">Team &ldquo;Vajra Dev&rdquo; · Team ID #102387</div>
                  </div>
                </div>

                {/* Meta chips */}
                <div className="sih-meta-grid">
                  {SIH_META.map((m) => (
                    <div className="sih-meta-chip" key={m.label}>
                      <span className="sih-meta-icon" aria-hidden="true">
                        <m.icon size={14} />
                      </span>
                      <div>
                        <div className="sih-meta-label">{m.label}</div>
                        <div className="sih-meta-value">{m.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Founders row */}
                <div className="sih-founders">
                  <Users size={13} />
                  <span className="sih-founders-label">Founders —</span>
                  {FOUNDERS.map((f, i) => (
                    <span key={f} className="sih-founder-pill">
                      {f}{i < FOUNDERS.length - 1 ? '' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tagline */}
              <p className="fade-up origin-tagline" style={{ transitionDelay: '0.3s' }}>
                <EncryptedText
                  text="We don't just ship code. We build the foundation your business runs on."
                  className="gradient-text"
                  speed={25}
                />
              </p>

              {/* Stats row */}
              <div className="origin-stats fade-up" style={{ transitionDelay: '0.35s' }}>
                <div className="origin-stat">
                  <span className="origin-stat-num gradient-text">1.5L+</span>
                  <span className="origin-stat-label">Competitors</span>
                </div>
                <div className="origin-stat-divider" />
                <div className="origin-stat">
                  <span className="origin-stat-num gradient-text">36h</span>
                  <span className="origin-stat-label">Non-stop build</span>
                </div>
                <div className="origin-stat-divider" />
                
                <div className="origin-stat">
                  <MapPin size={14} style={{ color: 'var(--primary)', marginBottom: 2 }} />
                  <span className="origin-stat-label">NSUT, Delhi</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Gallery ── */}
            <div className="origin-right fade-in">
              <SIHGallery />
            </div>

          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="about-values" ref={valuesRef}>
        <div className="container">
          <div className="section-header fade-up">
            <div className="tag">Our Values</div>
            <h2>The principles that<br />guide everything we do</h2>
          </div>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <CometCard key={i} className="value-card">
                <div data-reveal style={{ padding: '0' }}>
                  <div className="value-num">{v.num}</div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </CometCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner fade-up">
            <div className="tag" style={{ margin: '0 auto 24px' }}>Join Us</div>
            <h2>Want to build the<br /><span className="gradient-text">future with us?</span></h2>
            <p>We're always looking for talented engineers, designers, and strategists who share our values.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
