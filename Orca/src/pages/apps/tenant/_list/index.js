import {
  useEffect,
  useState
} from 'react'

import TenantApi from 'api/tenant-api'
import moment from 'moment'
import Link from 'next/link'
import Draggable from 'react-draggable'
import {
  Helmet,
  HelmetProvider
} from 'react-helmet-async'
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

const TenantTable = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [totalItem, setTotalItem] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [isTableEmpty, setIsTableEmpty] = useState(false)

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
    new TenantApi()
      .searches({
        Page: page ,
        Limit: rowsPerPage,
        Keyword: keyword,
        Status: status
      })
      .then(response => {
        if (response.data.isSuccess) {
          if (response.data.value) {
            setData(response.data.value)
            setTotalItem(response.data.totalItems)
            setIsTableEmpty(false)
          } else {
            setIsTableEmpty(true)
          }

          setLoading(false)
        }
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
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
   * handle remove exam
   */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (selected.length > 0) {
      new TenantApi()
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
   * handle remove exam
   */

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Quản lý Tenant</title>
        </Helmet>
        <Divider />
        <Toolbar style={{ padding: 0 }}>
          <Typography sx={{ flex: '1 1 100%' }} variant='h5' id='tableTitle' component='div'>
            {totalItem} Tenant
          </Typography>
          &nbsp; &nbsp;
          <Tooltip title='Xóa tenant'>
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
            component={Link}
            href={`/apps/tenant/0`}
            variant='contained'
            style={{ width: 180 }}
            color='primary'
            startIcon={<Icon icon='mdi:plus' />}
          >
            Tenant
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
                  <TableCell padding='checkbox'>
                    <Checkbox
                      onChange={handleSelectAllClick}
                      checked={data.length > 0 && selected.length === data.length}
                      indeterminate={selected.length > 0 && selected.length < data.length}
                      inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                  </TableCell>
                  <TableCell style={{ width: 30 }}>Sửa</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell style={{ width: 180}}>Ngày tạo</TableCell>
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
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            onClick={event => handleClick(event, row.id)}
                          />
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <IconButton aria-label='edit' component={Link} href={`/apps/tenant/${row.id}`}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <Typography variant='body1'>
                            [{row.id}]-{row.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{moment(row.createdTime).format('DD-MM-YYYY HH:mm')}</Typography>
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
            <DialogContentText>Bạn có muốn xóa Tenants đã chọn không?</DialogContentText>
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
      </HelmetProvider>
    </>
  )
}

export default TenantTable
