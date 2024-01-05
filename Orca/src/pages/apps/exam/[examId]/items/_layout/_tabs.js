import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = () => {
  const router = useRouter()
  const { examId, itemId } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/exam/${examId}/items/${itemId}/` ? 'is-active' : 'disabled'
          }`}
          title='Chi tiết'
          component={Link}
          href={`/apps/exam/${examId}/items/${itemId}/`}
        >
          Chi tiết
        </Link>
        {itemId > 0 ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/items/${itemId}/tests/` ? 'is-active' : ''
            }`}
            title='Cấu hình'
            component={Link}
            href={itemId > 0 ? `/apps/exam/${examId}/items/${itemId}/tests/` : 'javascript:void(0)'}
          >
            Đề thi
          </Link>
        ) : (
          <p
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/exam/${examId}/items/${itemId}/tests/` ? 'is-active' : 'disabled'
            }`}
            title='Cấu hình'
          >
            Đề thi
          </p>
        )}
      </div>
    </>
  )
}

export default Nav
