// ** React Imports
import { Fragment, useEffect, useState } from 'react'

import UserApi from 'api/user-api'
import authConfig from 'configs/auth'
// ** Context
import { useAuth } from 'hooks/useAuth'
// ** Next Import
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectedProfile, selectProfile } from 'store/slices/profileSlice'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from '@core/components/icon'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
// ** MUI Imports
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.light,
  // backgroundColor: '#9B51E0',

  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = props => {
  // ** Props
  const { settings } = props
  const dispatch = useDispatch()

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [userData, setUserData] = useState()
  const currentClass = useSelector(selectedProfile)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()

  // ** Vars
  const { direction } = settings

  useEffect(() => {
    const userInfo = window.localStorage.getItem(authConfig.storageUserDataKeyName)
    console.log('userInfo', JSON.parse(userInfo))
    setUserData(JSON.parse(userInfo))
    if (!currentClass) {
      me()
    }
  }, [currentClass])

  const me = () => {
    new UserApi()
      .me()
      .then(response => {
        const data = response.data
        dispatch(selectProfile(data))
      })
      .catch(e => {
        console.log(e)
      })
  }

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer', marginRight: '1rem' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={currentClass?.pictureUrl ? currentClass.pictureUrl : '/images/avatars/default1.png'}
        />
      </Badge>
      <Box display='inline-block' width='134px'>
        <Typography
          sx={{
            //styleName: 20 semibold;
            fontFamily: 'Be Vietnam Pro',
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '30px',
            letterSpacing: '0em',
            textAlign: 'start'
          }}
        >
          {currentClass?.fullName}
        </Typography>
        <Typography
          sx={{
            //styleName: 20 semibold;
            fontFamily: 'Be Vietnam Pro',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '24px',
            letterSpacing: '0em',
            textAlign: 'start'
          }}
        >
          {currentClass?.organizationId}
        </Typography>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar
                alt='John Doe'
                src={currentClass?.pictureUrl ? currentClass.pictureUrl : '/images/avatars/default1.png'}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{currentClass?.fullName}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {currentClass?.userName}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/apps/user-profile/profile')}>
          <Box sx={styles}>
            <Icon icon='mdi:account-outline' />
            Thông tin
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/apps/account-settings/account')}>
          <Box sx={styles}>
            <Icon icon='mdi:cog-outline' />
            Cấu hình
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
        >
          <Icon icon='mdi:logout-variant' />
          Thoát
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
