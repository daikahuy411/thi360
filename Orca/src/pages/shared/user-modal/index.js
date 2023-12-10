import React, { useEffect, useState } from 'react'

import UserApi from 'api/user-api'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'

import Icon from '@core/components/icon'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  zIndex: theme.zIndex.modal,
  '& .MuiFormControlLabel-root': {
    marginRight: '0.6875rem'
  },
  '& .MuiDrawer-paper': {
    border: 0,
    zIndex: theme.zIndex.modal,
    boxShadow: theme.shadows[9]
  }
}))

function UserModal({ onClose, onOk }) {
  const router = useRouter()
  const { examId } = router.query
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [selectedData, setSelectedData] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [keyword, setKeyword] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const fetchData = () => {
    new UserApi()
      .searchesUserNotInExam({
        Page: page + 1,
        Limit: rowsPerPage,
        Keyword: keyword,
        ExamId: Number(examId),
        organizationId: 0
      })
      .then(response => {
        if (response.data.isSuccess) {
          setData(response.data.value)
          setTotalItem(response.data.totalItems)
        }
      })
  }

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage, keyword])

  const handleSelectAll = event => {
    const selected = event.target.checked ? data.map(t => t.id) : []
    setSelectedData(selected)
    if (event.target.checked) {
      var newSelected = selectedUsers
      newSelected.push(...data)
      setSelectedUsers(newSelected)
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectOne = (event, user) => {
    const id = user.id
    const selectedIndex = selectedData.indexOf(id)
    let newSelectedData = []
    if (selectedIndex === -1) {
      newSelectedData = newSelectedData.concat(selectedData, id)
    } else if (selectedIndex === 0) {
      newSelectedData = newSelectedData.concat(selectedData.slice(1))
    } else if (selectedIndex === selectedData.length - 1) {
      newSelectedData = newSelectedData.concat(selectedData.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelectedData = newSelectedData.concat(
        selectedData.slice(0, selectedIndex),
        selectedData.slice(selectedIndex + 1)
      )
    }
    setSelectedData(newSelectedData)

    var newSelectedUsers = selectedUsers
    if (selectedIndex === -1) {
      newSelectedUsers.push(user)
    } else {
      newSelectedUsers = newSelectedUsers.filter(x => x.id != id)
    }
    setSelectedUsers(newSelectedUsers)
  }

  return (
    <Drawer open={true} anchor='right' onClose={onClose} variant='temporary'>
      <>
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
            Người dùng
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
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          <Grid container>
            <Grid item md={4}>
              <IconButton aria-label='filter' style={{display: 'none'}}>
                <FilterAltOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item md={4}>
              <TextField fullWidth placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'  onChange={e => setKeyword(e.target.value)} size='small' />
            </Grid>
            <Grid item md={4} alignContent={'right'} alignItems={'right'}>
              <Button
                disabled={selectedData.length == 0}
                color='primary'
                style={{ float: 'right' }}
                type='submit'
                variant='contained'
                onClick={() => {
                  if (onOk) {
                    onOk(selectedUsers)
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
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={selectedData.length === data.length}
                          color='primary'
                          indeterminate={selectedData.length > 0 && selectedData.length < data.length}
                          onChange={handleSelectAll}
                          inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                      </TableCell>
                      <TableCell style={{ width: 120 }}>Tên đăng nhập</TableCell>
                      <TableCell style={{ width: 120 }}>Tên đầy đủ </TableCell>
                      <TableCell style={{ width: 120 }}>Giới tính</TableCell>
                      <TableCell style={{ width: 120 }}>Lớp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      data.map(item => (
                        <TableRow
                          key={item.id}
                          sx={{
                            '&:last-of-type td, &:last-of-type th': {
                              border: 0
                            }
                          }}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              checked={selectedData.indexOf(item.id) !== -1}
                              color='primary'
                              onChange={event => handleSelectOne(event, item)}
                              value={selectedData.indexOf(item.id) !== -1}
                            />
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {item.userName}
                          </TableCell>
                          <TableCell>{item.fullName}</TableCell>
                          <TableCell>{item.genderName}</TableCell>
                          <TableCell>{item.organizationName}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                labelRowsPerPage={'Hiển thị:'}
                rowsPerPageOptions={[20, 30, 50]}
                component='div'
                count={totalItem}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </>
    </Drawer>
  )
}

UserModal.propTypes = {
  onClose: PropTypes.func,
  onFilter: PropTypes.func,
  open: PropTypes.bool.isRequired
}

export default UserModal
