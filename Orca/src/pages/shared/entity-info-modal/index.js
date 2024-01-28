// ** React Imports
import { useState } from 'react'

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
import Typography from '@mui/material/Typography'

const EntityInfoModal = ({ entity }) => {
  // ** States
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

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
                <TableCell style={{ width: 180 }} component='th' scope='row'>
                  <Typography variant='body1'> Ngày tạo</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body1'>{moment(entity.createdTime).format('DD-MM-YYYY HH:mm')}</Typography>
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell style={{ width: 180 }} component='th' scope='row'>
                  <Typography variant='body1'> Người tạo</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body1'>{entity.createdByName}</Typography>
                </TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell style={{ width: 180 }} component='th' scope='row'>
                  <Typography variant='body1'> Sửa gần nhất</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body1'>{moment(entity.lastModifiedTime).format('DD-MM-YYYY HH:mm')}</Typography>
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
