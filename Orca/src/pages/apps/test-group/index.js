import Grid from '@mui/material/Grid'

import TopNav from './_layout/_breadcrums'
import TestGroupTable from './_list'

const TestGroupApp = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <TestGroupTable />
      </Grid>
    </Grid>
  )
}

export default TestGroupApp
