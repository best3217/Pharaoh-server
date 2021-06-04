import { Fragment, useEffect, useState } from 'react'
import { Modal, ModalBody, Row, Col } from 'reactstrap'
import jwtDefaultConfig from '../@core/auth/jwt/jwtDefaultConfig'


const DaliyBounsModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false)
    const [count, setCount] = useState(0)
    const [state, setState] = useState({
        crown: 0,
        gold: 0,
        cards: 0
    })
    useEffect(() => {
        jwtDefaultConfig.Socket.on("daliy-bonus", ({count}) => {
            setCount(count)
            setIsOpen(true)
        })
        jwtDefaultConfig.Socket.on("daliy-card-result", (data) => {
            setState(data)
            setIsOpen1(true)
        })
    }, [])

    const openCard = async (e) => {
        await setCount(count - 1)
        if (count > 0) {
            jwtDefaultConfig.Socket.emit("daliy-card-open", e)
        }
    }

    const range = (start, end) => (
        new Array(end - start + 1).fill().map((el, ind) => ind + start)
    )

    const toggle = () => {
        setIsOpen1(!isOpen1)
        if (count === 0) {
            setIsOpen(false)
        }
    }
    
    return (
        <Fragment>
            <Modal isOpen={isOpen1} toggle={toggle} size='lg'>
                <div style={{cursor:'pointer', position:'absolute', right:'-20px', top:'-20px'}} className="close-button" onClick={toggle}>
                    <img draggable="false" src={require('@src/assets/images/daily/cancel.png').default} draggable={false} style={{maxWidth:'40px'}}/>
                </div>
                <Row className='p-2'>
                    <Col className="earning-btn text-center">
                        <div className='cover d-flex align-items-center justify-content-center' style={{minHeight:'80px'}}>
                            <img src={require('@src/assets/images/daily/crown.png').default} draggable={false}/>
                        </div>
                        <div className="gradient-indent-8 mt-2">
                            <span className="super-headline1-light"> {state.crown} </span>
                        </div>
                    </Col>
                    <Col className="earning-btn text-center">
                        <div className='cover d-flex align-items-center justify-content-center' style={{minHeight:'80px'}}>
                            <img src={require('@src/assets/images/daily/cards.png').default} draggable={false}/>
                        </div>
                        <div className="gradient-indent-8 mt-2">
                            <span className="super-headline1-light"> {state.cards} </span>
                        </div>
                    </Col>
                    <Col className="earning-btn text-center">
                        <div className='cover d-flex align-items-center justify-content-center' style={{minHeight:'80px'}}>
                            <img src={require('@src/assets/images/daily/gold.png').default} draggable={false}/>
                        </div>
                        <div className="gradient-indent-8 mt-2">
                            <span className="super-headline1-light"> {state.gold} </span>
                        </div>
                    </Col>
                </Row>
            </Modal>
            <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} size='lg' className='daily-modal'>
                <div style={{cursor:'pointer'}} className="close-button" onClick={() => setIsOpen(!isOpen)}>
                    <img draggable="false" src={require('@src/assets/images/daily/cancel.png').default} draggable={false}/>
                </div>
                <ModalBody style={{background:'transparent'}}>
                    <div className="bg"/>
                    <div className="left-side">
                        <div className="d-flex justify-content-center">
                            <div className='game-button'> Extras </div>
                        </div>
                        <div className="earning-btn">
                            <div className='cover'>
                                <img src={require('@src/assets/images/daily/kub.png').default} draggable={false}/>
                            </div>
                            <div className="gradient-indent-8">
                                <img className='locks' src={require('@src/assets/images/daily/lock.png').default} draggable={false}/>
                                <span className="super-headline1-light"> +1 card </span>
                            </div>
                        </div>
                        <div className="earning-btn">
                            <div className='cover'>
                                <img src={require('@src/assets/images/daily/egypt-precious.png').default} draggable={false}/>
                            </div>
                            <div className="gradient-indent-8">
                                <img className='locks' src={require('@src/assets/images/daily/lock.png').default} draggable={false}/>
                                <span className="super-headline1-light"> +1 card </span>
                            </div>
                        </div>
                        <div className="earning-btn">
                            <div className='cover'>
                                <img src={require('@src/assets/images/daily/facebook.png').default} draggable={false}/>
                            </div>
                            <div className="gradient-indent-8">
                                <img className='locks' src={require('@src/assets/images/daily/lock.png').default} draggable={false}/>
                                <span className="super-headline1-light"> 50.00 </span>
                            </div>
                        </div>
                    </div>
                    <div className="middle-side">
                        <div className="d-flex align-items-center justify-content-center flex-column">
                            <div className="scroll-text"> Uncover Upto 7 Cards For the Mega Bonus! </div>
                            <div className='daily-cards'>
                                {
                                    range(1, 14).map((item, key) => (
                                        <div className='daily-card' key={key} onClick={() => openCard(item)}>
                                            <img src={require('@src/assets/images/daily/card.png').default} draggable={false}/>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='reward-background'>
                                <div className='position-absolute'>
                                <div className='reward-button'>
                                    <span className='super-headline1-light' style={{fontSize:'45px', textTransform:'unset'}}> Collect Reward Now  </span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="d-flex justify-content-center">
                            <div className='game-button'> Rewards </div>
                        </div>
                        <div className="earning-btn">
                            <div className='cover'>
                                <img src={require('@src/assets/images/daily/crown.png').default} draggable={false}/>
                            </div>
                            <div className="gradient-indent-8">
                                <span className="super-headline1-light"> {state.crown} </span>
                            </div>
                        </div>
                        <div className="earning-btn">
                            <div className='cover'>
                                <img src={require('@src/assets/images/daily/cards.png').default} draggable={false}/>
                            </div>
                            <div className="gradient-indent-8">
                                <span className="super-headline1-light"> {state.cards} </span>
                            </div>
                        </div>
                        <div className="earning-btn">
                            <div className='cover'>
                                <img src={require('@src/assets/images/daily/gold.png').default} draggable={false}/>
                            </div>
                            <div className="gradient-indent-8">
                                <span className="super-headline1-light"> {state.gold} </span>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>         
        </Fragment>
    )
}

export default DaliyBounsModal