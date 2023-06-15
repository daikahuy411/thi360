// ** React Imports
import {
  useEffect,
  useState
} from 'react'

// ** Next Import
import { useRouter } from 'next/router'
// ** Demo Tabs Imports
import TabAccount from 'views/pages/account-settings/TabAccount'
import TabBilling from 'views/pages/account-settings/TabBilling'
import TabConnections from 'views/pages/account-settings/TabConnections'
import TabNotifications from 'views/pages/account-settings/TabNotifications'
import TabSecurity from 'views/pages/account-settings/TabSecurity'

// ** Icon Imports
import Icon from '@core/components/icon'
import TabContext from '@mui/lab/TabContext'
import MuiTabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
// ** MUI Imports
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const TabList = styled(MuiTabList)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 40,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      minWidth: 130
    }
  }
}))

const AccountSettings = ({ tab, apiPricingPlanData }) => {
  // ** State
  const [activeTab, setActiveTab] = useState(tab)
  const [isLoading, setIsLoading] = useState(false)

  // ** Hooks
  const router = useRouter()
  const hideText = useMediaQuery(theme => theme.breakpoints.down('md'))

  const handleChange = (event, value) => {
    setIsLoading(true)
    router.push(`/pages/account-settings/${value.toLowerCase()}`).then(() => setIsLoading(false))
  }
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const tabContentList = {
    account: <TabAccount />,
    security: <TabSecurity />,
    connections: <TabConnections />,
    notifications: <TabNotifications />,
    billing: <TabBilling apiPricingPlanData={apiPricingPlanData} />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TabList
                variant='scrollable'
                scrollButtons='auto'
                onChange={handleChange}
                aria-label='customized tabs example'
              >
                <Tab
                  value='account'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon icon='mdi:account-outline' />
                      {!hideText && 'Account'}
                    </Box>
                  }
                />
                <Tab
                  value='security'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon icon='mdi:lock-open-outline' />
                      {!hideText && 'Security'}
                    </Box>
                  }
                />
                <Tab
                  value='billing'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon icon='mdi:bookmark-outline' />
                      {!hideText && 'Billing'}
                    </Box>
                  }
                />
                <Tab
                  value='notifications'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon icon='mdi:bell-outline' />
                      {!hideText && 'Notifications'}
                    </Box>
                  }
                />
                <Tab
                  value='connections'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon icon='mdi:link' />
                      {!hideText && 'Connections'}
                    </Box>
                  }
                />
              </TabList>
            </Grid>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
              {isLoading ? (
                <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CircularProgress sx={{ mb: 4 }} />
                  <Typography>Loading...</Typography>
                </Box>
              ) : (
                <TabPanel sx={{ p: 0 }} value={activeTab}>
                  {tabContentList[activeTab]}
                </TabPanel>
              )}
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default AccountSettings
