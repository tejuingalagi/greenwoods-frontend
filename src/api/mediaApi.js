
import api from './axiosInstance'


export async function uploadMedia(file, folder) {
  const formData = new FormData()
  

  formData.append('file', file)
  formData.append('folder', folder)

  const response = await api.post('/admin/media', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

  return response.data
}
