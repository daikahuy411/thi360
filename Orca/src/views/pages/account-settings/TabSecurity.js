import ChangePasswordCard from 'views/pages/account-settings/security/ChangePasswordCard'
// ** Demo Components
import CreateApiKey from 'views/pages/account-settings/security/CreateApiKey'
import TwoFactorAuthentication from 'views/pages/account-settings/security/TwoFactorAuthentication'

// ** Icon Imports
import Icon from '@core/components/icon'
// ** Custom Components Imports
import CustomChip from '@core/components/mui/chip'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

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
  },
  {
    location: 'Australia',
    device: 'iPhone 12x',
    date: '13, July 2021 10:10',
    browserName: 'Chrome on iPhone',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'error.main' } }}>
        <Icon icon='mdi:cellphone' fontSize={20} />
      </Box>
    )
  },
  {
    location: 'Dubai',
    device: 'Oneplus 9 Pro',
    date: '14, July 2021 15:15',
    browserName: 'Chrome on Android',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'success.main' } }}>
        <Icon icon='mdi:android' fontSize={20} />
      </Box>
    )
  },
  {
    location: 'India',
    device: 'Apple iMac',
    date: '16, July 2021 16:17',
    browserName: 'Chrome on MacOS',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'secondary.main' } }}>
        <Icon icon='mdi:apple' fontSize={20} />
      </Box>
    )
  },
  {
    location: 'Switzerland',
    device: 'HP Spectre 360',
    date: '20, July 2021 21:01',
    browserName: 'Chrome on Windows',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'info.main' } }}>
        <Icon icon='mdi:microsoft-windows' fontSize={20} />
      </Box>
    )
  },
  {
    location: 'Dubai',
    device: 'Oneplus 9 Pro',
    date: '21, July 2021 12:22',
    browserName: 'Chrome on Android',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'success.main' } }}>
        <Icon icon='mdi:android' fontSize={20} />
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
      <Grid item xs={12}>
        <TwoFactorAuthentication />
      </Grid>
      <Grid item xs={12}>
        <CreateApiKey />
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='API Key List & Access' />
          <CardContent>
            <Typography sx={{ mb: 6, color: 'text.secondary' }}>
              An API key is a simple encrypted string that identifies an application without any principal. They are
              useful for accessing public data anonymously, and are used to associate API requests with your project for
              quota and billing.
            </Typography>
            {apiKeyList.map(item => {
              return (
                <Box
                  key={item.key}
                  sx={{ p: 4, borderRadius: 1, backgroundColor: 'action.hover', '&:not(:last-child)': { mb: 4 } }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h6' sx={{ mr: 3 }}>
                      {item.title}
                    </Typography>
                    <CustomChip
                      size='small'
                      skin='light'
                      color='primary'
                      label={item.access}
                      sx={{ textTransform: 'uppercase' }}
                    />
                  </Box>
                  <Box sx={{ my: 2.5, display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mr: 3, color: 'text.secondary', fontWeight: 600 }}>{item.key}</Typography>
                    <Box component='span' sx={{ display: 'flex', cursor: 'pointer', color: 'text.secondary' }}>
                      <Icon icon='mdi:content-copy' fontSize='1rem' />
                    </Box>
                  </Box>
                  <Typography sx={{ color: 'text.secondary' }}>Created on {item.date}</Typography>
                </Box>
              )
            })}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Recent Devices' />
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
      </Grid>
    </Grid>
  )
}

export default TabSecurity
