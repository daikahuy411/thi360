import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedTestGroup } from 'store/slices/testGroupSlice'

const Nav = () => {
  const router = useRouter()
  const currentTestGroup = useSelector(selectedTestGroup)
  const { testGroupId } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        {testGroupId && testGroupId == '0' && (
          <span
            className={`finger-tabs__tab flex-none ${
              router.asPath.indexOf(`/apps/test-group/${testGroupId}/`) >= 0 ? 'is-active disabled' : ''
            }`}
            title='Chi tiết'
          >
            Chi tiết
          </span>
        )}

        {testGroupId && testGroupId !== '0' && (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath.indexOf(`/apps/test-group/${testGroupId}/`) >= 0 ? 'is-active' : ''
            }`}
            title='Chi tiết'
            component={Link}
            href={`/apps/test-group/${testGroupId}`}
          >
            Chi tiết
          </Link>
        )}

        {currentTestGroup && currentTestGroup.id > 0 ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/test-group/${testGroupId}/sections/` ? 'is-active' : ''
            }`}
            title='Cấu trúc đề thi'
            component={Link}
            href={
              currentTestGroup && currentTestGroup.id > 0
                ? `/apps/test-group/${testGroupId}/sections`
                : 'javascript:void(0)'
            }
          >
            Cấu trúc đề thi
          </Link>
        ) : (
          <p
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/test-group/${testGroupId}/sections/` ? 'is-active' : ''
            }`}
            title='Cấu trúc đề thi'
          >
            Cấu trúc đề thi
          </p>
        )}

        {currentTestGroup && currentTestGroup.id > 0 ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/test-group/${testGroupId}/tests/` ? 'is-active' : ''
            }`}
            title='Đề thi'
            component={Link}
            href={
              currentTestGroup && currentTestGroup.id > 0
                ? `/apps/test-group/${testGroupId}/tests`
                : 'javascript:void(0)'
            }
          >
            Đề thi
          </Link>
        ) : (
          <p
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/test-group/${testGroupId}/tests/` ? 'is-active' : 'disabled'
            }`}
            title='Đề thi'
          >
            Đề thi
          </p>
        )}
      </div>
    </>
  )
}

export default Nav
