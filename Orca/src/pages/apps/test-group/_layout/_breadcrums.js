import { useEffect } from 'react'

import TestGroupApi from 'api/test-group-api'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectedTestGroup, selectTestGroup } from 'store/slices/testGroupSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

const TopNav = props => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { testGroupId, folderId } = router.query
  const currentTestGroup = useSelector(selectedTestGroup)

  useEffect(() => {
    if (testGroupId && parseInt(testGroupId) > 0) {
      new TestGroupApi().get(testGroupId).then(response => {
        dispatch(selectTestGroup(response.data))
      })
    } else {
      dispatch(selectTestGroup(null))
    }
  }, [testGroupId])

  useEffect(() => {
    if (folderId && parseInt(folderId) > 0) {
      new TestGroupApi().get(folderId).then(response => {
        dispatch(selectTestGroup(response.data))
      })
    } else {
      dispatch(selectTestGroup(null))
    }
  }, [folderId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Link underline='hover' color='inherit' href='/apps/test-group/'>
        Bộ Đề thi
      </Link>
      {currentTestGroup &&
        currentTestGroup.ancestors &&
        currentTestGroup.ancestors.map(item => (
          <Link underline='hover' color='inherit' href={`/apps/test-group/view/${item.id}`}>
            {item.name}
          </Link>
        ))}
      {currentTestGroup && <Typography color='text.primary'>{currentTestGroup.name}</Typography>}
    </Breadcrumbs>
  )
}

export default TopNav
