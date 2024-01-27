import * as React from 'react'
import { useState } from 'react'

import Icon from '@core/components/icon'
import MuiAvatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import AttemptWeeklyOverview from './attempt-weekly-overview'
import UserActivityTimeline from './user-activity-timeline'
import UserCurrentPlan from './user-curent-plan'

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 44,
  height: 44,
  boxShadow: theme.shadows[3],
  marginRight: theme.spacing(2.75),
  backgroundColor: theme.palette.background.paper,
  '& svg': {
    fontSize: '1.75rem'
  }
}))

const CardStatsHorizontal = props => {
  // ** Props
  const { title, icon, stats, trendNumber, color = 'primary', trend = 'positive' } = props

  return (
    <Card
      sx={{
        backgroundColor: 'transparent !important',
        boxShadow: theme => `${theme.shadows[0]} !important`,
        border: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar variant='rounded' sx={{ color: `${color}.main` }}>
            {icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body'>{title}</Typography>
            <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant='h6' sx={{ mr: 1, fontWeight: 600, lineHeight: 1.05 }}>
                {stats}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

const cardStatsData = {
  statsHorizontal: [
    {
      stats: '2,856',
      trend: 'negative',
      trendNumber: '10.2%',
      title: 'Học viên',
      icon: 'mdi:account-outline'
    },
    {
      stats: '28.6K',
      trendNumber: '25.8%',
      title: 'Lớp học',
      icon: 'mdi:accounts'
    },
    {
      stats: '16.6K',
      trend: 'negative',
      trendNumber: '12.1%',
      title: 'Kỳ thi',
      icon: 'mdi:trophy-outline'
    },
    {
      stats: '2,856',
      icon: 'mdi:question-mark-circle-outline',
      trendNumber: '54.6%',
      title: 'Câu hỏi'
    },
    {
      stats: '2,856',
      icon: 'mdi:briefcase-outline',
      trendNumber: '54.6%',
      title: 'Bộ Câu hỏi'
    },
    {
      stats: '2,856',
      icon: 'mdi:book-cog-outline',
      trendNumber: '54.6%',
      title: 'Bộ Đề thi'
    },
    {
      stats: '2,856',
      icon: 'mdi:check-circle-outline',
      trendNumber: '54.6%',
      title: 'Lượt thi'
    }
  ]
}

const TeacherDashboard = () => {
  // ** States
  const [show, setShow] = useState(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <span className='title__label'>
          <span>Tổng quan</span>
        </span>
      </Grid>
      {cardStatsData.statsHorizontal.map((item, index) => {
        return (
          <Grid item xs={12} md={3} sm={6} key={index}>
            <CardStatsHorizontal {...item} icon={<Icon icon={item.icon} />} />
          </Grid>
        )
      })}
      <Grid item xs={12} md={5} lg={5}>
        <UserCurrentPlan />
      </Grid>
      <Grid item xs={12} md={7} lg={7}>
        <AttemptWeeklyOverview />
        <br />
        <UserActivityTimeline />
      </Grid>
    </Grid>
  )
}

export default TeacherDashboard
