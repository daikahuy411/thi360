// ** Icon Imports
import Icon from '@core/components/icon'
// ** Custom Components Imports
import CustomAvatar from '@core/components/mui/avatar'
import OptionsMenu from '@core/components/option-menu'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const salesData = [
  {
    stats: '245k',
    title: 'Sales',
    color: 'primary',
    icon: 'mdi:trending-up'
  },
  {
    stats: '12.5k',
    title: 'Customers',
    color: 'success',
    icon: 'mdi:account-outline'
  },
  {
    stats: '1.54k',
    color: 'warning',
    title: 'Products',
    icon: 'mdi:label-variant-outline'
  },
  {
    stats: '$88k',
    color: 'info',
    title: 'Revenue',
    icon: 'mdi:currency-usd'
  }
]

const renderStats = () => {
  return salesData.map((sale, index) => (
    <Grid item xs={6} md={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar variant='rounded' color={sale.color} sx={{ mr: 3, boxShadow: 3 }}>
          <Icon icon={sale.icon} fontSize='1.75rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{sale.title}</Typography>
          <Typography variant='h6'>{sale.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const CardStatisticsTransactions = () => {
  return (
    <Card>
      <CardHeader
        title='Transactions'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <OptionsMenu
            options={['Refresh', 'Share', 'Update']}
            iconButtonProps={{ size: 'small', className: 'card-more-options', sx: { color: 'text.secondary' } }}
          />
        }
      />
      <CardContent>
        <Grid container>{renderStats()}</Grid>
      </CardContent>
    </Card>
  )
}

export default CardStatisticsTransactions
