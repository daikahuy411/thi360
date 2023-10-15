import * as React from 'react'
import { useEffect, useState } from 'react'
import PostApi from 'api/post-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import Draggable from 'react-draggable'
import { CategoryType } from 'types/CategoryType'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { selectedPost, selectPost } from 'store/slices/postSlice'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import CategoryDialog from 'pages/shared/category-dialog'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { PostCategoryApi } from 'api/catalog-api'
import TopNav from '../_layout/_breadcrums'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
import ContentEditor from '@core/components/editor'

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

const EditPostPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { postId } = router.query
  const currentPost = useSelector(selectedPost)
  const [openCatalogDialog, setOpenCatalogDialog] = useState(false)

  const [categorySelected, setCategorySelected] = useState({ categoryId: 0, categoryName: '' })
  const handleSelectedOrganization = selectedId => {
    PostCategoryApi.get(selectedId).then(response => {
      if (response.data) {
        setCategorySelected({ categoryId: selectedId, categoryName: response.data.name })
      }
    })
  }

  const cleanOrganization = () => {
    setCategorySelected({ categoryId: 0, categoryName: '' })
  }

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentPost,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!postId || postId == 0) {
      dispatch(selectPost({ id: 0, name: '', description: '' }))
      return
    }
    new PostApi().get(postId).then(response => {
      dispatch(selectPost(response.data))
      setCategorySelected({
        categoryId: response.data.categoryId,
        categoryName: response.data.categoryName
      })
    })
  }, [postId])

  useEffect(() => {
    if (currentPost) reset(currentPost)
  }, [currentPost])

  /*
   * handle save
   */
  const save = code => {
    const item = getValues()
    item.CategoryId = categorySelected.categoryId

    new PostApi()
      .save(item)
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code == 1) {
          router.push('/apps/post/')
        } else {
          reset()
        }
      })
      .catch(e => {
        toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
      })
  }

  const onSubmit = data => {
    new PostApi().save(data).then(response => {
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
    if (!postId || postId > 0) {
      new PostApi()
        .delete({ id: postId })
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          router.push(`/apps/post/`)
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
          <title>{currentPost && currentPost.id > 0 ? `Chi tiết ${currentPost.name}` : 'Tạo mới'}</title>
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
                        {currentPost && currentPost.id > 0 && <span>{currentPost.name}</span>}
                        {(!currentPost || currentPost.id == 0) && <span>Tạo mới</span>}
                      </span>
                      {currentPost && currentPost.id > 0 && <EntityInfoModal entity={currentPost} />}
                    </h3>
                    <span className='right'>
                      {currentPost && currentPost.id > 0 && (
                        <>
                          <IconButton aria-label='delete' onClick={handleClickOpenDelete}>
                            <DeleteIcon />
                          </IconButton>
                          &nbsp;
                        </>
                      )}
                      <Button variant='outlined' component={Link} href='/apps/post/'>
                        <ArrowBackIcon />
                        &nbsp;Quay lại
                      </Button>
                      &nbsp;
                      <Button disabled={!isValid} onClick={() => save(1)} variant='contained'>
                        Cập nhật
                      </Button>
                      {(!currentPost || currentPost.id == 0) && (
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
                              <Grid item xs={12}>
                                <FormControl fullWidth variant='outlined'>
                                  <InputLabel htmlFor='outlined-adornment-parent-category'>Danh mục Tin bài</InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-parent-category'
                                    inputprops={{
                                      readOnly: true,
                                      className: 'Mui-disabled'
                                    }}
                                    value={categorySelected.categoryName ?? ''}
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
                                    label='Danh mục Tin bài'
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>Nội dung</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <Controller
                                    name='content'
                                    label='Nội dung'
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field: { value, onChange } }) => (
                                      <ContentEditor
                                        content={value ?? ''}
                                        onChange={data => {
                                          onChange(data)
                                        }}
                                      />
                                    )}
                                  />
                                </FormControl>
                                <br />
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
                            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Tin bài này không?
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
                      {openCatalogDialog && (
                        <CategoryDialog
                          categoryType={CategoryType.POST_CATEGORY}
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

export default EditPostPage
