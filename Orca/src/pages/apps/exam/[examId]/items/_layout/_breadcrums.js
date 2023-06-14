import { useEffect } from 'react'

import ExamApi from 'api/exam-api'
import ExamItemApi from 'api/exam-item-api'
import { useRouter } from 'next/router'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  selectedExamItem,
  selectExamItem
} from 'store/slices/examItemSlice'
import {
  selectedExam,
  selectExam
} from 'store/slices/examSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const TopNav = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { examId, itemId } = router.query
  const currentExam = useSelector(selectedExam)
  const currentExamItem = useSelector(selectedExamItem)

  useEffect(() => {
    if (examId && parseInt(examId) > 0 && !currentExam) {
      new ExamApi().get(examId).then(response => {
        dispatch(selectExam(response.data))
      })
    }
  }, [examId])

  useEffect(() => {
    if (itemId && parseInt(itemId) > 0 && !currentExamItem) {
      new ExamItemApi().get(itemId).then(response => {
        dispatch(selectExamItem(response.data))
      })
    }
  }, [itemId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Link underline='hover' color='inherit' href='/apps/exam'>
        Kỳ thi
      </Link>
      {currentExam && (
        <Link underline='hover' color='inherit' href={`/apps/exam/${examId}/items`}>
          {currentExam.name}
        </Link>
      )}
      <Typography color='text.primary'>Môn thi</Typography>
    </Breadcrumbs>
  )
}

export default TopNav
