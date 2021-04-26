import routerx from 'express-promise-router'
import { create, get, getOne, find, update, del, list, join } from '../controllers/teamMembersController'
import { verifyToken } from '../middlewares/auth'

const router=routerx()

router.get('/', get)
router.post('/join', verifyToken, join)
router.post('/', create)
router.post('/list', list)
router.get('/:id', getOne)
router.post('/find', find)
router.put('/:id', update)
router.delete('/:id', del)

export default router