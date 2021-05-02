import RecentTopics from '../components/RecentTopics'

import sectionStyles from '../styles/PostSection.module.css'

export const PostSection = (props) => {
    return (
        <div className={sectionStyles.sectionContainer}>
            <h1>{props.title}</h1>
            <div className={sectionStyles.middleContent}>
                <div className={sectionStyles.topicsContainer}>
                    {props.topicSections.map(topic => (
                        <div id={topic} className={sectionStyles.topicSection} onClick={props.onClick}>
                            <h4 id={`${topic}-heading`}>{topic}</h4> 
                        </div>
                    ))}
                </div>
                <RecentTopics title={props.sideContentTitle}/>
            </div>
            
        </div>
    )
}

export default PostSection