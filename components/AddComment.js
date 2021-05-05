import {useState, useContext, useRef, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '../context/AuthContext'
import {useRouter} from 'next/router'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import 'react-toastify/dist/ReactToastify.css';
import postSectionStyles from '../styles/PostItem.module.scss'

const AddComment = (props) => {

    const {user, logout} = useContext(AuthContext)
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const [textContent, setTextContent] = useState()

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
        
        if(user) {
            values.author = user.username
            setValues({...values})
        }

        //validation
        const hasEmptyFields = Object.values(values).some((element) => element === '');
        if(user) {
            setValues({...values})
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
                        <SunEditor
                            lang="en"
                            name="content"
                            width="90%"
                            height="50px"
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
                        
                        />
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