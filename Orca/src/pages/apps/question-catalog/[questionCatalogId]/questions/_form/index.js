import {
  useEffect,
  useState
} from 'react'

import { QuestionCategoryApi } from 'api/catalog-api'
import QuestionApi from 'api/question-api'
import QuestionCatalogApi from 'api/question-catalog-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import QuestionCatalogDialog from 'pages/shared/question-catalog-dialog'
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
import { selectParentQuestion } from 'store/slices/parentQuestionSlice'
import {
  selectedQuestion,
  selectQuestion
} from 'store/slices/questionSlice'
import { QuestionType } from 'types/QuestionType'
import * as yup from 'yup'

import ContentEditor from '@core/components/editor'
import Icon from '@core/components/icon'
import LiteContentEditor from '@core/components/lite-editor'
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
import Divider from '@mui/material/Divider'
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
  const [questionTypeName, setQuestionTypeName] = useState('')
  const [openQuestionCategoryDialog, setOpenQuestionCategoryDialog] = useState(false)
  const [openQuestionCatalogDialog, setOpenQuestionCatalogDialog] = useState(false)
  const [openAddQuestionAnswer, setOpenAddQuestionAnswer] = useState(false)
  const [isValidAnswer, setIsValidAnswer] = useState(false)
  const [isloadingQuestion, setIsLoadingQuestion] = useState(false)
  const [answerGroups, setAnswerGroups] = useState([])
  const [catalogSelected, setCatalogSelected] = useState({ id: 0, name: '' })
  const [setting, setSetting] = useState({ controlType: -1, caseSensitive: -1 })
  const [parentQuestion, setParentQuestion] = useState(null)
  const [subQuestions, setSubQuestions] = useState([])

  let schema = yup.object().shape({
    content: yup.string().required('* bắt buộc'),
    catalogId: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc')
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
  }, [questionId])

  useEffect(() => {
    if (!questionCatalogId || questionCatalogId == '0' || (item && item.id > 0)) {
      return
    }

    new QuestionCatalogApi().get(questionCatalogId).then(response => {
      if (response.data) {
        setCatalogSelected({ id: response.data.id, name: response.data.name })
        setItem({ ...item, catalogId: Number(questionCatalogId) })
      }
    })
  }, [questionCatalogId])

  useEffect(() => {
    if (!questionCategoryId || questionCategoryId == '0') {
      return
    }

    QuestionCategoryApi.get(questionCategoryId).then(response => {
      if (response.data) {
        setCategorySelected({ id: questionCategoryId, name: response.data.name })
        setItem({ ...item, categoryId: Number(questionCategoryId) })
      }
    })
  }, [questionCategoryId])

  useEffect(() => {
    if (!parentId) {
      dispatch(selectParentQuestion(null))
      return
    }

    new QuestionApi().get(parentId).then(response => {
      setParentQuestion(response.data)
      dispatch(selectParentQuestion(response.data))
      setCategorySelected({ id: response.data.categoryId, name: response.data.categoryName })
      setItem({ ...item, catalogId: response.data.catalogId, categoryId: response.data.categoryId })
    })
  }, [parentId])

  const fetchData = questionId => {
    if (type === QuestionType.GQ) {
      setIsLoadingQuestion(true)
    }

    new QuestionApi().get(questionId).then(response => {
      let data = response.data
      dispatch(selectQuestion(data))

      setQuestionTypeName(data.questionTypeName)

      if (response.data.category) {
        setCategorySelected({ id: response.data.categoryId, name: response.data.category.name })
      }

      if (response.data.catalog) {
        setCatalogSelected({ id: response.data.catalogId, name: response.data.catalog.name })
      }

      setAnswers(Object.values(data.answers))
      setSetting(response.data.setting || { controlType: -1, caseSensitive: -1 })
      setSubQuestions(response.data.subQuestions || [])
      setIsLoadingQuestion(false)
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
    item.parentId = parentQuestion ? parentQuestion.id : 0
    setQuestionTypeName(item.questionTypeName)
    dispatch(selectQuestion(item))
    setAnswers(Object.values(item.answers))

    if (type == QuestionType.MATCHING) {
      let subs = []
      for (var i = 0; i <= 3; i++) {
        const questionApi = new QuestionApi()
        let leftAnswer = questionApi.createAnswer(0, 1, '', false, {
          isError: false,
          message: ''
        })

        let rightAnswer = questionApi.createAnswer(1, 2, '', false, {
          isError: false,
          message: ''
        })

        var subQuestion = questionApi.createQuestion(QuestionType.SUB)
        subQuestion.answers = [leftAnswer, rightAnswer]
        subQuestion.order = subs.length + 1
        subQuestion.id = subs.length
        subs.push(subQuestion)
      }

      setSubQuestions([...subs])
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
    if (
      currentQuestion &&
      (currentQuestion.questionTypeId === QuestionType.SA || currentQuestion.questionTypeId === QuestionType.FB)
    ) {
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
    param.categoryId = parseInt(categorySelected.id)
    param.catalogId = parseInt(catalogSelected.id)
    param.catalogName = ''
    param.settingJSON = JSON.stringify(setting)
    param.subQuestionsJson = JSON.stringify(subQuestions)

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
        if (response.data.isSuccess) {
          toast.success('Cập nhật thành công')
          if (code == 1) {
            router.push(`/apps/question-catalog/${response.data.value.catalogId}/questions/${response.data.value.id}`)
          } else {
            reset()
            // cleanCategory()
            initQuestion(type)
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
    new QuestionApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }

  /*
   * handle category
   */
  const [categorySelected, setCategorySelected] = useState({ id: 0, name: '' })
  const handleSelectedCategory = selectedId => {
    QuestionCategoryApi.get(selectedId).then(response => {
      if (response.data) {
        setCategorySelected({ id: selectedId, name: response.data.name })
        setItem({ ...item, categoryId: Number(selectedId) })
      }
    })
  }

  const cleanCategory = () => {
    setCategorySelected({ id: 0, name: '', anwser: null })
  }

  /*
   * end handle category
   */

  /*
   * handle catalog
   */
  const handleSelectedCatalog = selectedId => {
    new QuestionCatalogApi().get(selectedId).then(response => {
      if (response.data) {
        setCatalogSelected({ id: selectedId, name: response.data.name })
        setItem({ ...item, catalogId: Number(selectedId) })
      }
    })
  }

  const cleanCatalog = () => {
    setValue('catalogId', 0)
    setCatalogSelected({ id: 0, name: '' })
  }

  /*
   * end handle catalog
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
  const handleChangeQuestionIsInterference = (id, value) => {
    const newSubs = subQuestions.map((c, i) => {
      if (c.id === id) {
        let cloned = { ...c }
        cloned.isInterference = value
        return cloned
      } else {
        return { ...c }
      }
    })

    setSubQuestions(newSubs)
  }

  const handleChangeAnswerContent = (questionId, answerId, value) => {
    const newSubs = subQuestions.map((c, i) => {
      if (c.id === questionId) {
        let cloned = { ...c }
        cloned.answers = c.answers.map(a => {
          if (a.id === answerId) {
            let clonedAnswer = { ...a }
            clonedAnswer.content = value
            return clonedAnswer
          } else {
            return a
          }
        })
        return cloned
      } else {
        return { ...c }
      }
    })

    setSubQuestions(newSubs)
  }

  const removeMatchingAnswerGroup = id => {
    let ags = [...subQuestions]
    ags = ags.filter(x => x.id != id)
    setSubQuestions([...ags])
  }

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

  const addMatchingSubQuestion = () => {
    let subs = [...subQuestions]
    let groupIndex = subQuestions.length
    const questionApi = new QuestionApi()
    let leftAnswer = questionApi.createAnswer(0, 1, '', false, {
      isError: false,
      message: ''
    })

    let rightAnswer = questionApi.createAnswer(1, 2, '', false, {
      isError: false,
      message: ''
    })

    var subQuestion = questionApi.createQuestion(QuestionType.SUB)
    subQuestion.answers = [leftAnswer, rightAnswer]
    subQuestion.order = groupIndex++

    subs.push(subQuestion)
    setSubQuestions(subs)
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
    var url = ''
    var parentQuestionId = 0
    if (currentQuestion && currentQuestion.parentId) parentQuestionId = currentQuestion.parentId
    if (questionCategoryId && questionCategoryId != '0') {
      url =
        parentQuestionId > 0
          ? `/apps/question-catalog/${questionCatalogId}/categories/${questionCategoryId}/questions/${parentQuestionId}/children`
          : `/apps/question-catalog/${questionCatalogId}/categories/${questionCategoryId}/questions/`
    }

    if (questionCatalogId && questionCatalogId != '0') {
      url =
        parentQuestionId > 0
          ? `/apps/question-catalog/${questionCatalogId}/questions/${parentQuestionId}/children`
          : `/apps/question-catalog/${questionCatalogId}/questions/`
    }

    return url != '' ? url : `/apps/question-bank`
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
                      {(!currentQuestion || currentQuestion.id == 0) && (
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
                        <>
                          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', paddingTop: 10 }}>
                            <Grid container spacing={5} maxWidth={'sm'}>
                              <Grid item xs={12} md={12}>
                                <FormControl fullWidth variant='outlined' required>
                                  <InputLabel htmlFor='outlined-adornment-parent-category'>Bộ Câu hỏi</InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-parent-category'
                                    inputprops={{
                                      readOnly: true,
                                      className: 'Mui-disabled'
                                    }}
                                    value={catalogSelected.name ?? ''}
                                    endAdornment={
                                      parentQuestion ? (
                                        <></>
                                      ) : (
                                        <InputAdornment position='end'>
                                          <IconButton
                                            aria-label='toggle password visibility'
                                            edge='end'
                                            onClick={cleanCatalog}
                                          >
                                            <DeleteOutline />
                                          </IconButton>
                                          &nbsp;
                                          <IconButton
                                            edge='end'
                                            onClick={() => {
                                              setOpenQuestionCatalogDialog(true)
                                            }}
                                          >
                                            <FolderIcon />
                                          </IconButton>
                                        </InputAdornment>
                                      )
                                    }
                                    label='Bộ Câu hỏi'
                                  />
                                </FormControl>
                                {errors.catalogId && (
                                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-catalogId'>
                                    {errors.catalogId.message}
                                  </FormHelperText>
                                )}
                              </Grid>

                              <Grid item xs={12} md={12}>
                                <FormControl fullWidth variant='outlined'>
                                  <InputLabel htmlFor='outlined-adornment-parent-category'>Danh mục câu hỏi</InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-parent-category'
                                    inputprops={{
                                      readOnly: true,
                                      className: 'Mui-disabled'
                                    }}
                                    value={categorySelected.name ?? ''}
                                    endAdornment={
                                      parentQuestion ? (
                                        <></>
                                      ) : (
                                        <InputAdornment position='end'>
                                          <IconButton edge='end' onClick={cleanCategory}>
                                            <DeleteOutline />
                                          </IconButton>
                                          &nbsp;
                                          <IconButton
                                            edge='end'
                                            onClick={() => {
                                              setOpenQuestionCategoryDialog(true)
                                            }}
                                          >
                                            <FolderIcon />
                                          </IconButton>
                                        </InputAdornment>
                                      )
                                    }
                                    label='Danh mục câu hỏi'
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                            <Grid container spacing={5}>
                              <Grid item xs={12}>
                                <br />
                                <Typography>
                                  <b>Nội dung</b>
                                </Typography>
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
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-content'>
                                      {errors.content.message}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              {currentQuestion.questionTypeId === QuestionType.FB && (
                                <Grid item md={12}>
                                  <Alert>Trả lời dạng [Đáp án đúng 1;Đáp án đúng 2;~Đáp án sai 1;~Đáp án sai 2]</Alert>
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
                                              <TableCell style={{ width: 40 }}></TableCell>
                                              <TableCell style={{ width: 90 }}>Thứ tự</TableCell>
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
                                                        style={{ width: 60 }}
                                                        onChange={event => {
                                                          handleChangeAnwser(anwser.id, 'position', event.target.value)
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
                                                            <LiteContentEditor
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
                            {currentQuestion.questionTypeId === QuestionType.FB && setting && (
                              <Grid container spacing={6}>
                                <Grid item md={6}>
                                  <FormControl fullWidth>
                                    <InputLabel htmlFor='payment-method'>Cấu hình hiển thị câu hỏi</InputLabel>
                                    <Select
                                      label='Cấu hình hiển thị câu hỏi'
                                      value={setting.controlType ?? -1}
                                      labelId='demo-simple-select-label'
                                      onChange={e => {
                                        let newSetting = { ...setting }
                                        newSetting.controlType = parseInt(e.target.value)
                                        setSetting({ ...newSetting })
                                      }}
                                      aria-describedby='validation-schema-group'
                                    >
                                      <MenuItem value={-1}>Chọn</MenuItem>
                                      <MenuItem value={0}>Textbox</MenuItem>
                                      <MenuItem value={1}>Dropdonwlist</MenuItem>
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
                                      value={setting.caseSensitive ?? -1}
                                      onChange={e => {
                                        let newSetting = { ...setting }
                                        newSetting.caseSensitive = parseInt(e.target.value)
                                        setSetting({ ...newSetting })
                                      }}
                                    >
                                      <MenuItem value={-1}>Chọn</MenuItem>
                                      <MenuItem value={0}>Đúng chính xác</MenuItem>
                                      <MenuItem value={1}>Không phân biệt chữ in, thường</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            )}
                          </form>
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
                                          <TableCell style={{ width: 100 }}>Thứ tự</TableCell>
                                          <TableCell style={{ width: 125 }}>Câu hỏi nhiễu</TableCell>
                                          <TableCell>Nội dung</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {subQuestions &&
                                          subQuestions.map((group, index) => {
                                            return (
                                              <>
                                                <TableRow
                                                  key={`group-${group.id}`}
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
                                                  <TableCell scope='row' component='th' style={{ textAlign: 'center' }}>
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
                                                  <TableCell scope='row' component='th' style={{ textAlign: 'center' }}>
                                                    <Checkbox
                                                      // value={group.isInterference}
                                                      checked={group.isInterference}
                                                      name={`chk-group-isInterference-${group.id}`}
                                                      onChange={event => {
                                                        handleChangeQuestionIsInterference(
                                                          group.id,
                                                          event.target.checked
                                                        )
                                                      }}
                                                    />
                                                  </TableCell>
                                                  <TableCell scope='row' component='th'>
                                                    <FormControl fullWidth>
                                                      <LiteContentEditor
                                                        content={group.answers[0].content ?? ''}
                                                        onChange={data =>
                                                          handleChangeAnswerContent(group.id, group.answers[0].id, data)
                                                        }
                                                      />
                                                      <FormHelperText
                                                        sx={{ color: 'error.main' }}
                                                        id='validation-schema-name'
                                                      >
                                                        {group.answers[0].errors?.message}
                                                      </FormHelperText>
                                                    </FormControl>
                                                    <Divider />
                                                    <FormControl fullWidth>
                                                      <LiteContentEditor
                                                        content={group.answers[1].content ?? ''}
                                                        onChange={data =>
                                                          handleChangeAnswerContent(group.id, group.answers[1].id, data)
                                                        }
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
                                          <TableCell padding='checkbox' colSpan={5} style={{ textAlign: 'center' }}>
                                            <Button
                                              key={`add-anwser-for-grouping-btn`}
                                              size='small'
                                              variant='contained'
                                              style={{ width: 250, margin: '20px' }}
                                              color='primary'
                                              startIcon={<Icon icon='mdi:plus' />}
                                              onClick={e => {
                                                e.preventDefault()
                                                addMatchingSubQuestion()
                                              }}
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
                        </>
                      </LoadingSpinner>
                    </div>
                  </div>
                </div>
              </Box>
            )}

            {openQuestionCatalogDialog && (
              <QuestionCatalogDialog
                onOk={catalog => {
                  setValue('catalogId', catalog.id)
                  setCatalogSelected(catalog)
                }}
                onClose={() => setOpenQuestionCatalogDialog(false)}
              />
            )}

            {openQuestionCategoryDialog && (
              <QuestionCategoryDialog
                open={openQuestionCategoryDialog}
                onClose={() => {
                  setOpenQuestionCategoryDialog(false)
                }}
                catalogId={catalogSelected?.id ?? 0}
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
