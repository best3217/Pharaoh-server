import { Row, Col } from "reactstrap"
import Iframe from 'react-iframe'
import { useHistory } from "react-router"

const GamePlay = ({location}) => {
  return (
    <div id="slot-page">
      <main>
        <div id="game-container" className="container-fluid" style={{marginTop:'100px'}}>
          <Row className="game-row w-100 mx-auto">
            {/* <Col className="jackpot-col p-0">
              <item-slot-jackpot-top-menu jackpot="jackpot" index="index" jackpot-status="jackpot.user_settings.status"/>
            </Col>
            <Col className="jackpot-col p-0 text-white">
              <item-filler-last-winner/>
              <item-filler-loyalty/>
              <item-filler-shop/>
              <item-filler-achievement />
            </Col>
            <Col className="jackpot-col p-0 text-white">
              <item-filler-last-winner/>
              <item-filler-loyalty/>
              <item-filler-shop/>
              <item-filler-achievement />
            </Col> */}

            <Col className="menu-col h-100">
              {/* <menu-jackpot jackpots="casinoJackpots"/>
              <menu-kingspath />
              <menu-tournament/>
              <menu-battle/> */}
            </Col>
            <Col className="game-col p-0 h-100">
              {/* <Spinner className='mr-25' size='lg' /> */}
              <div id="i-frame-container" className="iframe-container">
                <div className="i-frame-border golden-border">
                  <Iframe
                    width='800px'
                    height='600px'
                    id="game-frame"
                    name="slotContent"
                    className=" game-iframe"
                    src={location.state.url}
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="allowfullscreen"
                    allow="autoplay"
                  ></Iframe>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </main>
      {/* <modal-choose-jackpot jackpots="slotJackpotsAsc" handle-set-min-bet="setMinBet"/> */}
      {/* <NetentPopup/> */}
    </div>
  )
}

export default GamePlay
