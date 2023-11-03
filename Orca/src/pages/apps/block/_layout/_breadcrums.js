import { useEffect } from 'react'
import BlockApi from 'api/block-api'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectedBlock, selectBlock } from 'store/slices/blockSlice'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const TopNav = props => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { blockId } = router.query
  const currentBlock = useSelector(selectedBlock)

  useEffect(() => {
    if (blockId && parseInt(blockId) > 0 && !currentBlock) {
      new BlockApi().get(blockId).then(response => {
        dispatch(selectBlock(response.data))
      })
    }
  }, [blockId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Typography color='text.primary'>Block</Typography>
    </Breadcrumbs>
  )
}

export default TopNav
