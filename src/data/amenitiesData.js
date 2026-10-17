import clubhouse from '../assets/clubhouse.webp'
import pool from '../assets/landscape-pool.webp'
import podium from '../assets/landscape-podium.webp'

// The order the categories appear on the page
export const CATEGORY_ORDER = [
  'Wellness',
  'Sports',
  'Recreation',
  'Business',
  'Kids',
  'Outdoor & Landscape',
  'Convenience',
]

// image: null shows the green placeholder (the reference does the same)
export const amenityList = [
  // Sports
  { id: 1, category: 'Sports', name: 'Basketball Court', featured: true, image: null },
  { id: 2, category: 'Sports', name: 'Multi-purpose Sports Court', featured: true, image: null },
  { id: 3, category: 'Sports', name: 'Badminton Court', featured: false, image: null },

  // Recreation
  { id: 4, category: 'Recreation', name: 'Party Deck Area', featured: true, image: null },
  { id: 5, category: 'Recreation', name: 'Terrace Swimming Pool with Deck', featured: true, image: pool },
  { id: 6, category: 'Recreation', name: 'Event Space', featured: true, image: clubhouse },

  // Business
  { id: 7, category: 'Business', name: 'A/c Business Lounges', featured: true, image: null },
  { id: 8, category: 'Business', name: 'Conference Rooms', featured: true, image: null },
  { id: 9, category: 'Business', name: 'Library & Study Spaces', featured: true, image: null },

  // Kids
  { id: 10, category: 'Kids', name: 'Children Play Area', featured: true, image: null },
  { id: 11, category: 'Kids', name: 'Kids Pool', featured: true, image: null },
  { id: 12, category: 'Kids', name: 'Sand Pit', featured: false, image: null },

  // Outdoor & Landscape
  { id: 13, category: 'Outdoor & Landscape', name: 'Designer Seating Areas', featured: true, image: null },
  { id: 14, category: 'Outdoor & Landscape', name: 'Podium Landscape', featured: true, image: podium },
  { id: 15, category: 'Outdoor & Landscape', name: 'Spacious Outdoors', featured: true, image: null },

  // Convenience
  { id: 16, category: 'Convenience', name: 'Two Guest Suites', featured: true, image: null },
  { id: 17, category: 'Convenience', name: 'Super Market', featured: true, image: null },
  { id: 18, category: 'Convenience', name: 'Maintenance Office', featured: false, image: null },

  // TODO: add the remaining items from the reference page, keeping the same shape.
  // Wellness has 4 on the reference. Sports, Recreation, Kids and Outdoor & Landscape have more.
  // Give every item the next id (19, 20, ...) and a category from CATEGORY_ORDER.
]