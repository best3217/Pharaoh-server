import routerx from 'express-promise-router'
import users from './users'
import permissions from './permissions'
import providers from './providers'
import gameLists from './gameLists'
import players from './players'
import daliyCardLists from './daliyCardLists'
import bonusSlots from './bonusSlots'
import cardTypes from './cardTypes'
import cards from './cards'
import teams from './teams'
import shops from './shops'
import fairyland from './fairyland'
import userSession from './userSession'
import gameSession from './gameSession'
import goldHistory from './goldHistory'
import gameHistory from './gameHistory'
import loginHistory from './loginHistory'
import bettingHistory from './bettingHistory'
import daliyCardHistories from './daliyCardHistories'
import levels from './levels'
import teamMembers from './teamMembers'
import bonusSlotsHistory from './bonusSlotsHistory'
import missions from './missions'

const router = routerx()
router.use('/users', users)
router.use('/game_session', gameSession)
router.use('/user_session', userSession)
router.use('/permissions', permissions)
router.use('/providers', providers)
router.use('/levels', levels)
router.use('/game_lists', gameLists)
router.use('/players', players)
router.use('/daliy_card_lists', daliyCardLists)
router.use('/bonus_slots', bonusSlots)
router.use('/bonus_slots_history', bonusSlotsHistory)
router.use('/missions', missions)
router.use('/card_types', cardTypes)
router.use('/cards', cards)
router.use('/teams', teams)
router.use('/shops', shops)
router.use('/fairyland', fairyland)
router.use('/login_history', loginHistory)
router.use('/game_history', gameHistory)
router.use('/gold_history', goldHistory)
router.use('/betting_history', bettingHistory)
router.use('/daliy_card_histories', daliyCardHistories)
router.use('/team_members', teamMembers)

export default router