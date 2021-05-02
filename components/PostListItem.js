
import Link from 'next/link'


import sectionStyles from '../styles/PostSection.module.css'

export const PostListItem = (props) => {
    console.log(props);
    return (
        <Link href={`/posts/${props.id}`}>
            <div className={sectionStyles.topicSection}>
                <h4>{props.title}</h4>
                <p>{props.author}</p>
            </div>
        </Link>
    )
}

export default PostListItem