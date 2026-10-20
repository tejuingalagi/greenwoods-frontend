
import { useState } from 'react'
import { uploadMedia } from '../../api/mediaApi'
import { getApiErrorMessage } from '../../api/enquiryApi'

function AdminMedia() {
  const [file, setFile] = useState(null)
  const [folder, setFolder] = useState('GALLERY')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)

  async function handleUpload(event) {
    event.preventDefault()

    if (!file) {
      setMessage('Please select an image first.')
      return
    }

    setLoading(true)
    setMessage('')
    setUploadedImage(null)

    try {
      const result = await uploadMedia(file, folder)

      setUploadedImage(result)
      setMessage('Image uploaded successfully!')
      setFile(null)
      event.target.reset()
    } catch (error) {
      const status = error.response?.status

      if (status === 401 || status === 403) {
        setMessage(
          'Your admin session may have expired. Please log in again.'
        )
      } else {
        setMessage(getApiErrorMessage(error))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h1>Media Upload</h1>
      <p>Upload images to the Green Woods private S3 bucket.</p>

      <form onSubmit={handleUpload}>
        <div>
          <label htmlFor="media-folder">Image folder</label>
          <select
            id="media-folder"
            value={folder}
            onChange={(event) => setFolder(event.target.value)}
          >
            <option value="GALLERY">Gallery</option>
            <option value="HERO">Hero</option>
            <option value="AMENITIES">Amenities</option>
            <option value="FLOOR_PLANS">Floor Plans</option>
            <option value="SITE">Site</option>
          </select>
        </div>

        <div>
          <label htmlFor="media-file">Choose an image</label>
          <input
            id="media-file"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              setFile(event.target.files?.[0] || null)
              setMessage('')
            }}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {message && <p role="status">{message}</p>}

      {uploadedImage && (
        <div>
          <h2>Uploaded image</h2>

          <img
            src={uploadedImage.url}
            alt="Uploaded Green Woods media"
            style={{
              maxWidth: '100%',
              width: '400px',
              height: 'auto',
            }}
          />

          <p>Folder and file: {uploadedImage.key}</p>
          <p>File type: {uploadedImage.contentType}</p>
          <p>Size: {(uploadedImage.size / 1024).toFixed(1)} KB</p>

          <p>
            This preview uses a temporary signed URL and may stop
            working when the URL expires.
          </p>
        </div>
      )}
    </section>
  )
}

export default AdminMedia
