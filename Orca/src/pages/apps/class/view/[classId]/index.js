import Grid from '@mui/material/Grid'

import TopNav from '../../_layout/_breadcrums'
import ClassTable from '../../_list'

const ListClassByFolderPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <ClassTable />
      </Grid>
    </Grid>
  )
}

export default ListClassByFolderPage
