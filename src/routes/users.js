import routerx from 'express-promise-router'
import { login, refreshToken, register, get, create, list, getOne, find, update, del, label, logOut, changePassword, userRoyalLeague, usersRoyalLeague } from '../controllers/usersController'
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
router.post('/logout', logOut)
router.post('/royal-league', usersRoyalLeague)
router.post('/royal-league/:id', userRoyalLeague)
router.post('/change-password', changePassword)

export default router