// ** React Imports
import { useState } from 'react'

// import format from 'date-fns/format'
import moment from 'moment'

import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

const emails = ['username@gmail.com', 'user02@gmail.com']

const EntityInfoModal = ({ entity }) => {

  // ** States
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(emails[1])
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const handleClose = value => {
    setOpen(false)
    setSelectedValue(value)
  }

  // const createdTime = entity.createdTime !== null ? format(entity.createdTime, 'MM/dd/yyyy') : ''

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(!open)
        }}
        aria-label='delete'
      >
        <HelpOutlineIcon />
      </IconButton>
      <Dialog onClose={handleDialogClose} aria-labelledby='simple-dialog-title' open={open}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
            <TableBody>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Ngày tạo
                </TableCell>
                <TableCell style={{ width: 160 }} align='right'>
                  {moment(entity.createdTime).format('DD/MM/YYYY hh:mm') }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Người tạo
                </TableCell>
                <TableCell style={{ width: 160 }} align='right'>
                  {entity.createdByName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Sửa gần nhất
                </TableCell>
                <TableCell style={{ width: 160 }} align='right'>
                {moment(entity.lastModifiedTime).format('DD/MM/YYYY hh:mm') }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </>
  )
}

export default EntityInfoModal
