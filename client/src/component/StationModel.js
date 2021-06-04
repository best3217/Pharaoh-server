import { Fragment, useEffect, useState } from 'react'
import { Modal, ModalBody, Row, Col, Progress } from 'reactstrap'

const cards = [
    {
        type: "easy",
        description: "Do 15 spins in total"
    }
]

const StationModal = ({setIsOpen, isOpen}) => {
    const [state, setState] = useState({
        activeStations: ["easy", "normal"],
        activePlayingCard: "easy"
    })
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const handleSubmit = (type) => {
        const stations = state.activeStations
        if (state.activeStations.filter(item => item === type).length === 0) {
            stations.push(type)
            setState({...state, activeStations: stations})
        }
    }
    return (
        <Fragment>
            <Modal isOpen={isOpen} toggle={toggle} size='lg' className='station-modal'>
                <div style={{cursor:'pointer'}} className="close-button" onClick={toggle}>
                    <img src={require('@src/assets/images/daily/cancel.png').default} draggable={false}/>
                </div>
                <ModalBody style={{background:'transparent'}}>
                    <div className="bg"/>
                    <div className='position-relative station'>
                        <Row>
                            <Col className="p-0">
                                <div className={`station-card ${state.activeStations.filter(item => item === "normal").length > 0 ? "unlocked" : "locked" } card-1`}>
                                    <div className="station-info">
                                        {
                                            state.activeStations.filter(item => item === "normal").length > 0 ? <Fragment>
                                                <Progress className="station-progress" value='25'>25%</Progress>
                                                <div className="image">
                                                    <img src={require('@src/assets/images/station/station-image.png').default} />
                                                </div>
                                                <p className="station-description">Win 3.200.00 in total</p>
                                                <div className="difficult-type">
                                                    <p className="d-flex align-items-center h-100">NORMAL</p>
                                                </div>
                                            </Fragment> : null
                                        }
                                    </div>
                                    <div className="station-button" onClick={() => handleSubmit("normal")}>
                                        <p className="d-flex align-items-center h-100">{state.activePlayingCard === "normal" ? "CONTINUE" : state.activeStations.filter(item => item === "normal").length > 0 ? "START" : "30"}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col className="p-0">
                                <div className={`station-card ${state.activeStations.filter(item => item === "hard").length > 0 ? "unlocked" : "locked" } card-2`}>
                                    <div className="station-info">
                                        {
                                            state.activeStations.filter(item => item === "hard").length > 0 ? <Fragment>
                                                <Progress className="station-progress" value='25'>25%</Progress>
                                                <div className="image">
                                                    <img src={require('@src/assets/images/station/station-image.png').default} />
                                                </div>
                                                <p className="station-description">Win 3.200.00 in total</p>
                                                <div className="difficult-type">
                                                    <p className="d-flex align-items-center h-100">HARD</p>
                                                </div>
                                            </Fragment> : null
                                        }
                                    </div>
                                    <div className="station-button" onClick={() => handleSubmit("hard")}>
                                        <p className="d-flex align-items-center h-100">{state.activePlayingCard === "hard" ? "CONTINUE" : state.activeStations.filter(item => item === "hard").length > 0 ? "START" : "30"}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col className="p-0">
                                <div className={`station-card ${state.activeStations.filter(item => item === "easy").length > 0 ? "unlocked" : "locked" } card-3`}>
                                    <div className="station-info">
                                        {
                                            state.activeStations.filter(item => item === "easy").length > 0 ? <Fragment>
                                                <Progress className="station-progress" value='25'>25%</Progress>
                                                <div className="image">
                                                    <img src={require('@src/assets/images/station/station-image.png').default} />
                                                </div>
                                                <p className="station-description">Win 3.200.00 in total</p>
                                                <div className="difficult-type">
                                                    <p className="d-flex align-items-center h-100">EASY</p>
                                                </div>
                                            </Fragment> : null
                                        }
                                    </div>
                                    <div className="station-button" onClick={() => handleSubmit("easy")}>
                                        <p className="d-flex align-items-center h-100">{state.activePlayingCard === "easy" ? "CONTINUE" : state.activeStations.filter(item => item === "easy").length > 0 ? "START" : "30"}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col className="p-0">
                                <div className={`station-card ${state.activeStations.filter(item => item === "extreme").length > 0 ? "unlocked" : "locked" } card-4`}>
                                    <div className="station-info">
                                        {
                                            state.activeStations.filter(item => item === "extreme").length > 0 ? <Fragment>
                                                <Progress className="station-progress" value='25'>25%</Progress>
                                                <div className="image">
                                                    <img src={require('@src/assets/images/station/station-image.png').default} />
                                                </div>
                                                <p className="station-description">Win 3.200.00 in total</p>
                                                <div className="difficult-type">
                                                    <p className="d-flex align-items-center h-100">EXTREME</p>
                                                </div>
                                            </Fragment> : null
                                        }
                                    </div>
                                    <div className="station-button" onClick={() => handleSubmit("extreme")}>
                                        <p className="d-flex align-items-center h-100">{state.activePlayingCard === "extreme" ? "CONTINUE" : state.activeStations.filter(item => item === "extreme").length > 0 ? "START" : "30"}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </ModalBody>
            </Modal>         
        </Fragment>
    )
}

export default StationModal