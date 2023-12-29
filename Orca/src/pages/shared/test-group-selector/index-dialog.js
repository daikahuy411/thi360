import React, {
  useEffect,
  useState
} from 'react'

import TestGroupApi from 'api/test-group-api'

import LoadingSpinner from '@core/components/loading-spinner'
import CloseIcon from '@mui/icons-material/Close'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import FolderIcon from '@mui/icons-material/Folder'
import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
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

export default function TestGroupSelector({ open, onClose, onNodeSelected = null }) {
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [keyword, setKeyword] = useState(null)
  const [selectedValue, setSelectedValue] = React.useState(null)
  const [folderId, setFolderId] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currentTestGroup, setCurrentTestGroup] = useState(null)

  const handleChange = event => {
    setSelectedValue(parseInt(event.target.value))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage, folderId, keyword])

  useEffect(() => {
    if (!folderId || folderId == 0) {
      setCurrentTestGroup(null)
      return
    }
    new TestGroupApi().get(folderId).then(response => {
      setCurrentTestGroup(response.data)
    })
  }, [folderId])

  const fetchData = () => {
    setLoading(true)
    new TestGroupApi()
      .searches({
        folderId: folderId,
        page: page + 1,
        limit: rowsPerPage
      })
      .then(response => {
        setData(response.data.value)
        setTotalItem(response.data.totalItems)
        setLoading(false)
      })
  }

  const onOk = () => {
    if (selectedValue) {
      onNodeSelected(selectedValue)
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
            Chọn Bộ đề thi
          </Typography>
          <IconButton edge='start' color='inherit' onClick={onClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <LoadingSpinner active={loading}>
        <Grid container spacing={6} justifyContent='center' alignItems='center'>
          <Grid item md={10} lg={8} sm={12}>
            <Grid container spacing={0} maxWidth={'lg'}>
              <Grid item xs={12} md={12} lg={12}>
                <br/>
                <Breadcrumbs
                  aria-label='breadcrumb'
                  style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}
                >
                  <Link
                    underline='hover'
                    color='primary'
                    href='#'
                    onClick={() => {
                      setFolderId(0)
                    }}
                  >
                    Bộ Đề thi
                  </Link>
                  {currentTestGroup &&
                    currentTestGroup.ancestors &&
                    currentTestGroup.ancestors.map(item => (
                      <Link
                        underline='hover'
                        href='#'
                        key={`l-${item.id}`}
                        color='primary'
                        onClick={() => {
                          setFolderId(item.id)
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  {currentTestGroup && <Typography color='text.primary'>{currentTestGroup.name}</Typography>}
                </Breadcrumbs>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Divider />
              </Grid>
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
                  onClick={() => {
                    if (onOk) {
                      onOk()
                      onClose()
                    }
                  }}
                >
                  Chọn
                </Button>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Divider />
                <TableContainer component={Paper} style={{ marginTop: 5 }}>
                  <Table sx={{}} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: 30 }}>STT </TableCell>
                        <TableCell style={{ width: 60 }}>Chọn</TableCell>
                        <TableCell>Tên</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data &&
                        data.map((item, index) => (
                          <TableRow
                            key={item.name}
                            sx={{
                              '&:last-of-type td, &:last-of-type th': {
                                border: 0
                              }
                            }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              {item.type != 1 && (
                                <Radio
                                  checked={selectedValue === item.id}
                                  onChange={handleChange}
                                  value={item.id}
                                  name='radio-buttons'
                                  inputProps={{ 'aria-label': 'A' }}
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              {item.type == 1 && (
                                <Typography
                                  variant='body1'
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => setFolderId(item.id)}
                                >
                                  <FolderIcon /> &nbsp;
                                  {item.name}
                                </Typography>
                              )}
                              {item.type != 1 && <Typography variant='body1'>{item.name}</Typography>}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LoadingSpinner>
    </Dialog>
  )
}
