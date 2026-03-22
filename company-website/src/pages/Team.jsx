import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Team.css';

const leadershipImages = import.meta.glob('../leadership-img/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default'
});

const getIconImageSrc = (icon) => {
  if (typeof icon !== 'string') {
    return null;
  }

  if (!icon.startsWith('../leadership-img/')) {
    return null;
  }

  return leadershipImages[icon] || null;
};

const Team = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);

  const teamMembers = [
    {
      name: "Devyansh Dingolia",
      role: "Chief Executive Officer",
      description: [/* TODO: Add member description */],
      icon: "👨‍💻",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      level: "c-suite",
      achievements: [/* TODO: Add achievements */]
    },
    {
      name: "Janardhan Verma",
      role: "Co-CEO, Chief Technology Officer, Director/Promoter",
      description: [/* TODO: Add member description */],
      icon: "👨‍💻",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      level: "director",
      achievements: [/* TODO: Add achievements */]
    },
    {
      name: "Yash Kumar",
      role: "Chief Financial Officer",
      description: [/* TODO: Add member description */],
      icon: "👩‍🔧",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      level: "c-suite",
      achievements: [/* TODO: Add achievements */]
    },
    {
      name: "Bhardwaj Kartikay",
      role: "Chief Operating Officer",
      description: [/* TODO: Add member description */],
      icon: "👨‍✈️",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      level: "c-suite",
      achievements: [/* TODO: Add achievements */]
    },
    {
      name: "Manish Mandia",
      role: "Chief Product Officer",
      description: [/* TODO: Add member description */],
      icon: "👩‍🔬",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      level: "c-suite",
      achievements: [/* TODO: Add achievements */]
    },
    {
      name: "Sakshi Yadav",
      role: "Chief Marketing Officer, Director/Promoter",
      description: [/* TODO: Add member description */],
      icon: "👨‍💼",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      level: "director",
      achievements: [/* TODO: Add achievements */]
    }
  ];

  const directors = teamMembers.filter((member) => member.level === "director");
  const cSuite = teamMembers.filter((member) => member.level === "c-suite");
  const selectedMember = selectedMemberIndex !== null ? teamMembers[selectedMemberIndex] : null;

  const renderMemberCircle = (member, index, compact = false) => {
    const isActive = selectedMemberIndex === index;
    const iconImageSrc = getIconImageSrc(member.icon);

    return (
      <motion.button
        key={member.name}
        type="button"
        className={`member-circle-button ${compact ? 'compact' : ''} ${isActive ? 'active' : ''}`}
        onClick={() => setSelectedMemberIndex(index)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      >
        <div className="member-circle-avatar" style={iconImageSrc ? undefined : { background: member.gradient }}>
          {iconImageSrc ? (
            <img src={iconImageSrc} alt={member.name} className="member-circle-photo" loading="lazy" />
          ) : (
            <span className="member-circle-icon">{member.icon}</span>
          )}
        </div>
        <span className="member-circle-name">{member.name}</span>
        <span className="member-circle-role">{member.role}</span>
      </motion.button>
    );
  };

  const cultureValues = [
    {
      icon: "🎯",
      title: "Excellence Driven",
      description: "We're passionate about craftsmanship in software engineering. Every team member is empowered to do their best work."
    },
    {
      icon: "🤝",
      title: "Collaborative",
      description: "We believe the best solutions emerge from diverse perspectives working together toward a common goal."
    },
    {
      icon: "📚",
      title: "Continuous Learning",
      description: "Technology evolves rapidly. We invest in our team's growth and stay at the forefront of industry best practices."
    },
    {
      icon: "⚖️",
      title: "Work-Life Balance",
      description: "We build sustainable, high-performing teams by respecting the importance of life outside work."
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero" ref={heroRef}>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Meet Our Founding Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            A six-member engineering team formed through Smart India Hackathon 2025, bringing together complementary strengths across full-stack development, system design, and execution under real-world constraints.
          </motion.p>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="team-section">
        <div className="container">
          <motion.div
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>The People Behind Hemmingway Technologies</h2>
            <p>
              A team shaped through rapid iteration, technical validation, and the ability to deliver under pressure.
            </p>
          </motion.div>

          {selectedMember ? (
            <motion.div
              className="leadership-focus-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="leadership-top-row">
                {teamMembers.map((member, index) => renderMemberCircle(member, index, true))}
              </div>

              <motion.div
                key={selectedMember.name}
                className="leadership-detail-panel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="leadership-detail-left">
                  <h3>{selectedMember.name}</h3>
                  <p className="leadership-detail-role">{selectedMember.role}</p>
                  <div className="team-achievements">
                    {selectedMember.achievements.map((achievement) => (
                      <span key={achievement} className="achievement-badge">{achievement}</span>
                    ))}
                  </div>
                  <p className="leadership-detail-description">{selectedMember.description}</p>
                </div>

                <div className="leadership-detail-right">
                  <div
                    className="leadership-portrait"
                    style={getIconImageSrc(selectedMember.icon) ? undefined : { background: selectedMember.gradient }}
                  >
                    {getIconImageSrc(selectedMember.icon) ? (
                      <img
                        src={getIconImageSrc(selectedMember.icon)}
                        alt={selectedMember.name}
                        className="leadership-portrait-photo"
                        loading="lazy"
                      />
                    ) : (
                      <span>{selectedMember.icon}</span>
                    )}
                  </div>
                </div>
              </motion.div>

              <button
                type="button"
                className="leadership-reset-btn"
                onClick={() => setSelectedMemberIndex(null)}
              >
                Back to leadership overview
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="leadership-overview"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="leadership-row leadership-row-directors">
                {directors.map((member) => {
                  const index = teamMembers.findIndex((item) => item.name === member.name);
                  return renderMemberCircle(member, index);
                })}
              </div>
              <div className="leadership-row leadership-row-csuite">
                {cSuite.map((member) => {
                  const index = teamMembers.findIndex((item) => item.name === member.name);
                  return renderMemberCircle(member, index);
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className="culture-section">
        <div className="container">
          <motion.div
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>Our Culture</h2>
            <p>What makes Hemmingway Technologies a great place to work</p>
          </motion.div>

          <div className="culture-grid">
            {cultureValues.map((value, index) => (
              <motion.div
                key={index}
                className="culture-card"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <div className="culture-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="join-section">
        <div className="container">
          <motion.div
            className="join-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>Work With Us</h2>

            <p>
              Hemmingway Technologies operates at the intersection of software engineering
              and real-world systems. The work involves building solutions that are expected
              to perform under practical constraints.
            </p>

            <p>
              Individuals interested in contributing to structured, execution-driven
              environments are encouraged to reach out.
            </p>

            <motion.a
              href="/contact"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Team;
