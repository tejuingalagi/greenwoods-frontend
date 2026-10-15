import { useState } from 'react'
import { LayoutGrid } from 'lucide-react'
import Reveal from './Reveal'
import './MasterPlan.css'
import masterPlan from '../assets/master-plan.jpg'

// x and y are the marker position as a % of the image
const places = [
  { id: 1, name: 'Main Entry & Drop-off Plaza', x: 74, y: 79 },
  { id: 2, name: 'Tower A', x: 34, y: 53 },
  { id: 3, name: 'Tower B', x: 55, y: 36 },
  { id: 4, name: 'Tower C', x: 58, y: 61 },
  { id: 5, name: '7-Level Exclusive Clubhouse', x: 29, y: 32 },
  { id: 6, name: 'Terrace Swimming Pool & Deck', x: 36, y: 32 },
  { id: 7, name: '8-Shaped Garden', x: 76, y: 62 },
  { id: 8, name: 'Buddha Landscape', x: 66, y: 40 },
  { id: 9, name: 'Designer Walkways & Seating', x: 55, y: 53 },
  { id: 10, name: 'Children Play Area', x: 44, y: 50 },
  { id: 11, name: 'Basketball Court', x: 42, y: 63 },
  { id: 12, name: 'Outdoor Yoga Lawn', x: 45, y: 45 },
  { id: 13, name: 'Amphitheater', x: 53, y: 16 },
  { id: 14, name: 'Skating Rink', x: 49, y: 20 },
]

function MasterPlan() {
  const [active, setActive] = useState(null)

  return (
    <section className="plan" id="master-plan">
      <div className="container">
        <Reveal>
          <p className="section-label">MASTER PLAN</p>

          <h2 className="section-title">
            The Site, Thoughtfully Planned
          </h2>

          <p className="section-subtitle">
            3.05 acres · 3 Towers · 27 Floors each · 477 Units · 60% Open Spaces.
          </p>
        </Reveal>

        <div className="plan-grid">
          <Reveal direction="left">
            <div className="plan-map">
              <img
                src={masterPlan}
                alt="Green Woods master plan"
              />

              {places.map((p) => (
                <button
                  key={p.id}
                  className={`plan-marker ${
                    active === p.id ? 'active' : ''
                  }`}
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                  }}
                  onMouseEnter={() => setActive(p.id)}
                  onMouseLeave={() => setActive(null)}
                  aria-label={p.name}
                >
                  {p.id}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={120}>
            <div className="legend">
              <p className="legend-label">LEGEND</p>

              <h3 className="legend-title">
                Master Plan Key
              </h3>

              <ul className="legend-list">
                {places.map((p) => (
                  <li
                    key={p.id}
                    className={`legend-item ${
                      active === p.id ? 'active' : ''
                    }`}
                    onMouseEnter={() => setActive(p.id)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <span className="legend-num">
                      {p.id}
                    </span>

                    {p.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="plan-cta">
          <a href="#floor-plans" className="plan-button">
            <LayoutGrid size={14} /> VIEW FLOOR PLANS
          </a>
        </div>
      </div>
    </section>
  )
}

export default MasterPlan