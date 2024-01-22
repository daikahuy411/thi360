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
import AvatarEditor from 'react-avatar-editor'
import DatePicker from 'react-datepicker'
import {
  Controller,
  useForm
} from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { selectProfile } from 'store/slices/profileSlice'
import CustomInput from 'views/forms/form-elements/pickers/PickersCustomInput'
import * as yup from 'yup'

import LoadingSpinner from '@core/components/loading-spinner'
import DatePickerWrapper from '@core/styles/libs/react-datepicker'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Modal,
  Slider
} from '@mui/material'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import SelfRemoveAccount from './SelfRemoveAccount'

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

const CropperModal = ({ src, modalOpen, setModalOpen, setPreview, setIsChangeAvatar }) => {
  const [slideValue, setSlideValue] = useState(10)
  const cropRef = useRef(null)

  //handle save
  const handleAgree = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL()
      const result = await fetch(dataUrl)
      const blob = await result.blob()
      setPreview(URL.createObjectURL(blob))
      setIsChangeAvatar(true)
      setModalOpen(false)
    }
  }

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: '100%', height: '100%' }}
          border={50}
          borderRadius={5}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />

        {/* MUI Slider */}
        <Slider
          min={10}
          max={50}
          sx={{
            margin: '0 auto',
            width: '80%',
            color: 'cyan'
          }}
          size='medium'
          defaultValue={slideValue}
          value={slideValue}
          onChange={e => setSlideValue(e.target.value)}
        />
        <Box
          sx={{
            display: 'flex',
            padding: '10px',
            border: '3px solid white',
            background: 'black'
          }}
        >
          <Button
            size='small'
            sx={{ marginRight: '10px', color: 'white', borderColor: 'white' }}
            variant='outlined'
            onClick={e => setModalOpen(false)}
          >
            Hủy
          </Button>
          <Button sx={{ background: '#5596e6' }} size='small' variant='contained' onClick={handleAgree}>
            Đồng ý
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
/*
 * end handle crop avatar
 */

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

const TabAccount = props => {
  const { tab } = props
  // ** State
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const [formData, setFormData] = useState(initialData)
  const [avatarFile, setAvatarFile] = useState()
  // const [imgSrc, setImgSrc] = useState('')
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
        console.log(response)
        setLoading(false)
        Object.keys(response.data.modelErrors).forEach(key => setError(key, response.data.modelErrors[key][0]))
        if (response.data.isSuccess) {
          toast.success('Cập nhật dữ liệu thành công')
          me()
        } else {
          toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
        }
      })
      .catch(e => {
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

  const handleResetAvatar = () => {
    setInputValue('')
    setPreview(formData?.pictureUrl ? formData.pictureUrl : '/images/avatars/default1.png')
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
        <title>{`Cập nhật thông tin tài khoản`}</title>
      </Head>
      <DatePickerWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent sx={{ pb: theme => `${theme.spacing(10)}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImgStyled
                      src={preview || ' https://www.signivis.com/img/custom/avatars/member-avatar-01.png'}
                      alt='Profile Pic'
                    />
                    <div>
                      <CropperModal
                        modalOpen={modalOpen}
                        src={src}
                        setPreview={setPreview}
                        setModalOpen={setModalOpen}
                        setIsChangeAvatar={setIsChangeAvatar}
                      />
                      <ButtonStyled component='label' variant='contained' htmlFor='account-upload-avatar'>
                        Chọn ảnh
                        <input
                          id='account-upload-avatar'
                          hidden
                          type='file'
                          accept='image/png, image/jpg, image/jpeg'
                          value={avatarFile}
                          ref={inputRef}
                          onChange={handleImgChange}
                        />
                      </ButtonStyled>
                      <ResetButtonStyled color='secondary' variant='outlined' onClick={handleResetAvatar}>
                        Hủy bỏ
                      </ResetButtonStyled>
                      <Typography variant='caption' sx={{ mt: 4, display: 'block', color: 'text.disabled' }}>
                        Chỉ cho phép ảnh có định dạng PNG, JPG hoặc JPEG. Dung lượng tối đa 0.5mb.
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
                <CardContent>
                  <LoadingSpinner active={loading}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='lastName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                fullWidth
                                label='Họ & tên đệm'
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
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='firstName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                fullWidth
                                label='Tên'
                                placeholder=''
                                value={value ?? ''}
                                onChange={onChange}
                                error={Boolean(errors.firstName)}
                              />
                            )}
                          />
                          {errors.firstName && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                fullWidth
                                type='email'
                                label='Email'
                                value={value ?? ''}
                                placeholder='student@thi360.com'
                                onChange={onChange}
                              />
                            )}
                          />
                        </FormControl>
                        <FormHelperText sx={{ color: 'error.default' }}>
                          Khi đổi email, hệ thống sẽ yêu cầu bạn xác thực lại email. <br />
                        </FormHelperText>
                        {errors.email && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                        )}
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
                            Email chưa được xác nhận.
                          </Alert>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='phoneNumber'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                fullWidth
                                type='number'
                                label='Điện thoại'
                                value={value ?? ''}
                                placeholder='098 463 5688'
                                onChange={onChange}
                                error={Boolean(errors.phoneNumber)}
                              />
                            )}
                          />
                          {errors.phoneNumber && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.phoneNumber.message}</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='address'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                fullWidth
                                label='Địa chỉ'
                                placeholder='Số 1, Đường A, Phường B, Quận C, TP Hà Nội'
                                value={value ?? ''}
                                onChange={onChange}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <FormControl fullWidth>
                          <Controller
                            name='gender'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <>
                                <InputLabel>Giới tính</InputLabel>
                                <Select label='Giới tính' value={value ?? '0'} onChange={onChange}>
                                  <MenuItem value='-1'>Chọn giới tính</MenuItem>
                                  <MenuItem value='0'>Nam</MenuItem>
                                  <MenuItem value='1'>Nữ</MenuItem>
                                </Select>
                              </>
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <FormControl fullWidth>
                          <Controller
                            name='dob'
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                label='Ngày sinh'
                                dateFormat='dd-MM-yyyy'
                                selected={field.value != null ? new Date(field.value) : new Date()}
                                customInput={<CustomInput fullWidth label='Ngày sinh' />}
                                onChange={date => {
                                  field.onChange(date.toISOString())
                                }}
                              />
                            )}
                          />
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
                  </LoadingSpinner>
                </CardContent>
              </form>
            </Card>
          </Grid>

          {/* Delete Account Card */}
          <Grid item xs={12}>
            <SelfRemoveAccount />
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </Fragment>
  )
}

export default TabAccount
