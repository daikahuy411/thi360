// ** Icon Imports
import Icon from '@core/components/icon'
// ** Custom Components Imports
import CustomAvatar from '@core/components/mui/avatar'
import Button from '@mui/material/Button'
// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const CardSupport = () => {
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <CustomAvatar skin='light' sx={{ width: 50, height: 50, mb: 2.25 }}>
          <Icon icon='mdi:help-circle-outline' fontSize='2rem' />
        </CustomAvatar>
        <Typography variant='h6' sx={{ mb: 2.75 }}>
          Support
        </Typography>
        <Typography variant='body2' sx={{ mb: 6 }}>
          According to us blisters are a very common thing and we come across them very often in our daily lives. It is
          a very common occurrence like cold or fever depending upon your lifestyle.
        </Typography>
        <Button variant='contained' sx={{ p: theme => theme.spacing(1.75, 5.5) }}>
          Contact Now
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardSupport
