// ** Auth Endpoints
const url = 'http://85.214.82.29'
// const url = 'http://h2931731.stratoserver.net'
// const url = 'http://192.168.110.145:1998'
export default {
  loginEndpoint: 'users/login',
  registerEndpoint: 'users/register',
  refreshEndpoint: 'users/refresh-token',
  logoutEndpoint: 'users/logout',
  loadRoyalLeagueEndpoint:'users/royal-league/',

  loadGameListEndpoint:'game_lists/',
  playGameEndpoint:'players/game',

  loadTeamsEndpoint:'teams/',
  joinTeamsEndpoint:'team_members/join',
  loadTeamMembersEndpoint:'team_members/find',
  loadShopsEndpoint:'shops/find',
  
  loadSlotsEndpoint:'bonus_slots/random',
  saveSlotsEndpoint:'bonus_slots_history/saves',
  
  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
  Socket: null,
  apiUrl: `${url}/api/`,
  Domain: `${url}`
}
