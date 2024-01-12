import {
  Fragment,
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import { useAuth } from 'hooks/useAuth'
import Head from 'next/head'
import AboutOverivew from 'pages/user-profile/[tab]/profile/AboutOverivew'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const ProfileTab = ({ data }) => {
  const [report, setReportData] = useState(null)
  const [loading, setLoading] = useState(false)
  const auth = useAuth()

  useEffect(() => {
    if (auth.user) {
      setLoading(true)
      new V1Api().getAttemptActivityReport().then(response => {
        setReportData(response.data)
        setLoading(false)
      })
    }
  }, [])

  return data && Object.values(data).length ? (
    <Fragment>
      <Head>
        <title>{`Thông tin cá nhân`}</title>
      </Head>
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <AboutOverivew about={data} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container spacing={6}>
            {report && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <div>
                      <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                        Hoạt động 7 ngày nhất
                      </Typography>
                    </div>
                    <Typography variant='body2' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                      Thống kê theo trạng thái bài thi
                    </Typography>
                    <ResponsiveContainer height={260}>
                      <BarChart
                        height={260}
                        data={report}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5
                        }}
                      >
                        <CartesianGrid strokeDasharray='1 1' />
                        <XAxis dataKey='key' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='totalPassed' label='' barSize={50} stackId='a' fill='#4caf50' />
                        <Bar dataKey='totalFailed' label='' barSize={50} stackId='a' fill='#f44336' />
                      </BarChart>
                    </ResponsiveContainer>
                    <br />
                    <Typography variant='body2' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                      Thống kê theo số câu trả lời
                    </Typography>
                    <ResponsiveContainer height={260}>
                      <BarChart
                        height={260}
                        data={report}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5
                        }}
                      >
                        <CartesianGrid strokeDasharray='1 1' />
                        <XAxis dataKey='key' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey='totalCorrectQuestion'
                          barSize={50}
                          label='Trả lời Đúng'
                          stackId='a'
                          fill='#4caf50'
                        />
                        <Bar
                          dataKey='totalIncorrectQuestion'
                          barSize={50}
                          label='Trả lời Sai'
                          stackId='a'
                          fill='#f44336'
                        />
                        <Bar
                          dataKey='totalNoAnswerQuestion'
                          barSize={50}
                          label='Chưa trả lời'
                          stackId='a'
                          fill='#aab8c2'
                        />
                      </BarChart>
                    </ResponsiveContainer>
                    <br />
                    <Typography variant='body2' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                      Thống kê số lần thi
                    </Typography>
                    <ResponsiveContainer height={260}>
                      <BarChart
                        height={260}
                        data={report}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5
                        }}
                      >
                        <CartesianGrid strokeDasharray='1 1' />
                        <XAxis dataKey='key' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='total' barSize={50} label='Số lượt thi' stackId='a' fill='#4caf50' />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {/* <Grid item xs={12}>
              <Card>
                <CardContent>
                  <div>
                    <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                      Gói sản phẩm
                    </Typography>
                    Bạn đang dùng gói Standard
                  </div>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  ) : null
}

export default ProfileTab
