import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedClass } from 'src/store/slices/classSlice'

const Nav = () => {
  const router = useRouter()
  const currentClass = useSelector(selectedClass)
  const { testGroupId, sectionId } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/test-group/${testGroupId}/configs/${sectionId}/` ? 'is-active' : 'disabled'
          }`}
          title='Chi tiết'
          component={Link}
          href={`/apps/test-group/${testGroupId}/configs/${sectionId}/`}
        >
          Chi tiết
        </Link>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/test-group/${testGroupId}/configs/${sectionId}/items` ? 'is-active' : 'disabled'
          }`}
          title='Cấu hình'
          component={Link}
          href={sectionId > 0 ? `/apps/test-group/${testGroupId}/configs/${sectionId}/items` : 'javascript:void(0)'}
        >
          Cấu hình
        </Link>
      </div>
    </>
  )
}

export default Nav
