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
import ExamApi from 'src/api/exam-api'
import EntityInfoModal from 'src/pages/shared/entity-info-modal'
import {
  selectedExam,
  selectExam
} from 'src/store/slices/examSlice'
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
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import TopNav from '../_layout/_breadcrums'
import Nav from '../_layout/_tabs'

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc'),
  group: yup.number().required('* bắt buộc').moreThan(0, '* bắt buộc')
})

const EditExamPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { examId } = router.query
  const currentExam = useSelector(selectedExam)

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    currentExam,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const save = () => {
    const item = getValues()
    new ExamApi().save(item).then(response => {
      toast.success('Cập nhật thành công')
    })
  }

  const onSubmit = data => {
    new ExamApi().save(data).then(response => {
      toast.success('Form Submitted')
    })
  }

  useEffect(() => {
    if (!examId || examId == 0) {
      dispatch(selectExam({ id: 0, name: '' }))
      return
    }
    new ExamApi().get(examId).then(response => {
      dispatch(selectExam(response.data))
    })
  }, [examId])

  useEffect(() => {
    if (currentExam) reset(currentExam)
  }, [currentExam])

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
                      {currentExam && currentExam.id > 0 && <span>{currentExam.name}</span>}
                      {(!currentExam || currentExam.id == 0) && <span>Tạo mới Kỳ thi</span>}
                    </span>
                    {currentExam && currentExam.id > 0 && <EntityInfoModal entity={currentExam} />}
                  </h3>
                  <span className='right'>
                    {currentExam && currentExam.id > 0 && (
                      <>
                        <IconButton aria-label='delete'>
                          <DeleteIcon />
                        </IconButton>
                        &nbsp;
                      </>
                    )}
                    <Button variant='outlined' component={Link} href='/apps/exam/'>
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                    &nbsp;
                    <Button disabled={!isValid} onClick={save} variant='contained'>
                      Cập nhật
                    </Button>
                    {(!currentExam || currentExam.id == 0) && (
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
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <Controller
                              name='group'
                              rules={{ required: true }}
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <>
                                  <InputLabel id='demo-simple-select-label' required>
                                    Khối lớp
                                  </InputLabel>
                                  <Select
                                    label='Khối lớp'
                                    labelId='demo-simple-select-label'
                                    aria-describedby='validation-schema-group'
                                    error={Boolean(errors.group)}
                                    value={value}
                                    onChange={onChange}
                                  >
                                    <MenuItem value={0}>Chọn Khối lớp</MenuItem>
                                    <MenuItem value={1}>Khối 1</MenuItem>
                                    <MenuItem value={2}>Khối 2</MenuItem>
                                    <MenuItem value={3}>Khối 3</MenuItem>
                                    <MenuItem value={4}>Khối 4</MenuItem>
                                    <MenuItem value={5}>Khối 5</MenuItem>
                                    <MenuItem value={6}>Khối 6</MenuItem>
                                    <MenuItem value={7}>Khối 7</MenuItem>
                                    <MenuItem value={8}>Khối 8</MenuItem>
                                    <MenuItem value={9}>Khối 9</MenuItem>
                                    <MenuItem value={10}>Khối 10</MenuItem>
                                    <MenuItem value={11}>Khối 11</MenuItem>
                                    <MenuItem value={12}>Khối 12</MenuItem>
                                  </Select>
                                </>
                              )}
                            />
                            {errors.group && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-group'>
                                {errors.group.message}
                              </FormHelperText>
                            )}
                          </FormControl>
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

export default EditExamPage
