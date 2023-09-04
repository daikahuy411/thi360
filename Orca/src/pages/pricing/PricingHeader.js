// ** MUI Imports
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icon Import
import Icon from '@core/components/icon'

// ** Custom Component Import
import CustomChip from '@core/components/mui/chip'

const PricingHeader = props => {
  // ** Props
  const { plan, handleChange } = props

  // ** Hook
  const hidden = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ mb: [8, 9], textAlign: 'center' }}>
      <Typography variant='h4'>Pricing Plans</Typography>
      <Box sx={{ mt: 2.5, mb: 2 }}>
        <Typography variant='body2'>
          All plans include 40+ advanced tools and features to boost your product.
        </Typography>
        <Typography variant='body2'>Choose the best plan to fit your needs.</Typography>
      </Box>
      <Box sx={{ display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        {/* <InputLabel
          htmlFor='pricing-switch'
          sx={{ fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
        >
          Monthly
        </InputLabel>
        <Switch id='pricing-switch' onChange={handleChange} checked={plan === 'annually'} />
        <InputLabel
          htmlFor='pricing-switch'
          sx={{ fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
        >
          Annually
        </InputLabel>
        {!hidden && ( */}
        {/* <Box>
          <CustomChip size='large' skin='light' color='primary' label='Giảm 10% khi mua 1 năm' />
        </Box> */}
        {/* )} */}
      </Box>
    </Box>
  )
}

export default PricingHeader
