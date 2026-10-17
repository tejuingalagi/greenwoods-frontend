import { useState } from 'react'
import { Play } from 'lucide-react'
import Reveal from './Reveal'
import './ProgressVideo.css'
import poster from '../assets/hero1.webp' // placeholder picture for now

// videoUrl stays empty until the client adds a YouTube or Vimeo link
const tabs = [
  { label: 'OVERALL — 52%', percent: '52%', caption: 'Overall — Mivan Structure Complete', videoUrl: '' },
  { label: 'TOWER A — 50%', percent: '50%', caption: 'Tower A — Structure Complete', videoUrl: '' },
  { label: 'TOWER B — 80%', percent: '80%', caption: 'Tower B — Structure Complete', videoUrl: '' },
  { label: 'TOWER C — 25%', percent: '25%', caption: 'Tower C — Structure Complete', videoUrl: '' },
]

// Turns a normal YouTube or Vimeo link into an embeddable one.
// Any other kind of link returns null, so nothing unsafe is ever embedded.
function toEmbedUrl(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = u.pathname.slice(1)
      if (id) return `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1`
    }

    if (host === 'youtube.com') {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1`
    }

    if (host === 'vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean)[0]
      if (id) return `https://player.vimeo.com/video/${encodeURIComponent(id)}?autoplay=1`
    }
  } catch {
    // not a valid link
  }
  return null
}

function ProgressVideo() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [soon, setSoon] = useState(false)
  const tab = tabs[active]
  const embedUrl = toEmbedUrl(tab.videoUrl)

  const selectTab = (index) => {
    setActive(index)
    setPlaying(false)
    setSoon(false)
  }

  const handlePlay = () => {
    if (embedUrl) {
      setPlaying(true)
    } else {
      setSoon(true)
    }
  }

  return (
    <section className="progress" id="videos">
      <Reveal>
        <p className="section-label">CONSTRUCTION</p>
        <h2 className="section-title">Progress Video</h2>

        <div className="progress-tabs">
          {tabs.map((t, index) => (
            <button
              key={t.label}
              className={`progress-tab ${index === active ? 'active' : ''}`}
              onClick={() => selectTab(index)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div
        className="progress-video"
        style={{ backgroundImage: `url(${poster})` }}
      >
        {playing && embedUrl ? (
          <iframe
            src={embedUrl}
            title={tab.caption}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            <button
              className="progress-play"
              onClick={handlePlay}
              aria-label="Play video"
            >
              <Play size={28} fill="currentColor" />
            </button>
            {soon && (
              <p className="progress-soon" role="status">
                Video coming soon. Visit our site office to see the progress.
              </p>
            )}
          </>
        )}
      </div>

      <Reveal>
        <div className="progress-stat">
          <p className="progress-percent">{tab.percent}</p>
          <p className="progress-caption">{tab.caption}</p>
          <p className="progress-note">
            Visit our site office any time — watch the towers rise floor by floor.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

export default ProgressVideo