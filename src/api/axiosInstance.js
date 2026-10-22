
import axios from 'axios'
import { clearSession, getToken } from '../auth/tokenStorage'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Request interceptor: attach the token when we have one
api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Let Axios/browser set the correct Content-Type for FormData uploads.
  // Use JSON for normal object requests.
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  } else if (
    config.data &&
    typeof config.data === 'object' &&
    !(config.data instanceof URLSearchParams)
  ) {
    config.headers['Content-Type'] = 'application/json'
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
