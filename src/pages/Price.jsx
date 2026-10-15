import { useState } from 'react'
import Reveal from '../components/Reveal'
import './Price.css'

const plans = [
  { title: '2 BHK Apartments', sub: 'BLOCKS A, B & C', configs: '3 variants' },
  { title: '3 BHK Apartments', sub: 'BLOCKS A, B & C', configs: '3 variants' },
  { title: 'Sky & Garden Villas', sub: 'TRIPLEX · DUPLEX · CORNER', configs: '8 variants' },
]

const charges = [
  { value: 5, label: 'GST' },
  { value: 5.5, label: 'STAMP DUTY' },
  { value: 0.5, label: 'REGISTRATION' },
  { value: 1.5, label: 'TRANSFER DUTY' },
]

const totalCharges = charges.reduce((sum, item) => sum + item.value, 0)

// 7500000 -> "75,00,000" (Indian number format)
const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)

function Price({ onEnquire }) {
  const [loan, setLoan] = useState(7500000)
  const [years, setYears] = useState(20)
  const [rate, setRate] = useState(8.5)

  // EMI formula: P × r × (1+r)^n ÷ ((1+r)^n − 1)
  const monthlyRate = rate / 12 / 100
  const months = years * 12
  const growth = Math.pow(1 + monthlyRate, months)
  const emi = (loan * monthlyRate * growth) / (growth - 1)
  const totalPayable = emi * months
  const totalInterest = totalPayable - loan

  return (
    <>
      <section className="page-hero">
        <p className="page-hero-label">PRICING</p>
        <h1>Embark on New Life Experiences</h1>
        <p>
          Starting <strong>₹ 90 Lakhs*</strong> onwards. Transparent breakdown
          of taxes and fees below.
        </p>
      </section>

      <section className="price-section">
        <div className="container">
          <div className="price-cards">
            {plans.map((plan, index) => (
              <Reveal key={plan.title} delay={index * 100}>
                <div className="price-card">
                  <div className="price-title-box">
                    <h2>{plan.title}</h2>
                    <p>{plan.sub}</p>
                  </div>

                  <p className="price-from">Starting Price</p>
                  <p className="price-amount">On Request</p>

                  <div className="price-details">
                    <div><span>Size</span><strong>TBA</strong></div>
                    <div><span>Configurations</span><strong>{plan.configs}</strong></div>
                  </div>

                  <button className="price-button" onClick={onEnquire}>
                    ENQUIRE NOW
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="price-section price-charges">
        <div className="container">
          <Reveal>
            <h2 className="section-title">What goes into the total cost?</h2>
            <p className="section-subtitle">
              Indicative Telangana taxes &amp; statutory fees on the registered
              sale value.
            </p>

            <div className="charges-grid">
              {charges.map((item) => (
                <div className="charge-tile" key={item.label}>
                  <p className="charge-value">{item.value}%</p>
                  <p className="charge-label">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="charges-total">
              <p>Total add-on charges on top of base price</p>
              <p className="charges-total-value">{totalCharges.toFixed(2)}%</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="price-section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">EMI Calculator</h2>
            <p className="section-subtitle">
              Estimate your monthly home loan repayment. Default rate 8.5% p.a.,
              tenure 20 years.
            </p>

            <div className="emi-card">
              <div className="emi-field">
                <div className="emi-top">
                  <label htmlFor="loan">Loan Amount</label>
                  <span>₹ {formatINR(loan)}</span>
                </div>
                <input
                  id="loan" type="range"
                  min={500000} max={50000000} step={100000}
                  value={loan}
                  onChange={(e) => setLoan(Number(e.target.value))}
                />
              </div>

              <div className="emi-field">
                <div className="emi-top">
                  <label htmlFor="years">Tenure (years)</label>
                  <span>{years}</span>
                </div>
                <input
                  id="years" type="range"
                  min={5} max={30} step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>

              <div className="emi-field">
                <div className="emi-top">
                  <label htmlFor="rate">Interest Rate (% p.a.)</label>
                  <span>{rate.toFixed(2)}</span>
                </div>
                <input
                  id="rate" type="range"
                  min={6} max={14} step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                />
              </div>

              <div className="emi-result">
                <div>
                  <p>MONTHLY EMI</p>
                  <strong className="emi-big">₹ {formatINR(emi)}</strong>
                </div>
                <div>
                  <p>TOTAL INTEREST</p>
                  <strong>₹ {formatINR(totalInterest)}</strong>
                </div>
                <div>
                  <p>TOTAL PAYABLE</p>
                  <strong>₹ {formatINR(totalPayable)}</strong>
                </div>
              </div>

              <p className="emi-note">
                Indicative only. Actual EMI depends on lender, credit score, and tenure.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Price