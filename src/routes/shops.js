import routerx from 'express-promise-router'
import { create, get, getOne, find, update, del, list } from '../controllers/shopsController'

const router=routerx()

router.get('/', get)
router.post('/', create)
router.post('/list', list)
router.get('/:id', getOne)
router.post('/find', find)
router.put('/:id', update)
router.delete('/:id', del)

export default router