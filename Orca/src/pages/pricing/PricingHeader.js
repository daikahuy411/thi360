import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const PricingHeader = props => {
  return (
    <Box sx={{ mb: [8, 9], textAlign: 'center' }}>
      <Box sx={{ mt: 2.5, mb: 2 }}>
        <Typography variant='h5' color='primary'>BẠN ĐÃ SẴN SÀNG</Typography>
        <Typography variant='h6'>trải nghiệm Thi360 ngay hôm nay?</Typography>
        {/* <Typography variant='body2'>Chọn gói tốt nhất và phù hợp nhất với nhu cầu của bạn.</Typography> */}
      </Box>
    </Box>
  )
}

export default PricingHeader
