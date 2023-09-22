import Link from 'next/link'

// ** Icon Imports
import Icon from '@core/components/icon'
import NotificationDropdown from '@core/layouts/components/shared-components/NotificationDropdown'
import UserDropdown from '@core/layouts/components/shared-components/UserDropdown'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

const notifications = [
  {
    meta: 'Today',
    avatarAlt: 'Flora',
    title: 'Congratulation Flora! 🎉',
    avatarImg: '/images/avatars/4.png',
    subtitle: 'Won the monthly best seller badge'
  },
  {
    meta: 'Yesterday',
    avatarColor: 'primary',
    subtitle: '5 hours ago',
    avatarText: 'Robert Austin',
    title: 'New user registered.'
  },
  {
    meta: '11 Aug',
    avatarAlt: 'message',
    title: 'New message received 👋🏻',
    avatarImg: '/images/avatars/5.png',
    subtitle: 'You have 10 unread messages'
  },
  {
    meta: '25 May',
    title: 'Paypal',
    avatarAlt: 'paypal',
    subtitle: 'Received Payment',
    avatarImg: '/images/misc/paypal.png'
  },
  {
    meta: '19 Mar',
    avatarAlt: 'order',
    title: 'Received Order 📦',
    avatarImg: '/images/avatars/3.png',
    subtitle: 'New order received from John'
  },
  {
    meta: '27 Dec',
    avatarAlt: 'chart',
    subtitle: '25 hrs ago',
    avatarImg: '/images/misc/chart.png',
    title: 'Finance report has been generated'
  }
]

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
        &nbsp;
        {/* <IconButton>
          <MenuOpenIcon />
        </IconButton> */}
        &nbsp;
        <Typography
          sx={{
            //styleName: 24 semibold;
            fontFamily: 'Be Vietnam Pro',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '36px',
            letterSpacing: '0em',
            textAlign: 'left'
          }}
        >
          Chương trình
        </Typography>
        {/* <Autocomplete hidden={hidden} settings={settings} /> */}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        <ModeToggler settings={settings} saveSettings={saveSettings} />*/}
        {/* <ShortcutsDropdown settings={settings} shortcuts={shortcuts} /> */}
        {/* <ProgramSelectors /> */}
        &nbsp;
        <Button
          component={Link}
          sx={{
            // width: '135px',
            // height: '48px',
            // top: '30px',
            // left: '974px',
            // borderRadius: '8px',
            color: '#fff',
            backgroundColor: '#9B51E0',
            textDecoration: 'none',
            marginRight: '1em',
            ':hover': {
              backgroundColor: '#9B51E0',
              opacity: '0.7'
            }
          }}
          href='/pricing'
        >
          Bảng giá
        </Button>
        <NotificationDropdown settings={settings} notifications={notifications} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
