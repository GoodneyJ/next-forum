import {useState, useContext} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '../context/AuthContext'
import {useRouter} from 'next/router'

import 'react-toastify/dist/ReactToastify.css';
import postSectionStyles from '../styles/PostItem.module.scss'

const AddComment = (props) => {

    const {user, logout} = useContext(AuthContext)

    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    const [values, setValues] = useState({
        author: `${user ? user.username : ''}`,
        date: `${utc}`,
        postTitle: props.postTitle,
        content: ''
    })

    

    const [bool, setBool] = useState(false)

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

                //validation
                const hasEmptyFields = Object.values(values).some((element) => element === '');

        if(hasEmptyFields) {
            toast.error('Please Fill in all fields');
        } else {
            const res = await fetch(`http://localhost:3000/api/comments`, {
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
                router.push(`/posts/${props.postId}`)
            }
        }


        setBool(!bool);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]:value})
    }

    return (
        <div className={postSectionStyles.commentInterfaceContainer}>
            {
                bool ?
                <div className={postSectionStyles.addCommentInterface}>
                    <form onSubmit={handleSubmit}>
                        <textarea name="content" placeholder="type comment here..." onChange={handleInputChange}/>
                        <input type="submit" name="submit" value="Submit"/>
                    </form>
                </div>
                :
                <div className={postSectionStyles.addCommentBtn} onClick={() => setBool(!bool)}>
                    <h3>Add Comment</h3>
                </div>
            }
            <ToastContainer />
        </div>
    )
}

export default AddComment