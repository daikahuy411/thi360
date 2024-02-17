'use client'

import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'

import Icon from '@core/components/icon'
import MuiAvatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import AttemptWeeklyOverview from './attempt-weekly-overview'
import RencentUserExamAttempt from './recent-user-exam-atempt'
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
  const { title, icon, stats, color = 'primary' } = props

  return (
    <Card
      sx={
        {
          // backgroundColor: 'transparent !important',
          // boxShadow: theme => `${theme.shadows[0]} !important`,
          // border: theme => `1px solid ${theme.palette.divider}`
        }
      }
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

const TeacherDashboard = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [data, setData] = useState(false)
  const [plan, setPlan] = useState(null)

  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  useEffect(() => {
    new V1Api().getTenantUsage().then(response => {
      setData(response.data)
    })

    new V1Api().getCurrentUserPlans().then(response => {
      setPlan(response.data.value.find(x => x.pricingPlanType == 1))
    })
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <span className='title__label'>
          <span>Tổng quan</span>
        </span>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container spacing={6}>
          {data && (
            <>
              <Grid item xs={12} md={3} sm={6}>
                <CardStatsHorizontal
                  title='Lớp học'
                  stats={data.totalClass}
                  icon={<Icon icon={'mdi:accounts-outline'} />}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <CardStatsHorizontal
                  title='Học viên'
                  stats={data.totalUser}
                  icon={<Icon icon={'mdi:account-outline'} />}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <CardStatsHorizontal
                  title='Bộ Câu hỏi'
                  stats={data.totalQuestionCatalog}
                  icon={<Icon icon={'mdi:briefcase-outline'} />}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <CardStatsHorizontal
                  title='Câu hỏi'
                  stats={data.totalQuestion}
                  icon={<Icon icon={'mdi:question-mark-circle-outline'} />}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <CardStatsHorizontal
                  title='Kỳ thi'
                  stats={data.totalExam}
                  icon={<Icon icon={'mdi:trophy-outline'} />}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <CardStatsHorizontal
                  title='Bộ đề thi'
                  stats={data.totalTestGroup}
                  icon={<Icon icon={'mdi:book-cog-outline'} />}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <CardStatsHorizontal
                  title='Lượt thi'
                  stats={data.totalQuestion}
                  icon={<Icon icon={'mdi:check-circle-outline'} />}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        {domLoaded && <AttemptWeeklyOverview />}
        <br />
        {plan && <UserCurrentPlan userPlan={plan} />}
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <span className='title__label'>
          <span>Lượt Thi gần nhất</span>
        </span>
        <RencentUserExamAttempt />
        {/* <UserActivityTimeline /> */}
      </Grid>
    </Grid>
  )
}

export default TeacherDashboard
