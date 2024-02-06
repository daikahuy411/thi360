import {
  useEffect,
  useState
} from 'react'

import QuestionApi from 'api/question-api'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Draggable from 'react-draggable'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { selectQuestion } from 'store/slices/questionSlice'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import EditIcon from '@mui/icons-material/Edit'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
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

const QuestionTable = () => {
  const router = useRouter()

  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [anchorEl, setAnchorEl] = useState(null)
  const [questionTypes, setQuestionTypes] = useState(null)
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState(null)
  const dispatch = useDispatch()

  const { questionId, questionCatalogId } = router.query

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getAllQuestionTypes = () => {
    var questionApi = new QuestionApi()
    questionApi.getQuestionTypes().then(response => {
      setQuestionTypes(response.data)
    })
  }

  useEffect(() => {
    getAllQuestionTypes()
  }, [])

  useEffect(() => {
    if (!questionId || questionId == '0') return
    new QuestionApi().get(questionId).then(response => {
      dispatch(selectQuestion(response.data))
      setData(response.data.children)
    })
  }, [questionId])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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

  const handleSelectClick = (event, name) => {
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
   * handle remove
   */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (selected.length > 0) {
      new QuestionApi()
        .deleteMultiple(selected)
        .then(response => {
          setOpenDelete(false)
          if (response.data.isSuccess) {
            toast.success('Xóa dữ liệu thành công.')
            searchQuestion()
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
   * handle remove
   */

  return (
    <>
      <Toolbar style={{ padding: 0 }}>
        <Typography sx={{ flex: '1 1 50%' }} variant='h5' id='tableTitle' component='div'>
          {totalItems} Câu hỏi
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
        <Tooltip title='Xóa câu hỏi'>
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
          color='primary'
          startIcon={<Icon icon='mdi:plus' />}
          onClick={handleClick}
        >
          Câu hỏi
        </Button>
        {questionTypes && (
          <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
            {questionTypes
              .filter(x => x.typeId != 9)
              .map(item => (
                <MenuItem
                  component={Link}
                  key={item.id}
                  href={`/apps/question-catalog/${questionCatalogId}/questions/add/${item.typeId}/question/${questionId}`}
                >
                  {item.name}
                </MenuItem>
              ))}
          </Menu>
        )}
      </Toolbar>
      <Divider />
      <Grid container spacing={6}>
        <Grid item md={12}>
          <Grid container>
            <Grid item md={3} lg={3}>
              <IconButton aria-label='filter'>
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
                count={totalItems}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
          <Divider />
        </Grid>
        <Grid item md={12}>
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
                    <TableCell align='center' style={{ width: 30 }}>
                      Sửa
                    </TableCell>
                    <TableCell style={{ width: 160 }}>Mã</TableCell>
                    <TableCell>Nội dung</TableCell>
                    <TableCell style={{ width: 280 }}>Danh mục</TableCell>
                    <TableCell style={{ width: 180 }}>Loại câu hỏi</TableCell>
                    <TableCell style={{ width: 200 }}>Ngày tạo</TableCell>
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
                              onClick={event => handleSelectClick(event, row.id)}
                            />
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            <IconButton
                              aria-label='filter'
                              component={Link}
                              href={`/apps/question-catalog/${questionCatalogId}/questions/${row.id}`}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            <Typography variant='body1'>{row.id}</Typography>
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {row.shortContent}
                          </TableCell>
                          <TableCell>
                            {row.categoryName ? (
                              <Chip
                                icon={<Icon icon='mdi:tag' />}
                                label={row.categoryName}
                                color='secondary'
                                variant='outlined'
                              />
                            ) : null}
                          </TableCell>
                          <TableCell>
                            <Typography variant='body1'>{row.questionTypeName}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant='body1'>
                              {moment(row.createdTime).format('DD-MM-YYYY HH:mm')}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </LoadingSpinner>
          </TableContainer>
        </Grid>
      </Grid>
      <TablePagination
        rowsPerPageOptions={[20, 30, 50]}
        component='div'
        count={totalItems}
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
            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Câu hỏi đã chọn không?
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

export default QuestionTable
