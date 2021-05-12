import {useEffect, useState, useContext, useRef} from 'react'
import { animateScroll } from 'react-scroll';
import UserMessage from './UserMessage'
import AuthContext from '../context/AuthContext'
import Pusher from 'pusher-js'

import forumStyles from '../styles/Forums.module.css'
export default function ChatBox() {

    const {user} = useContext(AuthContext)


    const [chats, setChats] = useState([])
    const [messageToSend, setMessageToSend] = useState("")

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
            cluster: "us2",
        })

        const channel = pusher.subscribe("chat");

        channel.bind("chat-event", function(data) {
            setChats((prevState) => [
                ...prevState,
                { sender: data.sender, message: data.message},
            ])
        })

        return () => {
            pusher.unsubscribe("chat");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(user) {
            const res = await fetch(`http://localhost:3000/api/pusher`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message: messageToSend, sender: user.username })
            })
            scrollToBottom();
        } else {
            console.log('no user')
        }
    }

    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: "message-list"
        })
    }

    return (
        <div className={forumStyles.chatContainer}>
            <div className={forumStyles.chatOutput}>
            <ul id="message-list" className={forumStyles.messageList}>
                <UserMessage username="Prosperity" message="WidePeepoHappy"/>
                {chats.map((chat, id) => <UserMessage username={chat.sender} message={chat.message}/> )}
            </ul>
            </div>
            <div className={forumStyles.chatInterface}>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <textarea 
                    value={messageToSend}
                    placeholder="Type a message..."
                    onChange={e => setMessageToSend(e.target.value)}
                    placeholder="Your Message Here..."
                />
                <div className={forumStyles.chatButtons}>
                    <div className={forumStyles.row}>
                    <p className={forumStyles.rowButtons}></p>
                    <p className={forumStyles.rowButtons}></p>
                    <p className={forumStyles.rowButtons}></p>
                    </div>
                    {user ? <button type="submit" className={forumStyles.sendBtn}>Send</button> : ''}
                </div>
            </form>
            </div>
        </div>
    )
}
