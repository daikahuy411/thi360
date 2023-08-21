// ** React Imports
import { Fragment, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Icon Imports
import Icon from '@core/components/icon'
// ** Custom Components Imports
import CustomAvatar from '@core/components/mui/avatar'
// ** MUI Imports
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MuiMenu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 350,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: '30rem'
})

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: '30rem', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

const ShortcutsDropdown = props => {
  // ** Props
  const { shortcuts, settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hook
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Icon icon='mdi:view-grid-outline' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontSize: '1.125rem', color: 'text.secondary', fontWeight: 600 }}>
              Chương trình
            </Typography>
            {/* <Tooltip title='Add Shortcut' placement='top'>
              <IconButton disableRipple>
                <Icon icon='mdi:plus-circle-outline' />
              </IconButton>
            </Tooltip> */}
          </Box>
        </MenuItem>
        <Divider sx={{ my: '0 !important' }} />
        <Grid
          container
          spacing={0}
          sx={{
            '& .MuiGrid-root': {
              borderBottom: theme => `1px solid ${theme.palette.divider}`,
              '&:nth-of-type(odd)': { borderRight: theme => `1px solid ${theme.palette.divider}` }
            }
          }}
        >
          {shortcuts.map(shortcut => (
            <Grid
              item
              xs={6}
              key={shortcut.title}
              onClick={handleDropdownClose}
              sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
            >
              <Box
                component={Link}
                href={shortcut.url}
                sx={{
                  p: 4,
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  textDecoration: 'none',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{shortcut.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Menu>
    </Fragment>
  )
}

export default ShortcutsDropdown
