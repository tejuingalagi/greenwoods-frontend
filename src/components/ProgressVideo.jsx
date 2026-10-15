import { useState } from 'react'
import { Play } from 'lucide-react'
import Reveal from './Reveal'
import './ProgressVideo.css'
import poster from '../assets/hero1.webp' // placeholder picture for now

// videoSrc stays empty until the client uploads real videos later
const tabs = [
  { label: 'OVERALL — 52%', percent: '52%', caption: 'Overall — Mivan Structure Complete', videoSrc: '' },
  { label: 'TOWER A — 50%', percent: '50%', caption: 'Tower A — Structure Complete', videoSrc: '' },
  { label: 'TOWER B — 80%', percent: '80%', caption: 'Tower B — Structure Complete', videoSrc: '' },
  { label: 'TOWER C — 25%', percent: '25%', caption: 'Tower C — Structure Complete', videoSrc: '' },
]

function ProgressVideo() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const tab = tabs[active]

  const selectTab = (index) => {
    setActive(index)
    setPlaying(false)
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
        {playing && tab.videoSrc ? (
          <video src={tab.videoSrc} controls autoPlay />
        ) : (
          <button
            className="progress-play"
            onClick={() => tab.videoSrc && setPlaying(true)}
            aria-label="Play video"
          >
            <Play size={28} fill="currentColor" />
          </button>
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