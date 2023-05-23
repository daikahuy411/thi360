import { useEffect } from 'react'

import { useRouter } from 'next/router'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import OrganizationApi from 'src/api/organization-api'
import {
  selectClass,
  selectedClass
} from 'src/store/slices/classSlice'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const TopNav = props => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { classId } = router.query
  const currentClass = useSelector(selectedClass)

  useEffect(() => {
    if (classId && parseInt(classId) > 0 && !currentClass) {
      new OrganizationApi().get(classId).then(response => {
        dispatch(selectClass(response.data))
      })
    }
  }, [classId])


  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Typography color='text.primary'>Lớp học</Typography>
    </Breadcrumbs>
  )
}

export default TopNav
