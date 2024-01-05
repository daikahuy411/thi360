import {
  useEffect,
  useState
} from 'react'

import { QuestionCategoryApi } from 'api/catalog-api'
import QuestionApi from 'api/question-api'
import { useRouter } from 'next/router'
import CatalogDialog from 'pages/shared/catalog-dialog'
import {
  Controller,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { CatalogType } from 'types/CatalogType'
import { QuestionType } from 'types/QuestionType'
import * as yup from 'yup'

import Icon from '@core/components/icon'
import { yupResolver } from '@hookform/resolvers/yup'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
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
import Typography from '@mui/material/Typography'

interface Props {
  isOpen: boolean
  onClose: any
  parentQuestionId: number
  questionId: number
  typeId: number
  typeName: string
}

const AddQuestionAnswer: React.FC<Props> = ({ isOpen, onClose, parentQuestionId, questionId, typeId, typeName }) => {
  let schema = yup.object().shape({
    name: yup.string().required('* bắt buộc'),
    content: yup.string().required('* bắt buộc')
  })

  const router = useRouter()
  const { questionCatalogId, type } = router.query
  const [currentQuestion, setCurrentQuestion] = useState<any>({
    id: 0,
    questionTypeId: typeId,
    name: '',
    content: '',
    explain: '',
    answers: []
  })
  const [anwser, setAnwser] = useState([])
  const [isValidAnswer, setIsValidAnswer] = useState(false)
  const [openCatalogDialog, setOpenCatalogDialog] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    unregister,
    formState: { isValid, errors }
  } = useForm({
    defaultValues: currentQuestion,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!questionId || questionId == 0) {
      return
    }
    fetchData(questionId)
  }, [questionId])

  useEffect(() => {
    if (typeId) {
      initQuestion(typeId)
    }
  }, [typeId])

  useEffect(() => {
    if (currentQuestion) reset(currentQuestion)
  }, [currentQuestion])

  const fetchData = (questionId: number) => {
    new QuestionApi().get(questionId).then(response => {
      let data = response.data
      setCurrentQuestion(data)
      setCategorySelected({ categoryId: response.data.categoryId, categoryName: response.data.categoryName })
      setAnwser(Object.values(data.answers))
    })
  }

  const onSubmit = data => {
    // new QuestionApi().save(data).then(response => {
    //   toast.success('Form Submitted')
    // })
  }

  useEffect(() => {
    checkIsvalidAnswer(true)
  }, [anwser])

  const initQuestion = (type: number) => {
    const item = new QuestionApi().createQuestion({ id: type })

    item.catalogId = Number(questionCatalogId)
    // setQuestionTypeName(item.questionTypeName)
    // dispatch(selectQuestion(item))
    setAnwser(item.answers)
  }

  /*
   * handle category
   */
  const [categorySelected, setCategorySelected] = useState({ categoryId: 0, categoryName: '' })
  const handleSelectedCategory = (selectedId: any) => {
    QuestionCategoryApi.get(selectedId).then(response => {
      if (response.data) {
        setCategorySelected({ categoryId: selectedId, categoryName: response.data.name })
        //   setItem({ ...item, categoryId: Number(selectedId) })
      }
    })
  }

  const cleanCategory = () => {
    setCategorySelected({ categoryId: 0, categoryName: '' })
  }
  /*
   * end handle category
   */

  const checkValidate = (id: number) => {
    let anwserArr = []
    anwser.forEach(element => {
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
    setAnwser([...anwserArr])

    checkIsvalidAnswer(true)
  }

  const checkIsvalidAnswer = (isFormField = false) => {
    let answers = [...anwser]
    let check = true
    answers.forEach(elm => {
      let content = getValues(`anws-content-${elm.id}`)
      if (!content) content = elm.content

      if (!content || content === '') {
        check = false
        return
      }
    })

    setIsValidAnswer(check)
  }

  const save = (code: number) => {
    const itemValue = getValues()
    let param = Object.assign({}, currentQuestion)
    param.parentId = parentQuestionId
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
      if (content) elm.content = content
    })
    param.answers = answerArr

    new QuestionApi()
      .save(param)
      .then(response => {
        toast.success('Cập nhật thành công')
        if (code == 1) {
          isOpen = false
          onClose()
        } else {
          reset()
          cleanCategory()
          //   initQuestion(type)
        }
      })
      .catch(e => {
        toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
      })
  }

  const addAnswer = () => {
    const newAnswer = new QuestionApi().createAnswer(-(anwser.length + 1), anwser.length + 1, '', false, {})
    anwser.push(newAnswer)
    setAnwser([...anwser])
  }

  const removeAnswer = (id: number) => {
    let answers = [...anwser]
    answers = answers.filter(x => x.id !== id)

    setAnwser(answers)
    unregister(`anws-content-${id}`)
  }

  const handleChangeAnwser = (id, field, checked = false) => {
    let anwserArr = []
    anwser.forEach(element => {
      anwserArr.push(Object.assign({}, element))
    })

    anwserArr.map(x => {
      if (field === 'content') {
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
    setAnwser([...anwserArr])
  }

  return (
    <Drawer
      open={isOpen}
      anchor='right'
      variant='temporary'
      style={{ overflowY: 'unset' }}
      PaperProps={{
        sx: {
          width: 740
        }
      }}
    >
      <>
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(3.5, 5),
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            marginBottom: 2
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, fontSize: 18, textTransform: 'uppercase' }}>
            Thêm câu hỏi con
          </Typography>
          <IconButton
            onClick={() => onClose()}
            sx={{
              right: 20,
              top: '50%',
              position: 'absolute',
              color: 'text.secondary',
              transform: 'translateY(-50%)'
            }}
          >
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
        <Grid container>
          <Grid
            item
            md={12}
            alignContent={'right'}
            alignItems={'right'}
            style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}
          >
            <Button
              color='primary'
              type='submit'
              variant='contained'
              onClick={() => save(1)}
              disabled={!isValid || !isValidAnswer}
            >
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
          </Grid>
          <Grid item md={12} style={{ width: 360 }}>
            <Divider />
            <div style={{ padding: '10px', overflowY: 'scroll', height: `calc(100vh - 130px)` }}>
              <Grid container spacing={5} style={{ paddingBottom: '20px' }}>
                <Grid item xs={12}>
                  <b>
                    Loại câu hỏi:{' '}
                    <Chip
                      icon={<Icon icon='mdi:category' />}
                      label={typeName}
                      color='info'
                      variant='outlined'
                      className='chip-square'
                    />
                  </b>
                </Grid>
              </Grid>
              <form onSubmit={handleSubmit(onSubmit)} style={{ height: 'auto', width: '100%', paddingTop: 10 }}>
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
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'></FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant='outlined'>
                      <InputLabel htmlFor='outlined-adornment-parent-category'>Danh mục câu hỏi</InputLabel>
                      <OutlinedInput
                        id='outlined-adornment-parent-category'
                        inputProps={{
                          readOnly: true,
                          className: 'Mui-disabled'
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
                          {/* {errors.content.message} */}
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

                {currentQuestion.questionTypeId !== QuestionType.SA &&
                  currentQuestion.questionTypeId !== QuestionType.GQ && (
                    <>
                      <Grid container spacing={5} style={{ paddingBottom: '20px', paddingTop: '10px' }}>
                        <Grid item xs={12}>
                          <Divider textAlign='left'>
                            {' '}
                            <b>Đáp án </b>
                          </Divider>
                        </Grid>
                      </Grid>
                      <Grid container spacing={5} style={{ paddingBottom: '20px' }}>
                        <Grid item xs={12}>
                          <TableContainer component={Paper} style={{ marginTop: 5 }} className='answer-table'>
                            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                              <TableHead>
                                <TableRow>
                                  <TableCell padding='checkbox'>#</TableCell>
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
                                        <TableCell scope='row' style={{ textAlign: 'center' }}>
                                          {currentQuestion.questionTypeId === QuestionType.MC && (
                                            <Checkbox
                                              checked={anwser.isCorrect}
                                              value={anwser.isCorrect}
                                              name={`chk-ans-content-${anwser.id}`}
                                              onChange={event => {
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
                                              onChange={event => {
                                                handleChangeAnwser(anwser.id, '')
                                              }}
                                            />
                                          )}
                                        </TableCell>
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
                                                  disabled={
                                                    currentQuestion.questionTypeId == QuestionType.TF ? true : false
                                                  }
                                                  value={value ?? anwser.content ?? ''}
                                                  label='Nội dung'
                                                  InputLabelProps={{ shrink: true }}
                                                  required
                                                  onChange={value => {
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
                                                <IconButton
                                                  aria-label='Xóa đáp án'
                                                  onClick={() => removeAnswer(anwser.id)}
                                                >
                                                  <DeleteIcon color='warning' />
                                                </IconButton>
                                              </span>
                                            </Tooltip>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}

                                {currentQuestion && currentQuestion.questionTypeId !== QuestionType.TF && (
                                  <TableRow key={`add-anwser`}>
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
              </form>
            </div>
          </Grid>
        </Grid>

        {openCatalogDialog && (
          <CatalogDialog
            categoryType={CatalogType.QUESTION_CATEGORY}
            open={openCatalogDialog}
            onClose={() => {
              setOpenCatalogDialog(false)
            }}
            onNodeSelected={(nodeId: any) => {
              handleSelectedCategory(nodeId)
            }}
          />
        )}
      </>
    </Drawer>
  )
}

export default AddQuestionAnswer
