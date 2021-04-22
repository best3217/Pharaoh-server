import routerx from 'express-promise-router'
import users from './users'
import permissions from './permissions'
import providers from './providers'
import gameLists from './gameLists'
import players from './players'
import daliyCardLists from './daliyCardLists'
import daliyCardHistories from './daliyCardHistories'
import cardTypes from './cardTypes'
import cards from './cards'
import teams from './teams'
import fairyland from './fairyland'
import userSession from './userSession'
import gameSession from './gameSession'
import loginHistory from './loginHistory'
import goldHistory from './goldHistory'

const router = routerx()
router.use('/users', users)
router.use('/game_session', gameSession)
router.use('/gold_history', goldHistory)
router.use('/login_history', loginHistory)
router.use('/user_session', userSession)
router.use('/permissions', permissions)
router.use('/providers', providers)
router.use('/game_lists', gameLists)
router.use('/players', players)
router.use('/daliy_card_lists', daliyCardLists)
router.use('/daliy_card_histories', daliyCardHistories)
router.use('/card_types', cardTypes)
router.use('/cards', cards)
router.use('/teams', teams)
router.use('/fairyland', fairyland)

export default router