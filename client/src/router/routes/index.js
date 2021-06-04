import { lazy } from 'react'

const Title = 'Pharao´s world'

const DefaultRoute = '/game'

const Routes = [
  {
    path: '/game',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/cards',
    component: lazy(() => import('../../views/Cards'))
  },
  {
    path: '/kingspath',
    component: lazy(() => import('../../views/Kingspath'))
  },
  {
    path: '/teams',
    component: lazy(() => import('../../views/FriendsTeams'))
  },
  {
    path: '/league',
    component: lazy(() => import('../../views/League'))
  },
  {
    path: '/tournament',
    component: lazy(() => import('../../views/Tournament'))
  },
  {
    path: '/loyalty',
    component: lazy(() => import('../../views/Loyalty'))
  },
  {
    path: '/achievements',
    component: lazy(() => import('../../views/Achievements'))
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/Profile'))
  },
  {
    path: '/play',
    component: lazy(() => import('../../views/GamePlay'))
  },
  {
    path: '/shop',
    component: lazy(() => import('../../views/Shops'))
  }
]

export { DefaultRoute, Title, Routes }
