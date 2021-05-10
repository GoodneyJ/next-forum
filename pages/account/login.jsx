import { useState, useContext, useEffect } from 'react'

import Nav from '../../components/Navbar'
import Meta from '../../components/Meta'
import Link from 'next/link'
import AuthContext from '../../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import Footer from '../../components/Footer'

import loginStyles from '../../styles/Login.module.css'
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  //Input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Extracts Login function & Error value from AuthContext
  const {login, error} = useContext(AuthContext)

  //If error is set from Context, it displays error through this
  useEffect(() => error && toast.error(error))

  const handleSubmit = (e) => {
    e.preventDefault();
    login({email, password})
  }

  return (
    <>
    <div className={loginStyles.divBackground}>
        <Meta title="PVGS | Login/Signup"/>
        <Nav />
        <div className={loginStyles.loginFormContainer}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="email" placeHolder="Email@email.com" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" placeHolder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <div className={loginStyles.utilityLinksContainer}>
              <div className={loginStyles.rememberMe}>
                <input type="checkbox" className={loginStyles.checkbox}/>
                <p>Remember Me?</p>
              </div>
              <p className={loginStyles.forgotPassword}>Forgot your password?</p>
            </div>
            <input type="submit" value="Login" className={loginStyles.loginBtn} />
          </form>
        </div>
        <Link href='/account/register'><p className={loginStyles.register}>Not registered? Click here!</p></Link>
    </div>
    <ToastContainer />
    <Footer />
    </>
  )
  }