import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaInfoCircle, FaUsers, FaPuzzlePiece, FaEnvelope } from 'react-icons/fa';
import './Navigation.css';
import logoImage from '../images/logo-v2.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/about', label: 'About', icon: FaInfoCircle },
    { path: '/team', label: 'Team', icon: FaUsers },
    { path: '/solutions', label: 'Solutions', icon: FaPuzzlePiece },
    { path: '/contact', label: 'Contact', icon: FaEnvelope, isCta: true }
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    })
  };

  return (
    <motion.nav
      className="nav"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="logo" onClick={closeMenu}>
            <motion.img
              src={logoImage}
              alt="Hemmingway Technologies"
              className="logo-image"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''} ${link.isCta ? 'nav-link-cta' : ''}`}
                onClick={closeMenu}
              >
                <motion.span
                  className="nav-link-label"
                  variants={linkVariants}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="nav-link-icon" aria-hidden="true"><Icon /></span>
                  {link.label}
                </motion.span>
              </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.div
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span></span>
            <span></span>
            <span></span>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-links-mobile"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {navLinks.map((link, i) => {
              const Icon = link.icon;

              return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link-mobile ${isActive(link.path) ? 'active' : ''} ${link.isCta ? 'nav-link-cta' : ''}`}
                onClick={closeMenu}
              >
                <motion.span
                  className="nav-link-mobile-label"
                  custom={i}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <span className="nav-link-mobile-icon" aria-hidden="true"><Icon /></span>
                  {link.label}
                </motion.span>
              </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
