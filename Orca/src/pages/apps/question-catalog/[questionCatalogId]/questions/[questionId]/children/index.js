import { useEffect } from 'react'

import QuestionApi from 'api/question-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  selectedQuestion,
  selectQuestion
} from 'store/slices/questionSlice'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'

import TopNav from '../../_layout/_breadcrums'
import Nav from '../../_layout/_tabs'
import QuestionTable from './_list'

const ChildrenQuestionList = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { questionCatalogId, questionId } = router.query
  const currentQuestion = useSelector(selectedQuestion)

  useEffect(() => {
    if (!questionId || questionId == 0) {
      return
    }

    new QuestionApi().get(questionId).then(response => {
      dispatch(selectQuestion(response.data))
    })
  }, [questionId])

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
                      {currentQuestion && currentQuestion.id > 0 && (
                        <span>
                          {currentQuestion.id}-{currentQuestion.questionTypeName}
                        </span>
                      )}
                    </span>
                    {currentQuestion && currentQuestion.id > 0 && <EntityInfoModal entity={currentQuestion} />}
                  </h3>
                  <span className='right'>
                    <Button
                      variant='outlined'
                      component={Link}
                      href={`/apps/question-catalog/${questionCatalogId}/questions/${questionId}`}
                    >
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                  </span>
                </div>
                <div className='grid-block'>
                  <Nav />
                  <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                    <div style={{ width: '100%' }}>{currentQuestion && <QuestionTable />}</div>
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

export default ChildrenQuestionList
