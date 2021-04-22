import routerx from 'express-promise-router'
import { create, get, getOne, find, update, del, list, label } from '../controllers/providersController'

const router=routerx()

router.get('/', get)
router.post('/', create)
router.get('/:id', getOne)
router.post('/label', label)
router.post('/find', find)
router.post('/list', list)
router.put('/:id', update)
router.delete('/:id', del)

export default router