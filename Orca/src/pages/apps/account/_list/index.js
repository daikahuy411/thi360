import { useEffect, useState } from 'react'

import UserApi from 'api/user-api'
import moment from 'moment'
import Link from 'next/link'
import Draggable from 'react-draggable'
import toast from 'react-hot-toast'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import EditIcon from '@mui/icons-material/Edit'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const UserTable = () => {
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage, keyword])

  const fetchData = () => {
    const param = {
      keyword: keyword,
      organizationId: 0,
      page: page == 0 ? 1 : page + 1,
      limit: rowsPerPage
    }
    new UserApi().searches(param).then(response => {
      setData(response.data.value)
      setTotalItem(response.data.totalItems)
    })
  }

  /*
   * handle checkbox
   */
  const [selected, setSelected] = useState([])
  const isSelected = name => selected.indexOf(name) !== -1

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.id)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }
  /*
   * end handle checkbox
   */

  /*
   * handle remove user
   */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (selected.length > 0) {
      new UserApi()
        .deleteMultiple(selected)
        .then(response => {
          setOpenDelete(false)
          if (response.data.isSuccess) {
            toast.success('Xóa dữ liệu thành công.')
            fetchData()
            setSelected([])
          }
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }
  /*
   * end handle remove user
   */

  return (
    <>
      <Divider />
      <Toolbar style={{ padding: 0 }}>
        <Typography sx={{ flex: '1 1 100%' }} variant='h5' id='tableTitle' component='div'>
          {totalItem} Người dùng
        </Typography>
        &nbsp; &nbsp;
        <Tooltip title='Import'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='mdi:upload' />
          </IconButton>
        </Tooltip>
        &nbsp; &nbsp;
        <Tooltip title='Import'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='mdi:download' />
          </IconButton>
        </Tooltip>
        &nbsp; &nbsp;
        {selected.length > 0 ? (
          <Tooltip title='Xóa lớp học'>
            <IconButton sx={{ color: 'text.secondary' }} onClick={handleClickOpenDelete}>
              <Icon icon='mdi:delete-outline' />
            </IconButton>
          </Tooltip>
        ) : null}
        &nbsp; &nbsp;
        <Button
          component={Link}
          href={`/apps/account/0`}
          variant='contained'
          style={{ width: 210 }}
          color='primary'
          startIcon={<Icon icon='mdi:plus' />}
        >
          Người dùng
        </Button>
      </Toolbar>
      <Divider />
      <Grid container>
        <Grid item md={4}>
          <IconButton aria-label='filter' style={{ display: 'none' }}>
            <FilterAltOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'
            onChange={e => setKeyword(e.target.value)}
            size='small'
          />
        </Grid>
        <Grid item md={4} alignContent={'right'}>
          <TablePagination
            labelRowsPerPage='Số dòng/trang'
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
      <TableContainer component={Paper} style={{ marginTop: 5 }}>
        <LoadingSpinner active={loading} minHeight={0}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    onChange={handleSelectAllClick}
                    checked={data.length > 0 && selected.length === data.length}
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
                <TableCell style={{ width: 30 }}>Sửa</TableCell>
                <TableCell style={{ width: 240 }}>Tên đăng nhập</TableCell>
                <TableCell>Tên đầy đủ </TableCell>
                <TableCell style={{ width: 120 }}>Giới tính</TableCell>
                <TableCell style={{ width: 180 }}>Lớp</TableCell>
                <TableCell style={{ width: 180 }}>Ngày tạo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      role='checkbox'
                      key={row.id}
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                      onClick={event => handleClick(event, row.id)}
                      sx={{
                        '&:last-of-type td, &:last-of-type th': {
                          border: 0
                        }
                      }}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        <IconButton aria-label='edit' component={Link} href={`/apps/account/${row.id}`}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        <Typography noWrap variant='body1'>
                          {row.userName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body1'>{row.fullName}</Typography>{' '}
                      </TableCell>
                      <TableCell>{row.genderName}</TableCell>
                      <TableCell>{row.organizationName}</TableCell>
                      <TableCell>
                        <Typography variant='body1'>{moment(row.createdTime).format('DD-MM-YYYY HH:mm')}</Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </LoadingSpinner>
      </TableContainer>
      <TablePagination
        labelRowsPerPage='Số dòng/trang'
        rowsPerPageOptions={[20, 30, 50]}
        component='div'
        count={totalItem}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Xác nhận
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Học viên đã chọn không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDelete}>
            {' '}
            Hủy bỏ{' '}
          </Button>
          <Button onClick={handleDelete} color='error'>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserTable
