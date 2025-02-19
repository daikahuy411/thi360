import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedQuestionCatalog } from 'store/slices/questionCatalogSlice'

const Nav = ({ children }) => {
  const router = useRouter()
  const currentQuestionCatalog = useSelector(selectedQuestionCatalog)
  const { questionCatalogId } = router.query

  return (
    <>
      <div className='grid-block vertical  finger-tabs__tabs'>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath.indexOf(`/categories/`) < 0 && router.asPath.indexOf(`/questions/`) < 0
              ? 'is-active'
              : ''
          }`}
          title='Chi tiết'
          component={Link}
          href={`/apps/question-catalog/${questionCatalogId}`}
        >
          Chi tiết
        </Link>
        {currentQuestionCatalog && currentQuestionCatalog.id > 0 ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/question-catalog/${questionCatalogId}/categories/` ? 'is-active' : ''
            }`}
            title='Danh mục'
            component={Link}
            href={
              currentQuestionCatalog && currentQuestionCatalog.id > 0
                ? `/apps/question-catalog/${questionCatalogId}/categories/`
                : 'javascript:void(0)'
            }
          >
            Danh mục
          </Link>
        ) : (
          <p
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/question-catalog/${questionCatalogId}/categories/` ? 'is-active' : 'disabled'
            }`}
            title='Danh mục'
          >
            Danh mục
          </p>
        )}

        {currentQuestionCatalog && currentQuestionCatalog.id > 0 ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/question-catalog/${questionCatalogId}/questions/` ? 'is-active' : ''
            }`}
            title='Câu hỏi'
            component={Link}
            href={
              currentQuestionCatalog && currentQuestionCatalog.id > 0
                ? `/apps/question-catalog/${questionCatalogId}/questions/`
                : 'javascript:void(0)'
            }
          >
            Câu hỏi
          </Link>
        ) : (
          <p
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/question-catalog/${questionCatalogId}/questions/` ? 'is-active' : 'disabled'
            }`}
            title='Câu hỏi'
            component={Link}
          >
            Câu hỏi
          </p>
        )}
      </div>
    </>
  )
}

export default Nav
