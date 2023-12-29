'use client' // only in App Router
import * as React from 'react'
import { useEffect } from 'react'

import TestGroupSectionApi from 'api/test-group-section-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import Draggable from 'react-draggable'
import {
  Helmet,
  HelmetProvider
} from 'react-helmet-async'
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
  selectedTestGroupSection,
  selectTestGroupSection
} from 'store/slices/testGroupSectionSlice'
import * as yup from 'yup'

import ContentEditor from '@core/components/editor'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
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
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import TopNav from '../_layout/_breadcrums'
import Nav from '../_layout/_tabs'

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

const SectionEditForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const currentTestGroupSection = useSelector(selectedTestGroupSection)
  const { testGroupId, sectionId } = router.query

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentClass: currentTestGroupSection,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!sectionId || sectionId == 0) {
      dispatch(selectTestGroupSection({ id: 0, name: '', description: '' }))
      return
    }
    new TestGroupSectionApi().get(sectionId).then(response => {
      dispatch(selectTestGroupSection(response.data))
    })
  }, [sectionId])

  useEffect(() => {
    if (currentTestGroupSection) reset(currentTestGroupSection)
  }, [currentTestGroupSection])

  /*
   * handle save
   */
  const save = code => {
    const item = getValues()
    new TestGroupSectionApi()
      .save({ ...item, testGroupId: testGroupId })
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code == 1) {
          router.query.sectionId = response.data.id
          router.push(router)
        } else {
          reset()
        }
      })
      .catch(() => {
        toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu.')
      })
  }

  const onSubmit = data => {
    new TestGroupSectionApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }
  /*
   * handle save
   */

  /*
   * remove test-group-section
   */
  const [openDelete, setOpenDelete] = React.useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (!sectionId || sectionId > 0) {
      new TestGroupSectionApi()
        .delete({ id: sectionId })
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          router.push(`/apps/test-group/${testGroupId}/sections`)
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }
  /*
   * remove test-group-section
   */

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            {currentTestGroupSection && currentTestGroupSection.id > 0
              ? currentTestGroupSection.name
              : 'Tạo mới Phần thi'}
          </title>
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
                        {currentTestGroupSection && currentTestGroupSection.id > 0 && (
                          <span>{currentTestGroupSection.name}</span>
                        )}
                        {(!currentTestGroupSection || currentTestGroupSection.id == 0) && <span>Tạo mới Phần thi</span>}
                      </span>
                      {currentTestGroupSection && currentTestGroupSection.id > 0 && (
                        <EntityInfoModal entity={currentTestGroupSection} />
                      )}
                    </h3>
                    <span className='right'>
                      {currentTestGroupSection && currentTestGroupSection.id > 0 && (
                        <>
                          <IconButton aria-label='delete' onClick={handleClickOpenDelete}>
                            <DeleteIcon />
                          </IconButton>
                          &nbsp;
                        </>
                      )}
                      <Button variant='outlined' component={Link} href={`/apps/test-group/${testGroupId}/sections`}>
                        <ArrowBackIcon />
                        &nbsp;Quay lại
                      </Button>
                      &nbsp;
                      <Button disabled={!isValid} onClick={() => save(1)} variant='contained'>
                        Cập nhật
                      </Button>
                      {(!currentTestGroupSection || currentTestGroupSection.id == 0) && (
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
                      <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100vh', paddingTop: 10 }}>
                        <Grid container spacing={5} maxWidth={"md"}>
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
                                name='order'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                  <TextField
                                    value={value ?? ''}
                                    type='number'
                                    label='Thứ tự'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={onChange}
                                    error={Boolean(errors.order)}
                                    aria-describedby='validation-schema-order'
                                  />
                                )}
                              />
                              {errors.order && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-order'>
                                  {errors.order.message}
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
                          <Grid item xs={12}>
                            <Typography>Nội dung Hướng dẫn</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl fullWidth>
                              <Controller
                                name='content'
                                control={control}
                                rules={{ required: false }}
                                render={({ field: { value, onChange } }) => (
                                  <ContentEditor data={value ?? ''} label='Nội dung hướng dẫn' onChange={onChange} />
                                )}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              name='showHelp'
                              control={
                                <Controller
                                  name='showHelp'
                                  control={control}
                                  rules={{ required: false }}
                                  render={({ field: { value, onChange } }) => (
                                    <Checkbox checked={value ?? false} onChange={onChange} />
                                  )}
                                />
                              }
                              label='Hiển thị Hướng dẫn'
                            />
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
                            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Phần thi này không?
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

export default SectionEditForm
