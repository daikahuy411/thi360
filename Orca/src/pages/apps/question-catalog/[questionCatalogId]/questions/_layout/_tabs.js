import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedQuestion } from 'store/slices/questionSlice'

const Nav = () => {
  const router = useRouter()
  const currentQuestion = useSelector(selectedQuestion)
  const { questionId, questionCatalogId, type } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        {questionId && questionId != '0' && (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath.indexOf(`/questions/`) >= 0 && router.asPath.indexOf(`/children/`) < 0 ? 'is-active' : ''
            }`}
            title='Chi tiết'
            component={Link}
            href={
              questionCatalogId && questionCatalogId != '0'
                ? `/apps/question-catalog/${questionCatalogId}/questions/${questionId}/`
                : `/apps/question-bank/${questionId}/`
            }
          >
            Chi tiết
          </Link>
        )}

        {(!questionId || questionId === '0') && (
          <span
            className={`finger-tabs__tab flex-none ${
              router.asPath.indexOf(`/questions/`) >= 0 || router.asPath.indexOf(`/question-bank/add`)
                ? 'is-active'
                : 'disabled'
            }`}
            title='Chi tiết'
          >
            Chi tiết
          </span>
        )}

        {type === '9' && (!currentQuestion || currentQuestion.id == 0) && (
          <Link className={`finger-tabs__tab flex-none disabled`} title='Câu hỏi con' href={'#'}>
            Câu hỏi con
          </Link>
        )}
        {currentQuestion && currentQuestion.id > 0 && currentQuestion.questionTypeId == 9 && (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/question-catalog/${questionCatalogId}/questions/${questionId}/children/`
                ? 'is-active'
                : ''
            }`}
            title='Câu hỏi con'
            component={Link}
            href={`/apps/question-catalog/${questionCatalogId}/questions/${questionId}/children/`}
          >
            Câu hỏi con
          </Link>
        )}
      </div>
    </>
  )
}

export default Nav
