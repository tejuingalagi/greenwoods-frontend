import axios from 'axios'
import { clearSession, getToken } from '../auth/tokenStorage'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor: attach the token when we have one
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: on 401, log out (except for the login call itself)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginCall = error.config?.url?.includes('/auth/login')
    if (error.response?.status === 401 && !isLoginCall) {
      clearSession()
      window.dispatchEvent(new Event('gw:unauthorized'))
    }
    return Promise.reject(error)
  }
)

export default api