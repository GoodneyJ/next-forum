import Nav from '../components/Navbar'
import Meta from '../components/Meta'
import Footer from '../components/Footer'
import donateStyles from '../styles/Donate.module.css'


export default function Donate() {
    return (
      <>
        <div className={donateStyles.divBackground}>
            <Meta title="PVGS | Donate"/>
            <Nav />
            <div className={donateStyles.contentContainer}>
              
            </div>
        </div>
        <Footer />
      </>
    )
  }
