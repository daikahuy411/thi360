import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

export default function ResourceWarningtDialog({ onClose }) {

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Tài nguyên sắp hết</DialogTitle>
      <DialogContent>
        <p>Bạn chưa đăng ký gói, vui lòng đăng ký</p>
        <p>Bạn đã dùng hết tài nguyên cho phép, vui lòng nâng cấp hoặc liên hệ với chúng tôi.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy bỏ</Button>
        <Button variant='contained' color='primary'>
          Nâng cấp
        </Button>
      </DialogActions>
    </Dialog>
  )
}
