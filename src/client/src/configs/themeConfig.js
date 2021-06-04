const themeConfig = {
  app: {
    appName: 'Pharao´s world',
    appLogoImage: require('@src/assets/images/logo/logo.svg').default,
    token: 'pharoh-world'
  },
  layout: {
    isRTL: false,
    skin: 'light', // light, dark, bordered, semi-dark
    routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: 'horizontal', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: 'white' // BS color options [primary, success, etc]
    },
    footer: {
      type: 'static' // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true // Enable scroll to top button
  }
}

export default themeConfig
