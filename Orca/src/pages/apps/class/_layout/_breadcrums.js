import { useEffect } from 'react'

import OrganizationApi from 'api/organization-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  selectClass,
  selectedClass
} from 'store/slices/classSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

const TopNav = props => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { classId } = router.query
  const currentClass = useSelector(selectedClass)

  useEffect(() => {
    if (classId && parseInt(classId) > 0) {
      new OrganizationApi().get(classId).then(response => {
        dispatch(selectClass(response.data))
      })
    } else {
      dispatch(selectClass(null))
    }
  }, [classId])

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/dashboard'>
        <HomeOutlinedIcon />
      </Link>
      <Link underline='hover' color='inherit' href='/apps/class/'>
        Lớp học
      </Link>
      {currentClass &&
        currentClass.ancestors &&
        currentClass.ancestors.map(item => (
          <Link underline='hover' color='inherit' key={`br-${item.id}`} href={`/apps/class/view/${item.id}`}>
            {item.name}
          </Link>
        ))}
      {currentClass && <Typography color='text.primary'>{currentClass.name}</Typography>}
    </Breadcrumbs>
  )
}

export default TopNav
