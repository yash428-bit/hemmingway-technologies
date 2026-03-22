import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const About = () => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const approachRef = useRef(null);
  const commitmentRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const missionInView = useInView(missionRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const approachInView = useInView(approachRef, { once: true, margin: '-100px' });
  const commitmentInView = useInView(commitmentRef, { once: true, margin: '-100px' });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };


  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <motion.section
        className="about-hero"
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            About Hemmingway Technologies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Formed following Smart India Hackathon 2025, Hemmingway Technologies is an engineering firm focused on building systems for industrial and government applications.
          </motion.p>
        </div>
      </motion.section >

      {/* Mission Section */}
      < motion.section
        className="mission-section"
        ref={missionRef}
      >
        <div className="container">
          <div className="about-content">
            <motion.div
              className="about-text"
              initial="hidden"
              animate={missionInView ? 'visible' : 'hidden'}
              variants={fadeInLeft}
            >
              <h2>Origin & Focus</h2>

              <p>
                The foundation of Hemmingway Technologies lies in Smart India Hackathon 2025,
                where multiple full-stack systems were designed and evaluated under continuous review.
              </p>

              <p>
                Among these, an intelligent safety platform for mining operations advanced through
                successive rounds, where adaptability, system reliability, and practical relevance
                determined progression.
              </p>

              <p>
                Following the Grand Finale, the Ministry of Coal initiated discussions to support
                further development and potential deployment. This transition from prototype to
                real-world application led to the formal establishment of the company.
              </p>

              <p>
                Today, the focus remains clear - building systems that function reliably in
                environments where performance, accountability, and safety are essential.
              </p>
            </motion.div>

            <motion.div
              className="about-image"
              initial="hidden"
              animate={missionInView ? 'visible' : 'hidden'}
              variants={fadeInRight}
            >
              <div className="image-placeholder">
                <div className="placeholder-icon">🎯</div>
                <p>Mission-Critical Solutions</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section >

      {/* Values Section */}
      < motion.section
        className="values-section"
        ref={valuesRef}
      >
        <div className="container">
          <motion.div
            className="section-title"
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
          >
            <h2>Our Core Values</h2>
            <p>Guiding decisions, design, and delivery</p>
          </motion.div>

          <motion.div
            className="values-grid"
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          ><motion.div className="value-card card" variants={fadeInUp}>
              <div className="value-number">01</div>
              <h3>Reliability</h3>
              <p>
                Systems are designed to perform consistently under demanding conditions.
                Stability and correctness are treated as fundamental requirements.
              </p>
            </motion.div>

            <motion.div className="value-card card" variants={fadeInUp}>
              <div className="value-number">02</div>
              <h3>Transparency</h3>
              <p>
                Clear visibility into progress, constraints, and decisions ensures alignment
                throughout the development process.
              </p>
            </motion.div>

            <motion.div className="value-card card" variants={fadeInUp}>
              <div className="value-number">03</div>
              <h3>Execution</h3>
              <p>
                Emphasis is placed on delivering functional systems through rapid iteration
                and disciplined engineering, even under evolving requirements.
              </p>
            </motion.div>

            <motion.div className="value-card card" variants={fadeInUp}>
              <div className="value-number">04</div>
              <h3>Practical Innovation</h3>
              <p>
                Modern technologies are applied where they provide measurable value,
                ensuring solutions remain maintainable and effective over time.
              </p>
            </motion.div>

            <motion.div className="value-card card" variants={fadeInUp}>
              <div className="value-number">05</div>
              <h3>Alignment</h3>
              <p>
                Systems are built to integrate with real operational workflows,
                rather than forcing adaptation to rigid software structures.
              </p>
            </motion.div>

            <motion.div className="value-card card" variants={fadeInUp}>
              <div className="value-number">06</div>
              <h3>Safety Awareness</h3>
              <p>
                In environments where software impacts physical operations,
                safety considerations are incorporated at every stage of development.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </motion.section >

      {/* Approach Section */}
      < motion.section
        className="approach-section"
        ref={approachRef}
      >
        <div className="container">
          <motion.div
            className="section-title"
            initial="hidden"
            animate={approachInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
          >
            <h2>Our Approach</h2>
            <p>How we deliver exceptional results</p>
          </motion.div>

          <motion.div
            className="approach-steps"
            initial="hidden"
            animate={approachInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.div className="approach-step" variants={fadeInUp}>
              <div className="step-icon">🔍</div>
              <h3>Discovery</h3>
              <p>
                We start by deeply understanding your operations, challenges,
                and goals. No two organizations are alike, and we take the time
                to learn what makes yours unique.
              </p>
            </motion.div>

            <div className="approach-arrow">→</div>

            <motion.div className="approach-step" variants={fadeInUp}>
              <div className="step-icon">📐</div>
              <h3>Design</h3>
              <p>
                Working closely with your team, we design solutions that fit
                your workflows, not the other way around. Our designs prioritize
                usability and reliability.
              </p>
            </motion.div>

            <div className="approach-arrow">→</div>

            <motion.div className="approach-step" variants={fadeInUp}>
              <div className="step-icon">⚡</div>
              <h3>Delivery</h3>
              <p>
                We build robust, well-tested solutions using modern engineering
                practices. Regular checkpoints ensure we're on track and aligned
                with your expectations.
              </p>
            </motion.div>

            <div className="approach-arrow">→</div>

            <motion.div className="approach-step" variants={fadeInUp}>
              <div className="step-icon">🤝</div>
              <h3>Support</h3>
              <p>
                Our relationship doesn't end at deployment. We provide ongoing
                support, maintenance, and continuous improvement to ensure your
                systems evolve with your needs.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section >

      {/* Commitment Section */}
      < motion.section
        className="commitment-section"
        ref={commitmentRef}
      >
        <div className="container">
          <motion.div
            className="commitment-content"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={commitmentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>Our Commitment to You</h2>
            <p>
              Hemmingway Technologies focuses on delivering systems that perform
              reliably in real-world environments. Every engagement is approached
              with an understanding of the operational importance of clarity,
              stability, and accountability.
            </p>

            <p>
              The objective remains consistent - to build solutions that function
              as intended under the conditions they are designed for.
            </p>
          </motion.div>
        </div>
      </motion.section >
    </div >
  );
};

export default About;
