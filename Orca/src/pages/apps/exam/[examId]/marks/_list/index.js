import {
  useEffect,
  useState
} from 'react'

import ExamUserApi from 'api/exam-user-api'
import { useRouter } from 'next/router'
import UserModal from 'pages/shared/user-modal'
import Draggable from 'react-draggable'
import {
  Helmet,
  HelmetProvider
} from 'react-helmet-async'
import toast from 'react-hot-toast'

import Icon from '@core/components/icon'
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
  const router = useRouter()
  const { examId } = router.query

  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [totalItem, setTotalItem] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [openUserModal, setOpenUserModal] = useState(false)
  const [orgs, setOrgs] = useState([])
  const [orgId, setOrgId] = useState(0)
  const [userHistoryDialog, setUserHistoryDialog] = useState(false)
  const [userId, setUserId] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    if (!examId || examId == 0) return
    fetchData()
  }, [examId, page, rowsPerPage])

  const showUserHistory = row => {
    setUserHistoryDialog(true)
    setUserId(row.userId)
  }

  const fetchData = () => {
    new ExamUserApi().searchesExamUsersByExam(examId, page , rowsPerPage).then(response => {
      if (response.data.isSuccess) {
        setData(response.data.value)
        setTotalItem(response.data.totalItems)
      }
    })
  }

  const onSelectedUsers = users => {
    let userIds = users.map(a => a.id)
    new ExamUserApi()
      .addUsersToExam(examId, userIds)
      .then(response => {
        fetchData()
        toast.success('Cập nhật thành công')
      })
      .catch(e => {
        toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
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
   * handle remove class
   */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (selected.length > 0) {
      new ExamUserApi()
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
   * handle remove class
   */

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Quản lý học viên trong kỳ thi</title>
        </Helmet>
        <Toolbar style={{ padding: 0 }}>
          <Typography sx={{ flex: '1 1 50%' }} variant='h5' id='tableTitle' component='div'>
            {totalItem} Học viên
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
          <Tooltip title='Xóa học viên khỏi kỳ thi'>
            <span>
              <IconButton
                sx={{ color: 'text.secondary' }}
                onClick={handleClickOpenDelete}
                disabled={selected.length > 0 ? false : true}
              >
                <Icon icon='mdi:delete-outline' />
              </IconButton>
            </span>
          </Tooltip>
          &nbsp; &nbsp;
          <Button
            variant='contained'
            style={{ width: 180 }}
            onClick={() => setOpenUserModal(true)}
            color='primary'
            startIcon={<Icon icon='mdi:plus' />}
          >
            Gán Học viên
          </Button>
        </Toolbar>
        <Divider />
        <Grid container>
          <Grid item md={3} lg={3}>
            <IconButton aria-label='filter' style={{ display: 'none' }}>
              <FilterAltOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item md={3} lg={3}>
            <TextField
              fullWidth
              placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'
              onChange={e => setKeyword(e.target.value)}
              size='small'
            />
          </Grid>
          <Grid item md={6} lg={6} alignContent={'right'}>
            <TablePagination
              rowsPerPageOptions={[20, 30, 50]}
              labelRowsPerPage='Hiển thị'
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
          <Table sx={{}} aria-label='simple table'>
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
                <TableCell style={{ width: 120 }}>Tên đăng nhập</TableCell>
                <TableCell style={{ width: 120 }}>Tên đầy đủ </TableCell>
                <TableCell style={{ width: 120 }}>Giới tính</TableCell>
                <TableCell style={{ width: 120 }}>Lớp</TableCell>
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
                        <Typography noWrap variant='body1'>
                          {row.userName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant='body1'>
                          {row.fullName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant='body1'>
                          {row.genderName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant='body1'>
                          {row.organizationName}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 30, 50]}
          component='div'
          count={totalItem}
          labelRowsPerPage='Hiển thị'
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
              Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Học viên đã chọn khỏi Kỳ thi không?
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

        {openUserModal && (
          <UserModal open={openUserModal} onOk={onSelectedUsers} onClose={() => setOpenUserModal(false)} />
        )}
      </HelmetProvider>
    </>
  )
}

export default UserTable
