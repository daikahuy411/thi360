import { useEffect } from 'react'

import TestGroupApi from 'api/test-group-api'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectedTestGroup, selectTestGroup } from 'store/slices/testGroupSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const TopNav = props => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { testGroupId } = router.query
  const currentTestGroup = useSelector(selectedTestGroup)

  useEffect(() => {
    if (testGroupId && parseInt(testGroupId) > 0 && !currentTestGroup) {
      new TestGroupApi().get(testGroupId).then(response => {
        dispatch(selectTestGroup(response.data))
      })
    }
  }, [testGroupId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Typography color='text.primary'>Bộ Đề thi</Typography>
    </Breadcrumbs>
  )
}

export default TopNav
