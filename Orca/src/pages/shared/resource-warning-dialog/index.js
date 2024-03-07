import { forwardRef } from 'react'

import Link from 'next/link'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function ResourceWarningtDialog({ onClose }) {
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={true} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle>Thông báo</DialogTitle>
      <DialogContent>
        <p>Bạn đã dùng hết tài nguyên cho phép, vui lòng nâng cấp, đăng ký gói hoặc liên hệ với chúng tôi.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy bỏ</Button>
        <Button variant='contained' color='primary' component={Link} href='/pricing'>
          Nâng cấp
        </Button>
      </DialogActions>
    </Dialog>
  )
}
