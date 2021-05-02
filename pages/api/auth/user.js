import dbConnect from '../../../utils/dbConnect'
import cookie from 'cookie'
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

export default async (req, res) => {
    dbConnect()

    if(req.method === 'GET') {
        if(!req.headers.cookie) {
            res.status(403).json({message: 'Not Authorized'})
            return
        }

        let decoded;
        const {token} = cookie.parse(req.headers.cookie)
        if(token) {
            try {
                decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            } catch (error) {
                console.log(error)
            }
        }

        if(decoded) {
            res.status(200).json({decoded})
            return;
        } else {
            res.status(401).json({message: 'unable to auth'})
        }
        
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}