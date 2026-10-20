import api from './axiosInstance'

export const fetchAdminGallery = () => api.get('/admin/gallery')

export const createGalleryItem = (data) => api.post('/admin/gallery', data)

export const updateGalleryItem = (id, data) => api.put(`/admin/gallery/${id}`, data)

export const deleteGalleryItem = (id) => api.delete(`/admin/gallery/${id}`)

// The backend update needs the whole item, so we build it from the current one
export const toGalleryRequest = (item, changes = {}) => ({
  category: item.category,
  caption: item.caption,
  imageKey: item.imageKey,
  published: item.published,
  sortOrder: item.sortOrder,
  ...changes,
})