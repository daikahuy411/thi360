// ** MUI Imports
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import MuiTextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Styled Card component
const Card = styled(MuiCard)(({ theme }) => ({
  border: 0,
  boxShadow: 'none',
  backgroundSize: 'cover',
  backgroundImage:
    theme.palette.mode === 'light'
      ? 'url(/images/pages/tree-cone-cube-bg-light.png)'
      : 'url(/images/pages/tree-cone-cube-bg-dark.png)'
}))

// Styled TextField component
const TextField = styled(MuiTextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper
  },
  [theme.breakpoints.up('sm')]: {
    width: '55%'
  }
}))

const EditHeader = props => {
  // ** Props
  const { searchTerm, setSearchTerm } = props

  const handleFaqFilter = e => {
    setSearchTerm(e.target.value)
  }

  return (
    <Breadcrumbs aria-label='breadcrumb' style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}>
      <Link underline='hover' color='inherit' href='/'>
        <HomeOutlinedIcon />
      </Link>
      <Link underline='hover' color='inherit' href='/material-ui/getting-started/installation/'>
        Core
      </Link>
      <Typography color='text.primary'>Breadcrumbs</Typography>
    </Breadcrumbs>
  )
}

export default EditHeader
