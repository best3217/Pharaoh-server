import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Navbar, NavItem } from 'reactstrap'
import jwtDefaultConfig from '../../../../@core/auth/jwt/jwtDefaultConfig'
import { formatNumber } from '@store/actions/init'
import { useSelector } from 'react-redux'

const GameNavbar = props => {
  const history = useHistory()
  const { userData } = useSelector(state => state.auth)
  const [balance, setBalance] = useState({gold:'-', crown:'-'})
  const [level, setLevel] = useState(0)
  const [levels, setLevels] = useState(0)
  const [league, setLeague] = useState('-')
  
  useEffect(() => {
    if (jwtDefaultConfig.Socket) {
      jwtDefaultConfig.Socket.on("balance", (data) => {
        setBalance(data)
      })
      jwtDefaultConfig.Socket.on("level-progress", ({mylevel}) => {
        setLevels(mylevel)
      })
      jwtDefaultConfig.Socket.on("level-up", ({mylevel, newLevel}) => {
        setLevels(mylevel)
        setLevel(newLevel)
      })
      jwtDefaultConfig.Socket.on("royal-league", (royal_league) => {
        setLeague(royal_league)
      })
    }
  }, [jwtDefaultConfig.Socket])

  return (
    <Navbar expand='lg' className='header-navbar navbar-fixed navbar-shadow navbar-brand-center'>
      <div className='header'>
        <ul className='navbar-nav nav-area-left'>
          <NavItem className='nav-item'>
            <div className='game-border'>
              <img src={require('@src/assets/images/top/gold.png').default}/>
              <div>{formatNumber(balance.gold)}</div>
            </div>
          </NavItem>
          <NavItem className='nav-item'>
            <div className='game-border'>
              <img src={require('@src/assets/images/top/crown.png').default}/>
              <div>{formatNumber(balance.crown)}</div>
            </div>
          </NavItem>
          <NavItem className='nav-item'>
            <div className='game-button'> Secial Offer </div>
          </NavItem>
        </ul>
        <div className='wrapper-logo'>
          <Link to={'/game'}>
            <img src={require('@src/assets/images/top/logo.png').default} draggable={false}/>
          </Link>
        </div>
        <ul className='navbar-nav nav-area-right'>
          <NavItem className='nav-item' onClick={() => history.push('shop')}>
            <div className='game-button'> Shop </div>
          </NavItem>
          <NavItem className='nav-item' style={{marginTop:'-12.4px'}}>
            <div className='text-uppercase' style={{color:'#670f04', textAlign:'center', fontSize:'12.4px'}}>royal league</div>
            <div className='game-border'>
              <img src={require('@src/assets/images/top/roayl_league.png').default}/>
              <div>{league}</div>
            </div>
          </NavItem>
          <NavItem className='nav-item'>
            {/* <Link to='/profile'> */}
              <div className='header-avatar-container' onClick={() => history.push('profile')}>
                <div className="progress-bar-section">
                  <div className="text-below-level-progress">
                    <span className="header-avatar-username" name="dmitriy"> {userData.username} </span>
                    <span className="progress-number"> {level} </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width:`${levels * 100}%`}}></div>
                  </div>
                </div>
                <div className="avatar-section">
                  <div className="avatar-circle-frame">
                    <img draggable="false" src={require('@src/assets/images/top/avatar.png').default} className="header-item-icon to-center-abs"/>
                    <div className="dead-center"> Profile </div>
                  </div>
                </div>
              </div>
            {/* </Link> */}
          </NavItem>
        </ul>
      </div>
    </Navbar>
  )
}

export default GameNavbar