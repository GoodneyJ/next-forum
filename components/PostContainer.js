import PostSection from '../components/PostSection';
import Link from 'next/link'
import AuthContext from '../context/AuthContext'
import {useContext} from 'react'


import forumStyles from '../styles/Forums.module.css'

export const PostContainer = (props) => {


    const {user} = useContext(AuthContext)

    return (
        <div className={forumStyles.postsContainer}>
          {user ? 
            <div className={forumStyles.createPostLink}>
              <Link href="/posts/create"><p>Create Post</p></Link>
            </div>
            :
            ''}
          <PostSection title='Important'
                        topicSections={["Announcements & Changelogs", "Staff Introductions", "Rules"]}
                        sideContentTitle="Active Users"
                        onClick = {props.onClick}/>
          <PostSection title='General'
                        topicSections={["General Discussions", "Introductions", "Guides & Tutorials", "Media", "Offtopic"]}
                        sideContentTitle="Recent Topics"
                        onClick = {props.onClick}/>
          <PostSection title='Server'
                        topicSections={["Staff Applications", "Ban Requests / Appeals", "Donation Support", "Suggestions"
                      ]}
                        sideContentTitle="Our Discord"
                        onClick = {props.onClick}/>
        </div>
    )
}

export default PostContainer