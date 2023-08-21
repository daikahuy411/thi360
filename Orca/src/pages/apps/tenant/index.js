import Grid from '@mui/material/Grid'

import TopNav from './_layout/_breadcrums'
import TenantTable from './_list'

const TenantApp1 = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <TenantTable />
      </Grid>
    </Grid>
  )
}

export default TenantApp1
