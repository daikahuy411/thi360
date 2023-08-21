import * as React from 'react'
import { useEffect } from 'react'

import TenantApi from 'api/tenant-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import Draggable from 'react-draggable'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { selectedExam, selectExam } from 'store/slices/examSlice'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import TopNav from '../_layout/_breadcrums'

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc'),
  description: yup.string()
})

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const EditTenantPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { tenantId } = router.query
  const currentTenant = useSelector(selectedExam)

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentTenant,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!tenantId || tenantId == 0) {
      dispatch(selectExam({ id: 0, name: '', description: '' }))
      return
    }
    new TenantApi().get(tenantId).then(response => {
      dispatch(selectExam(response.data))
    })
  }, [tenantId])

  useEffect(() => {
    if (currentTenant) reset(currentTenant)
  }, [currentTenant])

  /*
   * handle save
   */
  const save = code => {
    const item = getValues()

    new TenantApi()
      .save(item)
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code == 1) {
          router.push('/apps/tenant/')
        } else {
          reset()
        }
      })
      .catch(e => {
        toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
      })
  }

  const onSubmit = data => {
    new TenantApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }
  /*
   * end handle save
   */

  /*
   * handle remove exam
   */
  const [openDelete, setOpenDelete] = React.useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (!tenantId || tenantId > 0) {
      new TenantApi()
        .delete({ id: tenantId })
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          router.push(`/apps/tenant/`)
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }
  /*
   * handle remove exam
   */

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{currentTenant && currentTenant.id > 0 ? `Chi tiết ${currentTenant.name}` : 'Tạo mới'}</title>
        </Helmet>
        <div style={{ padding: 0 }}>
          <div sx={{ py: 5.375 }} style={{ padding: 0 }}>
            <>
              <TopNav />
              <Box style={{ marginTop: 2 }}>
                <div className='grid-block vertical'>
                  <div className='title-bar' id='EntityHeadingTitleBar'>
                    <h3 className='title left'>
                      <span className='title__label'>
                        {currentTenant && currentTenant.id > 0 && <span>{currentTenant.name}</span>}
                        {(!currentTenant || currentTenant.id == 0) && <span>Tạo mới</span>}
                      </span>
                      {currentTenant && currentTenant.id > 0 && <EntityInfoModal entity={currentTenant} />}
                    </h3>
                    <span className='right'>
                      {currentTenant && currentTenant.id > 0 && (
                        <>
                          <IconButton aria-label='delete' onClick={handleClickOpenDelete}>
                            <DeleteIcon />
                          </IconButton>
                          &nbsp;
                        </>
                      )}
                      <Button variant='outlined' component={Link} href='/apps/tenant/'>
                        <ArrowBackIcon />
                        &nbsp;Quay lại
                      </Button>
                      &nbsp;
                      <Button disabled={!isValid} onClick={() => save(1)} variant='contained'>
                        Cập nhật
                      </Button>
                      {(!currentTenant || currentTenant.id == 0) && (
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
                    <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ height: '100vh', width: '100%', paddingTop: 10 }}
                      >
                        <Grid container spacing={5}>
                          <Grid item xs={12} md={8}>
                            <Grid container spacing={5}>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <Controller
                                    name='name'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                      <TextField
                                        value={value ?? ''}
                                        label='Tên'
                                        InputLabelProps={{ shrink: true }}
                                        required
                                        onChange={onChange}
                                        error={Boolean(errors.name)}
                                        aria-describedby='validation-schema-name'
                                      />
                                    )}
                                  />
                                  {errors.name && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                      {errors.name.message}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <Controller
                                    name='description'
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field: { value, onChange } }) => (
                                      <TextField
                                        multiline
                                        rows={3}
                                        fullWidth
                                        value={value ?? ''}
                                        label='Mô tả'
                                        InputLabelProps={{ shrink: true }}
                                        onChange={onChange}
                                      />
                                    )}
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Grid container spacing={5}></Grid>
                          </Grid>
                        </Grid>
                      </form>

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
                            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Tenant này không?
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
      </HelmetProvider>
    </>
  )
}

export default EditTenantPage
