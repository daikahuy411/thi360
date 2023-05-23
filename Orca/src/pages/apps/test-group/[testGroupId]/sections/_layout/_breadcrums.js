import { useEffect } from 'react'

import { useRouter } from 'next/router'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import TestGroupSectionApi from 'src/api/test-group-section-api'
import {
  selectedTestGroupSection,
  selectTestGroupSection
} from 'src/store/slices/testGroupSectionSlice'
import { selectedTestGroup } from 'src/store/slices/testGroupSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
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

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Link underline='hover' color='inherit' href='/apps/test-group'>
        Bộ Đề thi
      </Link>
      {currentTestGroup && (
        <Link underline='hover' color='inherit' href={`/apps/test-group/${testGroupId}/configs`}>
          {currentTestGroup.name}
        </Link>
      )}
      <Typography color='text.primary'>Phần thi</Typography>
    </Breadcrumbs>
  )
}

export default TopNav
