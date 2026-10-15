import { Outlet } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import './AdminLayout.css'

function AdminLayout() {
  const { session, logout } = useAuth()

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <strong className="admin-brand">Green Woods · Admin</strong>
        <div className="admin-user">
          <span>{session?.email}</span>
          <button type="button" onClick={logout}>
            <LogOut size={16} /> Log out
          </button>
        </div>
      </header>

      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout