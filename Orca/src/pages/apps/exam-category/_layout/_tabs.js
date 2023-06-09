import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedExamCategory } from 'store/slices/examCategorySlice'

const Nav = () => {
  const router = useRouter()
  const currentExamCategory = useSelector(selectedExamCategory)
  const { examCategoryId } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        <Link
          className={`finger-tabs__tab flex-none ${router.asPath === `/apps/exam-category/${examCategoryId}/` ? 'is-active' : 'disabled'
            }`}
          title='Chi tiết'
          component={Link}
          href={`/apps/exam-category/${examCategoryId}`}
        >
          Chi tiết
        </Link>
        {currentExamCategory && currentExamCategory.id > 0 ?
          <Link
            className={`finger-tabs__tab flex-none ${router.asPath === `/apps/exam-category/${examCategoryId}/exams/` ? 'is-active' : 'disabled'
              }`}
            title='Kỳ thi'
            component={Link}
            href={currentExamCategory && currentExamCategory.id > 0 ? `/apps/exam-category/${examCategoryId}/exams` : 'javascript:void(0)'}
          >
            Kỳ thi
          </Link>
          : <p
            className={`finger-tabs__tab flex-none ${router.asPath === `/apps/exam-category/${examCategoryId}/exams/` ? 'is-active' : 'disabled'
              }`}
            title='Kỳ thi'
          >
            Kỳ thi
          </p>
        }

      </div>
    </>
  )
}

export default Nav
