import Grid from '@mui/material/Grid'

import TopNav from './_layout/_breadcrums'
import ExamTable from './_list'

const ClassApp = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <ExamTable />
      </Grid>
    </Grid>
  )
}

export default ClassApp
