import UserTable from 'src/pages/apps/user/_list'

import Grid from '@mui/material/Grid'

import TopNav from './_layout/_breadcrums'

const UserApp = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <UserTable />
      </Grid>
    </Grid>
  )
}

export default UserApp
