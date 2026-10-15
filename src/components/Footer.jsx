import './Footer.css'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const quickLinks = [
  { label: 'About Us', href: '/#overview' },
  { label: 'Floor Plans', href: '/#master-plan' },
  { label: 'Amenities', href: '/#amenities' },
  { label: 'Location', href: '/location' },
  { label: 'NRI Buyers', href: '/#nri-buyers' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src={logo} alt="Green Woods" className="footer-logo" />

          <p className="footer-about">
            Experience premium gated living at Bachupally with world-class
            amenities, seamless connectivity, and future-ready investment value.
          </p>

          <p className="footer-rera">
            <span>RERA: P02200007121</span>

            <a
              href="https://rera.telangana.gov.in"
              target="_blank"
              rel="noreferrer"
            >
              verify
            </a>
          </p>
        </div>

        <div>
          <h4>CONTACT</h4>

          <p>+91 8978979789</p>
          <p>+91 9100361003</p>
          <p>info@pragathidevelopers.in</p>

          <p className="footer-muted">
            HC24+85, Pragathi Nagar, Bachupally, Hyderabad, Telangana 500043
          </p>

          <p className="footer-muted">
            Mon–Sat 9:00 AM – 6:00 PM; Sun by appointment
          </p>
        </div>

        <div>
          <h4>QUICK LINKS</h4>

          {quickLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="footer-link"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-bottom-row">
          <p>© 2026 Pragathi Developers. All rights reserved.</p>

          <p className="footer-legal">
            <a href="#home">Privacy</a> · <a href="#home">Cookies</a> ·{' '}
            <a href="#home">Terms</a> · <a href="#home">DPDP Request</a>
          </p>
        </div>

        <p className="footer-disclaimer">
          Images, prices and amenities are indicative and subject to change.
          Visit the site office for the latest information.
        </p>
      </div>
    </footer>
  )
}

export default Footer