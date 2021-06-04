import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useHistory } from 'react-router'
import useJwt from '@src/auth/jwt/useJwt'
import { Modal, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane, Table } from 'reactstrap'
const Shops = () => {
  const history = useHistory()
  const [active, setActive] = useState('1')
  const [data, setData] = useState([])

  useEffect(() => {
    useJwt
      .loadShops({type:(active === '1' ? 'gold' : 'crown')})
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
  }, [active])
  
  return (
    <Modal isOpen={true} toggle={() => history.goBack()} size='lg' className='shop-modal'>
      <div style={{cursor:'pointer'}} className="close-button" onClick={() => history.goBack()}>
        <img draggable="false" src={require('@src/assets/images/daily/cancel.png').default} draggable={false}/>
      </div>
      <ModalBody style={{background:'transparent'}}>
        <div className="bg"/>
        <div className="tabbed-page" style={{marginTop:'100px'}}>
          <Nav tabs>
            <NavItem active={active === '1'}>
              <NavLink className='game-tab' active={active === '1'} onClick={() => setActive('1')}>  Gold Bundles  </NavLink>
            </NavItem>
            <NavItem active={active === '2'}>
              <NavLink className='game-tab' active={active === '2'} onClick={() => setActive('2')}>  Crown Bundles  </NavLink>
            </NavItem>
          </Nav>
          <TabContent className='py-50' activeTab={active}>
            <TabPane tabId='1' className='w-100'>
              <div className='league-pagination1'>
                <ChevronLeft />
                <span className="title"> Gold Bundles</span>
                <ChevronRight />
              </div>
              <Table responsive className='custom-table border-0'>
                <thead className='custom-table-head'>
                  <tr>
                    <th className='bg-transparent border-0 text-white super-headline1-light' style={{fontSize:'1.3rem'}}> Package </th>
                    <th className='bg-transparent border-0 text-white super-headline1-light' style={{fontSize:'1.3rem'}}> bonus </th>
                    <th className='bg-transparent border-0 text-white super-headline1-light' style={{fontSize:'1.3rem'}}> price </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item, key) => (
                      <tr className='custom-talbe-row' key={key}>
                        <td className='bg-transparent border-0'> 
                          <div className='d-flex justify-content-between align-items-center'>
                            <span className='super-headline1-light'> {item.title} </span>
                            <img src={require(`@src/assets/images/gold${key + 1}.png`).default}/>
                            <div className='d-inline-flex'>
                              <div>
                                <div className='super-headline3-light' style={{fontSize:'1.3rem'}}> {item.amount}x </div>
                                <div className='text-white' style={{textDecoration:'line-through'}}> {item.off}x </div>
                              </div>
                              <div className='ml-1'>
                                <img src={require('@src/assets/images/star.png').default}/>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='bg-transparent border-0'>
                          <div className='d-flex justify-content-around align-items-center'>
                            {
                              item.trading_cards ? (
                              <div className='d-inline-flex align-items-center'>
                                <div className='super-headline1-light' style={{fontSize:'1.3rem'}}> {item.trading_cards}X </div>
                                <div className='ml-1'>
                                  <img src={require('@src/assets/images/shop-cards.png').default}/>
                                </div>
                              </div>) : null
                            }
                            {
                              item.loyalty_points ? (
                                <div className='d-inline-flex align-items-center'>
                                  <div className='super-headline1-light' style={{fontSize:'1.3rem'}}> {item.loyalty_points}X </div>
                                  <div className='ml-1'>
                                    <img src={require('@src/assets/images/shop-egypt.png').default}/>
                                  </div>
                                </div>) : null
                            }
                            {
                              item.slots_upgrade ? (
                                <div className='d-inline-flex align-items-center'>
                                  <div className='super-headline1-light' style={{fontSize:'1.3rem'}}> {item.slots_upgrade}X </div>
                                  <div className='ml-1'>
                                    <img src={require('@src/assets/images/shop-level-up.png').default}/>
                                  </div>
                                </div>) : null
                            }
                          </div>
                        </td>
                        <td className='bg-transparent border-0 '>
                          <div className='game-button'> {item.currency} {item.price} </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <div className="gold"/>
            </TabPane>
            <TabPane tabId='2' className='w-100 h-100'>
              <div className='league-pagination1'>
                <ChevronLeft />
                <span className="title"> Gold Bundles</span>
                <ChevronRight />
              </div>
              <Table responsive className='custom-table border-0'>
                <thead className='custom-table-head'>
                  <tr>
                    <th className='bg-transparent border-0 text-white super-headline1-light' style={{fontSize:'1.3rem'}}> Package </th>
                    <th className='bg-transparent border-0 text-white super-headline1-light' style={{fontSize:'1.3rem'}}> bonus </th>
                    <th className='bg-transparent border-0 text-white super-headline1-light' style={{fontSize:'1.3rem'}}> price </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item, key) => (
                      <tr className='custom-talbe-row' key={key}>
                        <td className='bg-transparent border-0'> 
                          <div className='d-flex justify-content-between align-items-center'>
                            <span className='super-headline1-light'> {item.title} </span>
                            <img src={require(`@src/assets/images/crown${key + 1}.png`).default}/>
                            <div className='d-inline-flex'>
                              {
                                item.amount > 1 ? (
                                  <div>
                                    <div className='super-headline3-light' style={{fontSize:'1.3rem'}}> {item.amount}x </div>
                                    <div className='text-white' style={{textDecoration:'line-through'}}> {item.off}x </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className='super-headline3-light' style={{fontSize:'1.3rem'}}> TURBO+ {item.amount * 100}% </div>
                                    <div className='text-white'> {item.off} min valid </div>
                                  </div>
                                )
                              }
                              <div className='ml-1'>
                                {
                                  item.amount > 1 && <img src={require('@src/assets/images/crown7.png').default}/>
                                }
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='bg-transparent border-0'>
                          <div className='d-flex justify-content-around align-items-center'>
                            {
                              item.trading_cards ? (
                              <div className='d-inline-flex align-items-center'>
                                <div className='super-headline1-light' style={{fontSize:'1.3rem'}}> {item.trading_cards}X </div>
                                <div className='ml-1'>
                                  <img src={require('@src/assets/images/shop-cards.png').default}/>
                                </div>
                              </div>) : null
                            }
                            {
                              item.loyalty_points ? (
                                <div className='d-inline-flex align-items-center'>
                                  <div className='super-headline1-light' style={{fontSize:'1.3rem'}}> {item.loyalty_points}X </div>
                                  <div className='ml-1'>
                                    <img src={require('@src/assets/images/shop-egypt.png').default}/>
                                  </div>
                                </div>) : null
                            }
                            {
                              item.slots_upgrade ? (
                                <div className='d-inline-flex align-items-center'>
                                  <div className='super-headline1-light' style={{fontSize:'1.3rem'}}> {item.slots_upgrade}X </div>
                                  <div className='ml-1'>
                                    <img src={require('@src/assets/images/shop-level-up.png').default}/>
                                  </div>
                                </div>) : null
                            }
                          </div>
                        </td>
                        <td className='bg-transparent border-0 '>
                          <div className='game-button'> {item.currency} {item.price} </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <div className="gold"/>
            </TabPane>
          </TabContent>
        </div>
      </ModalBody>
    </Modal>    
  )
}

export default Shops
