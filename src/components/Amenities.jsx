import {
  Zap, Sparkles, Film, BookOpen, Puzzle, Music,
  Presentation, Store, Building2, Users, Smile, Trophy, ArrowRight,
} from 'lucide-react'
import Reveal from './Reveal'
import './Amenities.css'
import clubhouse from '../assets/clubhouse.webp'
import pool from '../assets/landscape-pool.webp'
import { Link } from 'react-router-dom'
import { amenityList } from '../data/amenitiesData'

const amenities = [
  { icon: Zap, name: 'Centralized A/c Gym' },
  { icon: Sparkles, name: 'Terrace Swimming Pool with Deck' },
  { icon: Film, name: 'Home Theatre' },
  { icon: BookOpen, name: 'Library & Study Spaces' },
  { icon: Puzzle, name: 'Indoor Games Enclave' },
  { icon: Music, name: 'Party Deck Area' },
  { icon: Presentation, name: 'Conference Rooms' },
  { icon: Store, name: 'Super Market' },
  { icon: Building2, name: 'Two Guest Suites' },
  { icon: Users, name: 'Multi-purpose Hall' },
  { icon: Smile, name: 'Children Play Area' },
  { icon: Trophy, name: 'Basketball Court' },
]

function Amenities() {
  return (
    <section className="amenities" id="amenities">
      <div className="container">
        <Reveal>
          <p className="amenities-label">CLUB GREEN WOODS</p>
          <h2 className="amenities-title">7 Levels · 60+ Modern Amenities</h2>
          <p className="amenities-subtitle">
            The exclusive Clubhouse sits at the heart of the community — spaces
            to connect, unwind, work out, or simply enjoy weekends with family.
          </p>
        </Reveal>

        <div className="amenities-images">
          <Reveal direction="left">
            <img src={clubhouse} alt="Green Woods Clubhouse" />
          </Reveal>
          <Reveal direction="right" delay={120}>
            <img src={pool} alt="Terrace swimming pool and deck" />
          </Reveal>
        </div>

        <div className="amenities-grid">
          {amenities.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.name} delay={(index % 4) * 80}>
                <div className="amenity-card">
                  <Icon size={24} />
                  <p className="amenity-tag">CLUBHOUSE</p>
                  <p className="amenity-name">{item.name}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="amenities-more">
          <Link to="/amenities" className="amenities-button">
  VIEW ALL {amenityList.length} AMENITIES <ArrowRight size={16} />
</Link>
        </div>
      </div>
    </section>
  )
}

export default Amenities