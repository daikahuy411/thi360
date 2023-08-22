// ** React Imports
import { useEffect, useState } from 'react'

import UserApi from 'api/user-api'
// ** Configs
import themeConfig from 'configs/themeConfig'
// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
// ** Demo Imports
import FooterIllustrationsV1 from 'views/pages/auth/FooterIllustrationsV1'
import * as yup from 'yup'

// ** Icon Imports
import Icon from '@core/components/icon'
// ** Layout Import
import BlankLayout from '@core/layouts/BlankLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'
// ** MUI Components
import Box from '@mui/material/Box'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const defaultValues = {
  newPassword: '',
  confirmNewPassword: ''
}

const ResetPasswordV1 = () => {
  const router = useRouter()
  const { resetPasswordToken } = router.query

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .min(5, 'Mật khẩu không được để trống & phải có ít nhất 6 ký tự!')
      .required('Password không được để trống!'),
    confirmNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Mật khẩu & nhập lại mật khẩu không khớp')
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // ** Hook
  const theme = useTheme()

  useEffect(() => {
    if (!router.isReady) return
    verifyExpiteTime()
  }, [resetPasswordToken])

  const verifyExpiteTime = () => {
    new UserApi()
      .verifyExpiteTime(resetPasswordToken)
      .then(response => {
        const data = response.data
        if (!data.isSuccess) {
          toast.error(data.message)
          router.replace('/forgot-password')
        }
      })
      .catch(e => {
        console.log(e)
        toast.error('Xảy ra lỗi trong quá trình xử lý dữ liệu. Bạn vui lòng quay lại sau!')
        router.replace('/forgot-password')
      })
  }

  const onSubmit = data => {
    const { newPassword, confirmNewPassword } = data
    setLoading(true)
    const param = {
      password: newPassword,
      securityStamp: resetPasswordToken
    }

    new UserApi()
      .resetPassword(param)
      .then(response => {
        const data = response.data
        if (!data.isSuccess) {
          toast.error(data.message)
          router.replace('/forgot-password')
        } else {
          toast.success(data.message)
          router.push('/login')
        }
      })
      .catch(e => {
        console.log(e)
        toast.error('Xảy ra lỗi trong quá trình xử lý dữ liệu. Bạn vui lòng quay lại sau!')
        router.replace('/forgot-password')
        setLoading(false)
      })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, mb: 1.5 }}>
              Đặt Lại Mật Khẩu 🔒
            </Typography>
            <Typography variant='body2'>Your new password must be different from previously used passwords</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ display: 'flex', mb: 4 }}>
              <InputLabel htmlFor='auth-reset-password-new-password'>Mật khẩu mới</InputLabel>
              <Controller
                name='newPassword'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    autoFocus
                    label='Mật khẩu mới'
                    value={value ?? ''}
                    required
                    id='auth-reset-password-new-password'
                    onChange={onChange}
                    error={Boolean(errors.newPassword)}
                    type={showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          aria-label='toggle password visibility'
                        >
                          <Icon icon={showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                        </IconButton>
                        &nbsp;
                        <Tooltip
                          placement='right-start'
                          title='Mật khẩu có tối thiểu 5 ký tự, bao gồm ít nhất 1 chữ in hoa, 1 ký tự đặc biệt và ít nhất 1 ký tự là số.'
                        >
                          <IconButton>
                            <InfoOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.newPassword && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.newPassword.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={{ display: 'flex', mb: 4 }}>
              <InputLabel htmlFor='auth-reset-password-confirm-password'>Nhập lại mật khẩu</InputLabel>
              <Controller
                name='confirmNewPassword'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    label='Nhập lại mật khẩu'
                    value={value ?? ''}
                    id='auth-reset-password-confirm-password'
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    onChange={onChange}
                    error={Boolean(errors.confirmNewPassword)}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        >
                          <Icon icon={showConfirmNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.confirmNewPassword && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmNewPassword.message}</FormHelperText>
              )}
            </FormControl>
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition='end'
              variant='contained'
              sx={{ mb: 5.25 }}
            >
              <span>Đặt Mật Khẩu Mới</span>
            </LoadingButton>
            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LinkStyled href='/login'>
                <Icon icon='mdi:chevron-left' />
                <span>Quay lại đăng nhập</span>
              </LinkStyled>
            </Typography>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
ResetPasswordV1.getLayout = page => <BlankLayout>{page}</BlankLayout>
ResetPasswordV1.guestGuard = true

export default ResetPasswordV1
