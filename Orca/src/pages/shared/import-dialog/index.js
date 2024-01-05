import { useState } from 'react'

import LoadingSpinner from '@core/components/loading-spinner'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import Uploader from '../uploader'

export default function ImportDialog({ onClose }) {
  const [loading, setLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const onUploaded = response => {
    setUploadedFile(response)
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Import</DialogTitle>
      <DialogContent>
        <LoadingSpinner active={loading} minHeight={0}>
          <div style={{ padding: 5 }}>
            <Uploader onUploaded={onUploaded} />
          </div>
        </LoadingSpinner>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy bỏ</Button>
        <Button disabled={!uploadedFile} variant='contained' color='primary'>
          Tiến hành Import
        </Button>
      </DialogActions>
    </Dialog>
  )
}
