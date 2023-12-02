import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import LoadingSpinner from '@core/components/loading-spinner'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import Uploader from '../uploader'

export default function ImportDialog({ onClose }) {
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Import</DialogTitle>
      <DialogContent>
        <LoadingSpinner active={loading} minHeight={0}>
          <div style={{ padding: 5 }}>
            <Uploader />
          </div>
        </LoadingSpinner>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy bỏ</Button>
        <Button variant='contained' color='primary'>
          Tiến hành Import
        </Button>
      </DialogActions>
    </Dialog>
  )
}
