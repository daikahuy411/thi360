import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedAccount } from 'store/slices/accountSlice'

const Nav = () => {
  const router = useRouter()
  const currentUser = useSelector(selectedAccount)
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
        {currentUser && currentUser?.id ? (
          <Link
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/user/${userId}/testinghistory/` ? 'is-active' : 'disabled'
            }`}
            title='Lịch sử Thi'
            component={Link}
            href={`/apps/user/${userId}/testinghistory`}
          >
            Lịch sử Thi
          </Link>
        ) : (
          <p
            className={`finger-tabs__tab flex-none ${
              router.asPath === `/apps/user/${userId}/testinghistory/` ? 'is-active' : 'disabled'
            }`}
            title='Lịch sử Thi'
          >
            Lịch sử Thi
          </p>
        )}
      </div>
    </>
  )
}

export default Nav
