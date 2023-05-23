import { useEffect } from 'react'

import { useRouter } from 'next/router'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import QuestionCatalogApi from 'src/api/question-catalog-api'
import {
  selectedQuestionCatalog,
  selectQuestionCatalog
} from 'src/store/slices/questionCatalogSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const TopNav = props => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { questionCatalogId } = router.query
  const currentQuestionCatalog = useSelector(selectedQuestionCatalog)

  useEffect(() => {
    if (questionCatalogId && parseInt(questionCatalogId) > 0 && !currentQuestionCatalog) {
      new QuestionCatalogApi().get(questionCatalogId).then(response => {
        dispatch(selectQuestionCatalog(response.data))
      })
    }
  }, [questionCatalogId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Typography color='text.primary'>Bộ Câu hỏi</Typography>
    </Breadcrumbs>
  )
}

export default TopNav
