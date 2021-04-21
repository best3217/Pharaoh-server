import routerx from 'express-promise-router'
import { game } from '../controllers/playersController'
import { verifyToken } from '../middlewares/auth'

const router=routerx()

router.post('/game', verifyToken, game)

export default router