import {
  Fragment,
  useEffect,
  useState
} from 'react'

import { ExamCategoryApi } from 'api/catalog-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CatalogDialog from 'pages/shared/catalog'
import EntityInfoModal from 'pages/shared/entity-info-modal'
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
  selectedExamCategory,
  selectExamCategory
} from 'store/slices/examCategorySlice'
import { CatalogType } from 'types/CatalogType'
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
import TextField from '@mui/material/TextField'

import TopNav from '../_layout/_breadcrums'
import Nav from '../_layout/_tabs'

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc'),
  description: yup.string(),
})

const ExamCategoryEditPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { examCategoryId } = router.query
  const currentExamCategory = useSelector(selectedExamCategory)
  const [openCatalogDialog, setOpenCatalogDialog] = useState(false)

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentExamCategory,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    new ExamCategoryApi.save(data).then(response => {
      toast.success('Form Submitted')
    })
  }

  useEffect(() => {
    if (!examCategoryId || examCategoryId == 0) {
      dispatch(selectExamCategory({ id: 0, name: '', description: '' }))
      return
    }
    ExamCategoryApi.get(examCategoryId).then(response => {
      dispatch(selectExamCategory(response.data))

      if (response.data.parentId > 0) {
        ExamCategoryApi.get(response.data.parentId).then(response => {
          if (response.data) {
            setParentSelected({ parentId: response.data.id, parentName: response.data.name });
          }
        })
      }
    })
  }, [examCategoryId])

  useEffect(() => {
    if (currentExamCategory) reset(currentExamCategory)
  }, [currentExamCategory])

  const save = (code) => {
    const currentExamCategory = getValues();
    currentExamCategory.parentId = parentSelected.parentId;

    ExamCategoryApi.save(currentExamCategory).then(response => {
      toast.success('Cập nhật thành công')
      if (code === 1) {
        router.push('/apps/exam-category/')
      } else {
        cleanParent()
        reset()
      }
    })
  }

  /*
  * handle parent exam-category
  */
  const [parentSelected, setParentSelected] = useState({ parentId: 0, parentName: '' })
  const handleSelectedParent = (selectedId) => {
    ExamCategoryApi.get(selectedId).then(response => {
      if (response.data) {
        setParentSelected({ parentId: selectedId, parentName: response.data.name });
      }
    })
  }

  const cleanParent = () => {
    setParentSelected({ parentId: 0, parentName: '' });
  }
  /*
  * end handle parent exam-category
  */

  /*
  * remove exam-category
  */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenFormDelete = () => setOpenDelete(true)
  const handleCloseFormDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    ExamCategoryApi.delete(currentExamCategory)
      .then(response => {
        toast.success('Xóa dữ liệu thành công')
        router.push('/apps/exam-category/')
      })
      .catch((e) => {
        handleCloseFormDelete()
        toast.error(e.response.data)
      })
  }
  /*
  * end remove exam-category
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
                      {currentExamCategory && <span>{currentExamCategory.name}</span>}
                      {!currentExamCategory && <span>Tạo Danh mục Kỳ thi</span>}
                    </span>
                    {currentExamCategory && currentExamCategory.id > 0 && (
                      <EntityInfoModal entity={currentExamCategory} />
                    )}
                  </h3>
                  <span className='right'>
                    {currentExamCategory && currentExamCategory.id > 0 && (
                      <>
                        <IconButton aria-label='delete' onClick={handleClickOpenFormDelete}>
                          <DeleteIcon />
                        </IconButton>
                        &nbsp;
                      </>
                    )}
                    <Button variant='outlined' component={Link} href='/apps/exam-category/'>
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                    &nbsp;
                    <Button disabled={!isValid} variant='contained' onClick={() => save(1)}>Cập nhật</Button>
                    {(!currentExamCategory || currentExamCategory.id == 0) && (
                      <>
                        &nbsp;
                        <Button disabled={!isValid} variant='contained' onClick={() => save(2)}>Cập nhật &amp; Thêm mới</Button>
                      </>
                    )}
                  </span>
                </div>
                <div className='grid-block' style={{ height: '100vh' }}>
                  <Nav />
                  <div className='grid-block' style={{ padding: 50 }}>
                    <>
                      <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100vh', paddingTop: 10 }}>
                        <Grid container spacing={5}>
                          <Grid item xs={12}>
                            <FormControl
                              fullWidth
                              variant='outlined'
                            >
                              <Controller
                                name='name'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <InputLabel htmlFor='outlined-adornment-parent-category'>Danh mục cha</InputLabel>
                                    <OutlinedInput
                                      id='outlined-adornment-parent-category'
                                      inputprops={{
                                        readOnly: true,
                                        className: 'Mui-disabled',
                                      }}
                                      value={parentSelected.parentName}
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
                                  </>
                                )}
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
                      {openCatalogDialog && (
                        <CatalogDialog
                          catalogType={CatalogType.EXAM_CATEGORY}
                          excludedId={0}
                          onNodeSelected={nodeId => { handleSelectedParent(nodeId) }}
                          onClose={() => {
                            setOpenCatalogDialog(false)
                          }}
                          open={openCatalogDialog}
                        />
                      )}

                      <Dialog
                        open={openDelete}
                        onClose={handleCloseFormDelete}
                        aria-labelledby='alert-dialog-title'
                        aria-describedby='alert-dialog-description'
                      >
                        <DialogTitle id='alert-dialog-title'>Xác nhận</DialogTitle>
                        <DialogContent>
                          <DialogContentText id='alert-dialog-description'>
                            Bạn có muốn xóa dữ liệu Danh mục Kỳ thi này không?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions className='dialog-actions-dense'>
                          <Button onClick={handleCloseFormDelete}>Hủy bỏ</Button>
                          <Button onClick={handleDelete}>Đồng ý</Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  </div>
                </div>
              </div>
            </Box>
          </Fragment>
        </div>
      </div>
    </>
  )
}

export default ExamCategoryEditPage
