import { useAuth } from 'hooks/useAuth'
import {
  helpLink,
  standAloneStudentLinks,
  studentLinks,
  systemLinks,
  teacherLinks
} from 'navigation'
import HorizontalNavItems from 'navigation/horizontal'

import { useSettings } from '@core/hooks/useSettings'
import Layout from '@core/layouts/Layout'
import useMediaQuery from '@mui/material/useMediaQuery'

import HorizontalAppBarContent from './components/horizontal/AppBarContent'
import VerticalAppBarContent from './components/vertical/AppBarContent'

const UserLayout = ({ children, contentHeightFixed }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const auth = useAuth()
  var links = auth.user && auth.user.tenantId != 0 ? studentLinks : standAloneStudentLinks

  if (auth.user && auth.user.roles.includes('Host')) {
    links = links.concat(teacherLinks)
    // systemLinks.push(helpLink)
    links = links.concat([...systemLinks, helpLink])
  } else {
    if (auth.user && auth.user.roles.includes('Teacher')) {
      // teacherLinks.push(helpLink)
      links = links.concat([...teacherLinks, helpLink])
    } else {
      links = [...links, helpLink]
    }
  }

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()
  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: links
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems()
            // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
            // navItems: horizontalMenuItems
          },
          appBar: {
            content: () => <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />
          }
        }
      })}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
