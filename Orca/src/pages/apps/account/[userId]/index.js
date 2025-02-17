import {
  useEffect,
  useState
} from 'react'

import OrganizationApi from 'api/organization-api'
import UserApi from 'api/user-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CatalogDialog from 'pages/shared/catalog-dialog'
import TenantSelector from 'pages/shared/tenant-selector'
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
import {
  selectAccount,
  selectedAccount
} from 'store/slices/accountSlice'
import { CatalogType } from 'types/CatalogType'
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
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
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

const EditAccountPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { userId } = router.query
  const currentUser = useSelector(selectedAccount)
  const [openCatalogDialog, setOpenCatalogDialog] = useState(false)
  const [openTenantDialog, setOpenTenantDialog] = useState(false)
  const [cbChangePassword, setCbChangePassword] = useState(false)
  const [roles, setRoles] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([])

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentUser,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    new UserApi()
      .getAllRoles(userId)
      .then(response => {
        setRoles(response.data)
      })
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    if (!userId || userId == 0) {
      dispatch(
        selectAccount({ id: '0', firstName: '', lastName: '', userName: '', passwordHash: '', changePassword: false })
      )
      return
    }
    fetchData()
  }, [userId])

  useEffect(() => {
    if (currentUser) reset(currentUser)
  }, [currentUser])

  const fetchData = () => {
    new UserApi()
      .getUserProfile(userId)
      .then(response => {
        dispatch(selectAccount(response.data))

        setOrganizationSelected({
          organizationId: response.data.organizationId,
          organizationName: response.data.organizationName
        })

        setTenantSelected({
          id: response.data.tenantId,
          name: response.data.tenantName
        })

        setSelectedRoles(response.data.roles)
      })
      .catch(e => console.log(e))
  }

  const handleRoleChange = event => {
    if (event.target.checked) {
      var newRoles = [...selectedRoles]
      newRoles.push(event.target.name)
      setSelectedRoles([...newRoles])
    } else {
      var newRoles = [...selectedRoles]
      newRoles = newRoles.filter(e => e !== event.target.name)
      setSelectedRoles([...newRoles])
    }
  }

  /*
   * handle save
   */
  const save = code => {
    const item = getValues()
    let param
    if (item.id == '0') {
      param = { ...item, changePassword: cbChangePassword, organizationId: organizationSelected.organizationId }
    } else {
      if (cbChangePassword) {
        param = { ...item, changePassword: cbChangePassword, organizationId: organizationSelected.organizationId }
      } else {
        param = {
          ...item,
          passwordHash: undefined,
          changePassword: cbChangePassword,
          organizationId: organizationSelected.organizationId
        }
      }
    }

    param.roles = selectedRoles
    param.tenantId = tenantSelected.id

    new UserApi()
      .save(param)
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code === 1) {
          router.push('/apps/account/')
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
   * handle organization
   */
  const [organizationSelected, setOrganizationSelected] = useState({ organizationId: 0, organizationName: '' })
  const handleSelectedOrganization = selectedId => {
    new OrganizationApi().get(selectedId).then(response => {
      if (response.data) {
        setOrganizationSelected({ organizationId: selectedId, organizationName: response.data.name })
      }
    })
  }

  const cleanOrganization = () => {
    setOrganizationSelected({ organizationId: 0, organizationName: '' })
  }

  /*
   * end handle organization
   */

  const [tenantSelected, setTenantSelected] = useState({ id: 0, name: '' })
  const handleSelectedTenant = tenant => {
    setTenantSelected(tenant)
  }

  const cleanTenant = () => {
    setTenantSelected({ id: 0, name: '' })
  }

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
          router.push('/apps/account/')
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
                    <Button variant='outlined' component={Link} href='/apps/account/'>
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
                                <TextField
                                  value={value ?? ''}
                                  label='Tên đăng nhập'
                                  required
                                  disabled={currentUser && currentUser.id != '0' ? true : false}
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
                                    label='Khối lớp'
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
                        {/* <Grid item xs={12} md={6}>
                          <FormControlLabel
                            name='isDayBoarding'
                            control={
                              <Controller
                                name='isDayBoarding'
                                control={control}
                                rules={{ required: false }}
                                render={({ field: { value, onChange } }) => (
                                  <Checkbox checked={value ?? false} onChange={onChange} />
                                )}
                              />
                            }
                            label='Bán trú'
                          />
                        </Grid> */}
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <Controller
                              name='address'
                              control={control}
                              rules={{ required: false }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
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
                        <Grid item xs={12}>
                          <FormControl fullWidth variant='outlined'>
                            <Controller
                              name='tenantId'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <>
                                  <InputLabel htmlFor='outlined-adornment-parent-category'>Tenant</InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-parent-category'
                                    inputprops={{
                                      readOnly: true,
                                      className: 'Mui-disabled'
                                    }}
                                    value={tenantSelected.name ?? ''}
                                    endAdornment={
                                      <InputAdornment position='end'>
                                        <IconButton
                                          aria-label='toggle password visibility'
                                          edge='end'
                                          onClick={cleanTenant}
                                        >
                                          <DeleteOutline />
                                        </IconButton>
                                        &nbsp;
                                        <IconButton
                                          edge='end'
                                          onClick={() => {
                                            setOpenTenantDialog(true)
                                          }}
                                        >
                                          <FolderIcon />
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                    label='Tenant'
                                  />
                                </>
                              )}
                            />
                          </FormControl>
                        </Grid>
                        {/* <Grid item xs={12}>
                          <FormControl fullWidth variant='outlined'>
                            <Controller
                              name='organizationId'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <>
                                  <InputLabel htmlFor='outlined-adornment-parent-category'>Đơn vị</InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-parent-category'
                                    inputprops={{
                                      readOnly: true,
                                      className: 'Mui-disabled'
                                    }}
                                    value={organizationSelected.organizationName ?? 0}
                                    endAdornment={
                                      <InputAdornment position='end'>
                                        <IconButton
                                          aria-label='toggle password visibility'
                                          edge='end'
                                          onClick={cleanOrganization}
                                        >
                                          <DeleteOutline />
                                        </IconButton>
                                        &nbsp;
                                        <IconButton
                                          edge='end'
                                          onClick={() => {
                                            setOpenCatalogDialog(true)
                                          }}
                                        >
                                          <FolderIcon />
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                    label='Đơn vị'
                                  />
                                </>
                              )}
                            />
                          </FormControl>
                        </Grid> */}
                        <Grid item xs={12}>
                          <FormControl>
                            <FormLabel>Phân quyền</FormLabel>
                            <FormGroup>
                              {roles &&
                                roles.map(item => (
                                  <FormControlLabel
                                    label={`${item.name}`}
                                    key={`${item.id}`}
                                    checked={selectedRoles && selectedRoles.indexOf(item.name) > -1}
                                    control={<Checkbox onChange={handleRoleChange} name={`${item.name}`} />}
                                  />
                                ))}
                            </FormGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </form>

                    {openCatalogDialog && (
                      <CatalogDialog
                        categoryType={CatalogType.DOCUMENT_ORGANIZATION}
                        excludedId={0}
                        onNodeSelected={nodeId => {
                          handleSelectedOrganization(nodeId)
                        }}
                        onClose={() => {
                          setOpenCatalogDialog(false)
                        }}
                        open={openCatalogDialog}
                      />
                    )}

                    {openTenantDialog && (
                      <TenantSelector
                        onNodeSelected={x => {
                          handleSelectedTenant(x)
                        }}
                        onClose={() => {
                          setOpenTenantDialog(false)
                        }}
                        open={openTenantDialog}
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

export default EditAccountPage
