import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedQuestionCatalog } from 'src/store/slices/questionCatalogSlice'

const Nav = ({ children }) => {
  const router = useRouter()
  const currentQuestionCatalog = useSelector(selectedQuestionCatalog)
  const { questionCatalogId } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/question-catalog/${questionCatalogId}/` ? 'is-active' : 'disabled'
          }`}
          title='Chi tiết'
          component={Link}
          href={`/apps/question-catalog/${questionCatalogId}`}
        >
          Chi tiết
        </Link>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/question-catalog/${questionCatalogId}/categories/` ? 'is-active' : 'disabled'
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
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/question-catalog/${questionCatalogId}/questions/` ? 'is-active' : 'disabled'
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
      </div>
    </>
  )
}

export default Nav
