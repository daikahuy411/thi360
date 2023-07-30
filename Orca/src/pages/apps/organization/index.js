import Grid from '@mui/material/Grid'

import TopNav from './_layout/_breadcrums'
import OrganizationTable from './_list'

const OrganizationApp = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <OrganizationTable />
      </Grid>
    </Grid>
  )
}

export default OrganizationApp
