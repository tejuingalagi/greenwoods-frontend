import { useState } from 'react'
import { Send, Lock } from 'lucide-react'
import { createEnquiry, getApiErrorMessage } from '../api/enquiryApi'
import './FloorPlanForm.css'

const emptyForm = { name: '', phone: '', email: '', homeLoan: '' }

function FloorPlanForm({ plans, selected, onSelect }) {
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
      interestedIn: selected,
      homeLoanRequired: form.homeLoan === 'Yes',
      source: 'FLOOR_PLAN',
    }

    try {
      await createEnquiry(payload)
      setStatus('success')
      setForm(emptyForm)
      onSelect('')
    } catch (err) {
      setError(getApiErrorMessage(err))
      setStatus('idle')
    }
  }

  return (
    <section className="fpf">
      <div className="fpf-head">
        <p className="fpf-label">REQUEST FLOOR PLAN</p>
        <h2>Get the floor plan you're interested in</h2>
        <p>
          Pick a unit configuration, share your contact, and our team will send
          the detailed floor plan to your phone within one business day.
        </p>
      </div>

      <form className="fpf-card" onSubmit={handleSubmit}>
        <label htmlFor="fp-plan">FLOOR PLAN YOU WANT *</label>
        <select
          id="fp-plan" required value={selected}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="">— Select a unit —</option>
          {plans.map((plan) => (
            <option key={plan.name} value={plan.name}>{plan.name}</option>
          ))}
        </select>

        <div className="fpf-row">
          <div>
            <label htmlFor="fp-name">FULL NAME *</label>
            <input
              id="fp-name" name="name" required
              value={form.name} onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="fp-phone">MOBILE NUMBER *</label>
            <div className="fpf-phone">
              <span>+91</span>
              <input
                id="fp-phone" name="phone" type="tel" required
                inputMode="numeric" pattern="[0-9]{10}" maxLength={10}
                placeholder="81234 56789"
                value={form.phone} onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <label htmlFor="fp-email">EMAIL (OPTIONAL)</label>
        <input
          id="fp-email" name="email" type="email"
          value={form.email} onChange={handleChange}
        />

        <div className="fpf-loan">
          <p>HOME LOAN REQUIRED *</p>
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

        {error && <p className="fpf-error" role="alert">{error}</p>}
        {status === 'success' && (
          <p className="fpf-success" role="status">
            Thank you! We have received your request. Our team will contact you soon.
          </p>
        )}

        <button type="submit" className="fpf-submit" disabled={status === 'sending'}>
          <Send size={14} />
          {status === 'sending' ? 'SENDING...' : 'REQUEST FLOOR PLAN'}
        </button>

        <p className="fpf-safe">
          <Lock size={12} /> Your details are safe with us. No spam — just the
          floor plan you asked for.
        </p>
      </form>
    </section>
  )
}

export default FloorPlanForm