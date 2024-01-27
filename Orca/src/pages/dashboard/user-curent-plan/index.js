import Link from 'next/link'

// ** Icon Imports
import Icon from '@core/components/icon'
import CustomChip from '@core/components/mui/chip'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

const UserCurrentPlan = ({ userPlan }) => {
  return (
    <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
      <CardContent sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', justifyContent: 'space-between' }}>
        <CustomChip
          skin='light'
          size='small'
          color='primary'
          label={` ${userPlan.plan.typeName} - ${userPlan.plan.name}`}
        />
        <Box sx={{ display: 'flex', position: 'relative' }}>
          <Typography variant='h6' sx={{ color: 'primary.main', alignSelf: 'flex-end' }}>
            đ
          </Typography>
          <Typography
            variant='h3'
            sx={{
              color: 'primary.main'
            }}
          >
            {userPlan.plan.price}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.primary', alignSelf: 'flex-end' }}>
            / tháng
          </Typography>
        </Box>
      </CardContent>
      <CardContent>
        <Box sx={{ mt: 6, mb: 5 }}>
          {userPlan.plan.itemPlanBenefits &&
            userPlan.plan.itemPlanBenefits.map(item => (
              <Box
                key={`benefit-${item.id}`}
                sx={{ display: 'flex', mb: 3.5, alignItems: 'center', '& svg': { mr: 2, color: 'grey.300' } }}
              >
                <Icon icon='mdi:circle' fontSize='0.5rem' />
                <Typography variant='body2'>{item.name}</Typography>
              </Box>
            ))}
        </Box>
        <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
          <Typography variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            Sử dụng
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {userPlan.totalDays - userPlan.remainingDays} của {userPlan.totalDays} ngày
          </Typography>
        </Box>
        <LinearProgress
          value={(userPlan.remainingDays / userPlan.totalDays) * 100}
          variant='determinate'
          sx={{ height: 6, borderRadius: '5px' }}
        />
        <Typography variant='caption' sx={{ mt: 1.5, mb: 6, display: 'block' }}>
          {userPlan.remainingDays} ngày còn lại
        </Typography>
        <Button variant='contained' component={Link} href='/pricing' sx={{ width: '100%' }}>
          Mua thêm
        </Button>
      </CardContent>
    </Card>
  )
}

export default UserCurrentPlan
