import { useRef } from 'react';
import { Briefcase, Code, Palette, Cog, Monitor, Lock, Rocket, Brain, Handshake, Lightbulb } from 'lucide-react';
import { useScrollReveal, useGSAPReveal } from '../hooks/useAnimations';
import { Helmet } from 'react-helmet-async';

const TEAM_MEMBERS = [
  {
    name: 'Devyansh Dingolia',
    role: 'Chief Executive Officer',
    bio: '',
    Icon: Briefcase,
    expertise: ['Strategy', 'Leadership', 'Architecture']
  },
  {
    name: 'Janardhan Verma',
    role: 'Chief Technology Officer & Co-CEO',
    bio: '',
    Icon: Code,
    expertise: ['AI/ML', 'Cloud', 'DevOps']
  },
  {
    name: 'Manish Mandia',
    role: 'Chief Product Officer',
    bio: '',
    Icon: Cog,
    expertise: ['Full Stack', 'UI/UX', 'Performance']
  },
  {
    name: 'Yash Kumar',
    role: 'Chief Finance Officer',
    bio: '',
    Icon: Palette,
    expertise: ['UI/UX', 'Design Systems', 'Branding']
  },
  {
    name: 'Sakshi Yadav',
    role: 'Chief Marketing Officer',
    bio: '',
    Icon: Monitor,
    expertise: ['Marketing', 'Performance', 'Animation']
  },
  {
    name: 'Bhardwaj Kartikay',
    role: 'Chief Operations Officer',
    bio: '',
    Icon: Lock,
    expertise: ['Security', 'Compliance', 'Cryptography']
  },
];

export default function Team() {
  useScrollReveal();
  const gridRef = useRef(null);
  useGSAPReveal(gridRef);

  return (
    <>
      <Helmet>
        <title>Our Team | Hemmingway Technologies</title>

        <meta
          name="description"
          content="Meet the team behind Hemmingway Technologies. Our engineers, designers, and innovators are dedicated to building impactful software, AI solutions, and digital products."
        />
      </Helmet>

      {/* ── TEAM GRID ── */}
      <section className="team-section">
        <div className="container">
          <div className="tag">Our Team</div>
          <h1>
            Meet the
            <span className="gradient-text"> people behind the magic</span>
          </h1>
          <div ref={gridRef} className="team-grid">
            {TEAM_MEMBERS.map((member, i) => {
              const IconComponent = member.Icon;
              return (
                <div key={member.name} className="team-card fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="team-card-emoji"><IconComponent size={32} /></div>
                  <h3 className="team-card-name">{member.name}</h3>
                  <div className="team-card-role">{member.role}</div>
                  <p className="team-card-bio">{member.bio}</p>
                  <div className="team-card-expertise">
                    {member.expertise.map(skill => (
                      <span key={skill} className="expertise-tag">{skill}</span>
                    ))}
                  </div>
                  <div className="team-card-hover">
                    <a href="" className="team-card-link">Get in touch →</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CULTURE ── */}
      <section className="team-culture">
        <div className="container">
          <h2>Our Culture</h2>
          <div className="culture-grid">
            <div className="culture-item fade-in">
              <div className="culture-icon"><Rocket size={32} /></div>
              <h4>Autonomy</h4>
              <p>We trust our people to make decisions. Minimal process, maximum ownership.</p>
            </div>
            <div className="culture-item fade-in" style={{ transitionDelay: '0.1s' }}>
              <div className="culture-icon"><Brain size={32} /></div>
              <h4>Growth</h4>
              <p>$5K/year learning budget. Conferences. Books. We invest in your development.</p>
            </div>
            <div className="culture-item fade-in" style={{ transitionDelay: '0.2s' }}>
              <div className="culture-icon"><Handshake size={32} /></div>
              <h4>Collaboration</h4>
              <p>Cross-functional teams. Flat structure. Your voice matters at every level.</p>
            </div>
            <div className="culture-item fade-in" style={{ transitionDelay: '0.3s' }}>
              <div className="culture-icon"><Lightbulb size={32} /></div>
              <h4>Innovation</h4>
              <p>20% time for personal projects. We celebrate bold ideas and smart failures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="team-cta">
        <div className="container">
          <h2>Join Our Team</h2>
          <p>We're always looking for talented engineers and designers. Check out our open positions.</p>
          <a href="#contact" className="btn btn-primary">View Careers →</a>
        </div>
      </section>
    </>
  );
}
