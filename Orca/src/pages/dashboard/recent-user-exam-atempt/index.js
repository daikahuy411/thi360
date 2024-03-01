import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import Link from 'next/link'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

const RencentUserExamAttempt = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    new V1Api()
      .getRecentUserExamAttempt()
      .then(response => {
        setData(response.data)
        setLoading(false)
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
      })
  }

  return (
    <>
      <Grid container>
        <Grid item md={12}>
          <LoadingSpinner active={loading}>
            <Card>
              <CardContent>
                <div>
                  <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                    Lượt Thi gần nhất
                  </Typography>
                </div>
                <TableContainer component={Paper} style={{ marginTop: 5 }}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ textAlign: 'center', width: 50 }}>STT</TableCell>
                        <TableCell style={{ textAlign: 'center', width: 50 }}>Xem</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell style={{ width: 120 }}>Học viên</TableCell>
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
                                <IconButton aria-label='filter' component={Link} href={`/testing/review/${row?.token}`}>
                                  <Icon icon='bi:eye' fontSize={22} />
                                </IconButton>
                              </TableCell>
                              <TableCell component='th' scope='row'>
                                <Typography variant='body1'>{row?.name}</Typography>
                                <Link href={`/exam/${row?.examId}`} style={{ fontSize: 15 }}>
                                  {row?.examName}
                                </Link>
                              </TableCell>
                              <TableCell component='td' scope='row'>
                                {row?.user?.fullName} &nbsp;
                                {row?.user?.userName}
                              </TableCell>
                              {/* <TableCell component='td' scope='row'>
                            <b style={{ color: 'rgb(237, 91, 108)' }}>{row?.totalIncorrectQuestion}</b>
                          </TableCell>
                          <TableCell component='td' scope='row'>
                            <b style={{ color: 'rgb(80, 177, 103)' }}>{row?.totalCorrectQuestion}</b>
                          </TableCell> */}
                              <TableCell>
                                <b>{row?.score}</b>
                              </TableCell>
                              <TableCell>
                                {row?.isPassed && <span class='attempt-result attempt-result-pass'>Đạt</span>}
                                {!row?.isPassed && <span class='attempt-result attempt-result-fail'>Không đạt</span>}
                              </TableCell>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </LoadingSpinner>
        </Grid>
      </Grid>
    </>
  )
}

export default RencentUserExamAttempt
