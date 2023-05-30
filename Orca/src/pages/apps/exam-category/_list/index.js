import {
  useEffect,
  useState
} from 'react'

import Link from 'next/link'
import Icon from 'src/@core/components/icon'
import { ExamCategoryApi } from 'src/api/catalog-api'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Button from '@mui/material/Button'
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

import TreeRow from './TreeRow'

const ExamCategoryTable = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const fetchData = () => {
    ExamCategoryApi.getAll().then(response => {
      setData(response.data)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Divider />
      <Toolbar style={{ padding: 0 }}>
        <Typography sx={{ flex: '1 1 100%' }} variant='h5' id='tableTitle' component='div'>
          {data.length} Danh mục Kỳ thi
        </Typography>
        &nbsp; &nbsp;
        {/* <Tooltip title='Import'>
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
        &nbsp; &nbsp; */}
        {/* <Tooltip title='Delete'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </Tooltip> */}
        &nbsp; &nbsp;
        <Button
          component={Link}
          href={`/apps/exam-category/0`}
          variant='contained'
          style={{ width: 190 }}
          color='primary'
          startIcon={<Icon icon='mdi:plus' />}
        >
          Danh mục
        </Button>
      </Toolbar>
      <Divider />
      <Grid container>
        <Grid item md={4}>
          <IconButton aria-label='filter'>
            <FilterAltOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item md={4}>
          <TextField fullWidth placeholder='Tìm kiếm' size='small' />
        </Grid>
        <Grid item md={4} alignContent={'right'}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={10}
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
              {/* <TableCell padding='checkbox'>
                <Checkbox
                  // onChange={onSelectAllClick}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                />
              </TableCell> */}
              <TableCell style={{ width: 120 }}>#</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell align='right' style={{ width: 120 }}>
                Số Kỳ thi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map(item => (
                <TreeRow key={item.Id} item={item}  excludedId ={0} nodeId={item.Id} level={0} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={10}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default ExamCategoryTable
