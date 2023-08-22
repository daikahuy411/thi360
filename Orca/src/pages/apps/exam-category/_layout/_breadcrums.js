import { useEffect } from 'react'

import { ExamCategoryApi } from 'api/catalog-api'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectedExamCategory, selectExamCategory } from 'store/slices/examCategorySlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const TopNav = props => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { examCategoryId } = router.query
  const currentExamCategory = useSelector(selectedExamCategory)

  useEffect(() => {
    if (examCategoryId && parseInt(examCategoryId) > 0 && !currentExamCategory) {
      ExamCategoryApi.get(examCategoryId).then(response => {
        dispatch(selectExamCategory(response.data))
      })
    }
  }, [examCategoryId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Typography color='text.primary'>Danh mục Kỳ thi</Typography>
    </Breadcrumbs>
  )
}

export default TopNav
