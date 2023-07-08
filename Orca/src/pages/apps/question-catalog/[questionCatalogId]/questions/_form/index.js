import {
  useEffect,
  useState
} from 'react'

import { QuestionCategoryApi } from 'api/catalog-api'
import QuestionApi from 'api/question-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CatalogDialog from 'pages/shared/catalog'
import EntityInfoModal from 'pages/shared/entity-info-modal'
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
  selectedQuestion,
  selectQuestion
} from 'store/slices/questionSlice'
import { CatalogType } from 'types/CatalogType'
import { QuestionType } from 'types/QuestionType'
import * as yup from 'yup'

import Icon from '@core/components/icon'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
import {
  Button,
  Divider
} from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
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
import Radio from '@mui/material/Radio'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import TopNav from '../_layout/_breadcrums'
import Nav from '../_layout/_tabs'

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const QuestionEditForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { questionCatalogId, questionId, type } = router.query
  const currentQuestion = useSelector(selectedQuestion)
  const [item, setItem] = useState(null)
  const [anwser, setAnwser] = useState([])
  const [questionTypeName, setQuestionTypeName] = useState('');
  const [openCatalogDialog, setOpenCatalogDialog] = useState(false)

  let dynamic = {
    // content: yup.string().required('* lkafjl sfjsl dlksfjlkj salkfjdsl fjlksfj')
  }
  let schema = yup.object().shape({
    name: yup.string().required('* bắt buộc'),
    content: yup.string().required('* bắt buộc')
  })

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentQuestion,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })


  useEffect(() => {
    if (!questionId || questionId == 0) {
      dispatch(selectQuestion({ id: 0, name: '', content: '', answers: [] }))
      return
    }

    fetchData(questionId)
  }, [questionId])

  const fetchData = (questionId) => {
    new QuestionApi().get(questionId)
      .then(response => {
        let data = response.data
        dispatch(selectQuestion(data))
        setQuestionTypeName(data.questionTypeName)

        setCategorySelected({ categoryId: response.data.categoryId, categoryName: response.data.categoryName })

        setAnwser(Object.values(data.answers))
      })
  }
  useEffect(() => {
    if (!router.isReady) return
    if (type) {
      initQuestion(type)
    }
  }, [type])

  const initQuestion = (type) => {
    const item = new QuestionApi().createQuestion({ id: Number(type) })

    item.catalogId = Number(questionCatalogId)
    setQuestionTypeName(item.questionTypeName)
    dispatch(selectQuestion(item))
    setAnwser(Object.values(item.answers))
    console.log('type:', type)
  }

  useEffect(() => {
    if (currentQuestion) reset(currentQuestion)
  }, [currentQuestion])

  const save = (code) => {
    const itemValue = getValues()
    let param = Object.assign({}, currentQuestion)
    param.name = itemValue.name
    param.content = itemValue.content
    param.categoryId = categorySelected.categoryId


    let answerArr = []
    anwser.forEach(elm => {
      answerArr.push(Object.assign({}, elm))
    });

    console.log('itemValue:', itemValue)


    answerArr.forEach(elm => {
      const content = getValues(`anws-content-${elm.id}`)
      if (content)
        elm.content = content

    });
    param.answers = answerArr
    console.log('param:', param)

    new QuestionApi().save(param)
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code == 1) {
          router.push(`/apps/question-catalog/${questionCatalogId}/questions`)
        } else {
          reset()
          cleanCategory()
          initQuestion(type)
        }
      })
      .catch((e) => {
        toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
      })
  }

  const onSubmit = data => {
    new QuestionApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }

  /*
  * handle category
  */
  const [categorySelected, setCategorySelected] = useState({ categoryId: 0, categoryName: '' })
  const handleSelectedCategory = (selectedId) => {
    QuestionCategoryApi.get(selectedId)
      .then(response => {
        if (response.data) {
          setCategorySelected({ categoryId: selectedId, categoryName: response.data.name })
          setItem({ ...item, categoryId: Number(selectedId) })
        }
      })
  }

  const cleanCategory = () => {
    setCategorySelected({ categoryId: 0, categoryName: '', anwser: null })
  }
  /*
  * end handle category
  */

  const addAnswer = () => {
    const newAnswer = new QuestionApi().createAnswer(
      -(anwser.length + 1),
      anwser.length + 1,
      "",
      false
    )
    anwser.push(newAnswer)
    setAnwser([...anwser])


    // const itemValidate = { name: yup.string().required('* Bắt buộc') }
    // dynamic['name'] = yup.string().required('* Bắt buộc')
    dynamic['name-1'] = yup.string().required('* lkafjl sfjsl dlksfjlkj salkfjdsl fjlksfj')

    console.log('dynamic:', dynamic)
    // schema = [{ ...schema }]


    const requiredSchema = yup.string().required();
    const emailSchemaObject = yup.object({
      ...dynamic
    })
    schema = schema.concat(emailSchemaObject)

    console.log(schema)
  };

  const removeAnswer = (id) => {
    let answers = [...anwser]
    answers = answers.filter((x) => x.id !== id)
    setAnwser([...answers])
  };

  const handleChangeAnwser = (id, field, checked = false) => {
    let anwserArr = []
    anwser.forEach(element => {
      anwserArr.push(Object.assign({}, element))
    });

    anwserArr.map((x) => {
      if (field === 'content') {

      } else if (field === 'checkbox') {
        if (x.id == id) {
          x.isCorrect = checked
        }
      }
      else {
        x.isCorrect = false
        if (x.id == id) {
          x.isCorrect = true
        }
      }
    })
    setAnwser([...anwserArr])
  };

  /*
  * handle remove exam-item
  */
  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDelete = () => {
    if (!questionId || questionId > 0) {
      new QuestionApi().delete({ id: questionId })
        .then((response) => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          router.push(`/apps/question-catalog/${questionCatalogId}/questions`)
        })
        .catch((e) => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }
  /*
  * handle remove exam-item
  */

  return (
    <>
      <div style={{ padding: 0 }}>
        <div sx={{ py: 5.375 }} style={{ padding: 0 }}>
          <>
            <TopNav />
            {currentQuestion && (
              <Box style={{ marginTop: 2 }}>
                <div className='grid-block vertical'>
                  <div className='title-bar' id='EntityHeadingTitleBar'>
                    <h3 className='title left'>
                      <span className='title__label'>
                        {currentQuestion && currentQuestion.id > 0 && <span>{currentQuestion.name}</span>}
                        {(!currentQuestion || currentQuestion.id == 0) && (<><span>Tạo mới Câu hỏi</span></>)}
                      </span>
                      {currentQuestion && currentQuestion.id > 0 && <EntityInfoModal entity={currentQuestion} />}
                    </h3>
                    <span className='right'>
                      {currentQuestion && currentQuestion.id > 0 && (
                        <>
                          <Tooltip title='Xóa câu hỏi'>
                            <span>
                              <IconButton aria-label='Xóa câu hỏi' onClick={handleClickOpenDelete}>
                                <DeleteIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                          &nbsp;
                        </>
                      )}
                      <Button variant='outlined' component={Link} href={`/apps/question-catalog/${questionCatalogId}/questions`}>
                        <ArrowBackIcon />
                        &nbsp;Quay lại
                      </Button>
                      &nbsp;
                      <Button disabled={!isValid} onClick={() => save(1)} variant='contained'>
                        Cập nhật
                      </Button>
                      {(!currentQuestion || currentQuestion.id == 0) && (
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
                        <Grid container spacing={5} style={{ paddingBottom: '20px' }}>
                          <Grid item xs={12}>
                            <b>Loại câu hỏi: <Chip label={questionTypeName} color="info" variant="outlined" /></b>
                          </Grid>
                        </Grid>
                        <Grid container spacing={5}>
                          <Grid item xs={12} md={12}>
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
                            <FormControl fullWidth variant='outlined'>
                              <InputLabel htmlFor='outlined-adornment-parent-category'>Danh mục câu hỏi</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-parent-category'
                                inputprops={{
                                  readOnly: true,
                                  className: 'Mui-disabled',
                                }}
                                value={categorySelected.categoryName ?? ''}
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton aria-label='toggle password visibility' edge='end' onClick={cleanCategory}>
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
                                label='Danh mục câu hỏi'
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                              <Controller
                                name='content'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                  <TextField
                                    multiline
                                    rows={3}
                                    fullWidth
                                    value={value ?? ''}
                                    label='Nội dung'
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    onChange={onChange}
                                    error={Boolean(errors.content)}
                                    aria-describedby='validation-schema-name'
                                  />
                                )}
                              />
                              {errors.content && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                  {errors.content.message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                              <Controller
                                name='explain'
                                control={control}
                                rules={{ required: false }}
                                render={({ field: { value, onChange } }) => (
                                  <TextField
                                    multiline
                                    rows={2}
                                    fullWidth
                                    value={value ?? ''}
                                    label='Giải thích'
                                    InputLabelProps={{ shrink: true }}
                                    onChange={onChange}
                                    aria-describedby='validation-schema-name'
                                  />
                                )}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>

                        <Grid container spacing={5} style={{ paddingBottom: '20px', paddingTop: '10px' }}>
                          <Grid item xs={12}>
                            <Divider variant='left' textAlign='left'> <b>Đáp án </b></Divider>
                          </Grid>
                        </Grid>
                        <Grid container spacing={5} style={{ paddingBottom: '20px' }}>
                          <Grid item xs={12}>
                            <TableContainer component={Paper} style={{ marginTop: 5 }}>
                              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                                <TableHead>
                                  <TableRow>
                                    <TableCell padding='checkbox'>
                                      #
                                    </TableCell>
                                    <TableCell style={{ width: 120 }}>Đáp án đúng</TableCell>
                                    <TableCell>Nội dung</TableCell>
                                    <TableCell style={{ width: 30 }}></TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {anwser &&
                                    anwser.map((anwser, index) => {
                                      return (
                                        <TableRow
                                          hover
                                          key={`anwser-${anwser.id}`}
                                          sx={{
                                            '&:last-of-type td, &:last-of-type th': {
                                              border: 0
                                            }
                                          }}
                                        >
                                          <TableCell padding='checkbox' style={{ textAlign: 'center' }}>
                                            {index + 1}
                                          </TableCell>
                                          <TableCell component='th' scope='row' style={{ textAlign: 'center' }}>
                                            {currentQuestion.questionTypeId === QuestionType.MC && (
                                              <Checkbox
                                                checked={anwser.isCorrect}
                                                value={anwser.isCorrect}
                                                name={`chk-ans-content-${anwser.id}`}
                                                onChange={(event) => {
                                                  handleChangeAnwser(anwser.id, 'checkbox', event.target.checked)
                                                }}
                                              />
                                            )}
                                            {(currentQuestion.questionTypeId === QuestionType.SC ||
                                              currentQuestion.questionTypeId === QuestionType.TF) && (
                                                <Radio
                                                  checked={anwser.isCorrect}
                                                  value={anwser.isCorrect}
                                                  name={`rdb-ans-content-${anwser.id}`}
                                                  onChange={(event) => {
                                                    handleChangeAnwser(anwser.id, '')
                                                  }}
                                                />
                                              )}
                                          </TableCell>
                                          <TableCell component='th' scope='row'>
                                            <FormControl fullWidth>
                                              <Controller
                                                name={`anws-content-${anwser.id}`}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                  <TextField
                                                    multiline
                                                    rows={currentQuestion.questionTypeId == QuestionType.TF ? 1 : 3}
                                                    fullWidth
                                                    disabled={currentQuestion.questionTypeId == QuestionType.TF ? true : false}
                                                    value={value ?? anwser.content ?? ''}
                                                    label='Nội dung'
                                                    InputLabelProps={{ shrink: true }}
                                                    required
                                                    onChange={onChange}
                                                    error={true}
                                                    aria-describedby='validation-schema-name'
                                                  />
                                                )}
                                              />
                                            </FormControl>
                                          </TableCell>
                                          <TableCell>
                                            {currentQuestion.questionTypeId !== QuestionType.TF && (
                                              <IconButton aria-label='Xóa đáp án' onClick={() => removeAnswer(anwser.id)}>
                                                <DeleteIcon color='warning' />
                                              </IconButton>
                                            )}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    })
                                  }

                                  {currentQuestion && currentQuestion.questionTypeId !== QuestionType.TF && (
                                    <TableRow
                                      key={`add-anwser`}
                                    >
                                      <TableCell padding='checkbox' colSpan={4} style={{ textAlign: 'center' }}>
                                        <Button
                                          variant='outlined'
                                          style={{ width: 250, margin: '20px' }}
                                          color='success'
                                          startIcon={<Icon icon='mdi:plus' />}
                                          onClick={() => addAnswer()}
                                        >
                                          Thêm đáp án
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>

                          </Grid>
                        </Grid>
                      </form>
                    </div>
                  </div>
                </div>
              </Box>
            )}

            {openCatalogDialog && (
              <CatalogDialog
                catalogType={CatalogType.QUESTION_CATEGORY}
                open={openCatalogDialog}
                onClose={() => {
                  setOpenCatalogDialog(false)
                }}
                excludedId={0}
                onNodeSelected={nodeId => { handleSelectedCategory(nodeId) }}


              />
            )}

            <Dialog
              open={openDelete}
              onClose={handleCloseDelete}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Xác nhận
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Câu hỏi này không?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCloseDelete}> Hủy bỏ </Button>
                <Button onClick={handleDelete} color='error'>Đồng ý</Button>
              </DialogActions>
            </Dialog>
          </>
        </div>
      </div>
    </>
  )
}

export default QuestionEditForm
