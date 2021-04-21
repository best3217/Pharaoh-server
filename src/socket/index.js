import jwt from 'jsonwebtoken'
import { GameSessions, Sessions, Users } from '../models'
export default (io) => {
	io.on("connection", async(socket) => {
		const query = socket.handshake.query
		if (query.auth) {
			const decoded = jwt.verify(query.auth, process.env.ACCESS_TOKEN_SECRET)
			if (decoded) {
				let row = {
					users_id: decoded._id,
					socketid: socket.id
				}
				await Sessions.findOneAndUpdate({users_id: decoded._id}, row, {new: true, upsert: true})
			}
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
		}, 5000)
	})
}