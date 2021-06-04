import classnames from 'classnames'
import { Link, useHistory } from 'react-router-dom'

const Tabs = [
  {title: 'Trading Cards', link: '/cards', icon: require('@src/assets/images/tabIcon/tranding_cards.png').default},
  {title: 'pyramids path', link: '/kingspath', icon: require('@src/assets/images/tabIcon/pyramids_path.png').default},
  {title: 'Friends & Teams', link: '/teams', icon: require('@src/assets/images/tabIcon/friends_teams.png').default},
  {title: 'Royal League', link: '/league', icon: require('@src/assets/images/tabIcon/royal_league.png').default},
  {title: 'Tourneys', link: '/tournament', icon: require('@src/assets/images/tabIcon/tourneys.png').default},
  {title: 'Achievements', link: '/achievements', icon: require('@src/assets/images/tabIcon/achievements.png').default},
  {title: 'Egypt', link: '/loyalty', icon: require('@src/assets/images/tabIcon/egypt.png').default},
  {title: 'Shop', link: '/shop', icon: require('@src/assets/images/tabIcon/shops.png').default}
]

const HorizontalMenu = () => {
  const history = useHistory()
  return (
    <div id="menu-container" className="container-fluid">
      <div id="menu-row" className="row">
        {
          Tabs.map((item, key) => (
            <div key={key} className={classnames('menu-item col', {
                'menu-item-active': item.link === history.location.pathname
              })}>
              <Link to={item.link} className="link-container">
                <div className="icon">
                  <img draggable="false" src={item.icon}/>
                </div>
                <div className="banner-text">
                  <span>{item.title}</span>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
      <div id="deco-row" className="row"></div>
    </div>
  )
}

export default HorizontalMenu
