import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import Head from 'next/head'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const MyPricingPage = () => {
  const [value, setValue] = useState('student')
  const [promotions, setPromotions] = useState([])
  const [plans, setPlans] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    new V1Api().getPromotions().then(response => {
      const data = response.data.value
      setPromotions(data)
      console.log('data-promotions:', data)
    })

    new V1Api().getPricingPlans().then(response => {
      const data = response.data.value
      setPlans(data)
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
          <Card>
            <CardContent>
              <br />
              <Box sx={{ mb: [8, 9], textAlign: 'center' }}>
                <Typography variant='h5'>Lịch sử thanh toán</Typography>
                <Box sx={{ mt: 2.5, mb: 2 }}>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default MyPricingPage
