import routerx from 'express-promise-router'
import { create, get, getOne, find, update, del, label, list } from '../controllers/levelController'

const router=routerx()

router.get('/', get)
router.post('/', create)
router.post('/label', label)
router.post('/list', list)
router.get('/:id', getOne)
router.post('/find', find)
router.put('/:id', update)
router.delete('/:id', del)

export default router