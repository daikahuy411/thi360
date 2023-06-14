// ** Custom Components Imports
import CustomAvatar from '@core/components/mui/avatar'
import MuiAvatar from '@mui/material/Avatar'
// ** MUI Imports
import Box from '@mui/material/Box'

const AvatarsLetter = () => {
  return (
    <Box className='demo-space-x' sx={{ display: 'flex' }}>
      <MuiAvatar>H</MuiAvatar>
      <CustomAvatar>N</CustomAvatar>
      <CustomAvatar skin='light' color='error'>
        OP
      </CustomAvatar>
      <CustomAvatar skin='light-static' color='error'>
        AB
      </CustomAvatar>
    </Box>
  )
}

export default AvatarsLetter
