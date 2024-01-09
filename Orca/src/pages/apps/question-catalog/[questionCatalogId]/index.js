import {
  useEffect,
  useState
} from 'react'

import QuestionCatalogApi from 'api/question-catalog-api'
import { FolderType } from 'enum/FolderType'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import ParentFolderField from 'pages/shared/folder/parent-folder-field'
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
  selectedQuestionCatalog,
  selectQuestionCatalog
} from 'store/slices/questionCatalogSlice'
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

const EditQuestionCatalogPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { questionCatalogId, folderId } = router.query
  const [parentId, setParentId] = useState(0)
  const currentQuestionCatalog = useSelector(selectedQuestionCatalog)

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentClass: currentQuestionCatalog,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!questionCatalogId || questionCatalogId == 0) {
      dispatch(selectQuestionCatalog({ id: 0, name: '', description: '' }))
      return
    }
    new QuestionCatalogApi().get(questionCatalogId).then(response => {
      dispatch(selectQuestionCatalog(response.data))
      setParentId(isNaN(response.data.parentId) ? 0 : parseInt(response.data.parentId))
    })
  }, [questionCatalogId])

  useEffect(() => {
    if (currentQuestionCatalog) reset(currentQuestionCatalog)
  }, [currentQuestionCatalog])

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    isNaN(folderId) ? 0 : folderId
    setParentId(parseInt(folderId))
  }, [folderId])

  const save = code => {
    const item = getValues()
    item.parentId = isNaN(parentId) ? 0 : parseInt(parentId)
    new QuestionCatalogApi()
      .save(item)
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code == 1) {
          router.query.questionCatalogId = response.data.id
          router.push(router)
        } else {
          reset()
        }
      })
      .catch(e => {
        toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
      })
  }

  const onSubmit = data => {
    new QuestionCatalogApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }

  /*
   * handle remove question-catalog
   */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (!questionCatalogId || questionCatalogId > 0) {
      new QuestionCatalogApi()
        .delete({ id: questionCatalogId })
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          router.push(`/apps/question-catalog/`)
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }
  /*
   * handle remove question-catalog
   */

  const handleParentChanged = parentId => {
    setParentId(parentId)
  }

  const backUrl = () => {
    if (folderId) {
      return `/apps/question-catalog/view/${folderId}/`
    }
    return `/apps/question-catalog/`
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
                      {currentQuestionCatalog && currentQuestionCatalog.id > 0 && (
                        <span>{currentQuestionCatalog.name}</span>
                      )}
                      {(!currentQuestionCatalog || currentQuestionCatalog.id == 0) && <span>Tạo mới Bộ câu hỏi</span>}
                    </span>
                    {currentQuestionCatalog && currentQuestionCatalog.id > 0 && (
                      <EntityInfoModal entity={currentQuestionCatalog} />
                    )}
                  </h3>
                  <span className='right'>
                    {currentQuestionCatalog && currentQuestionCatalog.id > 0 && (
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
                    {(!currentQuestionCatalog || currentQuestionCatalog.id == 0) && (
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
                    <form onSubmit={handleSubmit(onSubmit)} style={{ height: 'auto', width: '100%', paddingTop: 10 }}>
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
                          <ParentFolderField
                            api={new QuestionCatalogApi()}
                            type={FolderType.QUESTIONCATALOG}
                            onSave={handleParentChanged}
                            parentId={
                              !currentQuestionCatalog || currentQuestionCatalog.id == 0
                                ? parseInt(isNaN(folderId) ? '0' : folderId)
                                : currentQuestionCatalog.parentId
                            }
                          />
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
                          Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Bộ câu hỏi này không?
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

export default EditQuestionCatalogPage
