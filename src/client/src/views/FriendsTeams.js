import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, TabContent, TabPane, Nav, NavItem, NavLink, Table } from "reactstrap"
import { ChevronLeft, ChevronRight } from "react-feather"
import useJwt from '@src/auth/jwt/useJwt'
import { updateUserInfo } from "../redux/actions/auth"
import { formatNumber } from '@store/actions/init'

const FriendsTeams = () => {
  const dispatch = useDispatch()
  const [active, setActive] = useState('2')
  const [data, setData] = useState([])
  const [joined, setJoined] = useState(false)
  const { userData } = useSelector(state => state.auth)

  const loadTeams = () => {
    useJwt
      .loadTeams()
      .then(res => {
        if (res.data.status) {
          setData(res.data.data)
        }
      })
      .catch(err => console.log(err))
  }

  const loadTeamMembers = () => {
    useJwt
      .loadTeamMembers({teams_id: userData.teams_id})
      .then(res => {
        if (res.data.status) {
          setData(res.data.data)
        }
      })
      .catch(err => console.log(err))
  }

  const joinTeams = (team) => {
    useJwt
      .joinTeams(team)
      .then(res => {
        if (res.data.status) {
          setJoined(true)
          dispatch(updateUserInfo(res.data.data))
        } else {
          console.log(`res.data`, res.data)
        }
      })
      .catch(err => console.log(err))
  }
  
  useEffect(() => {
    if (userData.teams_id) {
      setJoined(true)
      loadTeamMembers()
    } else {
      loadTeams()
    }
  }, [userData, joined])

  return (
    <div className="tabbed-page">
      <Nav tabs>
        <NavItem active={active === '1'}>
          <NavLink className='game-tab' disabled={!joined} active={active === '1'} onClick={() => setActive('1')}>  slot battle  </NavLink>
        </NavItem>
        <NavItem active={active === '2'}>
          <NavLink className='game-tab' active={active === '2'} onClick={() => setActive('2')}>  {!joined && 'Join'} Team  </NavLink>
        </NavItem>
        <NavItem active={active === '3'}>
          <NavLink className='game-tab' disabled={!joined} active={active === '3'} onClick={() => setActive('3')}>  team league  </NavLink>
        </NavItem>
        <NavItem active={active === '4'}>
          <NavLink className='game-tab' active={active === '4'} onClick={() => setActive('4')}>  friends  </NavLink>
        </NavItem>
        <NavItem active={active === '5'}>
          <NavLink className='game-tab' disabled={!joined} active={active === '5'} onClick={() => setActive('5')}>  chat  </NavLink>
        </NavItem>
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='2' className='w-100'>
          <Row>
            {joined ? (
              <Col sm="12">
                <div className='teams-pagination'>
                  <ChevronLeft />
                    <span className="title"> team </span>
                  <ChevronRight />
                </div>
                <Table responsive className='custom-table teams'>
                  <thead className='custom-table-head team'>
                    <tr>
                      <th className='bg-transparent border-0 text-white super-headline1-light'> Rank </th>
                      <th className='bg-transparent border-0 text-white super-headline1-light'> Member </th>
                      <th className='bg-transparent border-0 text-white super-headline1-light'> Score </th>
                      <th className='bg-transparent border-0 text-white super-headline1-light'> Battles </th>
                      <th className='bg-transparent border-0 text-white super-headline1-light'> Activity </th>
                      <th className='bg-transparent border-0 text-white super-headline1-light'> Reward </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, key) => (
                      <tr key={key} className='custom-talbe-row'>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> {item.rank} </td>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> {item.users_id?.username} </td>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> {item.score} </td>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> {item.battles}/10 </td>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> {item.activity} </td>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> {formatNumber(item.reward)} </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            ) : (
              <Col sm="12">
                <div className='teams-pagination'>
                  <ChevronLeft />
                    <span className="title"> Join team </span>
                  <ChevronRight />
                </div>
                <Table responsive className='custom-table teams'>
                  <thead className='custom-table-head team'>
                    <tr>
                      <th className='bg-transparent border-0 text-white super-headline1-light'> Team </th>
                      <th className='bg-transparent border-0 text-white super-headline1-light'> League </th>
                      <th className='bg-transparent border-0 text-white super-headline1-light'> Space </th>
                      <th className='bg-transparent border-0 text-white super-headline1-light'> Join At </th>
                      <th className='bg-transparent border-0 text-white super-headline1-light'>  </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, key) => (
                      <tr key={key} className='custom-talbe-row'>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> {item.team} </td>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> {item.league} </td>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> {item.space} </td>
                        <td className='bg-transparent border-0 text-white super-headline1-light'> Level{item.joinAt} </td>
                        <td className='bg-transparent border-0 text-white' onClick={() => joinTeams(item)}>
                          <div className='game-button'> Join </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            )}
          </Row>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default FriendsTeams
