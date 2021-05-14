//Take JWT from AuthContext Register(),
// Actually Send email that links to /account/verify/:token
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import nodemailer from 'nodemailer'
const jwt = require('jsonwebtoken')
dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch ( method ) {
        case 'GET':
            try {
                const users = await User.find({});

                res.status(200).json({ success: true, data: users})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        case 'POST':

            // Transporter for nodemailer
            const transporter = nodemailer.createTransport({
                host: "jarrodg.dev",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.NEXT_PUBLIC_EMAIL,
                    pass: process.env.NEXT_PUBLIC_PASS
                },
            });

            //const user = await req.body
            try {
                const user = await User.create(req.body);

                //Stores Email into token & sends to user
                const token = jwt.sign({user: user._id}, process.env.EMAIL_SECRET, {expiresIn: '1d'})
                const url = `http://localhost:3000/account/verify/${token}`;

                // Sends the mail
                transporter.sendMail({
                    from: `"VGS Sender" ${process.env.NEXT_PUBLIC_EMAIL}`,
                    to: user.email,
                    subject: 'Confirm Email',
                    text: 'Thanks for joining!',
                    html: `Please click this link to confirm your email: <a href=${url}>${url}</a>`
                })
                
                res.status(201).json({ success: true, data: user })
            } catch(error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
        break;
    }
}