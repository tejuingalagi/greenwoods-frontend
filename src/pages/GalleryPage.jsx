import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import { galleryTabs } from '../data/galleryData'
import './GalleryPage.css'

function GalleryPage() {
  const [activeId, setActiveId] = useState(galleryTabs[0].id)
  const [openIndex, setOpenIndex] = useState(null)

  const images = galleryTabs.find((t) => t.id === activeId).images
  const isOpen = openIndex !== null

  const close = () => setOpenIndex(null)
  const prev = () => setOpenIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setOpenIndex((i) => (i + 1) % images.length)

  const changeTab = (id) => {
    setActiveId(id)
    setOpenIndex(null)
  }

  // keyboard: Esc closes, arrows move
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, images.length])

  return (
    <>
      <section className="page-hero">
        <h1>Gallery</h1>
        <p>Elevations, landscape, clubhouse, and interiors of Green Woods.</p>
      </section>

      <div className="gal-tabs-bar">
        <div className="gal-tabs">
          {galleryTabs.map((tab) => (
            <button
              key={tab.id}
              className={`gal-tab ${tab.id === activeId ? 'active' : ''}`}
              onClick={() => changeTab(tab.id)}
            >
              {tab.label} <span>({tab.images.length})</span>
            </button>
          ))}
        </div>
      </div>

      <section className="gal-section">
        <div className="container">
          <Reveal key={activeId}>
            <div className="gal-grid">
              {images.map((img, index) => (
                <figure key={img.src} className="gal-item">
                  <button
                    className="gal-thumb"
                    onClick={() => setOpenIndex(index)}
                    aria-label={`Open ${img.caption}`}
                  >
                    <img src={img.src} alt={img.caption} loading="lazy" />
                  </button>
                  <figcaption>{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {isOpen && (
        <div className="gal-lightbox" onClick={close}>
          <button className="gal-close" onClick={close} aria-label="Close">
            <X size={28} />
          </button>
          <button
            className="gal-arrow left"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous"
          >
            <ChevronLeft size={32} />
          </button>
          <figure className="gal-lightbox-body" onClick={(e) => e.stopPropagation()}>
            <img src={images[openIndex].src} alt={images[openIndex].caption} />
            <figcaption>
              {images[openIndex].caption} · {openIndex + 1} / {images.length}
            </figcaption>
          </figure>
          <button
            className="gal-arrow right"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  )
}

export default GalleryPage