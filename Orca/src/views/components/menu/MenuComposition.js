// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** Hook Import
import { useSettings } from '@core/hooks/useSettings'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
// ** MUI Imports
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'

const MenuComposition = () => {
  // ** States
  const [open, setOpen] = useState(false)

  // ** Hook & Var
  const { settings } = useSettings()
  const { skin } = settings

  // ** Ref
  const anchorRef = useRef(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <div>
      <Button
        ref={anchorRef}
        variant='outlined'
        aria-haspopup='true'
        onClick={handleToggle}
        id='composition-button'
        aria-expanded={open ? 'true' : undefined}
        aria-controls={open ? 'composition-menu' : undefined}
        sx={{ '& + div': { zIndex: theme => theme.zIndex.modal } }}
      >
        Open Menu
      </Button>
      <Popper
        transition
        open={open}
        disablePortal
        role={undefined}
        placement='bottom-start'
        anchorEl={anchorRef.current}
        popperOptions={{
          modifiers: [
            {
              name: 'flip',
              options: {
                enabled: true,
                boundary: 'window'
              }
            }
          ]
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}
          >
            <Paper
              elevation={skin === 'bordered' ? 0 : 3}
              sx={skin === 'bordered' ? { border: theme => `1px solid ${theme.palette.divider}` } : {}}
            >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList autoFocusItem={open} id='composition-menu' onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default MenuComposition
