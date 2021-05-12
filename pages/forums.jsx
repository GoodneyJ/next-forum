import { useState } from 'react'

import Meta from '../components/Meta'
import Nav from '../components/Navbar'
import UserMessage from '../components/UserMessage'
import PostContainer from '../components/PostContainer'
import PostsList from '../components/PostsList'
import ChatBox from '../components/ChatBox'
import Footer from '../components/Footer'


import forumStyles from '../styles/Forums.module.css'



export default function Forums({ posts }) {
  const [activeForumSection, setActiveForumSection] = useState('');
  const [bool, setBool] = useState(false);

  const handleClick = (e) => {
    console.log(e.target.textContent)
    
    setBool(!bool);

    if(!bool) {
      setActiveForumSection(e.target.textContent);
    }

  }

  return (
    <>
      <div>
          <Meta title="PVGS | Forums"/>

          <div className={forumStyles.chatBackground}>
          <Nav />
          {ChatBox ? <ChatBox /> : ''}
          </div>

          {
            bool ? <PostsList title={activeForumSection} posts={posts} onClick={handleClick} /> : <PostContainer onClick={handleClick}/>
          }
      </div>
      <Footer />
    </>
  )
}


// export async function getServerSideProps() {
//   const res = await fetch(`http://localhost:3000/api/posts`);
//   const posts = await res.json();



//    return { 
//        props: { 
//            posts
//        }
//    }
// }
