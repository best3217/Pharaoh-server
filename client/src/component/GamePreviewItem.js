import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Col } from 'reactstrap'
import useJwt from '@src/auth/jwt/useJwt'
import Avatar from '@components/avatar'
import { X } from 'react-feather'
import { toast, Slide } from 'react-toastify'

const GamePreviewItem = ({item}) => {
  const history = useHistory()
  const { userData } = useSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  const ErrorToast = ({title, desc}) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='danger' icon={<X size={12} />} />
          <h6 className='text-danger ml-50 mb-0'>{title}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>{desc}</span>
      </div>
    </Fragment>
  )

  const play = () => {
    // console.log(item)
    useJwt
      .playGame(item)
      .then(res => {
        if (res.data.status) {
          history.push('/play', res.data.data)
        } else {
          toast.error(<ErrorToast desc={`error`} title={`Error`} />, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        }
      })
      .catch(err => console.log(err))
  }

  if (isLoading) {
    return (
      <Col xs={3} className='p-1'>
        <div className="skeleton-item" name="game-preview-skeleton"></div>
      </Col>
    )
  }

  if (userData.levels_id?.level >= item.level || item.level === 0) {
    return (
      <Col xs={3} className='p-1'>
        <div className="slot-item w-100 h-100 position-relative">
          <Link to='#' onClick={play}>
            <div className="slot-img-container w-100 position-relative golden-frame">
              <div id="frame-hover" className="dead-center w-100 h-100"></div>
              <div className="deco-corners">
                <div className="small-gold deco-corner top-left"></div>
                <div className="small-gold deco-corner top-right"></div>
                <div className="small-gold deco-corner bottom-right"></div>
                <div className="small-gold deco-corner bottom-left"></div>
              </div>
              <img draggable="false" className="slot-img" src={item.image}/>
            </div>
            <div className="game-title-field w-100 text-center text-uppercase d-flex align-items-center justify-content-center">
              {item.title}
            </div>
            {/* <div className="jackpot-line-container w-100 d-inline-flex align-items-center justify-content-around">
              <div className="jackpot-amount bold text-uppercase">
                {4} <span className="jackpot-word">Jackpots</span>
              </div>
              <div className="jackpot-size text-white bold">
                {1000}
              </div>
              <img src={require('@src/assets/images/lobby/gold.png').default} draggable="false" alt="gold"/>
            </div> */}
            {/* <div className="fire-container to-center-abs">
              <img src={require('@src/assets/images/lobby/jackpot-hotness-animation-realflames.gif').default} className="w-100"/>
            </div>
            <div className="jackpot-hotness-container golden-border to-center-abs">
              <div className="jackpot-hotness-fill to-center-abs">
                <div className="diagram-container">
                  <div className="diagram-filler flames" style={{width:'100%'}}></div>
                </div>
                <div className="jackpot-hotness-text">120°</div>
              </div>
            </div> */}
          </Link>
        </div>
      </Col>
    )
  } else {
    return (
      <Col xs={3} className='p-1'>
        <div className="slot-item w-100 h-100 position-relative">
          <div>
            <div className="lock-text bold text-uppercase text-center to-center-abs">
              From Level {item.level} 
              </div>
            <div className="lock dead-center">
              <img src={require('@src/assets/images/lobby/slot-lock.png').default} className="w-100" />
            </div>
          </div>
          <div className="game-locked dead-center"></div>
          <Link to='#'>
            <div className="slot-img-container w-100 position-relative golden-frame">
              <div id="frame-hover" className="dead-center w-100 h-100"></div>
              <div className="deco-corners">
                <div className="small-gold deco-corner top-left"></div>
                <div className="small-gold deco-corner top-right"></div>
                <div className="small-gold deco-corner bottom-right"></div>
                <div className="small-gold deco-corner bottom-left"></div>
              </div>
              <img draggable="false" className="slot-img locked-game" src={item.image}/>
            </div>
            <div className="game-title-field w-100 text-center text-uppercase d-flex align-items-center justify-content-center">
              {item.title}
            </div>
            {/* <div className="jackpot-line-container w-100 d-inline-flex align-items-center justify-content-around">
              <div className="jackpot-amount bold text-uppercase">
                {4} <span className="jackpot-word">Jackpots</span>
              </div>
              <div className="jackpot-size text-white bold">
                {1000}
              </div>
              <img src={require('@src/assets/images/lobby/gold.png').default} draggable="false" alt="gold"/>
            </div> */}
            {/* <div className="fire-container to-center-abs">
              <img src={require('@src/assets/images/lobby/jackpot-hotness-animation-realflames.gif').default} className="w-100"/>
            </div>
            <div className="jackpot-hotness-container golden-border to-center-abs">
              <div className="jackpot-hotness-fill to-center-abs">
                <div className="diagram-container">
                  <div className="diagram-filler flames" style={{width:'100%'}}></div>
                </div>
                <div className="jackpot-hotness-text">120°</div>
              </div>
            </div> */}
          </Link>
        </div>
      </Col>
    )
  }
}

export default GamePreviewItem
