import Hero from '../components/Hero'
import Overview from '../components/Overview'
import WhyChoose from '../components/WhyChoose'
import WhoCallsHome from '../components/WhoCallsHome'
import Amenities from '../components/Amenities'
import MasterPlan from '../components/MasterPlan'
import Gallery from '../components/Gallery'
import Location from '../components/Location'
import ProgressVideo from '../components/ProgressVideo'
import Contact from '../components/Contact'

function Home({ onSiteVisit }) {
  return (
    <>
      <Hero onSiteVisit={onSiteVisit} />
      <Overview />
      <WhyChoose />
      <WhoCallsHome />
      <Amenities />
      <MasterPlan />
      <Gallery />
      <Location />
      <ProgressVideo />
      <Contact onSiteVisit={onSiteVisit} />
    </>
  )
}

export default Home