const KEY = 'gw_admin_session'

function decodePayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

export function isTokenExpired(token) {
  const payload = decodePayload(token)
  if (!payload?.exp) return true
  return payload.exp * 1000 <= Date.now()
}

export function saveSession(session) {
  localStorage.setItem(KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(KEY)
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (!session?.token || isTokenExpired(session.token)) {
      clearSession()
      return null
    }
    return session
  } catch {
    return null
  }
}

export function getToken() {
  return loadSession()?.token ?? null
}