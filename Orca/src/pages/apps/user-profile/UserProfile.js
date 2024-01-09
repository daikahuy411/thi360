// ** React Imports
import {
  useEffect,
  useState
} from 'react'

import UserApi from 'api/user-api'
// ** Next Import
import { useRouter } from 'next/router'
import AttemHistory from 'pages/user-profile/[tab]/attemp-history'
// import Connections from 'pages/user-profile/[tab]/connections'
import Profile from 'pages/user-profile/[tab]/profile'
// ** Demo Components
import Teams from 'pages/user-profile/[tab]/teams'
import UserProfileHeader from 'pages/user-profile/UserProfileHeader'

// ** Icon Imports
import Icon from '@core/components/icon'
import TabContext from '@mui/lab/TabContext'
import MuiTabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
// ** MUI Components
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
    minHeight: 38,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))

const UserProfile = ({ tab }) => {
  // ** State
  const [activeTab, setActiveTab] = useState(tab)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()

  // ** Hooks
  const router = useRouter()
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const handleChange = (event, value) => {
    setIsLoading(true)
    setActiveTab(value)
    router
      .push({
        pathname: `/user-profile/${value.toLowerCase()}`
      })
      .then(() => setIsLoading(false))
  }
  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])
  useEffect(() => {
    console.log('tab:', tab)
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }
    me()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const me = () => {
    new UserApi()
      .me()
      .then(response => {
        setData(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const tabContentList = {
    profile: <Profile data={data} />,
    teams: <Teams data={[{ id: data.organizationId, name: data.organizationName }]} />,
    'attemp-history': <AttemHistory data={data} />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader about={data} />
      </Grid>
      {activeTab === undefined ? null : (
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
                    value='profile'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize={20} icon='mdi:account-outline' />
                        {!hideText && 'Thông tin'}
                      </Box>
                    }
                  />
                  <Tab
                    value='teams'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize={20} icon='mdi:account-multiple-outline' />
                        {!hideText && 'Lớp học'}
                      </Box>
                    }
                  />
                  <Tab
                    value='attemp-history'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize={20} icon='mdi:history' />
                        {!hideText && 'Lịch sử thi'}
                      </Box>
                    }
                  />
                  <Tab
                    value='orders'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize={20} icon='mdi:currency-usd' />
                        {!hideText && 'Lịch sử thanh toán'}
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
      )}
    </Grid>
  )
}

export default UserProfile
