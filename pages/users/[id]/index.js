
import { useState, useEffect, useContext} from 'react';
import {useRouter } from 'next/router';
import Link from 'next/link'
import NavBar from '../../../components/Navbar'
import AuthContext from '../../../context/AuthContext'
import useSWR from 'swr'
import Footer from '../../../components/Footer'

import userPageStyles from '../../../styles/UserPage.module.css'
import 'react-toastify/dist/ReactToastify.css';

const User = ({ userInfo }) => {

    const [posts, setPosts] = useState([])
    let filteredPosts
    const [comments, setComments] = useState([])
    let filteredComments;

    useEffect(() => {
        fetch('/api/posts')
        .then((res) => res.json())
        .then(setPosts)

        fetch('/api/comments')
        .then((res) => res.json())
        .then(setComments)
    }, [])

    //Values Object for Form Submission
    const [values, setValues] = useState({
        profileImg: userInfo.profileImg,
        bio: userInfo.bio
    })

    const router = useRouter()
    const {user} = useContext(AuthContext)
    const [bool, setBool] = useState(false);

    if(userInfo) {
        if(posts.data) {
            filteredPosts = posts.data.filter(post => post.author === userInfo.username)
        }
        if(comments.data) {
            filteredComments = comments.data.filter(comment => comment.author === userInfo.username)
        }
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //Checks if the Values Object is missing information needed for form submission
        const hasEmptyFields = Object.values(values).some((element) => element === '');

        if(hasEmptyFields) {
            toast.error('Please Fill in all fields');
        } else {
            //Form Submission Block
            const res = await fetch(`/api/users/${userInfo._id}`, {
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
                router.push(`/users/${userInfo._id}`)
            }
        }
    }

    const handleInput = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]:value})
    }

    return userInfo ? (
        <>
        <div className={userPageStyles.pageContainer}>
            <NavBar />
            <div className={userPageStyles.userInfoContainer}>
                <form onSubmit={handleSubmit}>
                    <img src={`${userInfo.profileImg}`} className={userPageStyles.userProfileImg}/>
                    <h2>{userInfo.username}</h2>
                    <div className={userPageStyles.statContainer}>
                        <div className={userPageStyles.statItem}>
                            <h3>Posts:</h3>
                            <p>{filteredPosts !== undefined ? filteredPosts.length : <span>...</span>}</p>
                        </div>
                        <div className={userPageStyles.statItem}>
                            <h3>Comments:</h3>
                            <p>{filteredComments !== undefined || null? filteredComments.length : <span>...</span>}</p>
                        </div>
                        <h3>Bio:</h3>
                        {user && user.username === userInfo.username ? <textarea type="text" value={values.bio} name="bio" className={userPageStyles.editBioText} onChange={handleInput}/> :<p className={userPageStyles.bioText}>{userInfo.bio}</p>}
                        <div className={userPageStyles.userInputDiv}>
                            {user && user.username === userInfo.username ? <input type="text" name="profileImg" value={values.profileImg} placeholder="Your Img Url Here..." onChange={handleInput} className={userPageStyles.imgUrlInput}/> : ''}
                            {user && user.username === userInfo.username? <input type="submit" value="Update" className={userPageStyles.bioBtn}/> : ''}
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
        <Footer />
        </>
    ) : (<div className={userPageStyles.pageContainer}>Loading...</div>)
}

User.getInitialProps = async ({ query: { id } }) => {
    const userRes = await fetch(process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' ? `http://localhost:3000/api/users/${id}` : `${process.env.NEXT_PUBLIC_URL}/api/users/${id}`);
    const { data } = await userRes.json();

    return {
        userInfo: data,

    }

}

// export async function getServerSideProps({query: { id } }) {
//         const userRes = await fetch(`http://localhost:3000/api/users/${id}`);
//         const { data } = await userRes.json();


//         return {
//             props: {
//                 userInfo: data,

//             }
//         }

// }

export default User