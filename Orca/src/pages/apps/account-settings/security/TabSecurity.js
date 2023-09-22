// ** Demo Components
// import CreateApiKey from 'src/views/pages/account-settings/security/CreateApiKey'
import ChangePasswordCard from 'pages/apps/account-settings/security/ChangePasswordCard'

// ** Icon Imports
import Icon from '@core/components/icon'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// import TwoFactorAuthentication from 'src/views/pages/account-settings/security/TwoFactorAuthentication'

const apiKeyList = [
  {
    title: 'Server Key 1',
    access: 'Full Access',
    date: '28 Apr 2021, 18:20 GTM+4:10',
    key: '23eaf7f0-f4f7-495e-8b86-fad3261282ac'
  },
  {
    title: 'Server Key 2',
    access: 'Read Only',
    date: '12 Feb 2021, 10:30 GTM+2:30',
    key: 'bb98e571-a2e2-4de8-90a9-2e231b5e99'
  },
  {
    title: 'Server Key 3',
    access: 'Full Access',
    date: '28 Dec 2021, 12:21 GTM+4:10',
    key: '2e915e59-3105-47f2-8838-6e46bf83b711'
  }
]

const recentDeviceData = [
  {
    location: 'Switzerland',
    device: 'HP Spectre 360',
    date: '10, July 2021 20:07',
    browserName: 'Chrome on Windows',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'info.main' } }}>
        <Icon icon='mdi:microsoft-windows' fontSize={20} />
      </Box>
    )
  }
]

const TabSecurity = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ChangePasswordCard />
      </Grid>
      {/* <Grid item xs={12}>
        <TwoFactorAuthentication />
      </Grid> */}
      {/* <Grid item xs={12}>
        <CreateApiKey />
      </Grid> */}

      {/* Recent Devices Card*/}
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Lịch sử đăng nhập' />
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: 'customColors.tableHeaderBg' }}>
                <TableRow>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Browser</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Device</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Location</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Recent Activities</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentDeviceData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {row.browserIcon}
                        <Typography sx={{ whiteSpace: 'nowrap' }}>{row.browserName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }}>
                        {row.device}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }}>
                        {row.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }}>
                        {row.date}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid> */}
    </Grid>
  )
}

export default TabSecurity
