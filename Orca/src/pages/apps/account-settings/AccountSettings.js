import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import TabAccount from 'pages/apps/account-settings/account/TabAccount'
import TabSecurity from 'pages/apps/account-settings/security/TabSecurity'
import Icon from '@core/components/icon'
import TabContext from '@mui/lab/TabContext'
import MuiTabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import useMediaQuery from '@mui/material/useMediaQuery'
import LoadingSpinner from '@core/components/loading-spinner'

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

const AccountSettings = () => {
  // ** State
  const [activeTab, setActiveTab] = useState('account')
  const [isLoading, setIsLoading] = useState(false)

  // ** Hooks
  const router = useRouter()
  const { tab } = router.query
  const hideText = useMediaQuery(theme => theme.breakpoints.down('md'))

  const handleChange = (event, value) => {
    setIsLoading(true)
    router.push(`/apps/account-settings/${value.toLowerCase()}`).then(() => setIsLoading(false))
  }
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const tabContentList = {
    account: <TabAccount tab={tab} />,
    security: <TabSecurity />
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
                      {!hideText && 'Thông tin tài khoản'}
                    </Box>
                  }
                />
                <Tab
                  value='security'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon icon='teenyicons:password-outline' />
                      {!hideText && 'Bảo mật'}
                    </Box>
                  }
                />
              </TabList>
            </Grid>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
              <LoadingSpinner active={isLoading}>
                <TabPanel sx={{ p: 0 }} value={activeTab}>
                  {tabContentList[activeTab]}
                </TabPanel>
              </LoadingSpinner>
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default AccountSettings
