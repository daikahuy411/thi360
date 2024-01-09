import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import Head from 'next/head'

import CustomChip from '@core/components/mui/chip'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

const MyPricingPage = () => {
  const [data, setData] = useState([])
  const [orderData, setOrderData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    new V1Api().getCurrentUserPlans().then(response => {
      setData(response.data.value)
    })
  }

  return (
    <>
      <Head>
        <title>{`Thông tin gói dịch vụ`}</title>
      </Head>
      <Grid container spacing={8} justifyContent='center'>
        <Grid item md={12} lg={10} xl={10}>
          <Card>
            <CardContent>
              <br />
              <Box sx={{ mb: [8, 9], textAlign: 'center' }}>
                <Typography variant='h5'>Thông tin gói dịch vụ đang sử dụng</Typography>
                <Box sx={{ mt: 2.5, mb: 2 }}>
                  <Typography variant='body2'>
                    Tất cả các gói dịch vụ được phân loại tính năng để phù hợp với từng đối tượng người dùng.
                  </Typography>
                  <Typography variant='body2'>Chọn gói tốt nhất và phù hợp nhất với nhu cầu của bạn.</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={12} lg={10} xl={10}>
          <Grid container>
            <Grid item md={6} lg={6} xl={12}>
              {/* <UserViewBilling /> */}
              {data &&
                data.map(item => (
                  <Card key={`pricing-${item.id}`}>
                    <CardHeader title='Current plan' />
                    <CardContent>
                      <Grid container spacing={6}>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 4 }}>
                            <Typography variant='body2'>
                              Your Current Plan is{' '}
                              <Typography component='span' sx={{ fontWeight: 600 }}>
                                {item.plan.name}
                              </Typography>
                            </Typography>
                            <Typography variant='body2'>A simple start for everyone</Typography>
                          </Box>
                          <Box sx={{ mb: 4 }}>
                            <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                              Active until Dec 09, 2021
                            </Typography>
                            <Typography variant='body2'>
                              We will send you a notification upon Subscription expiration
                            </Typography>
                          </Box>
                          <div>
                            <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                              <Typography variant='body2' sx={{ mr: 4, fontWeight: 600, color: 'text.primary' }}>
                                $99 Per Month
                              </Typography>
                              <CustomChip skin='light' size='small' label='Popular' color='primary' />
                            </Box>
                            <Typography variant='body2'>Standard plan for small to medium businesses</Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ mt: [4, 4, 0] }}>
                          <Alert icon={false} severity='warning' sx={{ mb: 4 }}>
                            <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                              We need your attention!
                            </AlertTitle>
                            Your plan requires updates
                          </Alert>
                          <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
                            <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                              Days
                            </Typography>
                            <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                              26 of 30 Days
                            </Typography>
                          </Box>
                          <LinearProgress
                            value={86.6666666}
                            variant='determinate'
                            sx={{ height: 10, borderRadius: '5px' }}
                          />
                          <Typography variant='caption' sx={{ mt: 1.5, display: 'block' }}>
                            Your plan requires update
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                          <Button variant='contained' sx={{ mr: 4, mb: [4, 0] }}>
                            Upgrade Plan
                          </Button>
                          <Button variant='outlined' color='error'>
                            Cancel Subscription
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
            </Grid>
            <Grid item md={6} lg={6} xl={12}></Grid>
          </Grid>
        </Grid>
        <Grid item md={6} lg={6} xl={6} sm={12}>
          <Card>
            <CardContent>
              <br />
              <Box sx={{ mb: [8, 9], textAlign: 'center' }}>
                <Typography variant='h5'>Lịch sử thanh toán</Typography>
                <Box sx={{ mt: 2.5, mb: 2 }}></Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default MyPricingPage
