import { MessageSquare, Download, MessageCircle } from 'lucide-react'
import './FloatingButtons.css'

const whatsappLink =
  'https://wa.me/918978979789?text=' +
  encodeURIComponent('Hi, I am interested in Green Woods, Bachupally.')

function FloatingButtons({ onEnquire }) {
  return (
    <div className="floating">
      <button className="float-btn float-dark" onClick={onEnquire}>
        <span className="float-label">Enquire Now</span>
        <MessageSquare size={24} />
        <span className="float-dot" />
      </button>

      <a className="float-btn float-orange" href="/brochure.pdf" download>
        <span className="float-label">Download Brochure</span>
        <Download size={24} />
      </a>

      <a
        className="float-btn float-green"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
      >
        <span className="float-label">Chat on WhatsApp</span>
        <MessageCircle size={24} />
      </a>
    </div>
  )
}

export default FloatingButtons