import {
  useEffect,
  useState
} from 'react'

import ExamApi from 'api/exam-api'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Icon from '@core/components/icon'
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
  const [rowsPerPage, setRowsPerPage] = useState(20)
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
        {/* &nbsp; &nbsp;
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
        </Tooltip> */}
        &nbsp; &nbsp;
        <Tooltip title='Delete'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </Tooltip>
        &nbsp; &nbsp;
        <Button
          component={Link}
          href={`/apps/exam/0/category/${examCategoryId}`}
          variant='contained'
          style={{ width: 130 }}
          color='primary'
          startIcon={<Icon icon='mdi:plus' />}
        >
          Kỳ thi
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
              <TableCell style={{ width: 200}}>Ngày tạo</TableCell>
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
                    <IconButton aria-label='edit' component={Link} href={`/apps/exam/${row.id}`}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Typography variant='body1'>
                      [{row.id}]-{row.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body1'>{row.registrationTypeName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body1'>{row.examTypeName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body1'>{row.totalAttempt}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body1'>{row.totalUser}</Typography>{' '}
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{moment(row.createdTime).format('DD-MM-YYYY HH:mm')}</Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 30, 50]}
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
