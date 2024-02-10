import React, {
  useEffect,
  useState
} from 'react'

import TestApi from 'api/test-api'
import moment from 'moment'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function TestsDialog({ testGroupId, onClose, onOk }) {
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [keyword, setKeyword] = useState(null)
  const [selectedValue, setSelectedValue] = React.useState(null)
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
      onOk(selectedValue)
      onClose()
    }
  }

  return (
    <Drawer onClose={onClose} anchor={'right'} open={true}>
      <div
        style={{
          width: '100%'
        }}
      >
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(3.5, 5),
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            marginBottom: 2
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            Chọn Bộ đề thi
          </Typography>
          <IconButton
            onClick={() => onClose()}
            sx={{
              right: 20,
              top: '50%',
              position: 'absolute',
              color: 'text.secondary',
              transform: 'translateY(-50%)'
            }}
          >
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
        <Grid container style={{width: '100%'}}>
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
              disabled={selectedValue ? false : true}
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
                      <TableCell style={{ width: 30 }}>Sửa</TableCell>
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
                                href={`/testing/preview/${testGroupId}/${row.id}`}
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
      </div>
    </Drawer>
  )
}
