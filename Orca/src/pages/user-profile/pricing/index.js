import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import moment from 'moment'
import Head from 'next/head'

import LoadingSpinner from '@core/components/loading-spinner'
import CustomChip from '@core/components/mui/chip'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

const MyPricingPage = () => {
  const [data, setData] = useState([])
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingOrder, setLoadingOrder] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    new V1Api().getCurrentUserPlans().then(response => {
      setData(response.data.value)
      setLoading(false)
    })

    setLoadingOrder(true)
    new V1Api().getOrderHistory().then(response => {
      setOrderData(response.data.value)
      setLoadingOrder(false)
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
          <LoadingSpinner active={loading}>
            <Grid container>
              <Grid item md={6} lg={6} xl={12}>
                {data &&
                  data.map(item => (
                    <>
                      <Card key={`pricing-${item.id}`}>
                        <CardHeader title={` ${item.plan.typeName} - ${item.plan.name}`} />
                        <CardContent>
                          <Grid container spacing={6}>
                            <Grid item xs={12} md={6}>
                              <Box sx={{ p: 4, borderRadius: 1, backgroundColor: 'action.hover' }}>
                                <div>
                                  <Typography sx={{ mb: 2, fontWeight: 600 }}>Chi tiết</Typography>
                                  <ul>
                                    {item.plan.itemPlanBenefits &&
                                      item.plan.itemPlanBenefits.map(item => (
                                        <li key={`benefit-${item.id}`}>
                                          <Typography sx={{ mb: 2, color: 'text.secondary' }}>{item.name}</Typography>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                                <div>
                                  <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                                    <Typography variant='body2' sx={{ mr: 4, fontWeight: 600, color: 'text.primary' }}>
                                      {item.plan.price} đ
                                    </Typography>
                                    {item.plan.isPopular && (
                                      <CustomChip skin='light' size='small' label='Phổ biến' color='primary' />
                                    )}
                                  </Box>
                                </div>
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ mt: [4, 4, 0] }}>
                              <Alert icon={false} severity='warning' sx={{ mb: 4 }}>
                                <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                                  We need your attention!
                                </AlertTitle>
                                Your plan requires updates
                              </Alert>
                              <Box sx={{ mb: 4 }}>
                                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                                  Ngày bắt đầu:
                                  <Typography variant='body1'>{moment(item.fromDate).format('DD-MM-YYYY')}</Typography>
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
                                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                                  Số ngày còn lại
                                </Typography>
                                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                                  {item.remainingDays} của {item.totalDays} ngày
                                </Typography>
                              </Box>
                              <LinearProgress
                                value={(item.remainingDays / item.totalDays) * 100}
                                variant='determinate'
                                sx={{ height: 10, borderRadius: '5px' }}
                              />
                              {/* <Typography variant='caption' sx={{ mt: 1.5, display: 'block' }}>
                                Your plan requires update
                              </Typography> */}
                            </Grid>
                            {/* <Grid item xs={12} sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                            <Button variant='contained' sx={{ mr: 4, mb: [4, 0] }}>
                            Upgrade Plan
                          </Button>
                          <Button variant='outlined' color='error'>
                            Cancel Subscription
                          </Button>
                          </Grid> */}
                          </Grid>
                        </CardContent>
                      </Card>
                      <br />
                    </>
                  ))}
              </Grid>
              <Grid item md={6} lg={6} xl={12}></Grid>
            </Grid>
          </LoadingSpinner>
        </Grid>
        <Grid item md={12} lg={10} xl={10}>
          <Card>
            <CardContent>
              <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                Lịch sử thanh toán
              </Typography>
              <LoadingSpinner active={loadingOrder}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 180 }}>Ngày tạo</TableCell>
                      <TableCell>Gói dịch vụ</TableCell>
                      <TableCell style={{ width: 120 }}>Giá</TableCell>
                      <TableCell style={{ width: 280 }}>Loại gói</TableCell>
                      <TableCell style={{ width: 180 }}>Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderData &&
                      orderData.map((row, index) => {
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
                            <TableCell>
                              <Typography variant='body1'>
                                {moment(row.createdTime).format('DD-MM-YYYY HH:mm')}
                              </Typography>
                            </TableCell>
                            <TableCell component='th' scope='row'>
                              {row.pricingPlan && <Typography variant='body1'>{row.pricingPlan.name}</Typography>}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                              {row.pricingPlan && <Typography variant='body1'>{row.pricingPlan.totalVN}</Typography>}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                              {row.pricingPlan && <Typography variant='body1'>{row.pricingPlan.typeName}</Typography>}
                            </TableCell>
                            <TableCell>
                              <Typography variant='body1'>{row.statusName}</Typography>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </LoadingSpinner>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default MyPricingPage
