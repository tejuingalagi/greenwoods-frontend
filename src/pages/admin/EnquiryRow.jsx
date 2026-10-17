
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { updateEnquiryStatus } from '../../api/adminEnquiryApi'
import { getApiErrorMessage } from '../../api/enquiryApi'
import { STATUSES, sourceLabel } from './enquiryStatus'

function formatDate(iso) {
  if (!iso) return '—'

  const date = new Date(iso)

  if (Number.isNaN(date.getTime())) return '—'

  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function formatVisitDate(iso) {
  if (!iso) return '—'

  const date = new Date(`${iso}T00:00:00`)

  if (Number.isNaN(date.getTime())) return '—'

  return date.toLocaleDateString('en-IN', {
    dateStyle: 'medium',
  })
}

function yesNo(value) {
  if (value === true) return 'Yes'
  if (value === false) return 'No'
  return '—'
}

function EnquiryRow({ enquiry, onUpdated }) {
  const [status, setStatus] = useState(enquiry.status)
  const [notes, setNotes] = useState(enquiry.notes ?? '')
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState({
    text: '',
    isError: false,
  })

  const changed =
    status !== enquiry.status ||
    notes.trim() !== (enquiry.notes ?? '')

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
    setFeedback({ text: '', isError: false })
  }

  const handleNotesChange = (e) => {
    setNotes(e.target.value)
    setFeedback({ text: '', isError: false })
  }

  const handleSave = async () => {
    setSaving(true)
    setFeedback({ text: '', isError: false })

    try {
      const { data } = await updateEnquiryStatus(
        enquiry.id,
        status,
        notes,
      )

      onUpdated(data)
      setStatus(data.status)
      setNotes(data.notes ?? '')
      setFeedback({ text: 'Saved', isError: false })
    } catch (err) {
      setFeedback({
        text: getApiErrorMessage(err),
        isError: true,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <tr>
        <td>{formatDate(enquiry.createdAt)}</td>

        <td>
          <strong>{enquiry.name}</strong>
        </td>

        <td>
          {enquiry.phone}

          {enquiry.email && (
            <>
              <br />
              <small>{enquiry.email}</small>
            </>
          )}
        </td>

        <td>{enquiry.interestedIn || '—'}</td>

        <td>
          <span className="enq-source">
            {sourceLabel(enquiry.source)}
          </span>

          {enquiry.source === 'SITE_VISIT' &&
            enquiry.visitDate && (
              <small className="enq-visit">
                {formatVisitDate(enquiry.visitDate)}
                {' · '}
                {enquiry.timeSlot || '—'}
              </small>
            )}
        </td>

        <td>
          <select
            className="enq-select"
            data-status={status}
            value={status}
            onChange={handleStatusChange}
            aria-label={`Status for ${enquiry.name}`}
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {changed && (
            <button
              type="button"
              className="enq-save"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          )}

          {feedback.text && (
            <p
              className={
                feedback.isError
                  ? 'enq-msg-err'
                  : 'enq-msg-ok'
              }
            >
              {feedback.text}
            </p>
          )}
        </td>

        <td>
          <button
            type="button"
            className="enq-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            {open ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
            {' '}
            Details
          </button>
        </td>
      </tr>

      {open && (
        <tr className="enq-detail-row">
          <td colSpan={7}>
            <div className="enq-detail-grid">
              <div>
                <span className="enq-label">BUDGET</span>
                <p>{enquiry.budget || '—'}</p>
              </div>

              <div>
                <span className="enq-label">
                  BEST TIME TO CALL
                </span>
                <p>{enquiry.bestTimeToCall || '—'}</p>
              </div>

              <div>
                <span className="enq-label">
                  HOME LOAN REQUIRED
                </span>
                <p>{yesNo(enquiry.homeLoanRequired)}</p>
              </div>

              {enquiry.source === 'SITE_VISIT' && (
                <>
                  <div>
                    <span className="enq-label">
                      VISIT DATE
                    </span>
                    <p>{formatVisitDate(enquiry.visitDate)}</p>
                  </div>

                  <div>
                    <span className="enq-label">
                      TIME SLOT
                    </span>
                    <p>{enquiry.timeSlot || '—'}</p>
                  </div>

                  <div>
                    <span className="enq-label">
                      VISITORS
                    </span>
                    <p>{enquiry.visitors ?? '—'}</p>
                  </div>
                </>
              )}

              <div className="enq-wide">
                <span className="enq-label">MESSAGE</span>
                <p className="enq-pre">
                  {enquiry.message || '—'}
                </p>
              </div>

              <div className="enq-wide">
                <label
                  className="enq-label"
                  htmlFor={`notes-${enquiry.id}`}
                >
                  NOTES (only your team sees these)
                </label>

                <textarea
                  id={`notes-${enquiry.id}`}
                  rows={3}
                  maxLength={1000}
                  value={notes}
                  onChange={handleNotesChange}
                />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default EnquiryRow
