import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Tree from './Tree'
import { CatalogType } from 'src/types/CatalogType'

function CatalogDialog({ catalogType, open, onClose, excludedId = 0, onNodeSelected = null, acl = false }) {
  const [selectedNodeId, setSelectedNodeId] = useState(0)

  const handleSubmit = event => {
    event.preventDefault()
  }

  const handleNodeSelected = nodeId => {
    setSelectedNodeId(nodeId)
  }

  const onOk = () => {
    if (onNodeSelected) {
      onNodeSelected(selectedNodeId)
      onClose()
    }
  }

  return (
    <Drawer anchor='right' onClose={onClose} open={open} variant='temporary'>
      <form onSubmit={handleSubmit}>
        <div>
          <Button onClick={onClose} size='small'>
            <CloseIcon />
            Đóng
          </Button>
        </div>
        <div>
          <div>
            <Tree acl={acl} catalogType={catalogType} excludedId={excludedId} onNodeSelected={handleNodeSelected} autoLoad={true} />
          </div>
        </div>
        <div>
          <Button color='primary' fullWidth type='submit' variant='contained' onClick={onOk}>
            Chọn
          </Button>
        </div>
      </form>
    </Drawer>
  )
}

CatalogDialog.propTypes = {
  type: CatalogType,
  className: PropTypes.string,
  onClose: PropTypes.func,
  onFilter: PropTypes.func,
  open: PropTypes.bool.isRequired
}

export default CatalogDialog
