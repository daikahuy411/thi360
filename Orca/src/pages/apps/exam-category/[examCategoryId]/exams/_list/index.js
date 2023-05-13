import {
  useEffect,
  useState
} from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import ExamApi from 'src/api/exam-api'

import EditIcon from '@mui/icons-material/Edit'
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

const ExamTable = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { examCategoryId } = router.query

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const fetchData = () => {
    if (!examCategoryId || examCategoryId == 0) return
    new ExamApi().searches({ CategoryId: examCategoryId }).then(response => {
      setData(response.data.value)
    })
  }

  useEffect(() => {
    fetchData()
  }, [examCategoryId])

  return (
    <>
      <Toolbar style={{ padding: 0 }}>
        <Typography sx={{ flex: '1 1 50%' }} variant='h5' id='tableTitle' component='div'>
          {data.length} Kỳ thi
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
          component={Link}
          href={`/apps/user/0`}
          variant='contained'
          style={{ width: 160 }}
          color='primary'
          startIcon={<Icon icon='mdi:plus' />}
        >
          Kỳ thi
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
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
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
              <TableCell style={{ width: 30 }}>Sửa</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell style={{ width: 120 }}>Hình thức</TableCell>
              <TableCell>Lượt thi</TableCell>
              <TableCell>Học viên</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày tạo</TableCell>
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
                    <IconButton aria-label='filter' component={Link} href={`/apps/exam/${row.id}`}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    [{row.id}]-{row.name}
                  </TableCell>
                  <TableCell>{row.registrationTypeName}</TableCell>
                  <TableCell>{row.examTypeName}</TableCell>
                  <TableCell>{row.totalAttempt}</TableCell>
                  <TableCell>{row.totalUser}</TableCell>
                  <TableCell>{row.statusName}</TableCell>
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
    </>
  )
}

export default ExamTable
