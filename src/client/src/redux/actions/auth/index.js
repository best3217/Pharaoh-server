import useJwt from '@src/auth/jwt/useJwt'
import jwtDefaultConfig from '../../../@core/auth/jwt/jwtDefaultConfig'
import themeConfig from '@configs/themeConfig'
import { getUserData } from "../../../auth/utils"
export const handleLogin = data => {
  return dispatch => {
    dispatch({ type: 'LOGIN', data: data.user})
    useJwt.setToken(data.accessToken.accessToken)
    useJwt.setRefreshToken(data.accessToken.refreshToken)
    localStorage.setItem(themeConfig.app.token, JSON.stringify(data.user))
  }
}

export const updateUserInfo = info => {
  return dispatch => {
    const userInfo = getUserData()
    const data = { ...userInfo, ...info}
    dispatch({ type: 'LOGIN', data })
    localStorage.setItem(themeConfig.app.token, JSON.stringify(data))
  }
}

export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
    localStorage.removeItem(jwtDefaultConfig.storageRefreshTokenKeyName)
    localStorage.removeItem(themeConfig.app.token)
  }
}
