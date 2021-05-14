import jwt from 'jsonwebtoken'
import {useRouter } from 'next/router';
import Link from 'next/link'
import NavBar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

import verifyStyles from '../../../styles/Verify.module.scss'

export default function Verify() {

    return (
        <>
        <div className={verifyStyles.pageContainer}>
            <NavBar />
            <div className={verifyStyles.centerContent}>

                <h2>Verification:</h2>
                <p>You should be verified! Click the button below to login!</p>
                <span>
                    <Link href="/account/login">Click Here!</Link>
                </span>
            </div>
        </div>
        <Footer />
        </>
    )
}

export async function getServerSideProps(context) {

    // Grabs token from URL
    const { token } = context.params;
    let decoded = jwt.verify(token, process.env.EMAIL_SECRET)

    //Form Submission Block - Changes propery of specific user
    const resp = await fetch(`http://localhost:3000/api/users/${decoded.user}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({confirmed: true})
    })

    return {
        props: {},
    };
}
