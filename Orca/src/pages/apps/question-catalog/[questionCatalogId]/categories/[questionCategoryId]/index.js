import {
  Fragment,
  useEffect,
  useState
} from 'react'

import { QuestionCategoryApi } from 'api/catalog-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import QuestionCategoryDialog from 'pages/shared/question-category-selector'
import Draggable from 'react-draggable'
import {
  Controller,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
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
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import TopNav from '../_layout/_breadcrums'
import Nav from './_layout/_tabs'

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

const QuestionCategoryEditPage = () => {
  const router = useRouter()
  const { questionCategoryId, questionCatalogId } = router.query
  const [item, setItem] = useState({ id: 0, name: '' })
  const [parentId, setParentId] = useState(0)
  const [openCatalogDialog, setOpenCatalogDialog] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    item,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!questionCategoryId || questionCategoryId == 0) return
    fetchData()
  }, [questionCategoryId])

  useEffect(() => {
    if (item) reset(item)
  }, [item])

  const fetchData = () => {
    QuestionCategoryApi.get(questionCategoryId).then(response => {
      setItem(response.data)
      setParentSelected({ parentId: response.data.parentId, parentName: response.data.parentName })
    })
  }

  const save = code => {
    const item = getValues()

    QuestionCategoryApi.save({
      ...item,
      id: Number(questionCategoryId),
      catalogId: Number(questionCatalogId),
      parentId: parentSelected.parentId,
      order: 0
    })
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code == 1) {
          router.query.questionCategoryId = response.data.id
          router.push(router)
        } else {
          reset()
        }
      })
      .catch(e => {
        toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
      })
  }

  /*
   * handle parent
   */
  const [parentSelected, setParentSelected] = useState({ parentId: 0, parentName: '' })
  const handleSelectedParent = selectedId => {
    QuestionCategoryApi.get(selectedId).then(response => {
      if (response.data) {
        setParentSelected({ parentId: selectedId, parentName: response.data.name })
      }
    })
  }

  const cleanParent = () => {
    setParentSelected({ parentId: 0, parentName: '' })
  }
  /*
   * end handle parent
   */

  /*
   * handle remove question-catalog
   */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (!questionCategoryId || questionCategoryId > 0) {
      QuestionCategoryApi.delete({ id: questionCategoryId })
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          router.push(`/apps/question-catalog/${questionCatalogId}/categories`)
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

  return (
    <>
      <div style={{ padding: 0 }}>
        <div sx={{ py: 5.375 }} style={{ padding: 0 }}>
          <Fragment>
            <TopNav />
            <Box style={{ marginTop: 2 }}>
              <div className='grid-block vertical'>
                <div className='title-bar' id='EntityHeadingTitleBar'>
                  <h3 className='title left'>
                    <span className='title__label'>
                      {item && item.id > 0 && <span>{item.name}</span>}
                      {(!item || item.id == 0) && <span>Tạo mới Danh mục Câu hỏi</span>}
                    </span>
                    {item && item.id > 0 && <EntityInfoModal entity={item} />}
                  </h3>
                  <span className='right'>
                    {item && item.id > 0 && (
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
                      href={`/apps/question-catalog/${questionCatalogId}/categories`}
                    >
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                    &nbsp;
                    <Button disabled={!isValid} onClick={() => save(1)} variant='contained'>
                      Cập nhật
                    </Button>
                    {(!item || item.id == 0) && (
                      <>
                        &nbsp;
                        <Button disabled={!isValid} onClick={() => save(2)} variant='contained'>
                          Cập nhật &amp; Thêm mới
                        </Button>
                      </>
                    )}
                  </span>
                </div>
                <div className='grid-block' style={{ height: '100vh' }}>
                  <div className='grid-block vertical flex-none finger-tabs__tabs'>
                    <Nav />
                  </div>
                  <div className='grid-block' style={{ padding: 10 }}>
                    <form onSubmit={e => e.preventDefault()} style={{ height: 'auto', width: '100%', paddingTop: 10 }}>
                      <Grid container maxWidth={'sm'} spacing={5}>
                        <Grid item xs={12}>
                          <FormControl fullWidth variant='outlined'>
                            <InputLabel htmlFor='outlined-adornment-parent-category'>Danh mục cha</InputLabel>
                            <OutlinedInput
                              id='outlined-adornment-parent-category'
                              inputprops={{
                                readOnly: true,
                                className: 'Mui-disabled'
                              }}
                              value={parentSelected.parentName ?? ''}
                              endAdornment={
                                <InputAdornment position='end'>
                                  <IconButton aria-label='toggle password visibility' edge='end' onClick={cleanParent}>
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
                              label='Danh mục cha'
                            />
                          </FormControl>
                        </Grid>
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
                      </Grid>
                    </form>

                    {openCatalogDialog && (
                      <QuestionCategoryDialog
                        currentId={questionCategoryId}
                        catalogId={parseInt(questionCatalogId)}
                        onNodeSelected={nodeId => {
                          handleSelectedParent(nodeId)
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
                  Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Danh mục câu hỏi này không?
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
          </Fragment>
        </div>
      </div>
    </>
  )
}

export default QuestionCategoryEditPage
