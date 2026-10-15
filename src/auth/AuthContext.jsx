import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { login as loginRequest } from '../api/authApi'
import { clearSession, loadSession, saveSession } from './tokenStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadSession())

  const login = useCallback(async (email, password) => {
    const { data } = await loginRequest(email, password)
    const newSession = { token: data.token, email: data.email, role: data.role }
    saveSession(newSession)
    setSession(newSession)
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setSession(null)
  }, [])

  // The Axios interceptor fires this event when the server answers 401
  useEffect(() => {
    const onUnauthorized = () => setSession(null)
    window.addEventListener('gw:unauthorized', onUnauthorized)
    return () => window.removeEventListener('gw:unauthorized', onUnauthorized)
  }, [])

  const value = { session, isAuthenticated: !!session, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}