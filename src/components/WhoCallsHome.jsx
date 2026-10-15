import { Briefcase, House, Sparkles, TrendingUp, Globe } from 'lucide-react'
import Reveal from './Reveal'
import './WhoCallsHome.css'

const buyers = [
  {
    icon: Briefcase,
    title: 'IT Professional',
    text: 'Premium home near ORR Exit 5 with seamless access to HITEC City and the Financial District.',
  },
  {
    icon: House,
    title: 'Families',
    text: 'Trusted hospitals minutes away — Usha Mullapudi Hospital (14 min), Usha Mullapudi Cardiac Centre, and Sri Sri Holistic Hospitals — plus 10+ international schools within 5 km.',
  },
  {
    icon: Sparkles,
    title: 'Lifestyle Upgrader',
    text: '60% open spaces, a 7-level clubhouse, and a pollution-free North Hyderabad address.',
  },
  {
    icon: TrendingUp,
    title: 'Future-First Investor',
    text: 'North Hyderabad growth corridor with strong long-term capital appreciation potential.',
  },
  {
    icon: Globe,
    title: 'NRI / HNI Buyer',
    text: 'Premium address, proven RERA-registered builder, transparent payment plans, easy remote booking.',
  },
]

function WhoCallsHome() {
  return (
    <section className="who" id="nri-buyers">
      <div className="container">
        <Reveal>
          <h2 className="who-title">Who calls Green Woods home</h2>
          <p className="who-subtitle">
            From IT professionals to NRI investors — Green Woods is shaped for
            distinct buyer journeys.
          </p>
        </Reveal>

        <div className="who-grid">
          {buyers.map((buyer, index) => {
            const Icon = buyer.icon
            return (
              <Reveal key={buyer.title} delay={index * 80}>
                <div className="who-card">
                  <span className="who-icon"><Icon size={20} /></span>
                  <h3>{buyer.title}</h3>
                  <p>{buyer.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhoCallsHome