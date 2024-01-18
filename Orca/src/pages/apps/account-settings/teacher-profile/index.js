import 'dayjs/locale/vi'

import {
  Fragment,
  useEffect,
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
import * as yup from 'yup'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const initialData = {
  name: '',
  description: ''
}

moment().format('DD/MM/YYYY')

const schema = yup.object().shape({
  name: yup.string().required('Tên không được để trống'),
  description: yup.string().required('Địa chỉ không được để trống')
})

const TeacherProfile = props => {
  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [tenantLoading, setTenantLoading] = useState(false)
  const [teacherLoading, setTeacherLoading] = useState(false)
  const [data, setData] = useState(null)
  const router = useRouter()
  const [agreed, setAgreed] = useState(false)

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
    me()
  }, [])

  const me = () => {
    setLoading(true)
    new V1Api()
      .me()
      .then(response => {
        setData(response.data)
        setLoading(false)
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
      })

    new V1Api()
      .getTenant()
      .then(response => {
        setFormData(response.data.value)
      })
      .catch(e => {
        console.log(e)
      })
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

  const onSubmit = async () => {
    setTenantLoading(true)
    const item = getValues()
    new V1Api()
      .updateTenant(item)
      .then(response => {
        setTenantLoading(false)
        const data = response.data
        if (data.succeeded) {
          toast.success('Cập nhật dữ liệu thành công')
        } else {
          toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
        }
      })
      .catch(e => {
        setTenantLoading(false)
      })
  }

  const requestBecomeTeacher = () => {
    setTeacherLoading(true)
    new V1Api()
      .requestBecomeTeacher()
      .then(response => {
        setTeacherLoading(false)
      })
      .catch(e => {
        setTeacherLoading(false)
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
            <CardContent>
              <div>
                <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                  1. Thông tin tài khoản
                </Typography>
              </div>
              <LoadingSpinner active={loading}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: true }}
                      value={data?.email}
                      label='Email'
                    />
                    {data && data.emailConfirmed && (
                      <Alert severity='success' style={{ marginTop: 5 }}>
                        Email đã xác nhận thành công.
                      </Alert>
                    )}
                    {data && !data.emailConfirmed && (
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
          </Card>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <LoadingSpinner active={tenantLoading}>
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
                              error={Boolean(errors.name)}
                            />
                          )}
                        />
                        {errors.name && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <Controller
                          name='description'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              fullWidth
                              multiline
                              label='Địa chỉ'
                              placeholder=''
                              value={value ?? ''}
                              onChange={onChange}
                              error={Boolean(errors.description)}
                            />
                          )}
                        />
                        {errors.description && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                        Cập nhật
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </LoadingSpinner>
          </form>
          <br />
          <LoadingSpinner active={teacherLoading}>
            <Card>
              <CardContent>
                <div>
                  <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                    3. Đăng ký Hồ sơ giáo viên
                  </Typography>
                </div>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    <FormControlLabel
                      sx={{
                        ...(errors.terms ? { color: 'error.main' } : null),
                        '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
                      }}
                      control={
                        <Checkbox
                          checked={agreed || (data && data.requestBecomeTeacher)}
                          onChange={e => setAgreed(!agreed)}
                          sx={errors.terms ? { color: 'error.main' } : null}
                        />
                      }
                      label={
                        <Fragment>
                          <Typography variant='body2' component='span' sx={{ color: errors.terms ? 'error.main' : '' }}>
                            Tôi đăng ký hồ sơ giáo viên.
                          </Typography>
                        </Fragment>
                      }
                    />
                    {data && data.requestBecomeTeacher && data.requestBecomeTeacherDate && (
                      <FormHelperText>
                        Gửi đăng ký vào ngày: {moment(data.requestBecomeTeacherDate).format('DD-MM-YYYY HH:mm')}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {data && !data.requestBecomeTeacher && (
                      <Button
                        variant='contained'
                        type='submit'
                        onClick={() => requestBecomeTeacher()}
                        disabled={!(agreed && data && data.emailConfirmed)}
                        sx={{ mr: 4 }}
                        startIcon={<Icon icon='mdi:send' />}
                      >
                        Gửi Đăng ký
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </LoadingSpinner>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default TeacherProfile
