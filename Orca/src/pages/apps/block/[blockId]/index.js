import * as React from 'react'
import { useEffect, useState } from 'react'
import BlockApi from 'api/block-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import Draggable from 'react-draggable'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { selectedBlock, selectBlock } from 'store/slices/blockSlice'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Typography } from '@mui/material'
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

const EditBlockPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { blockId } = router.query
  const currentBlock = useSelector(selectedBlock)

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentBlock,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!blockId || blockId == 0) {
      dispatch(selectBlock({ id: 0, name: '', description: '' }))
      return
    }
    new BlockApi().get(blockId).then(response => {
      dispatch(selectBlock(response.data))
    })
  }, [blockId])

  useEffect(() => {
    if (currentBlock) reset(currentBlock)
  }, [currentBlock])

  /*
   * handle save
   */
  const save = code => {
    const item = getValues()
    new BlockApi()
      .save(item)
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code == 1) {
          router.push('/apps/block/')
        } else {
          reset()
        }
      })
      .catch(e => {
        toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
      })
  }

  const onSubmit = data => {
    new BlockApi().save(data).then(response => {
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
    if (!blockId || blockId > 0) {
      new BlockApi()
        .delete({ id: blockId })
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          router.push(`/apps/block/`)
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
          <title>{currentBlock && currentBlock.id > 0 ? `Chi tiết ${currentBlock.name}` : 'Tạo mới'}</title>
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
                        {currentBlock && currentBlock.id > 0 && <span>{currentBlock.name}</span>}
                        {(!currentBlock || currentBlock.id == 0) && <span>Tạo mới</span>}
                      </span>
                      {currentBlock && currentBlock.id > 0 && <EntityInfoModal entity={currentBlock} />}
                    </h3>
                    <span className='right'>
                      {currentBlock && currentBlock.id > 0 && (
                        <>
                          <IconButton aria-label='delete' onClick={handleClickOpenDelete}>
                            <DeleteIcon />
                          </IconButton>
                          &nbsp;
                        </>
                      )}
                      <Button variant='outlined' component={Link} href='/apps/block/'>
                        <ArrowBackIcon />
                        &nbsp;Quay lại
                      </Button>
                      &nbsp;
                      <Button disabled={!isValid} onClick={() => save(1)} variant='contained'>
                        Cập nhật
                      </Button>
                      {(!currentBlock || currentBlock.id == 0) && (
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
                                    name='content'
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
                                <FormControl fullWidth>
                                  <Controller
                                    name='link'
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field: { value, onChange } }) => (
                                      <TextField
                                        fullWidth
                                        value={value ?? ''}
                                        label='Liên kết'
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

export default EditBlockPage
