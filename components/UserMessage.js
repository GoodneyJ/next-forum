import forumStyles from '../styles/Forums.module.css'

export const UserMessage = (props) => {
    return (
        <li>
            <div className={forumStyles.userMessage}>
                <span></span>
                <div className={forumStyles.messageContent}>
                    <h4>{props.username}</h4>
                    <p>{props.message}</p>
                </div>
            </div>
        </li>
    )
}

export default UserMessage