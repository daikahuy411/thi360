import {
  useEffect,
  useState
} from 'react'

import OrganizationApi from 'api/organization-api'
import UserApi from 'api/user-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ClassDialog from 'pages/shared/class-dialog'
import Draggable from 'react-draggable'
import {
  Controller,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import { selectClass } from 'store/slices/classSlice'
import {
  selectedUser,
  selectUser
} from 'store/slices/userSlice'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import TopNav from '../_layout/_breadcrums'
import Nav from '../_layout/_tabs'

const schema = yup.object().shape(
  {
    firstName: yup.string().required('* bắt buộc'),
    lastName: yup.string().required('* bắt buộc'),
    userName: yup.string().required('* bắt buộc'),
    changePassword: yup.boolean(),
    passwordHash: yup.string().when('changePassword', {
      is: true,
      then: yup.string().required('* bắt buộc').min(6, '* tối thiểu 6 ký tự'),
      otherwise: yup.string().nullable().notRequired()
    }),
    gender: yup.number().required('* bắt buộc').moreThan(-1, '* bắt buộc'),
    // organizationId: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc'),
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

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const EditUserPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { userId, classId } = router.query
  const currentUser = useSelector(selectedUser)
  const [openClassDialog, setOpenClassDialog] = useState(false)
  const [cbChangePassword, setCbChangePassword] = useState(false)

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentUser,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!userId || userId == 0) {
      dispatch(
        selectUser({ id: '0', firstName: '', lastName: '', userName: '', passwordHash: '', changePassword: false })
      )
      return
    }
    fetchData()
  }, [userId])

  useEffect(() => {
    if (!classId || classId == 0) {
      dispatch(selectClass({ id: 0, name: '', description: '', group: 0 }))
      return
    }

    new OrganizationApi().get(classId).then(response => {
      dispatch(selectClass(response.data))
      setOrganizationSelected({
        id: response.data.id,
        name: response.data.name
      })
      setValue('organizationId', response.data.id)
    })
  }, [classId])

  useEffect(() => {
    if (currentUser) reset(currentUser)
  }, [currentUser])

  const fetchData = () => {
    new UserApi()
      .getUserProfile(userId)
      .then(response => {
        dispatch(selectUser(response.data))

        setOrganizationSelected({
          id: response.data.organizationId,
          name: response.data.organizationName
        })
      })
      .catch(e => console.log(e))
  }

  /*
   * handle save
   */
  const save = code => {
    const item = getValues()
    let param
    if (item.id == '0') {
      param = { ...item, changePassword: cbChangePassword, organizationId: organizationSelected.id }
    } else {
      if (cbChangePassword) {
        param = { ...item, changePassword: cbChangePassword, organizationId: organizationSelected.id }
      } else {
        param = {
          ...item,
          passwordHash: undefined,
          changePassword: cbChangePassword,
          organizationId: organizationSelected.id
        }
      }
    }

    new UserApi()
      .save(param)
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code === 1) {
          router.push(classId ? `/apps/class/${classId}/users` : `/apps/user`)
        } else {
          reset()
        }
      })
      .catch(e => {
        const errors = []
        Object.keys(e.response.data).forEach(key => {
          errors.push({ name: key, errors: e.response.data[key] })
        })

        errors.forEach(elm => {
          toast.error(elm.errors)
        })
      })
  }

  const onSubmit = data => {
    new UserApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }
  /*
   * end handle save
   */

  /*
   * handle input password
   */
  const [showPassword, setShowPassword] = useState(true)

  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  /*
   * end handle input password
   */

  /*
   * handle organization (Lớp học)
   */
  const [organizationSelected, setOrganizationSelected] = useState({ id: 0, name: '' })
  const cleanOrganization = () => {
    currentUser.organizationId = 0
    dispatch(selectUser(currentUser))
    setOrganizationSelected({ id: 0, name: '' })
  }

  /*
   * end handle organization
   */

  /*
   * remove user
   */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (!userId || userId !== '0') {
      new UserApi()
        .delete({ id: userId })
        .then(response => {
          toast.success('Xóa dữ liệu thành công.')
          router.push('/apps/user/')
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }
  /*
   * end remove user
   */

  const updateUserClass = selectedClass => {
    setValue('organizationId', selectedClass.id)
    setOrganizationSelected(selectedClass)
  }

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
                      {currentUser && currentUser.id != '0' && (
                        <span>
                          {currentUser.userName} - {currentUser.fullName}
                        </span>
                      )}
                      {(!currentUser || currentUser.id == 0) && <span>Tạo mới Học viên</span>}
                    </span>
                    {currentUser && currentUser.id != '' && (
                      <IconButton aria-label='info'>
                        <HelpOutlineIcon />
                      </IconButton>
                    )}
                  </h3>
                  <span className='right'>
                    {currentUser && currentUser.id != '0' && (
                      <>
                        <IconButton aria-label='delete' onClick={handleClickOpenDelete}>
                          <DeleteIcon />
                        </IconButton>
                        &nbsp;
                      </>
                    )}
                    <Button
                      variant='outlined'
                      component={Link}
                      href={classId ? `/apps/class/${classId}/users` : `/apps/user`}
                    >
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                    &nbsp;
                    <Button disabled={!isValid} onClick={() => save(1)} variant='contained'>
                      Cập nhật
                    </Button>
                    {(!currentUser || currentUser.id == 0) && (
                      <>
                        &nbsp;
                        <Button disabled={!isValid} onClick={() => save(2)} variant='contained'>
                          Cập nhật &amp; Thêm mới
                        </Button>
                      </>
                    )}
                  </span>
                </div>
                <div className='grid-block'>
                  <Nav />
                  <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', paddingTop: 10 }}>
                      <Grid container spacing={5} maxWidth={'sm'}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <Controller
                              name='lastName'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  inputProps={{ maxLength: 20 }}
                                  value={value ?? ''}
                                  label='Họ'
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
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <Controller
                              name='firstName'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value ?? ''}
                                  label='Tên'
                                  inputProps={{ maxLength: 20 }}
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
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <Controller
                              name='userName'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <>
                                  <InputLabel htmlFor='outlined-adornment-username'>Tên đăng nhập</InputLabel>
                                  <OutlinedInput
                                    value={value ?? ''}
                                    label='Tên đăng nhập'
                                    required
                                    disabled={currentUser && currentUser.id != '0' ? true : false}
                                    inputProps={{ maxLength: 50 }}
                                    onChange={onChange}
                                    error={Boolean(errors.userName)}
                                    aria-describedby='validation-schema-userName'
                                    endAdornment={
                                      <InputAdornment position='end'>
                                        <Tooltip
                                          placement='right-start'
                                          title='Sử dụng số điện thoại hoặc email đặt cho tên đăng nhập để tránh trùng với học viên của toàn bộ hệ thống.'
                                        >
                                          <IconButton>
                                            <InfoOutlinedIcon />
                                          </IconButton>
                                        </Tooltip>
                                      </InputAdornment>
                                    }
                                  />
                                </>
                              )}
                            />
                            {errors.userName && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                {errors.userName.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {(!currentUser || currentUser.id == 0 || cbChangePassword) && (
                            <FormControl fullWidth>
                              <Controller
                                name='passwordHash'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <InputLabel htmlFor='outlined-adornment-password'>Mật khẩu</InputLabel>
                                    <OutlinedInput
                                      id='outlined-adornment-password'
                                      value={value ?? ''}
                                      required
                                      onChange={onChange}
                                      error={Boolean(errors.passwordHash)}
                                      aria-describedby='validation-schema-firstName'
                                      type={showPassword ? 'text' : 'password'}
                                      inputProps={{ maxLength: 50 }}
                                      endAdornment={
                                        <InputAdornment position='end'>
                                          <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge='end'
                                          >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                          &nbsp;
                                          <Tooltip
                                            placement='right-start'
                                            title='Mật khẩu có tối đa 6 ký tự, bao gồm ít nhất 1 ký tự đặc biệt và ít nhất 1 ký tự không phải là số.'
                                          >
                                            <IconButton>
                                              <InfoOutlinedIcon />
                                            </IconButton>
                                          </Tooltip>
                                        </InputAdornment>
                                      }
                                      label='Password'
                                    />
                                  </>
                                )}
                              />
                              {errors.passwordHash && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-firstName'>
                                  {errors.passwordHash.message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          )}
                        </Grid>
                        {currentUser && currentUser.id != '0' && (
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              name='changePassword'
                              control={
                                <Controller
                                  name='changePassword'
                                  control={control}
                                  rules={{ required: false }}
                                  render={({ field: { value, onChange } }) => (
                                    <Checkbox
                                      checked={value ?? false}
                                      onChange={e => {
                                        onChange(e)
                                        setCbChangePassword(e.target.checked)
                                      }}
                                    />
                                  )}
                                />
                              }
                              label='Đổi mật khẩu'
                            />
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <FormControl fullWidth variant='outlined'>
                            <Controller
                              name='organizationId'
                              control={control}
                              // rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <>
                                  <InputLabel htmlFor='outlined-adornment-parent-class'>Lớp học</InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-parent-class'
                                    inputprops={{
                                      readOnly: true,
                                      className: 'Mui-disabled'
                                    }}
                                    value={organizationSelected.name ?? ''}
                                    endAdornment={
                                      <InputAdornment position='end'>
                                        <IconButton edge='end' onClick={() => cleanOrganization()}>
                                          <DeleteOutline />
                                        </IconButton>
                                        &nbsp;
                                        <IconButton
                                          edge='end'
                                          onClick={() => {
                                            setOpenClassDialog(true)
                                          }}
                                        >
                                          <FolderIcon />
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                    label='Lớp học'
                                  />
                                </>
                              )}
                            />
                            {/* {errors.organizationId && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-organizationId'>
                                {errors.organizationId.message}
                              </FormHelperText>
                            )} */}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <Controller
                              name='gender'
                              rules={{ required: true }}
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <>
                                  <InputLabel id='demo-simple-select-label' required>
                                    Giới tính
                                  </InputLabel>
                                  <Select
                                    label='Giới tính'
                                    labelId='demo-simple-select-label'
                                    aria-describedby='validation-schema-group'
                                    error={Boolean(errors.gender)}
                                    value={value ?? -1}
                                    onChange={onChange}
                                  >
                                    <MenuItem value={-1}>Chọn giới tính</MenuItem>
                                    <MenuItem value={0}>Nam</MenuItem>
                                    <MenuItem value={1}>Nữ</MenuItem>
                                  </Select>
                                </>
                              )}
                            />
                            {errors.gender && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-group'>
                                {errors.gender.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <Controller
                              name='email'
                              control={control}
                              rules={{ required: false }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value ?? ''}
                                  inputProps={{ maxLength: 250 }}
                                  label='Email'
                                  onChange={onChange}
                                  aria-describedby='validation-schema-firstName'
                                />
                              )}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <Controller
                              name='phoneNumber'
                              control={control}
                              rules={{ required: false }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value ?? ''}
                                  label='Số điện thoại'
                                  inputProps={{ maxLength: 20 }}
                                  onChange={onChange}
                                  error={Boolean(errors.phoneNumber)}
                                  aria-describedby='validation-schema-firstName'
                                />
                              )}
                            />
                            {errors.phoneNumber && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                {errors.phoneNumber.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <Controller
                              name='address'
                              control={control}
                              rules={{ required: false }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  inputProps={{ maxLength: 500 }}
                                  multiline
                                  rows={2}
                                  fullWidth
                                  value={value ?? ''}
                                  label='Địa chỉ'
                                  onChange={onChange}
                                />
                              )}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </form>

                    {openClassDialog && (
                      <ClassDialog
                        onOk={selectedClass => {
                          updateUserClass(selectedClass)
                        }}
                        onClose={() => {
                          setOpenClassDialog(false)
                        }}
                        open={openClassDialog}
                      />
                    )}

                    <Dialog
                      open={openDelete}
                      onClose={handleCloseDelete}
                      PaperComponent={PaperComponent}
                      aria-labelledby='draggable-dialog-title'
                    >
                      <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
                        Xác nhận
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa học viên này không?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleCloseDelete}>
                          {' '}
                          Hủy bỏ{' '}
                        </Button>
                        <Button onClick={handleDelete} color='error'>
                          Đồng ý
                        </Button>
                      </DialogActions>
                    </Dialog>
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

export default EditUserPage
