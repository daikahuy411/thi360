import React, { useEffect, useState } from 'react'

import TestGroupApi from 'api/test-group-api'
import { makeStyles } from 'tss-react/mui'

import Icon from '@core/components/icon'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const useStyles = makeStyles()(theme => {
  return {
    list: {
      width: 450
    },
    fullList: {
      width: 'auto'
    }
  }
})

export default function TestGroupSelector({ onClose, onNodeSelected = null }) {
  const { classes, cx } = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // const [selectedData, setSelectedData] = useState()
  const [selectedValue, setSelectedValue] = React.useState(null)

  const handleChange = event => {
    setSelectedValue(parseInt(event.target.value))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // const toggleDrawer = (anchor, open) => event => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return
  //   }

  //   setState({ ...state, [anchor]: open })
  // }

  // const handleSelectAll = event => {
  //   const selected = event.target.checked ? data.map(t => t.id) : []
  //   setSelectedData(selected)
  //   if (event.target.checked) {
  //     var newSelected = selectedUsers
  //     newSelected.push(...data)
  //     setSelectedUsers(newSelected)
  //   } else {
  //     setSelectedUsers([])
  //   }
  // }

  // const handleSelectOne = (event, user) => {
  //   const id = user.id
  //   const selectedIndex = selectedData.indexOf(id)
  //   let newSelectedData = []
  //   if (selectedIndex === -1) {
  //     newSelectedData = newSelectedData.concat(selectedData, id)
  //   } else if (selectedIndex === 0) {
  //     newSelectedData = newSelectedData.concat(selectedData.slice(1))
  //   } else if (selectedIndex === selectedData.length - 1) {
  //     newSelectedData = newSelectedData.concat(selectedData.slice(0, -1))
  //   } else if (selectedIndex > 0) {
  //     newSelectedData = newSelectedData.concat(
  //       selectedData.slice(0, selectedIndex),
  //       selectedData.slice(selectedIndex + 1)
  //     )
  //   }
  //   setSelectedData(newSelectedData)

  //   var newSelectedUsers = selectedUsers
  //   if (selectedIndex === -1) {
  //     newSelectedUsers.push(user)
  //   } else {
  //     newSelectedUsers = newSelectedUsers.filter(x => x.id != id)
  //   }
  //   setSelectedUsers(newSelectedUsers)
  // }

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage])

  const fetchData = () => {
    new TestGroupApi().searches({ page: page + 1, limit: rowsPerPage }).then(response => {
      if (response.data.isSuccess) {
        setData(response.data.value)
        setTotalItem(response.data.totalItems)
      }
    })
  }

  const onOk = () => {
    if (selectedValue) {
      onNodeSelected(selectedValue)
      onClose()
    }
  }

  return (
    <Drawer onClose={onClose} anchor={'right'} open={true}>
      <div
        style={{
          width: 680
        }}
      >
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(3.5, 5),
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            marginBottom: 2
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            Chọn Bộ đề thi
          </Typography>
          <IconButton
            onClick={() => onClose()}
            sx={{
              right: 20,
              top: '50%',
              position: 'absolute',
              color: 'text.secondary',
              transform: 'translateY(-50%)'
            }}
          >
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>

        <Grid container>
          <Grid item md={4}>
            <IconButton aria-label='filter'>
              <FilterAltOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item md={4}>
            <TextField fullWidth placeholder='Tìm kiếm' size='small' />
          </Grid>
          <Grid item md={4} alignContent={'right'} alignItems={'right'}>
            <Button
              disabled={selectedValue ? false : true}
              color='primary'
              style={{ float: 'right' }}
              type='submit'
              variant='contained'
              onClick={() => {
                if (onOk) {
                  onOk()
                  onClose()
                }
              }}
            >
              Chọn
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <TableContainer component={Paper} style={{ marginTop: 5 }}>
              <Table sx={{}} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 30 }}>STT </TableCell>
                    <TableCell style={{ width: 60 }}>Chọn</TableCell>
                    <TableCell>Tên</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data.map((item, index) => (
                      <TableRow
                        key={item.name}
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Radio
                            checked={selectedValue === item.id}
                            onChange={handleChange}
                            value={item.id}
                            name='radio-buttons'
                            inputProps={{ 'aria-label': 'A' }}
                          />
                        </TableCell>
                        <TableCell>
                          {item.name} - {item.id}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage={'Hiển thị:'}
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={totalItem}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </div>
    </Drawer>
  )
}
