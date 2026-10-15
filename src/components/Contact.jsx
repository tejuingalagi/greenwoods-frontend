import { useState } from 'react'
import {
  MapPin, Building2, Phone, Mail, Clock,
  MessageCircle, Calendar, Lock,
} from 'lucide-react'
import Reveal from './Reveal'
import { createEnquiry, getApiErrorMessage } from '../api/enquiryApi'
import './Contact.css'

const whatsappLink =
  'https://wa.me/918978979789?text=' +
  encodeURIComponent('Hi, I am interested in Green Woods, Bachupally.')

const emptyForm = {
  name: '', phone: '', email: '', interested: 'Any',
  budget: 'Not Sure', callTime: 'Anytime', message: '', homeLoan: '',
}

function Contact({ onEnquire }) {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle') // idle | sending | success
  const [error, setError] = useState('')

  const handleChange = (e) => {
    if (status === 'success') setStatus('idle')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      interestedIn: form.interested,
      budget: form.budget,
      bestTimeToCall: form.callTime,
      message: form.message.trim() || null,
      homeLoanRequired: form.homeLoan === 'Yes',
      source: 'CONTACT_FORM',
    }

    try {
      await createEnquiry(payload)
      setStatus('success')
      setForm(emptyForm)
    } catch (err) {
      setError(getApiErrorMessage(err))
      setStatus('idle')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container contact-grid">
        <Reveal direction="left">
          <form className="contact-card" onSubmit={handleSubmit}>
            <p className="contact-label">GET IN TOUCH</p>
            <h2 className="contact-title">Reserve Your Future Home</h2>
            <p className="contact-sub">
              Fill in your details and our sales team will be in touch within 24 hours.
            </p>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="c-name">FULL NAME *</label>
                <input id="c-name" name="name" required
                  value={form.name} onChange={handleChange} />
              </div>
              <div className="cf-field">
                <label htmlFor="c-phone">MOBILE NUMBER *</label>
                <div className="cf-phone">
                  <span>+91</span>
                  <input id="c-phone" name="phone" type="tel" required
                    inputMode="numeric" pattern="[0-9]{10}" maxLength={10}
                    placeholder="81234 56789"
                    value={form.phone} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="c-email">EMAIL</label>
                <input id="c-email" name="email" type="email"
                  value={form.email} onChange={handleChange} />
              </div>
              <div className="cf-field">
                <label htmlFor="c-int">I AM INTERESTED IN *</label>
                <select id="c-int" name="interested" required
                  value={form.interested} onChange={handleChange}>
                  <option>Any</option>
                  <option>2 BHK</option>
                  <option>3 BHK</option>
                  <option>Duplex Garden Villa</option>
                  <option>Triplex Sky Villa</option>
                </select>
              </div>
            </div>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="c-budget">BUDGET RANGE</label>
                <select id="c-budget" name="budget"
                  value={form.budget} onChange={handleChange}>
                  <option>Not Sure</option>
                  <option>Below ₹1 Cr</option>
                  <option>₹1 Cr – ₹1.5 Cr</option>
                  <option>₹1.5 Cr – ₹2 Cr</option>
                  <option>Above ₹2 Cr</option>
                </select>
              </div>
              <div className="cf-field">
                <label htmlFor="c-time">BEST TIME TO CALL</label>
                <select id="c-time" name="callTime"
                  value={form.callTime} onChange={handleChange}>
                  <option>Anytime</option>
                  <option>Morning (9 AM – 12 PM)</option>
                  <option>Afternoon (12 PM – 4 PM)</option>
                  <option>Evening (4 PM – 6 PM)</option>
                </select>
              </div>
            </div>

            <div className="cf-field">
              <label htmlFor="c-msg">MESSAGE / QUERY</label>
              <textarea id="c-msg" name="message" rows={4}
                value={form.message} onChange={handleChange} />
            </div>

            <div className="cf-loan">
              <p>HOME LOAN REQUIRED *</p>
              <label>
                <input type="radio" name="homeLoan" value="Yes" required
                  checked={form.homeLoan === 'Yes'} onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="radio" name="homeLoan" value="No" required
                  checked={form.homeLoan === 'No'} onChange={handleChange} /> No
              </label>
            </div>

            {error && <p className="cf-error" role="alert">{error}</p>}
            {status === 'success' && (
              <p className="cf-success" role="status">
                Thank you! We have received your enquiry. Our sales team will
                call you within 24 hours.
              </p>
            )}

            <button type="submit" className="cf-submit"
              disabled={status === 'sending'}>
              {status === 'sending' ? 'SENDING...' : 'SUBMIT ENQUIRY'}
            </button>
            <p className="cf-safe">
              <Lock size={12} /> Your details are safe with us. No spam, ever.
            </p>
          </form>
        </Reveal>

        <Reveal direction="right" delay={120}>
          <div className="visit">
            <p className="visit-label">VISIT US</p>
            <h3 className="visit-title">Pragathi Green Woods, Bachupally</h3>

            <ul className="visit-list">
              <li>
                <MapPin size={18} />
                <div>
                  <small>PROJECT</small>
                  <p>Pragathi Nagar, Bachupally, Hyderabad — 500043</p>
                </div>
              </li>
              <li>
                <Building2 size={18} />
                <div>
                  <small>SALES GALLERY</small>
                  <p>HC24+85, Pragathi Nagar, Bachupally, Hyderabad, Telangana 500043</p>
                </div>
              </li>
              <li>
                <Phone size={18} />
                <div>
                  <small>CALL</small>
                  <p>+91 8978979789<br />+91 9100361003</p>
                </div>
              </li>
              <li>
                <Mail size={18} />
                <div>
                  <small>EMAIL</small>
                  <p>info@pragathidevelopers.in</p>
                </div>
              </li>
              <li>
                <Clock size={18} />
                <div>
                  <small>HOURS</small>
                  <p>Mon–Sat 9:00 AM – 6:00 PM; Sun by appointment</p>
                </div>
              </li>
            </ul>

            <a href={whatsappLink} target="_blank" rel="noreferrer"
              className="visit-whatsapp">
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
            <button className="visit-site" onClick={onEnquire}>
              <Calendar size={16} /> Book a Site Visit
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact