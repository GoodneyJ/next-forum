import Nav from '../components/Navbar'
import Link from 'next/link'
import callToActionStyles from '../styles/CallToAction.module.css'



export const CallToAction = (props) => {


    return (
        <div className={`${callToActionStyles.callToActionContainer} item-container`}>
            <Nav />
            <div className={callToActionStyles.contentWrapper}>
                <h1 className={callToActionStyles.headingText}>Welcome to a carefully crafted Community & SMP Experience</h1>
                <p className={callToActionStyles.subHeadingText}>Join us in game by applying on the forums!</p>
                <span className={callToActionStyles.btn}><Link  href='/account/login'><span>Apply Here!</span></Link></span>
            </div>
           <video id="video" autoPlay loop muted>
               <source src="/otherfootage.mp4" type="video/mp4" />
           </video>
            <style jsx>{`
                
                #video {
                    position: absolute;
                    width:100%;  
                    left: 50%;
                    top: 50%;
                    object-fit: cover;
                    transform: translate(-50%, -50%);
                    height: 100%;
                    z-index: -1;
                }

                @media only screen and (max-width: 360px) {
                    width: 360px !important;
                }

            `}
            </style>
        </div>
    )
}

export default CallToAction