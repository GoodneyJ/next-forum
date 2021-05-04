import useSWR from 'swr'


import RecentTopics from '../components/RecentTopics'
import PostListItem from './PostListItem'


import sectionStyles from '../styles/PostSection.module.css'

//https://www.youtube.com/watch?v=F1o_0umlXbU VIDEO ON SWR & DB MUTATIONS
//https://www.youtube.com/watch?v=mTz0GXj8NN0&ab_channel=TraversyMedia Covers urls for deployment

//DATA FETCHER
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const PostsList = (props) => {
    //SWR HOOK & DATA FETCH
    const { data, error} = useSWR('http://localhost:3000/api/posts', fetcher)
    
    //ERROR CATCH
    if(error) return <div>Failed to load</div>

    //LOADING CATCH
    if(!data) return <div>loading...</div>

    //DATA FILTERED TO TOPIC SECTION
    const postList = data.data.filter((post) => post.category === props.title)

    //OUTPUT
    return (
        <div className={sectionStyles.sectionContainer}>
            <div className={sectionStyles.headingContainer}>
                <h1 className={sectionStyles.headingText}>{props.title}</h1>
                <div className={sectionStyles.headingButton} onClick={props.onClick}>
                    <span>Back</span>
                </div>
            </div>

            <div className={sectionStyles.middleContent}>
                <div className={sectionStyles.topicsContainer}>
                    {postList.map((post) => (<PostListItem title={post.title} author={post.author} id={post._id}/>))}
                </div>
                
            </div>
        </div>
    )
}


  

export default PostsList