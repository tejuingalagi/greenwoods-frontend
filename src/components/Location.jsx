import Reveal from './Reveal'
import './Location.css'

const groups = [
  {
    title: 'Major Landmarks',
    items: [
      ['Gandi Maisamma X Roads', '6 min'],
      ['Gajularamaram', '7 min'],
      ['ORR Exit No.5 (Dundigal)', '10 min'],
      ['Bowrampet', '10 min'],
      ['Bachupally', '12 min'],
      ["Rao's Cricket Ground", '12 min'],
      ['Lulu Mall, Kukatpally', '20 min'],
      ['Miyapur', '23 min'],
      ['Medical Devices Park', '23 min'],
      ['HITEC City', '27 min'],
      ['Financial District', '40 min'],
    ],
  },
  {
    title: 'Hospitals',
    items: [
      ['Usha Mullapudi Hospital', '14 min'],
      ['Usha Mullapudi Cardiac Centre', '14 min'],
      ['Sri Sri Holistic Hospitals', '18 min'],
    ],
  },
  {
    title: 'Schools',
    items: [
      ['The Creek International School', '6 min'],
      ['Sri Sloka School', '7 min'],
      ['Delhi Public School', '7 min'],
      ['Ambitus World School', '8 min'],
      ['Sri Veda Universe The School', '8 min'],
      ['VNRVJIET College', '8 min'],
    ],
  },
]

const mapQuery = encodeURIComponent('HC24+85, Pragathi Nagar, Hyderabad, Telangana')

function Location() {
  return (
    <section className="location" id="location">
      <div className="container">
        <Reveal>
          <p className="section-label">LOCATION & CONNECTIVITY</p>
          <h2 className="section-title">Connected to everything that matters</h2>
          <p className="section-subtitle">
            Pragathi Nagar, Bachupally, Hyderabad — 500043 · 5 min to ORR Exit 5
            · 20 min to HITEC City · 40 min to RGIA Airport.
          </p>
        </Reveal>

        <div className="location-grid">
          <Reveal direction="left">
            <div>
              <iframe
                className="location-map"
                title="Green Woods location"
                src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                className="location-open"
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps →
              </a>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120}>
            <div>
              {groups.map((group) => (
                <div className="location-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map(([name, time]) => (
                      <li key={name}>
                        <span>{name}</span>
                        <span className="location-time">{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Location