import jwt, { decode } from 'jsonwebtoken'
import moment from 'moment'
import { daliyCardHistories, daliyCardLists, GameSessions, Sessions, Users } from '../models'
import { dataSave, range } from '../controllers/baseController'
export default (io) => {
	io.on("connection", async (socket) => {
		const query = socket.handshake.query
		if (query.auth) {
			const decoded = jwt.verify(query.auth, process.env.ACCESS_TOKEN_SECRET)
			if (decoded) {
				let row = {
					users_id: decoded._id,
					socketid: socket.id
				}
				await Sessions.findOneAndUpdate({users_id: decoded._id}, row, {new: true, upsert: true})
				const yesterday = await daliyCardHistories.countDocuments({users_id: decoded._id, date:moment(new Date()-86400000).format('YYYY-MM-DD')})
				const today = await daliyCardHistories.countDocuments({users_id: decoded._id, date:moment().format('YYYY-MM-DD')})
				if(yesterday){
					io.to(socket.id).emit('daliy-bonus', {count:yesterday+1-today})
				}else if(today==0){
					io.to(socket.id).emit('daliy-bonus', {count:1})
				}else{
					console.log('already bonus');
				}
			}
			socket.on("daliy-card-open", async (index) => {
				let number = range(1, 14).sort(() => Math.random() - 0.5)[index-1]
				const daliy = await daliyCardLists.findOne({id: number})
				const data = {
					users_id: decoded._id,
					daliy_cards_id: daliy._id,
					crown: daliy.crown, 
					cards: daliy.cards, 
					gold: daliy.gold,
					date: moment().format('YYYY-MM-DD')
				}
				const result = await Users.updateOne({_id: decoded._id}, {$inc: {gold:daliy.gold, crown:daliy.crown, cards:daliy.cards}}, {new: true, upsert: true})
				await dataSave(data, daliyCardHistories)
				console.log(result)
				socket.emit("daliy-card-result", {
					crown: daliy.crown, 
					cards: daliy.cards, 
					gold: daliy.gold
				})
			})
		}

		socket.on("sessiondestroy", async (rdata) => {
			const decoded = jwt.verify(rdata.token, process.env.ACCESS_TOKEN_SECRET)
			if (rdata.token && decoded) {
				await Sessions.deleteOne({users_id: decoded._id})
			}
		})
		
		socket.on("disconnect", async () => {
			await Sessions.deleteOne({socketid: socket.id})
        })


		setInterval( async () => {
			const gameSession = await GameSessions.find({expiration: {$lte: new Date()}})
			if (gameSession.length) {
				await GameSessions.deleteMany({expiration: {$lte: new Date()}})
				let data = {}
				for (const i in gameSession) {
					data[gameSession[i]['email']] = true
				}
				io.sockets.emit('expiredestory', { data })
			}
	
			const players = await Sessions.find({}).populate("users_id")
			if (players.length) {
				for (const i in players) {
					io.to(players[i].socketid).emit('balance', {
						gold: players[i]['users_id']['gold'],
						crown: players[i]['users_id']['crown'],
					})
				}
			}
	
			const userSession = await Sessions.find({ expiration: { $lte: new Date() }}).populate("users_id")
			if (userSession.length) {
				await Sessions.deleteMany({ expiration: { $lte: new Date() }})
				let expires = {}
				for (const i in userSession) {
					expires[userSession[i]['users_id']['email']] = true
					await Sessions.findOneAndDelete({ id: userSession[i]['users_id']['_id'] })
				}
				io.sockets.emit('destory', {data: expires})
			}
		}, 2000)
	})
}