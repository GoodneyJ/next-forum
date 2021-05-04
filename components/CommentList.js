import {useState} from 'react'
import useSWR from 'swr'
import postItemStyles from '../styles/PostItem.module.css'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const CommentList = (props) => {

    const { data, error} = useSWR('http://localhost:3000/api/comments', fetcher)
    const [commentArray, setCommentArray] = useState([])
    var filteredList;
    if(data) {
        filteredList = data.data.filter((comment) => comment.postTitle === props.postTitle)
    }
    
    return (
        <>
        {
            filteredList && filteredList.length > 0 ? 
            filteredList.map((comment) => (
                <div className={postItemStyles.commentItem}>
                    <div className={postItemStyles.commentAuthorInfo}>
                        <span className={postItemStyles.profileImg}></span>
                        <h4 className={postItemStyles.commentAuthor}>{comment.author}</h4>
                    </div>
                    <div className={postItemStyles.commentContent}>
                        <p>{comment.content}</p>
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
    const postRes = await fetch(`http://localhost:3000/api/posts/${id}`);
    const { data } = await postRes.json();

    return {
        post: data,
    }
}

export default CommentList