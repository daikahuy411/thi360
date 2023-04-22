// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ExamCategoryTable from 'src/pages/apps/examcategory/list'
import EditHeader from './edit/Header'

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
