import api from "./axiosInstance";

export const createEnquiry = (data) => api.post("/enquiries", data);

export const getApiErrorMessage = (err) => {
  if (!err.response) {
    return 'Cannot reach the server. Please try again in a moment.'
  }

  const data = err.response.data

  if (data?.fieldErrors) {
    return Object.values(data.fieldErrors).join(' ')
  }

  return data?.message || data?.error || 'Something went wrong. Please try again.'
}