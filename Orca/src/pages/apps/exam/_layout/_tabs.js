import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedExam } from 'store/slices/examSlice'

const Nav = () => {
  const router = useRouter()
  const currentExam = useSelector(selectedExam)
  const { examId, folderId } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath.indexOf(`/apps/exam/${examId}/`) >= 0 &&
            router.asPath.indexOf(`items/`) < 0 &&
            router.asPath.indexOf(`users/`) < 0 &&
            router.asPath.indexOf(`marks/`) < 0 &&
            router.asPath.indexOf(`report/`) < 0
              ? 'is-active'
              : ''
          }`}
          title='Chi tiết'
          component={Link}
          href={`/apps/exam/${examId}/${folderId ?? 0}`}
        >
          Chi tiết
        </Link>
        {currentExam && currentExam.id > 0 ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/items/` ? 'is-active' : ''
            }`}
            title='Môn thi'
            component={Link}
            href={currentExam && currentExam.id > 0 ? `/apps/exam/${examId}/items` : 'javascript:void(0)'}
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

        {currentExam && currentExam.id > 0 ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/users/` ? 'is-active' : ''
            }`}
            title='Học viên'
            component={Link}
            href={currentExam && currentExam.id > 0 ? `/apps/exam/${examId}/users` : 'javascript:void(0)'}
          >
            Học viên
          </Link>
        ) : (
          <p
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/users/` ? 'is-active disabled' : ''
            }`}
            title='Học viên'
          >
            Học viên
          </p>
        )}
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/exam/${examId}/marks/` ? 'is-active' : ''
          }`}
          title='Chấm điểm'
          component={Link}
          href={currentExam && currentExam.id > 0 ? `/apps/exam/${examId}/marks` : 'javascript:void(0)'}
        >
          Chấm điểm
        </Link>

        {currentExam && currentExam.id > 0 ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/report/` ? 'is-active' : ''
            }`}
            title='Báo cáo'
            component={Link}
            href={currentExam && currentExam.id > 0 ? `/apps/exam/${examId}/report` : 'javascript:void(0)'}
          >
            Báo cáo
          </Link>
        ) : (
          <p
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/report/` ? 'is-active' : 'disabled'
            }`}
            title='Báo cáo'
          >
            Báo cáo
          </p>
        )}
      </div>
    </>
  )
}

export default Nav
