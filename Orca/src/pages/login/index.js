import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'
import authConfig from 'configs/auth'
import themeConfig from 'configs/themeConfig'
import { useAuth } from 'hooks/useAuth'
import Head from 'next/head'
import Link from 'next/link'
import { router } from 'next/router'
import {
  Controller,
  useForm
} from 'react-hook-form'
import FooterIllustrationsV2 from 'views/pages/auth/FooterIllustrationsV2'
import * as yup from 'yup'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import useBgColor from '@core/hooks/useBgColor'
import { useSettings } from '@core/hooks/useSettings'
import BlankLayout from '@core/layouts/BlankLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import {
  styled,
  useTheme
} from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '35rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { mt: theme.spacing(8) }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().min(4).required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: '123@123a',
  email: 'admin'
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  useEffect(() => {
    async function checkIfAccessTokenExists() {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')
      if (token != null) {
        window.localStorage.setItem(authConfig.storageTokenKeyName, token)
        var userInfoResponse = await axios.get(`${authConfig.baseApiUrl}${authConfig.userInfoEndpoint}`)
        if (userInfoResponse.status == 200) {
          userInfoResponse.data.token = token
          auth.setUser(userInfoResponse.data)
          window.localStorage.setItem('userData', JSON.stringify(userInfoResponse.data))
          router.replace('/home')
        }
      }
    }
    checkIfAccessTokenExists()
  }, [])

  const loginWithGoogle = () => {
    //window.open(`${authConfig.baseApiUrl}${authConfig.googleLoginEndpoint}`, "Google Login", "width=800,height=800");
    window.location = `${authConfig.baseApiUrl}${authConfig.googleLoginEndpoint}`
  }

  // ** Vars
  const { skin } = settings

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

  const onSubmit = data => {
    setLoading(true)
    const { email, password } = data
    auth.login({ Username: email, password, rememberMe }, () => {
      setLoading(false)
      setError('email', {
        type: 'manual',
        message: 'Tên đăng nhập hoặc mật khẩu không hợp lệ.'
      })
    })
  }

  return (
    <>
    <Head>
      <title>{`Đăng nhập - ${themeConfig.templateName}`}</title>
    </Head>
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <LoginIllustrationWrapper>
            <LoginIllustration
              alt='login-illustration'
              src={`/images/pages/misc-coming-soon.png`}
            />
          </LoginIllustrationWrapper>
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>

        <Box
          sx={{
            p: 12,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Link href='/'>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      borderRadius: 15,
                      width: 50,
                      height: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      backgroundColor: 'rgba(155, 81, 224, 0.1)'
                    }}
                  >
                    <img src='/themes/default/assets/img/edu-icon.svg' style={{ width: 30 }} />
                  </div>
                </div>
              </Link>
              <Link
                href='/'
                style={{
                  textDecoration: 'none'
                }}
              >
                <Typography
                  variant='h6'
                  sx={{
                    ml: 3,
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontSize: '1.5rem !important'
                  }}
                >
                  {themeConfig.templateName}
                </Typography>
              </Link>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Link href='/'>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      borderRadius: 15,
                      width: 120,
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      backgroundColor: 'rgba(155, 81, 224, 0.1)'
                    }}
                  >
                    <img src='/themes/default/assets/img/edu-icon.svg' style={{ width: 90 }} />
                  </div>
                </div>
              </Link>
              <br />
              <TypographyStyled variant='h5'>Chào mừng bạn tới Thi360 👋🏻</TypographyStyled>
              <Typography variant='body2'>Đăng nhập vào hệ thống để tiếp tục</Typography>
            </Box>
            <LoadingSpinner active={loading}>
              <Box sx={{ mb: 6, mt: 6 }}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='email'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          autoFocus
                          label='Tên đăng nhập'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder='Tên đăng nhập hoặc email'
                        />
                      )}
                    />
                    {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                      Mật khẩu
                    </InputLabel>
                    <Controller
                      name='password'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <OutlinedInput
                          value={value}
                          onBlur={onBlur}
                          label='Password'
                          onChange={onChange}
                          id='auth-login-v2-password'
                          error={Boolean(errors.password)}
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.password && (
                      <FormHelperText sx={{ color: 'error.main' }} id=''>
                        {errors.password.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Box
                    sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                  >
                    <FormControlLabel
                      label='Ghi nhớ tôi'
                      control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                    />
                    <LinkStyled href='/forgot-password'>Quên mật khẩu?</LinkStyled>
                  </Box>
                  <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                    Đăng nhập
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography variant='body2' sx={{ mr: 2 }}>
                      Bạn chưa có tài khoản?
                    </Typography>
                    <Typography variant='body2'>
                      <LinkStyled href='/register'>Tạo mới tài khoản</LinkStyled>
                    </Typography>
                  </Box>
                  <Divider sx={{ my: theme => `${theme.spacing(5)} !important` }}>hoặc đăng nhập bằng</Divider>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                      <Icon icon='mdi:facebook' />
                    </IconButton>
                    <IconButton
                      href='/'
                      component={Link}
                      sx={{ color: '#db4437' }}
                      onClick={e => {
                        loginWithGoogle()
                        e.preventDefault()
                      }}
                    >
                      <Icon icon='mdi:google' />
                    </IconButton>
                  </Box>
                </form>
              </Box>
            </LoadingSpinner>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
    </>    
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
