
import { useState, useEffect, useContext} from 'react';
import { Router, useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Link from 'next/link'
import NavBar from '../../../components/Navbar'
import AuthContext from '../../../context/AuthContext'
import CommentList from '../../../components/CommentList'
import CommentInterface from '../../../components/AddComment'

import postItemStyles from '../../../styles/PostItem.module.css'
import 'react-toastify/dist/ReactToastify.css';

const Post = ({ post }) => {

    const router = useRouter();

    const {user} = useContext(AuthContext)
    
    const delPost = async (e) => {
        if(confirm('Are you sure?')) {
            const res = await fetch(`http://localhost:3000/api/posts/${post._id}`, {
                method: 'DELETE',
            })

            const data = await res.json();

            if(!res.ok) {
                toast.error(data.message)
            } else {
                router.push('/forums')
            }
        }
    }

    return (
        <>
        <div className={postItemStyles.postContainer}>
            <NavBar />
            <div className={postItemStyles.contentContainer}>
                <div className={postItemStyles.contentHeading}>
                    <h1>{post.title}</h1>
                    <div>
                    
                        <Link href={`/users/${post.authorId}`}>
                            <h4>{post.author}</h4>
                        </Link>
                        <p>{post.category}</p>
                    </div>
                </div>
                <div className={postItemStyles.contentText}>
                    <p>{ ReactHtmlParser(post.content) }</p>
                </div>
            </div>
            <div className={postItemStyles.contentFooter}>
                {user && user.username === post.author ?
                    <>
                        <Link href={`/posts/edit/${post._id}`}>
                            <div className={postItemStyles.contentFooterBtn}>Edit Post</div>
                        </Link>
                        <div className={postItemStyles.contentFooterBtn} onClick={delPost}>Delete Post</div>
                    </>
                    :
                    ''
                }
            </div>
        </div>
        <div>
            <div className={postItemStyles.commentsContainer}>
                <CommentInterface postTitle={post.title} postId={post._id}/>
                <CommentList postTitle={post.title}/>
            </div>
        </div>
        </>
    )
}

Post.getInitialProps = async ({ query: { id } }) => {
    // process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' ? `http://localhost:3000/users/${post.authorId}` : `${process.env.NEXT_PUBLIC_URL}/users/${post.authorId}`
    // `http://localhost:3000/api/posts/${id}`
    const postRes = await fetch(process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' ? `http://localhost:3000/api/posts/${id}` : `${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`);
    const { data } = await postRes.json();

    return {
        post: data,
    }

}

export default Post