import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Controller,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import QuestionCatalogApi from 'src/api/question-catalog-api'
import EntityInfoModal from 'src/pages/shared/entity-info-modal'
import {
  selectedQuestionCatalog,
  selectQuestionCatalog
} from 'src/store/slices/questionCatalogSlice'
import * as yup from 'yup'

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

import TopNav from '../_layout/_breadcrums'
import Nav from '../_layout/_tabs'

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc'),
  group: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc')
})

const EditQuestionCatalogPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { questionCatalogId } = router.query
  const currentQuestionCatalog = useSelector(selectedQuestionCatalog)

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentClass: currentQuestionCatalog,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const save = () => {
    const item = getValues()
    new QuestionCatalogApi().save(item).then(response => {
      toast.success('Cập nhật thành công')
    })
  }

  const onSubmit = data => {
    new QuestionCatalogApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }

  useEffect(() => {
    if (!questionCatalogId || questionCatalogId == 0) {
      dispatch(selectQuestionCatalog({ id: 0, name: '' }))
      return
    }
    new QuestionCatalogApi().get(questionCatalogId).then(response => {
      dispatch(selectQuestionCatalog(response.data))
    })
  }, [questionCatalogId])

  useEffect(() => {
    if (currentQuestionCatalog) reset(currentQuestionCatalog)
  }, [currentQuestionCatalog])

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
                      {currentQuestionCatalog && currentQuestionCatalog.id > 0 && (
                        <span>{currentQuestionCatalog.name}</span>
                      )}
                      {(!currentQuestionCatalog || currentQuestionCatalog.id == 0) && <span>Tạo mới Bộ câu hỏi</span>}
                    </span>
                    {currentQuestionCatalog && currentQuestionCatalog.id > 0 && (
                      <EntityInfoModal entity={currentQuestionCatalog} />
                    )}
                  </h3>
                  <span className='right'>
                    {currentQuestionCatalog && currentQuestionCatalog.id > 0 && (
                      <>
                        <IconButton aria-label='delete'>
                          <DeleteIcon />
                        </IconButton>
                        &nbsp;
                      </>
                    )}
                    <Button variant='outlined' component={Link} href='/apps/question-catalog/'>
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                    &nbsp;
                    <Button disabled={!isValid} onClick={save} variant='contained'>
                      Cập nhật
                    </Button>
                    {(!currentQuestionCatalog || currentQuestionCatalog.id == 0) && (
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

export default EditQuestionCatalogPage
