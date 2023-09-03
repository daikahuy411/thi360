import {
  useEffect,
  useState
} from 'react'

import TestGroupSectionItemApi from 'api/test-group-section-item-api'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import QuestionCatalogSelector from 'pages/shared/question-catalog-selector'
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
  selectedTestGroupSectionItem,
  selectTestGroupSectionItem
} from 'store/slices/testGroupSectionItemSlice'
import * as yup from 'yup'

import CustomRadioBasic from '@core/components/custom-radio/basic'
import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import TopNav from '../_layout/_breadcrums'

const itemTypes = [
  {
    title: 'Chọn Câu hỏi ngẫu nhiên',
    value: 4,
    isSelected: true,
    content: 'Chọn câu hỏi ngẫu nhiên từ Danh mục câu hỏi'
  },
  {
    title: 'Chọn Câu hỏi trực tiếp',
    value: 2,
    content: 'Chọn Câu hỏi trực tiếp từ Ngân hàng câu hỏi.'
  }
]

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc'),
  //numberOfQuestion: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc') //depends on type
})

const ItemEditForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { sectionId, testGroupId, itemId } = router.query
  const currentTestGroupSectionItem = useSelector(selectedTestGroupSectionItem)
  const [openQuestionCatalogSelector, setOpenQuestionCatalogSelector] = useState(false)
  const [itemType, setItemType] = useState(itemTypes[0].value)
  const [selectedQuestionCategory, setSelectedQuestionCategory] = useState(null)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  const [selected, setSelected] = useState([])
  const isSelected = name => selected.indexOf(name) !== -1

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.id)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleSelectClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleChangeItemType = prop => {
    setItemType(prop)
  }

  const moveItem = (from, to) => {
    var reOrderItems = [...currentTestGroupSectionItem.questions]
    var f = reOrderItems.splice(from, 1)[0]
    reOrderItems.splice(to, 0, f)
    currentTestGroupSectionItem.questions = reOrderItems
  }

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentTestGroupSectionItem: currentTestGroupSectionItem,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const save = () => {
    const item = getValues()
    item.TestGroupId = testGroupId
    item.TestGroupSectionId = sectionId
    item.Type = itemType
    if (itemType == 2) {
      item.value = selectedQuestions.map(n => n.id).join(',')
    } else if (itemType == 4) {
      item.value = selectedQuestionCategory.key
    }
    new TestGroupSectionItemApi().save(item).then(response => {
      toast.success('Cập nhật thành công')
    })
  }

  const onCategoryOrQuestionsSelected = items => {
    if (itemType == 4) {
      setSelectedQuestionCategory(items)
      setOpenQuestionCatalogSelector(false)
    } else {
      var newSelectedQuestions = selectedQuestions || []
      setSelectedQuestions(newSelectedQuestions.concat(items))
      setOpenQuestionCatalogSelector(false)
    }
  }

  useEffect(() => {
    if (!itemId || itemId == 0) {
      dispatch(selectTestGroupSectionItem({ id: 0, name: '', type: 4, numberOfQuestion: 0, description: '' }))
      return
    }
    setLoading(true)
    new TestGroupSectionItemApi().get(itemId).then(response => {
      dispatch(selectTestGroupSectionItem(response.data))
      setLoading(false)
    })
  }, [itemId])

  useEffect(() => {
    if (currentTestGroupSectionItem) {
      reset(currentTestGroupSectionItem)
      setItemType(currentTestGroupSectionItem.type)
      setSelectedQuestions(currentTestGroupSectionItem.questions)
      setSelectedQuestionCategory({
        key: currentTestGroupSectionItem.questionCategory?.id,
        title: currentTestGroupSectionItem.questionCategory?.name
      })
    }
  }, [currentTestGroupSectionItem])

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
                      {currentTestGroupSectionItem && currentTestGroupSectionItem.id > 0 && (
                        <span>{currentTestGroupSectionItem.name}</span>
                      )}
                      {(!currentTestGroupSectionItem || currentTestGroupSectionItem.id == 0) && (
                        <span>Tạo mới Cấu hình</span>
                      )}
                    </span>
                    {currentTestGroupSectionItem && currentTestGroupSectionItem.id > 0 && (
                      <EntityInfoModal entity={currentTestGroupSectionItem} />
                    )}
                  </h3>
                  <span className='right'>
                    {currentTestGroupSectionItem && currentTestGroupSectionItem.id > 0 && (
                      <>
                        <IconButton aria-label='delete'>
                          <DeleteIcon />
                        </IconButton>
                        &nbsp;
                      </>
                    )}
                    <Button
                      variant='outlined'
                      component={Link}
                      href={`/apps/test-group/${testGroupId}/sections/${sectionId}/items/`}
                    >
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                    &nbsp;
                    <Button disabled={!isValid} onClick={save} variant='contained'>
                      Cập nhật
                    </Button>
                    {(!currentTestGroupSectionItem || currentTestGroupSectionItem.id == 0) && (
                      <>
                        &nbsp;
                        <Button disabled={!isValid} variant='contained'>
                          Cập nhật &amp; Thêm mới
                        </Button>
                      </>
                    )}
                  </span>
                </div>
                <div className='grid-block'>
                  <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                    <form onSubmit={handleSubmit(save)} style={{ paddingTop: 10 }}>
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
                                  autoComplete='false'
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
                          <Grid container spacing={4}>
                            {currentTestGroupSectionItem &&
                              itemTypes.map((item, index) => (
                                <CustomRadioBasic
                                  disabled={currentTestGroupSectionItem.id != 0}
                                  key={index}
                                  data={itemTypes[index]}
                                  selected={itemType}
                                  name='custom-radios-basic'
                                  handleChange={handleChangeItemType}
                                  gridProps={{ sm: 6, xs: 12 }}
                                />
                              ))}
                          </Grid>
                        </Grid>
                        {itemType == 4 && (
                          <>
                            <Grid item xs={12}>
                              <Button
                                size='small'
                                variant='contained'
                                style={{ width: 250 }}
                                color='primary'
                                startIcon={<Icon icon='mdi:plus' />}
                                onClick={() => setOpenQuestionCatalogSelector(true)}
                              >
                                Chọn Danh mục câu hỏi
                              </Button>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                value={selectedQuestionCategory?.title}
                                label='Danh mục câu hỏi'
                                InputLabelProps={{ shrink: true }}
                                required
                                aria-describedby='validation-schema-name'
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <Controller
                                  name='numberOfQuestion'
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field: { value, onChange } }) => (
                                    <TextField
                                      value={value}
                                      label='Số câu hỏi'
                                      InputLabelProps={{ shrink: true }}
                                      required
                                      onChange={onChange}
                                      error={Boolean(errors.numberOfQuestion)}
                                      aria-describedby='validation-schema-name'
                                    />
                                  )}
                                />
                                {errors.numberOfQuestion && (
                                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                                    {errors.numberOfQuestion.message}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                          </>
                        )}
                        {itemType == 2 && (
                          <>
                            <Grid item xs={12}>
                              <Button
                                size='small'
                                variant='contained'
                                style={{ width: 250 }}
                                color='primary'
                                startIcon={<Icon icon='mdi:plus' />}
                                onClick={() => setOpenQuestionCatalogSelector(true)}
                              >
                                Chọn Ngân hàng câu hỏi
                              </Button>
                            </Grid>
                            <Grid item xs={12}>
                              <TableContainer fullWidth component={Paper} style={{ marginTop: 5 }}>
                                <LoadingSpinner active={loading}>
                                  {selectedQuestions && (
                                    <Table aria-label='simple table'>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell padding='checkbox'>
                                            <Checkbox
                                              onChange={handleSelectAllClick}
                                              checked={
                                                selectedQuestions.length > 0 &&
                                                selected.length === selectedQuestions.length
                                              }
                                              indeterminate={
                                                selected.length > 0 && selected.length < selectedQuestions.length
                                              }
                                              inputProps={{ 'aria-label': 'select all desserts' }}
                                            />
                                          </TableCell>
                                          <TableCell align='center' style={{ width: 180 }}>
                                            Sửa
                                          </TableCell>
                                          <TableCell style={{ width: 160 }}>Mã</TableCell>
                                          <TableCell>Nội dung</TableCell>
                                          <TableCell style={{ width: 180 }}>Bộ câu hỏi</TableCell>
                                          <TableCell style={{ width: 180 }}>Danh mục</TableCell>
                                          <TableCell style={{ width: 180 }}>Loại câu hỏi</TableCell>
                                          <TableCell style={{ width: 180 }}>Ngày tạo</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {selectedQuestions.map((row, index) => {
                                          const isItemSelected = isSelected(row.id)
                                          const labelId = `enhanced-table-checkbox-${index}`

                                          return (
                                            <TableRow
                                              hover
                                              tabIndex={-1}
                                              role='checkbox'
                                              key={row.id}
                                              selected={isItemSelected}
                                              aria-checked={isItemSelected}
                                              sx={{
                                                '&:last-of-type td, &:last-of-type th': {
                                                  border: 0
                                                }
                                              }}
                                            >
                                              <TableCell padding='checkbox'>
                                                <Checkbox
                                                  checked={isItemSelected}
                                                  inputProps={{ 'aria-labelledby': labelId }}
                                                  onClick={event => handleSelectClick(event, row.id)}
                                                />
                                              </TableCell>
                                              <TableCell component='th' scope='row' align='right'>
                                                {index > 0 && (
                                                  <IconButton onClick={() => moveItem(index, index - 1)}>
                                                    <Icon icon='mdi:arrow-up' fontSize={20} />
                                                  </IconButton>
                                                )}
                                                {index !== selectedQuestions.length - 1 && (
                                                  <IconButton onClick={() => moveItem(index, index + 1)}>
                                                    <Icon icon='mdi:arrow-down' fontSize={20} />
                                                  </IconButton>
                                                )}
                                                <IconButton
                                                  component={Link}
                                                  href={`/apps/question-catalog/${row.catalogId}/questions/${row.id}`}
                                                >
                                                  <Icon icon='mdi:eye-outline' fontSize={20} />
                                                </IconButton>
                                                <IconButton onClick={() => moveItem(index, index + 1)}>
                                                  <Icon icon='mdi:trash' fontSize={20} />
                                                </IconButton>
                                              </TableCell>
                                              <TableCell component='th' scope='row'>
                                                <Typography variant='body1'>{row.id}</Typography>
                                              </TableCell>
                                              <TableCell component='th' scope='row'>
                                                {row.shortContent}
                                              </TableCell>
                                              <TableCell component='th' scope='row'>
                                                {row.catalogName}
                                              </TableCell>
                                              <TableCell>
                                                {row.categoryName ? (
                                                  <Chip
                                                    icon={<Icon icon='mdi:tag' />}
                                                    label={row.categoryName}
                                                    color='secondary'
                                                    variant='outlined'
                                                  />
                                                ) : null}
                                              </TableCell>
                                              <TableCell>{row.questionTypeName}</TableCell>
                                              <TableCell>
                                                {moment(row.createdTime).format('DD-MM-YYYY HH:mm')}
                                              </TableCell>
                                            </TableRow>
                                          )
                                        })}
                                      </TableBody>
                                    </Table>
                                  )}
                                </LoadingSpinner>
                              </TableContainer>
                            </Grid>
                          </>
                        )}
                        <Grid item>
                          {openQuestionCatalogSelector && (
                            <QuestionCatalogSelector
                              type={itemType}
                              onOk={items => {
                                onCategoryOrQuestionsSelected(items)
                              }}
                              onClose={() => {
                                setOpenQuestionCatalogSelector(false)
                              }}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </div>
              </div>
            </Box>
          </>
        </div>
      </div>
    </>
  )
}

export default ItemEditForm
