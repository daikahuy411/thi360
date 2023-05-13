import Grid from '@mui/material/Grid'

import TopNav from './_layout/_breadcrums'
import ClassTable from './_list'

const ClassApp = () => {
  return (
    <Grid container spacing={6}>
      {/* <PageHeader
        title={<Typography variant='h5'>Lớp học</Typography>}
        subtitle={
          <Typography variant='body2'>
            A role provided access to predefined menus and features so that depending on assigned role an administrator
            can have access to what he need
          </Typography>
        }
      /> */}
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <ClassTable />
      </Grid>
    </Grid>
  )
}

export default ClassApp
