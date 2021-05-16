import Link from 'next/link'
import { useRouter } from 'next/router'
import {useContext} from 'react'
import AuthContext from '../context/AuthContext'


import navStyles from '../styles/Navbar.module.css'


export const Navbar = () => {

    const {user, logout} = useContext(AuthContext)

    const router = useRouter();

    if(typeof window !== "undefined") {  
        window.onscroll = function() {navFunc()};
        
        function navFunc() {
            let navbar = document.getElementById("navbar")

            if(window.pageYOffset >= 100) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        }
    }


    return (
        <nav id="navbar" className={navStyles.navbarContainer}>
            <Link href='/'><span className={navStyles.logo}>Prosperity VGS</span></Link>
            <ul>
                <li className={router.pathname == '/' ? navStyles.active : ''}>
                    <Link href="/">Home</Link>
                </li>
                <li className={router.pathname == '/forums' ? navStyles.active : ''}>
                    <Link href="/forums">Forums</Link>
                </li>
                {user ?
                <>
                    <li className={router.pathname == '/donate' ? navStyles.active : ''}>
                        <Link href={`/users/${user._id}`}>Profile</Link>
                    </li>
                    <li onClick={() => logout()}>
                        Logout
                    </li>
                </>
                :
                <li className={router.pathname == '/account/login' ? navStyles.active : ''}>
                    <Link href="/account/login">Login / Signup</Link>
                </li>
                }
            </ul>
            <style jsx>
                {`

                .sticky {

                    position: fixed;
                    background-color:#101010;
                    color: #e0e0e0;
                    width: 100%;
                    z-index: 2000;
                  
                    box-shadow: 1px 5px 5px 0px rgba(0,0,0,0.43);
                    -webkit-box-shadow: 1px 5px 5px 0px rgba(0,0,0,0.43);
                    -moz-box-shadow: 1px 5px 5px 0px rgba(0,0,0,0.43);
                    transition: 0.2s;
                  }
                `}
            </style>
        </nav>
    )
}


export default Navbar