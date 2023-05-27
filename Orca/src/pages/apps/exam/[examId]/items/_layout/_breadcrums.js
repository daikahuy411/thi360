import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectedExam, selectExam } from 'src/store/slices/examSlice'
import { selectedExamItem, selectExamItem } from 'src/store/slices/examItemSlice'
import ExamApi from 'src/api/exam-api'
import ExamItemApi from 'src/api/exam-item-api'
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
