import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import { getApiErrorMessage } from '../../api/enquiryApi'
import './AdminLogin.css'

function AdminLogin() {
  const { isAuthenticated, login } = useAuth()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const redirectTo = location.state?.from?.pathname || '/admin'

  // Already logged in (or just logged in): go to the admin area
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await login(form.email.trim(), form.password)
    } catch (err) {
      setError(getApiErrorMessage(err))
      setSending(false)
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1 className="admin-login-title">Admin Login</h1>
        <p className="admin-login-sub">Green Woods website management</p>

        <label htmlFor="a-email">EMAIL</label>
        <input
          id="a-email" name="email" type="email" required
          autoComplete="username"
          value={form.email} onChange={handleChange}
        />

        <label htmlFor="a-password">PASSWORD</label>
        <input
          id="a-password" name="password" type="password" required
          autoComplete="current-password"
          value={form.password} onChange={handleChange}
        />

        {error && <p className="admin-login-error" role="alert">{error}</p>}

        <button type="submit" className="admin-login-btn" disabled={sending}>
          {sending ? 'SIGNING IN...' : 'SIGN IN'}
        </button>

        <p className="admin-login-note">
          <Lock size={12} /> Authorised staff only
        </p>
      </form>
    </div>
  )
}

export default AdminLogin