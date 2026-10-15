import { MapPin } from 'lucide-react'
import Reveal from './Reveal'
import './Overview.css'

const stats = [
  { value: '3.05', label: 'ACRES' },
  { value: '3', label: 'TOWERS' },
  { value: '27', label: 'FLOORS / TOWER' },
  { value: '477', label: '2 & 3 BHK APARTMENTS' },
  { value: 'Duplex', label: 'GARDEN VILLAS', small: true },
  { value: 'Triplex', label: 'SKY VILLAS', small: true },
  { value: '7', label: 'LEVEL CLUBHOUSE' },
  { value: '5', label: 'LEVEL CAR PARKING' },
  { value: '60%', label: 'OPEN SPACES' },
]

function Overview() {
  return (
    <>
      <section className="overview" id="overview">
        <div className="container highlights">
          <Reveal direction="left">
            <div className="highlight">
              <div>
                <span className="highlight-number">1100</span>
                <span className="highlight-unit">ACRES</span>
              </div>
              <h3 className="highlight-title">Urban Reserve Forest</h3>
              <p className="highlight-text">
                Green Woods is blessed with an oxygen-rich forest in its
                neighbourhood — pleasant views, birds, and fresh breeze that
                make your home one-of-a-kind. The towers' design is deeply
                influenced by the forest's presence: explore expansive
                woodland through hiking, bird watching, and quiet immersion
                in nature.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120}>
            <div className="highlight">
              <div>
                <span className="highlight-number">60%</span>
                <span className="highlight-unit">OPEN SPACES</span>
              </div>
              <h3 className="highlight-title">Designed for Wellbeing</h3>
              <p className="highlight-text">
                Of the 3.05-acre community, more than 60% is left open — for
                wellness, recreation, and outdoor living. Buddha Landscape,
                8-Shaped Garden, Podium Landscape, designer walkways and
                seating — every footstep meets nature.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="overview-stats">
        <div className="container">
          <Reveal>
            <div className="overview-title">
              <h2>Green Woods</h2>
              <p className="overview-location">
                <MapPin size={14} /> Pragathi Nagar, Bachupally, Hyderabad — 500043
              </p>
            </div>

            <div className="stats">
              {stats.map((item) => (
                <div
                  className={`stat ${item.small ? 'stat-small' : ''}`}
                  key={item.label}
                >
                  <div className="stat-value">{item.value}</div>
                  <div className="stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Overview