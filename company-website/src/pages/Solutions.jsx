import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './Solutions.css';

const Solutions = () => {
  // Animation refs
  const heroRef = useRef(null);
  const solutionsRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const techRef = useRef(null);
  const ctaRef = useRef(null);

  // InView hooks
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const solutionsInView = useInView(solutionsRef, { once: true, margin: "-100px" });
  const capabilitiesInView = useInView(capabilitiesRef, { once: true, margin: "-100px" });
  const techInView = useInView(techRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const floatingIcon = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const solutions = [
    {
      title: "Mining Safety Systems",
      icon: "⛏️",
      description: "Digital systems designed to improve safety visibility, reporting, and response in mining operations.",
      features: [
        "Real-time incident reporting",
        "Hazard tracking and escalation",
        "Audit trails for safety events",
        "Worker-facing mobile interfaces",
        "Operational transparency across teams"
      ]
    },
    {
      title: "Industrial Workflow Digitization",
      icon: "🏗️",
      description: "Transitioning manual and fragmented workflows into structured, trackable digital systems.",
      features: [
        "Process digitization",
        "Event and task tracking",
        "Data logging and traceability",
        "Operational dashboards",
        "Reduced dependency on manual reporting"
      ]
    },
    {
      title: "Government-Backed Systems",
      icon: "🏛️",
      description: "Systems aligned with regulatory and administrative workflows in public sector environments.",
      features: [
        "Structured data collection",
        "Inter-department coordination",
        "Compliance-aware design",
        "Audit-ready records",
        "Scalable system architecture"
      ]
    },
    {
      title: "Field-Ready Applications",
      icon: "📱",
      description: "Applications built for on-ground usage in environments with constraints on connectivity and usability.",
      features: [
        "Mobile-first design",
        "Offline functionality",
        "Low-friction interfaces",
        "Fast data capture",
        "Resilient performance in field conditions"
      ]
    }
  ];

  const capabilities = [
    {
      title: "Custom Software Development",
      description: "Tailored solutions built to your exact specifications and operational requirements."
    },
    {
      title: "System Integration",
      description: "Seamlessly connect new solutions with your existing enterprise systems."
    },
    {
      title: "Cloud & On-Premise",
      description: "Flexible deployment options to match your security and infrastructure needs."
    },
    {
      title: "Mobile Applications",
      description: "Field-ready mobile apps for operations teams working in challenging environments."
    },
    {
      title: "Data Analytics",
      description: "Transform operational data into actionable insights for better decision-making."
    },
    {
      title: "Iterative Development",
      description: "Continuous refinement based on feedback, usage patterns, and evolving requirements."
    }
  ];

  return (
    <div className="solutions-page">
      {/* Hero Section */}
      <motion.section
        className="solutions-hero"
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.h1 variants={fadeInUp}>
            Solutions That Work in the Real World
          </motion.h1>
          <motion.p variants={fadeInUp}>
            Technology choices are guided by system requirements,performance constraints, and long-term maintainability.
          </motion.p>
        </div>
      </motion.section>

      {/* Solutions Grid */}
      <motion.section
        className="solutions-section"
        ref={solutionsRef}
      >
        <div className="container">
          <motion.div
            className="section-title"
            initial="hidden"
            animate={solutionsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2>Focus Areas</h2>
            <p>Specialized expertise where it matters most</p>
          </motion.div>

          <motion.div
            className="solutions-grid"
            initial="hidden"
            animate={solutionsInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="solution-card card"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="solution-icon"
                  variants={floatingIcon}
                  initial="initial"
                  animate="animate"
                  whileHover={{ scale: 1.2, y: 0 }}
                >
                  {solution.icon}
                </motion.div>
                <h3>{solution.title}</h3>
                <p className="solution-description">{solution.description}</p>

                <div className="solution-features">
                  <h4>Key Capabilities:</h4>
                  <ul>
                    {solution.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="check-icon">✓</span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Capabilities Section */}
      <motion.section
        className="capabilities-section"
        ref={capabilitiesRef}
      >
        <div className="container">
          <motion.div
            className="section-title"
            initial="hidden"
            animate={capabilitiesInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2>Our Capabilities</h2>
            <p>Comprehensive services to support your digital transformation</p>
          </motion.div>

          <motion.div
            className="capabilities-grid"
            initial="hidden"
            animate={capabilitiesInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                className="capability-card card"
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Technology Section */}
      <motion.section
        className="technology-section"
        ref={techRef}
      >
        <div className="container">
          <motion.div
            className="section-title"
            initial="hidden"
            animate={techInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2>Technology Stack</h2>
            <p>Modern, proven technologies selected for reliability and performance</p>
          </motion.div>

          <motion.div
            className="tech-categories"
            initial="hidden"
            animate={techInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div className="tech-category" variants={fadeInUp}>
              <h3>Backend</h3>
              <div className="tech-tags">
                <span className="tech-tag">.NET Core</span>
                <span className="tech-tag">Python</span>
                <span className="tech-tag">Java</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">PostgreSQL</span>
                <span className="tech-tag">SQL Server</span>
              </div>
            </motion.div>

            <motion.div className="tech-category" variants={fadeInUp}>
              <h3>Frontend</h3>
              <div className="tech-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Vue.js</span>
                <span className="tech-tag">Angular</span>
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">Progressive Web Apps</span>
              </div>
            </motion.div>

            <motion.div className="tech-category" variants={fadeInUp}>
              <h3>Cloud & Infrastructure</h3>
              <div className="tech-tags">
                <span className="tech-tag">Azure</span>
                <span className="tech-tag">AWS</span>
                <span className="tech-tag">Docker</span>
                <span className="tech-tag">Kubernetes</span>
                <span className="tech-tag">CI/CD</span>
              </div>
            </motion.div>

            <motion.div className="tech-category" variants={fadeInUp}>
              <h3>Mobile</h3>
              <div className="tech-tags">
                <span className="tech-tag">React Native</span>
                <span className="tech-tag">Flutter</span>
                <span className="tech-tag">Native iOS</span>
                <span className="tech-tag">Native Android</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="solutions-cta"
        ref={ctaRef}
      >
        <div className="container">
          <motion.div
            className="cta-content"
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={scaleIn}
          >
            <h2>Start a Conversation</h2>
            <p>
              If you're working on a problem that requires structured,
              reliable software - we’re open to discussing how it can be built.
            </p>

            <Link to="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Solutions;
