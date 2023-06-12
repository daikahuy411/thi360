import {
  useEffect,
  useState
} from 'react'

import QuestionCatalogApi from 'api/question-catalog-api'
import Link from 'next/link'
import Draggable from 'react-draggable'
import toast from 'react-hot-toast'

import Icon from '@core/components/icon'
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
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const QuestionCatalogTable = () => {
  const [keyword, setKeyword] = useState('')

  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage])

  const fetchData = () => {
    new QuestionCatalogApi()
      .searches({
        Page: page + 1,
        Limit: rowsPerPage,
        Keyword: keyword
      })
      .then(response => {
        if (response.data.isSuccess) {
          setData(response.data.value)
          setTotalItem(response.data.totalItems)
        }
      })
      .catch((e) => console.log(e))
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
  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDelete = () => {
    if (selected.length > 0) {
      new QuestionCatalogApi().deleteMultiple(selected)
        .then((response) => {
          setOpenDelete(false)
          if (response.data.isSuccess) {
            toast.success('Xóa dữ liệu thành công.')
            fetchData()
            setSelected([])
          }
        })
        .catch((e) => {
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
      <Divider />
      <Toolbar style={{ padding: 0 }}>
        <Typography sx={{ flex: '1 1 100%' }} variant='h5' id='tableTitle' component='div'>
          {totalItem} Bộ Câu hỏi
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
          <Tooltip title='Delete'>
            <IconButton sx={{ color: 'text.secondary' }} onClick={handleClickOpenDelete}>
              <Icon icon='mdi:delete-outline' />
            </IconButton>
          </Tooltip>
        ) : null}
        &nbsp; &nbsp;
        <Button
          component={Link}
          href={`/apps/question-catalog/0`}
          variant='contained'
          style={{ width: 190 }}
          color='primary'
          startIcon={<Icon icon='mdi:plus' />}
        >
          Bộ Câu hỏi
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
            labelRowsPerPage={"Số dòng/trang:"}
            rowsPerPageOptions={[10, 25, 100]}
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
              <TableCell style={{ width: 200 }}>Ngân hàng câu hỏi</TableCell>
              <TableCell style={{ width: 200 }}>Danh mục câu hỏi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item, index) => {
                const isItemSelected = isSelected(item.id)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    role='checkbox'
                    key={item.id}
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                    onClick={event => handleClick(event, item.id)}
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
                      <IconButton aria-label='filter' component={Link} href={`/apps/question-catalog/${item.id}`}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {item.name}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {item.totalQuestion}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {item.totalCategory}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={"Số dòng/trang:"}
        rowsPerPageOptions={[10, 25, 100]}
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
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Xác nhận
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Kỳ thi đã chọn không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDelete}> Hủy bỏ </Button>
          <Button onClick={handleDelete} color='error'>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default QuestionCatalogTable
