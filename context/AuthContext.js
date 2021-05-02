import {createContext, useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter();

    //Register user
    const register = async (user) => {
        const res = await fetch(`http://localhost:3000/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        console.log(user)
        console.log(res)
        if(!res.ok) {
            toast.error('Something Went Wrong')
        } else {
            const data = await res.json();
            router.push(`/account/login`)
        }
    }

    //Login user
    const login = async ({email, password}) => {
        console.log({email, password})
    }

    //Logout user
    const logout = async () => {
        console.log('logout')
    }

    //Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        console.log('check')
    }

    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext