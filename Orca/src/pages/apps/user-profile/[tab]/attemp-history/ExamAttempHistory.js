import { useEffect, useState } from 'react'
import TestingApi from 'api/testing-api'
import moment from 'moment'
import TableEmpty from 'pages/shared/table/TableEmpty'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import EditIcon from '@mui/icons-material/Edit'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingSpinner from '@core/components/loading-spinner'
import Link from 'next/link'

const ExamAttempHistory = () => {
  const [data, setData] = useState()
  const [totalItem, setTotalItem] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
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
  }, [page, rowsPerPage])

  const fetchData = () => {
    setLoading(true)
    const param = {
      Page: page + 1,
      Limit: rowsPerPage
    }
    new TestingApi()
      .UserExamAttemptHistory(param)
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
          <title>Lịch sử thi</title>
        </Helmet>
        <Grid container>
          <Grid item md={3}></Grid>
          <Grid item md={4}></Grid>
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
        </Grid>
        <LoadingSpinner active={loading}>
          <TableContainer component={Paper} style={{ marginTop: 5 }}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell style={{ width: 50 }}></TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell style={{ width: 110 }}>Câu đúng</TableCell>
                  <TableCell style={{ width: 110 }}>Câu sai</TableCell>
                  <TableCell style={{ width: 120 }}>Chưa trả lời</TableCell>
                  <TableCell style={{ width: 90 }}>Điểm</TableCell>
                  <TableCell style={{ width: 290 }}>Thời gian thi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        role='checkbox'
                        key={row.id}
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
                          <IconButton aria-label='filter' component={Link} href={`/testing/review/${row.token}`}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <Typography variant='body1'>
                            [{row.id}]-{row.name}
                          </Typography>
                        </TableCell>
                        <TableCell component='td' scope='row'>
                          {row.totalCorrectQuestion}
                        </TableCell>
                        <TableCell component='td' scope='row'>
                          {row.totalIncorrectQuestion}
                        </TableCell>
                        <TableCell component='td' scope='row'>
                          {row.totalNoAnswerQuestion}
                        </TableCell>
                        <TableCell component='td' scope='row'>
                          {row.score}
                        </TableCell>
                        <TableCell style={{ textAlign: 'center' }}>
                          {moment(row.startDate).format('DD/MM/YYYY hh:mm')}
                          &nbsp;&gt;&nbsp;
                          {moment(row.endDate).format('DD/MM/YYYY hh:mm')}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                <TableEmpty isOpen={isTableEmpty} colSpan={4} />
              </TableBody>
            </Table>
          </TableContainer>
        </LoadingSpinner>
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
      </HelmetProvider>
    </>
  )
}

export default ExamAttempHistory
