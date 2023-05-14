import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedTestGroupSection } from 'src/store/slices/testGroupSectionSlice'
import { selectedTestGroup } from 'src/store/slices/testGroupSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const TopNav = () => {
  const router = useRouter()

  const currentTestGroup = useSelector(selectedTestGroup)
  const currentTestGroupSection = useSelector(selectedTestGroupSection)
  const { testGroupId, sectionId } = router.query

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
