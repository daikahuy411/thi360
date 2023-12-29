import {
  useEffect,
  useState
} from 'react'

import { QuestionCategoryApi } from 'api/catalog-api'
import QuestionApi from 'api/question-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import QuestionCategoryDialog from 'pages/shared/question-category-selector'
import AddQuestionAnswer from 'pages/shared/question-form'
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
import { QuestionType } from 'types/QuestionType'
import * as yup from 'yup'

import ContentEditor from '@core/components/editor'
import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
import {
  Button,
  Select
} from '@mui/material'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
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
import MenuItem from '@mui/material/MenuItem'
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
import Typography from '@mui/material/Typography'

import TopNav from '../_layout/_breadcrums'
import Nav from '../_layout/_tabs'

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const QuestionEditForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { questionCatalogId, questionId, type, parentId, questionCategoryId } = router.query
  const currentQuestion = useSelector(selectedQuestion)
  const [item, setItem] = useState(null)
  const [answers, setAnswers] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [questionTypes, setQuestionTypes] = useState(null)
  const [questionTypeName, setQuestionTypeName] = useState('')
  const [openCatalogDialog, setOpenCatalogDialog] = useState(false)
  const [openAddQuestionAnswer, setOpenAddQuestionAnswer] = useState(false)
  const [isValidAnswer, setIsValidAnswer] = useState(false)
  const [isloadingQuestion, setIsLoadingQuestion] = useState(false)
  const [category, setCategory] = useState(null)
  const [answerGroups, setAnswerGroups] = useState([])

  let schema = yup.object().shape({
    content: yup.string().required('* bắt buộc')
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    unregister,
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

    if (questionId > 0) {
      getAllQuestionTypes()
    }
  }, [questionId])

  useEffect(() => {
    if (!questionCategoryId || questionCategoryId == '0') {
      return
    }

    QuestionCategoryApi.get(questionCategoryId).then(response => {
      if (response.data) {
        setCategorySelected({ categoryId: questionCategoryId, categoryName: response.data.name })
        setItem({ ...item, categoryId: Number(questionCategoryId) })
      }
    })
  }, [questionCategoryId])

  const fetchData = questionId => {
    if (type === QuestionType.GQ) {
      setIsLoadingQuestion(true)
    }
    new QuestionApi().get(questionId).then(response => {
      let data = response.data
      dispatch(selectQuestion(data))
      setQuestionTypeName(data.questionTypeName)

      setCategorySelected({ categoryId: response.data.categoryId, categoryName: response.data.categoryName })

      setAnswers(Object.values(data.answers))
      setIsLoadingQuestion(false)

      if (data.questionTypeId === QuestionType.MATCHING) {
        var ags = []
        data.answers.forEach(a => {
          const g = ags.find(x => x.index == a.group)
          if (!g) {
            ags.push({ index: a.group, answers: [...a] })
          } else {
            g.answers.push(...a)
          }
        })
        setAnswerGroups([...ags])
      }
    })
  }

  const getAllQuestionTypes = () => {
    new QuestionApi().getQuestionTypes().then(response => {
      setQuestionTypes(response.data)
    })
  }

  const moveItem = (from, to) => {
    var reOrderAnswers = [...answers]
    var f = reOrderAnswers.splice(from, 1)[0]
    reOrderAnswers.splice(to, 0, f)
    setAnswers(reOrderAnswers)
  }

  useEffect(() => {
    if (!router.isReady) return
    if (type) {
      initQuestion(type)
    }
  }, [type])

  const initQuestion = type => {
    const item = new QuestionApi().createQuestion({ id: Number(type) })
    item.catalogId = Number(questionCatalogId)
    setQuestionTypeName(item.questionTypeName)
    dispatch(selectQuestion(item))
    setAnswers(Object.values(item.answers))

    if (type == QuestionType.MATCHING) {
      // initAnswerGroup()
    }
  }

  useEffect(() => {
    if (currentQuestion) reset(currentQuestion)
  }, [currentQuestion])

  const checkValidate = id => {
    let anwserArr = []
    answers.forEach(element => {
      anwserArr.push(Object.assign({}, element))
    })

    anwserArr.map(x => {
      if (x.id == id) {
        if (!getValues(`anws-content-${x.id}`)) {
          let errorObj = {
            isError: true,
            message: '* Bắt buộc'
          }
          x.errors = errorObj
        } else {
          let errorObj = {
            isError: false,
            message: ''
          }
          x.errors = errorObj
        }
      }
    })
    setAnswers([...anwserArr])
    checkIsvalidAnswer(true)
  }

  const checkIsvalidAnswer = (isFormField = false) => {
    if (currentQuestion.questionTypeId === QuestionType.SA || currentQuestion.questionTypeId === QuestionType.FB) {
      setIsValidAnswer(true)
      return
    }

    let answersCloned = [...answers]
    let check = true
    answersCloned.forEach(elm => {
      let content = getValues(`anws-content-${elm.id}`)
      if (!content) content = elm.content

      if (!content || content === '') {
        check = false
        return
      }
    })

    setIsValidAnswer(check)
  }

  const save = code => {
    const itemValue = getValues()
    let param = Object.assign({}, currentQuestion)
    param.name = itemValue.name
    param.content = itemValue.content
    param.explain = itemValue.explain
    param.categoryId = parseInt(categorySelected.categoryId)
    param.catalogName = ''

    if (parentId && parentId != '0' && !isNaN(parentId)) {
      param.parentId = parseInt(parentId)
    }

    let answerArr = []
    answers.forEach(elm => {
      answerArr.push(Object.assign({}, elm))
    })

    answerArr.forEach(elm => {
      const content = getValues(`anws-content-${elm.id}`)
      if (content) elm.content = content
    })

    answerGroups.forEach(e => {
      e.answers.forEach(a => {
        answerArr.push(Object.assign({}, a))
      })
    })

    param.answers = answerArr

    new QuestionApi()
      .save(param)
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code == 1) {
          router.query.questionId = response.data.id
          router.push(router)
        } else {
          reset()
          cleanCategory()
          initQuestion(type)
        }
      })
      .catch(e => {
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
  const handleSelectedCategory = selectedId => {
    QuestionCategoryApi.get(selectedId).then(response => {
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

  useEffect(() => {
    checkIsvalidAnswer(true)
  }, [answers])

  const addAnswer = () => {
    const newAnswer = new QuestionApi().createAnswer(-(answers.length + 1), answers.length + 1, '', false, {
      isError: false,
      message: ''
    })

    answers.push(newAnswer)
    setAnswers([...answers])
  }

  // Matching Question
  const addMatchingAnswerGroup = () => {
    const groupIndex = answerGroups.length
    let leftAnswer = new QuestionApi().createAnswer(-(groupIndex * 2 + 1), 1, '', false, {
      isError: false,
      message: ''
    })
    leftAnswer.group = groupIndex

    let rightAnswer = new QuestionApi().createAnswer(-(groupIndex * 2 + 2), 2, '', false, {
      isError: false,
      message: ''
    })
    rightAnswer.group = groupIndex

    answerGroups.push({ id: groupIndex, order: groupIndex + 1, answers: [leftAnswer, rightAnswer] })
    setAnswerGroups([...answerGroups])
  }

  const removeMatchingAnswerGroup = id => {
    let ags = [...answerGroups]
    ags = ags.filter(x => x.id != id)
    setAnswerGroups([...ags])
  }

  const initAnswerGroup = () => {
    for (var i = 1; i <= 4; i++) {
      const groupIndex = answerGroups.length
      let leftAnswer = new QuestionApi().createAnswer(-(answers.length + 1), 1, '', false, {
        isError: false,
        message: ''
      })
      leftAnswer.group = groupIndex

      let rightAnswer = new QuestionApi().createAnswer(-(answers.length + 1), 2, '', false, {
        isError: false,
        message: ''
      })
      rightAnswer.group = groupIndex

      answerGroups.push({ id: groupIndex, order: groupIndex + 1, answers: [leftAnswer, rightAnswer] })
    }

    setAnswerGroups([...answerGroups])
  }

  // Matching Question

  const removeAnswer = id => {
    let answers = [...answers]
    answers = answers.filter(x => x.id !== id)

    setAnswers(answers)
    unregister(`anws-content-${id}`)
  }

  const handleChangeAnwser = (id, field, checked = false) => {
    let anwserArr = []
    answers.forEach(element => {
      anwserArr.push(Object.assign({}, element))
    })

    anwserArr.map(x => {
      if (field === 'content') {
      }
      if (field === 'position') {
        if (x.id == id) {
          x.order = Number(checked)
        }
      } else if (field === 'checkbox') {
        if (x.id == id) {
          x.isCorrect = checked
        }
      } else {
        x.isCorrect = false
        if (x.id == id) {
          x.isCorrect = true
        }
      }
    })
    setAnswers([...anwserArr])
  }

  /*
   * handle remove question-answer
   */
  const [openDelete, setOpenDelete] = useState(false)
  const [typeDelete, setTypeDelete] = useState(1)
  const handleClickOpenDelete = typeDelete => {
    setTypeDelete(typeDelete)
    setOpenDelete(true)
  }
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (!questionId || questionId > 0) {
      new QuestionApi()
        .delete({ id: questionId })
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          router.push(`/apps/question-catalog/${questionCatalogId}/questions`)
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }

  const handleDeleteChildQuestion = () => {
    if (!childQuestionSelected || childQuestionSelected.id > 0) {
      new QuestionApi()
        .delete({ id: childQuestionSelected.id })
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          fetchData(questionId)
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }
  /*
   * handle remove question-answer
   */

  const open = Boolean(anchorEl)
  const handleChildQuestionClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const [childQuestionSelected, setChildQuestionSelected] = useState(null)
  const handleShowFormChildQuestion = (itemQuestionType, itemQuestion, isAddNew = true) => {
    setAnchorEl(null)
    setOpenAddQuestionAnswer(true)
    if (isAddNew) {
      setChildQuestionSelected({ questionId: 0, typeId: itemQuestionType.typeId, name: itemQuestionType.name })
    } else {
      setChildQuestionSelected({
        questionId: itemQuestion.id,
        typeId: itemQuestion.questionTypeId,
        name: itemQuestion.questionTypeName
      })
    }
  }

  const [anchorElChildQuestion, setAnchorElChildQuestion] = useState(null)
  const handleClickChildQuestion = event => {
    setAnchorElChildQuestion(event.currentTarget)
  }

  const handleCloseChildQuestion = () => {
    setAnchorElChildQuestion(null)
  }

  const getBackUrl = () => {
    if (questionCategoryId && questionCategoryId != '0') {
      return `/apps/question-catalog/${questionCatalogId}/categories/${questionCategoryId}/questions/`
    }

    return `/apps/question-catalog/${questionCatalogId}/questions/`
  }

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
                        {currentQuestion && currentQuestion.id > 0 && <span>{currentQuestion.id}</span>}
                        {(!currentQuestion || currentQuestion.id == 0) && (
                          <>
                            <span>Tạo mới Câu hỏi</span>
                          </>
                        )}
                        -{questionTypeName}
                      </span>
                      {currentQuestion && currentQuestion.id > 0 && <EntityInfoModal entity={currentQuestion} />}
                    </h3>
                    <span className='right'>
                      {currentQuestion && currentQuestion.id > 0 && (
                        <>
                          <Tooltip title='Xóa câu hỏi'>
                            <span>
                              <IconButton aria-label='Xóa câu hỏi' onClick={() => handleClickOpenDelete(1)}>
                                <DeleteIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                          &nbsp;
                        </>
                      )}
                      <Button variant='outlined' component={Link} href={getBackUrl()}>
                        <ArrowBackIcon />
                        &nbsp;Quay lại
                      </Button>
                      &nbsp;
                      <Button disabled={!isValid || !isValidAnswer} onClick={() => save(1)} variant='contained'>
                        Cập nhật
                      </Button>
                      {questionId == '0' && (
                        <>
                          &nbsp;
                          <Button disabled={!isValid || !isValidAnswer} onClick={() => save(2)} variant='contained'>
                            Cập nhật &amp; Thêm mới
                          </Button>
                        </>
                      )}
                    </span>
                  </div>
                  <div className='grid-block'>
                    <Nav />
                    <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                      <LoadingSpinner active={isloadingQuestion}>
                        <Grid container>
                          <Grid item xs={12}>
                            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', paddingTop: 10 }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12} md={6}>
                                  <FormControl fullWidth variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-parent-category'>
                                      Danh mục câu hỏi
                                    </InputLabel>
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
                                            onClick={cleanCategory}
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
                                      label='Danh mục câu hỏi'
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography>Nội dung</Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <FormControl fullWidth>
                                    <Controller
                                      name='content'
                                      control={control}
                                      rules={{ required: true }}
                                      render={({ field: { value, onChange } }) => (
                                        <ContentEditor
                                          content={value ?? ''}
                                          onChange={data => {
                                            onChange(data)
                                          }}
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
                                {currentQuestion.questionTypeId === QuestionType.FB && (
                                  <Grid item md={12}>
                                    <Alert>
                                      Trả lời dạng [Đáp án đúng 1;Đáp án đúng 2;~Đáp án sai 1;~Đáp án sai 2]
                                    </Alert>
                                  </Grid>
                                )}
                                <Grid item xs={12}>
                                  <Typography>Giải thích</Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <FormControl fullWidth>
                                    <Controller
                                      name='explain'
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
                                </Grid>
                              </Grid>

                              <br />
                              {currentQuestion.questionTypeId !== QuestionType.SA &&
                                currentQuestion.questionTypeId !== QuestionType.GQ &&
                                currentQuestion.questionTypeId !== QuestionType.MATCHING &&
                                currentQuestion.questionTypeId !== QuestionType.FB && (
                                  <>
                                    <Grid container spacing={5} style={{ paddingBottom: '20px' }}>
                                      <Grid item xs={12}>
                                        {currentQuestion.questionTypeId === QuestionType.ORDER && (
                                          <>
                                            <Alert>
                                              <br />
                                              Thứ tự đáp án đúng phải được sắp xếp theo thứ tự từ trên xuống dưới.
                                            </Alert>
                                            <br />
                                          </>
                                        )}
                                        <TableContainer component={Paper} style={{ marginTop: 5 }} className=''>
                                          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                                            <TableHead>
                                              <TableRow>
                                                <TableCell padding='checkbox' align='center'>
                                                  #
                                                </TableCell>
                                                <TableCell style={{ width: 50 }}></TableCell>
                                                <TableCell style={{ width: 110 }}>Thứ tự</TableCell>
                                                {currentQuestion.questionTypeId !== QuestionType.ORDER && (
                                                  <TableCell style={{ width: 120 }}>Đáp án đúng</TableCell>
                                                )}
                                                <TableCell>Nội dung</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              {answers &&
                                                answers.map((anwser, index) => {
                                                  return (
                                                    <TableRow
                                                      hover
                                                      key={`normal-anwser-${anwser.id}`}
                                                      sx={{
                                                        '&:last-of-type td, &:last-of-type th': {
                                                          border: 0
                                                        }
                                                      }}
                                                    >
                                                      <TableCell
                                                        padding='checkbox'
                                                        scope='row'
                                                        component='th'
                                                        style={{ textAlign: 'center' }}
                                                      >
                                                        {index + 1}
                                                      </TableCell>
                                                      <TableCell scope='row' component='th' align='right'>
                                                        <Tooltip title='Xóa đáp án'>
                                                          <span>
                                                            <IconButton
                                                              aria-label='Xóa đáp án'
                                                              onClick={() => removeAnswer(anwser.id)}
                                                            >
                                                              <Icon icon='mdi:trash' fontSize={20} />
                                                            </IconButton>
                                                          </span>
                                                        </Tooltip>
                                                      </TableCell>
                                                      <TableCell
                                                        scope='row'
                                                        component='th'
                                                        style={{ textAlign: 'center' }}
                                                      >
                                                        <TextField
                                                          type='number'
                                                          name={`ans-order-${anwser.id}`}
                                                          value={anwser.order}
                                                          size={'small'}
                                                          onChange={event => {
                                                            handleChangeAnwser(
                                                              anwser.id,
                                                              'position',
                                                              event.target.value
                                                            )
                                                          }}
                                                        />
                                                      </TableCell>
                                                      {currentQuestion.questionTypeId !== QuestionType.ORDER && (
                                                        <TableCell
                                                          scope='row'
                                                          component='th'
                                                          style={{ textAlign: 'center' }}
                                                        >
                                                          {currentQuestion.questionTypeId === QuestionType.MC && (
                                                            <Checkbox
                                                              checked={anwser.isCorrect}
                                                              value={anwser.isCorrect}
                                                              name={`chk-ans-content-${anwser.id}`}
                                                              onChange={event => {
                                                                handleChangeAnwser(
                                                                  anwser.id,
                                                                  'checkbox',
                                                                  event.target.checked
                                                                )
                                                              }}
                                                            />
                                                          )}
                                                          {(currentQuestion.questionTypeId === QuestionType.SC ||
                                                            currentQuestion.questionTypeId === QuestionType.TF) && (
                                                            <Radio
                                                              checked={anwser.isCorrect}
                                                              value={anwser.isCorrect}
                                                              name={`rdb-ans-content-${anwser.id}`}
                                                              onChange={event => {
                                                                handleChangeAnwser(anwser.id, '')
                                                              }}
                                                            />
                                                          )}
                                                          {currentQuestion.questionTypeId === QuestionType.FB && (
                                                            <TextField
                                                              type='number'
                                                              name={`ans-order-${anwser.id}`}
                                                              value={anwser.order}
                                                              onChange={event => {
                                                                handleChangeAnwser(
                                                                  anwser.id,
                                                                  'position',
                                                                  event.target.value
                                                                )
                                                              }}
                                                            />
                                                          )}
                                                        </TableCell>
                                                      )}
                                                      <TableCell scope='row' component='th'>
                                                        <FormControl fullWidth>
                                                          <Controller
                                                            name={`anws-content-${anwser.id}`}
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field: { value, onChange } }) => (
                                                              <ContentEditor
                                                                content={value ?? anwser.content ?? ''}
                                                                onChange={value => {
                                                                  onChange(value)
                                                                  checkValidate(anwser.id)
                                                                }}
                                                              />
                                                            )}
                                                          />
                                                          <FormHelperText
                                                            sx={{ color: 'error.main' }}
                                                            id='validation-schema-name'
                                                          >
                                                            {anwser.errors?.message}
                                                          </FormHelperText>
                                                        </FormControl>
                                                      </TableCell>
                                                    </TableRow>
                                                  )
                                                })}
                                              {currentQuestion && currentQuestion.questionTypeId !== QuestionType.TF && (
                                                <TableRow key={`add-anwser`}>
                                                  <TableCell
                                                    padding='checkbox'
                                                    colSpan={5}
                                                    style={{ textAlign: 'center' }}
                                                  >
                                                    <Button
                                                      size='small'
                                                      variant='contained'
                                                      style={{ width: 250, margin: '20px' }}
                                                      color='primary'
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
                                  </>
                                )}
                              {currentQuestion.questionTypeId === QuestionType.FB && (
                                <Grid container spacing={6}>
                                  <Grid item md={6}>
                                    <FormControl fullWidth>
                                      <InputLabel htmlFor='payment-method'>Cấu hình hiển thị câu hỏi</InputLabel>
                                      <Select
                                        // onChange={e => onChangeRadioControl(e, 'renderAs')}
                                        label='Cấu hình hiển thị câu hỏi'
                                        labelId='demo-simple-select-label'
                                        aria-describedby='validation-schema-group'
                                      >
                                        <MenuItem value={-1}>Chọn</MenuItem>
                                        <MenuItem value={1}>Textbox</MenuItem>
                                        <MenuItem value={2}>Dropdonwlist</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item md={6}>
                                    <FormControl fullWidth>
                                      <InputLabel htmlFor='payment-method'>Cấu hình cách chấm điểm câu hỏi</InputLabel>
                                      <Select
                                        label='Cấu hình cách chấm điểm câu hỏi'
                                        labelId='demo-simple-select-label'
                                        aria-describedby='validation-schema-group'
                                      >
                                        <MenuItem value={-1}>Chọn</MenuItem>
                                        <MenuItem value={1}>Đúng chính xác</MenuItem>
                                        <MenuItem value={2}>Không phân biệt chữ in, thường</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                </Grid>
                              )}
                            </form>
                          </Grid>
                          <Grid item xs={12}>
                            {currentQuestion.questionTypeId === QuestionType.MATCHING && (
                              <div style={{ height: 'auto', width: '100%', paddingTop: 10 }}>
                                <Grid container spacing={5} style={{ paddingBottom: '20px' }}>
                                  <Grid item md={12} xs={12}>
                                    <TableContainer component={Paper} style={{ marginTop: 5 }} className=''>
                                      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell padding='checkbox' align='center'>
                                              #
                                            </TableCell>
                                            <TableCell style={{ width: 60 }}></TableCell>
                                            <TableCell style={{ width: 110 }}>Thứ tự</TableCell>
                                            <TableCell>Nội dung</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {answerGroups &&
                                            answerGroups.map((group, index) => {
                                              return (
                                                <>
                                                  <TableRow
                                                    key={`group-first-${group.id}`}
                                                    sx={{
                                                      '&:last-of-type td, &:last-of-type th': {
                                                        border: 0
                                                      }
                                                    }}
                                                  >
                                                    <TableCell
                                                      rowSpan={2}
                                                      padding='checkbox'
                                                      scope='row'
                                                      component='th'
                                                      style={{ textAlign: 'center' }}
                                                    >
                                                      {index + 1}
                                                    </TableCell>
                                                    <TableCell scope='row' component='th' rowSpan={2} align='right'>
                                                      <Tooltip title='Xóa Cặp Đáp án'>
                                                        <span>
                                                          <IconButton
                                                            aria-label='Xóa Cặp Đáp án'
                                                            onClick={() => removeMatchingAnswerGroup(group.id)}
                                                          >
                                                            <Icon icon='mdi:trash' fontSize={20} />
                                                          </IconButton>
                                                        </span>
                                                      </Tooltip>
                                                    </TableCell>
                                                    <TableCell
                                                      scope='row'
                                                      component='th'
                                                      rowSpan={2}
                                                      style={{ textAlign: 'center' }}
                                                    >
                                                      <TextField
                                                        type='number'
                                                        name={`group-order-${group.id}`}
                                                        value={group.order}
                                                        size={'small'}
                                                        onChange={event => {
                                                          // handleChangeAnwser(group.id, 'position', event.target.value)
                                                        }}
                                                      />
                                                    </TableCell>
                                                    <TableCell scope='row' component='th'>
                                                      <FormControl fullWidth>
                                                        <ContentEditor
                                                          value={group.answers[0].content ?? ''}
                                                          onChange={data => {
                                                            group.answers[0].content = data
                                                          }}
                                                        />
                                                        <FormHelperText
                                                          sx={{ color: 'error.main' }}
                                                          id='validation-schema-name'
                                                        >
                                                          {group.answers[0].errors?.message}
                                                        </FormHelperText>
                                                      </FormControl>
                                                    </TableCell>
                                                  </TableRow>
                                                  <TableRow
                                                    key={`group-second-${group.id}`}
                                                    sx={{
                                                      '&:last-of-type td, &:last-of-type th': {
                                                        border: 0
                                                      }
                                                    }}
                                                  >
                                                    <TableCell scope='row' component='th'>
                                                      <FormControl fullWidth>
                                                        <ContentEditor
                                                          value={group.answers[1].content ?? ''}
                                                          onChange={data => {
                                                            group.answers[1].content = data
                                                            onChange(data)
                                                          }}
                                                        />
                                                        <FormHelperText
                                                          sx={{ color: 'error.main' }}
                                                          id='validation-schema-name'
                                                        >
                                                          {group.answers[1].errors?.message}
                                                        </FormHelperText>
                                                      </FormControl>
                                                    </TableCell>
                                                  </TableRow>
                                                </>
                                              )
                                            })}
                                          <TableRow key={`add-anwser-for-grouping`}>
                                            <TableCell padding='checkbox' colSpan={4} style={{ textAlign: 'center' }}>
                                              <Button
                                                size='small'
                                                variant='contained'
                                                style={{ width: 250, margin: '20px' }}
                                                color='primary'
                                                startIcon={<Icon icon='mdi:plus' />}
                                                onClick={() => addMatchingAnswerGroup()}
                                              >
                                                Thêm cặp Đáp án
                                              </Button>
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </Grid>
                                </Grid>
                              </div>
                            )}
                          </Grid>
                        </Grid>
                      </LoadingSpinner>
                    </div>
                  </div>
                </div>
              </Box>
            )}

            {openCatalogDialog && (
              <QuestionCategoryDialog
                open={openCatalogDialog}
                onClose={() => {
                  setOpenCatalogDialog(false)
                }}
                catalogId={questionCatalogId}
                currentId={0}
                onNodeSelected={nodeId => {
                  handleSelectedCategory(nodeId)
                }}
              />
            )}

            {openAddQuestionAnswer && (
              <AddQuestionAnswer
                isOpen={openAddQuestionAnswer}
                onClose={() => {
                  setOpenAddQuestionAnswer(false)
                  fetchData(questionId)
                }}
                parentQuestionId={questionId}
                questionId={childQuestionSelected.questionId}
                typeId={childQuestionSelected.typeId}
                typeName={childQuestionSelected.name}
              />
            )}

            <Dialog
              open={openDelete}
              onClose={() => {
                handleCloseDelete()
                setChildQuestionSelected(null)
              }}
              PaperComponent={PaperComponent}
              aria-labelledby='draggable-dialog-title'
            >
              <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
                Xác nhận
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Câu hỏi này không?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    handleCloseDelete()
                    setChildQuestionSelected(null)
                  }}
                >
                  Hủy bỏ
                </Button>
                {typeDelete === 1 && (
                  <Button onClick={handleDelete} color='error'>
                    Đồng ý
                  </Button>
                )}
                {typeDelete === 2 && (
                  <Button onClick={handleDeleteChildQuestion} color='error'>
                    Đồng ý
                  </Button>
                )}
              </DialogActions>
            </Dialog>
          </>
        </div>
      </div>
    </>
  )
}

export default QuestionEditForm
