// ** React Imports
import { useState, forwardRef } from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import Icon from '@core/components/icon'
import Alert from '@mui/material/Alert'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const AddPaymentDrawer = ({ open, toggle, plan }) => {
  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={toggle}
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: [300, 400] } }}
    >
      <Header>
        <Typography variant='h6'>Add Payment</Typography>
        <IconButton size='small' onClick={toggle} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            id='invoice-balance'
            label='Gói'
            InputProps={{ disabled: true }}
            defaultValue='5000.00'
          />
        </Box>
        <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            type='number'
            label='Giá'
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>
            }}
          />
        </Box>
        <Box sx={{ mb: 6 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor='payment-method'>Số tháng</InputLabel>
            <Select label='Số tháng' labelId='payment-method' id='payment-method-select' defaultValue={1}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
                <MenuItem key={item} value={1}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            id='invoice-balance'
            label='Gói'
            InputProps={{ disabled: true }}
            defaultValue='5000.00'
          />
        </Box>
        <Box sx={{ mb: 6 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor='payment-method'>Payment Method</InputLabel>
            <Select label='Payment Method' labelId='payment-method' id='payment-method-select' defaultValue='VNPay'>
              <MenuItem key={'VNPay'} value='VNPay'>
                VNPay
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mb: 6 }}>
          <TextField rows={6} multiline fullWidth label='Internal Payment Note' placeholder='Internal Payment Note' />
        </Box>

        <div>
          <Button size='large' variant='contained' onClick={toggle} sx={{ mr: 4 }}>
            Thanh toán
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={toggle}>
            Hủy bỏ
          </Button>
        </div>
        <div>
          <br />
          <Alert severity='success'>Gói sẽ được kích hoạt tự động ngay lập tức sau khi thanh toán thành công.</Alert>
        </div>
      </Box>
    </Drawer>
  )
}

export default AddPaymentDrawer
