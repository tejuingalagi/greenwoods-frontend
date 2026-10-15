import api from './axiosInstance'

export const fetchEnquiries = (status) =>
  api.get('/admin/enquiries', { params: status ? { status } : {} })

export const updateEnquiryStatus = (id, status, notes) =>
  api.put(`/admin/enquiries/${id}/status`, { status, notes })