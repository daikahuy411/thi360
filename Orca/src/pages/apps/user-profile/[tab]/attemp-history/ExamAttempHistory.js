import {
  useEffect,
  useState
} from 'react'

import TestingApi from 'api/testing-api'
import moment from 'moment'
import TableLoading from 'pages/shared/loading/TableLoading'
import TableEmpty from 'pages/shared/table/TableEmpty'
import {
  Helmet,
  HelmetProvider
} from 'react-helmet-async'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

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
      Limit: rowsPerPage,
    }
    new TestingApi()
      .UserExamAttemptHistory(param)
      .then(response => {

        console.log('UserExamAttemptHistory:', response.data)
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
      .catch((e) => {
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
          <Grid item md={3}>
          </Grid>
          <Grid item md={4}>
          </Grid>
          <Grid item md={5} alignContent={'right'}>
            <TablePagination
              labelRowsPerPage={'Số dòng/trang:'}
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
                <TableCell>Tên</TableCell>
                <TableCell style={{ width: 200 }}>Cấp bậc</TableCell>
                <TableCell style={{ width: 200 }}>Thời gian thi</TableCell>
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
                      <TableCell component='th' scope='row'>
                        <strong>{row.name}</strong>
                        <br />Số câu hỏi: <i>{row.totalQuestion}</i> - Trả lời đúng: <i>{row.totalCorrectQuestion}</i> - Trả lời sai: <i>{row.totalIncorrectQuestion}</i> - Không trả lời: <i>{row.totalNoAnswerQuestion}</i>
                      </TableCell>
                      <TableCell component='td' scope='row'>
                        Phá đảo
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        {moment(row.startDate).format('DD/MM/YYYY hh:mm')}
                        <br />
                        &#126;
                        <br />
                        {moment(row.endDate).format('DD/MM/YYYY hh:mm')}
                      </TableCell>
                    </TableRow>
                  )
                })}
              <TableLoading isOpen={loading} colSpan={4} />
              <TableEmpty isOpen={isTableEmpty} colSpan={4} />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={'Số dòng/trang:'}
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
