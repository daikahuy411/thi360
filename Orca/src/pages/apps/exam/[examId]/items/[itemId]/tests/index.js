import {
  useEffect,
  useState
} from 'react'

import ExamItemApi from 'api/exam-item-api'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import TestsDialog from 'pages/shared/tests-dialog'
import Draggable from 'react-draggable'
import toast from 'react-hot-toast'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  selectedExamItem,
  selectExamItem
} from 'store/slices/examItemSlice'

import Icon from '@core/components/icon'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined'
import Box from '@mui/material/Box'
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
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import TopNav from '../../_layout/_breadcrums'
import Nav from '../../_layout/_tabs'

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const TestsList = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [showTestDialog, setShowTestDialog] = useState(false)
  const { examId, itemId } = router.query
  const currentExamItem = useSelector(selectedExamItem)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    if (currentExamItem) {
      setData(currentExamItem.tests)
    }
  }, [])

  useEffect(() => {
    if (itemId && parseInt(itemId) > 0 && !currentExamItem) {
      new ExamItemApi().get(itemId).then(response => {
        dispatch(selectExamItem(response.data))
        setData(response.data.tests)
      })
    }
  }, [itemId])

  const onSelectedTests = testIds => {
    new ExamItemApi().addTestsToExamItem(examId, itemId, testIds).then(response => {
      setShowTestDialog(false)
      toast.success('Cập nhật thành công')
      new ExamItemApi().get(itemId).then(response => {
        dispatch(selectExamItem(response.data))
        setData(response.data.tests)
      })
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
      new ExamItemApi()
        .removeTestsFromExamItem(examId, parseInt(itemId), selected)
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          new ExamItemApi().get(itemId).then(response => {
            dispatch(selectExamItem(response.data))
            setData(response.data.tests)
          })
          setSelected([])
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
      <div style={{ padding: 0 }}>
        <div sx={{ py: 5.375 }} style={{ padding: 0 }}>
          <>
            <TopNav />
            <Box style={{ marginTop: 2 }}>
              <div className='grid-block vertical'>
                <div className='title-bar' id='EntityHeadingTitleBar'>
                  <h3 className='title left'>
                    <span className='title__label'>
                      {currentExamItem && currentExamItem.id > 0 && <span>{currentExamItem.name}</span>}
                    </span>
                    {currentExamItem && currentExamItem.id > 0 && <EntityInfoModal entity={currentExamItem} />}
                  </h3>
                  <span className='right'>
                    <Button variant='outlined' component={Link} href={`/apps/exam/${examId}/items`}>
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                  </span>
                </div>
                <div className='grid-block'>
                  <Nav />
                  <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                    <div style={{ width: '100%' }}>
                      <>
                        <Toolbar style={{ padding: 0 }}>
                          <Typography sx={{ flex: '1 1 50%' }} variant='h5' id='tableTitle' component='div'>
                            {data.length} Đề thi
                          </Typography>
                          &nbsp; &nbsp;
                          <Tooltip title='Delete'>
                            <IconButton
                              sx={{ color: 'text.secondary' }}
                              onClick={handleClickOpenDelete}
                              disabled={selected.length > 0 ? false : true}
                            >
                              <Icon icon='mdi:delete-outline' />
                            </IconButton>
                          </Tooltip>
                          &nbsp; &nbsp;
                          <Button
                            variant='contained'
                            style={{ width: 180 }}
                            onClick={() => setShowTestDialog(true)}
                            color='primary'
                            startIcon={<Icon icon='mdi:send' />}
                          >
                            Chọn Đề thi
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
                            {/* <TextField
                              fullWidth
                              placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'
                              onChange={e => setKeyword(e.target.value)}
                              size='small'
                            /> */}
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
                                    onChange={handleSelectAllClick}
                                    checked={data.length > 0 && selected.length === data.length}
                                    indeterminate={selected.length > 0 && selected.length < data.length}
                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                  />
                                </TableCell>
                                <TableCell style={{ width: 30, textAlign: 'center' }}>XEM</TableCell>
                                <TableCell>Tên</TableCell>
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
                                      key={row.name}
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
                                        <IconButton
                                          aria-label='edit'
                                          component={Link}
                                          href={`/testing/preview/exam/${examId}/${itemId}/${row.id}`}
                                        >
                                          <VisibilityIcon />
                                        </IconButton>
                                      </TableCell>
                                      <TableCell component='th' scope='row'>
                                        <Typography variant='body1'> {row.name}</Typography>
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
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </>
        </div>
      </div>

      {currentExamItem && (
        <TestsDialog
          open={showTestDialog}
          testGroupId={currentExamItem.testGroupId}
          examId={examId}
          itemId={itemId}
          onOk={onSelectedTests}
          onClose={() => setShowTestDialog(false)}
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
            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa bộ đề thi đã chọn không?
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

export default TestsList
