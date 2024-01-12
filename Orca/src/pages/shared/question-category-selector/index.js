import { useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import FolderTree from './Tree'

export default function QuestionCategoryDialog({ catalogId, onClose, onNodeSelected, excludedId = 0 }) {
  const [nodeId, setNodeId] = useState(null)

  const handleNodeSelected = nodeId => {
    setNodeId(nodeId)
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleOk = () => {
    if (onNodeSelected) {
      onNodeSelected(nodeId)
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Chọn Danh mục Câu hỏi</DialogTitle>
      <DialogContent>
        <div style={{ padding: 5, width: 360, minHeight: 200 }}>
          <FolderTree catalogId={catalogId} excludedId={excludedId} onNodeSelected={handleNodeSelected} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy bỏ</Button>
        <Button variant='contained' disabled={nodeId == null} onClick={handleOk} color='primary'>
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  )
}
