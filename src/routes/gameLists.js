import routerx from 'express-promise-router'
import { create, get, getOne, find, update, del, list, label } from '../controllers/gameListsController'
import { verifyToken } from '../middlewares/auth'

const router=routerx()

router.get('/', verifyToken, get)
router.post('/', create)
router.patch('/', label)
router.get('/:id', getOne)
router.post('/list', list)
router.post('/find', find)
router.put('/:id', update)
router.delete('/:id', del)

export default router