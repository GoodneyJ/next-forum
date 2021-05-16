import findUserEmail from '../../../helpers/index'
import User from '../../../models/User'
import dbConnect from '../../../utils/dbConnect'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

//Authenticates User
export default async (req, res) => {
    if(req.method === 'POST') {
        dbConnect()

        const {email, password} = req.body
        var user = await findUserEmail(email)
        user = user[0]
        
        if(user && user.confirmed) {
            
            if(await bcrypt.compare(password, user.password)) {
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
                res.setHeader('Set-Cookie', cookie.serialize('token', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    sameSite: 'strict',
                    path: '/'
                }))

                res.status(200).json(user)
            } else {
                res.status(200).json({message: 'invalid credentials'})
            }

        } else {
            res.status(200).json({message:'user not found, or account needs to be verified'})
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}