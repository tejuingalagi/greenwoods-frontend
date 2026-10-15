import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

function ProtectedRoute() {
  const { isAuthenticated, session } = useAuth()
  const location = useLocation()

  if (!isAuthenticated || session?.role !== 'ADMIN') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute