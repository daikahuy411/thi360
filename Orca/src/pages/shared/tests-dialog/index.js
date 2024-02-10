import React, {
  useEffect,
  useState
} from 'react'

import TestApi from 'api/test-api'
import moment from 'moment'

import LoadingSpinner from '@core/components/loading-spinner'
import CloseIcon from '@mui/icons-material/Close'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined'
import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function TestsDialog({ testGroupId, examId, itemId, onClose, open, onOk }) {
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [keyword, setKeyword] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage, testGroupId, keyword])

  const fetchData = () => {
    if (!testGroupId || testGroupId == 0) return
    setLoading(true)
    new TestApi().getTests(testGroupId).then(response => {
      setData(response.data)
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
      new ExamApi()
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

  const onSelected = () => {
    if (onOk) {
      onOk(selected)
      onClose()
    }
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      style={{ backgroundColor: '#f5f5f5' }}
      anchor={'right'}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1, color: 'white', fontWeight: 400, textTransform: 'uppercase' }}>
            Chọn Đề thi
          </Typography>
          <IconButton edge='start' color='inherit' onClick={onClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <br />
      <Grid container style={{ width: '100%' }}>
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
        <Grid item md={4} alignContent={'right'} alignItems={'right'}>
          <Button
            disabled={selected.length > 0 ? false : true}
            color='primary'
            style={{ float: 'right' }}
            type='submit'
            variant='contained'
            onClick={onSelected}
          >
            Chọn
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <LoadingSpinner active={loading}>
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
                    <TableCell style={{ width: 30, textAlign: 'center' }}>Xem</TableCell>
                    <TableCell>Tên</TableCell>
                    <TableCell style={{ width: 120 }}>Số phần</TableCell>
                    <TableCell style={{ width: 120 }}>Số câu hỏi</TableCell>
                    <TableCell style={{ width: 120 }}>Số trả lời</TableCell>
                    <TableCell style={{ width: 180 }}>Hình thức</TableCell>
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
                            <Typography variant='body1'>{row.name}</Typography>
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            <Typography variant='body1'>{row.totalSection}</Typography>
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            <Typography variant='body1'>{row.totalQuestion}</Typography>
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            <Typography variant='body1'>{row.totalAnswer}</Typography>
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            <Typography variant='body1'>{row.testTypeName}</Typography>
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
          </LoadingSpinner>
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
    </Dialog>
  )
}
