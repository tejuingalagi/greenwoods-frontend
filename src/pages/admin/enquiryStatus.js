export const STATUSES = [
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'SITE_VISIT_SCHEDULED', label: 'Site visit scheduled' },
  { value: 'VISITED', label: 'Visited' },
  { value: 'BOOKED', label: 'Booked' },
  { value: 'CLOSED', label: 'Closed' },
]

const SOURCES = {
  POPUP: 'Popup',
  CONTACT_FORM: 'Contact form',
  SITE_VISIT: 'Site visit',
}

export const sourceLabel = (source) => SOURCES[source] ?? source