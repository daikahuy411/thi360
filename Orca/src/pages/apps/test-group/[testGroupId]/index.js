import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import TestGroupApi from 'api/test-group-api'
import { FolderType } from 'enum/FolderType'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import ParentFolderField from 'pages/shared/folder/parent-folder-field'
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
  selectedTestGroup,
  selectTestGroup
} from 'store/slices/testGroupSlice'
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
import Nav from '../_layout/_tabs'

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc')
})

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const EditTestGroupPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { testGroupId, folderId } = router.query
  const [parentId, setParentId] = useState(0)
  const currentTestGroup = useSelector(selectedTestGroup)

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentTestGroup,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    dispatch(selectTestGroup(null))
    if (!testGroupId || testGroupId == 0) {
      dispatch(selectTestGroup({ id: 0, name: '' }))
      return
    }
    new TestGroupApi().get(testGroupId).then(response => {
      dispatch(selectTestGroup(response.data))
      setParentId(isNaN(response.data.parentId) ? 0 : parseInt(response.data.parentId))
    })
  }, [testGroupId])

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (currentTestGroup) reset(currentTestGroup)
  }, [currentTestGroup])

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    isNaN(folderId) ? 0 : folderId
    setParentId(parseInt(folderId))
  }, [folderId])

  const handleParentChanged = parentId => {
    setParentId(parentId)
  }

  /*
   * save data
   */
  const save = code => {
    const item = getValues()
    item.parentId = isNaN(parentId) ? 0 : parseInt(parentId)
    new TestGroupApi()
      .save(item)
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code === 1) {
          router.query.testGroupId = response.data.id
          router.push(router)
        } else {
          reset()
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const onSubmit = data => {
    new TestGroupApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }
  /*
   * end save data
   */

  /*
   * remove test-group
   */
  const [openDelete, setOpenDelete] = React.useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (!testGroupId || testGroupId > 0) {
      new TestGroupApi()
        .delete({ id: testGroupId })
        .then(response => {
          toast.success('Xóa dữ liệu thành công.')
          router.push('/apps/test-group/')
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }
  /*
   * remove test-group
   */

  const backUrl = () => {
    if (folderId & parseInt(parentId) > 0) {
      return `/apps/test-group/view/${folderId}/`
    }
    return `/apps/test-group/`
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{currentTestGroup && currentTestGroup.id > 0 ? currentTestGroup.name : 'Tạo mới Bộ đề thi'}</title>
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
                        {currentTestGroup && currentTestGroup.id > 0 && <span>{currentTestGroup.name}</span>}
                        {(!currentTestGroup || currentTestGroup.id == 0) && <span>Tạo mới Bộ đề thi</span>}
                      </span>
                      {currentTestGroup && currentTestGroup.id > 0 && <EntityInfoModal entity={currentTestGroup} />}
                    </h3>
                    <span className='right'>
                      {currentTestGroup && currentTestGroup.id > 0 && (
                        <>
                          <IconButton aria-label='delete' onClick={handleClickOpenDelete}>
                            <DeleteIcon />
                          </IconButton>
                          &nbsp;
                        </>
                      )}
                      <Button variant='outlined' component={Link} href={backUrl()}>
                        <ArrowBackIcon />
                        &nbsp;Quay lại
                      </Button>
                      &nbsp;
                      <Button disabled={!isValid} onClick={() => save(1)} variant='contained'>
                        Cập nhật
                      </Button>
                      {(!currentTestGroup || currentTestGroup.id == 0) && (
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
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ height: '100vh', width: '100%', paddingTop: 10 }}
                      >
                        <Grid container maxWidth={'sm'} spacing={5}>
                          <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                              <Controller
                                name='name'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                  <TextField
                                    fullWidth
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
                          <Grid item xs={12} md={12}>
                            <ParentFolderField
                              api={new TestGroupApi()}
                              type={FolderType.TESTGROUP}
                              onSave={handleParentChanged}
                              parentId={
                                !currentTestGroup || currentTestGroup.id == 0
                                  ? parseInt(isNaN(folderId) ? '0' : folderId)
                                  : currentTestGroup.parentId
                              }
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                              <Controller
                                name='content'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={value ?? ''}
                                    label='Mô tả'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={onChange}
                                    aria-describedby='validation-schema-content'
                                  />
                                )}
                              />
                            </FormControl>
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
                            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa bộ đề thi này không?
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

export default EditTestGroupPage
