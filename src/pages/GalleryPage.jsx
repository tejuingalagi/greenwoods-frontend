
import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import api from '../api/axiosInstance'
import { galleryTabs as initialGalleryTabs } from '../data/galleryData'
import './GalleryPage.css'

function GalleryPage() {
  const [galleryTabs, setGalleryTabs] = useState(
    initialGalleryTabs.map((tab) => ({ ...tab, images: [] }))
  )
  const [activeId, setActiveId] = useState(initialGalleryTabs[0].id)
  const [openIndex, setOpenIndex] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const loadGallery = useCallback(async () => {
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await api.get('/gallery')
      const publishedImages = response.data

      const updatedTabs = initialGalleryTabs.map((tab) => ({
        ...tab,
        images: publishedImages
          .filter(
            (item) =>
              String(item.category).toLowerCase() === tab.id.toLowerCase()
          )
          .map((item) => ({
            id: item.id,
            src: item.imageUrl,
            caption: item.caption,
          })),
      }))

      setGalleryTabs(updatedTabs)
    } catch (error) {
      console.error('Failed to load gallery:', error)
      setErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          'Unable to load gallery photos. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGallery()
  }, [loadGallery])

  const activeTab =
    galleryTabs.find((tab) => tab.id === activeId) || galleryTabs[0]

  const images = activeTab?.images || []
  const isOpen = openIndex !== null && images[openIndex] !== undefined

  const close = useCallback(() => setOpenIndex(null), [])

  const prev = useCallback(() => {
    setOpenIndex((index) =>
      index === null || images.length === 0
        ? null
        : (index - 1 + images.length) % images.length
    )
  }, [images.length])

  const next = useCallback(() => {
    setOpenIndex((index) =>
      index === null || images.length === 0
        ? null
        : (index + 1) % images.length
    )
  }, [images.length])

  const changeTab = (id) => {
    setActiveId(id)
    setOpenIndex(null)
  }

  useEffect(() => {
    if (!isOpen) return

    const onKey = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') prev()
      if (event.key === 'ArrowRight') next()
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close, prev, next])

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
          {loading && <p role="status">Loading gallery photos...</p>}

          {!loading && errorMessage && (
            <div role="alert">
              <p>{errorMessage}</p>
              <button type="button" onClick={loadGallery}>
                Try again
              </button>
            </div>
          )}

          {!loading && !errorMessage && (
            <Reveal key={activeId}>
              <div className="gal-grid">
                {images.map((img, index) => (
                  <figure key={img.id} className="gal-item">
                    <button
                      className="gal-thumb"
                      onClick={() => setOpenIndex(index)}
                      aria-label={`Open ${img.caption}`}
                    >
                      <img
                        src={img.src}
                        alt={img.caption}
                        loading="lazy"
                      />
                    </button>
                    <figcaption>{img.caption}</figcaption>
                  </figure>
                ))}
              </div>

              {images.length === 0 && (
                <p>No published photos in this category yet.</p>
              )}
            </Reveal>
          )}
        </div>
      </section>

      {isOpen && (
        <div className="gal-lightbox" onClick={close}>
          <button
            className="gal-close"
            onClick={close}
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <button
            className="gal-arrow left"
            onClick={(event) => {
              event.stopPropagation()
              prev()
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={32} />
          </button>

          <figure
            className="gal-lightbox-body"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={images[openIndex].src}
              alt={images[openIndex].caption}
            />
            <figcaption>
              {images[openIndex].caption} · {openIndex + 1} / {images.length}
            </figcaption>
          </figure>

          <button
            className="gal-arrow right"
            onClick={(event) => {
              event.stopPropagation()
              next()
            }}
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
