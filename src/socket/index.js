import jwt from 'jsonwebtoken'
import moment from 'moment'
import { daliyCardHistories, daliyCardLists, GameSessions, Sessions, Users } from '../models'
import { dataSave, range, royalLeague } from '../controllers/baseController'
export default (io) => {
	io.on("connection", async (socket) => {
		const query = socket.handshake.query
		if (query.auth) {
			try {
				const decoded = await Sessions.findOne({accessToken: query.auth})
				if (decoded) {
					let row = {
						users_id: decoded.users_id,
						socketid: socket.id
					}
					await Sessions.findOneAndUpdate({users_id: decoded.users_id}, row, {new: true, upsert: true})
					const yesterday = await daliyCardHistories.countDocuments({users_id: decoded.users_id, date:moment(new Date()-86400000).format('YYYY-MM-DD')})
					const today = await daliyCardHistories.countDocuments({users_id: decoded.users_id, date:moment().format('YYYY-MM-DD')})
					if(yesterday){
						if(yesterday+1 !== today){
							io.to(socket.id).emit('daliy-bonus', {count:yesterday+1-today})
						}else{
							// console.log('already bonus')
						}
					}else if(today==0){
						io.to(socket.id).emit('daliy-bonus', {count:1})
					}else{
						// console.log('already bonus')
					}
					const result = await Users.findById(decoded.users_id).populate('levels_id')
					const mylevel = (result.level - result.levels_id.current_amount) / (result.levels_id.next_amount - result.levels_id.current_amount)
					io.to(socket.id).emit('level-up', {mylevel, newLevel: result.levels_id.level})

					const league = await royalLeague(decoded.users_id)
					io.to(socket.id).emit('royal-league', league)

					socket.on("daliy-card-open", async (index) => {
						let number = range(1, 14).sort(() => Math.random() - 0.5)[index-1]
						const daliy = await daliyCardLists.findOne({id: number})
						const data = {
							users_id: decoded.users_id,
							daliy_cards_id: daliy._id,
							crown: daliy.crown, 
							cards: daliy.cards, 
							gold: daliy.gold,
							date: moment().format('YYYY-MM-DD')
						}
						const result = await Users.updateOne({_id: decoded.users_id}, {$inc: {gold:daliy.gold, crown:daliy.crown, cards:daliy.cards}}, {new: true, upsert: true})
						await dataSave(data, daliyCardHistories)
						socket.emit("daliy-card-result", {
							crown: daliy.crown, 
							cards: daliy.cards, 
							gold: daliy.gold
						})
					})
					socket.on("sessiondestroy", async (rdata) => {
						const decoded = jwt.verify(rdata.token, process.env.ACCESS_TOKEN_SECRET)
						if (rdata.token && decoded) {
							await Sessions.deleteOne({users_id: decoded.users_id})
						}
					})
				}
			} catch (err) {
				console.log(socket.id);
				io.to(socket.id).emit('destory')
			}
		}

		
		socket.on("disconnect", async () => {
			// await Sessions.deleteOne({socketid: socket.id})
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
					if(players[i]['users_id']){
						io.to(players[i].socketid).emit('balance', {
							gold: players[i]['users_id']['gold'],
							crown: players[i]['users_id']['crown'],
						})
					}
				}
			}
	
			// const userSession = await Sessions.find({ expiration: { $lte: new Date() }}).populate("users_id")
			// if (userSession.length) {
			// 	await Sessions.deleteMany({ expiration: { $lte: new Date() }})
			// 	let expires = {}
			// 	for (const i in userSession) {
			// 		expires[userSession[i]['users_id']['email']] = true
			// 		await Sessions.findOneAndDelete({ id: userSession[i]['users_id']['_id'] })
			// 	}
			// 	io.sockets.emit('destory', {data: expires})
			// }
		}, 2000)
	})
}