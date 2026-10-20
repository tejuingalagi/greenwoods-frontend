import { useState } from 'react'
import { ArrowUp, ArrowDown, Eye, EyeOff, Trash2 } from 'lucide-react'
import {
  updateGalleryItem,
  deleteGalleryItem,
  toGalleryRequest,
} from '../../api/galleryAdminApi'
import { getApiErrorMessage } from '../../api/enquiryApi'

function GalleryItemCard({ item, index, total, busy, onChanged, onDeleted, onMove }) {
  const [caption, setCaption] = useState(item.caption)
  const [working, setWorking] = useState(false)
  const [message, setMessage] = useState({ text: '', isError: false })

  const captionChanged = caption.trim() !== item.caption
  const disabled = busy || working

  const run = async (action, successText) => {
    setWorking(true)
    setMessage({ text: '', isError: false })
    try {
      await action()
      if (successText) setMessage({ text: successText, isError: false })
    } catch (err) {
      setMessage({ text: getApiErrorMessage(err), isError: true })
    } finally {
      setWorking(false)
    }
  }

  const saveCaption = () =>
    run(async () => {
      const { data } = await updateGalleryItem(
        item.id,
        toGalleryRequest(item, { caption: caption.trim() }),
      )
      onChanged(data)
      setCaption(data.caption)
    }, 'Saved')

  const togglePublished = () =>
    run(async () => {
      const { data } = await updateGalleryItem(
        item.id,
        toGalleryRequest(item, { published: !item.published }),
      )
      onChanged(data)
    })

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${item.caption}"? The photo will be removed for good.`)) return
    setWorking(true)
    try {
      await deleteGalleryItem(item.id)
      onDeleted(item.id)
    } catch (err) {
      setMessage({ text: getApiErrorMessage(err), isError: true })
      setWorking(false)
    }
  }

  return (
    <article className={`gal-admin-card ${item.published ? '' : 'is-hidden'}`}>
      <div className="gal-admin-thumb">
        <img src={item.imageUrl} alt={item.caption} loading="lazy" />
        {!item.published && <span className="gal-admin-badge">HIDDEN</span>}
      </div>

      <div className="gal-admin-body">
        <label htmlFor={`cap-${item.id}`}>CAPTION</label>
        <input
          id={`cap-${item.id}`} maxLength={150}
          value={caption} onChange={(e) => setCaption(e.target.value)}
        />
        {captionChanged && (
          <button
            type="button" className="gal-admin-btn small"
            onClick={saveCaption} disabled={disabled || !caption.trim()}
          >
            Save caption
          </button>
        )}

        <div className="gal-admin-actions">
          <button
            type="button" className="gal-admin-icon" title="Move up"
            onClick={() => onMove(index, -1)} disabled={disabled || index === 0}
          >
            <ArrowUp size={16} />
          </button>
          <button
            type="button" className="gal-admin-icon" title="Move down"
            onClick={() => onMove(index, 1)} disabled={disabled || index === total - 1}
          >
            <ArrowDown size={16} />
          </button>
          <button
            type="button" className="gal-admin-icon wide"
            onClick={togglePublished} disabled={disabled}
          >
            {item.published ? <EyeOff size={16} /> : <Eye size={16} />}
            {item.published ? ' Hide' : ' Show'}
          </button>
          <button
            type="button" className="gal-admin-icon danger"
            onClick={handleDelete} disabled={disabled} title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {message.text && (
          <p className={message.isError ? 'gal-admin-err' : 'gal-admin-ok'}>{message.text}</p>
        )}
      </div>
    </article>
  )
}

export default GalleryItemCard