import routerx from 'express-promise-router'
import { login, refreshToken, register, get, create, list, getOne, find, update, del, label, getuserinfo, logOut } from '../controllers/usersController'
const router=routerx()

router.post('/login', login)
router.post('/register', register)
router.post('/refresh-token', refreshToken)
router.get('/', get)
router.post('/', create)
router.post('/label', label)
router.post('/list', list)
router.get('/:id', getOne)
router.post('/find', find)
router.put('/:id', update)
router.delete('/:id', del)
router.post('/getuserinfo', getuserinfo)
router.post('/logout', logOut)

export default router