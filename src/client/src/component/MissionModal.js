import { Fragment, useEffect, useState } from 'react'
import { Modal, ModalBody, Row, Col } from 'reactstrap'

const MissionModal = ({setIsOpen, isOpen}) => {
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <Fragment>
            <Modal isOpen={isOpen} toggle={toggle} size='lg' className='mission-modal'>
                <div style={{cursor:'pointer'}} className="close-button" onClick={toggle}>
                    <img src={require('@src/assets/images/daily/cancel.png').default} draggable={false}/>
                </div>
                <ModalBody style={{background:'transparent'}}>
                    <div className="bg"/>
                    <div className='position-relative mission'>
                        <div className='left-side'>
                            <Row className='m-0'>
                                <Col className='p-0 mr-2'>
                                    <img className='w-100' src={require('@src/assets/images/mission/mission-cover.png').default} draggable={false}/>
                                    <div className='number'> 1 </div>
                                    <div className='position-absolute w-100' style={{top:0}}>
                                        <div className='d-flex w-100 mt-4 justify-content-center align-items-center p-2' style={{minHeight:'150px'}}>
                                            <img src={require('@src/assets/images/mission/mission1.png').default} draggable={false}/>
                                        </div>
                                        <div className='pl-3 pr-3'>
                                            <div className='mission-title'> Find Two Cards </div>
                                            <div className='white-bold text-center'>  </div>
                                        </div>
                                    </div>
                                    <div className='m-progress'>
                                        <div className="mprogress-bar">
                                            <div className="mprogress-fill" style={{width:`${0.4 * 100}%`}}></div>
                                        </div>
                                        <div className='m-number'>10%</div>
                                    </div>
                                </Col>
                                <Col className='p-0 mr-2'>
                                    <img className='w-100' src={require('@src/assets/images/mission/mission-cover.png').default} draggable={false}/>
                                    <div className='number'> 2 </div>
                                    <div className='position-absolute w-100' style={{top:0}}>
                                        <div className='d-flex w-100 mt-4 justify-content-center align-items-center p-2' style={{minHeight:'150px'}}>
                                            <img src={require('@src/assets/images/mission/mission2.png').default} draggable={false}/>
                                        </div>
                                        <div className='pl-3 pr-3'>
                                            <div className='mission-title'> Tournament </div>
                                            <div className='white-bold text-center'> Reach rank 105 or higher in a  tournament </div>
                                        </div>
                                    </div>
                                    <div className='m-progress'>
                                        <div className="mprogress-bar">
                                            <div className="mprogress-fill" style={{width:`${0.4 * 100}%`}}></div>
                                        </div>
                                        <div className='m-number'>10%</div>
                                    </div>
                                </Col>
                                <Col className='p-0 mr-2'>
                                    <div className='number'> 3 </div>
                                    <img className='w-100' src={require('@src/assets/images/mission/mission-cover.png').default} draggable={false}/>
                                    <div className='position-absolute w-100' style={{top:0}}>
                                        <div className='d-flex w-100 mt-4 justify-content-center align-items-center p-2' style={{minHeight:'150px'}}>
                                            <img src={require('@src/assets/images/mission/mission3.png').default} draggable={false}/>
                                        </div>
                                        <div className='pl-3 pr-3'>
                                            <div className='mission-title'> Mythic Maiden </div>
                                            <div className='white-bold text-center'> Win 4.000.000 Gold all at once </div>
                                        </div>
                                    </div>
                                    <div className='m-progress'>
                                        <div className="mprogress-bar">
                                            <div className="mprogress-fill" style={{width:`${0.4 * 100}%`}}></div>
                                        </div>
                                        <div className='m-number'>10%</div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='right-side'>
                            <div className="chest-covered"></div>
                        </div>
                        <div className='bottom-side'>
                            <div className="button-change-mission">
                                <Row className='align-items-center h-100 button-chlid'>
                                    <Col sm='8' className="text1"> new tasks </Col>
                                    <Col sm='4' className="pl-0">
                                        <div className="text2">20</div>
                                        <div className="crown-img">
                                            <img draggable="false" src={require('@src/assets/images/mission/crown.png').default}/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="button-active align-items-center">
                                <div className="button-active-text">Mission active</div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>         
        </Fragment>
    )
}

export default MissionModal

// import React, { Fragment, useEffect, useRef, useState } from 'react'
// import { Modal, ModalBody } from 'reactstrap'
// import { TweenLite, Elastic } from "gsap"
// import { Stage, Sprite, Container, Text, Graphics, useApp, AppProvider, AnimatedSprite, useTick } from '@inlet/react-pixi'
// import jwtDefaultConfig from '../@core/auth/jwt/jwtDefaultConfig'
// import { Application } from '@pixi/app'

// const url_map = `${jwtDefaultConfig.Domain}/bonus/map.jpg`
// const url_diamond = `${jwtDefaultConfig.Domain}/bonus/diamond.jpg`
// const url_castle = `${jwtDefaultConfig.Domain}/bonus/castle.jpg`
// const url_crown = `${jwtDefaultConfig.Domain}/bonus/crown.jpg`
// const url_dragon = `${jwtDefaultConfig.Domain}/bonus/dragon.jpg`
// const url_king = `${jwtDefaultConfig.Domain}/bonus/king.jpg`
// const url_league = `${jwtDefaultConfig.Domain}/bonus/medal.jpg`
// const url_princess = `${jwtDefaultConfig.Domain}/bonus/princess.jpg`
// const url_prince = `${jwtDefaultConfig.Domain}/bonus/prince.jpg`
// const url_queen = `${jwtDefaultConfig.Domain}/bonus/queen.jpg`
// const url_flag = `${jwtDefaultConfig.Domain}/bonus/flag.jpg`
// const url_treasure = `${jwtDefaultConfig.Domain}/bonus/treasure.jpg`
// const url_mask = `${jwtDefaultConfig.Domain}/bonus/mask.png`
// const url_border1 = `${jwtDefaultConfig.Domain}/bonus/frame@3x.png`
// const url_border2 = `${jwtDefaultConfig.Domain}/bonus/eingeloggtCopy@3x.png`
// const url_button_green1 = `${jwtDefaultConfig.Domain}/bonus/green-normal@3x.png`
// const url_button_green2 = `${jwtDefaultConfig.Domain}/bonus/green-blink@3x.png`
// const url_button_green_click = `${jwtDefaultConfig.Domain}/bonus/green-click@3x.png`
// const url_button_red1 = `${jwtDefaultConfig.Domain}/bonus/red-normal@3x.png`
// const url_button_red2 = `${jwtDefaultConfig.Domain}/bonus/red-blink@3x.png`
// const url_button_red_click = `${jwtDefaultConfig.Domain}/bonus/red-click@3x.png`
// const url_button_small_red1 = `${jwtDefaultConfig.Domain}/bonus/red-normal-small@3x.png`
// const url_button_small_red2 = `${jwtDefaultConfig.Domain}/bonus/red-blink-small@3x.png`
// const url_button_small_red_click = `${jwtDefaultConfig.Domain}/bonus/red-click-small@3x.png`
// const url_button_grey = `${jwtDefaultConfig.Domain}/bonus/grey-normal@3x.png`

// const urls = [
//     url_mask,
//     url_border1,
//     url_border2,
//     url_map,
//     url_diamond,
//     url_castle,
//     url_crown,
//     url_dragon,
//     url_king,
//     url_league,
//     url_princess,
//     url_prince,
//     url_queen,
//     url_flag,
//     url_treasure,
//     url_button_green1,
//     url_button_green2,
//     url_button_green_click,
//     url_button_red1,
//     url_button_red2,
//     url_button_red_click,
//     url_button_small_red1,
//     url_button_small_red2,
//     url_button_small_red_click,
//     url_button_grey
// ]

// const buttons = [
//     url_button_red1,
//     url_button_red2
// ]

// const urls_icons = [
//     [url_crown, "CROWN"],
//     [url_map, "MAP"],
//     [url_diamond, "DIAMOND"],
//     [url_flag, "FLAG"],
//     [url_castle, "CASTLE"],
//     [url_league, "MEDAL"],
//     [url_dragon, "DRAGON"],
//     [url_treasure, "TREASURE"],
//     [url_prince, "PRINCE"],
//     [url_princess, "PRINCESS"],
//     [url_queen, "QUEEN"],
//     [url_king, "KING"]
// ]

// const WIDTH = 1300
// const HEIGHT = 700
// const config = {
//     size: { width: WIDTH, height: HEIGHT },
//     spring: { mass: 10, tension: 1000, friction: 100 },
//     stage: { antialias: true, backgroundColor: 0x000000, backgroundAlpha:0 }
// }
// const space_between = 284

// const BonusSlotModal = ({setIsOpen, isOpen}) => {
//     /*eslint-disable */
//     // const app = useApp()
//     const app = new Application()
//     const [frames, setFrames] = useState([])
//     const [mask1, setMask1] = useState(null)
//     const [mask2, setMask2] = useState(null)
//     const [mask3, setMask3] = useState(null)

//     const toggle = async () => {
//         setIsOpen(!isOpen)
//     }
//     useEffect(() => {
//         if (isOpen) {
//             app.loader.add(urls).load((_, resource) => {
//                 setup()
//             })
//         }
//     },[isOpen])


//     const gameLoop = delta => {
//     }

//     const setup = () => {
//         app.ticker.fps = 60
//         app.ticker.add(delta => gameLoop(delta))
//     }

//     const play = () => {
//         console.log('=------------------')
//     }

//     const RotatingBunny = () => {
//         const [rotation, setRotation] = useState(0)
//         const buttons = [
//             url_button_green1,
//             url_button_green2,
//         ]
//         let frameSeconds = 0
//         useTick((delta) => {
//             frameSeconds += (1 / 60) * delta
//             if (frameSeconds >= 0.5) {
//                 setRotation(parseInt(delta%2))
//                 frameSeconds = 0
//             }
//         })
//         console.log(rotation)
//         return (
//             <Sprite image={buttons[rotation]} width={329} height={95} x={470} y={70} buttonMode interactive mousedown={() => play()} touchstart={() => play()}/>
//         );
//     };


//     /*eslint-disable */
    
//     return (
//         <Fragment>
//             <Modal isOpen={isOpen} toggle={toggle} size='lg' className='bonus-slot-modal'>
//                 <div style={{cursor:'pointer'}} className="close-button" onClick={toggle}>
//                     <img src={require('@src/assets/images/daily/cancel.png').default} draggable={false}/>
//                 </div>
//                 <ModalBody style={{background:'transparent'}}>
//                     <div className="bg"/>
//                     <div className='position-relative' style={{marginTop:'120px', marginLeft:'-10px'}}>
//                         <div id="pixi-bonus-slot">
//                             <AppProvider value={app}>
//                                 <Stage {...config.size} options={config.stage}>
//                                     <Container x={0} y={150}>
//                                         <Container x={200}>
//                                             {
//                                                 urls_icons.map((item, key)=>(
//                                                     <Container key={key}>
//                                                         <Sprite image={item[0]} width={260} height={324} mask={mask1}/>
//                                                     </Container>
//                                                 ))
//                                             }
//                                             <Sprite image={url_mask} width={260} height={324} ref={ref => setMask1(ref)}/>
//                                             <Sprite image={url_border1} width={270} height={330} x={-5} y={-5}/>
//                                             <Sprite image={url_border2} width={260} height={324}/>
//                                         </Container>
//                                         <Container x={505}>
//                                             <Sprite image={url_mask} width={260} height={324}/>
//                                             {
//                                                 urls_icons.map((item, key)=>(
//                                                     <Sprite key={key} image={item[0]} width={260} height={324} mask={mask2}/>
//                                                 ))
//                                             }
//                                             <Sprite image={url_mask} width={260} height={324} ref={ref => setMask2(ref)}/>
//                                             <Sprite image={url_border1} width={270} height={330} x={-5} y={-5}/>
//                                             <Sprite image={url_border2} width={260} height={324}/>
//                                         </Container>
//                                         <Container x={815}>
//                                             <Sprite image={url_mask} width={260} height={324}/>
//                                             {
//                                                 urls_icons.map((item, key)=>(
//                                                     <Sprite key={key} image={item[0]} width={260} height={324} mask={mask3}/>
//                                                 ))
//                                             }
//                                             <Sprite image={url_mask} width={260} height={324} ref={ref => setMask3(ref)}/>
//                                             <Sprite image={url_border1} width={270} height={330} x={-5} y={-5}/>
//                                             <Sprite image={url_border2} width={260} height={324}/>
//                                         </Container>
//                                     </Container>
//                                     <Container x={0} y={440}>
//                                         {/* {
//                                             frames&&
//                                             <AnimatedSprite
//                                                 animationSpeed={0.5}
//                                                 isPlaying={true}
//                                                 textures={frames}
//                                                 anchor={0.5}
//                                             />
//                                         } */}
//                                         <Sprite image={url_button_small_red1} width={189} height={55} x={235} buttonMode interactive mousedown={() => play()} touchstart={() => play()}/>
//                                         <Sprite image={url_button_small_red1} width={189} height={55} x={540} buttonMode interactive  mousedown={() => play()} touchstart={() => play()}/>
//                                         <Sprite image={url_button_small_red1} width={189} height={55} x={850} buttonMode interactive mousedown={() => play()} touchstart={() => play()}/>
                                        
//                                         <RotatingBunny/>
//                                     </Container>
//                                 </Stage>
//                             </AppProvider>
//                         </div>
//                     </div>
//                 </ModalBody>
//             </Modal>         
//         </Fragment>
//     )
// }

// export default BonusSlotModal
