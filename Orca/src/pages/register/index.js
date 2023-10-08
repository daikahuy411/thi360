// ** React Imports
import { Fragment, useState } from 'react'
// ** Configs
import themeConfig from 'configs/themeConfig'
// ** Hooks
import { useAuth } from 'hooks/useAuth'
// ** Next Imports
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
// ** Demo Imports
import FooterIllustrationsV2 from 'views/pages/auth/FooterIllustrationsV2'
// ** Third Party Imports
import * as yup from 'yup'
import LoadingSpinner from '@core/components/loading-spinner'

// ** Icon Imports
import Icon from '@core/components/icon'
import { useSettings } from '@core/hooks/useSettings'
// ** Layout Import
import BlankLayout from '@core/layouts/BlankLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Box from '@mui/material/Box'
// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const defaultValues = {
  email: '',
  username: '',
  password: '',
  terms: false
}

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const RegisterIllustration = styled('img')(({ theme }) => ({
  maxWidth: '46rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '35rem'
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  bottom: 0,
  left: '1.875rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    left: 0
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
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const theme = useTheme()
  const { register } = useAuth()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const schema = yup.object().shape({
    passwordHash: yup
      .string()
      .min(5, 'Mật khẩu không được để trống & phải có ít nhất 6 ký tự.')
      .required('Mật khẩu không được để trống.'),
    // passwordConfirmation: yup.string().oneOf([yup.ref('passwordHash'), null], 'Mật khẩu không khớp'),
    username: yup
      .string()
      .min(3, 'Tên đăng nhập không được để trống & phải có ít nhất 3 ký tự.')
      .required('Tên đăng nhập không được để trống.'),
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email('Email không hợp lệ!').required('Email không được để trống.'),
    terms: yup.bool().oneOf([true], 'Bạn cần đồng ý với chính sách và điều khoản để tiếp tục.')
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

  const onSubmit = data => {
    const { email, username, passwordHash, firstName, lastName } = data
    setLoading(true)
    register({ email, username, passwordHash, firstName, lastName }, err => {
      setLoading(false)
      const error = err.response.data || err.message
      if (error.email) {
        setError('email', {
          type: 'manual',
          message: error.email
        })
      }
      if (error.userName) {
        setError('username', {
          type: 'manual',
          message: error.userName
        })
      }
      if (error.passwordHash) {
        setError('passwordHash', {
          type: 'manual',
          message: error.passwordHash
        })
      }
    })
  }
  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt='register-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </RegisterIllustrationWrapper>
          <FooterIllustrationsV2 image={<TreeIllustration alt='tree' src='/images/pages/tree-2.png' />} />
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
              <TypographyStyled variant='h5'>Bắt đầu với Thi360 🚀</TypographyStyled>
              <Typography variant='body2'>Tạo tài khoản để sử dụng toàn bộ chức năng!</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <LoadingSpinner active={loading}>
                <Grid container spacing={2} maxWidth={'sm'}>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel htmlFor='auth-username' error={Boolean(errors.username)}>
                        Tên đăng nhập
                      </InputLabel>
                      <Controller
                        name='username'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <OutlinedInput
                            autoFocus
                            autoComplete='off'
                            value={value ?? ''}
                            label='Tên đăng nhập'
                            required
                            // onBlur={onBlur}
                            onChange={onChange}
                            id='auth-username'
                            error={Boolean(errors.username)}
                            endAdornment={
                              <InputAdornment position='end'>
                                <Tooltip
                                  placement='right-start'
                                  title='Tên người dùng viết chữ thường, không có dấu cách, có tối thiểu 3 ký tự.'
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
                      {errors.username && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <Controller
                        name='lastName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value ?? ''}
                            label='Họ & Tên đệm'
                            onChange={onChange}
                            error={Boolean(errors.lastName)}
                            aria-describedby='validation-schema-lastName'
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <Controller
                        name='firstName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value ?? ''}
                            label='Tên'
                            onChange={onChange}
                            error={Boolean(errors.firstName)}
                            aria-describedby='validation-schema-firstName'
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            value={value}
                            label='Email'
                            required
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.email)}
                            placeholder='user@gmail.com'
                          />
                        )}
                      />
                      {errors.email && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.passwordHash)}>
                        Mật khẩu
                      </InputLabel>
                      <Controller
                        name='passwordHash'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <OutlinedInput
                            autoComplete='new-password'
                            value={value ?? ''}
                            label='Mật khẩu'
                            onBlur={onBlur}
                            onChange={onChange}
                            id='auth-login-v2-password'
                            error={Boolean(errors.passwordHash)}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                </IconButton>
                                &nbsp;
                                <Tooltip
                                  placement='right-start'
                                  title='Mật khẩu có tối thiểu 5 ký tự, bao gồm ít nhất 1 chữ in hoa, 1 ký tự đặc biệt và ít nhất 1 ký tự không phải là số.'
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
                      {errors.passwordHash && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.passwordHash.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12} md={12}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.passwordConfirmation)}>
                        Xác nhận mật khẩu
                      </InputLabel>
                      <Controller
                        name='passwordConfirmation'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <OutlinedInput
                            value={value ?? ''}
                            label='Xác nhận mật khẩu'
                            onBlur={onBlur}
                            onChange={onChange}
                            id='auth-login-v2-password'
                            error={Boolean(errors.passwordConfirmation)}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        )}
                      />
                      {errors.passwordConfirmation && (
                        <FormHelperText sx={{ color: 'error.main' }}>
                          {errors.passwordConfirmation.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid> */}
                  <Grid item xs={12} md={12}>
                    <FormControl sx={{ mt: 1.5, mb: 4 }} error={Boolean(errors.terms)}>
                      <Controller
                        name='terms'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => {
                          return (
                            <FormControlLabel
                              sx={{
                                ...(errors.terms ? { color: 'error.main' } : null),
                                '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
                              }}
                              control={
                                <Checkbox
                                  checked={value}
                                  onChange={onChange}
                                  sx={errors.terms ? { color: 'error.main' } : null}
                                />
                              }
                              label={
                                <Fragment>
                                  <Typography
                                    variant='body2'
                                    component='span'
                                    sx={{ color: errors.terms ? 'error.main' : '' }}
                                  >
                                    Tôi đồng ý{' '}
                                  </Typography>
                                  <LinkStyled href='/' onClick={e => e.preventDefault()}>
                                    chính sách & điều khoản
                                  </LinkStyled>
                                </Fragment>
                              }
                            />
                          )
                        }}
                      />
                      {errors.terms && (
                        <FormHelperText sx={{ mt: 0, color: 'error.main' }}>{errors.terms.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                      Đăng ký
                    </Button>
                    <Box
                      sx={{
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant='body2' sx={{ mr: 2 }}>
                        Bạn đã có tài khoản?
                      </Typography>
                      <Typography variant='body2'>
                        <LinkStyled href='/login'>Đăng nhập</LinkStyled>
                      </Typography>
                    </Box>
                  </Grid>
                  {/* <Divider sx={{ my: theme => `${theme.spacing(5)} !important` }}>or</Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                    <Icon icon='mdi:facebook' />
                  </IconButton>
                  <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                    <Icon icon='mdi:google' />
                  </IconButton>
                </Box> */}
                </Grid>
              </LoadingSpinner>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
