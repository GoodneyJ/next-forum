
import { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link'
import NavBar from '../../../components/Navbar'

import postItemStyles from '../../../styles/PostItem.module.css'
import 'react-toastify/dist/ReactToastify.css';

const Post = ({ post }) => {

    const router = useRouter();
    console.log(typeof(post._id))
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
                        <p>{post.author}</p>
                        <p>{post.category}</p>
                    </div>
                </div>
                <div className={postItemStyles.contentText}>
                    <p>{post.content}</p>
                </div>
            </div>
            <div className={postItemStyles.contentFooter}>
                <Link href={`/posts/edit/${post._id}`}>
                    <div className={postItemStyles.contentFooterBtn}>Edit Post</div>
                </Link>
                <div className={postItemStyles.contentFooterBtn} onClick={delPost}>Delete Post</div>
            </div>
        </div>

        <div>
            <div className={postItemStyles.commentsContainer}>
                <div className={postItemStyles.commentItem}>
                    <div className={postItemStyles.commentAuthorInfo}>
                        <span className={postItemStyles.profileImg}></span>
                        <h4 className={postItemStyles.commentAuthor}>Prosperity</h4>
                    </div>
                    <div className={postItemStyles.commentContent}>
                        <p>a comment</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

Post.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`);

    const { data } = await res.json();

    return {
        post: data
    }

}

export default Post