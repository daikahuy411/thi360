// ** Demo Components
import AboutOverivew from 'views/pages/user-profile/profile/AboutOverivew'

// ** MUI Components
import Grid from '@mui/material/Grid'

// import ExamAttempHistory from './ExamAttempHistory'

const ProfileTab = ({ data }) => {


  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item xl={6} md={8} xs={12}>
        <AboutOverivew about={data} />
      </Grid>
      {/* <Grid item xl={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ExamAttempHistory />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  ) : null
}

export default ProfileTab
