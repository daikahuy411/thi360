// ** Styles
import 'cleave.js/dist/addons/cleave-phone.us'

// ** React Imports
import {
  useEffect,
  useState
} from 'react'

import UserApi from 'api/user-api'
// ** Third Party Imports
import Cleave from 'cleave.js/react'
// ** Configs
import themeConfig from 'configs/themeConfig'
// ** Hooks
import { useAuth } from 'hooks/useAuth'
import { useRouter } from 'next/router'
import {
  Controller,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'
// ** Demo Imports
import FooterIllustrationsV1 from 'views/pages/auth/FooterIllustrationsV1'

// ** Layout Import
import BlankLayout from '@core/layouts/BlankLayout'
// ** Custom Styled Component
import CleaveWrapper from '@core/styles/libs/react-cleave'
// ** Util Import
import { hexToRGBA } from '@core/utils/hex-to-rgba'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
// ** MUI Components
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

// ** Styled Components
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
    fetchData();
  }, [token])

  const fetchData = () => {
    setLoading(true)
    new UserApi().getEmail(token)
      .then(response => {
        const data = response.data
        const split = data.email.split("@")
        if(split[0].length > 4){
          const citrus = split[0].slice(3)
          data.email = `***${citrus}@${split[1]}`
          setData({ ...data })
        }

        if(!data.isSuccess){
          setIsDisable(true)
          setLoading(false)
          setData(data)
          setHasError({ isError: true, message: data.message })
        }else{
          if(data.isActive){
            router.push('/login')
          }else{
            setData(response.data)
            setLoading(false)
          }
        }
        
      })
      .catch((e) => {
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
    setIsDisableResend(true)
    new UserApi().resendActivateCode(token)
      .then(response => {
        toast.success('Chúng tôi đã gửi cho bạn mã xác minh. Vui lòng kiểm tra mail dùng để đăng ký của bạn!')
        setIsDisableResend(false)
      })
      .catch((e) => {
        console.log(e)
        setIsDisableResend(false)
        toast.error('Xảy ra lỗi trong quá trình gửi mail. Bạn vui lòng thử lại sau!')
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
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <Typography variant='h5' sx={{ mb: 2 }}>
              Xác thực 2 lớp 💬
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
              <FormHelperText sx={{ color: 'error.main' }}>Mã OTP không được để trống.</FormHelperText>
            ) : null}
            {hasError.isError &&
              <Alert onClose={() => { }} severity="error">{hasError.message}</Alert>
            }
            {/* <Button fullWidth type='submit' variant='contained' sx={{ mt: 4 }}>  Xác minh </Button> */}
            <LoadingButton
              fullWidth
              type='submit'
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              sx={{ mt: 4 }}
              disabled={isDisable}
            >
              <span>Xác minh</span>
            </LoadingButton>
          </form>
          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>Bạn chưa nhận được mã xác minh?</Typography>
            <Button onClick={handleResendActivateCode} disabled={isDisableResend}>Gửi lại</Button>
          </Box>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
VerifyAccount.getLayout = page => <BlankLayout>{page}</BlankLayout>
VerifyAccount.guestGuard = true

export default VerifyAccount
