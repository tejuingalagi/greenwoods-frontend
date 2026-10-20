import { useState } from 'react'
import { Upload } from 'lucide-react'
import { uploadMedia } from '../../api/mediaApi'
import { createGalleryItem } from '../../api/galleryAdminApi'
import { getApiErrorMessage } from '../../api/enquiryApi'

const MAX_BYTES = 5 * 1024 * 1024

function GalleryAddForm({ category, categoryLabel, onCreated }) {
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)
  const [published, setPublished] = useState(true)
  const [step, setStep] = useState('idle') // idle | uploading | saving
  const [message, setMessage] = useState({ text: '', isError: false })
  // If the upload worked but saving failed, we keep the key so a retry
  // does not upload the same picture twice.
  const [uploadedKey, setUploadedKey] = useState('')
  const [fileInputKey, setFileInputKey] = useState(0)

  const busy = step !== 'idle'

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null)
    setUploadedKey('')
    setMessage({ text: '', isError: false })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ text: '', isError: false })

    if (!file) {
      setMessage({ text: 'Please choose an image.', isError: true })
      return
    }
    if (file.size > MAX_BYTES) {
      setMessage({ text: 'The file is too large (maximum 5 MB).', isError: true })
      return
    }

    try {
      let key = uploadedKey
      if (!key) {
        setStep('uploading')
        const media = await uploadMedia(file, 'GALLERY')
        key = media.key
        setUploadedKey(key)
      }

      setStep('saving')
      const { data } = await createGalleryItem({
        category,
        caption: caption.trim(),
        imageKey: key,
        published,
      })

      onCreated(data)
      setCaption('')
      setFile(null)
      setUploadedKey('')
      setPublished(true)
      setFileInputKey((k) => k + 1) // clears the file box
      setMessage({ text: 'Photo added.', isError: false })
    } catch (err) {
      const text = getApiErrorMessage(err)
      setMessage({
        text: uploadedKey || step === 'saving'
          ? `${text} The picture is uploaded, so you can press Add photo again.`
          : text,
        isError: true,
      })
    } finally {
      setStep('idle')
    }
  }

  return (
    <form className="gal-admin-form" onSubmit={handleSubmit}>
      <h2>Add a photo to {categoryLabel}</h2>

      <div className="gal-admin-form-row">
        <div>
          <label htmlFor="ga-caption">CAPTION *</label>
          <input
            id="ga-caption" required maxLength={150}
            value={caption} onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g. Buddha Landscape"
          />
        </div>

        <div>
          <label htmlFor="ga-file">IMAGE * (JPG, PNG or WebP, up to 5 MB)</label>
          <input
            key={fileInputKey}
            id="ga-file" type="file" required
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <label className="gal-admin-check">
        <input
          type="checkbox" checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Show on the website
      </label>

      {message.text && (
        <p className={message.isError ? 'gal-admin-err' : 'gal-admin-ok'} role="status">
          {message.text}
        </p>
      )}

      <button type="submit" className="gal-admin-btn" disabled={busy}>
        <Upload size={14} />
        {step === 'uploading' ? 'Uploading...' : step === 'saving' ? 'Saving...' : 'Add photo'}
      </button>
    </form>
  )
}

export default GalleryAddForm