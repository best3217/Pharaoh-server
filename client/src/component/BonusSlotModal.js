
import { Fragment, useEffect, useRef, useState } from 'react'
import { Modal, ModalBody, Row, Col } from 'reactstrap'
import { TweenLite, Elastic } from "gsap"
import jwtDefaultConfig from '../@core/auth/jwt/jwtDefaultConfig'
import * as PIXI from 'pixi.js'
import useJwt from '@src/auth/jwt/useJwt'
import { formatNumber } from '@store/actions/init'

const BonusSlotModal = ({setIsOpen, isOpen}) => {
    const [state, setstate] = useState({
        bonusData: []
    })
    const WIDTH = 1300
    const HEIGHT = 700

    const loader = PIXI.Loader.shared
    const slotContainer = new PIXI.Container()
    const Application = PIXI.Application,
            resources = loader.resources,
            Sprite = PIXI.Sprite

    const app = new Application({
        width: WIDTH,
        height: HEIGHT,
        transparent: true,
        autoResize: false
    })
    
    /*eslint-disable */
    const toggle = async () => {
        setIsOpen(!isOpen)
        // destroyAll()
    }

    const destroyAll = () => {
        setstate({...state, destroyAll:true})
        while (app.stage.children[0]) {
            app.stage.children[0].destroy(true)
        }
        while (slotContainer.children[0]) {
            slotContainer.children[0].destroy(true)
        }
        app.loader.reset()
        app.loader.destroy(true)
        // app.ticker.destroy(true)
        app.stage.destroy(true)
        slotContainer.destroy(true)
        loader.destroy
        loader.destroy(true)
        const contextIds = ["bitmaprenderer", "2d", "webgl", "webg2"]
        for (let i = 0; i < contextIds.length; i++) {
            let gl = app.view.getContext(contextIds[i])
            if (gl) {
                const buf = gl.createBuffer()
                gl.bindBuffer(gl.ARRAY_BUFFER, buf)
                const numAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)
                for (let attrib = 0; attrib < numAttributes; ++attrib) {
                    gl.vertexAttribPointer(attrib, 1, gl.FLOAT, false, 0, 0)
                }
                const numTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)
                for (let unit = 0; unit < numTextureUnits; ++unit) {
                    gl.activeTexture(gl.TEXTURE0 + unit)
                    gl.bindTexture(gl.TEXTURE_2D, null)
                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null)
                }
                gl.canvas.width = 1
                gl.canvas.height = 1
                let ext = gl.getExtension("WEBGL_lose_context")
                if (ext) {
                    ext.loseContext()
                }
            }
        }
        app.destroy(true)
        PIXI.utils.clearTextureCache()
        PIXI.utils.destroyTextureCache()
    }
    

    const inintBounus = () => {
        setstate({bonusData: []})
        const pixiContainer = document.getElementById("pixi-bonus-slot")
        if (!pixiContainer) {
            // console.log("no container. close")
            return 
        }
        const this_canvas = pixiContainer.getElementsByTagName("canvas")[0]
        if (this_canvas) {
            // console.log("map already created. close")
            return 
        } else {
            let baseSpeed = 60,
                currentSpeed = [],
                runSlot = [],
                slotIsReady = false,
                slotIsRunning = false,
                apiCollectabls,
                icon_space_x = 284,
                icon_width = 240,
                icon_height = 300,
                stopSlot = [false, false, false],
                default_position_x = 354,
                default_position_y = 435 - icon_height * 2,
                slotHeight,
                startSpeedUp = [],
                startSpeedDown = [],
                speedUpBy = 1,
                speedDownBy = 0.5,
                stopRange = calculatestopRange(baseSpeed),
                frameSeconds = 0,
                disableClick = false,
                automaticStopDate = ""
    
            function calculatestopRange(value) {
                let result = 0
                for (let i = speedDownBy; i <= value; i = i + speedDownBy) {
                    result = result + i
                }
                return result
            }
    
            let counterEndDate
            if (state.spinEndDate) {
              counterEndDate = new Date(state.spinEndDate)
            }
    
            //Sprites
            let bonus_button,
                bonus_button_small = [],
                borders = [],
                border1,
                isFinished = false
            
            const url_map = `${jwtDefaultConfig.Domain}/bonus/map.jpg`
            const url_diamond = `${jwtDefaultConfig.Domain}/bonus/diamond.jpg`
            const url_castle = `${jwtDefaultConfig.Domain}/bonus/castle.jpg`
            const url_crown = `${jwtDefaultConfig.Domain}/bonus/crown.jpg`
            const url_dragon = `${jwtDefaultConfig.Domain}/bonus/dragon.jpg`
            const url_king = `${jwtDefaultConfig.Domain}/bonus/king.jpg`
            const url_league = `${jwtDefaultConfig.Domain}/bonus/medal.jpg`
            const url_princess = `${jwtDefaultConfig.Domain}/bonus/princess.jpg`
            const url_prince = `${jwtDefaultConfig.Domain}/bonus/prince.jpg`
            const url_queen = `${jwtDefaultConfig.Domain}/bonus/queen.jpg`
            const url_flag = `${jwtDefaultConfig.Domain}/bonus/flag.jpg`
            const url_treasure = `${jwtDefaultConfig.Domain}/bonus/treasure.jpg`
            const url_mask = `${jwtDefaultConfig.Domain}/bonus/mask.png`
            const url_border1 = `${jwtDefaultConfig.Domain}/bonus/frame@3x.png`
            const url_border2 = `${jwtDefaultConfig.Domain}/bonus/eingeloggtCopy@3x.png`
            const url_button_green1 = `${jwtDefaultConfig.Domain}/bonus/green-normal@3x.png`
            const url_button_green2 = `${jwtDefaultConfig.Domain}/bonus/green-blink@3x.png`
            const url_button_green_click = `${jwtDefaultConfig.Domain}/bonus/green-click@3x.png`
            const url_button_red1 = `${jwtDefaultConfig.Domain}/bonus/red-normal@3x.png`
            const url_button_red2 = `${jwtDefaultConfig.Domain}/bonus/red-blink@3x.png`
            const url_button_red_click = `${jwtDefaultConfig.Domain}/bonus/red-click@3x.png`
            const url_button_small_red1 = `${jwtDefaultConfig.Domain}/bonus/red-normal-small@3x.png`
            const url_button_small_red2 = `${jwtDefaultConfig.Domain}/bonus/red-blink-small@3x.png`
            const url_button_small_red_click = `${jwtDefaultConfig.Domain}/bonus/red-click-small@3x.png`
            const url_button_grey = `${jwtDefaultConfig.Domain}/bonus/grey-normal@3x.png`
    
            //all URLs
            const urls = [
                url_mask,
                url_border1,
                url_border2,
                url_map,
                url_diamond,
                url_castle,
                url_crown,
                url_dragon,
                url_king,
                url_league,
                url_princess,
                url_prince,
                url_queen,
                url_flag,
                url_treasure,
                url_button_green1,
                url_button_green2,
                url_button_green_click,
                url_button_red1,
                url_button_red2,
                url_button_red_click,
                url_button_small_red1,
                url_button_small_red2,
                url_button_small_red_click,
                url_button_grey
            ]
    
            //icon URLs
            const urls_icons = [
                [url_crown, "CROWN"],
                [url_map, "MAP"],
                [url_diamond, "DIAMOND"],
                [url_flag, "FLAG"],
                [url_castle, "CASTLE"],
                [url_league, "MEDAL"],
                [url_dragon, "DRAGON"],
                [url_treasure, "TREASURE"],
                [url_prince, "PRINCE"],
                [url_princess, "PRINCESS"],
                [url_queen, "QUEEN"],
                [url_king, "KING"]
            ]
    
            slotHeight = urls_icons.length * icon_height
    
            //contains all icon sprites
            let icons = []
    
            //containers
            const container = document.getElementById("pixi-bonus-slot")
            
            app.view.id = "pixi-bonus-slot-canvas"
            container.appendChild(app.view)
    
            const setup = () => {
                createSprites()
                animateButton()
                animateSmallButtons()
                app.ticker.fps = 60
                app.ticker.add(delta => gameLoop(delta))
                fadeInSlots()
            }
    
            const reset = callback => {
                for (let i = 0; i < icons.length; i++) {
                    currentSpeed[i] = 0
                    borders[i].alpha = 0
                    runSlot[i] = false
                    startSpeedUp[i] = true
                    startSpeedDown[i] = false
                }
                stopSlot = [false, false, false]
                slotIsRunning = false
                callback()
            }
    
            const playTestJackpot = slot => {
                play(slot)
            }
    
            //run slot after click button
            const play = slot => {
                if (!slotIsReady) {
                    return
                }
                if (disableClick) {
                    return
                }
                if (slotIsRunning) {
                    if (slot!==0&&slot!==1&&slot!==2) {
                        stopSlot = [true, true, true]
                        bonus_button_small[0].alpha = 0
                        bonus_button_small[0].interactive = false
                        bonus_button_small[0].buttonMode = false
                        bonus_button_small[1].alpha = 0
                        bonus_button_small[1].interactive = false
                        bonus_button_small[1].buttonMode = false
                        bonus_button_small[2].alpha = 0
                        bonus_button_small[2].interactive = false
                        bonus_button_small[2].buttonMode = false
                        bonus_button.clicked = true
                        resetRemainingTime()
                    } else {
                        stopSlot[slot] = true
                        if (bonus_button_small[slot]) {
                            bonus_button_small[slot].alpha = 0
                            bonus_button_small[slot].interactive = false
                            bonus_button_small[slot].buttonMode = false
                        }
                        resetRemainingTime()
                    }
                    return
                }
                if (counterEndDate !== undefined && countdown() !== undefined && counterEndDate.getTime() > 0) {
                    return
                }
                reset(() => {
                    slotIsRunning = true
                    fetchData()
                    activateSlots()
                    resetRemainingTime()
                })
            }
    
            //set automatic stop in 10seconds
            const resetRemainingTime = () => {
                automaticStopDate = new Date()
                automaticStopDate.setSeconds(automaticStopDate.getSeconds() + 10)
                automaticStopDate = automaticStopDate.getTime()
            }
    
            //Update text of button based on current state
            const updateButton = delta => {
                //animate buttons
                frameSeconds += (1 / 60) * delta
                if (frameSeconds >= 0.5) {
                    frameSeconds = 0
                    animateButton()
                    animateSmallButtons()
                }
    
                //change to red button
                if (slotIsRunning) {
                    bonus_button.interactive = true
                    bonus_button.buttonMode = true
                    if (bonus_button.name !== url_button_red1 && bonus_button.name !== url_button_red2) {
                        setButtonTexture(url_button_red1)
                    }
                    return
                }
                //change to grey waiting button
                if (isFinished) {
                    bonus_button.interactive = false
                    bonus_button.buttonMode = false
                    setButtonTexture(url_button_grey)
                    return
                }
    
                //change to green button
                bonus_button.interactive = true
                bonus_button.buttonMode = true
                if (bonus_button.name !== url_button_green1 && bonus_button.name !== url_button_green2) {
                    setButtonTexture(url_button_green1)
                }
            }
    
            const animateButton = () => {
                switch (bonus_button.name) {
                    case url_button_red1:
                        setButtonTexture(url_button_red2)
                        break
                    case url_button_red2:
                        setButtonTexture(url_button_red1)
                        break
                    case url_button_green1:
                        setButtonTexture(url_button_green2)
                        break
                    case url_button_green2:
                        setButtonTexture(url_button_green1)
                        break
                    default:
                        setButtonTexture(url_button_green1)
                }
            }
    
            const animateSmallButtons = () => {
                const ratio = 3.8
                for (let i = 0; i < bonus_button_small.length; i++) {
                    if (bonus_button_small[i].name === url_button_small_red2 || !slotIsRunning) {
                        bonus_button_small[i].texture =
                            resources[url_button_small_red1].texture
                        bonus_button_small[i].name = url_button_small_red1
                        bonus_button_small[i].height =
                            bonus_button_small[i].texture.height * ratio
                        bonus_button_small[i].width =
                            bonus_button_small[i].texture.width * ratio
                        bonus_button_small[i].y = 435
                    } else {
                        bonus_button_small[i].texture =
                            resources[url_button_small_red2].texture
                        bonus_button_small[i].name = url_button_small_red2
                        bonus_button_small[i].height =
                            bonus_button_small[i].texture.height * ratio
                        bonus_button_small[i].width =
                            bonus_button_small[i].texture.width * ratio
    
                        bonus_button_small[i].y = 430
                    }
                }
            }
    
            //countdown for next available spin
            const countdown = () => {
                const now = new Date()
                const distance = counterEndDate.getTime() - now.getTime()
                if (distance < 0) {
                    return
                }
                // Time calculations
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                minutes = ("0" + minutes).substr(-2, 2)
                return hours + ":" + minutes
            }
    
            //activate slots and delay start
            const activateSlots = () => {
                disableClick = true
                setTimeout(() => {
                    bonus_button_small[0].interactive = true
                    bonus_button_small[0].buttonMode = true
                }, 250)
    
                setTimeout(() => {
                    bonus_button_small[1].interactive = true
                    bonus_button_small[1].buttonMode = true
                }, 500)
    
                setTimeout(() => {
                    bonus_button_small[2].interactive = true
                    bonus_button_small[2].buttonMode = true
                    disableClick = false
                }, 750)
    
                setTimeout(() => {
                    runSlot[0] = true
                }, 0)
                setTimeout(() => {
                    runSlot[1] = true
                }, 250)
                setTimeout(() => {
                    runSlot[2] = true
                }, 500)
            }
    
            const handleSlot = (slot, index) => {
                let icon_count = slot.length
                for (let j = 0; j < icon_count; j++) {
                    slot[j].y += currentSpeed[index] //move
                    slot[j].y = slot[j].y % slotHeight //loop if reached end
                }
    
                //speed up when slot begins
                if (startSpeedUp[index] === true) {
                    currentSpeed[index] = currentSpeed[index] + speedUpBy
                    if (currentSpeed[index] === baseSpeed) {
                        startSpeedUp[index] = false
                    }
                    return
                }
    
                //speed down when slot ends
                if (startSpeedDown[index] === true) {
                    currentSpeed[index] = currentSpeed[index] - speedDownBy
                    if (currentSpeed[index] === 0) {
                        runSlot[index] = false
                        borders[index].alpha = 1
                        bounceSlot(index)
    
                        let isTime = false
                        if (apiCollectabls[index].image === "DIAMOND") {
                            isTime = true
                        }
    
                        let allFinished = false
                        if (currentSpeed[0] === 0 && currentSpeed[1] === 0 && currentSpeed[2] === 0) {
                            allFinished = true
                        }
                        if(allFinished){
                            isFinished = true
                            setstate({bonusData: apiCollectabls})
                            useJwt
                                .saveSlots(apiCollectabls)
                                .then(res => {
                                    console.log(res)
                                })
                        }
                    }
                    return
                }
    
                //automatic stop after x seconds
                const now = new Date().getTime()
                if (now > automaticStopDate) {
                    stopSlot = [true, true, true]
                    bonus_button_small[0].alpha = 0
                    bonus_button_small[0].interactive = false
                    bonus_button_small[0].buttonMode = false
                    bonus_button_small[1].alpha = 0
                    bonus_button_small[1].interactive = false
                    bonus_button_small[1].buttonMode = false
                    bonus_button_small[2].alpha = 0
                    bonus_button_small[2].interactive = false
                    bonus_button_small[2].buttonMode = false
                }
    
                //find target
                if (stopSlot[index] && apiCollectabls !== undefined) {
                    let target_icon = apiCollectabls[index].image
                    let targetPosition = default_position_y + icon_height * 2
                    let beginStopAt = slotHeight + ((targetPosition - stopRange) % slotHeight)
    
                    for (let j = 0; j < icon_count; j++) {
                        if (slot[j].name === target_icon) {
                            if (slot[j].y === beginStopAt) {
                                startSpeedDown[index] = true
                                break
                            }
                        }
                    }
                }
            }
    
            //slot animation
            const animateSlot = () => {
                if (runSlot[0]) {
                    handleSlot(icons[0], 0)
                }
                if (runSlot[1]) {
                    handleSlot(icons[1], 1)
                }
                if (runSlot[2]) {
                    handleSlot(icons[2], 2)
                }
            }
    
            const gameLoop = delta => {
                updateButton(delta)
                let running = false
                for (let i = 0; i < runSlot.length; i++) {
                    if (runSlot[i] === true) {
                        running = true
                        break
                    }
                }
                slotIsRunning = running
                if (slotIsRunning) {
                    animateSlot()
                }
                if (state.testSuperWin || state.testNormalWin || state.testNormalWin2) {
                    playTestJackpot()
                }
            }
    
            const fetchData = () => {
                useJwt
                    .loadSlots()
                    .then(res => {
                        cofigurateForRun(res.data.data)
                    })
            }
    
            const cofigurateForRun = res => {
                // let waitSeconds = 0
                // waitSeconds = res.status.next_collect.remaining_secs
                // slotIsRunning = false
                // counterEndDate = new Date()
                // counterEndDate.setSeconds(counterEndDate.getSeconds() + waitSeconds)
                apiCollectabls = res
            }
    
            const setButtonTexture = texture_url => {
                const ratio = 3
                bonus_button.texture = resources[texture_url].texture
                bonus_button.name = texture_url
                bonus_button.height = bonus_button.texture.height * ratio
                bonus_button.width = bonus_button.texture.width * ratio
                bonus_button.x = 802
    
                if (texture_url === url_button_red2) {
                    bonus_button.y = 456
                } else {
                    bonus_button.y = 454
                }
            }
    
            const fadeInSlots = () => {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < icons[i].length; j++) {
                        TweenLite.fromTo(
                            icons[i][j],
                            1, {
                                alpha: 0
                            }, {
                                alpha: 1
                            },
                            0
                        )
                        TweenLite.fromTo(
                            icons[i][j].position,
                            1, {
                                y: "-=20"
                            }, {
                                y: "+=20",
                                onComplete: () => slotIsReady = true
                            }, 0)
                    }
                }
            }
    
            const bounceSlot = index => {
                for (let j = 0; j < icons[index].length; j++) {
                    TweenLite.fromTo(
                        icons[index][j].position,
                        1, {
                            y: "+=10"
                        }, {
                            y: "-=10",
                            ease: Elastic.easeOut
                        },
                        0
                    )
                }
            }
    
    
            const createSprites = () => {
                let sprite_obj
                const ratio = 1.315
    
                slotContainer.zIndex = 20
                slotContainer.x = 0
                slotContainer.y = 160
                slotContainer.vx = 0
                slotContainer.vy = 0
                app.stage.addChild(slotContainer)
    
                //button big
                sprite_obj = new Sprite(resources[url_button_green1].texture)
                sprite_obj.name = url_button_green1
                sprite_obj.height = sprite_obj.texture.height * ratio
                sprite_obj.width = sprite_obj.texture.width * ratio
                sprite_obj.zIndex = 30
                sprite_obj.clicked = false
                sprite_obj.interactive = true
                sprite_obj.buttonMode = true
                sprite_obj.anchor.set(1, 1)
                sprite_obj.on("mousedown", play)
                sprite_obj.on("touchstart", play)
                slotContainer.addChild(sprite_obj)
                bonus_button = sprite_obj
    
                //small stop button 1
                const space_small_buttons = 282
                sprite_obj = new Sprite(resources[url_button_small_red1].texture)
                sprite_obj.name = url_button_small_red1
                sprite_obj.x = 236
                sprite_obj.zIndex = 60
                sprite_obj.on("mousedown", () => play(0))
                sprite_obj.on("touchstart", () => play(0))
                app.stage.addChild(sprite_obj)
                bonus_button_small[0] = sprite_obj
    
                //small stop button 2
                sprite_obj = new Sprite(resources[url_button_small_red1].texture)
                sprite_obj.name = url_button_small_red1
                sprite_obj.x = bonus_button_small[0].x + space_small_buttons
                sprite_obj.y = 520
                sprite_obj.zIndex = 60
                sprite_obj.on("mousedown", () => play(1))
                sprite_obj.on("touchstart", () => play(1))
                app.stage.addChild(sprite_obj)
                bonus_button_small[1] = sprite_obj
    
                //small stop button 3
                sprite_obj = new Sprite(resources[url_button_small_red1].texture)
                sprite_obj.name = url_button_small_red1
                sprite_obj.x = bonus_button_small[1].x + space_small_buttons
                sprite_obj.y = 520
                sprite_obj.zIndex = 60
                sprite_obj.on("mousedown", () => play(2))
                sprite_obj.on("touchstart", () => play(2))
                app.stage.addChild(sprite_obj)
                bonus_button_small[2] = sprite_obj
    
                for (let i = 0; i < 3; i++) {
                    currentSpeed[i] = baseSpeed
                    const space_between = 284
                    //Border blue
                    sprite_obj = new Sprite(resources[url_border1].texture)
                    sprite_obj.name = "border1"
                    sprite_obj.height = 324
                    sprite_obj.width = 260
                    sprite_obj.x = 354 + space_between * i
                    sprite_obj.y = 453
                    sprite_obj.zIndex = 38
                    sprite_obj.anchor.set(0.5, 1)
                    app.stage.addChild(sprite_obj)
                    border1 = sprite_obj
    
                    //Border gold
                    sprite_obj = new Sprite(resources[url_border2].texture)
                    sprite_obj.name = "border2"
                    sprite_obj.height = border1.height
                    sprite_obj.width = border1.width
                    sprite_obj.x = border1.x
                    sprite_obj.y = border1.y
                    sprite_obj.zIndex = border1.zIndex
                    sprite_obj.anchor.set(0.5, 1)
                    sprite_obj.alpha = 0
                    app.stage.addChild(sprite_obj)
                    borders[i] = sprite_obj
    
                    //MASK Sprite
                    sprite_obj = new Sprite(resources[url_mask].texture)
                    sprite_obj.name = "mask"
                    sprite_obj.height = border1.height * 0.99
                    sprite_obj.width = border1.width * 0.99
                    sprite_obj.x = border1.x
                    sprite_obj.y = border1.y
                    sprite_obj.vx = 0
                    sprite_obj.vy = 0
                    sprite_obj.zIndex = 34
                    sprite_obj.anchor.set(0.5, 1)
                    app.stage.addChild(sprite_obj)
                    let myMask = sprite_obj
    
                    icons[i] = []
                    for (let j = 0; j < urls_icons.length; j++) {
                        sprite_obj = new Sprite(resources[urls_icons[j][0]].texture)
                        sprite_obj.name = urls_icons[j][1]
                        sprite_obj.x = default_position_x + icon_space_x * i
                        sprite_obj.y = default_position_y + icon_height * j
                        sprite_obj.width = icon_width
                        sprite_obj.height = icon_height
                        sprite_obj.zIndex = 35
                        sprite_obj.anchor.set(0.5, 1)
                        sprite_obj.mask = myMask
                        icons[i].push(sprite_obj)
                        app.stage.addChild(sprite_obj)
                    }
                }
                const updateLayersOrder = () => {
                    app.stage.children.sort(function (a, b) {
                        a.zIndex = a.zIndex || 0
                        b.zIndex = b.zIndex || 0
                        return a.zIndex - b.zIndex
                    })
                }
                updateLayersOrder()
            }
    
            if (Object.keys(loader.resources).length == 0) {
                loader.add(urls).load(() => {
                    setup()
                })
            } else {
                setup()
            }
        }
    }
    

    useEffect(() => {
        setTimeout(() => {
            inintBounus()
        }, 50)
    },[isOpen])
    /*eslint-disable */

    const renterCurrency = (e) => {
        switch (e) {
            case "CURRENCY_GOLD":
                return <img src={require('@src/assets/images/daily/gold.png').default}/>
            case "CURRENCY_CROWN":
                return <img src={require('@src/assets/images/daily/crown.png').default}/>
            case "CARDS":
                return <img src={require('@src/assets/images/daily/cards.png').default}/>
        }
    }
    return (
        <Fragment>
            <Modal isOpen={isOpen} toggle={toggle} size='lg' className='bonus-slot-modal'>
                <div style={{cursor:'pointer'}} className="close-button" onClick={toggle}>
                    <img src={require('@src/assets/images/daily/cancel.png').default} draggable={false}/>
                </div>
                <ModalBody style={{background:'transparent'}}>
                    <div className="bg"/>
                    <div className='position-relative' style={{marginTop:'120px', marginLeft:'-10px'}}>
                        <div className='position-absolute amount-cover'>
                            {state.bonusData.map((item, key)=>(
                                <div key={key} className={`amount-${key}`}> 
                                    <div className='amount'>
                                        {renterCurrency(item.type)}&nbsp;
                                        {formatNumber(item.amount)} 
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id="pixi-bonus-slot"/>
                    </div>
                </ModalBody>
            </Modal>         
        </Fragment>
    )
}

export default BonusSlotModal