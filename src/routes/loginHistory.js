import routerx from 'express-promise-router'
import { create, get, getOne, find, update, list, del } from '../controllers/loginHistoryController'

const router=routerx()

router.get('/', get)
router.post('/', create)
router.get('/:id', getOne)
router.post('/find', find)
router.put('/:id', update)
router.post('/list', list)
router.delete('/:id', del)

export default router