import {
  useEffect,
  useState
} from 'react'

import QuestionCatalogApi from 'api/question-catalog-api'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EditFolderDialog from 'pages/shared/folder/edit-folder-dialog'
import Draggable from 'react-draggable'
import toast from 'react-hot-toast'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import { formatCurrency } from '@core/utils/format'
import EditIcon from '@mui/icons-material/Edit'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import FolderIcon from '@mui/icons-material/Folder'
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

const QuestionCatalogTable = () => {
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [loading, setLoading] = useState(false)
  const [editFolder, setEditFolder] = useState(false)
  const [currentFolder, setCurrentFolder] = useState(null)

  const router = useRouter()
  const { questionCatalogId } = router.query ?? '0'

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage, questionCatalogId, keyword])

  const fetchData = () => {
    setLoading(true)
    new QuestionCatalogApi()
      .searches({
        Page: page,
        Limit: rowsPerPage,
        Keyword: keyword,
        FolderId: questionCatalogId
      })
      .then(response => {
        setLoading(false)
        if (response.data.isSuccess) {
          setData(response.data.value)
          setTotalItem(response.data.totalItems)
        }
      })
      .catch(e => console.log(e))
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
   * handle remove question-catalog
   */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (selected.length > 0) {
      new QuestionCatalogApi()
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
   * handle remove question-catalog
   */

  const handleEditFolderClose = hasChanged => {
    setEditFolder(false)
    if (hasChanged) {
      fetchData()
    }
  }

  return (
    <>
      <Divider />
      <Toolbar style={{ padding: 0 }}>
        <Typography sx={{ flex: '1 1 100%' }} variant='h5' id='tableTitle' component='div'>
          {formatCurrency(totalItem, 0)} Bộ Câu hỏi
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
        <Tooltip title='Delete'>
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
          href={`/apps/question-catalog/0`}
          variant='contained'
          style={{ width: 220 }}
          color='primary'
          startIcon={<Icon icon='mdi:plus' />}
        >
          Bộ Câu hỏi
        </Button>
        &nbsp;
        <Button
          variant='contained'
          onClick={() => {
            setCurrentFolder(null)
            setEditFolder(true)
          }}
          style={{ width: 210 }}
          color='primary'
          startIcon={<Icon icon='mdi:plus' />}
        >
          Thư mục
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
        <LoadingSpinner active={loading}>
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
                <TableCell style={{ width: 130, textAlign: 'right' }}>Danh mục</TableCell>
                <TableCell style={{ width: 130, textAlign: 'right' }}>Câu hỏi</TableCell>
                <TableCell style={{ width: 180 }}>Ngày tạo</TableCell>
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
                          onClick={event => handleClick(event, item.id)}
                        />
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {item.type === 1 && (
                          <IconButton
                            aria-label='edit'
                            onClick={() => {
                              setCurrentFolder(item)
                              setEditFolder(true)
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        {item.type !== 1 && (
                          <IconButton aria-label='edit' component={Link} href={`/apps/question-catalog/${item.id}`}>
                            <EditIcon />
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        <Typography variant='body1'>
                          {item.type == 1 && (
                            <Typography
                              variant='body1'
                              component={Link}
                              href={`/apps/question-catalog/view/${item.id}`}
                            >
                              <FolderIcon /> &nbsp;
                              {item.name}
                            </Typography>
                          )}
                          {item.type != 1 && <Typography variant='body1'>{item.name}</Typography>}
                        </Typography>
                      </TableCell>
                      <TableCell component='th' scope='row' style={{ textAlign: 'right' }}>
                        {item.totalCategory}
                      </TableCell>
                      <TableCell component='th' scope='row' style={{ textAlign: 'right' }}>
                        {item.totalQuestion}
                      </TableCell>
                      <TableCell>{moment(item.createdTime).format('DD-MM-YYYY HH:mm')}</TableCell>
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

      {editFolder && (
        <EditFolderDialog
          onClose={hasChanged => handleEditFolderClose(hasChanged)}
          entity={currentFolder}
          parentId={questionCatalogId}
          api={new QuestionCatalogApi()}
        />
      )}

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
            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Kỳ thi đã chọn không?
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

export default QuestionCatalogTable
