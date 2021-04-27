import { GameSessions } from '../models'
import { createToken } from './baseController'

export const game = async (req,res,next) => {
    const gamedata = req.body
    const token = await createToken(req.user, gamedata._id)
    getLaunchUrl(gamedata, token, async (result) => {
        if(result.status){
            const handle = await GameSessions.findOneAndUpdate({email: token.email}, token, {new: true, upsert: true})
            if(handle){
                return res.json({ status: true, data: {url: result.url, token, gamedata}})
            }else{
                return res.json({status: false, data: "You cannot bet Play"})
            }
        }else{
            return res.json({status: false})
        }
    })
}

export const getLaunchUrl = (gamedata, token, callback) => {
    const LAUNCHURL = gamedata.providers_id.LAUNCHURL
    switch(LAUNCHURL){
        case "1" : {
            const url = `http://h2931731.stratoserver.net/${gamedata.ID}/` +
            // const url = `http://localhost:1998/${gamedata.ID}/` +
            "?gameType=" + gamedata.ID +
            "&token=" +  token.token
            callback({status: true, url})
            break
        }
        default :{
            callback({status: false})
            break
        }
    }
}