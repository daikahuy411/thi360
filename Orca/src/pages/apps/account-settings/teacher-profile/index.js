import 'dayjs/locale/vi'

import {
  Fragment,
  useEffect,
  useRef,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Controller,
  useForm
} from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { selectProfile } from 'store/slices/profileSlice'
import * as yup from 'yup'

import LoadingSpinner from '@core/components/loading-spinner'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

/*
 * handle crop avatar
 */
const boxStyle = {
  width: '300px',
  height: '300px',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}
const modalStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const initialData = {
  firstName: '',
  lastName: '',
  email: '',
  number: '',
  address: '',
  gender: -1,
  dob: null
}

moment().format('DD/MM/YYYY')

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: 4,
  marginRight: theme.spacing(5)
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const schema = yup.object().shape(
  {
    firstName: yup.string().required('Họ và tên không được để trống'),
    lastName: yup.string().required('Họ và tên không được để trống'),
    email: yup.string().email('Email không đúng định dạng'),
    phoneNumber: yup
      .string()
      .nullable()
      .notRequired()
      .when('phoneNumber', {
        is: value => value?.length,
        then: rule => rule.min(10, '* cần tối thiểu 10 số').max(11, '* Cho phép tối đa 11 số')
      })
  },
  ['phoneNumber', 'phoneNumber']
)

const TeacherProfile = props => {
  const { tab } = props
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const [formData, setFormData] = useState(initialData)
  const [avatarFile, setAvatarFile] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // ** Hooks
  const {
    setValue,
    getValues,
    setError,
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialData, mode: 'onChange', resolver: yupResolver(schema) })

  useEffect(() => {
    if (formData) reset(formData)
  }, [formData])

  useEffect(() => {
    if (tab && tab == 'account') {
      me()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const me = () => {
    setLoading(true)
    new V1Api()
      .me()
      .then(response => {
        const data = response.data
        setPreview(data.pictureUrl ? data.pictureUrl : '/images/avatars/default1.png')
        setFormData(data)
        dispatch(selectProfile(data))
        setLoading(false)
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
      })
  }

  const onSubmit = async () => {
    setLoading(true)
    const item = getValues()
    let avatar = await fetch(preview)
      .then(r => r.blob())
      .then(blobFile => new File([blobFile], 'fileNameGoesHere', { type: 'image/png' }))

    const formData = new FormData()
    formData.append('id', item.id)
    formData.append('userName', item.userName)
    formData.append('firstName', item.firstName)
    formData.append('lastName', item.lastName)
    formData.append('email', item.email)
    formData.append('address', item.address)
    formData.append('gender', item.gender)
    if (item.dob) formData.append('dob', item.dob)
    formData.append('phoneNumber', item.phoneNumber)
    formData.append('isChangeAvatar', isChangeAvatar)
    formData.append('avatarFile', avatar)

    new V1Api()
      .updateProfile(formData)
      .then(response => {
        setLoading(false)
        const data = response.data
        if (data.succeeded) {
          toast.success('Cập nhật dữ liệu thành công')
          me()
        } else {
          toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
        }
      })
      .catch(e => {
        console.log(e)
        if (e.response.data.Email) {
          setError('email', e.response.data.Email[0])
        }
        setLoading(false)
      })
  }

  const [src, setSrc] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [preview, setPreview] = useState(null)
  const [isChangeAvatar, setIsChangeAvatar] = useState(false)
  const inputRef = useRef(null)

  const handleImgChange = e => {
    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      if (e.target.files[0].size <= 500000) {
        setSrc(URL.createObjectURL(e.target.files[0]))
        setModalOpen(true)
      } else {
        toast.error('Hệ thống chỉ hỗ trợ dung lượng tối đa là 0.5mb. Bạn cần chọn ảnh phù hợp.')
      }
    } else {
      toast.error('Hệ thống chỉ hỗ trợ định dạng PNG hoặc JPEG. Bạn cần chọn ảnh phù hợp.')
    }
  }

  const requestEmailConfirmed = () => {
    setLoading(true)
    new V1Api()
      .sendActiveCodeEmail()
      .then(response => {
        setLoading(false)
        if (response.data.isSuccess) {
          router.push(`/verify-account/${response.data.value}`)
        }
      })
      .catch(e => {
        setLoading(false)
      })
  }

  return (
    <Fragment>
      <Head>
        <title>{`Hồ sơ giáo viên`}</title>
      </Head>
      <Grid container spacing={6} maxWidth={'md'}>
        <Grid item xs={12}>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <div>
                  <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                    1. Thông tin tài khoản
                  </Typography>
                </div>
                <LoadingSpinner active={loading}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12}>
                      <TextField fullWidth InputProps={{ readOnly: true }} type='email' label='Email' />
                      {formData && formData.emailConfirmed && (
                        <Alert severity='success'>Email đã xác nhận thành công.</Alert>
                      )}
                      {formData && !formData.emailConfirmed && (
                        <Alert
                          severity='error'
                          style={{ marginTop: 5 }}
                          action={
                            <Button size='small' onClick={() => requestEmailConfirmed()}>
                              Gửi mã xác nhận
                            </Button>
                          }
                        >
                          Email chưa được xác nhận. Bạn phải xác nhận email để đăng ký Hồ sơ giáo viên.
                        </Alert>
                      )}
                    </Grid>
                  </Grid>
                </LoadingSpinner>
              </CardContent>
            </form>
          </Card>
          <br />
          <Card>
            <CardContent>
              <div>
                <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                  2. Thông tin trường
                </Typography>
              </div>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='name'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label='Tên trường'
                          placeholder=''
                          value={value ?? ''}
                          onChange={onChange}
                          error={Boolean(errors.lastName)}
                        />
                      )}
                    />
                    {errors.lastName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='address'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label='Địa chỉ'
                          placeholder=''
                          value={value ?? ''}
                          onChange={onChange}
                          error={Boolean(errors.lastName)}
                        />
                      )}
                    />
                    {errors.lastName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                    Cập nhật
                  </Button>
                  <Button type='reset' variant='outlined' color='secondary' onClick={() => reset()}>
                    Hủy bỏ
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br />
          <Card>
            <CardContent>
              <div>
                <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                  3. Đăng ký Hồ sơ giáo viên
                </Typography>
              </div>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='name'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label='Tên trường'
                          placeholder=''
                          value={value ?? ''}
                          onChange={onChange}
                          error={Boolean(errors.lastName)}
                        />
                      )}
                    />
                    {errors.lastName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                    Cập nhật
                  </Button>
                  <Button type='reset' variant='outlined' color='secondary' onClick={() => reset()}>
                    Hủy bỏ
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default TeacherProfile
