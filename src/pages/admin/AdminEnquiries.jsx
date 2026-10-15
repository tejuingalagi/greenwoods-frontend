import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { fetchEnquiries } from '../../api/adminEnquiryApi'
import { getApiErrorMessage } from '../../api/enquiryApi'
import EnquiryRow from './EnquiryRow'
import { STATUSES } from './enquiryStatus'
import './AdminEnquiries.css'

function AdminEnquiries() {
  const [filter, setFilter] = useState('')
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetchEnquiries(filter)
      .then(({ data }) => {
        if (!cancelled) setEnquiries(data)
      })
      .catch((err) => {
        if (!cancelled) setError(getApiErrorMessage(err))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [filter, reloadKey])

  const handleFilterChange = (e) => {
    setLoading(true)
    setError('')
    setFilter(e.target.value)
  }

  const handleRefresh = () => {
    setLoading(true)
    setError('')
    setReloadKey((k) => k + 1)
  }

  const handleUpdated = (updated) => {
    setEnquiries((list) => list.map((e) => (e.id === updated.id ? updated : e)))
  }

  return (
    <div>
      <div className="enq-header">
        <h1 className="admin-page-title">Enquiries</h1>
        {!loading && <span className="enq-count">{enquiries.length} shown</span>}
      </div>

      <div className="enq-toolbar">
        <label htmlFor="enq-filter">STATUS</label>
        <select
          id="enq-filter" className="enq-filter"
          value={filter} onChange={handleFilterChange}
        >
          <option value="">All</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <button type="button" className="enq-refresh" onClick={handleRefresh}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && <p className="enq-error" role="alert">{error}</p>}
      {loading && <p className="enq-state">Loading enquiries...</p>}
      {!loading && !error && enquiries.length === 0 && (
        <p className="enq-state">No enquiries found.</p>
      )}

      {!loading && enquiries.length > 0 && (
        <div className="enq-table-wrap">
          <table className="enq-table">
            <thead>
              <tr>
                <th>RECEIVED</th>
                <th>NAME</th>
                <th>CONTACT</th>
                <th>INTERESTED IN</th>
                <th>SOURCE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <EnquiryRow
                  key={enquiry.id}
                  enquiry={enquiry}
                  onUpdated={handleUpdated}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminEnquiries