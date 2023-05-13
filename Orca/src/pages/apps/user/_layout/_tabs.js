import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedUser } from 'src/store/slices/userSlice'

const Nav = () => {
  const router = useRouter()
  const currentUser = useSelector(selectedUser)
  const { userId } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/user/${userId}/` ? 'is-active' : 'disabled'
          }`}
          title='Chi tiết'
          component={Link}
          href={`/apps/user/${userId}`}
        >
          Chi tiết
        </Link>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/user/${userId}/testinghistory/` ? 'is-active' : 'disabled'
          }`}
          title='Lịch sử Thi'
          component={Link}
          href={currentUser && currentUser.id > 0 ? `/apps/user/${userId}/testinghistory` : 'javascript:void(0)'}
        >
          Lịch sử Thi
        </Link>
      </div>
    </>
  )
}

export default Nav
