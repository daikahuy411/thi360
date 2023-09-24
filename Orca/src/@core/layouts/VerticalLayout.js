// ** React Imports
import { useState } from 'react'

// ** Theme Config Import
import themeConfig from 'configs/themeConfig'

import Customizer from '@core/components/customizer'
// ** Icon Imports
import Icon from '@core/components/icon'
import ScrollToTop from '@core/components/scroll-to-top'
import Box from '@mui/material/Box'
// ** MUI Imports
import Fab from '@mui/material/Fab'
import { styled } from '@mui/material/styles'

import Footer from './components/shared-components/footer'
// ** Components
import AppBar from './components/vertical/appBar'
// import Navigation from './components/vertical/navigation'
import Navigation from './components/navigation'
import VerticalAppBarContent from 'layouts/components/vertical/AppBarContent'

const VerticalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex'
})

const MainContentWrapper = styled(Box)({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
})

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const VerticalLayout = props => {
  // ** Props
  const { hidden, settings, children, scrollToTop, footerProps, contentHeightFixed, verticalLayoutProps } = props

  // ** Vars
  const { skin, navHidden, contentWidth } = settings
  const { navigationSize, disableCustomizer, collapsedNavigationSize } = themeConfig
  const navWidth = navigationSize
  const navigationBorderWidth = skin === 'bordered' ? 1 : 0
  const collapsedNavWidth = collapsedNavigationSize

  // ** States
  const [navVisible, setNavVisible] = useState(false)

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible)

  return (
    <>
      <VerticalLayoutWrapper className='layout-wrapper layout-content-navbar'>
        {navHidden && !(navHidden && settings.lastLayout === 'horizontal') ? null : (
          <Navigation
          />
        )}
        <MainContentWrapper
          className='layout-content-wrapper layout-page'
          sx={{ ...(contentHeightFixed && { maxHeight: '100vh' }) }}
        >
          <VerticalAppBarContent />
          <br/>
          <ContentWrapper
            className='layout-page-content'
            sx={{
              ...(contentHeightFixed && {
                overflow: 'hidden',
                '& > :first-of-type': { height: '100%' }
              }),
              ...(contentWidth === 'boxed' && {
                mx: 'auto',
                '@media (min-width:1440px)': { maxWidth: 1440 },
                '@media (min-width:1200px)': { maxWidth: '100%' }
              })
            }}
            style={{ paddingTop: 0 }}
          >
            {/* <AppBar
              toggleNavVisibility={toggleNavVisibility}
              appBarContent={verticalLayoutProps.appBar?.content}
              appBarProps={verticalLayoutProps.appBar?.componentProps}
              {...props}
            /> */}
            {children}
          </ContentWrapper>

          <Footer footerStyles={footerProps?.sx} footerContent={footerProps?.content} {...props} />
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {disableCustomizer || hidden ? null : <Customizer />}

      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top'>
            <Icon icon='mdi:arrow-up' />
          </Fab>
        </ScrollToTop>
      )}
    </>
  )
}

export default VerticalLayout
