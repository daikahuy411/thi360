import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedExam } from 'store/slices/examSlice'

const Nav = () => {
  const router = useRouter()
  const currentClass = useSelector(selectedExam)
  const { examId } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/exam/${examId}/` ? 'is-active' : 'disabled'
          }`}
          title='Học viên'
          component={Link}
          href={`/apps/exam/${examId}`}
        >
          Chi tiết
        </Link>
        {currentClass && currentClass.id > 0 ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/items/` ? 'is-active' : 'disabled'
            }`}
            title='Môn thi'
            component={Link}
            href={currentClass && currentClass.id > 0 ? `/apps/exam/${examId}/items` : 'javascript:void(0)'}
          >
            Môn thi
          </Link>
        ) : (
          <p
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/items/` ? 'is-active' : 'disabled'
            }`}
            title='Môn thi'
          >
            Môn thi
          </p>
        )}

        {currentClass && currentClass.id > 0 ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/users/` ? 'is-active' : 'disabled'
            }`}
            title='Học viên'
            component={Link}
            href={currentClass && currentClass.id > 0 ? `/apps/exam/${examId}/users` : 'javascript:void(0)'}
          >
            Học viên
          </Link>
        ) : (
          <p
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/users/` ? 'is-active' : 'disabled'
            }`}
            title='Học viên'
          >
            Học viên
          </p>
        )}

        {currentClass && currentClass.id > 0 ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/report/` ? 'is-active' : 'disabled'
            }`}
            title='Học viên'
            component={Link}
            href={currentClass && currentClass.id > 0 ? `/apps/exam/${examId}/report` : 'javascript:void(0)'}
          >
            Thống kê
          </Link>
        ) : (
          <p
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/report/` ? 'is-active' : 'disabled'
            }`}
            title='Học viên'
          >
            Thống kê
          </p>
        )}
      </div>
    </>
  )
}

export default Nav
