import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Download, ChevronDown, Menu, X } from 'lucide-react'
import './NavBar.css'
import logo from '../assets/logo.png'

const canHover = () => window.matchMedia('(hover: hover)').matches

function Navbar({ onEnquire }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)

  const closeAll = () => {
    setMenuOpen(false)
    setDropOpen(false)
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeAll}>
        <img src={logo} alt="Green Woods logo" className="navbar-logo" />
        <span className="navbar-tagline">BY PRAGATHI DEVELOPERS</span>
      </Link>

      <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <div
          className="nav-drop"
          onMouseEnter={() => canHover() && setDropOpen(true)}
          onMouseLeave={() => canHover() && setDropOpen(false)}
        >
          <button
            className={`nav-drop-btn ${dropOpen ? 'open' : ''}`}
            onClick={() => (canHover() ? setDropOpen(true) : setDropOpen(!dropOpen))}
            aria-expanded={dropOpen}
          >
            Green Woods <ChevronDown size={16} />
          </button>

          {dropOpen && (
            <div className="nav-drop-menu">
              <NavLink to="/location" onClick={closeAll}>Location</NavLink>
              <NavLink to="/gallery" onClick={closeAll}>Gallery</NavLink>
            </div>
          )}
        </div>

        <NavLink to="/floor-plans" onClick={closeAll}>Floor Plans</NavLink>
        <NavLink to="/specifications" onClick={closeAll}>Specifications</NavLink>
        <Link to="/#amenities" onClick={closeAll}>Amenities</Link>
        <Link to="/#videos" onClick={closeAll}>Progress Videos</Link>
        <NavLink to="/price" onClick={closeAll}>Price</NavLink>
        <Link to="/#contact" onClick={closeAll}>Contact</Link>

        <div className="navbar-panel-actions">
          <a href="/brochure.pdf" download className="btn-outline">
            <Download size={16} /> Brochure
          </a>
          <button
            className="btn-orange"
            onClick={() => { closeAll(); onEnquire() }}
          >
            Enquire
          </button>
        </div>
      </nav>

      <div className="navbar-actions">
        <a href="/brochure.pdf" download className="btn-outline">
          <Download size={16} /> Brochure
        </a>
        <button className="btn-orange" onClick={onEnquire}>Enquire</button>
      </div>

      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>
    </header>
  )
}

export default Navbar