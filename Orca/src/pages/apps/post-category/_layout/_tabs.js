import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedPostCategory } from 'store/slices/postCategorySlice'

const Nav = () => {
  const router = useRouter()
  const currentPostCategory = useSelector(selectedPostCategory)
  const { postCategoryId } = router.query

  return (
    <>
      <div className='grid-block vertical flex-none finger-tabs__tabs'>
        <Link
          className={`finger-tabs__tab flex-none ${
            router.asPath === `/apps/post-category/${postCategoryId}/` ? 'is-active' : 'disabled'
          }`}
          title='Chi tiết'
          component={Link}
          href={`/apps/post-category/${postCategoryId}`}
        >
          Chi tiết
        </Link>
      </div>
    </>
  )
}

export default Nav
