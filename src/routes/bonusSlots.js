import routerx from 'express-promise-router'
import { create, get, getOne, find, update, del, list, random } from '../controllers/bonusSlotsController'

const router=routerx()

router.get('/', get)
router.post('/', create)
router.get('/:id', getOne)
router.post('/list', list)
router.post('/find', find)
router.post('/random', random)
router.put('/:id', update)
router.delete('/:id', del)

export default router