import { NavLink, Outlet } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'
import './AdminLayout.css'

function AdminLayout() {
  const { session, logout } = useAuth()

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <strong className="admin-brand">Green Woods · Admin</strong>

        <nav className="admin-nav">
          <NavLink to="/admin" end>Enquiries</NavLink>
          <NavLink to="/admin/gallery">Gallery</NavLink>
          <NavLink to="/admin/media">Media</NavLink>
        </nav>

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