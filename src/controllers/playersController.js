import { GameSessions, Providers, Users } from '../models'
import { createToken, dataSave } from './baseController'

export const game = async (req,res,next) => {
    let account = req.user
    let gamedata = req.body
    let token = await createToken(account, gamedata._id)
    getLaunchUrl(gamedata, token, async (result) => {
        if(result.status){
            let uhandle = await GameSessions.findOneAndUpdate({email: token.email}, token, {new: true, upsert: true})
            if(uhandle){
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
            const url = `http://localhost:3333/${gamedata.ID}/` +
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