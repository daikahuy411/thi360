import { useEffect } from 'react'

import QuestionCatalogApi from 'api/question-catalog-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  selectedQuestionCatalog,
  selectQuestionCatalog
} from 'store/slices/questionCatalogSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

const TopNav = props => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { questionCatalogId } = router.query
  const currentQuestionCatalog = useSelector(selectedQuestionCatalog)

  useEffect(() => {
    if (questionCatalogId && parseInt(questionCatalogId) > 0) {
      new QuestionCatalogApi().get(questionCatalogId).then(response => {
        dispatch(selectQuestionCatalog(response.data))
      })
    } else {
      dispatch(selectQuestionCatalog(null))
    }
  }, [questionCatalogId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Link underline='hover' color='inherit' href='/apps/question-catalog/'>
        Bộ Câu hỏi
      </Link>
      {currentQuestionCatalog &&
        currentQuestionCatalog.ancestors &&
        currentQuestionCatalog.ancestors.map(item => (
          <Link underline='hover' color='inherit' key={`br-${item.id}`} href={`/apps/question-catalog/view/${item.id}`}>
            {item.name}
          </Link>
        ))}
      {currentQuestionCatalog && <Typography color='text.primary'>{currentQuestionCatalog.name}</Typography>}
    </Breadcrumbs>
  )
}

export default TopNav
