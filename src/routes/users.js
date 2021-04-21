import routerx from 'express-promise-router'
import { login, refreshToken, register, get, create, getOne, find, update, del } from '../controllers/usersController'
const router=routerx()
router.post('/login', login)
router.post('/register', register)
router.post('/refresh-token', refreshToken)
router.get('/', get)
router.post('/', create)
router.get('/:id', getOne)
router.post('/find', find)
router.put('/:id', update)
router.delete('/:id', del)
export default router