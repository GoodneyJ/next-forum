import sectionStyles from '../styles/PostSection.module.css'


export const RecentTopics = (props) => {
    return (
        <div className={sectionStyles.recentTopicsContainer}>
            <h4>{props.title}</h4>
        </div>
    )
}


export default RecentTopics