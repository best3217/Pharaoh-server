import { useEffect, useState } from "react"
import { Col, Row, TabContent, TabPane, Nav, NavItem, NavLink, Table } from "reactstrap"
import { ChevronLeft, ChevronRight } from "react-feather"
import Countdown, {zeroPad} from 'react-countdown'
import { formatNumber } from '@store/actions/init'
import useJwt from '@src/auth/jwt/useJwt'
import { useSelector } from "react-redux"
 
const League = () => {
  const { userData } = useSelector(state => state.auth)
  const [active, setActive] = useState('1')
  const [times, setTimes] = useState(86400000 * 30)
  const [time, setTime] = useState(86400000)
  const [data, setData] = useState([])
  const [me, setMe] = useState({})
  
  const initeTime = () => {
    const hours = (23 - new Date().getHours()) * 3600
    const minutes = (59 - new Date().getMinutes()) * 60
    const seconds = 59 - new Date().getSeconds()
    setTime((hours + minutes + seconds) * 1000)
  }

  const initeTimes = () => {
    const date = (31 - new Date().getDate()) * 3600 * 24
    const hours = (23 - new Date().getHours()) * 3600
    const minutes = (59 - new Date().getMinutes()) * 60
    const seconds = 59 - new Date().getSeconds()
    setTimes((date + hours + minutes + seconds) * 1000)
  }
  
  useEffect(() => {
    initeTime()
    initeTimes()
    useJwt.royalLeague()
      .then(res => {
        if (res.data.status) {
          setData(res.data.data)
        }
      })
      .catch(err => console.log(err))

    useJwt.userroyalLeague(userData._id)
      .then(res => {
        if (res.data.status) {
          setMe(res.data.data)
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="tabbed-page">
      <div className="content-binder container mt-1">
        <Row id="user-league-infos" className='mr-3 no-gutters justify-content-end'>
          <Col className='d-inline-flex justify-content-end align-items-center col-lg-2 col-3'>
            <div className="gradient-indent-1">
              <span className="white-bold"> League </span>
              <span className="yellow-normal"> Townsmen </span>
            </div>
          </Col>
          <Col className='d-inline-flex justify-content-center align-items-center col-2'>
            <div className="gradient-indent-2">
              <span className="white-bold"> Rank </span>
              <span className="yellow-normal"> {me?.league} </span>
            </div>
          </Col>
          <Col className='col-xl-3 col-4'>
            <div className="gradient-indent-3">
              <span className="white-bold"> Matchday end </span>
              <span className="yellow-normal"> 
                <Countdown
                  date={Date.now() + times}
                  intervalDelay={1000}
                  onComplete={initeTimes}
                  renderer={({ days, hours, minutes, seconds }) => (
                    <span>
                      {zeroPad(days)}T, {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                    </span>
                  )}
                />
              </span>
            </div>
          </Col>
        </Row>
      </div>
      <Nav tabs>
        <NavItem active={active === '1'}>
          <NavLink className='game-tab' active={active === '1'} onClick={() => setActive('1')}>  Royal League  </NavLink>
        </NavItem>
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1' className='w-100'>
          <Row>
            <Col sm="6">
              <div className='league-pagination'>
                <ChevronLeft />
                <span className="title"> Townsmen-League</span>
                <ChevronRight />
              </div>
              <Table responsive className='custom-table'>
                <thead className='custom-table-head'>
                  <tr>
                    <th className='bg-transparent border-0 text-white super-headline1-light'> Rank </th>
                    <th className='bg-transparent border-0 text-white super-headline1-light'> User </th>
                    <th className='bg-transparent border-0 text-white super-headline1-light'> earning </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item, key) => (
                      <tr key={key} className={`custom-talbe-row${userData._id === item._id ? '-active' : ''}`}>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> {item.royal_league + 1}. </td>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> {item.username} </td>
                        <td className='bg-transparent border-0 text-white super-headline1-light'>
                          <img className='mr-1' src={require('@src/assets/images/gold.png').default}/>
                          {formatNumber(item?.total_win ? item?.total_win : 0)}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Col>
            <Col sm="6" className='pt-1 pl-0 pr-2'>
              <div className="text-center col-12">
                <div className="super-headline3-light" style={{fontSize: '36px'}}> Royal Rewards </div>
                <div className="super-headline3-light" style={{fontSize: '23px'}}> for Slot Spins </div>
              </div>
              <div className='d-inline-flex justify-content-center w-100 mt-1'>
                <div className="gradient-indent-4">
                  <span className="white-bold"> time until reset : </span>
                  <span className="yellow-normal"> 
                    <Countdown
                      date={Date.now() + time}
                      intervalDelay={1000}
                      onComplete={initeTime}
                      renderer={({ hours, minutes, seconds }) => (
                        <span>
                          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                        </span>
                      )}
                    />
                  </span>
                </div>
              </div>
              <Row className='mt-2'>
                <Col className='text-center'>
                  <div className='d-flex align-items-center justify-content-center' style={{minHeight:'82px'}}>
                    <img src={require('@src/assets/images/league-two-cards.png').default}/>
                  </div>
                  <div className="gradient-indent-5">
                    <span className="super-headline1-light"> 1 </span>
                  </div>
                </Col>
                <Col className='text-center'>
                  <div className='d-flex align-items-center justify-content-center' style={{minHeight:'82px'}}>
                    <img src={require('@src/assets/images/league-egypt-precious.png').default}/>
                  </div>
                  <div className="gradient-indent-5">
                    <span className="super-headline1-light"> 2 </span>
                  </div>
                </Col>
                <Col className='text-center'>
                  <div className='d-flex align-items-center justify-content-center' style={{minHeight:'82px'}}>
                    <img src={require('@src/assets/images/league-there-gold.png').default}/>
                  </div>
                  <div className="gradient-indent-5">
                    <span className="super-headline1-light"> {formatNumber(1000000)} </span>
                  </div>
                </Col>
                <Col className='text-center'>
                  <div className='d-flex align-items-center justify-content-center' style={{minHeight:'82px'}}>
                    <img src={require('@src/assets/images/league-crown.png').default}/>
                  </div>
                  <div className="gradient-indent-5">
                    <span className="super-headline1-light"> 2 </span>
                  </div>
                </Col>
              </Row>
              <div className="super-headline1-light text-center mt-1" style={{fontSize: '22px'}}> spins left: </div>
              <Row className='mt-1'>
                <Col className='text-center'>
                  <div className="gradient-indent-6">
                    <span className="super-headline1-light"> {formatNumber(50)}x </span>
                  </div>
                </Col>
                <Col className='text-center'>
                  <div className="gradient-indent-6">
                    <span className="super-headline1-light"> {formatNumber(250)}x </span>
                  </div>
                </Col>
                <Col className='text-center'>
                  <div className="gradient-indent-6">
                    <span className="super-headline1-light"> {formatNumber(500)}x </span>
                  </div>
                </Col>
                <Col className='text-center'>
                  <div className="gradient-indent-6">
                    <span className="super-headline1-light"> {formatNumber(1000)}x </span>
                  </div>
                </Col>
              </Row>
              <div className="super-headline1-light text-center mt-1" style={{fontSize: '24px'}}> wins total </div>
              <div className='w-100 d-flex justify-content-center'>
                <div className="gradient-indent-7">
                  <span className="super-headline1-light" style={{fontSize: '26px', marginTop:'2px'}}> {formatNumber(me?.total_win ? me?.total_win : 0)} </span>
                </div>
              </div>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default League
