import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, TabContent, TabPane, Nav, NavItem, NavLink, Table } from "reactstrap"
import useJwt from '@src/auth/jwt/useJwt'
import moment from 'moment'
import { handleLogout } from '@store/actions/auth'
const initInfo = {
  bigwin: '-',
  level: '-',
  total_win: '-',
  league: '-',
  team: '-',
  team_rank: '-',
  team_league: '-'
}
const Profile = () => {
  const dispatch = useDispatch()
  const [active, setActive] = useState('1')
  const [info, setinfo] = useState(initInfo)
  const [data, setData] = useState([])
  const { userData } = useSelector(state => state.auth)

  const loadTeams = () => {
    useJwt
      .loadTeams()
      .then(res => {
        if (res.data.status) {
          if (res.data.data.length) {
            setData(res.data.data)
          }
        } else {
          console.log(`res.data`, res.data)
        }
      })
      .catch(err => console.log(err))
    useJwt.userroyalLeague(userData._id)
      .then(res => {
        if (res.data.status) {
          setinfo({...info, ...res.data.data})
        }
      })
      .catch(err => console.log(err))
  }

  const LogOut = () => {
    useJwt.logOut({users_id: userData._id})
    dispatch(handleLogout())
  }

  useEffect(() => {
    loadTeams()
  }, [])

  return (
    <div className="tabbed-page">
      <Nav tabs>
        <NavItem active={active === '1'}>
          <NavLink className='game-tab' active={active === '1'} onClick={() => setActive('1')}>  Profile  </NavLink>
        </NavItem>
        <NavItem active={active === '2'}>
          <NavLink className='game-tab' active={active === '2'} onClick={() => setActive('2')}>  voucher  </NavLink>
        </NavItem>
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1' className='w-100'>
          <Row className='m-0'>
            <Col sm="7" className='pt-2'>
              <Row>
                <Col sm="4" className='h-100'>
                  <div className='d-flex justify-content-center'>
                    <div id="avatar-field" className="gradient-indent glow position-relative">
                      <img draggable="false" alt="avatar" src={require('@src/assets/images/profile.png').default} className="avatar-img dead-center"/>
                    </div>
                  </div>
                  <div id="user-id-field" className="text-center pt-1">
                    <span className="text-uppercase super-headline1-light">User-ID {userData.pid}</span>
                  </div>
                  <div className="text-center w-100">
                    <span className="subheadline-golden">Gold Bonus</span>
                  </div>
                  <img draggable="false" src={require('@src/assets/images/coins.png').default} className="w-100 pt-1"/>
                  <div className="text-center pt-1">
                    <div className="text-white mb-1"> Receive exclusive Gold Bonuses via mail </div>
                    <div className="newsletter-switch w-100 justify-content-around d-inline-flex align-items-center mb-1">
                      <span className="text-uppercase on">No</span>
                      <div className="settings-controller">
                        <div className="settings-indicator" />
                      </div>
                      <span className="text-uppercase">Yes</span>
                    </div>
                  </div>
                </Col>
                <Col sm="8" className='pt-1'>
                  <Row>
                    <Col>
                      <div className='d-inline-flex justify-content-around align-items-center'>
                        <h1 className="text-capitalize super-headline1-light mr-1">{userData.username}</h1>
                        <img draggable="false" src={require('@src/assets/images/pencil.png').default}/>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-inline-flex justify-content-center">
                        <div className='profile-button'> change password </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='12'>
                      <Row>
                        <Col>
                          <div className='d-inline-flex justify-content-around align-items-center'>
                            <span className="text-capitalize mr-1 color-yellow">Birthday: </span>
                            <span className="text-capitalize mr-1 text-white">{moment(userData.birthday).format('MM-DD-YYYY')}</span>
                            <img draggable="false" src={require('@src/assets/images/pencil.png').default}/>
                          </div>
                        </Col>
                        <Col>
                          <div className="d-inline-flex justify-content-center" onClick={LogOut}>
                            <div className='profile-button'> Log out </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm='12' className='mt-05'>
                      <div className='d-inline-flex justify-content-around align-items-center'>
                        <span className="text-capitalize mr-1 color-yellow">Email: </span>
                        <span className="text-capitalize mr-1 text-white">{userData.email}</span>
                      </div>
                    </Col>
                    <Col sm='12' className='mt-05'>
                      <div className="d-inline-flex justify-content-center">
                        <div className='profile-button'> confirm e-mail </div>
                      </div>
                    </Col>
                    <Col sm='12' className='mt-05'>
                      <span className='color-brown confirm-message'>Confirm your email address & receiver 1.000.000 Gold!</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='12' className='mt-05'>
                      <div className='border-cover d-flex align-items-center justify-content-between pl-2 pr-2'>
                        <span className="text-white f-17">Biggest Win </span>
                        <span className="color-yellow f-17"> {info?.bigwin} </span>
                      </div>  
                    </Col>
                    <Col sm='12' className='mt-05'>
                      <div className='border-cover d-flex align-items-center justify-content-between pl-2 pr-2'>
                        <span className="text-white f-17">Highest Jackpot </span>
                        <span className="color-yellow f-17"> -</span>
                      </div>
                    </Col>
                    <Col sm='12' className='mt-05'>
                      <div className='border-cover d-flex align-items-center justify-content-between pl-2 pr-2'>
                        <span className="text-white f-17">Latest Achievement </span>         
                        <span className="color-yellow f-17"> -</span>
                      </div>
                    </Col>
                    <Col sm='12' className='mt-05'>
                      <div className='border-cover d-flex align-items-center justify-content-between pl-2 pr-2'>
                        <span className="text-white f-17">Won Battles </span>
                        <span className="color-yellow f-17"> -</span>
                      </div>
                    </Col>
                    <Col sm='12' className='mt-05'>
                      <div className='border-cover d-flex align-items-center justify-content-between pl-2 pr-2'>
                        <span className="text-white f-17">Won Tournament</span>
                        <span className="color-yellow f-17"> -</span>
                      </div>
                    </Col>
                    <Col sm='12' className='mt-05'>
                      <div className='border-cover d-flex align-items-center justify-content-between pl-2 pr-2'>
                        <span className="text-white f-17">Team Name </span>
                        <span className="color-yellow f-17"> {info?.team} </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm="5" className='profile-badges'>
              <Row className='d-inline-flex flex-md-row justify-content-between h-100 pr-3 pl-3'>
                <Col className='d-inline-flex align-items-center'>
                  <img draggable="false" src={require('@src/assets/images/level.png').default}/>
                  <div className='d-inline-flex flex-md-column align-items-center ml-3'>
                    <span className="super-headline1-light text-uppercase"> level </span>
                    <div className="gradient-indent-9">
                      <span className="super-headline1-light"> {info?.level} </span>
                    </div>                    
                  </div>
                </Col>
                <Col className='d-inline-flex align-items-center'>
                  <img draggable="false" src={require('@src/assets/images/egypt-precious.png').default}/>
                  <div className='d-inline-flex flex-md-column align-items-center ml-3'>
                    <span className="super-headline1-light text-uppercase"> royal league </span>
                    {/* <span className='color-brown confirm-message'>-</span> */}
                    <div className="gradient-indent-9">
                      <span className="super-headline1-light"> {info?.league} </span>
                    </div>                    
                  </div>
                </Col>
                <Col className='d-inline-flex align-items-center'>
                  <img draggable="false" src={require('@src/assets/images/loyalty-points.png').default}/>
                  <div className='d-inline-flex flex-md-column align-items-center ml-3'>
                    <span className="super-headline1-light text-uppercase"> Loyalty Points </span>
                    {/* <span className='color-brown confirm-message'>-</span> */}
                    <div className="gradient-indent-9">
                      <span className="super-headline1-light"> - </span>
                    </div>                    
                  </div>
                </Col>
                <Col className='d-inline-flex align-items-center'>
                  <img draggable="false" src={require('@src/assets/images/team-league.png').default}/>
                  <div className='d-inline-flex flex-md-column align-items-center ml-3'>
                    <span className="super-headline1-light text-uppercase"> Team League </span>
                    <span className='color-brown confirm-message'> {info?.team_league} </span>
                    <div className="gradient-indent-9">
                      <span className="super-headline1-light"> {info?.team_rank} </span>
                    </div>                    
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId='2' className='w-100 h-100'>
          <div className='d-flex justify-content-center h-100 pt-2 pb-2 flex-md-column'>
            <span style={{fontSize:'34px'}} className="subheadline-golden text-uppercase text-center w-100">Redeem voucher</span>
            <span className="super-headline1-light text-uppercase text-center w-100"> Redeem your Voucher Code now & receiver exclusive rewards </span>
            <div className='d-inline-flex justify-content-center mt-1'>
              <img draggable="false" src={require('@src/assets/images/voucher.png').default}/>
              <div className='mt-5'>
                <span className="super-headline1-light mt-2">Voucher Code</span>
                <input className='border-cover d-flex align-items-center justify-content-between p-1 border-0 text-white mt-2' style={{outline:'none'}}/>
                <div className="d-inline-flex justify-content-center w-100 mt-2">
                  <div className='redeem-button' style={{fontSize:'24px'}}> redeem </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default Profile
