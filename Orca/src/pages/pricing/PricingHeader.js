import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const PricingHeader = props => {
  // ** Props
  const { plan, handleChange } = props

  // ** Hook
  const hidden = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ mb: [8, 9], textAlign: 'center' }}>
      <Typography variant='h5' >
        Bảng Giá Dịch Vụ
      </Typography>
      <Box sx={{ mt: 2.5, mb: 2 }}>
        <Typography variant='body2'>
          Tất cả các gói dịch vụ được phân loại tính năng để phù hợp với từng đối tượng người dùng.
        </Typography>
        <Typography variant='body2'>Chọn gói tốt nhất và phù hợp nhất với nhu cầu của bạn.</Typography>
      </Box>
    </Box>
  )
}

export default PricingHeader
