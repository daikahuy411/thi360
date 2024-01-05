import { useEffect } from 'react'

import TestGroupApi from 'api/test-group-api'
import TestGroupSectionApi from 'api/test-group-section-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  selectedTestGroupSection,
  selectTestGroupSection
} from 'store/slices/testGroupSectionSlice'
import {
  selectedTestGroup,
  selectTestGroup
} from 'store/slices/testGroupSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

const TopNav = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const currentTestGroup = useSelector(selectedTestGroup)
  const currentTestGroupSection = useSelector(selectedTestGroupSection)
  const { testGroupId, sectionId } = router.query

  useEffect(() => {
    if (sectionId && parseInt(sectionId) > 0 && !currentTestGroupSection) {
      new TestGroupSectionApi().get(sectionId).then(response => {
        dispatch(selectTestGroupSection(response.data))
      })
    }
  }, [sectionId])

  useEffect(() => {
    if (testGroupId && parseInt(testGroupId) > 0) {
      new TestGroupApi().get(testGroupId).then(response => {
        dispatch(selectTestGroup(response.data))
      })
    } else {
      dispatch(selectTestGroup(null))
    }
  }, [testGroupId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Link underline='hover' color='inherit' href='/apps/test-group'>
        Bộ Đề thi
      </Link>
      {currentTestGroup && (
        <Link underline='hover' color='inherit' href={`/apps/test-group/${testGroupId}`}>
          {currentTestGroup.name}
        </Link>
      )}
      {currentTestGroup && (
        <Link underline='hover' color='inherit' href={`/apps/test-group/${testGroupId}/sections`}>
          Cấu trúc đề thi
        </Link>
      )}
      {currentTestGroupSection && <Typography color='text.primary'>{currentTestGroupSection.name}</Typography>}
    </Breadcrumbs>
  )
}

export default TopNav
