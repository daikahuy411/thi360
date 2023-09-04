// ** React Imports
import { useState, forwardRef, useEffect } from 'react'
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
import Icon from '@core/components/icon'
import Alert from '@mui/material/Alert'
import V1Api from 'api/v1-api'
import CardContent from '@mui/material/CardContent'
import CustomChip from '@core/components/mui/chip'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import CircularProgress from '@mui/material/CircularProgress'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const AddPaymentDrawer = ({ open, toggle, plan }) => {
  const [month, setMonth] = useState(1)
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const updateMonth = value => {
    setMonth(parseInt(value))
    setAmount(plan.price * parseInt(value))
  }

  useEffect(() => {
    if (!plan) return
    setAmount(plan.price)
  }, [plan])

  const createOrder = () => {
    setLoading(true)
    new V1Api().createOrder(plan.id, month).then(response => {
      if (response.data.isSuccess && plan.price != 0) {
        window.location.href = response.data.value.checkoutUrl
      }
      setLoading(false)
    })
  }

  if (plan == null) return null

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
        <Typography variant='h6'>Đăng ký</Typography>
        <IconButton size='small' onClick={toggle} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
          <CardContent>
            <Typography sx={{ mb: 4, fontWeight: 600 }}>Thông tin gói</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                  Gói
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant='body2'>{plan?.name}</Typography>&nbsp;
                  <CustomChip
                    size='small'
                    skin='light'
                    color='success'
                    label={`${plan.type == 1 ? 'Giáo viên' : 'Học viên'}`}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                  Giá
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant='body2' sx={{ mr: 2, color: 'text.disabled' }}>
                    {plan?.price} đ
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Box>
        {/* <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            id='invoice-balance'
            label='Gói'
            value={plan?.name}
            InputProps={{ disabled: true }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            type='number'
            label='Giá'
            value={plan?.price}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              disabled: true,
              endAdornment: <InputAdornment position='start'>đ</InputAdornment>
            }}
          />
        </Box> */}
        {plan && plan.price > 0 && (
          <>
            <Box sx={{ mb: 6 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor='payment-method'>Phương thức thanh toán</InputLabel>
                <Select
                  label='Phương thức thanh toán'
                  labelId='payment-method'
                  id='payment-method-select'
                  defaultValue='VNPay'
                >
                  <MenuItem key={'VNPay'} value='VNPay'>
                    VNPay
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 6 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor='payment-method'>Số tháng</InputLabel>
                <Select
                  label='Số tháng'
                  labelId='payment-method'
                  onChange={e => updateMonth(e.target.value)}
                  id='payment-method-select'
                  defaultValue={1}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
              <CardContent>
                <Typography sx={{ mb: 4, fontWeight: 600 }}>Mã giảm giá</Typography>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                  <TextField fullWidth sx={{ mr: 4 }} size='small' placeholder='Enter Promo Code' />
                  <Button variant='outlined'>Apply</Button>
                </Box>
              </CardContent>
              <Divider sx={{ my: '0 !important' }} />
              <CardContent>
                <Typography sx={{ mb: 4, fontWeight: 600 }}>Chi tiết đơn hàng</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      mb: 2,
                      gap: 2,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant='body2' sx={{ color: 'text.primary' }}>
                      Tổng
                    </Typography>
                    <Typography variant='body2'>{amount} đ</Typography>
                  </Box>
                  <Box
                    sx={{
                      mb: 2,
                      gap: 2,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant='body2' sx={{ color: 'text.primary' }}>
                      Giảm giá
                    </Typography>
                    <Typography
                      href='/'
                      variant='body2'
                      component={Link}
                      onClick={e => e.preventDefault()}
                      sx={{ display: 'block', fontWeight: 600, color: 'primary.main', textDecoration: 'none' }}
                    >
                      Apply Coupon
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <Divider sx={{ my: '0 !important' }} />
              <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
                <Box
                  sx={{
                    gap: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>Tổng cộng</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{amount} đ</Typography>
                </Box>
              </CardContent>
            </Box>
            {/* <Box sx={{ mb: 6 }}>
              <TextField rows={3} multiline fullWidth label='Ghi chú' placeholder='Ghi chú' />
            </Box> */}
            <div>
              <Button
                size='large'
                disabled={loading}
                fullWidth
                variant='contained'
                onClick={createOrder}
                sx={{ mr: 4 }}
              >
                {loading && <CircularProgress size={20} />}
                Thanh toán
              </Button>
            </div>
            <div>
              {/* <Box sx={{ p: 4, borderRadius: 1, backgroundColor: 'action.hover' }}>
                <Typography sx={{ mb: 2, fontWeight: 600 }}>Buying gift for a loved one?</Typography>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                  Gift wrap and personalized message on card, Only for $2.
                </Typography>
                <Typography
                  href='/'
                  variant='body2'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none' }}
                >
                  Add a gift wrap
                </Typography>
              </Box> */}
              <br />
              <Alert severity='success'>
                Gói sẽ được kích hoạt tự động ngay lập tức sau khi thanh toán thành công.
              </Alert>
            </div>
          </>
        )}

        {plan && plan.price === 0 && (
          <>
            <div>
              <Button
                size='large'
                fullWidth
                variant='contained'
                disabled={loading}
                onClick={createOrder}
                sx={{ mr: 4 }}
              >
                {loading && <CircularProgress size={20} />}
                Đăng ký
              </Button>
            </div>
          </>
        )}
      </Box>
    </Drawer>
  )
}

export default AddPaymentDrawer
