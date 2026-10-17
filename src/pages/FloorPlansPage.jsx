import { useRef, useState } from 'react'
import { Download, LayoutGrid } from 'lucide-react'
import Reveal from '../components/Reveal'
import FloorPlanForm from '../components/FloorPlanForm'
import { floorPlanGroups } from '../data/floorPlanData'
import './FloorPlansPage.css'

const allPlans = floorPlanGroups.flatMap((group) => group.plans)

function FloorPlansPage({ onSiteVisit }) {
  const [selected, setSelected] = useState('')
  const formRef = useRef(null)

  const choosePlan = (name) => {
    setSelected(name)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section className="fp-hero">
        <div className="container">
          <h1>Floor Plans</h1>
          <p>
            477 units across 3 towers (27 floors each) plus duplex Garden Villas,
            triplex Sky Villas, and Corner Villas — East and West facing. Pick a
            unit and request its floor plan, or{' '}
            <button type="button" className="fp-link" onClick={onSiteVisit}>
              book a site visit
            </button>
            .
          </p>
        </div>
      </section>

      <section className="fp-body">
        <div className="container">
          {floorPlanGroups.map((group) => (
            <Reveal key={group.id}>
              <div className="fp-group">
                <h2 className="fp-group-title">{group.title}</h2>
                <p className="fp-group-count">{group.plans.length} configurations</p>

                <div className="fp-grid">
                  {group.plans.map((plan) => (
                    <article className="fp-card" key={plan.name}>
                      <div className="fp-media">
                        {plan.image ? (
                          <img src={plan.image} alt={`${plan.name} floor plan`} loading="lazy" />
                        ) : (
                          <div className="fp-placeholder">
                            <LayoutGrid size={34} />
                            <span>Floor plan</span>
                          </div>
                        )}
                      </div>
                      <div className="fp-info">
                        <h3>
                          {plan.name}
                          {plan.facing && (
                            <span className="fp-tag">{plan.facing}</span>
                          )}
                        </h3>
                        <p className="fp-specs">
                          {plan.bedrooms} BR · {plan.bathrooms} Bath · {plan.balconies} Balconies
                        </p>
                        <button
                          type="button" className="fp-get"
                          onClick={() => choosePlan(plan.name)}
                        >
                          <Download size={14} /> Get this plan
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div ref={formRef} className="fp-form-anchor">
        <div className="container">
          <FloorPlanForm plans={allPlans} selected={selected} onSelect={setSelected} />
        </div>
      </div>
    </>
  )
}

export default FloorPlansPage