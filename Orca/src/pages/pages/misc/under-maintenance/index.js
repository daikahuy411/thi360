// ** Next Import
import Link from 'next/link'
// ** Demo Imports
import FooterIllustrations from 'views/pages/misc/FooterIllustrations'

// ** Layout Import
import BlankLayout from '@core/layouts/BlankLayout'
import Box from '@mui/material/Box'
// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(9.75),
  marginBottom: theme.spacing(9.75),
  [theme.breakpoints.down('lg')]: {
    height: 450
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  left: '0.375rem',
  bottom: '5.5rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    left: 0,
    bottom: 0
  }
}))

const UnderMaintenance = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
            Under Maintenance! 🚧
          </Typography>
          <Typography variant='body2'>
            Sorry for the inconvenience but we&prime;re performing some maintenance at the moment
          </Typography>
        </BoxWrapper>
        <Img height='487' alt='under-maintenance-illustration' src='/images/pages/misc-under-maintenance.png' />
        <Button href='/' component={Link} variant='contained' sx={{ px: 5.5 }}>
          Back to Home
        </Button>
      </Box>
      <FooterIllustrations image={<TreeIllustration alt='tree' src='/images/pages/tree-3.png' />} />
    </Box>
  )
}
UnderMaintenance.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default UnderMaintenance
