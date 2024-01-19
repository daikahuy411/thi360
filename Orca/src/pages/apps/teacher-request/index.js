import Grid from '@mui/material/Grid'

import TopNav from './_layout/_breadcrums'
import RequestTeacherTable from './_list'

const RequestTeacherApp = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <RequestTeacherTable />
      </Grid>
    </Grid>
  )
}

export default RequestTeacherApp
