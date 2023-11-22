import UserTable from 'pages/apps/account/_list'

import Grid from '@mui/material/Grid'

import TopNav from './_layout/_breadcrums'

const AccountApp = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <UserTable />
      </Grid>
    </Grid>
  )
}

export default AccountApp
