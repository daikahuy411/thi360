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

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import {
  mdilInformation,
  mdilTag
} from '@mdi/light-js'
import IconReact from '@mdi/react'
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

import QuestionCategoryTree from '../category-tree'

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
  const [categoryId, setCategoryId] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState(null)

  const { questionCatalogId, questionCategoryId } = router.query

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

  const searchQuestion = () => {
    if (!questionCatalogId || questionCatalogId == 0) return

    setLoading(true)
    new QuestionApi()
      .searches({
        catalogId: parseInt(questionCatalogId),
        questionType: 0,
        categoryId: categoryId,
        keyword: keyword,
        page: page,
        limit: rowsPerPage
      })
      .then(response => {
        if (response.data.isSuccess) {
          setData(response.data.value)
          setTotalItems(response.data.totalItems)
          setLoading(false)
        }
      })
  }

  useEffect(() => {
    getAllQuestionTypes()
  }, [])

  useEffect(() => {
    searchQuestion()
  }, [questionCatalogId, categoryId, keyword, page, rowsPerPage])

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

  const handleNodeSelected = nodeId => {
    setCategoryId(parseInt(nodeId))
  }

  const editUrl = id => {
    if (questionCategoryId && questionCategoryId != '0') {
      return `/apps/question-catalog/${questionCatalogId}/categories/${questionCategoryId}/questions/${id}`
    }
    return `/apps/question-catalog/${questionCatalogId}/questions/${id}`
  }

  return (
    <>
      <Toolbar style={{ padding: 0 }}>
        <Typography sx={{ flex: '1 1 50%' }} variant='h5' id='tableTitle' component='div'>
          {totalItems} Câu hỏi
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
            {questionTypes.map(item => (
              <MenuItem
                component={Link}
                key={item.id}
                href={`/apps/question-catalog/${questionCatalogId}/questions/add/${item.typeId}`}
              >
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        )}
      </Toolbar>
      <Divider />
      <Grid container spacing={0}>
        <Grid item md={12} style={{ padding: 5 }}>
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
        <Grid item md={12} style={{ padding: 0 }}>
          <table style={{ width: '100%' }}>
            <tr>
              <td
                style={{
                  width: '25%',
                  padding: 5,
                  verticalAlign: 'top',
                  borderRight: '1px solid rgba(58, 53, 65, 0.12)'
                }}
              >
                <QuestionCategoryTree
                  onNodeSelected={handleNodeSelected}
                  excludedId={-1}
                  catalogId={questionCatalogId}
                />
              </td>
              <td style={{ verticalAlign: 'top', padding: 5 }}>
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
                          <TableCell style={{ width: 180 }}>Ngày tạo</TableCell>
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
                                  <IconButton aria-label='filter' component={Link} href={editUrl(row.id)}>
                                    <EditIcon />
                                  </IconButton>
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                  <Typography variant='body2'>{row.id}</Typography>
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                  <Typography variant='body1'>{row.shortContent}</Typography>
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    icon={<IconReact path={mdilInformation} title='Bộ Câu hỏi' size={1} />}
                                    label={row.questionTypeName}
                                    style={{ marginBottom: 2 }}
                                    color='secondary'
                                    variant='outlined'
                                  />
                                  {row.catalog ? (
                                    <Chip
                                      icon={<IconReact path={mdilTag} title='Bộ Câu hỏi' size={1} />}
                                      label={row.catalog.name}
                                      style={{ marginBottom: 2 }}
                                      color='secondary'
                                      variant='outlined'
                                    />
                                  ) : null}
                                  {row.category ? (
                                    <Chip
                                      icon={<IconReact path={mdilTag} title='Danh mục Câu hỏi' size={1} />}
                                      label={row.category.name}
                                      color='secondary'
                                      variant='outlined'
                                    />
                                  ) : null}
                                </TableCell>
                                <TableCell>
                                  <Typography variant='body2'>
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
              </td>
            </tr>
          </table>
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
