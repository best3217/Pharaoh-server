import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import FooterComponent from './components/footer'
import NavbarComponent from './components/navbar'
import SidebarComponent from './components/menu/horizontal-menu'
import DaliyBounsModal from '../../component/DaliyBounsModal'

const HorizontalLayout = props => {
  const { children } = props
  const history = useHistory()
  const [isMounted, setIsMounted] = useState(false)
  const [navbarScrolled, setNavbarScrolled] = useState(false)

  const cleanup = () => {
    setIsMounted(false)
    setNavbarScrolled(false)
  }

  useEffect(() => {
    setIsMounted(true)
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 65 && navbarScrolled === false) {
        setNavbarScrolled(true)
      }
      if (window.pageYOffset < 65) {
        setNavbarScrolled(false)
      }
    })
    return () => cleanup()
  }, [])


  if (!isMounted) {
    return null
  }

  return (
    <div className='game'>
      <div className='game-layout'>
        <header className='game-header'>
          <NavbarComponent/>
        </header>
        <main className="site-space">
          <DaliyBounsModal/>
          {
            history.location.pathname !== "/play" &&
            <SidebarComponent/>
          }
          <div className='game-content container-fluid'>
            {children}
          </div>
        </main>
        <footer className='footer'>
          <FooterComponent />
        </footer>
      </div>
    </div>
  )
}
export default HorizontalLayout
