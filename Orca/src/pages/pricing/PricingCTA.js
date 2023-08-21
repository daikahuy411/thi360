// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// ** Util Import
import { hexToRGBA } from '@core/utils/hex-to-rgba'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(11.25, 36),
  backgroundColor: hexToRGBA(theme.palette.primary.main, 0.04),
  [theme.breakpoints.down('xl')]: {
    padding: theme.spacing(11.25, 20)
  },
  [theme.breakpoints.down('md')]: {
    textAlign: 'center'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(10, 5)
  }
}))

const GridStyled = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    order: -1
  }
}))

const Img = styled('img')(({ theme }) => ({
  bottom: 0,
  right: 144,
  width: 248,
  position: 'absolute',
  [theme.breakpoints.down('md')]: {
    width: 200,
    position: 'static'
  },
  [theme.breakpoints.down('sm')]: {
    width: 180
  }
}))

const PricingCTA = () => {
  return (
    <BoxWrapper>
      <Grid container spacing={5}>
        <Grid item xs={12} md={8}>
          <Typography variant='h5' sx={{ mb: 2.5, color: 'primary.main' }}>
            Bạn muốn thử trước?
          </Typography>
          <Typography sx={{ mb: 10, color: 'text.secondary' }}>
            Liên hệ với chúng tôi hoặc nhắn tin để sử dụng miễn phí hệ thống với toàn bộ tính năng trong vòng 14 ngày.
          </Typography>
          <Button variant='contained'>Miễn phí 14 ngày</Button>
        </Grid>
        <GridStyled item xs={12} md={4}>
          <Img alt='pricing-cta-avatar' src='/images/pages/pose-f-9.png' />
        </GridStyled>
      </Grid>
    </BoxWrapper>
  )
}

export default PricingCTA
