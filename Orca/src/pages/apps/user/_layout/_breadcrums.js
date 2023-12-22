import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedClass } from 'store/slices/classSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'

const TopNav = props => {
  const router = useRouter()
  const currentClass = useSelector(selectedClass)
  const { classId } = router.query

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      {!classId && (
        <Link underline='hover' color='inherit' href='/apps/user/'>
          Học viên
        </Link>
      )}
      {classId && classId > 0 && (
        <Link underline='hover' color='inherit' href='/apps/class/'>
          Lớp học
        </Link>
      )}
      {currentClass &&
        currentClass.ancestors &&
        currentClass.ancestors.map(item => (
          <Link underline='hover' color='inherit' key={`br-${item.id}`} href={`/apps/class/view/${item.id}`}>
            {item.name}
          </Link>
        ))}
      {currentClass && (
        <Link underline='hover' color='inherit' href={`/apps/class/${classId}/users`}>
          {currentClass.name}
        </Link>
      )}
    </Breadcrumbs>
  )
}

export default TopNav
