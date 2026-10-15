import { useState, useEffect } from 'react'
import { X, ArrowRight, Phone } from 'lucide-react'
import { createEnquiry, getApiErrorMessage } from '../api/enquiryApi'
import './EnquiryModal.css'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  configuration: 'Any',
  homeLoan: '',
}

function EnquiryModal({ open, onClose }) {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle') // idle | sending | success
  const [error, setError] = useState('')

  // Close the popup when the Escape key is pressed
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Every time the popup opens, start with a clean state
  useEffect(() => {
    if (open) {
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
      interestedIn: form.configuration,
      homeLoanRequired: form.homeLoan === 'Yes',
      source: 'POPUP',
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        {status === 'success' ? (
          <div className="modal-success">
            <h2 className="modal-title">THANK YOU!</h2>
            <p className="modal-subtitle">
              We have received your enquiry. Our sales team will call you
              within 24 hours.
            </p>
            <button type="button" className="modal-submit" onClick={onClose}>
              CLOSE
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">ENQUIRE NOW</h2>
            <p className="modal-subtitle">
              Get a callback within 24 hours from our sales team.
            </p>

            <form onSubmit={handleSubmit}>
              <label className="modal-label" htmlFor="m-name">NAME *</label>
              <input
                id="m-name" name="name" className="modal-input" required
                placeholder="Enter your name"
                value={form.name} onChange={handleChange}
              />

              <label className="modal-label" htmlFor="m-email">EMAIL ADDRESS</label>
              <input
                id="m-email" name="email" type="email" className="modal-input"
                placeholder="Enter your email address"
                value={form.email} onChange={handleChange}
              />

              <label className="modal-label" htmlFor="m-phone">PHONE NUMBER *</label>
              <div className="modal-phone">
                <span>+91</span>
                <input
                  id="m-phone" name="phone" type="tel" required
                  inputMode="numeric" pattern="[0-9]{10}" maxLength={10}
                  placeholder="81234 56789"
                  value={form.phone} onChange={handleChange}
                />
              </div>

              <label className="modal-label" htmlFor="m-config">CONFIGURATION</label>
              <select
                id="m-config" name="configuration" className="modal-input"
                value={form.configuration} onChange={handleChange}
              >
                <option>Any</option>
                <option>2 BHK</option>
                <option>3 BHK</option>
                <option>Duplex Garden Villa</option>
                <option>Triplex Sky Villa</option>
              </select>

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

              {error && <p className="modal-error">{error}</p>}

              <button
                type="submit" className="modal-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'SENDING...' : 'REQUEST CALLBACK'}
                <span className="modal-arrow"><ArrowRight size={16} /></span>
              </button>
            </form>

            <p className="modal-note">
              <Phone size={16} /> Get callback in 24 hours
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default EnquiryModal