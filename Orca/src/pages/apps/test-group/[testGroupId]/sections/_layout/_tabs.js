import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = () => {
  const router = useRouter()
  const { testGroupId, sectionId } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/test-group/${testGroupId}/sections/${sectionId}/` ? 'is-active' : 'disabled'
          }`}
          title='Chi tiết'
          component={Link}
          href={`/apps/test-group/${testGroupId}/sections/${sectionId}/`}
        >
          Chi tiết
        </Link>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/test-group/${testGroupId}/sections/${sectionId}/items/` ? 'is-active' : 'disabled'
          }`}
          title='Cấu hình'
          component={Link}
          href={sectionId > 0 ? `/apps/test-group/${testGroupId}/sections/${sectionId}/items/` : 'javascript:void(0)'}
        >
          Cấu hình
        </Link>
      </div>
    </>
  )
}

export default Nav
