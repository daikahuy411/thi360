// ** MUI Imports
import Grid from '@mui/material/Grid'

import EditHeader from './edit/Header'
import ExamCategoryTable from './list'

const RolesComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <EditHeader />
        <ExamCategoryTable />
      </Grid>
    </Grid>
  )
}

export default RolesComponent
