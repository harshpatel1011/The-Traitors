import { RiInstagramLine, RiYoutubeLine, RiTwitterXLine } from 'react-icons/ri';
import './Footer.css';

const footerLinks = [
  { label: 'About', href: '#game' },
  { label: 'Episodes', href: '#episodes' },
  { label: 'Contestants', href: '#contestants' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Trailer', href: '#hero' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

const socials = [
  { icon: RiInstagramLine, label: 'Instagram', href: '#' },
  { icon: RiYoutubeLine, label: 'YouTube', href: '#' },
  { icon: RiTwitterXLine, label: 'X', href: '#' },
];

export default function Footer() {
  const handleClick = (href) => {
    if (href === '#') return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__top-border" />

      <div className="section-container">
        <div className="footer__inner">
          {/* Logo */}
          <div className="footer__logo">
            <div className="footer__logo-the">THE</div>
            <div className="footer__logo-main">TRAITORS</div>
            <div className="footer__logo-india">INDIA</div>
          </div>

          {/* Links */}
          <nav className="footer__nav" aria-label="Footer navigation">
            <ul className="footer__nav-list">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer__nav-link"
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="footer__socials">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="footer__social-link"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © 2026 The Traitors India. Demo concept. Not officially affiliated with any
            broadcaster, production company, or rights holder.
          </p>
          <p className="footer__tagline">TRUST IS THE DEADLIEST GAME.</p>
        </div>
      </div>
    </footer>
  );
}
