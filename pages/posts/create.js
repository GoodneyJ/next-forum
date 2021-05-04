import {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link'
import AuthContext from '../../context/AuthContext'
import {useContext} from 'react'


import Nav from '../../components/Navbar'
import Footer from '../../components/Footer'

import 'react-toastify/dist/ReactToastify.css';
import createPostStyles from '../../styles/CreatePost.module.css'

export default function CreatePost() {

    const {user} = useContext(AuthContext)

    const [values, setValues] = useState({
        title: '',
        content: '',
        category: '',
        author: `${user.username}`
    })
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //validation
        const hasEmptyFields = Object.values(values).some((element) => element === '');

        if(hasEmptyFields) {
            toast.error('Please Fill in all fields');
        } else {
            const res = await fetch(`http://localhost:3000/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            if(!res.ok) {
                toast.error('Something Went Wrong')
            } else {
                const data = await res.json();
                router.push(`/forums`)
            }
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]:value})
    }

    return (
        <>

            <div className={createPostStyles.divBackground}>
                <Nav />
                
                <div className={createPostStyles.createPostContainer}>
                    <h2>Create Post</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" value={values.title} placeholder="Post Title" onChange={handleInputChange}/>
                        <textarea type="text" name='content' value={values.content} placeholder="Your post here..." onChange={handleInputChange}/>
                        <select name="category" value={values.category} onChange={handleInputChange}>
                            <option>Select a category</option>
                            <option>General Discussions</option>
                            <option>Introductions</option>
                            <option>Media</option>
                            <option>Offtopic</option>
                        </select>
                        
                        <input type="submit" value="Submit Post" className={createPostStyles.submitPostBtn}/>
                    </form>
                </div>
                <ToastContainer />
            </div>
            <Footer />
        </>
    )
}

