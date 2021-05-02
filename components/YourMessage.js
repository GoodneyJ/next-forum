

export const YourMessage = (props) => {
    return (
        <li className={forumStyles.userMessage}>
            <div>
                <p>img</p>
                <h4>{props.username}</h4>
                <p>{props.message}</p>
            </div>
        </li>
    )
}

export default YourMessage