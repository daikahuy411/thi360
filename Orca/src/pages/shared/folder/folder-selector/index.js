import { useState } from 'react'

import LoadingSpinner from '@core/components/loading-spinner'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import FolderTree from './Tree'

export default function FolderSelectorDiaglog({ folderType, onClose, onSave, excludedId = 0 }) {
  const [loading, setLoading] = useState(false)
  const [nodeId, setNodeId] = useState(null)
  const [hasChanged, setHasChanged] = useState(false)

  const handleNodeSelected = nodeId => {
    setNodeId(nodeId)
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const save = () => {
    if (onSave) {
      onSave(nodeId)
    }
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Chọn thư mục</DialogTitle>
      <DialogContent>
        <LoadingSpinner active={loading} minHeight={0}>
          <div style={{ padding: 5, width: 360, minHeight: 200 }}>
            <FolderTree type={folderType} excludedId={excludedId} onNodeSelected={handleNodeSelected} />
          </div>
        </LoadingSpinner>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy bỏ</Button>
        <Button variant='contained' disabled={nodeId == null} onClick={save} color='primary'>
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  )
}
