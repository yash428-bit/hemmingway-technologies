import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  // Magnetic Button Effect Hook
  const MagneticButton = ({ children, className, to }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={ref}
        style={{ x: xSpring, y: ySpring }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to={to} className={className}>
          {children}
        </Link>
      </motion.div>
    );
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const floatingCard = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const features = [
    {
      icon: '⚡',
      title: 'Execution Under Pressure',
      desc: 'Proven ability to design, iterate, and deliver systems in high-stakes environments where requirements evolve continuously.'
    },
    {
      icon: '🧠',
      title: 'Engineering-First Thinking',
      desc: 'Systems are built from first principles - prioritizing reliability, scalability, and real-world usability.'
    },
    {
      icon: '🛡️',
      title: 'Operational Reliability',
      desc: 'Focused on environments where system failure, downtime, or ambiguity is not acceptable.'
    },
    {
      icon: '🏗️',
      title: 'Full-Stack System Design',
      desc: 'Complete system development - from backend architecture to user-facing interfaces - designed for deployment at scale.'
    }
  ];

  const stats = [
    { number: 'SIH 2025', label: 'Grand Finale Winners' },
    { number: '6', label: 'Founding Engineers' },
    { number: '1', label: 'Active Government Project' },
    { number: '0', label: 'Tolerance for System Failure' }
  ];


  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="container">
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Engineering Systems Where Failure Is Not an Option
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Hemmingway Technologies is a Ministry of Coal-backed engineering firm focused on mission-critical industrial systems.

              We operate at the intersection of rapid technical execution and real-world reliability - delivering solutions for environments where performance, safety, and accountability are essential.
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton className="btn btn-primary" to="/solutions">
                View Current Work
              </MagneticButton>
              <MagneticButton className="btn btn-secondary" to="/contact">
                Start a Conversation
              </MagneticButton>
            </motion.div>
          </div>

          <div className="hero-graphic">
            {[
              { icon: '🏆', title: 'SIH Champion', delay: 0 },
              { icon: '🏛️', title: 'Government-Backed', delay: 0.2 },
              { icon: '💻', title: 'Full-Stack Dev', delay: 0.4 }
            ].map((card, i) => (
              <motion.div
                key={i}
                className={`floating-card card-${i + 1}`}
                custom={i}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={floatingCard}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="card-icon">{card.icon}</div>
                <h4>{card.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" ref={featuresRef}>
        <div className="container">
          <motion.div
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>The Hemmingway Advantage</h2>
            <p>Built for environments where execution matters.</p>
          </motion.div>

          <motion.div
            className="features-grid"
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="feature-card card"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <motion.div
            className="stats"
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card"
                variants={fadeInUp}
                whileHover={{ scale: 1.08, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" ref={ctaRef}>
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>Where Innovation Meets Industry</h2>
            <p>
              We focus on developing software for real-world industrial environments - where reliability, clarity, and accountability are critical.

              If you are working on systems where performance is not optional, we are open to collaboration.
            </p>
            <MagneticButton className="btn btn-primary" to="/contact">
              Start a Conversation
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
