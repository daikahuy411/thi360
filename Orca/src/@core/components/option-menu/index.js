// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Icon Imports
import Icon from '@core/components/icon'
// ** Hook Import
import { useSettings } from '@core/hooks/useSettings'
// ** MUI Imports
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const MenuItemWrapper = ({ children, option }) => {
  if (option.href) {
    return (
      <Box
        component={Link}
        href={option.href}
        {...option.linkProps}
        sx={{
          px: 4,
          py: 1.5,
          width: '100%',
          display: 'flex',
          color: 'inherit',
          alignItems: 'center',
          textDecoration: 'none'
        }}
      >
        {children}
      </Box>
    )
  } else {
    return <>{children}</>
  }
}

const OptionsMenu = props => {
  // ** Props
  const { icon, options, menuProps, iconProps, leftAlignMenu, iconButtonProps } = props

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hook & Var
  const { settings } = useSettings()
  const { direction } = settings

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton aria-haspopup='true' onClick={handleClick} {...iconButtonProps}>
        {icon ? icon : <Icon icon='mdi:dots-vertical' {...iconProps} />}
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        {...(!leftAlignMenu && {
          anchorOrigin: { vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' },
          transformOrigin: { vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }
        })}
        {...menuProps}
      >
        {options.map((option, index) => {
          if (typeof option === 'string') {
            return (
              <MenuItem key={index} onClick={handleClose}>
                {option}
              </MenuItem>
            )
          } else if ('divider' in option) {
            return option.divider && <Divider key={index} {...option.dividerProps} />
          } else {
            return (
              <MenuItem
                key={index}
                {...option.menuItemProps}
                {...(option.href && { sx: { p: 0 } })}
                onClick={e => {
                  handleClose()
                  option.menuItemProps && option.menuItemProps.onClick ? option.menuItemProps.onClick(e) : null
                }}
              >
                <MenuItemWrapper option={option}>
                  {option.icon ? option.icon : null}
                  {option.text}
                </MenuItemWrapper>
              </MenuItem>
            )
          }
        })}
      </Menu>
    </>
  )
}

export default OptionsMenu
