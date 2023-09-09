// ** Demo Components
import AboutOverivew from 'pages/apps/user-profile/[tab]/profile/AboutOverivew'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
// ** MUI Components
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// import ExamAttempHistory from './ExamAttempHistory'

const ProfileTab = ({ data }) => {


  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item xl={6} md={8} xs={12}>
        <AboutOverivew about={data} />
      </Grid>
      <Grid item xl={6} md={4} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {/* <ExamAttempHistory /> */}
            <Card>
              <CardContent>
                <div>
                  <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                    Gói sản phẩm
                  </Typography>
                  Bạn đang dùng gói Standard
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null
}

export default ProfileTab
