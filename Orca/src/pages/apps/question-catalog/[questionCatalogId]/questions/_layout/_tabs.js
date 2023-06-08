import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedClass } from 'store/slices/classSlice'

const Nav = ({ children }) => {
  const router = useRouter()
  const currentClass = useSelector(selectedClass)
  const { classId } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/class/${classId}/` ? 'is-active' : 'disabled'
          }`}
          title='Chi tiết'
          component={Link}
          href={`/apps/question-catalog/${classId}/questions/`}
        >
          Chi tiết
        </Link>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/class/${classId}/users/` ? 'is-active' : 'disabled'
          }`}
          title='Cấu hình'
          component={Link}
          href={currentClass && currentClass.id > 0 ? `/apps/class/${classId}/users` : 'javascript:void(0)'}
        >
          Cấu hình
        </Link>
      </div>
    </>
  )
}

export default Nav
