import {
  useEffect,
  useState
} from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ExamItemApi from 'api/exam-item-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import TestGroupSelector from 'pages/shared/test-group-selector'
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
  selectedExamItem,
  selectExamItem
} from 'store/slices/examItemSlice'
import * as yup from 'yup'
import OutlinedInput from '@mui/material/OutlinedInput'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import TopNav from '../_layout/_breadcrums'
import Nav from '../_layout/_tabs'
import FolderIcon from '@mui/icons-material/FolderOpen'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc'),
  group: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc')
})

const ExamItemEditForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const currentExamItem = useSelector(selectedExamItem)
  const { examId, itemId } = router.query
  const [openQuestionCatalogSelector, setOpenQuestionCatalogSelector] = useState(false)

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentClass: currentExamItem,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const save = () => {
    const item = getValues()
    new ExamItemApi().save(item).then(response => {
      toast.success('Cập nhật thành công')
    })
  }

  const onSubmit = data => {
    new ExamItemApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }

  useEffect(() => {
    if (!itemId || itemId == 0) {
      dispatch(selectExamItem({ id: 0, name: '', setting: {} }))
      return
    }
    new ExamItemApi().get(itemId).then(response => {
      dispatch(selectExamItem(response.data))
    })
  }, [itemId])

  useEffect(() => {
    if (currentExamItem) reset(currentExamItem)
  }, [currentExamItem])

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
                      {currentExamItem && currentExamItem.id > 0 && <span>{currentExamItem.name}</span>}
                      {(!currentExamItem || currentExamItem.id == 0) && <span>Tạo mới Môn thi</span>}
                    </span>
                    {currentExamItem && currentExamItem.id > 0 && <EntityInfoModal entity={currentExamItem} />}
                  </h3>
                  <span className='right'>
                    {currentExamItem && currentExamItem.id > 0 && (
                      <>
                        <IconButton aria-label='delete'>
                          <DeleteIcon />
                        </IconButton>
                        &nbsp;
                      </>
                    )}
                    <Button variant='outlined' component={Link} href={`/apps/exam/${examId}/items`}>
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                    &nbsp;
                    <Button disabled={!isValid} onClick={save} variant='contained'>
                      Cập nhật
                    </Button>
                    {(!currentExamItem || currentExamItem.id == 0) && (
                      <>
                        &nbsp;
                        <Button disabled={!isValid} variant='contained'>
                          Cập nhật &amp; Thêm mới
                        </Button>
                      </>
                    )}
                  </span>
                </div>
                {currentExamItem && (
                  <div className='grid-block'>
                    <Nav />
                    <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                      <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100vh', paddingTop: 10 }}>
                        <Grid container spacing={5}>
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
                          <Grid item xs={12}>
                            <FormControl fullWidth variant='outlined'>
                              <InputLabel htmlFor='outlined-adornment-parent-category'>Bộ đề thi</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-parent-category'
                                inputprops={{
                                  readOnly: true,
                                  className: 'Mui-disabled',
                                }}
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton aria-label='toggle password visibility' edge='end' onClick={() => setOpenQuestionCatalogSelector(true)}>
                                      <DeleteOutline />
                                    </IconButton>
                                    &nbsp;
                                    <IconButton
                                      edge='end'
                                      onClick={() => {
                                        setOpenQuestionCatalogSelector(true)
                                      }}
                                    >
                                      <FolderIcon />
                                    </IconButton>
                                  </InputAdornment>
                                }
                                label='Bộ đề thi'
                              />
                            </FormControl>
                          </Grid>
                          <Grid item md={4}>
                            <FormControl fullWidth>
                              <Controller
                                name='duration'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                  <TextField
                                    value={value}
                                    label='Thời gian làm bài (phút)'
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    onChange={onChange}
                                    error={Boolean(errors.duration)}
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
                          <Grid item md={4}>
                            <FormControl fullWidth>
                              <Controller
                                name='requiredScore'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                  <TextField
                                    value={value}
                                    label='Điểm đạt'
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
                          <Grid item md={4}>
                            <FormControl fullWidth>
                              <Controller
                                name='numberOfExamAttemptAllow'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                  <TextField
                                    value={value}
                                    label='Số lần thi cho phép'
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    onChange={onChange}
                                    helperText='0: không giới hạn số lần làm bài thi'
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
                                name='finalizationMethod'
                                rules={{ required: true }}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <InputLabel id='demo-simple-select-label' required>
                                      Cách lấy điểm cuối
                                    </InputLabel>
                                    <Select
                                      label='Cách lấy điểm cuối'
                                      labelId='demo-simple-select-label'
                                      aria-describedby='validation-schema-group'
                                      error={Boolean(errors.finalizationMethod)}
                                      value={value ?? 0}
                                      defaultValue={0}
                                      onChange={onChange}
                                    >
                                      <MenuItem value={0}>Chọn Cách lấy điểm cuối</MenuItem>
                                      <MenuItem value={1}>Điểm trung bình</MenuItem>
                                      <MenuItem value={2}>Điểm nhỏ nhất</MenuItem>
                                      <MenuItem value={3}>Điểm lớn nhất</MenuItem>
                                      <MenuItem value={4}>Điểm cuối cùng</MenuItem>
                                    </Select>
                                  </>
                                )}
                              />
                              {errors.finalizationMethod && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-group'>
                                  {errors.finalizationMethod.message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormGroup row>
                              <FormControlLabel control={<Switch defaultChecked checked={currentExamItem.setting.randomQuestionOrder} />} label='Trộn ngẫu nhiên câu trả lời' />
                            </FormGroup>
                          </Grid>
                          <Grid item xs={12}>
                            <FormGroup row>
                              <FormControlLabel control={<Switch defaultChecked checked={currentExamItem.setting.randomAnswerOrder} />} label='Trộn ngẫu nhiên câu hỏi' />
                            </FormGroup>
                          </Grid>
                          <Grid item xs={12}>
                            <FormGroup row>
                              <FormControlLabel control={<Switch checked={currentExamItem.setting.allowRepeatMediaFile} />} label='Cho phép nghe lại audio' />
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </Box>
            {openQuestionCatalogSelector && (
              <TestGroupSelector
                onClose={() => {
                  setOpenQuestionCatalogSelector(false)
                }}
              />
            )}
          </>
        </div>
      </div>
    </>
  )
}

export default ExamItemEditForm
