// ** Config Imports
import 'configs/i18n'
// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'iconify-bundle/icons-bundle-react'
// ** Global css styles
import '../../styles/globals.css'
import '../../styles/main.scss'

// import '../../styles/test.css'
import { defaultACLObj } from 'configs/acl'
import themeConfig from 'configs/themeConfig'
// ** Contexts
import { AuthProvider } from 'context/AuthContext'
import Interceptor from 'context/interceptor'
import TestingLayout from 'layouts/testing'
// ** Component Imports
import UserLayout from 'layouts/UserLayout'
// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
// ** Loader Import
import NProgress from 'nprogress'
// ** Third Party Import
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
// ** Store Imports
import { store } from 'store'

import AclGuard from '@core/components/auth/AclGuard'
import AuthGuard from '@core/components/auth/AuthGuard'
import GuestGuard from '@core/components/auth/GuestGuard'
// ** Spinner Import
import Spinner from '@core/components/spinner'
import WindowWrapper from '@core/components/window-wrapper'
import { SettingsConsumer, SettingsProvider } from '@core/context/settingsContext'
// ** Styled Components
import ReactHotToast from '@core/styles/libs/react-hot-toast'
import ThemeComponent from '@core/theme/ThemeComponent'
// ** Utils Imports
import { createEmotionCache } from '@core/utils/create-emotion-cache'
// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false

  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined
  const authGuard = false // Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false
  const aclAbilities = Component.acl ?? defaultACLObj

  new Interceptor().initialize()

  return (
    <>
      {getLayout && getLayout().type.name === 'TestingLayout' && (
        <TestingLayout>
          <Component {...pageProps} />
        </TestingLayout>
      )}
      {(!Component.PageLayout || getLayout().type.name !== 'TestingLayout') && (
        <Provider store={store}>
          <CacheProvider value={emotionCache}>
            <Head>
              <title>{`${themeConfig.templateName} - `}</title>
              <meta name='description' content={`${themeConfig.templateName}.`} />
              <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
              <meta name='viewport' content='initial-scale=1, width=device-width' />
              {/* Theme default v1 */}

              <link rel="stylesheet" href="/themes/default/assets/vendor/fonts/materialdesignicons.css" />
              <link rel="stylesheet" href="/themes/default/assets/vendor/fonts/flag-icons.css" />
              <link rel="stylesheet" href="/themes/default/assets/vendor/libs/node-waves/node-waves.css" />

              <link href='/themes/default/assets/vendor/css/rtl/core.css' rel='stylesheet' />
              <link href='/themes/default/assets/vendor/css/rtl/theme-default.css' rel='stylesheet' />
              <link href='/themes/default/assets/css/demo.css' rel='stylesheet' />
              <link href='/themes/default/assets/css/style.css' rel='stylesheet' />

              <link rel="stylesheet" href="/themes/default/assets/vendor/libs/swiper/swiper.css" />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.css" />

              {/* <script src="/themes/default/assets/vendor/libs/jquery/jquery.js"></script>
              <script src="/themes/default/assets/vendor/libs/popper/popper.js"></script>
              <script src="/themes/default/assets/vendor/js/bootstrap.js"></script>
              <script src="/themes/default/assets/vendor/libs/node-waves/node-waves.js"></script>
              <script src="/themes/default/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
              <script src="/themes/default/assets/vendor/libs/hammer/hammer.js"></script>
              <script src="/themes/default/assets/vendor/libs/i18n/i18n.js"></script>
              <script src="/themes/default/assets/vendor/libs/typeahead-js/typeahead.js"></script>
              <script src="/themes/default/assets/vendor/js/menu.js"></script>
              <script src="/themes/default/assets/vendor/libs/apex-charts/apexcharts.js"></script>
              <script src="/themes/default/assets/vendor/libs/cleavejs/cleave.js"></script>
              <script src="/themes/default/assets/vendor/libs/cleavejs/cleave-phone.js"></script>
              <script src="/themes/default/assets/vendor/js/helpers.js"></script>
              <script src="/themes/default/assets/js/main.js"></script>
              <script src="/themes/default/assets/vendor/libs/swiper/swiper.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
              <script src="/themes/default/assets/js/config.js"></script>   */}

            </Head>
            <AuthProvider>
              <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
                <SettingsConsumer>
                  {({ settings }) => {
                    return (
                      <ThemeComponent settings={settings}>
                        <WindowWrapper>
                          <Guard authGuard={authGuard} guestGuard={guestGuard}>
                            <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
                              {getLayout(<Component {...pageProps} />)}
                            </AclGuard>
                          </Guard>
                        </WindowWrapper>
                        <ReactHotToast>
                          <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                        </ReactHotToast>
                      </ThemeComponent>
                    )
                  }}
                </SettingsConsumer>
              </SettingsProvider>
            </AuthProvider>
          </CacheProvider>
        </Provider>
      )}
    </>
  )
}

export default App
