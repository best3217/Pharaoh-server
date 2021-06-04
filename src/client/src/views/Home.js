import { useEffect, useState } from 'react'
import {Row} from 'reactstrap'
import useJwt from '@src/auth/jwt/useJwt'
import GamePreviewItem from '../component/GamePreviewItem'
const Home = () => {
  const [games, setGames] = useState([])
  
  const loadGameList = () => {
    useJwt
    .loadGameList()
    .then(res => {
      if (res.data.status) {
        setGames(res.data.data)
      }
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {
    loadGameList()
  }, [])

  return (
    <div id='lobby-page'>
      <div id="lobby-content-container" className="container-fluid">
        <Row className='justify-content-center m-0'>
          {
            games.map((item, key) => (
              <GamePreviewItem key={key} item={item}/>
            ))
          }
        </Row>
      </div>
    </div>
  )
}

export default Home
