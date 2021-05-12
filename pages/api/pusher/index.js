import Pusher from 'pusher'

export const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: process.env.CLUSTER,
    useTLS: true,
})

export default async function handler(req, res) {
    const { message, sender } = req.body;
    const response = await pusher.trigger('chat', "chat-event", {
        message,
        sender,
    });

    res.json({ message: "completed" });
}