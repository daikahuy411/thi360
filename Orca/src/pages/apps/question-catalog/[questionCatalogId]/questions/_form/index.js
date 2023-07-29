import {
  Fragment,
  useEffect,
  useState
} from 'react'

import { QuestionCategoryApi } from 'api/catalog-api'
import QuestionApi from 'api/question-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CatalogDialog from 'pages/shared/catalog'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import CircularLoading from 'pages/shared/loading/CircularLoading'
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
// // ** Icon Imports
// import Icon from 'src/@core/components/icon'
// // ** Custom Components Imports
// import OptionsMenu from 'src/@core/components/option-menu'
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
import EditIcon from '@mui/icons-material/Edit'
import FolderIcon from '@mui/icons-material/FolderOpen'
import {
  Button,
  Divider,
  Input
} from '@mui/material'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
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
// import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
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
import styles from './question-form.module.scss'

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
  const [anchorEl, setAnchorEl] = useState(null)
  const [lsQuestionTypes, setLsQuestionTypes] = useState(null)
  const [questionTypeName, setQuestionTypeName] = useState('');
  const [openCatalogDialog, setOpenCatalogDialog] = useState(false)
  const [openAddQuestionAnswer, setOpenAddQuestionAnswer] = useState(false)
  const [isValidAnswer, setIsValidAnswer] = useState(false)
  const [isloadingQuestion, setIsLoadingQuestion] = useState(false)

  let schema = yup.object().shape({
    name: yup.string().required('* bắt buộc'),
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

  const fetchData = (questionId) => {
    if (type === QuestionType.GQ) {
      setIsLoadingQuestion(true)
    }
    new QuestionApi().get(questionId)
      .then(response => {
        let data = response.data
        dispatch(selectQuestion(data))
        setQuestionTypeName(data.questionTypeName)

        setCategorySelected({ categoryId: response.data.categoryId, categoryName: response.data.categoryName })

        setAnwser(Object.values(data.answers))
        setIsLoadingQuestion(false)
      })
  }

  const getAllQuestionTypes = () => {
    new QuestionApi().getQuestionTypes().then(response => {
      setLsQuestionTypes(response.data)
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
  }

  useEffect(() => {
    if (currentQuestion) reset(currentQuestion)
  }, [currentQuestion])

  const checkValidate = (id) => {
    let anwserArr = []
    anwser.forEach(element => {
      anwserArr.push(Object.assign({}, element))
    })

    anwserArr.map((x) => {
      if (x.id == id) {
        if (!getValues(`anws-content-${x.id}`)) {
          let errorObj = {
            isError: true,
            message: "* Bắt buộc"
          }
          x.errors = errorObj
        } else {
          let errorObj = {
            isError: false,
            message: ""
          }
          x.errors = errorObj
        }
      }
    })
    setAnwser([...anwserArr])
    checkIsvalidAnswer(true)
  }

  const checkIsvalidAnswer = (isFormField = false) => {
    let answers = [...anwser]
    let check = true
    answers.forEach(elm => {
      let content = getValues(`anws-content-${elm.id}`)
      if (!content)
        content = elm.content

      if (!content || content === '') {
        check = false
        return
      }
    })

    setIsValidAnswer(check)
  }

  const save = (code) => {
    const itemValue = getValues()
    let param = Object.assign({}, currentQuestion)
    param.name = itemValue.name
    param.content = itemValue.content
    param.explain = itemValue.explain
    param.categoryId = categorySelected.categoryId

    let answerArr = []
    anwser.forEach(elm => {
      answerArr.push(Object.assign({}, elm))
    })

    answerArr.forEach(elm => {
      const content = getValues(`anws-content-${elm.id}`)
      if (content)
        elm.content = content

    })
    param.answers = answerArr

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

  useEffect(() => {
    checkIsvalidAnswer(true)
  }, [anwser])

  const addAnswer = () => {
    const newAnswer = new QuestionApi().createAnswer(
      -(anwser.length + 1),
      anwser.length + 1,
      "",
      false,
      {
        isError: false,
        message: ""
      }
    )

    anwser.push(newAnswer)
    setAnwser([...anwser])
  }

  const removeAnswer = (id) => {
    let answers = [...anwser]
    answers = answers.filter((x) => x.id !== id)

    setAnwser(answers)
    unregister(`anws-content-${id}`)
  }

  const handleChangeAnwser = (id, field, checked = false) => {
    let anwserArr = []
    anwser.forEach(element => {
      anwserArr.push(Object.assign({}, element))
    });

    anwserArr.map((x) => {
      if (field === 'content') {

      } if (field === 'position') {
        if (x.id == id) {
          x.order = Number(checked)
        }
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
  }

  /*
  * handle remove question-answer
  */
  const [openDelete, setOpenDelete] = useState(false);
  const [typeDelete, setTypeDelete] = useState(1);
  const handleClickOpenDelete = (typeDelete) => {
    setTypeDelete(typeDelete)
    setOpenDelete(true)
  };
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

  const handleDeleteChildQuestion = () => {
    if (!childQuestionSelected || childQuestionSelected.id > 0) {
      new QuestionApi().delete({ id: childQuestionSelected.id })
        .then((response) => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          fetchData(questionId)
        })
        .catch((e) => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }
  /*
  * handle remove question-answer
  */

  const open = Boolean(anchorEl)
  const handleChildQuestionClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const [childQuestionSelected, setChildQuestionSelected] = useState(null);
  const handleShowFormChildQuestion = (itemQuestionType, itemQuestion, isAddNew = true) => {
    setAnchorEl(null)
    setOpenAddQuestionAnswer(true)
    if (isAddNew) {
      setChildQuestionSelected({ questionId: 0, typeId: itemQuestionType.typeId, name: itemQuestionType.name })
    } else {
      setChildQuestionSelected({ questionId: itemQuestion.id, typeId: itemQuestion.questionTypeId, name: itemQuestion.questionTypeName })
    }
  }


  const [anchorElChildQuestion, setAnchorElChildQuestion] = useState(null)
  const handleClickChildQuestion = event => {
    setAnchorElChildQuestion(event.currentTarget)
  }

  const handleCloseChildQuestion = () => {
    setAnchorElChildQuestion(null)
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
                              <IconButton aria-label='Xóa câu hỏi' onClick={() => handleClickOpenDelete(1)}>
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
                      <Button disabled={!isValid || !isValidAnswer} onClick={() => save(1)} variant='contained'>
                        Cập nhật
                      </Button>
                      {(!currentQuestion || currentQuestion.id == 0) && (
                        <>
                          &nbsp;
                          <Button disabled={(!isValid || !isValidAnswer)} onClick={() => save(2)} variant='contained'>
                            Cập nhật &amp; Thêm mới
                          </Button>
                        </>
                      )}
                    </span>
                  </div>
                  <div className='grid-block'>
                    <Nav />
                    <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                      {isloadingQuestion && (
                        <Box sx={{ width: '100%', paddingTop: '50px' }}>
                            <div className=''>
                              <CircularLoading />
                            </div>
                          </Box>
                      )}
                      {!isloadingQuestion && (
                        <form onSubmit={handleSubmit(onSubmit)} style={{ height: 'auto', width: '100%', paddingTop: 10 }}>
                          <Grid container spacing={5} style={{ paddingBottom: '20px' }}>
                            <Grid item xs={12}>
                              <b>Loại câu hỏi: <Chip icon={<Icon icon='mdi:category' />} label={questionTypeName} color="info" variant="outlined" className='chip-square' /></b>
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
                          {(currentQuestion.questionTypeId !== QuestionType.SA && currentQuestion.questionTypeId !== QuestionType.GQ) && (
                            <>
                              <Grid container spacing={5} style={{ paddingBottom: '20px', paddingTop: '10px' }}>
                                <Grid item xs={12}>
                                  <Divider variant='left' textAlign='left'> <b>Đáp án </b></Divider>
                                </Grid>
                              </Grid>
                              <Grid container spacing={5} style={{ paddingBottom: '20px' }}>
                                <Grid item xs={12}>
                                  {currentQuestion.questionTypeId === QuestionType.ORDER && (
                                    <Alert severity="info"><strong>Lưu ý!</strong> Thứ tự đáp án đúng phải được sắp xếp theo thứ tự từ trên xuống dưới.</Alert>
                                  )}
                                  <TableContainer component={Paper} style={{ marginTop: 5 }} className=''>
                                    <Table sx={{ minWidth: 650 }} aria-label='simple table' className={styles.answer_table}>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell padding='checkbox'>
                                            #
                                          </TableCell>
                                          {currentQuestion.questionTypeId !== QuestionType.ORDER && (
                                            <TableCell style={{ width: 120 }}>Đáp án đúng</TableCell>
                                          )}
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
                                                {currentQuestion.questionTypeId !== QuestionType.ORDER && (
                                                  <TableCell scope='row' style={{ textAlign: 'center' }}>
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
                                                    {(currentQuestion.questionTypeId === QuestionType.FB) && (
                                                      <Input
                                                        type='number'
                                                        name={`ans-order-${anwser.id}`}
                                                        value={anwser.order}
                                                        onChange={(event) => {
                                                          handleChangeAnwser(anwser.id, 'position', event.target.value)
                                                        }}
                                                      />
                                                    )}
                                                  </TableCell>
                                                )}
                                                <TableCell scope='row'>
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
                                                          onChange={(value) => {
                                                            onChange(value)
                                                            checkValidate(anwser.id)
                                                          }}
                                                          error={Boolean(anwser.errors?.isError)}
                                                          aria-describedby='validation-schema-name'
                                                        />
                                                      )}
                                                    />

                                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                                      {anwser.errors?.message}
                                                    </FormHelperText>
                                                  </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                  {currentQuestion.questionTypeId !== QuestionType.TF && (
                                                    <Tooltip title='Xóa đáp án'>
                                                      <span>
                                                        <IconButton aria-label='Xóa đáp án' onClick={() => removeAnswer(anwser.id)}>
                                                          <DeleteIcon color='warning' />
                                                        </IconButton>
                                                      </span>
                                                    </Tooltip>
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
                            </>
                          )}
                          {currentQuestion.questionTypeId === QuestionType.GQ && (
                            <>
                              <Grid container spacing={5} style={{ paddingBottom: '20px', paddingTop: '10px' }}>
                                <Grid item xs={12}>
                                  <Divider variant='left' textAlign='left'> <b>Câu hỏi con {currentQuestion.children.length > 0 ? `(${currentQuestion.children.length})` : ''}</b></Divider>
                                </Grid>
                              </Grid>
                              {(!questionId || questionId == 0) && (
                                <Grid container spacing={5} style={{ paddingBottom: '20px', paddingTop: '10px' }}>
                                  <Grid item xs={12}>
                                    <div className='box-noted'>
                                      <span className="text-muted">
                                        Cập nhật câu hỏi chính trước khi thêm/ sửa câu hỏi phụ.
                                      </span>
                                    </div>
                                  </Grid>
                                </Grid>
                              )}
                              {(questionId > 0) && (
                                <Grid container spacing={5} style={{ paddingBottom: '20px', paddingTop: '10px' }}>
                                  <Grid item xs={12}>
                                    <Fragment>
                                      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                        <Tooltip title="Thêm câu hỏi con vào câu hỏi chính phụ">
                                          <Button
                                            variant='outlined'
                                            style={{ width: 250, margin: '20px' }}
                                            color='success'
                                            startIcon={<Icon icon='mdi:plus' />}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleChildQuestionClick}
                                          >
                                            Thêm câu hỏi con
                                          </Button>
                                        </Tooltip>
                                      </Box>
                                      {lsQuestionTypes && (
                                        <Menu
                                          anchorEl={anchorEl}
                                          id="account-menu"
                                          open={open}
                                          onClose={() => handleShowFormChildQuestion(null)}
                                          // onClick={handleClose}
                                          PaperProps={{
                                            elevation: 0,
                                            sx: {
                                              overflow: 'visible',
                                              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                              mt: 1.5,
                                              '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                              },
                                              '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                              },
                                            },
                                          }}
                                          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                          {lsQuestionTypes.map(item => (
                                            <MenuItem key={item.id} onClick={() => handleShowFormChildQuestion(item, null, true)}>
                                              {item.name}
                                            </MenuItem>
                                          ))}
                                        </Menu>
                                      )}
                                    </Fragment>
                                  </Grid>


                                  {(currentQuestion.children || []) && currentQuestion.children.map((item) => {

                                    return (
                                      <Grid item xs={12} md={6} lg={4} key={item.id}>
                                        <Card>
                                          <CardHeader
                                            title={
                                              <>
                                                <Chip icon={<Icon icon='mdi:category' />} label={item.questionTypeName} color="info" variant="outlined" className='chip-square' />
                                              </>
                                            }
                                            action={
                                              <>
                                                <IconButton
                                                  aria-label='filter'
                                                  onClick={() => {
                                                    handleCloseChildQuestion()
                                                    setChildQuestionSelected(item)
                                                    handleClickOpenDelete(2)
                                                  }}
                                                >
                                                  <Icon icon='mdi:delete-outline' />
                                                </IconButton>
                                                <IconButton
                                                  aria-label='filter'
                                                  onClick={e => {
                                                    handleCloseChildQuestion()
                                                    setChildQuestionSelected(item)
                                                    handleShowFormChildQuestion(null, item, false)
                                                  }}
                                                >
                                                  <EditIcon />
                                                </IconButton>

                                                {/* <IconButton aria-haspopup='true' onClick={handleClickChildQuestion}>
                                                <Icon icon='mdi:dots-vertical' />
                                              </IconButton> */}
                                                {/* <Menu
                                                keepMounted
                                                anchorEl={anchorElChildQuestion}
                                                onClose={handleCloseChildQuestion}
                                                open={Boolean(anchorElChildQuestion)}
                                              >
                                                <MenuItem
                                                  key={1}
                                                  onClick={e => {
                                                    handleCloseChildQuestion()
                                                    setChildQuestionSelected(item)
                                                    handleShowFormChildQuestion(null, item, false)
                                                  }}
                                                >
                                                  <IconButton
                                                    aria-label='filter'
                                                  >
                                                    <EditIcon />
                                                  </IconButton>
                                                  Sửa câu hỏi
                                                </MenuItem>
                                                <MenuItem
                                                  key={2}
                                                  onClick={(e, item) => {
                                                    handleCloseChildQuestion()
                                                    setChildQuestionSelected(item)
                                                    handleClickOpenDelete(2)
                                                  }}
                                                >
                                                  <IconButton
                                                    aria-label='filter'
                                                  >
                                                    <Icon icon='mdi:delete-outline' />
                                                  </IconButton>
                                                  Xóa câu hỏi <br /> {item.name}
                                                </MenuItem>
                                              </Menu> */}
                                              </>
                                            }
                                          />
                                          <CardContent>
                                            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>{item.name}</Typography>
                                            <Typography variant='body2' sx={{ fontSize: '0.75rem', letterSpacing: '0.4px', minHeight: '40px' }}>
                                              {item.shortContent}
                                            </Typography>
                                            <Typography sx={{ mt: 4.5, mb: 2, fontWeight: 600, fontSize: '0.875rem' }}>Phân loại</Typography>
                                            <Box
                                              sx={{
                                                mt: 4,
                                                borderRadius: '4px',
                                                color: 'text.primary',
                                                p: theme => theme.spacing(2.25, 2.75),
                                                backgroundColor: 'aliceblue'
                                              }}
                                            >
                                              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Avatar
                                                  variant='rounded'
                                                  sx={{
                                                    mr: 3,
                                                    width: '2.625rem',
                                                    height: '2.625rem',
                                                    backgroundColor: 'transparent',
                                                    border: theme => `1px solid ${theme.palette.primary.main}`
                                                  }}
                                                >
                                                  <img width={23} height={20} alt='briefcase' src='/images/cards/briefcase.png' />
                                                </Avatar>

                                                <Box
                                                  sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                  }}
                                                >
                                                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>Danh mục</Typography>
                                                    <Typography variant='caption'>{item.categoryName}</Typography>
                                                  </Box>
                                                  {/* <Box sx={{ display: 'flex' }}>
                                                  <Typography
                                                    component='sup'
                                                    variant='caption'
                                                    sx={{ mt: 0.75, fontWeight: 500, color: 'text.primary', alignSelf: 'flex-start' }}
                                                  >
                                                    $
                                                  </Typography>
                                                  <Typography variant='h5' sx={{ fontWeight: 600 }}>
                                                    5,250
                                                  </Typography>
                                                  <Typography component='sub' variant='caption' sx={{ lineHeight: 1.5, alignSelf: 'flex-end' }}>
                                                    /Year
                                                  </Typography>
                                                </Box> */}
                                                </Box>
                                              </Box>
                                            </Box>

                                            {/* <Typography sx={{ mt: 4.5, mb: 2, fontWeight: 600, fontSize: '0.875rem' }}>Phân loại</Typography>

                                          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                              <img width={42} height={30} alt='master-card' src='/images/cards/logo-mastercard-small.png' />
                                              <Box
                                                sx={{
                                                  ml: 3,
                                                  flexGrow: 1,
                                                  display: 'flex',
                                                  flexWrap: 'wrap',
                                                  alignItems: 'center',
                                                  justifyContent: 'space-between'
                                                }}
                                              >
                                                <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                                                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>Danh mục</Typography>
                                                  <Typography variant='caption'>{item.categoryName}</Typography>
                                                </Box>
                                              </Box>
                                            </Box>

                                            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                              <img width={42} height={30} alt='credit-card' src='/images/cards/logo-credit-card-2.png' />
                                              <Box
                                                sx={{
                                                  ml: 3,
                                                  flexGrow: 1,
                                                  display: 'flex',
                                                  flexWrap: 'wrap',
                                                  alignItems: 'center',
                                                  justifyContent: 'space-between'
                                                }}
                                              >
                                                <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                                                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>Credit card</Typography>
                                                  <Typography variant='caption'>8990 xxxx xxxx 6852</Typography>
                                                </Box>
                                              </Box>
                                            </Box>
                                          </Box> */}
                                          </CardContent>
                                        </Card>
                                      </Grid>
                                    )
                                  })}

                                </Grid>
                              )}
                            </>
                          )}
                        </form>
                      )}
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
                <Button autoFocus onClick={() => {
                  handleCloseDelete()
                  setChildQuestionSelected(null)
                }}>
                  Hủy bỏ
                </Button>
                {typeDelete === 1 && (
                  <Button onClick={handleDelete} color='error'>Đồng ý</Button>
                )}
                {typeDelete === 2 && (
                  <Button onClick={handleDeleteChildQuestion} color='error'>Đồng ý</Button>
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
