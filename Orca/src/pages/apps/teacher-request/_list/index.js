import {
  useEffect,
  useState
} from 'react'

import TeacherRequestApi from 'api/teacher-request-api'
import moment from 'moment'
import Draggable from 'react-draggable'
import {
  Helmet,
  HelmetProvider
} from 'react-helmet-async'
import toast from 'react-hot-toast'

import LoadingSpinner from '@core/components/loading-spinner'
import EditIcon from '@mui/icons-material/Edit'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
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
import Typography from '@mui/material/Typography'

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const RequestTeacherTable = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [totalItem, setTotalItem] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [item, setItem] = useState(null)

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
    setLoading(true)
    new TeacherRequestApi()
      .searches({
        Page: page,
        Limit: rowsPerPage,
        Keyword: keyword
      })
      .then(response => {
        if (response.data.isSuccess) {
          setData(response.data.value)
          setTotalItem(response.data.totalItems)
          setLoading(false)
        }
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
      })
  }

  const [openEdit, setOpenEdit] = useState(false)

  const handleCloseEdit = () => {
    setOpenEdit(false)
    setItem(null)
  }

  const handleUpdate = () => {
    item.approveBecomeTeacher = true
    new TeacherRequestApi()
      .save(item)
      .then(response => {
        setItem(null)
        setOpenEdit(false)
        toast.success('Cập nhật thành công.')
        fetchData()
      })
      .catch(e => {
        setOpenEdit(false)
        toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
      })
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Quản lý Đăng ký</title>
        </Helmet>
        <Divider />
        <Toolbar style={{ padding: 0 }}>
          <Typography sx={{ flex: '1 1 100%' }} variant='h5' id='tableTitle' component='div'>
            {totalItem} Request
          </Typography>
          &nbsp; &nbsp;
          {/* <Tooltip title='Xóa request'>
            <span>
              <IconButton
                sx={{ color: 'text.secondary' }}
                onClick={handleClickOpenDelete}
                disabled={selected.length > 0 ? false : true}
              >
                <Icon icon='mdi:delete-outline' />
              </IconButton>
            </span>
          </Tooltip> */}
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
        <TableContainer component={Paper} style={{ marginTop: 5 }}>
          <LoadingSpinner active={loading} minHeight={0}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 30 }}>Sửa</TableCell>
                  <TableCell>Học và Tên</TableCell>
                  <TableCell>Tên đăng nhập</TableCell>
                  <TableCell>Thông tin trường</TableCell>
                  <TableCell style={{ width: 180 }}>Ngày tạo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => {
                              setItem(row)
                              setOpenEdit(true)
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <Typography variant='body1'>{row.name}</Typography>
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <Typography variant='body1'>{row.userName}</Typography>
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <Typography variant='body1'>{row.tenant.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1'>
                            {moment(row.requestBecomeTeacherDate).format('DD-MM-YYYY HH:mm')}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </LoadingSpinner>
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

        {/* Duyệt yêu cầu */}
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          PaperComponent={PaperComponent}
          aria-labelledby='draggable-dialog-title'
        >
          <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
            Duyệt yêu cầu
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseEdit}>
              Hủy bỏ
            </Button>
            <Button onClick={handleUpdate} color='error'>
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      </HelmetProvider>
    </>
  )
}

export default RequestTeacherTable
