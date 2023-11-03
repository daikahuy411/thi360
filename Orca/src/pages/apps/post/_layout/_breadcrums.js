import { useEffect } from 'react'
import PostApi from 'api/post-api'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectedPost, selectPost } from 'store/slices/postSlice'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const TopNav = props => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {   postId } = router.query
  const currentPost = useSelector(selectedPost)

  useEffect(() => {
    if (postId && parseInt(postId) > 0 && !currentPost) {
      new PostApi().get(postId).then(response => {
        dispatch(selectPost(response.data))
      })
    }
  }, [postId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Typography color='text.primary'>Tin bài</Typography>
    </Breadcrumbs>
  )
}

export default TopNav
