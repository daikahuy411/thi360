import { useEffect, useState } from 'react'

import OrganizationApi from 'api/organization-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import QuestionCatalogSelector from 'pages/shared/question-catalog-selector'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { selectedClass } from 'store/slices/examCategorySlice'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'

import TopNav from '../_layout/_breadcrums'

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc'),
  group: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc')
})

const ItemEditForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { sectionId, testGroupId, itemId } = router.query
  const currentClass = useSelector(selectedClass)
  const [value, setValue] = useState('controlled-checked')
  const [openQuestionCatalogSelector, setOpenQuestionCatalogSelector] = useState(false)

  const handleChange = event => {
    setValue(event.target.value)
  }

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentClass,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const save = () => {
    const item = getValues()
    new OrganizationApi().save(item).then(response => {
      toast.success('Cập nhật thành công')
    })
  }

  const onSubmit = data => {
    new OrganizationApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }

  useEffect(() => {
    // if (!itemId || itemId == 0) {
    //   dispatch(selectClass({ id: 0, name: '' }))
    //   return
    // }
    // new QuestionApi().get(itemId).then(response => {
    //   dispatch(selectClass(response.data))
    // })
  }, [itemId])

  useEffect(() => {
    if (currentClass) reset(currentClass)
  }, [currentClass])

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
                      {currentClass && currentClass.id > 0 && <span>{currentClass.name}</span>}
                      {(!currentClass || currentClass.id == 0) && <span>Tạo mới Cấu hình</span>}
                    </span>
                    {currentClass && currentClass.id > 0 && <EntityInfoModal entity={currentClass} />}
                  </h3>
                  <span className='right'>
                    {currentClass && currentClass.id > 0 && (
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
                    {(!currentClass || currentClass.id == 0) && (
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
                          <RadioGroup
                            row
                            aria-label='controlled'
                            name='controlled'
                            value={value}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value='controlled-checked'
                              control={<Radio />}
                              label='Lấy câu hỏi ngẫu nhiên'
                            />
                            <FormControlLabel
                              value='controlled-unchecked'
                              control={<Radio />}
                              label='Lấy câu hỏi cụ thể'
                            />
                          </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <Controller
                              name='name'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Số câu hỏi'
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
                              name='name'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Danh mục câu hỏi'
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
                          <Button onClick={() => setOpenQuestionCatalogSelector(true)}>Chọn Danh mục câu hỏi</Button>
                        </Grid>
                        <Grid item>
                          {openQuestionCatalogSelector && (
                            <QuestionCatalogSelector
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
