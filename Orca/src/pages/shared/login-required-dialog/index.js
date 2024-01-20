import * as React from 'react'
import { forwardRef } from 'react'

import NavLink from 'next/link'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function LoginRequiredDialog({ onClose, returnUrl }) {
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog
      open={true}
      keepMounted
      onClose={() => handleClose()}
      TransitionComponent={Transition}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          Vui lòng đăng nhập hoặc đăng ký để tiếp tục
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <NavLink href={returnUrl ? `/login?returnUrl=${returnUrl}` : `/login`}>
          <Button>Đăng nhập/ Đăng ký</Button>
        </NavLink>
      </DialogActions>
    </Dialog>
  )
}
