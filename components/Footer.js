import { FaDiscord, FaYoutube, FaTwitter, FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa'
import footerStyles from '../styles/Footer.module.css'


export const Footer = () => {
    return (
        <>
        <div className={footerStyles.footerContainer}>
            <ul>
                <li><FaDiscord /></li>
                <li><FaYoutube /></li>
                <li><FaTwitter /></li>
                <li><FaFacebookSquare /></li>
                <li><FaInstagramSquare /></li>
            </ul>

            <div className={footerStyles.footerLinks}>
                <p>Privacy Policy</p>
                <p>Support</p>
                <p>Terms Of Service</p>
                <p>DMCA</p>
                <p>Cookies</p>
            </div>
        </div>
        <div className={footerStyles.copyright}>
                <p>&copy; - Prosperity VGS</p>
                <p>ALL RIGHTS RESERVED</p>
        </div>
        </>
    )
}

export default Footer