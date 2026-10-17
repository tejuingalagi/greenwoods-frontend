export const STATUSES = [
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'SITE_VISIT_SCHEDULED', label: 'Site visit scheduled' },
  { value: 'VISITED', label: 'Visited' },
  { value: 'BOOKED', label: 'Booked' },
  { value: 'CLOSED', label: 'Closed' },
]

export const SOURCE_OPTIONS = [
  { value: 'POPUP', label: 'Popup' },
  { value: 'CONTACT_FORM', label: 'Contact form' },
  { value: 'SITE_VISIT', label: 'Site visit' },
  { value: 'FLOOR_PLAN', label: 'Floor plan' },
]

const SOURCES = Object.fromEntries(SOURCE_OPTIONS.map((s) => [s.value, s.label]))

export const sourceLabel = (source) => SOURCES[source] ?? source