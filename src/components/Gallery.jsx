import Reveal from './Reveal'
import './Gallery.css'
import buddha from '../assets/landscape-buddha.webp'
import garden from '../assets/landscape-garden.webp'
import podium from '../assets/landscape-podium.webp'
import pool from '../assets/landscape-pool.webp'

const items = [
  { src: buddha, name: 'Buddha Landscape' },
  { src: garden, name: '8-Shaped Garden' },
  { src: podium, name: 'Podium Landscape' },
  { src: pool, name: 'Terrace Pool & Deck' },
]

function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <Reveal>
          <h2 className="gallery-title">
            Landscape designed for daily joy —<br />
            where every footstep meets nature.
          </h2>
        </Reveal>

        <div className="gallery-grid">
          {items.map((item, index) => (
            <Reveal key={item.name} delay={index * 100}>
              <figure className="gallery-item">
                <img src={item.src} alt={item.name} />
                <figcaption>{item.name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery