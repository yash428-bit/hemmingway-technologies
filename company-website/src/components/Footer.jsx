import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-section"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h3 className="footer-logo">
              <span className="logo-text">Hemmingway</span>
              <span className="logo-accent">Technologies</span>
            </h3>
            <p className="footer-tagline">
              Engineering excellence for government, mining, and industrial sectors.
            </p>
          </motion.div>

          <motion.div 
            className="footer-section"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {['Home', 'About', 'Team', 'Solutions', 'Contact'].map((link, i) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <a href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`}>{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="footer-section"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>info@hemmingwaytech.com</li>
              <li>contact@hemmingwaytech.com</li>
            </ul>
          </motion.div>

          <motion.div 
            className="footer-section"
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h4>Follow Us</h4>
            <div className="social-links">
              <motion.a 
                href="#" 
                className="social-link" 
                aria-label="LinkedIn"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link" 
                aria-label="Twitter"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.85.38-1.78.64-2.75.76a4.8 4.8 0 0 0 2.1-2.66c-.92.55-1.95.95-3.03 1.17a4.75 4.75 0 0 0-8.1 4.33A13.5 13.5 0 0 1 1.64 4.16a4.75 4.75 0 0 0 1.47 6.34c-.79-.02-1.53-.24-2.18-.6v.06a4.75 4.75 0 0 0 3.81 4.65c-.7.2-1.44.23-2.15.09a4.76 4.76 0 0 0 4.44 3.3A9.54 9.54 0 0 1 .9 19.55 13.43 13.43 0 0 0 8.29 22c8.73 0 13.5-7.23 13.5-13.5v-.61c.92-.67 1.72-1.5 2.35-2.45z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link" 
                aria-label="GitHub"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p>&copy; {currentYear} Hemmingway Technologies. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
