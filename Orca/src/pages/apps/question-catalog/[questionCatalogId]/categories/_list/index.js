import {
  useEffect,
  useState
} from 'react'

import { QuestionCategoryApi } from 'api/catalog-api'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Icon from '@core/components/icon'
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
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import TreeRow from './TreeRow'

const CategoryTable = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [totalItem, setTotalItem] = useState(0)
  const [totalParentItem, setTotalParentItem] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { questionCatalogId } = router.query

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const fetchData = () => {
    if (!questionCatalogId || questionCatalogId == 0) return

    const param = {
      keyword: '',
      catalogId: Number(questionCatalogId),
      page: page == 0 ? 1 : page + 1,
      limit: rowsPerPage
    }

    QuestionCategoryApi.searches(param)
      .then(response => {
        setData(response.data.value)
        setTotalItem(response.data.totalItems)
        setTotalParentItem(response.data.totalParentItems)
      })
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    fetchData()
  }, [questionCatalogId, page, rowsPerPage ])

  return (
    <>
      <Toolbar style={{ padding: 0 }}>
        <Typography sx={{ flex: '1 1 100%' }} variant='h5' id='tableTitle' component='div'>
          {totalItem} Danh mục Câu hỏi
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
        {/* &nbsp; &nbsp;
        <Tooltip title='Delete'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </Tooltip> */}
        &nbsp; &nbsp;
        <Button
          component={Link}
          href={`/apps/question-catalog/${questionCatalogId}/categories/0`}
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
        <Grid item md={2}>
          <IconButton aria-label='filter'>
            <FilterAltOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item md={4}>
          <TextField fullWidth placeholder='Tìm kiếm' size='small' />
        </Grid>
        <Grid item md={6} alignContent={'right'}>
          <TablePagination
            labelRowsPerPage='Số dòng/trang'
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={totalParentItem}
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
              <TableCell style={{ width: 120 }}>#</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell align='right' style={{ width: 120 }}>
                Số câu hỏi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((item, index) => <TreeRow key={index} item={item} excludedId={0} nodeId={item.Id} level={0} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage='Số dòng/trang'
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={totalParentItem}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default CategoryTable
