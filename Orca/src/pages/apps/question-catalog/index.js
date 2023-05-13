import Grid from '@mui/material/Grid'

import TopNav from './_layout/_breadcrums'
import QuestionCatalogTable from './_list'

const QuestionCatalogApp = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <QuestionCatalogTable />
      </Grid>
    </Grid>
  )
}

export default QuestionCatalogApp
