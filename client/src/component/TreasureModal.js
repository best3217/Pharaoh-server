import { Fragment, useEffect, useState } from 'react'
import { Modal, ModalBody, Row, Col } from 'reactstrap'

const TreasureModal = ({setIsOpen, isOpen}) => {
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <Fragment>
            <Modal isOpen={isOpen} toggle={toggle} size='lg' className='treasure-modal'>
                <div style={{cursor:'pointer'}} className="close-button" onClick={toggle}>
                    <img draggable="false" src={require('@src/assets/images/daily/cancel.png').default} draggable={false}/>
                </div>
                <ModalBody style={{background:'transparent'}}>
                    <div className="bg"/>
                </ModalBody>
            </Modal>         
        </Fragment>
    )
}

export default TreasureModal