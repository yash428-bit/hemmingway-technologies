import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Code, Palette, Cog } from 'lucide-react';
import { useScrollReveal, useGSAPReveal } from '../hooks/useAnimations';
import EncryptedText from '../components/ui/EncryptedText';
import CometCard from '../components/ui/CometCard';

const VALUES = [
  { num: '01', title: 'Craft Over Speed', desc: 'We take pride in the quality of every line of code, every pixel, every decision. Shortcuts are not in our vocabulary.' },
  { num: '02', title: 'Radical Transparency', desc: 'You will always know the state of your project. No surprises, no hidden costs — just honest communication.' },
  { num: '03', title: 'Human-Centred Design', desc: 'Technology should serve people. Every system we build starts with the user and works backward to the code.' },
  { num: '04', title: 'Continuous Learning', desc: "The tech landscape evolves daily. We invest in our team's growth so you always get the most current thinking." },
];

const TEAM = [
  { name: 'Devyansh Dingolia', role: 'Chief Executive Officer', Icon: Briefcase },
  { name: 'Janardhan Verma', role: 'Chief Technology Officer & Co-CEO', Icon: Code },
  { name: 'Yash Kumar', role: 'Chief Finance Officer', Icon: Palette },
  { name: 'Manish Mandia', role: 'Chief Product Officer', Icon: Cog },
  { name: 'Sakshi Yadav', role: 'Chief Marketing Officer', Icon: Palette },
  { name: 'Bhardwaj Kartikay', role: 'Chief Operations Officer', Icon: Palette },
];

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
      <section className="page-hero" style={{ backgroundImage: 'url("/bg-hero.png")' }}>
        <div className="page-hero-glow" />
        <div className="container">
          <div className="tag">About Us</div>
          <h1>
            We exist to make<br />
            <span className="gradient-text">great software</span>
          </h1>
          <p>
            Founded in 2012, Hemmingway Technologies has grown from a two-person consultancy into a 40-person engineering powerhouse — united by a single obsession: building software that actually matters.
          </p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="about-story">
        <div className="container">
          <div className="about-story-inner">
            <div className="about-story-img fade-in">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMGF0JTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                alt="Hemmingway Technologies team at work"
              />
              <div className="about-story-img-frame" />
            </div>
            <div className="about-story-text">
              <div className="tag">Our Story</div>
              <h2 className="fade-up">Built by engineers,<br />for ambitious teams</h2>
              <p className="fade-up" style={{ transitionDelay: '0.1s' }}>
                It started in a small London flat with two engineers who believed the best software comes from teams that genuinely care — not just about code, but about the problems they solve and the people they serve.
              </p>
              <p className="fade-up" style={{ transitionDelay: '0.2s' }}>
                Over a decade later, we've delivered over 150 projects across fintech, healthcare, logistics, and media. Our clients range from ambitious startups to Fortune 500 companies — all with one thing in common: they needed a partner, not just a contractor.
              </p>
              <p className="fade-up" style={{ transitionDelay: '0.3s' }}>
                <EncryptedText
                  text="We don't just ship code. We build the foundation your business runs on."
                  className="gradient-text"
                  speed={25}
                />
              </p>
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
              {/* <a href="mailto:careers@hemmingway.tech" className="btn-ghost">View Careers</a> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
