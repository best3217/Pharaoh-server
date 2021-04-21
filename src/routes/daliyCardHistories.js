import routerx from 'express-promise-router'
import { create, get, getOne, find, update, del } from '../controllers/daliyCardHistoriesController'

const router=routerx()

router.get('/', get)
router.post('/', create)
router.get('/:id', getOne)
router.post('/find', find)
router.put('/:id', update)
router.delete('/:id', del)

export default router