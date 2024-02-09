import 'dayjs/locale/vi'
import 'moment/locale/vi'

import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import {
  ExamCategoryApi,
  ProgramCatalogApi
} from 'api/catalog-api'
import ExamApi from 'api/exam-api'
import { FolderType } from 'enum/FolderType'
import moment from 'moment-timezone'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CatalogDialog from 'pages/shared/catalog-dialog'
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
  selectedExam,
  selectExam
} from 'store/slices/examSlice'
import { CatalogType } from 'types/CatalogType'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
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
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import TopNav from '../_layout/_breadcrums'
import Nav from '../_layout/_tabs'

moment.tz.setDefault()
moment().format('DD-MM-YYYY HH:mm hh:mm')

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc'),
  content: yup.string(),
  status: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc'),
  examType: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc'),
  registrationType: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc'),
  viewPermissionAfterFinish: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc'),
  isSpecificDuration: yup.boolean(),
  startDate: yup
    .date()
    .nullable()
    .notRequired()
    .when('isSpecificDuration', {
      is: true,
      then: yup.date().required('* bắt buộc'),

      otherwise: yup.date().nullable().notRequired()
    }),
  endDate: yup
    .date()
    .nullable()
    .notRequired()
    .when('isSpecificDuration', {
      is: true,
      then: yup.date().required('* bắt buộc'),
      otherwise: yup.date().nullable().notRequired()
    })
})

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const EditExamPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { examId, folderId, categoryId } = router.query
  const [parentId, setParentId] = useState(0)
  const [programs, setPrograms] = useState([])
  const [subjects, setSubjects] = useState([])
  const [programCatalogId, setProgramCatalogId] = useState(0)
  const [subjectCatalogId, setSubjectCatalogId] = useState(0)

  const currentExam = useSelector(selectedExam)

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentExam,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const [checkedIsSpecificDuration, setCheckedIsSpecificDuration] = React.useState(false)
  const [openCatalogDialog, setOpenCatalogDialog] = useState(false)

  useEffect(() => {
    ProgramCatalogApi.getAll().then(response => {
      setPrograms(response.data)
    })
  }, [])

  useEffect(() => {
    if (!programCatalogId || programCatalogId == 0) {
      setSubjects([])
      return
    }
    ProgramCatalogApi.get(programCatalogId).then(response => {
      setSubjects(response.data.subjectCatalogs)
    })
  }, [programCatalogId])

  useEffect(() => {
    if (!examId || examId == 0) {
      dispatch(selectExam({ id: 0, name: '' }))
      return
    }
    new ExamApi().get(examId).then(response => {
      dispatch(selectExam(response.data))
      if (response.data) {
        setCheckedIsSpecificDuration(response.data.isSpecificDuration)
        setProgramCatalogId(response.data.programId)
        setSubjectCatalogId(response.data.subjectId)
        setExamCategorySelected({
          id: response.data.categoryId,
          name: response.data.categoryName
        })
      }
    })
  }, [examId])

  useEffect(() => {
    if (currentExam) {
      reset(currentExam)
      setProgramCatalogId(currentExam.programId)
      setSubjectCatalogId(currentExam.subjectId)
    }
  }, [currentExam])

  useEffect(() => {
    setParentId(parseInt(folderId))
  }, [folderId])

  /*
   * handle save
   */
  const save = code => {
    const item = getValues()
    let param
    if (item.isSpecificDuration) {
      // const start = moment(new Date(item.startDate)).format('DD-MM-YYYY HH:mm HH:mm:ss')
      // const end = moment(new Date(item.endDate)).format('DD-MM-YYYY HH:mm HH:mm:ss')

      const startDate = new Date(item.startDate)
      const endDate = new Date(item.endDate)

      let startStr = ''
      startStr += `${startDate.getFullYear()}-${
        startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1) : startDate.getMonth() + 1
      }-`
      startStr += `${startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate()} ${
        startDate.getHours() < 10 ? '0' + startDate.getHours() : startDate.getHours()
      }:`
      startStr += `${startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes()}:00.000Z`

      let endStr = ''
      endStr += `${endDate.getFullYear()}-${
        endDate.getMonth() + 1 < 10 ? '0' + (endDate.getMonth() + 1) : endDate.getMonth() + 1
      }-`
      endStr += `${endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate()} ${
        endDate.getHours() < 10 ? '0' + endDate.getHours() : endDate.getHours()
      }:`
      endStr += `${endDate.getMinutes() < 10 ? '0' + endDate.getMinutes() : endDate.getMinutes()}:00.000Z`

      param = {
        ...item,
        startDate: new Date(startStr),
        endDate: new Date(endStr),
        CategoryId: examCategorySelected.id
      }
    } else {
      param = { ...item, startDate: undefined, endDate: undefined, CategoryId: examCategorySelected.id }
    }

    param.parentId = parentId

    new ExamApi()
      .save(param)
      .then(response => {
        if (response.data.isSuccess) {
          toast.success('Cập nhật thành công')
          if (code === 1) {
            router.query.examId = response.data.value.id
            router.push(router)

            dispatch(selectExam(response.data.value))
          } else {
            reset()
          }
        } else {
          toast.error(response.data.message)
        }
      })
      .catch(e => {
        toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
      })
  }

  const onSubmit = data => {
    // new ExamApi().save(data).then(response => {
    //   toast.success('Form Submitted')
    // })
  }
  
  /*
   * end handle save
   */

  const handleChangeDate = (field, value) => {
    setValue(field, value)
  }

  const handleChangeIsSpecificDuration = e => {
    setCheckedIsSpecificDuration(e.target.checked)
    if (!e.target.checked) {
      setValue('startDate', null)
      setValue('endDate', null)
    }
  }

  /*
   * handle exam category
   */
  const [examCategorySelected, setExamCategorySelected] = useState({ id: 0, name: '' })
  const handleSelectedOrganization = selectedId => {
    ExamCategoryApi.get(selectedId).then(response => {
      if (response.data) {
        setExamCategorySelected({ id: selectedId, name: response.data.name })
      }
    })
  }

  const cleanExamCategory = () => {
    setExamCategorySelected({ id: 0, name: '' })
  }

  useEffect(() => {
    if (categoryId && examId && examId === '0') {
      ExamCategoryApi.get(categoryId).then(response => {
        if (response.data) {
          setExamCategorySelected({ id: categoryId, name: response.data.name })
        }
      })
    }
  }, [categoryId])

  /*
   * end handle exam category
   */

  /*
   * handle remove exam
   */
  const [openDelete, setOpenDelete] = React.useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (!examId || examId > 0) {
      new ExamApi()
        .delete({ id: examId })
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          router.push(`/apps/exam/`)
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

  const handleParentChanged = parentId => {
    setParentId(parentId)
  }

  const backUrl = () => {
    if (folderId) {
      return `/apps/exam/view/${folderId}/`
    }
    if (categoryId) {
      return `/apps/exam-category/${categoryId}/exams/`
    }
    return `/apps/exam/`
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{currentExam && currentExam.id > 0 ? `Chi tiết kỳ thi ${currentExam.name}` : 'Tạo mới Kỳ thi'}</title>
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
                        {currentExam && currentExam.id > 0 && <span>{currentExam.name}</span>}
                        {(!currentExam || currentExam.id == 0) && <span>Tạo mới Kỳ thi</span>}
                      </span>
                      {currentExam && currentExam.id > 0 && <EntityInfoModal entity={currentExam} />}
                    </h3>
                    <span className='right'>
                      {currentExam && currentExam.id > 0 && (
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
                      {(!currentExam || currentExam.id == 0) && (
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
                        <Grid container spacing={5} maxWidth={'sm'}>
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
                              api={new ExamApi()}
                              type={FolderType.EXAM}
                              onSave={handleParentChanged}
                              currentId={currentExam ? currentExam.id : 0}
                              parentId={
                                !currentExam || currentExam.id == 0
                                  ? parseInt(isNaN(folderId) ? '0' : folderId)
                                  : currentExam.parentId
                              }
                            />
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
                            <FormControl fullWidth variant='outlined'>
                              <InputLabel htmlFor='outlined-adornment-parent-category'>Danh mục Kỳ thi</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-parent-category'
                                inputprops={{
                                  readOnly: true,
                                  className: 'Mui-disabled'
                                }}
                                value={examCategorySelected.name ?? ''}
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      edge='end'
                                      onClick={cleanExamCategory}
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
                                label='Danh mục Kỳ thi'
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth>
                              <Controller
                                name='programId'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <InputLabel id='select-program-label'>Chương trình</InputLabel>
                                    <Select
                                      label='Chương trình'
                                      labelId='select-program-label'
                                      aria-describedby='validation-schema-exam-type'
                                      value={value ?? 0}
                                      onChange={e => {
                                        onChange(parseInt(e.target.value))
                                        setProgramCatalogId(parseInt(e.target.value))
                                      }}
                                    >
                                      <MenuItem value={0}>Chọn Chương trình</MenuItem>
                                      {programs &&
                                        programs.map(item => (
                                          <MenuItem key={`program-item${item.id}`} value={item.id}>
                                            {item.name}
                                          </MenuItem>
                                        ))}
                                    </Select>
                                  </>
                                )}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth>
                              <Controller
                                name='subjectId'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <InputLabel id='select-subject-catalog'>Môn học/ Chủ đề</InputLabel>
                                    <Select
                                      label='Môn học/ Chủ đề'
                                      labelId='select-subject-catalog'
                                      aria-describedby='validation-schema-group'
                                      value={value ?? 0}
                                      onChange={e => {
                                        onChange(parseInt(e.target.value))
                                        setSubjectCatalogId(parseInt(e.target.value))
                                      }}
                                    >
                                      <MenuItem value={0}>Chọn Môn học/ Chủ đề</MenuItem>
                                      {subjects &&
                                        subjects.map(item => (
                                          <MenuItem key={`subject-item${item.id}`} value={item.id}>
                                            {item.name}
                                          </MenuItem>
                                        ))}
                                    </Select>
                                  </>
                                )}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth>
                              <Controller
                                name='status'
                                rules={{ required: true }}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <InputLabel id='demo-simple-select-label' required>
                                      Trạng thái
                                    </InputLabel>
                                    <Select
                                      label='Trạng thái'
                                      labelId='demo-simple-select-label'
                                      aria-describedby='validation-schema-group'
                                      error={Boolean(errors.status)}
                                      value={value ?? 0}
                                      onChange={onChange}
                                    >
                                      <MenuItem value={0}>Chọn trạng thái</MenuItem>
                                      <MenuItem value={1}>Chuẩn bị</MenuItem>
                                      <MenuItem value={2}>Đang diễn ra</MenuItem>
                                      <MenuItem value={3}>Kết thúc</MenuItem>
                                    </Select>
                                  </>
                                )}
                              />
                              {errors.status && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-group'>
                                  {errors.status.message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth>
                              <Controller
                                name='examType'
                                rules={{ required: true }}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <InputLabel id='demo-simple-select-label' required>
                                      Hình thức tổ chức
                                    </InputLabel>
                                    <Select
                                      label='Hình thức tổ chức'
                                      labelId='demo-simple-select-label'
                                      aria-describedby='validation-schema-exam-type'
                                      error={Boolean(errors.examType)}
                                      value={value ?? 0}
                                      onChange={onChange}
                                    >
                                      <MenuItem value={0}>Chọn Hình thức tổ chức </MenuItem>
                                      <MenuItem value={1}>Luyện tập</MenuItem>
                                      <MenuItem value={2}>Thi-Kiểm tra</MenuItem>
                                    </Select>
                                  </>
                                )}
                              />
                              {errors.examType && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-exam-type'>
                                  {errors.examType.message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth>
                              <Controller
                                name='registrationType'
                                rules={{ required: true }}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <InputLabel id='demo-simple-select-label' required>
                                      Hình thức đăng ký
                                    </InputLabel>
                                    <Select
                                      label='Hình thức đăng ký'
                                      labelId='demo-simple-select-label'
                                      aria-describedby='validation-schema-registration-type'
                                      error={Boolean(errors.registrationType)}
                                      value={value ?? 0}
                                      onChange={onChange}
                                    >
                                      <MenuItem value={0}>Chọn Hình thức đăng ký</MenuItem>
                                      <MenuItem value={1}>Hạn chế</MenuItem>
                                      <MenuItem value={2}>Công khai</MenuItem>
                                    </Select>
                                  </>
                                )}
                              />
                              {errors.registrationType && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-registration-type'>
                                  {errors.registrationType.message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth>
                              <Controller
                                name='viewPermissionAfterFinish'
                                rules={{ required: true }}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <InputLabel id='demo-simple-select-label' required>
                                      Hiển thị kết quả sau khi thi
                                    </InputLabel>
                                    <Select
                                      label='Hiển thị kết quả sau khi thi'
                                      labelId='demo-simple-select-label'
                                      aria-describedby='validation-schema-viewPermissionAfterFinish'
                                      error={Boolean(errors.viewPermissionAfterFinish)}
                                      value={value ?? 0}
                                      onChange={onChange}
                                    >
                                      <MenuItem value={0}>Chọn hiển thị kết quả </MenuItem>
                                      <MenuItem value={1}>Chỉ xem điểm</MenuItem>
                                      <MenuItem value={2}>Xem điểm và chi tiết bài làm</MenuItem>
                                      <MenuItem value={4}>Không xem điểm và chi tiết bài làm</MenuItem>
                                    </Select>
                                  </>
                                )}
                              />
                              {errors.viewPermissionAfterFinish && (
                                <FormHelperText
                                  sx={{ color: 'error.main' }}
                                  id='validation-schema-viewPermissionAfterFinish'
                                >
                                  {errors.viewPermissionAfterFinish.message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              name='isSpecificDuration'
                              control={
                                <Controller
                                  name='isSpecificDuration'
                                  control={control}
                                  rules={{ required: false }}
                                  render={({ field: { value, onChange } }) => (
                                    <Checkbox
                                      checked={value ?? false}
                                      onChange={e => {
                                        onChange(e)
                                        handleChangeIsSpecificDuration(e)
                                      }}
                                    />
                                  )}
                                />
                              }
                              label='Xác định thời gian bắt đầu/ kết thúc'
                            />
                          </Grid>
                          {checkedIsSpecificDuration && (
                            <>
                              <Grid item xs={6}>
                                <FormControl fullWidth>
                                  <Controller
                                    name='startDate'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='vi'>
                                        <DateTimePicker
                                          label='Thời gian bắt đầu'
                                          value={moment(value) ?? null}
                                          inputFormat='DD-MM-YYYY HH:mm hh:mm'
                                          onChange={onChange}
                                        />
                                      </LocalizationProvider>
                                    )}
                                  />
                                  {errors.startDate && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-startDate'>
                                      {errors.startDate.message}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item xs={6}>
                                <FormControl fullWidth>
                                  <Controller
                                    name='endDate'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='vi'>
                                        <DateTimePicker
                                          label='Thời gian kết thúc'
                                          value={moment(value) ?? null}
                                          inputFormat='DD-MM-YYYY HH:mm hh:mm'
                                          onChange={onChange}
                                        />
                                      </LocalizationProvider>
                                    )}
                                  />
                                  {errors.endDate && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                      {errors.endDate.message}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </form>

                      {openCatalogDialog && (
                        <CatalogDialog
                          categoryType={CatalogType.EXAM_CATEGORY}
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
                            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Kỳ thi này không?
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

export default EditExamPage
