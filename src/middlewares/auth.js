import { Sessions } from '../models'

export const verifyToken = async (req,res,next) => {
    try {
        const accessToken = req.headers.authorization
        const user = await Sessions.findOne({accessToken: String(accessToken)}).populate("users_id")
        if(user && user.users_id){
            req.user = user.users_id
            next()
        }else{
            return res.status(401).json({ error: 'Unauthorized' })
        }
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
}