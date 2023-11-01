// ** React Imports
import { useEffect, useState } from 'react'

import moment from 'moment'
import { useRouter } from 'next/router'

// ** Icon Imports
import Icon from '@core/components/icon'
// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const UserProfileHeader = props => {
  const router = useRouter()
  const { about } = props
  // ** State
  const [data, setData] = useState(null)
  useEffect(() => {
    if (about) {
      setData(about)
    }
  }, [props])
  const designationIcon = data?.designationIcon || 'mdi:briefcase-outline'

  const handleChangeInfo = () => {
    router.push('/apps/account-settings/account/')
  }

  return (
    <>
      <Card>
        <CardMedia
          component='img'
          alt='profile-header'
          image={'/themes/default/assets/img/backgrounds/19.jpg'}
          sx={{
            height: { xs: 150, md: 280 }
          }}
        />
        <CardContent
          sx={{
            pt: 0,
            mt: -8,
            display: 'flex',
            alignItems: 'flex-end',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            justifyContent: { xs: 'center', md: 'flex-start' }
          }}
        >
          <ProfilePicture
            src={data?.pictureUrl ? data.pictureUrl : '/images/avatars/default1.png'}
            style={{ backgroundColor: '#fff' }}
            alt='profile-picture'
          />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              ml: { xs: 0, md: 6 },
              alignItems: 'flex-end',
              flexWrap: ['wrap', 'nowrap'],
              justifyContent: ['center', 'space-between']
            }}
          >
            <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
              <Typography variant='h5' sx={{ mb: 4 }}>
                {data?.fullName} <span style={{ fontSize: '1.2993rem' }}>({data?.userName})</span>
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: ['center', 'flex-start']
                }}
              >
                {/* <Box sx={{ mr: 5, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                  <Icon icon={designationIcon} />
                  <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>Sinh viên</Typography>
                </Box>
                <Box sx={{ mr: 5, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                  <Icon icon='mdi:map-marker-outline' />
                  <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>location</Typography>
                </Box> */}
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                  <Icon icon='mdi:calendar-blank' />
                  <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>
                    Tham gia ngày: {moment(data?.createdTime).format('DD-MM-YYYY HH:mm')}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button
              variant='contained'
              color='success'
              startIcon={<Icon icon='mdi:account-check-outline' fontSize={20} />}
              onClick={handleChangeInfo}
            >
              Thay đổi thông tin
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default UserProfileHeader
