import { Fragment, useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import Countdown, {zeroPad} from 'react-countdown'
import jwtDefaultConfig from '../../../../@core/auth/jwt/jwtDefaultConfig'
import TreasureModal from '../../../../component/TreasureModal'
import MissionModal from '../../../../component/MissionModal'
import BonusSlotModal from '../../../../component/BonusSlotModal'

const Footer = () => {
  const [isTOpen, setIsTOpen] = useState(false)
  const [isMOpen, setIsMOpen] = useState(false)
  const [isBOpen, setIsBOpen] = useState(false)
  const [remaining, setRemaining] = useState({
    time: new Date().valueOf() - 3600000,
    isEnd: true
  })
  useEffect(() => {
    // console.log(jwtDefaultConfig)
    if (jwtDefaultConfig.Socket) {
      jwtDefaultConfig.Socket.on("bonus-slots-remaining", (rmn) => {  
        console.log(rmn)
        if (rmn - new Date().valueOf() > 0) {
          setRemaining({
            time: rmn,
            isEnd: false
          })
        } else {
          setRemaining({
            time: new Date().valueOf() - 36000000,
            isEnd: true
          })
        }
      })
    }
  }, [jwtDefaultConfig.Socket])

  return (
    <Fragment>
      <TreasureModal isOpen={isTOpen} setIsOpen={(e) => setIsTOpen(e)}/>
      <MissionModal isOpen={isMOpen} setIsOpen={(e) => setIsMOpen(e)}/>
      <BonusSlotModal isOpen={isBOpen} setIsOpen={(e) => setIsBOpen(e)}/>
      <div id="footer-container">
        <div id="shadow-row" className="row to-center-abs"></div>
        <div id="footer" className="container-fluid">
          <div className="row mx-auto footer-row align-items-center justify-content-around">
            <div className="footer-col fill first-filler col"></div>
            <div className="footer-col bonus-slot col">
              <div className="footer-item" onClick={() => {
                  if (remaining.isEnd) {
                    setIsBOpen(!isBOpen)
                  }
                }}>
                <div className='remaining-time'>
                  {
                    !remaining.isEnd ? (
                      <Countdown
                        date={remaining.time}
                        intervalDelay={1000}
                        onComplete={(e) => {
                          console.log(e)
                          setRemaining({remaining, isEnd: true})
                        }}
                        renderer={({ hours, minutes, seconds }) => (
                          <span>
                            {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                          </span>
                        )}
                      />
                    ) : null
                  }
                </div>
                <img src={require('@src/assets/images/footer/spin.png').default} draggable="false"/>
                <div style={{height:'20px'}}/>
              </div>
              <div className='game-background'/>
            </div>
            <div className="footer-col fill col" />
            <div className="footer-col missions col">
              <div className="footer-item" onClick={() => setIsMOpen(!isMOpen)}>
                <img src={require('@src/assets/images/footer/card.png').default} className="to-center-abs foreground" draggable="false"/>
                <div style={{height:'20px'}}/>
              </div>
              <div className='game-background'/>
            </div>
            <div className="footer-col fill col "/>
            <div className="mission footer-col col">
              <div className="footer-item chest-item" onClick={() => setIsMOpen(!isMOpen)}>
                <img src={require('@src/assets/images/footer/goldbox.png').default} draggable="false"/>
              </div>
              <div className="footer-item chest-item" onClick={() => setIsMOpen(!isMOpen)}>
                <img src={require('@src/assets/images/footer/goldbox.png').default} draggable="false"/>
              </div>
              <div className="footer-item chest-item" onClick={() => setIsMOpen(!isMOpen)}>
                <img src={require('@src/assets/images/footer/goldbox.png').default} draggable="false"/>
              </div>
              <div className="progress-dots">
                <div className="progress-dot">
                  <div className="progress-dot fill"></div>
                </div>
                <div className="progress-dot">
                  <div className="progress-dot fill"></div>
                </div>
                <div className="progress-dot">
                </div>
              </div>
              <div className='game-background'/>
            </div>
            <div className="footer-col fill col" />
            <div className="footer-col treasury col">
              <div className="footer-item" style={{padding:'0 30px'}}>
                <img src={require('@src/assets/images/footer/egypt.png').default} draggable="false" onClick={() => setIsTOpen(!isTOpen)}/>
                <div style={{height:'20px'}}/>
                <div className="golden-progress-bar">
                  <div className='progress-bar'>
                    <div className="progress-fill" style={{width:'1%'}}></div>
                  </div>
                  <div className="progress-number"> 1% </div>
                </div>
              </div>
              <div className='game-background'/>
            </div>
            <div className="footer-col fill col"/>
          </div>
        </div>
      </div>    
    </Fragment>
  )
}

export default Footer
