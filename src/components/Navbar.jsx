import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenuLine, RiCloseLine, RiPlayFill } from 'react-icons/ri';
import './Navbar.css';

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'THE GAME', href: '#game' },
  { label: 'CONTESTANTS', href: '#contestants' },
  { label: 'EPISODES', href: '#episodes' },
  { label: 'TRAITORS', href: '#traitors' },
  { label: 'GALLERY', href: '#gallery' },
];

export default function Navbar({ onTrailerClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setActiveLink(href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar__inner">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="navbar__logo"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="navbar__logo-the">THE</span>
            <span className="navbar__logo-main">TRAITORS</span>
            <span className="navbar__logo-india">INDIA</span>
          </motion.a>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link${activeLink === link.href ? ' navbar__link--active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="navbar__actions">
            <motion.button
              className="navbar__trailer-btn"
              onClick={onTrailerClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <RiPlayFill className="navbar__play-icon" />
              <span>WATCH TRAILER</span>
            </motion.button>

            {/* Hamburger */}
            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu__inner">
              <ul className="mobile-menu__links">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      className="mobile-menu__link"
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    >
                      <span className="mobile-menu__num">0{i + 1}</span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className="mobile-menu__cta"
                onClick={() => { setMenuOpen(false); onTrailerClick(); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <RiPlayFill />
                WATCH TRAILER
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
