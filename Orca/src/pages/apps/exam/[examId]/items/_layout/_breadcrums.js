import { useEffect } from 'react'

import ExamApi from 'api/exam-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  selectedExam,
  selectExam
} from 'store/slices/examSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'

const TopNav = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { examId } = router.query
  const currentExam = useSelector(selectedExam)

  useEffect(() => {
    if (examId && parseInt(examId) > 0 && !currentExam) {
      new ExamApi().get(examId).then(response => {
        dispatch(selectExam(response.data))
      })
    }
  }, [examId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Link underline='hover' color='inherit' href='/apps/exam'>
        Kỳ thi
      </Link>
      {currentExam && (
        <Link underline='hover' color='inherit' href={`/apps/exam/${examId}/`}>
          {currentExam.name}
        </Link>
      )}
      {currentExam && (
        <Link underline='hover' color='inherit' href={`/apps/exam/${examId}/items`}>
          Môn thi
        </Link>
      )}
      {/* {currentExamItem && <Typography color='text.primary'>{currentExamItem.name}</Typography>} */}
    </Breadcrumbs>
  )
}

export default TopNav
