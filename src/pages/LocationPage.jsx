import { TrendingUp, Truck, Heart } from 'lucide-react'
import Reveal from '../components/Reveal'
import { landmarks, institutions } from '../data/locationData'
import './LocationPage.css'

const mapQuery = encodeURIComponent('HC24+85, Pragathi Nagar, Hyderabad, Telangana')

const reasons = [
  {
    icon: TrendingUp,
    tag: 'INVESTMENT GROWTH',
    title: 'High capital appreciation',
    text: 'North Hyderabad has seen strong price appreciation thanks to its proximity to the ORR, IT corridor, and upcoming infrastructure. Early buyers in Bachupally are positioned for long-term upside.',
  },
  {
    icon: Truck,
    tag: 'INFRASTRUCTURE',
    title: 'Connected by design',
    text: 'Just 5 minutes from ORR Exit 5, 20 minutes to HITEC City and the Financial District, and 40 minutes to RGIA Airport. Metro Phase II expansion brings rail connectivity even closer.',
  },
  {
    icon: Heart,
    tag: 'QUALITY OF LIFE',
    title: 'Greener, calmer, healthier',
    text: '60% open spaces, low-density living, 10+ international schools within 5 km, and quick access to top hospitals — Bachupally offers the calm of suburbia with the convenience of the city.',
  },
]

function TimeList({ title, subtitle, items }) {
  return (
    <div>
      <h2 className="loc-list-title">{title}</h2>
      <p className="loc-list-sub">{subtitle}</p>
      <ul className="loc-list">
        {items.map(([name, time]) => (
          <li key={name}>
            <span>{name}</span>
            <span className="loc-time">{time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LocationPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Connected to Everything That Matters</h1>
        <p>
          Pragathi Nagar, Bachupally, Hyderabad — 500043 · 5 min to ORR Exit 5
          · 20 min to HITEC City · 40 min to RGIA Airport.
        </p>
      </section>

      <section className="loc-map-section">
        <div className="container">
          <Reveal>
            <iframe
              className="loc-map"
              title="Green Woods location"
              src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="loc-caption">
              Pinned at Pragathi Green Woods, Pragathi Nagar, Bachupally,
              Hyderabad — 500043.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="loc-why">
        <div className="container">
          <Reveal>
            <p className="section-label">WHY BACHUPALLY</p>
            <h2 className="section-title">North Hyderabad&apos;s Growth Corridor</h2>
            <p className="section-subtitle">
              Three reasons why families and investors are choosing Bachupally —
              and why now.
            </p>
          </Reveal>

          <div className="loc-cards">
            {reasons.map((item, index) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={index * 100}>
                  <div className="loc-card">
                    <span className="loc-icon"><Icon size={20} /></span>
                    <p className="loc-tag">{item.tag}</p>
                    <h3>{item.title}</h3>
                    <p className="loc-card-text">{item.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="loc-lists">
        <div className="container loc-lists-grid">
          <Reveal direction="left">
            <TimeList
              title="Major Landmarks"
              subtitle="Drive-time from Green Woods"
              items={landmarks}
            />
          </Reveal>
          <Reveal direction="right" delay={120}>
            <TimeList
              title="Educational Institutions"
              subtitle="10+ international schools within 5km"
              items={institutions}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default LocationPage