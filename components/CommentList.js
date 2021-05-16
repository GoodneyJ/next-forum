import {useState} from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import postItemStyles from '../styles/PostItem.module.css'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const CommentList = (props) => {

    const { data, error} = useSWR('http://localhost:3000/api/comments', fetcher)
    console.log(data)
    const [commentArray, setCommentArray] = useState([])
    var filteredList;
    if(data) {
        filteredList = data.data.filter((comment) => comment.postTitle === props.postTitle)
        console.log(filteredList)
    }
    
    return (
        <>
        {
            filteredList && filteredList.length > 0 ? 
            filteredList.map((comment) => (
                <div className={postItemStyles.commentItem}>
                    <div className={postItemStyles.commentAuthorInfo}>
                        <img src={`${comment.authorImgUrl}`} className={postItemStyles.profileImg} />
                        <Link href={`/users/${comment.authorId}`}>
                            <h4 className={postItemStyles.commentAuthor}>{comment.author}</h4>
                        </Link>
                    </div>
                    <div className={postItemStyles.commentContent}>
                        { ReactHtmlParser(comment.content) }
                    </div>
                    
                </div>
            ))
            :
            <div className={postItemStyles.commentItem}>
                <div className={postItemStyles.commentContent}>
                    <p>No Comments Found</p>
                </div>
            </div>
        }
        </>
    )
}

// export async function getServerSideProps() {
//     const res = await fetch(`http://localhost:3000/api/comments`);
//     const { data } = await res.json();

//     console.log(res.json())
//     return {
//         props: {
//             comments: data,
//         },
//     }
// }


CommentList.getInitialProps = async ({ query: { id } }) => {
    const postRes = await fetch(process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' ? `http://localhost:3000/api/posts/${id}` : `${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`);
    const { data } = await postRes.json();

    return {
        post: data,
    }
}

export default CommentList