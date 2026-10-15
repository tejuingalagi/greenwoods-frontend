import { useState, useEffect } from 'react'
import { CircleCheck } from 'lucide-react'
import Reveal from './Reveal'
import './WhyChoose.css'
import imgGarden from '../assets/landscape-garden.webp'
import imgBuddha from '../assets/landscape-buddha.webp'
import imgPodium from '../assets/landscape-podium.webp'
import imgPool from '../assets/landscape-pool.webp'

const images = [
  { src: imgGarden, alt: '8-Shaped Garden' },
  { src: imgBuddha, alt: 'Buddha Landscape' },
  { src: imgPodium, alt: 'Podium Landscape' },
  { src: imgPool, alt: 'Terrace Pool and Deck' },
]

const points = [
  '1100-Acre Urban Reserve Forest as your neighbour',
  '60% Open Spaces — wellness, recreation, outdoor living',
  '3 Iconic Towers (G+27 Floors) redefining the Bachupally skyline',
  '477 Smartly Planned 2 BHK & 3 BHK Residences',
  '7-Level Exclusive Clubhouse with 60+ amenities',
  'Balconies on All 4 Sides — wake to sunrise, unwind at sunset, with forest views in every direction',
  'RERA Approved — TG-RERA P02200007121',
]

function WhyChoose() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearTimeout(timer)
  }, [current])

  return (
    <section className="why" id="why-choose">
      <div className="container why-grid">
        <Reveal direction="left">
          <div className="why-slider">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={`why-slide ${index === current ? 'active' : ''}`}
              />
            ))}

            <div className="why-dots">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`why-dot ${index === current ? 'active' : ''}`}
                  onClick={() => setCurrent(index)}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={120}>
          <div>
            <p className="why-label">WHY CHOOSE</p>
            <h2 className="why-title">Green Woods?</h2>

            <p className="why-intro">
              At Green Woods, every detail has been envisioned to create more
              than just homes — it builds a vibrant community where openness,
              design, and lifestyle come together seamlessly.
            </p>

            <div className="why-callout">
              <p className="why-callout-title">
                LARGE L-SHAPED BALCONIES ON 4 SIDES
              </p>
              <p>
                Large balconies (6&apos;7&quot; wide) on 4 sides of the towers
                create a connection between your living space and the
                surrounding greenery — designed to maximize fresh forest air
                and panoramic views.
              </p>
            </div>

            <ul className="why-list">
              {points.map((point) => (
                <li key={point}>
                  <CircleCheck size={18} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <a href="#contact" className="why-button">ENQUIRE NOW</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default WhyChoose