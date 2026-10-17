
import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { fetchEnquiries } from '../../api/adminEnquiryApi'
import { getApiErrorMessage } from '../../api/enquiryApi'
import EnquiryRow from './EnquiryRow'
import { STATUSES, SOURCE_OPTIONS } from './enquiryStatus'
import './AdminEnquiries.css'

function AdminEnquiries() {
  const [filter, setFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetchEnquiries(filter)
      .then(({ data }) => {
        if (!cancelled) {
          setEnquiries(data)
          setError('')
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(getApiErrorMessage(err))
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
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
    setReloadKey((key) => key + 1)
  }

  const handleUpdated = (updated) => {
    setEnquiries((list) =>
      list.map((enquiry) =>
        enquiry.id === updated.id ? updated : enquiry,
      ),
    )
  }

  const handleDeleted = (id) => {
    setEnquiries((list) =>
      list.filter((enquiry) => enquiry.id !== id),
    )
  }

  // Filter by form type on the enquiries already loaded.
  const visible = sourceFilter
    ? enquiries.filter((enquiry) => enquiry.source === sourceFilter)
    : enquiries

  return (
    <div>
      <div className="enq-header">
        <h1 className="admin-page-title">Enquiries</h1>

        {!loading && (
          <span className="enq-count">
            {visible.length} shown
          </span>
        )}
      </div>

      <div className="enq-toolbar">
        <label htmlFor="enq-filter">STATUS</label>

        <select
          id="enq-filter"
          className="enq-filter"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">All</option>

          {STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        <label htmlFor="enq-source">FORM</label>

        <select
          id="enq-source"
          className="enq-filter"
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
        >
          <option value="">All forms</option>

          {SOURCE_OPTIONS.map((source) => (
            <option key={source.value} value={source.value}>
              {source.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="enq-refresh"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw size={16} />
          {' '}Refresh
        </button>
      </div>

      {error && (
        <p className="enq-error" role="alert">
          {error}
        </p>
      )}

      {loading && (
        <p className="enq-state">Loading enquiries...</p>
      )}

      {!loading && !error && visible.length === 0 && (
        <p className="enq-state">No enquiries found.</p>
      )}

      {!loading && !error && visible.length > 0 && (
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
              {visible.map((enquiry) => (
                <EnquiryRow
                  key={enquiry.id}
                  enquiry={enquiry}
                  onUpdated={handleUpdated}
                  onDeleted={handleDeleted}
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
