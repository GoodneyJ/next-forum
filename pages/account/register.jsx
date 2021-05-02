import { useState, useEffect, useContext } from 'react';
import {useRouter} from 'next/router'

import { ToastContainer, toast } from 'react-toastify';
import Nav from '../../components/Navbar'
import Meta from '../../components/Meta'
import Footer from '../../components/Footer'
import Link from 'next/link'
import AuthContext from '../../context/AuthContext'

import 'react-toastify/dist/ReactToastify.css';
import registerStyles from '../../styles/Register.module.css'

export default function Signup() {

    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
        profileImg: 'n/a'
    })
    
    const [confPassword, setConfPassword] = useState('');

    const {register, error} = useContext(AuthContext)

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //validation
        const hasEmptyFields = Object.values(values).some((element) => element === '');

        if(hasEmptyFields) {
            toast.error('Please Fill in all fields');
        } else {
            if(values.password === confPassword) {
                register(values)
            } else {
                toast.error(`Passwords don't match`)
            }
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]:value})
    }

    return (
        <>
        <div className={registerStyles.registerBackground}>
            <Meta title="PVGS | Login/Signup"/>
            <Nav />
            <div className={registerStyles.registerFormContainer}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeHolder="Email@email.com" onChange={handleInputChange}/>
                    <input type="text" name="username" placeHolder="Your Username" onChange={handleInputChange}/>
                    <input type="password" name="password" placeHolder="Password" onChange={handleInputChange}/>
                    <input type="password" name="confPassword" placeholder="Re-Enter Password" onChange={(e) => setConfPassword(e.target.value)}/>
                    <input type="submit" value="sign up" className={registerStyles.registerBtn} />
                </form>
            </div>
            <Link href='/account/login'><p className={registerStyles.login}>Already Registered? Click here!</p></Link>
        </div>
        <ToastContainer />
        <Footer />

        </>
    )
}

