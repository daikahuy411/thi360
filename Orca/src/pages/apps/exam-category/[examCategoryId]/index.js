import {
  Fragment,
  useEffect,
  useState
} from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Controller,
  useForm
} from 'react-hook-form'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import { ExamCategoryApi } from 'src/api/catalog-api'
import CatalogDialog from 'src/pages/shared/catalog'
import EntityInfoModal from 'src/pages/shared/entity-info-modal'
import {
  selectedExamCategory,
  selectExamCategory
} from 'src/store/slices/examCategorySlice'
import { CatalogType } from 'src/types/CatalogType'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
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
  group: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc')
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

  const save = () => {
    const currentExamCategory = getValues()
    ExamCategoryApi.save(currentExamCategory).then(response => {
      toast.success('Cập nhật thành công')
    })
  }

  const onSubmit = data => {
    new ExamCategoryApi.save(data).then(response => {
      toast.success('Form Submitted')
    })
  }

  useEffect(() => {
    if (!examCategoryId || examCategoryId == 0) {
      dispatch(selectExamCategory({ id: 0, name: '' }))
      return
    }
    ExamCategoryApi.get(examCategoryId).then(response => {
      dispatch(selectExamCategory(response.data))
    })
  }, [examCategoryId])

  useEffect(() => {
    if (currentExamCategory) reset(currentExamCategory)
  }, [currentExamCategory])

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
                        <IconButton aria-label='delete'>
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
                    <Button variant='contained'>Cập nhật</Button>
                    {(!currentExamCategory || currentExamCategory.id == 0) && (
                      <>
                        &nbsp;
                        <Button variant='contained'>Cập nhật &amp; Thêm mới</Button>
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
                            <FormControl fullWidth variant='outlined'>
                              <InputLabel htmlFor='outlined-adornment-parent-category'>Danh mục cha</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-parent-category'
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton aria-label='toggle password visibility' edge='end'>
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
                                    value={value}
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
                            <TextField multiline rows={3} fullWidth label='Mô tả' />
                          </Grid>
                        </Grid>
                      </form>
                      {openCatalogDialog && (
                        <CatalogDialog
                          catalogType={CatalogType.EXAM_CATEGORY}
                          excludedId={0}
                          onNodeSelected={nodeId => {}}
                          onClose={() => {
                            setOpenCatalogDialog(false)
                          }}
                          open={openCatalogDialog}
                        />
                      )}
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
