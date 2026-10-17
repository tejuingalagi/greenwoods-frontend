import { useState, useEffect } from 'react'
import { X, ArrowRight, CalendarCheck } from 'lucide-react'
import { createEnquiry, getApiErrorMessage } from '../api/enquiryApi'
import { BHK_OPTIONS, TIME_SLOTS, VISITOR_COUNTS } from '../data/siteVisitOptions'
import './EnquiryModal.css'
import './SiteVisitModal.css'

// Today's date as yyyy-mm-dd in the visitor's own time zone
function todayLocal() {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

function prettyDate(iso) {
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-IN', { dateStyle: 'long' })
}

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  date: '',
  timeSlot: '',
  visitors: '1',
  bhk: 'Any',
  homeLoan: '',
}

function SiteVisitModal({ open, onClose }) {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle') // idle | sending | success
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Every time the popup opens, start with a clean form
  useEffect(() => {
    if (open) {
      setForm(emptyForm)
      setStatus('idle')
      setError('')
    }
  }, [open])

  if (!open) return null

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      interestedIn: form.bhk,
      homeLoanRequired: form.homeLoan === 'Yes',
      source: 'SITE_VISIT',
      visitDate: form.date,
      timeSlot: form.timeSlot,
      visitors: Number(form.visitors),
    }

    try {
      await createEnquiry(payload)
      setStatus('success')
    } catch (err) {
      setError(getApiErrorMessage(err))
      setStatus('idle')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        {status === 'success' ? (
          <div className="modal-success">
            <h2 className="modal-title">VISIT REQUESTED</h2>
            <p className="modal-subtitle">
              Thank you! We have noted your request. Our team will call you to
              confirm the visit.
            </p>
            <p className="sv-summary">
              <strong>{prettyDate(form.date)}</strong>
              <br />
              {form.timeSlot} · {form.visitors}{' '}
              {Number(form.visitors) === 1 ? 'visitor' : 'visitors'}
            </p>
            <button type="button" className="modal-submit" onClick={onClose}>
              CLOSE
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">BOOK A SITE VISIT</h2>
            <p className="modal-subtitle">
              Pick a date and time — our team will call you to confirm.
            </p>

            <form onSubmit={handleSubmit}>
              <label className="modal-label" htmlFor="sv-name">FULL NAME *</label>
              <input
                id="sv-name" name="name" className="modal-input" required
                placeholder="Enter your name"
                value={form.name} onChange={handleChange}
              />

              <div className="sv-row">
                <div>
                  <label className="modal-label" htmlFor="sv-phone">PHONE *</label>
                  <div className="modal-phone">
                    <span>+91</span>
                    <input
                      id="sv-phone" name="phone" type="tel" required
                      inputMode="numeric" pattern="[0-9]{10}" maxLength={10}
                      placeholder="81234 56789"
                      value={form.phone} onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="modal-label" htmlFor="sv-email">EMAIL</label>
                  <input
                    id="sv-email" name="email" type="email" className="modal-input"
                    placeholder="optional"
                    value={form.email} onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sv-row">
                <div>
                  <label className="modal-label" htmlFor="sv-date">PREFERRED DATE *</label>
                  <input
                    id="sv-date" name="date" type="date" className="modal-input"
                    required min={todayLocal()}
                    value={form.date} onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="modal-label" htmlFor="sv-slot">TIME SLOT *</label>
                  <select
                    id="sv-slot" name="timeSlot" className="modal-input" required
                    value={form.timeSlot} onChange={handleChange}
                  >
                    <option value="">Pick a time</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sv-row">
                <div>
                  <label className="modal-label" htmlFor="sv-visitors">VISITORS</label>
                  <select
                    id="sv-visitors" name="visitors" className="modal-input"
                    value={form.visitors} onChange={handleChange}
                  >
                    {VISITOR_COUNTS.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="modal-label" htmlFor="sv-bhk">BHK REQUIREMENT</label>
                  <select
                    id="sv-bhk" name="bhk" className="modal-input"
                    value={form.bhk} onChange={handleChange}
                  >
                    {BHK_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-loan">
                <p className="modal-label modal-label-tight">HOME LOAN REQUIRED *</p>
                <div className="modal-radios">
                  <label>
                    <input
                      type="radio" name="homeLoan" value="Yes" required
                      checked={form.homeLoan === 'Yes'} onChange={handleChange}
                    /> Yes
                  </label>
                  <label>
                    <input
                      type="radio" name="homeLoan" value="No" required
                      checked={form.homeLoan === 'No'} onChange={handleChange}
                    /> No
                  </label>
                </div>
              </div>

              {error && <p className="modal-error" role="alert">{error}</p>}

              <button
                type="submit" className="modal-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'SENDING...' : 'BOOK MY VISIT'}
                <span className="modal-arrow"><ArrowRight size={16} /></span>
              </button>
            </form>

            <p className="modal-note">
              <CalendarCheck size={16} /> We will call you to confirm the visit
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default SiteVisitModal