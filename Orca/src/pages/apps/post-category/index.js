import Grid from '@mui/material/Grid'

import TopNav from './_layout/_breadcrums'
import ExamCategoryTable from './_list'

const ExamCategoryApp = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <ExamCategoryTable />
      </Grid>
    </Grid>
  )
}

export default ExamCategoryApp
