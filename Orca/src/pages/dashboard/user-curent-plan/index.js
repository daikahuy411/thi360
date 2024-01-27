// ** Icon Imports
import Icon from '@core/components/icon'
import CustomChip from '@core/components/mui/chip'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

const UserCurrentPlan = () => {
   // Handle Upgrade Plan dialog
   const handlePlansClickOpen = () => setOpenPlans(true)

  return (
    <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
      <CardContent sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', justifyContent: 'space-between' }}>
        <CustomChip skin='light' size='small' color='primary' label='Standard' />
        <Box sx={{ display: 'flex', position: 'relative' }}>
          <Typography variant='h6' sx={{ color: 'primary.main', alignSelf: 'flex-end' }}>
            $
          </Typography>
          <Typography
            variant='h3'
            sx={{
              color: 'primary.main'
            }}
          >
            99
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.primary', alignSelf: 'flex-end' }}>
            / month
          </Typography>
        </Box>
      </CardContent>
      <CardContent>
        <Box sx={{ mt: 6, mb: 5 }}>
          <Box sx={{ display: 'flex', mb: 3.5, alignItems: 'center', '& svg': { mr: 2, color: 'grey.300' } }}>
            <Icon icon='mdi:circle' fontSize='0.5rem' />
            <Typography variant='body2'>10 Users</Typography>
          </Box>
          <Box
            sx={{
              mb: 3.5,
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 2, color: 'grey.300' }
            }}
          >
            <Icon icon='mdi:circle' fontSize='0.5rem' />
            <Typography variant='body2'>Up to 10GB storage</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 2, color: 'grey.300' }
            }}
          >
            <Icon icon='mdi:circle' fontSize='0.5rem' />
            <Typography variant='body2'>Basic Support</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
          <Typography variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            Days
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            26 of 30 Days
          </Typography>
        </Box>
        <LinearProgress value={86.66} variant='determinate' sx={{ height: 6, borderRadius: '5px' }} />
        <Typography variant='caption' sx={{ mt: 1.5, mb: 6, display: 'block' }}>
          4 days remaining
        </Typography>
        <Button variant='contained' sx={{ width: '100%' }} onClick={handlePlansClickOpen}>
          Upgrade Plan
        </Button>
      </CardContent>
    </Card>
  )
}

export default UserCurrentPlan
