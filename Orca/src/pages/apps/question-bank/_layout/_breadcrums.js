import Link from 'next/link'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

const TopNav = props => {
  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/dashboard'>
        <HomeOutlinedIcon />
      </Link>
      <Typography color='text.primary'>Ngân hàng Câu hỏi</Typography>
    </Breadcrumbs>
  )
}

export default TopNav
