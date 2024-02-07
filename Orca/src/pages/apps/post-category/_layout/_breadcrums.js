import { useEffect } from 'react'

import { PostCategoryApi } from 'api/catalog-api'
import { useRouter } from 'next/router'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import { selectedPostCategory } from 'store/slices/postCategorySlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const TopNav = props => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { examCategoryId: postCategoryId } = router.query
  const currentPostCategory = useSelector(selectedPostCategory)

  useEffect(() => {
    if (postCategoryId && parseInt(postCategoryId) > 0 && !currentPostCategory) {
      PostCategoryApi.get(postCategoryId).then(response => {
        dispatch(selectExamCategory(response.data))
      })
    }
  }, [postCategoryId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/dashboard'>
        <HomeOutlinedIcon />
      </Link>
      <Typography color='text.primary'>Danh mục Tin bài</Typography>
    </Breadcrumbs>
  )
}

export default TopNav
