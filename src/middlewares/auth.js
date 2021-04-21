import jwt from 'jsonwebtoken'
import { Users } from '../models'

export const verifyToken = async (req,res,next) => {
    try {
        const tokenHeader = req.headers.authorization.split('Bearer ')[1]
        const decoded = jwt.verify(tokenHeader, process.env.ACCESS_TOKEN_SECRET)
        const user = await Users.findById(decoded._id)
        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
}