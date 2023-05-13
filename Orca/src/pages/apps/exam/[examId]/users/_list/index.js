import {
  useEffect,
  useState
} from 'react'

import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import ExamUserApi from 'src/api/exam-user-api'
import UserModal from 'src/pages/shared/user-modal'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
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

const UserTable = () => {
  const router = useRouter()
  const { examId } = router.query

  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
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
  }, [examId])

  const showUserHistory = row => {
    setUserHistoryDialog(true)
    setUserId(row.userId)
  }

  const fetchData = () => {
    new ExamUserApi().getExamUsersByExam(examId).then(response => {
      setData(response.data)
    })
  }

  const deleteExamUser = row => {
    // confirm({
    //   title: "Xác nhận",
    //   content: "Bạn có chắc chắn muốn xóa?",
    //   okText: "Đồng ý",
    //   okType: "danger",
    //   cancelText: "Hủy bỏ",
    //   onOk() {
    //     new ExamUserApi().delete(row).then((response) => {
    //       message.success("Xóa thành công.");
    //       fetchData();
    //     });
    //   },
    //   onCancel() {},
    // });
  }

  const onSelectedUsers = users => {
    let userIds = users.map(a => a.id);
    new ExamUserApi().addUsersToExam(examId, userIds).then(response => {
      fetchData()
      toast.success('Cập nhật thành công')
    })
  }

  return (
    <>
      <Toolbar style={{ padding: 0 }}>
        <Typography sx={{ flex: '1 1 50%' }} variant='h5' id='tableTitle' component='div'>
          {data.length} Học viên
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
        <Tooltip title='Delete'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
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
          <IconButton aria-label='filter'>
            <FilterAltOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item md={3} lg={3}>
          <TextField fullWidth placeholder='Tìm kiếm' size='small' />
        </Grid>
        <Grid item md={6} lg={6} alignContent={'right'}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            labelRowsPerPage='Hiển thị'
            component='div'
            count={data.length}
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
                  // onChange={onSelectAllClick}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
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
              data.map(row => (
                <TableRow
                  key={row.name}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0
                    }
                  }}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox />
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.userName}
                  </TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.genderName}</TableCell>
                  <TableCell>{row.organizationName}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        labelRowsPerPage='Hiển thị'
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {openUserModal && <UserModal onOk={onSelectedUsers} onClose={() => setOpenUserModal(false)} />}
    </>
  )
}

export default UserTable
