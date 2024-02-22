import {
  Fragment,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import themeConfig from 'configs/themeConfig'
import Head from 'next/head'
import Link from 'next/link'
import {
  Controller,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import Icon from '@core/components/icon'
import { useSettings } from '@core/hooks/useSettings'
import BlankLayout from '@core/layouts/BlankLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import {
  styled,
  useTheme
} from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

// Styled Components
const ForgotPasswordIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 550
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
  display: 'flex',
  fontSize: '0.875rem',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const defaultValues = {
  email: ''
}

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const schema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ!').required('Email không được để trống!')
  })

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState({ isError: false, message: '' })
  const [hasSuccess, setHasSuccess] = useState({ isSuccess: false, message: '' })

  const onSubmit = data => {
    const { email } = data
    const param = {
      email: email
    }
    setHasSuccess({ isSuccess: false, message: '' })
    setHasError({ isError: false, message: '' })
    setLoading(true)
    new V1Api()
      .requestForgotPassword(param)
      .then(response => {
        const data = response.data
        if (data.isSuccess) {
          setHasSuccess({ isSuccess: true, message: data.value.email })
        } else {
          setHasError({ isError: true, message: data.message })
        }
        setLoading(false)
        reset()
      })
      .catch(e => {
        toast.error('Xảy ra lỗi trong quá trình gửi mail. Bạn vui lòng thử lại sau!')
        setLoading(false)
      })
  }

  return (
    <Fragment>
      <Head>
        <title>{`${themeConfig.templateName} - Quên mật khẩu`}</title>
      </Head>
      <Box className='content-right'>
        {!hidden ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: "url('/images/pages/misc-coming-soon.png')",
              backgroundSize: 'cover'
            }}
          >
            <ForgotPasswordIllustrationWrapper></ForgotPasswordIllustrationWrapper>
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto'
                      }}
                    >
                      <img src='/themes/default/assets/img/edu-icon.svg' />
                    </div>
                  </div>
                </Link>
              </Box>
              <Box sx={{ mb: 6 }}>
                <TypographyStyled variant='h5'>Quên Mật Khẩu? 🔒</TypographyStyled>
                <Typography variant='body2'>
                  Hãy cung cấp cho chúng tôi email bạn đã dùng để đăng ký tài khoản thi360.com và chúng tôi sẽ gửi cho
                  bạn một liên kết để đặt lại mật khẩu qua email đó.
                </Typography>
              </Box>
              {hasSuccess.isSuccess && (
                <Alert
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={() => {
                        setHasSuccess({ isSuccess: false, message: '' })
                      }}
                    >
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Chúng tôi đã gửi một <strong> email có liên kết để đặt lại mật khẩu</strong> của bạn. Có thể mất một
                  vài phút để hoàn thành. Hãy kiểm tra hộp thư đến của bạn <strong>{hasSuccess.message}</strong>
                </Alert>
              )}
              {hasError.isError && (
                <Alert onClose={() => setHasError({ isError: false, message: '' })} severity='error' sx={{ mb: 2 }}>
                  Email <b>{hasError.message}</b> không tồn tại hoặc không chính xác.
                </Alert>
              )}
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        value={value}
                        label='Email'
                        required
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.email)}
                        placeholder='user@gmail.com'
                        sx={{ display: 'flex', mb: 4 }}
                      />
                    )}
                  />
                  {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                </FormControl>
                <LoadingButton
                  fullWidth
                  type='submit'
                  endIcon={<SendIcon />}
                  loading={loading}
                  loadingPosition='end'
                  variant='contained'
                  sx={{ mb: 5.25 }}
                >
                  <span>Gửi email cho tôi</span>
                </LoadingButton>
                <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LinkStyled href='/login'>
                    <Icon icon='mdi:chevron-left' />
                    <span>Quay lại đăng nhập</span>
                  </LinkStyled>
                </Typography>
              </form>
            </BoxWrapper>
          </Box>
        </RightWrapper>
      </Box>
    </Fragment>
  )
}

ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword
