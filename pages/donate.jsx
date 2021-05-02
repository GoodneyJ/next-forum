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
            <h1>Welcome to the donate page</h1>
        </div>
        <Footer />
      </>
    )
  }
