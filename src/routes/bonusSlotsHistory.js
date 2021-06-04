import routerx from 'express-promise-router'
import { create, get, getOne, find, update, del, save, list } from '../controllers/bonusSlotsHistoryController'
import { verifyToken } from '../middlewares/auth'

const router=routerx()

router.get('/', get)
router.post('/', create)
router.post('/list', list)
router.get('/:id', getOne)
router.post('/find', find)
router.put('/:id', update)
router.delete('/:id', del)
router.post('/saves', verifyToken, save)

export default router