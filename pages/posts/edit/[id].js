import {useState, useEffect, useContext} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link'

import AuthContext from '../../../context/AuthContext'
import Nav from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import SunEditor from 'suneditor-react';

import 'suneditor/dist/css/suneditor.min.css';
import 'react-toastify/dist/ReactToastify.css';
import createPostStyles from '../../../styles/CreatePost.module.css'

export default function EditPost({ post }) {
    //Extracts User Object from AuthContext
    const {user} = useContext(AuthContext)

    //Values Object for Form Submission
    const [values, setValues] = useState({
        title: post.title,
        content: post.content,
        category: post.category,
        author: post.author
    })
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(user) {
            values.author = user.username
            setValues({...values})
        }
        
        //Checks if the Values Object is missing information needed for form submission
        const hasEmptyFields = Object.values(values).some((element) => element === '');

        if(hasEmptyFields) {
            toast.error('Please Fill in all fields');
        } else {
            //Form Submission Block
            // process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' ? `http://localhost:3000/api/posts/${id}` : `${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`
            // `http://localhost:3000/api/posts/${post._id}`
            const res = await fetch(process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' ? `http://localhost:3000/api/posts/${id}` : `${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
                method: 'PUT',
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
                    <h2>Edit Post</h2>
                    {/* POST FORM */}
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" value={values.title} placeholder="Post Title" onChange={handleInputChange}/>
                        {/* <textarea type="text" name='content' value={values.content} placeholder="Your post here..." onChange={handleInputChange}/> */}
                        <SunEditor
                            lang="en"
                            name="content"
                            width="80%"
                            height="250px"
                            defaultValue={post.content}
                            setDefaultStyle="
                            font-family: 'Montserrat';
                            font-size: 1rem;
                            background-color: #101010;
                            color: #e0e0e0;
                            border-radius: 5px;
                            "
                            onChange={(e) => {
                                values.content = e
                                setValues({...values})
                            }}
                            setOptions={{
                                buttonList: [['formatBlock'],['fontSize'],['fontColor', 'bold', 'italic', 'underline', 'strike', 'hiliteColor' ],['codeView'],['undo', 'redo']]
                            }}
                            className={createPostStyles.sunEditor}
                            />
                        <select name="category" value={values.category} onChange={handleInputChange}>
                            <option>Select a category</option>
                            <option>General Discussions</option>
                            <option>Introductions</option>
                            <option>Media</option>
                            <option>Offtopic</option>
                        </select>
                        <input type="submit" value="Update Post" className={createPostStyles.submitPostBtn}/>
                    </form>
                </div>
                <ToastContainer />
            </div>
            <Footer />
        </>
    )
}


// EditPost.getInitialProps = async ({ query: { id } }) => {
//     const res = await fetch(`http://localhost:3000/api/posts/${id}`);

//     const { data } = await res.json();

//     return {
//         post: data
//     }
// }

export async function getServerSideProps({ query: {id}, req}) {
    // `http://localhost:3000/api/posts/${id}`
    const res = await fetch(process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' ? `http://localhost:3000/api/posts/${id}` : `${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`);
    const { data } = await res.json();

    return {
        props: {
            post: data,
        },
    }
}