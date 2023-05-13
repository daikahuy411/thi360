import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Controller,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import OrganizationApi from 'src/api/organization-api'
import {
  selectClass,
  selectedClass
} from 'src/store/slices/classSlice'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import TopNav from '../_layout/_breadcrums'
import Nav from '../_layout/_tabs'

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc'),
  group: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc')
})

const EditClassPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { classId } = router.query
  const currentClass = useSelector(selectedClass)

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentClass,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const save = () => {
    const item = getValues()
    new OrganizationApi().save(item).then(response => {
      toast.success('Cập nhật thành công')
    })
  }

  const onSubmit = data => {
    new OrganizationApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }

  useEffect(() => {
    if (!classId || classId == 0) {
      dispatch(selectClass({ id: 0, name: '' }))
      return
    }
    new OrganizationApi().get(classId).then(response => {
      // setItem(response.data)
      dispatch(selectClass(response.data))
    })
  }, [classId])

  useEffect(() => {
    if (currentClass) reset(currentClass)
  }, [currentClass])

  return (
    <>
      <div style={{ padding: 0 }}>
        <div sx={{ py: 5.375 }} style={{ padding: 0 }}>
          <>
            <TopNav />
            <Box style={{ marginTop: 2 }}>
              <div className='grid-block vertical'>
                <div className='title-bar' id='EntityHeadingTitleBar'>
                  <h3 className='title left'>
                    <span className='title__label'>
                      {currentClass && currentClass.id > 0 && <span>{currentClass.name}</span>}
                      {(!currentClass || currentClass.id == 0) && <span>Tạo mới Học viên</span>}
                    </span>
                    {currentClass && currentClass.id > 0 && (
                      <IconButton aria-label='delete'>
                        <HelpOutlineIcon />
                      </IconButton>
                    )}
                  </h3>
                  <span className='right'>
                    {currentClass && currentClass.id > 0 && (
                      <>
                        <IconButton aria-label='delete'>
                          <DeleteIcon />
                        </IconButton>
                        &nbsp;
                      </>
                    )}
                    <Button variant='outlined' component={Link} href='/apps/user/'>
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                    &nbsp;
                    <Button disabled={!isValid} onClick={save} variant='contained'>
                      Cập nhật
                    </Button>
                    {(!currentClass || currentClass.id == 0) && (
                      <>
                        &nbsp;
                        <Button disabled={!isValid} variant='contained'>
                          Cập nhật &amp; Thêm mới
                        </Button>
                      </>
                    )}
                  </span>
                </div>
                <div className='grid-block'>
                  <Nav />
                  <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100vh', paddingTop: 10 }}>
                      <Grid container spacing={5} maxWidth={"sm"}>
                        <Grid item xs={12} >
                          <FormControl fullWidth>
                            <Controller
                              name='lastName'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Họ'
                                  InputLabelProps={{ shrink: true }}
                                  required
                                  onChange={onChange}
                                  error={Boolean(errors.lastName)}
                                  aria-describedby='validation-schema-lastName'
                                />
                              )}
                            />
                            {errors.lastName && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                {errors.lastName.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                          <FormControl fullWidth>
                            <Controller
                              name='firstName'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Tên'
                                  InputLabelProps={{ shrink: true }}
                                  required
                                  onChange={onChange}
                                  error={Boolean(errors.firstName)}
                                  aria-describedby='validation-schema-firstName'
                                />
                              )}
                            />
                            {errors.firstName && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-firstName'>
                                {errors.firstName.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                          <FormControl fullWidth>
                            <Controller
                              name='userName'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Tên đăng nhập'
                                  InputLabelProps={{ shrink: true }}
                                  required
                                  onChange={onChange}
                                  error={Boolean(errors.userName)}
                                  aria-describedby='validation-schema-userName'
                                />
                              )}
                            />
                            {errors.userName && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                {errors.userName.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                          <FormControl fullWidth>
                            <Controller
                              name='firstName'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Mật khẩu'
                                  InputLabelProps={{ shrink: true }}
                                  required
                                  onChange={onChange}
                                  error={Boolean(errors.firstName)}
                                  aria-describedby='validation-schema-firstName'
                                />
                              )}
                            />
                            {errors.firstName && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-firstName'>
                                {errors.firstName.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                          <FormControl fullWidth>
                            <Controller
                              name='group'
                              rules={{ required: true }}
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <>
                                  <InputLabel id='demo-simple-select-label' required>
                                    Giới tính
                                  </InputLabel>
                                  <Select
                                    label='Khối lớp'
                                    labelId='demo-simple-select-label'
                                    aria-describedby='validation-schema-group'
                                    error={Boolean(errors.group)}
                                    value={value}
                                    onChange={onChange}
                                  >
                                    <MenuItem value={0}>Chọn Khối lớp</MenuItem>
                                    <MenuItem value={1}>Khối 1</MenuItem>
                                    <MenuItem value={2}>Khối 2</MenuItem>
                                  </Select>
                                </>
                              )}
                            />
                            {errors.group && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-group'>
                                {errors.group.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                          <FormControl fullWidth>
                            <Controller
                              name='firstName'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Địa chỉ'
                                  InputLabelProps={{ shrink: true }}
                                  onChange={onChange}
                                  error={Boolean(errors.firstName)}
                                  aria-describedby='validation-schema-firstName'
                                />
                              )}
                            />
                            {errors.firstName && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-firstName'>
                                {errors.firstName.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                          <FormControl fullWidth>
                            <Controller
                              name='firstName'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Email'
                                  InputLabelProps={{ shrink: true }}
                                  onChange={onChange}
                                  error={Boolean(errors.firstName)}
                                  aria-describedby='validation-schema-firstName'
                                />
                              )}
                            />
                            {errors.firstName && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-firstName'>
                                {errors.firstName.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                          <FormControl fullWidth>
                            <Controller
                              name='firstName'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Số điện thoại'
                                  InputLabelProps={{ shrink: true }}
                                  onChange={onChange}
                                  error={Boolean(errors.firstName)}
                                  aria-describedby='validation-schema-firstName'
                                />
                              )}
                            />
                            {errors.firstName && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-firstName'>
                                {errors.firstName.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </div>
              </div>
            </Box>
          </>
        </div>
      </div>
    </>
  )
}

export default EditClassPage
