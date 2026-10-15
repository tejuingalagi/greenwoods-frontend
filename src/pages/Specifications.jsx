import { useState } from 'react'
import {
  LayoutGrid, DoorClosed, Flame, Bath, Zap, Paintbrush,
  Box, Building2, ArrowUp, ZapOff, ShieldCheck, Leaf,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import './Specifications.css'

const flatSpecs = [
  {
    title: 'Flooring',
    icon: LayoutGrid,
    rows: [
      ['Living & Dining', 'Double-charged vitrified tiles, 800×800 mm, premium brand'],
      ['Master Bedroom', 'Vitrified tiles, 600×600 mm, anti-skid finish'],
      ['Other Bedrooms', 'Vitrified tiles, 600×600 mm'],
      ['Kitchen', 'Anti-skid ceramic tiles, 300×300 mm'],
      ['Toilets', 'Anti-skid ceramic tiles, 300×300 mm'],
      ['Balconies', 'Anti-skid vitrified tiles, 600×600 mm'],
      ['Staircase & Corridors', 'Granite / Kota stone'],
    ],
  },
  {
    title: 'Doors & Windows',
    icon: DoorClosed,
    rows: [
      ['Main Door', 'Teak wood frame, flush door with veneer finish, digital/brass lock'],
      ['Internal Doors', 'Engineered hardwood frame, flush door with laminate finish'],
      ['Toilet Doors', 'WPC frame, waterproof flush door'],
      ['Windows', 'UPVC sliding / casement, single-glazed, with mosquito mesh'],
      ['Ventilators', 'Aluminium louvred ventilators'],
      ['Balcony Railings', 'MS powder-coated or toughened glass railing'],
    ],
  },
  {
    title: 'Kitchen',
    icon: Flame,
    rows: [
      ['Counter Platform', 'Black Galaxy granite / engineered stone'],
      ['Sink', 'SS sink, single bowl'],
      ['Wall Tiles (dado)', 'Ceramic tiles up to 2 ft above counter'],
      ['CP Fittings', 'Premium brand — Jaquar / Hindware / equivalent'],
      ['Water Provision', 'Hot & cold water provision for sink + RO + dishwasher'],
    ],
  },
  {
    title: 'Toilets & Bathrooms',
    icon: Bath,
    rows: [
      ['Sanitary Ware', 'Premium brand — Cera / Hindware / equivalent'],
      ['CP Fittings', 'Jaquar or equivalent — chrome finish'],
      ['Wall Tiles', 'Full-height ceramic tiles, 300×450 mm'],
      ['Floor Tiles', 'Anti-skid ceramic, 300×300 mm'],
      ['Shower Area', 'Overhead shower provision with glass partition in master bath'],
      ['Accessories', 'Towel rod, soap dispenser, mirror — provided'],
    ],
  },
  {
    title: 'Electrical',
    icon: Zap,
    rows: [
      ['Wiring', 'Finolex / Havells or equivalent — concealed'],
      ['Switches', 'Modular switches — Legrand / Schneider / equivalent'],
      ['MCB / DB', 'Individual MCB for each circuit; RCCB at main DB'],
      ['Points', 'Adequate power points in all rooms; AC provision in all bedrooms & living'],
      ['Internet', 'CAT6 cabling provision in living, master bedroom'],
      ['TV Points', 'Provision in living room and master bedroom'],
    ],
  },
  {
    title: 'Painting & Finishes',
    icon: Paintbrush,
    rows: [
      ['Internal Walls', '2 coats OBD / premium emulsion (Berger / Asian / equivalent)'],
      ['External Facade', 'Exterior weather-resistant paint / texture finish'],
      ['Ceiling', 'White OBD / premium distemper'],
      ['Kitchen Ceiling', 'Oil-bound distemper, moisture-resistant'],
    ],
  },
]

// Waiting for a screenshot of the "Building Specifications" tab
const buildingSpecs = [
  {
    title: 'Structure & Foundation',
    icon: Box,
    rows: [
      ['Design Standard', 'RCC framed structure, IS 456 compliant'],
      ['Seismic Zone', 'Zone II — earthquake-resistant design as per IS 1893'],
      ['Foundation', 'Raft / pile foundation as per soil report'],
      ['Columns & Slabs', 'M25 / M30 grade concrete; Fe 500 TMT steel'],
      ['Design Life', 'Minimum 75 years'],
    ],
  },
  {
    title: 'Masonry & Plastering',
    icon: Building2,
    rows: [
      ['External Walls', '8-inch AAC / fly-ash brick masonry'],
      ['Internal Walls', '4-inch AAC / fly-ash brick partition walls'],
      ['Plastering', '12 mm sand-cement plaster internally; 15 mm polymer-modified externally'],
      ['Waterproofing', 'Crystalline waterproofing for terraces; integral for bathrooms'],
    ],
  },
  {
    title: 'Lifts & Vertical Transport',
    icon: ArrowUp,
    rows: [
      ['Number', '3 passenger lifts per tower + 1 service lift per tower'],
      ['Brand', 'Otis / Kone / Schindler or equivalent'],
      ['Capacity', '8–13 persons (630–1000 kg)'],
      ['Speed', '1.5 m/s passenger, 1.0 m/s service'],
      ['Features', 'ARD (Automatic Rescue Device), V3F energy-saving drive'],
      ['Car Parking', 'Stacker / mechanical parking system — 5 levels'],
    ],
  },
  {
    title: 'Power Backup',
    icon: ZapOff,
    rows: [
      ['DG Set Capacity', '100% backup for common areas, lifts, pumps'],
      ['Apartment Provision', '1–2 kW per apartment during power failure'],
      ['Fuel', 'Diesel; housed in a soundproofed enclosure'],
      ['AMF Panel', 'Auto-Mains Failure panel with auto-changeover'],
    ],
  },
  {
    title: 'Security Systems',
    icon: ShieldCheck,
    rows: [
      ['CCTV', 'IP cameras at all entry/exit points, lift lobbies, common areas'],
      ['Access Control', 'Smart card / biometric access at main gate and podium'],
      ['Video Door Phone', 'Colour video door phone for each apartment'],
      ['Intercom', 'Internal intercom connecting all apartments to security desk'],
      ['Boom Barriers', 'Vehicle management at entry and exit'],
      ['Security Cabin', '24×7 manned security post'],
    ],
  },
  {
    title: 'Green Features & Sustainability',
    icon: Leaf,
    rows: [
      ['Rainwater Harvesting', 'Rooftop collection with percolation pits'],
      ['STP', 'Sewage Treatment Plant — treated water used for landscaping'],
      ['Solar Panels', 'Solar panels for common area lighting'],
      ['EV Charging', 'Provision for EV charging in parking podium'],
      ['Waste Management', 'Segregated wet & dry waste collection system'],
      ['Energy Efficiency', 'LED lighting in all common areas'],
    ],
  },
]

function Specifications({ onEnquire }) {
  const [tab, setTab] = useState('flat')
  const groups = tab === 'flat' ? flatSpecs : buildingSpecs

  return (
    <>
      <section className="page-hero">
        <h1>Specifications</h1>
        <p>
          Build quality, material standards, and finishes — every detail of
          your future home.
        </p>
      </section>

      <div className="spec-tabs">
        <button
          className={`spec-tab ${tab === 'flat' ? 'active' : ''}`}
          onClick={() => setTab('flat')}
        >
          FLAT SPECIFICATIONS
        </button>
        <button
          className={`spec-tab ${tab === 'building' ? 'active' : ''}`}
          onClick={() => setTab('building')}
        >
          BUILDING SPECIFICATIONS
        </button>
      </div>

      <section className="spec-section">
        <div className="container">
          {groups.length === 0 ? (
            <p className="spec-empty">Building specifications will be added soon.</p>
          ) : (
            <div className="spec-grid">
              {groups.map((group, index) => {
                const Icon = group.icon
                return (
                  <Reveal key={tab + group.title} delay={(index % 3) * 100}>
                    <div className="spec-card">
                      <div className="spec-card-head">
                        <Icon size={22} />
                        <h2>{group.title}</h2>
                      </div>
                      {group.rows.map(([label, value]) => (
                        <div className="spec-row" key={label}>
                          <span>{label}</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )
              })}
            </div>
          )}

          <div className="spec-cta">
            <button className="spec-button" onClick={onEnquire}>
              REQUEST DETAILED SPEC SHEET
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Specifications