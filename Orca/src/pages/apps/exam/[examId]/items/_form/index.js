import {
  useEffect,
  useState
} from 'react'

import ExamItemApi from 'api/exam-item-api'
import TestGroupApi from 'api/test-group-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import TestGroupSelector from 'pages/shared/test-group-selector'
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
  selectedExamItem,
  selectExamItem
} from 'store/slices/examItemSlice'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'

import TopNav from '../_layout/_breadcrums'
import Nav from '../_layout/_tabs'

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc'),
  content: yup.string(),
  duration: yup
    .number()
    .typeError('* bắt buộc nhập kiểu số')
    .transform(value => (Number.isNaN(value) ? '' : value))
    .required('* bắt buộc')
    .moreThan(0, '* bắt buộc'),
  requiredScore: yup.number().typeError('* bắt buộc nhập kiểu số').required('* bắt buộc').moreThan(0, '* bắt buộc'),
  numberOfExamAttemptAllow: yup.number().typeError('* bắt buộc nhập kiểu số').required('* bắt buộc'),
  finalizationMethod: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc')
})

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const ExamItemEditForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const currentExamItem = useSelector(selectedExamItem)
  const { examId, itemId } = router.query
  const [openQuestionCatalogSelector, setOpenQuestionCatalogSelector] = useState(false)
  const [stateSetting, setStateSetting] = useState({
    randomAnswerOrder: true,
    randomQuestionOrder: true,
    allowRepeatMediaFile: false
  })
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    setLoading(true)
    if (!itemId || itemId == 0) {
      dispatch(selectExamItem({ id: 0, name: '', setting: {}, finalizationMethod: 4 }))
      setLoading(false)
      return
    }

    new ExamItemApi().get(itemId).then(response => {
      dispatch(selectExamItem(response.data))
      setTestGroupSelected({ testGroupId: response.data.testGroupId, testGroupName: response.data.testGroup?.name })
      setStateSetting({
        ...stateSetting,
        ['randomAnswerOrder']: response.data.settings.randomAnswerOrder,
        ['randomQuestionOrder']: response.data.settings.randomQuestionOrder,
        ['allowRepeatMediaFile']: response.data.settings.allowRepeatMediaFile
      })
      setLoading(false)
    })
  }, [itemId])

  useEffect(() => {
    if (currentExamItem) reset(currentExamItem)
  }, [currentExamItem])

  const save = code => {
    const item = getValues()
    item.setting = {}
    item.setting.randomAnswerOrder = stateSetting.randomAnswerOrder
    item.setting.randomQuestionOrder = stateSetting.randomQuestionOrder
    item.setting.allowRepeatMediaFile = stateSetting.allowRepeatMediaFile

    new ExamItemApi()
      .save({ ...item, examId: examId, testGroupId: testGroupSelected.testGroupId })
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code === 1) {
          router.query.itemId = response.data.id
          router.push(router)
        } else {
          cleanTestGroup()
          reset()
          setStateSetting({
            randomAnswerOrder: true,
            randomQuestionOrder: true,
            allowRepeatMediaFile: false
          })
        }
      })
      .catch(e => console.log(e))
  }

  const onSubmit = data => {
    new ExamItemApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }

  /*
   * handle test-group
   */
  const [testGroupSelected, setTestGroupSelected] = useState({ testGroupId: 0, testGroupName: '' })
  const handleSelectedTestGroup = selectedId => {
    new TestGroupApi().get(selectedId).then(response => {
      if (response.data) {
        setTestGroupSelected({ testGroupId: selectedId, testGroupName: response.data.name })
      }
    })
  }

  const viewTestGroup = () => {
    router.push(`/apps/test-group/${testGroupSelected.testGroupId}`)
  }

  const cleanTestGroup = () => {
    setTestGroupSelected({ testGroupId: 0, testGroupName: '' })
  }
  /*
   * end handle test-group
   */

  /*
   * handle remove exam-item
   */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (!itemId || itemId > 0) {
      new ExamItemApi()
        .delete({ id: itemId })
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          router.push(`/apps/exam/${examId}/items`)
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }
  /*
   * handle remove exam-item
   */

  const handleChangeSwitch = event => {
    setStateSetting({
      ...stateSetting,
      [event.target.name]: event.target.checked
    })
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
                      {currentExamItem && currentExamItem.id > 0 && <span>{currentExamItem.name}</span>}
                      {(!currentExamItem || currentExamItem.id == 0) && <span>Tạo mới Môn thi</span>}
                    </span>
                    {currentExamItem && currentExamItem.id > 0 && <EntityInfoModal entity={currentExamItem} />}
                  </h3>
                  <span className='right'>
                    {currentExamItem && currentExamItem.id > 0 && (
                      <>
                        <IconButton aria-label='Xóa môn thi' onClick={handleClickOpenDelete}>
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
                    <Button disabled={!isValid} onClick={() => save(1)} variant='contained'>
                      Cập nhật
                    </Button>
                    {itemId == '0' && (
                      <>
                        &nbsp;
                        <Button disabled={!isValid} onClick={() => save(2)} variant='contained'>
                          Cập nhật &amp; Thêm mới
                        </Button>
                      </>
                    )}
                  </span>
                </div>
                {currentExamItem && (
                  <>
                    <div className='grid-block'>
                      <Nav />
                      <div
                        className='grid-block'
                        style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}
                      >
                        {loading && (
                          <Box sx={{ width: '100%' }}>
                            <Skeleton height={40} />
                            <Skeleton variant='rounded' width={'100%'} height={80} animation='wave' />
                            <Skeleton height={40} animation='wave' />
                            <Box style={{ display: 'flex', gap: '10px' }}>
                              <Skeleton width={'30%'} height={40} animation='wave' />
                              <Skeleton width={'30%'} height={40} animation='wave' />
                              <Skeleton width={'30%'} height={40} animation='wave' />
                            </Box>
                            <Skeleton variant='rounded' width={'100%'} height={40} animation='wave' />
                            <Skeleton width={'30%'} height={40} animation='wave' />
                            <Skeleton width={'30%'} height={40} animation='wave' />
                            <Skeleton width={'30%'} height={40} animation='wave' />
                          </Box>
                        )}

                        {!loading && (
                          <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100vh', paddingTop: 10 }}>
                            <Grid container spacing={5} maxWidth={'sm'}>
                              <Grid item xs={12}>
                                <FormControl fullWidth variant='outlined'>
                                  <InputLabel htmlFor='outlined-adornment-parent-category'>Bộ đề thi</InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-parent-category'
                                    inputprops={{
                                      readOnly: true,
                                      className: 'Mui-disabled'
                                    }}
                                    readOnly={true}
                                    value={testGroupSelected.testGroupName}
                                    endAdornment={
                                      <InputAdornment position='end'>
                                        {testGroupSelected && testGroupSelected.testGroupId > 0 && (
                                          <>
                                            <IconButton edge='end' onClick={() => viewTestGroup()}>
                                              <VisibilityOutlinedIcon />
                                            </IconButton>
                                            &nbsp;
                                          </>
                                        )}
                                        <IconButton edge='end' onClick={() => cleanTestGroup(true)}>
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
                                    name='order'
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field: { value, onChange } }) => (
                                      <TextField
                                        type='number'
                                        value={value ?? ''}
                                        label='Thứ tự'
                                        InputLabelProps={{ shrink: true }}
                                        onChange={onChange}
                                      />
                                    )}
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
                                        value={value ?? ''}
                                        label='Thời gian làm bài (phút)'
                                        InputLabelProps={{ shrink: true }}
                                        required
                                        type='number'
                                        onChange={onChange}
                                        error={Boolean(errors.duration)}
                                        aria-describedby='validation-schema-name'
                                      />
                                    )}
                                  />
                                  {errors.duration && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                      {errors.duration.message}
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
                                        value={value ?? ''}
                                        label='Điểm đạt'
                                        type='number'
                                        InputLabelProps={{ shrink: true }}
                                        required
                                        onChange={onChange}
                                        error={Boolean(errors.requiredScore)}
                                        aria-describedby='validation-schema-name'
                                      />
                                    )}
                                  />
                                  {errors.requiredScore && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                      {errors.requiredScore.message}
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
                                        value={value ?? ''}
                                        label='Số lần thi cho phép'
                                        type='number'
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          inputProps: {
                                            min: 0
                                          }
                                        }}
                                        required
                                        onChange={onChange}
                                        helperText='0: không giới hạn số lần làm bài thi'
                                        error={Boolean(errors.numberOfExamAttemptAllow)}
                                        aria-describedby='validation-schema-name'
                                      />
                                    )}
                                  />
                                  {errors.numberOfExamAttemptAllow && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                      {errors.numberOfExamAttemptAllow.message}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              {/* <Grid item xs={12}>
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
                              </Grid> */}
                              <Grid item xs={12}>
                                <FormGroup row>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={stateSetting.randomAnswerOrder}
                                        onChange={handleChangeSwitch}
                                        name='randomAnswerOrder'
                                      />
                                    }
                                    label='Trộn ngẫu nhiên câu trả lời'
                                  />
                                </FormGroup>
                              </Grid>
                              <Grid item xs={12}>
                                <FormGroup row>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={stateSetting.randomQuestionOrder}
                                        onChange={handleChangeSwitch}
                                        name='randomQuestionOrder'
                                      />
                                    }
                                    label='Trộn ngẫu nhiên câu hỏi'
                                  />
                                </FormGroup>
                              </Grid>
                              <Grid item xs={12}>
                                <FormGroup row>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={stateSetting.allowRepeatMediaFile}
                                        onChange={handleChangeSwitch}
                                        name='allowRepeatMediaFile'
                                      />
                                    }
                                    label='Cho phép nghe lại audio'
                                  />
                                </FormGroup>
                              </Grid>
                            </Grid>
                          </form>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Box>
            {openQuestionCatalogSelector && (
              <TestGroupSelector
                onClose={() => {
                  setOpenQuestionCatalogSelector(false)
                }}
                onNodeSelected={nodeId => {
                  handleSelectedTestGroup(nodeId)
                }}
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
                  Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Môn thi này không?
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
          </>
        </div>
      </div>
    </>
  )
}

export default ExamItemEditForm
