import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Hero.css'
import slide1 from '../assets/hero.webp'
import slide2 from '../assets/hero1.webp'
import slide3 from '../assets/hero2.webp'

const slides = [slide1, slide2, slide3]

function Hero({ onEnquire }) {
  const [current, setCurrent] = useState(0)

  // Every time the slide changes, wait 5 seconds, then go to the next one
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearTimeout(timer)
  }, [current])

  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length)

  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="hero" id="home">
      {slides.map((image, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      <div className="hero-overlay" />

      <button
        className="hero-arrow hero-arrow-left"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="hero-arrow hero-arrow-right"
        onClick={goNext}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="hero-content">
        <span className="hero-badge">
          RERA APPROVED — P02200007121
        </span>

        <h1 className="hero-title">
          Experience Gated
          <br />
          Luxury in Bachupally
          <span className="hero-price">94 Lakhs onwards*</span>
        </h1>

        <p className="hero-text">
          Luxury Living across 3 Towers and 27 Floors — beside a
          1100-acre urban reserve forest.
        </p>

        <div className="hero-buttons">
          <button
            className="hero-btn-solid"
            onClick={onEnquire}
          >
            Book a Site Visit
          </button>

          <a
            href="#master-plan"
            className="hero-btn-outline"
          >
            View Floor Plans
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero