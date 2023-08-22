// ** Demo Components
import AboutOverivew from 'views/pages/user-profile/profile/AboutOverivew'
import ActivityTimeline from 'views/pages/user-profile/profile/ActivityTimeline'

// import ConnectionsTeams from 'views/pages/user-profile/profile/ConnectionsTeams'
// import ProjectsTable from 'views/pages/user-profile/profile/ProjectsTable'
// ** MUI Components
import Grid from '@mui/material/Grid'

const ProfileTab = ({ data }) => {


  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item xl={4} md={5} xs={12}>
        {/* <AboutOverivew about={data.about} contacts={data.contacts} teams={data.teams} overview={data.overview} /> */}
        <AboutOverivew about={data} />
      </Grid>
      <Grid item xl={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ActivityTimeline />
          </Grid>
          {/* <ConnectionsTeams connections={data.connections} teams={data.teamsTech} /> */}
          <Grid item xs={12}>
            {/* <ProjectsTable /> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null
}

export default ProfileTab
