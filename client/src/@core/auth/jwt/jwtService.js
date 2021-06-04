import axios from 'axios'
import themeConfig from '@configs/themeConfig'
import jwtDefaultConfig from './jwtDefaultConfig'
import { store } from '../../../redux/storeConfig/store'

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig }
  subscribers = []
  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }
    axios.interceptors.request.use(
      config => {
        config.baseURL = jwtDefaultConfig.apiUrl
        const accessToken = this.getToken()
        if (accessToken) {
          config.headers.authorization = accessToken
        }
        return config
      },
      error => Promise.reject(error)
    )

    axios.interceptors.response.use(
      response => response,
      error => {
        const { config, response } = error
        const originalRequest = config
        if (response && response.status === 401) {
          this.logout()
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              originalRequest.headers.authorization = accessToken
              resolve(this.axios(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  logout() {
    store.dispatch({ type: 'LOGOUT' })
    localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
    localStorage.removeItem(jwtDefaultConfig.storageRefreshTokenKeyName)
    localStorage.removeItem(themeConfig.app.token)
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args)
  }

  logOut(...args) {
    return axios.post(this.jwtConfig.logoutEndpoint, ...args)
  }

  royalLeague(...args) {
    return axios.post(this.jwtConfig.loadRoyalLeagueEndpoint, ...args)
  }

  userroyalLeague(_id) {
    return axios.post(`${this.jwtConfig.loadRoyalLeagueEndpoint}${_id}`)
  }
  
  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }

  loadGameList(...args) {
    return axios.get(this.jwtConfig.loadGameListEndpoint, ...args)
  }

  playGame(...args) {
    return axios.post(this.jwtConfig.playGameEndpoint, ...args)
  }

  loadTeams(...args) {
    return axios.get(this.jwtConfig.loadTeamsEndpoint, ...args)
  }
  
  joinTeams(...args) {
    return axios.post(this.jwtConfig.joinTeamsEndpoint, ...args)
  }

  loadTeamMembers(...args) {
    return axios.post(this.jwtConfig.loadTeamMembersEndpoint, ...args)
  }

  loadShops(...args) {
    return axios.post(this.jwtConfig.loadShopsEndpoint, ...args)
  }

  loadSlots(...args) {
    return axios.post(this.jwtConfig.loadSlotsEndpoint, ...args)
  }

  saveSlots(...args) {
    return axios.post(this.jwtConfig.saveSlotsEndpoint, ...args)
  }
}
