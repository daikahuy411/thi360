import {
  useEffect,
  useState
} from 'react'

import { QuestionCategoryApi } from 'api/catalog-api'
import TestGroupSectionApi from 'api/test-group-section-api'
import TestGroupSectionItemApi from 'api/test-group-section-item-api'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import QuestionCatalogSelector from 'pages/shared/question-catalog-selector'
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
  selectedTestGroupSectionItem,
  selectTestGroupSectionItem
} from 'store/slices/testGroupSectionItemSlice'
import { selectTestGroupSection } from 'store/slices/testGroupSectionSlice'
import * as yup from 'yup'

import CustomRadioBasic from '@core/components/custom-radio/basic'
import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import { yupResolver } from '@hookform/resolvers/yup'
import { mdilTag } from '@mdi/light-js'
import IconReact from '@mdi/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
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
  name: yup.string().required('* bắt buộc')
  //numberOfQuestion: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc') //depends on type
})

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

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

  const handleChangeItemType = prop => {
    setItemType(prop)
  }

  const moveItem = (from, to) => {
    var reOrderItems = [...selectedQuestions]
    var f = reOrderItems.splice(from, 1)[0]
    reOrderItems.splice(to, 0, f)
    setSelectedQuestions(reOrderItems)
  }

  const deleteItem = item => {
    var newItems = selectedQuestions.filter(x => x.id != item.id)
    setSelectedQuestions(newItems ? [...newItems] : [])
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

  const save = code => {
    const item = getValues()
    item.testGroupId = parseInt(testGroupId)
    item.testGroupSectionId = parseInt(sectionId)
    item.type = itemType
    item.questionCategory = {}
    item.questions = []
    if (itemType == 2) {
      item.value = selectedQuestions && selectedQuestions.length > 0 ? selectedQuestions.map(n => n.id).join(',') : ''
    } else if (itemType == 4 && selectedQuestionCategory && selectedQuestionCategory.id) {
      item.value = selectedQuestionCategory.id.toString()
    }

    new TestGroupSectionItemApi().save(item).then(response => {
      toast.success('Cập nhật thành công')

      if (code == 1) {
        router.query.itemId = response.data.id
        router.push(router)
      } else {
        reset()
      }

      dispatch(selectTestGroupSectionItem(response.data))
      new TestGroupSectionApi().get(sectionId).then(response => {
        dispatch(selectTestGroupSection(response.data))
      })
    })
  }

  const onCategoryOrQuestionsSelected = items => {
    if (itemType == 4) {
      // QuestionCategory: just only one Id of Category
      setLoading(true)
      QuestionCategoryApi.get(items).then(response => {
        setLoading(false)
        setSelectedQuestionCategory(response.data)
        setOpenQuestionCatalogSelector(false)
      })
    } else {
      var newSelectedQuestions = [...selectedQuestions]
      items.map(item => {
        if (!newSelectedQuestions.find(x => x.id == item.id)) {
          newSelectedQuestions.push(item)
        }
      })
      setSelectedQuestions(newSelectedQuestions ?? [])
      // toast.success('Cập nhật thành công')
      // setOpenQuestionCatalogSelector(false)
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
      setSelectedQuestions(currentTestGroupSectionItem.questions || [])
      setSelectedQuestionCategory({
        id: currentTestGroupSectionItem.questionCategory?.id,
        name: currentTestGroupSectionItem.questionCategory?.name
      })
    }
  }, [currentTestGroupSectionItem])

  /*
   * remove test-group-section-item
   */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (!itemId || itemId > 0) {
      new TestGroupSectionItemApi()
        .delete({ id: itemId })
        .then(response => {
          setLoading(true)
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')

          new TestGroupSectionApi().get(sectionId).then(response => {
            dispatch(selectTestGroupSection(response.data))
            setLoading(false)
            router.push(`/apps/test-group/${testGroupId}/sections/${sectionId}/items`)
          })
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
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
                        <IconButton aria-label='delete' onClick={handleClickOpenDelete}>
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
                    <Button disabled={!isValid} onClick={() => save(1)} variant='contained'>
                      Cập nhật
                    </Button>
                    {(!currentTestGroupSectionItem || currentTestGroupSectionItem.id == 0) && (
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
                  <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                    <form onSubmit={handleSubmit(save)} style={{ paddingTop: 10 }}>
                      <Grid container spacing={5}>
                        <Grid item md={8}>
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
                                  <FormControl fullWidth variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-parent-category'>
                                      Danh mục Câu hỏi
                                    </InputLabel>
                                    <OutlinedInput
                                      id='outlined-adornment-parent-category'
                                      inputprops={{
                                        readOnly: true,
                                        className: 'Mui-disabled'
                                      }}
                                      value={selectedQuestionCategory?.name ?? ''}
                                      endAdornment={
                                        <InputAdornment position='end'>
                                          <IconButton edge='end' onClick={() => setSelectedQuestionCategory(null)}>
                                            <DeleteOutline />
                                          </IconButton>
                                          &nbsp;
                                          <IconButton edge='end' onClick={() => setOpenQuestionCatalogSelector(true)}>
                                            <FolderIcon />
                                          </IconButton>
                                        </InputAdornment>
                                      }
                                      label='Danh mục Câu hỏi'
                                    />
                                  </FormControl>
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
                          </Grid>
                        </Grid>
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
                                          <TableCell align='center' style={{ width: 60 }}>
                                            #
                                          </TableCell>
                                          <TableCell align='center' style={{ width: 180 }}>
                                            Thao tác
                                          </TableCell>
                                          <TableCell style={{ width: 160 }}>Mã</TableCell>
                                          <TableCell>Nội dung</TableCell>
                                          <TableCell style={{ width: 210 }}>Bộ câu hỏi- Danh mục</TableCell>
                                          <TableCell style={{ width: 180 }}>Loại câu hỏi</TableCell>
                                          <TableCell style={{ width: 200 }}>Ngày tạo</TableCell>
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
                                              <TableCell align='center'>{index + 1}</TableCell>
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
                                                <IconButton onClick={() => deleteItem(row)}>
                                                  <Icon icon='mdi:trash' fontSize={20} />
                                                </IconButton>
                                              </TableCell>
                                              <TableCell component='th' scope='row'>
                                                <Typography variant='body1'>{row.id}</Typography>
                                              </TableCell>
                                              <TableCell component='th' scope='row'>
                                                <Typography variant='body1'>{row.shortContent}</Typography>
                                              </TableCell>
                                              <TableCell component='th' scope='row'>
                                                {row.catalog ? (
                                                  <Chip
                                                    icon={<IconReact path={mdilTag} title='Bộ Câu hỏi' size={1} />}
                                                    label={row.catalog.name}
                                                    style={{ marginBottom: 2 }}
                                                    color='secondary'
                                                    variant='outlined'
                                                  />
                                                ) : null}
                                                {row.category ? (
                                                  <Chip
                                                    icon={
                                                      <IconReact path={mdilTag} title='Danh mục Câu hỏi' size={1} />
                                                    }
                                                    label={row.category.name}
                                                    color='secondary'
                                                    variant='outlined'
                                                  />
                                                ) : null}
                                              </TableCell>
                                              <TableCell>
                                                <Typography variant='body1'>{row.questionTypeName}</Typography>
                                              </TableCell>
                                              <TableCell>
                                                <Typography variant='body1'>
                                                  {moment(row.createdTime).format('DD-MM-YYYY HH:mm')}
                                                </Typography>
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
                      </Grid>
                    </form>
                  </div>
                </div>
              </div>
            </Box>
          </>
        </div>
      </div>

      <QuestionCatalogSelector
        type={itemType}
        open={openQuestionCatalogSelector}
        onOk={items => {
          onCategoryOrQuestionsSelected(items)
        }}
        onClose={() => {
          setOpenQuestionCatalogSelector(false)
        }}
      />

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
            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Phần thi này không?
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
  )
}

export default ItemEditForm
