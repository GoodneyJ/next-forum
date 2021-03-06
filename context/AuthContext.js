import {createContext, useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => checkUserLoggedIn(), [])

    const router = useRouter();

    //Register user
    const register = async (user) => {
        // process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' ? `http://localhost:3000/api/users` : `${process.env.NEXT_PUBLIC_URL}/api/users`
        const res = await fetch(`/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        // Need to send email from here,
        //JWT Sign ->
        //Send JWT to api/mailer/index
        

        if(!res.ok) {
            toast.error('Something Went Wrong')
        } else {
            const data = await res.json();
            router.push(`/account/login`)
        }
    }

    //Login user
    const login = async ({email, password}) => {
        const res = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await res.json()

        if(!data.message) {
            setUser(data)
            router.push('/forums')
        } else {
            setError(data.message);
            setError(null)
        }
    }

    //Logout user
    const logout = async () => {
        const res = await fetch(`/api/auth/logout`, {
            method: 'POST'
        })

        if(res.ok) {
            setUser(null)
            router.push('/')
        }
    }

    //Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        const res = await fetch(`/api/auth/user`)
        const data = await res.json()

        

        if(res.ok) {
           setUser(data.decoded)
        } else {
            setUser(null)

        }
    }

    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext