import 'cleave.js/dist/addons/cleave-phone.us'

import {
  useEffect,
  useState
} from 'react'

import UserApi from 'api/user-api'
import Cleave from 'cleave.js/react'
import { useAuth } from 'hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Controller,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'
import FooterIllustrationsV1 from 'views/pages/auth/FooterIllustrationsV1'

import LoadingSpinner from '@core/components/loading-spinner'
import BlankLayout from '@core/layouts/BlankLayout'
import CleaveWrapper from '@core/styles/libs/react-cleave'
import { hexToRGBA } from '@core/utils/hex-to-rgba'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormHelperText from '@mui/material/FormHelperText'
import {
  styled,
  useTheme
} from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main
}))

const CleaveInput = styled(Cleave)(({ theme }) => ({
  maxWidth: 50,
  textAlign: 'center',
  height: '50px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  }
}))

const defaultValues = {
  val1: '',
  val2: '',
  val3: '',
  val4: '',
  val5: '',
  val6: ''
}

const VerifyAccount = () => {
  const router = useRouter()
  const { verifyActivateCode } = useAuth()
  // ** State
  const { token } = router.query
  const [isBackspace, setIsBackspace] = useState(false)
  const [data, setData] = useState()
  const [hasError, setHasError] = useState({ isError: false, message: '' })
  const [isDisable, setIsDisable] = useState(false)
  const [isDisableResend, setIsDisableResend] = useState(false)
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const theme = useTheme()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Vars
  const errorsArray = Object.keys(errors)

  useEffect(() => {
    if (!router.isReady) return
    fetchData()
  }, [token])

  const fetchData = () => {
    setLoading(true)
    new UserApi()
      .getEmail(token)
      .then(response => {
        const data = response.data
        const split = data.email.split('@')
        if (split[0].length > 4) {
          const citrus = split[0].slice(3)
          data.email = `***${citrus}@${split[1]}`
          setData({ ...data })
        }

        if (!data.isSuccess) {
          setIsDisable(true)
          setLoading(false)
          setData(data)
          setHasError({ isError: true, message: data.message })
        } else {
          if (data.isActive) {
            router.push('/login')
          } else {
            setData(response.data)
            setLoading(false)
          }
        }
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
      })
  }

  const onSubmit = data => {
    setLoading(true)
    const { val1, val2, val3, val4, val5, val6 } = data
    const param = {
      id: token,
      activationCode: `${val1}${val2}${val3}${val4}${val5}${val6}`
    }

    verifyActivateCode(param, err => {
      if (!err.isSuccess) {
        setHasError({ isError: true, message: err.message })
      }
      setLoading(false)
    })
  }

  const handleChange = (event, onChange) => {
    if (!isBackspace) {
      onChange(event)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        form.elements[index + 1].focus()
      }
      event.preventDefault()
    }
  }

  const handleResendActivateCode = () => {
    setLoading(true)
    setIsDisableResend(true)
    new UserApi()
      .resendActivateCode(token)
      .then(response => {
        toast.success('Chúng tôi đã gửi cho bạn mã xác minh. Vui lòng kiểm tra mail dùng để đăng ký của bạn!')
        setIsDisableResend(false)
        router.query.token = response.data.value
        router.push(router)
        setLoading(false)
      })
      .catch(e => {
        console.log(e)
        setIsDisableResend(false)
        toast.error('Xảy ra lỗi trong quá trình gửi mail. Bạn vui lòng thử lại sau!')
        setLoading(false)
      })
  }

  const handleKeyDown = event => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }

  const renderInputs = () => {
    return Object.keys(defaultValues).map((val, index) => (
      <Controller
        key={val}
        name={val}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='tel'
            maxLength={1}
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={event => handleChange(event, onChange)}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
          />
        )}
      />
    ))
  }

  return (
    <Box className='content-center'>
      <LoadingSpinner active={loading}>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                      margin: '0 auto'
                    }}
                  >
                    <img src='/themes/default/assets/img/edu-icon.svg' />
                  </div>
                </div>
              </Link>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ mb: 2 }}>
                Xác thực tài khoản
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Chúng tôi đã gửi mã xác minh đến email của bạn. Hãy nhập mã xác minh nhận được vào ô bên dưới!
              </Typography>
              <Typography sx={{ mt: 2, fontWeight: 700 }}> {data ? data.email : ''}</Typography>
            </Box>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>Nhập mã bảo mật gồm 6 số</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CleaveWrapper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...(errorsArray.length && {
                    '& .invalid:focus': {
                      borderColor: theme => `${theme.palette.error.main} !important`,
                      boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                    }
                  })
                }}
              >
                {renderInputs()}
              </CleaveWrapper>
              {errorsArray.length ? (
                <FormHelperText sx={{ color: 'error.main' }}>Mã xác thực không được để trống.</FormHelperText>
              ) : null}
              {hasError.isError && (
                <Alert onClose={() => { }} severity='error'>
                  {hasError.message}
                </Alert>
              )}
              {/* <Button fullWidth type='submit' variant='contained' sx={{ mt: 4 }}>  Xác minh </Button> */}
              <LoadingButton
                fullWidth
                type='submit'
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition='end'
                variant='contained'
                sx={{ mt: 4 }}
                disabled={isDisable}
              >
                <span>Xác minh</span>
              </LoadingButton>
            </form>
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>Bạn chưa nhận được mã xác thực?</Typography>
              <Button onClick={handleResendActivateCode} disabled={isDisableResend}>
                Gửi lại mã
              </Button>
            </Box>
          </CardContent>
        </Card>
      </LoadingSpinner>
      <FooterIllustrationsV1 />
    </Box>
  )
}

VerifyAccount.getLayout = page => <BlankLayout>{page}</BlankLayout>
VerifyAccount.guestGuard = true

export default VerifyAccount
