// ** Icon Import
import Icon from '@core/components/icon'
// ** Custom Component Import
import CustomChip from '@core/components/mui/chip'
// ** MUI Imports
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const PricingHeader = props => {
  // ** Props
  const { plan, handleChange } = props

  // ** Hook
  const hidden = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ mb: [10, 17.5], textAlign: 'center' }}>
      <Typography variant='h4'>Bản Giá Dịch Vụ</Typography>
      <Box sx={{ mt: 2.5, mb: 10.75 }}>
        <Typography variant='body2'>
          All plans include 40+ advanced tools and features to boost your product.
        </Typography>
        <Typography variant='body2'>Choose the best plan to fit your needs.</Typography>
      </Box>
      <Box sx={{ display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        <InputLabel
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
        {!hidden && (
          <Box
            sx={{
              top: -30,
              left: '50%',
              display: 'flex',
              position: 'absolute',
              transform: 'translateX(35%)',
              '& svg': { mt: 2, mr: 1, color: 'text.disabled' }
            }}
          >
            <Icon icon='mdi:arrow-down-left' />
            <CustomChip size='small' skin='light' color='primary' label='Save up to 10%' />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default PricingHeader
