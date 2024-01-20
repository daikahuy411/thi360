import {
  useEffect,
  useState
} from 'react'

import moment from 'moment'

import Icon from '@core/components/icon'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const renderTeams = arr => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: `${item.color}.main` }
          }}
        >
          <Icon icon='item.icon' />

          <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>
            {item.property.charAt(0).toUpperCase() + item.property.slice(1)}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
          </Typography>
        </Box>
      )
    })
  } else {
    return null
  }
}

const AboutOverivew = props => {
  const { teams, about, contacts, overview } = props
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (about) {
      setData(about)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title='Thông tin cá nhân'
              // action={
              //   <OptionsMenu
              //     iconButtonProps={{ size: 'small' }}
              //     options={['Chỉnh sửa']}
              //   />
              // }
            />
            <CardContent>
              <Box sx={{ mb: 6 }}>
                {/* <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                Thông tin cá nhân
              </Typography> */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:not(:last-of-type)': { mb: 4 },
                    '& svg': { color: 'text.secondary' }
                  }}
                >
                  <Icon icon={'mdi:account-check-outline'} />
                  <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>Tên đăng nhập:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data?.userName}</Typography>
                </Box>
                <Box
                  // key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:not(:last-of-type)': { mb: 4 },
                    '& svg': { color: 'text.secondary' }
                  }}
                >
                  <Icon icon={'mdi:account-outline'} />
                  <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>Họ và tên:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data?.fullName}</Typography>
                </Box>
                <Box
                  // key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:not(:last-of-type)': { mb: 4 },
                    '& svg': { color: 'text.secondary' }
                  }}
                >
                  <Icon icon={'mdi:check'} />
                  <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>Trạng thái:</Typography>
                  {data?.emailConfirmed && <Typography sx={{ color: 'text.success' }}>Đã xác nhận email.</Typography>}
                  {!data?.emailConfirmed && (
                    <Typography sx={{ color: 'text.secondary' }}>Chưa xác nhận email</Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:not(:last-of-type)': { mb: 4 },
                    '& svg': { color: 'text.secondary' }
                  }}
                >
                  <Icon icon={'mdi:calendar-blank'} />
                  <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>Ngày sinh:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {data?.dob != null ? (
                      moment(data.dob).format('DD/MM/YYYY')
                    ) : (
                      <>
                        <i>Chưa cập nhật</i>
                      </>
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:not(:last-of-type)': { mb: 4 },
                    '& svg': { color: 'text.secondary' }
                  }}
                >
                  <Icon icon={'mdi:star-outline'} />
                  <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>Giới tính:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {data?.genderName != '' ? (
                      data?.genderName
                    ) : (
                      <>
                        <i>Chưa cập nhật</i>
                      </>
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:not(:last-of-type)': { mb: 4 },
                    '& svg': { color: 'text.secondary' }
                  }}
                >
                  <Icon icon={'mdi:briefcase-outline'} />
                  <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>Nghề nghiệp:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {data?.job ?? (
                      <>
                        <i>Chưa cập nhật</i>
                      </>
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                  Liên hệ
                </Typography>
                <Box
                  // key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:not(:last-of-type)': { mb: 4 },
                    '& svg': { color: 'text.secondary' }
                  }}
                >
                  <Icon icon={'mdi:phone-outline'} />
                  <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>Điện thoại:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {data?.phoneNumber ?? (
                      <>
                        <i>Chưa cập nhật</i>
                      </>
                    )}
                  </Typography>
                </Box>
                <Box
                  // key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:not(:last-of-type)': { mb: 4 },
                    '& svg': { color: 'text.secondary' }
                  }}
                >
                  <Icon icon={'mdi:email-outline'} />
                  <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {data?.email ?? (
                      <>
                        <i>Chưa cập nhật</i>
                      </>
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:not(:last-of-type)': { mb: 4 },
                    '& svg': { color: 'text.secondary' }
                  }}
                >
                  <Icon icon={'mdi:map-marker-outline'} />
                  <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>Địa chỉ:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {data?.address ?? (
                      <>
                        <i>Chưa cập nhật</i>
                      </>
                    )}
                  </Typography>
                </Box>
              </Box>
              <div>
                <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                  Nhóm / Lớp
                </Typography>
                {renderTeams(teams)}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:not(:last-of-type)': { mb: 4 },
                    '& svg': { color: 'text.secondary' }
                  }}
                >
                  <Icon icon={'mdi:account-check-outline'} />
                  <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}></Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    <i>Bạn đang là học viên tự do</i>
                  </Typography>
                </Box>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  )
}

export default AboutOverivew
