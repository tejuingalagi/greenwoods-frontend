import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import {
  fetchAdminGallery,
  updateGalleryItem,
  toGalleryRequest,
} from '../../api/galleryAdminApi'
import { getApiErrorMessage } from '../../api/enquiryApi'
import { GALLERY_CATEGORIES } from '../../data/galleryCategories'
import GalleryAddForm from './GalleryAddForm'
import GalleryItemCard from './GalleryItemCard'
import './AdminGallery.css'

function AdminGallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [category, setCategory] = useState(GALLERY_CATEGORIES[0].value)

  useEffect(() => {
    let cancelled = false

    fetchAdminGallery()
      .then(({ data }) => {
        if (!cancelled) {
          setItems(data)
          setError('')
        }
      })
      .catch((err) => {
        if (!cancelled) setError(getApiErrorMessage(err))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const reload = () => {
    setLoading(true)
    setError('')
    setReloadKey((k) => k + 1)
  }

  const activeLabel = GALLERY_CATEGORIES.find((c) => c.value === category).label

  const visible = items
    .filter((item) => item.category === category)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id)

  const countFor = (value) => items.filter((i) => i.category === value).length

  const handleCreated = (item) => setItems((list) => [...list, item])
  const handleChanged = (updated) =>
    setItems((list) => list.map((i) => (i.id === updated.id ? updated : i)))
  const handleDeleted = (id) => setItems((list) => list.filter((i) => i.id !== id))

  // Move one photo up or down by renumbering the whole category 0, 1, 2, ...
  const handleMove = async (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= visible.length) return

    const reordered = [...visible]
    const [moved] = reordered.splice(index, 1)
    reordered.splice(target, 0, moved)

    setBusy(true)
    setError('')
    try {
      const changed = []
      for (let i = 0; i < reordered.length; i += 1) {
        const item = reordered[i]
        if (item.sortOrder !== i) {
          const { data } = await updateGalleryItem(
            item.id,
            toGalleryRequest(item, { sortOrder: i }),
          )
          changed.push(data)
        }
      }
      setItems((list) => list.map((i) => changed.find((c) => c.id === i.id) ?? i))
    } catch (err) {
      setError(getApiErrorMessage(err))
      reload() // show what is really saved
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="gal-admin-header">
        <h1 className="admin-page-title">Gallery</h1>
        {!loading && <span className="enq-count">{items.length} photos</span>}
      </div>

      <div className="gal-admin-tabs">
        {GALLERY_CATEGORIES.map((c) => (
          <button
            key={c.value} type="button"
            className={`gal-admin-tab ${c.value === category ? 'active' : ''}`}
            onClick={() => setCategory(c.value)}
          >
            {c.label} ({countFor(c.value)})
          </button>
        ))}
      </div>

      <GalleryAddForm
        category={category}
        categoryLabel={activeLabel}
        onCreated={handleCreated}
      />

      <div className="gal-admin-toolbar">
        <button type="button" className="enq-refresh" onClick={reload} disabled={loading}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && <p className="gal-admin-err" role="alert">{error}</p>}
      {loading && <p className="enq-state">Loading photos...</p>}

      {!loading && !error && visible.length === 0 && (
        <p className="gal-admin-empty">No photos in {activeLabel} yet. Add the first one above.</p>
      )}

      {!loading && visible.length > 0 && (
        <div className="gal-admin-grid">
          {visible.map((item, index) => (
            <GalleryItemCard
              key={item.id}
              item={item}
              index={index}
              total={visible.length}
              busy={busy}
              onChanged={handleChanged}
              onDeleted={handleDeleted}
              onMove={handleMove}
            />
          ))}
        </div>
      )}

      <p className="enq-state">
        Pictures on this page use temporary links. If they stop showing after
        about an hour, press Refresh.
      </p>
    </div>
  )
}

export default AdminGallery