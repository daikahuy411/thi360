import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import moment from 'moment'

import LoadingSpinner from '@core/components/loading-spinner'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

const OrderHistoryTab = () => {
  const [orderData, setOrderData] = useState([])
  const [loadingOrder, setLoadingOrder] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoadingOrder(true)
    new V1Api().getOrderHistory().then(response => {
      setOrderData(response.data.value)
      setLoadingOrder(false)
    })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xl={12} md={12} xs={12}>
        <Card>
          <CardContent>
            <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
              Lịch sử thanh toán
            </Typography>
            <LoadingSpinner active={loadingOrder}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 200 }}>Ngày tạo</TableCell>
                    <TableCell>Gói dịch vụ</TableCell>
                    <TableCell style={{ width: 120 }}>Giá</TableCell>
                    <TableCell style={{ width: 280 }}>Loại gói</TableCell>
                    <TableCell style={{ width: 120 }}>Từ ngày</TableCell>
                    <TableCell style={{ width: 120 }}>Tới ngày</TableCell>
                    <TableCell style={{ width: 140 }}>Trạng thái</TableCell>
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
                            <Typography variant='body2'>
                              {moment(row.createdTime).format('DD-MM-YYYY HH:mm')}
                            </Typography>
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {row.pricingPlan && <Typography variant='body2'>{row.pricingPlan.name}</Typography>}
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {row.pricingPlan && <Typography variant='body2'>{row.pricingPlan.totalVN}</Typography>}
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {row.pricingPlan && <Typography variant='body2'>{row.pricingPlan.typeName}</Typography>}
                          </TableCell>
                          <TableCell>
                            {row.fromDate && (
                              <Typography variant='body2'>{moment(row.fromDate).format('DD-MM-YYYY')}</Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {row.toDate && (
                              <Typography variant='body2'>{moment(row.toDate).format('DD-MM-YYYY')}</Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography variant='body2'>{row.statusName}</Typography>
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
  )
}

export default OrderHistoryTab
