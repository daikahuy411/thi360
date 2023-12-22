import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedQuestionCatalog } from 'store/slices/questionCatalogSlice'

const Nav = () => {
  const router = useRouter()
  const currentQuestionCatalog = useSelector(selectedQuestionCatalog)
  const { questionCatalogId, questionCategoryId } = router.query

  return (
    <>
      <div className='grid-block vertical  finger-tabs__tabs' style={{ height: '100vh' }}>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/question-catalog/${questionCatalogId}/categories/${questionCategoryId}/`
              ? 'is-active'
              : 'disabled'
          }`}
          title='Câu hỏi'
          href={
            currentQuestionCatalog && currentQuestionCatalog.id > 0
              ? `/apps/question-catalog/${questionCatalogId}/categories/${questionCategoryId}/`
              : 'javascript:void(0)'
          }
        >
          Chi tiết
        </Link>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/question-catalog/${questionCatalogId}/categories/${questionCategoryId}/questions/`
              ? 'is-active'
              : 'disabled'
          }`}
          title='Câu hỏi'
          href={
            currentQuestionCatalog && currentQuestionCatalog.id > 0
              ? `/apps/question-catalog/${questionCatalogId}/categories/${questionCategoryId}/questions/`
              : 'javascript:void(0)'
          }
        >
          Câu hỏi
        </Link>
      </div>
    </>
  )
}

export default Nav
