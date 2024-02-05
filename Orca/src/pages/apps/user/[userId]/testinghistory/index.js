import {
  useEffect,
  useState
} from 'react'

import TestingApi from 'api/testing-api'
import themeConfig from 'configs/themeConfig'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Helmet,
  HelmetProvider
} from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { selectedUser } from 'store/slices/userSlice'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
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
import Typography from '@mui/material/Typography'

import TopNav from '../../_layout/_breadcrums'
import Nav from '../../_layout/_tabs'

const UserExamAttempHistory = () => {
  const [data, setData] = useState()
  const [totalItem, setTotalItem] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const currentUser = useSelector(selectedUser)
  const { userId, classId } = router.query

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
    setLoading(true)
    // const param = {
    //   Page: page + 1,
    //   Limit: rowsPerPage
    // }
    new TestingApi()
      .UserExamAttemptHistory({ userId: userId })
      .then(response => {
        const data = response.data
        if (data.isSuccess) {
          if (data.value) {
            setData(data.value)
            setTotalItem(data.totalItems)
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

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{`Lịch sử thi trên ${themeConfig?.templateName}`}</title>
        </Helmet>

        <div style={{ padding: 0 }}>
          <div sx={{ py: 5.375 }} style={{ padding: 0 }}>
            <>
              <TopNav />
              <Box style={{ marginTop: 2 }}>
                <div className='grid-block vertical'>
                  <div className='title-bar' id='EntityHeadingTitleBar'>
                    <h3 className='title left'>
                      <span className='title__label'>
                        {currentUser && currentUser.id != '0' && (
                          <span>
                            {currentUser.userName} - {currentUser.fullName}
                          </span>
                        )}
                        {(!currentUser || currentUser.id == 0) && <span>Tạo mới Học viên</span>}
                      </span>
                      {currentUser && currentUser.id != '' && (
                        <IconButton aria-label='info'>
                          <HelpOutlineIcon />
                        </IconButton>
                      )}
                    </h3>
                    <span className='right'>
                      {currentUser && currentUser.id != '0' && (
                        <>
                          <IconButton aria-label='delete'></IconButton>
                          &nbsp;
                        </>
                      )}
                      <Button
                        variant='outlined'
                        component={Link}
                        href={classId ? `/apps/class/${classId}/users/${currentUser.id}` : `/apps/user/${currentUser.id}`}
                      >
                        <ArrowBackIcon />
                        &nbsp;Quay lại
                      </Button>
                    </span>
                  </div>
                  <div className='grid-block'>
                    <Nav />
                    <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                      <Grid container>

                        <Grid item md={5} alignContent={'right'}>
                          <TablePagination
                            labelRowsPerPage={'Hiển thị:'}
                            rowsPerPageOptions={[10, 25, 100]}
                            component='div'
                            count={totalItem}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        </Grid>
                        <Grid item md={12}>
                          <LoadingSpinner active={loading}>
                            <TableContainer component={Paper} style={{ marginTop: 5 }}>
                              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                                <TableHead>
                                  <TableRow>
                                    <TableCell style={{ textAlign: 'center', width: 50 }}>STT</TableCell>
                                    <TableCell style={{ textAlign: 'center', width: 50 }}>Xem</TableCell>
                                    <TableCell>Tên</TableCell>
                                    <TableCell style={{ width: 120 }}>Chưa trả lời</TableCell>
                                    <TableCell style={{ width: 110 }}>Câu sai</TableCell>
                                    <TableCell style={{ width: 110 }}>Câu đúng</TableCell>
                                    <TableCell style={{ width: 90 }}>Điểm</TableCell>
                                    <TableCell style={{ width: 160 }}>Trạng thái</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {data &&
                                    data?.map((row, index) => {
                                      return (
                                        <TableRow
                                          hover
                                          tabIndex={-1}
                                          role='checkbox'
                                          key={row?.id}
                                          sx={{
                                            '&:last-of-type td, &:last-of-type th': {
                                              border: 0
                                            }
                                          }}
                                        >
                                          <TableCell component='th' scope='row' align='center'>
                                            <Typography variant='body1'>{index + 1}</Typography>
                                          </TableCell>
                                          <TableCell component='td' scope='row' style={{ width: 50 }}>
                                            <IconButton
                                              aria-label='filter'
                                              component={Link}
                                              href={`/testing/review/${row?.token}`}
                                            >
                                              <Icon icon='bi:eye' fontSize={22} />
                                            </IconButton>
                                          </TableCell>
                                          <TableCell component='th' scope='row'>
                                            <Typography variant='body1'>
                                              [{row?.id}]-{row?.name}
                                            </Typography>
                                            <Typography variant='body1'>
                                              {moment(row?.startDate).format('DD-MM-YYYY hh:mm')}
                                              &nbsp;&gt;&nbsp;
                                              {moment(row?.endDate).format('DD-MM-YYYY hh:mm')}
                                            </Typography>
                                            <Link href={`/exam/${row?.examId}`} style={{ fontSize: 15 }}>
                                              {row?.examName}
                                            </Link>
                                          </TableCell>
                                          <TableCell component='td' scope='row'>
                                            {row?.totalNoAnswerQuestion}
                                          </TableCell>
                                          <TableCell component='td' scope='row'>
                                            <b style={{ color: 'rgb(237, 91, 108)' }}>{row?.totalIncorrectQuestion}</b>
                                          </TableCell>
                                          <TableCell component='td' scope='row'>
                                            <b style={{ color: 'rgb(80, 177, 103)' }}>{row?.totalCorrectQuestion}</b>
                                          </TableCell>
                                          <TableCell>
                                            <b>{row?.score}</b>
                                          </TableCell>
                                          <TableCell>
                                            {row?.isPassed && <span class='attempt-result attempt-result-pass'>Đạt</span>}
                                            {!row?.isPassed && (
                                              <span class='attempt-result attempt-result-fail'>Không đạt</span>
                                            )}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </LoadingSpinner>
                        </Grid>
                        <Grid item md={12}>
                          <TablePagination
                            labelRowsPerPage={'Hiển thị:'}
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
                    </div>
                  </div>
                </div>
              </Box>
            </>
          </div>
        </div>
      </HelmetProvider>
    </>
  )
}

export default UserExamAttempHistory
