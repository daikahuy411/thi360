// ** React Imports
import {
  useEffect,
  useRef,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { PromotionType } from 'types/OrderType'

import Icon from '@core/components/icon'
import CustomChip from '@core/components/mui/chip'
import {
  formatCurrency,
  FormatNumber
} from '@core/utils/format'
import LoadingButton from '@mui/lab/LoadingButton'
import { Collapse } from '@mui/material'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}))

const AddPaymentDrawer = ({ open, toggle, plan, promotions }) => {
  const router = useRouter()
  const formatNumber = new FormatNumber()

  const [totalMonth, setTotalMonth] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const [month, setMonth] = useState(1)
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const [loadingApply, setLoadingApply] = useState(false)
  const [truthPromotionCode, setTruthPromotionCode] = useState('')
  const [settingMsgPromotionCode, setSettingMsgPromotionCode] = useState({ isOpen: false, type: 'info', content: '' });
  const [inputCodeValue, setInputCodeValue] = useState("")

  const [orderDetailPromotion, setOrderDetailPromotion] = useState([])
  const closeButton = useRef(null)

  const handleChangeMonth = value => {
    setMonth(parseInt(value))

    const amount = plan.price * parseInt(value)
    setAmount(amount)
    // handleApplyCode()
    const itemDiscount = orderDetailPromotion.filter((x) => x.promotionType == PromotionType.DISCOUNT)
    if (itemDiscount.length > 0)
      itemDiscount.map((item) => {
        item.amount = (amount * item.percent / 100)
      })

    setTotalAmount(amount)

    const orderDetailPromotionType2 = []
    const promotionType2 = promotions.filter((x) => x.type == 2)
    if (promotionType2) {
      if (parseInt(value) === parseInt(promotionType2[0].condition)) {
        console.log('promotionType2:', promotionType2)
        let item = {
          name: 'Tặng thêm',
          type: 1,
          promotionId: promotionType2[0].id,
          promotionType: promotionType2[0].type,
          months: promotionType2[0].amount,
          price: 0,
          amount: 0
        }
        orderDetailPromotionType2.push(item)
        setOrderDetailPromotion([...orderDetailPromotion, item])
      } else {
        const itemFilter = orderDetailPromotion.filter((x) => x.promotionType != promotionType2[0].type)
        setOrderDetailPromotion(itemFilter)
      }
    }

    calTotal()
  }

  const handleApplyCode = () => {
    setLoadingApply(true)
    const param = {
      code: inputCodeValue
    }
    new V1Api().verifyCodePromotion(param).then(response => {
      const data = response.data
      console.log('procode:', data)
      if (data.isSuccess) {
        setTruthPromotionCode(data.value.code)
        let item = {
          name: 'Giảm giá',
          type: 1,
          promotionId: 1,
          promotionType: 1,
          months: 0,
          percentage: data.value.amount,
          price: 0,
          amount: (amount * data.value.amount / 100)
        }
        const itemFilter = orderDetailPromotion.filter((x) => x.promotionType == PromotionType.DISCOUNT)
        if (itemFilter.length == 0) {
          setOrderDetailPromotion([...orderDetailPromotion, item])
          setSettingMsgPromotionCode({ isOpen: true, type: 'success', content: 'Kích hoạt mã thành công!' })
        }
        else
          setSettingMsgPromotionCode({ isOpen: true, type: 'success', content: 'Mã đã được kích hoạt!' })

      } else {
        const itemFilter = orderDetailPromotion.filter((x) => x.promotionType != PromotionType.DISCOUNT)
        setOrderDetailPromotion([...itemFilter])

        setSettingMsgPromotionCode({ isOpen: true, type: 'error', content: 'Mã khuyến mãi không đúng hoặc không tồn tại!' })
        setTruthPromotionCode('')
      }

      setLoadingApply(false)
      calTotal()
    })
  }

  const calTotal = () => {
    const itemMonth = orderDetailPromotion.filter((x) => x.promotionType == PromotionType.ADDMONTH)
    if (itemMonth.length > 0) {
      setTotalMonth(month + itemMonth[0].months)
    } else {
      setTotalMonth(month)
    }

    const itemDiscount = orderDetailPromotion.filter((x) => x.promotionType == PromotionType.DISCOUNT)
    if (itemDiscount.length > 0) {
      setTotalAmount(amount - itemDiscount[0].amount)
    } else {
      setTotalAmount(amount)
    }
  }

  useEffect(() => {
    if (!plan) return
    setAmount(plan.price)
    setTotalAmount(plan.price * parseInt(month))

    console.log('plan-regs:', open)
    console.log('promotions-regs:', promotions)
  }, [plan])

  useEffect(() => {
    calTotal()
  }, [month, orderDetailPromotion])

  const createOrder = () => {
    setLoading(true)

    console.log('orderDetailPromotion:', orderDetailPromotion)
    let detailTemp = []
    let itemDetail = {
      name: 'Gói sản phẩm',
      type: 0,
      promotionId: 0,
      promotionType: 0,
      months: month,
      price: plan.price,
      amount: plan.price * month
    }

    detailTemp.push(itemDetail)

    const orderInfo = {
      promotionCode: truthPromotionCode,
      pricingPlanId: plan.id,
      totalMonth: month,
      totalAmount: amount,
      note: '',
      orderDetail: [...detailTemp, ...orderDetailPromotion]
    }

    console.log('orderInfo:', orderInfo)
    new V1Api().createOrder(orderInfo).then(response => {
      const data = response.data
      if (data.isSuccess) {
        setLoading(false)
        console.log('data:', data)
        toast.success('Đăng ký gói dịch vụ thành công!')
        if (plan.price != 0) {
          window.location.href = response.data.value.checkoutUrl
        } else {
          closeButton.current.click()
          router.reload('/pricing/')
        }
      } else {
        closeButton.current.click()
        toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
      }


    })
  }

  if (plan == null) return null


  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason)
      return
    }
    else if (reason === 'escapeKeyDown') {
      console.log('mmm', reason)
      closeButton.current.click()
    }
  }

  const cleanForm = () => {

  }
  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={handleClose}
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: [350, 400] } }}
    >
      <Header>
        <Typography variant='h6'>Đăng ký</Typography>
        <IconButton size='small' ref={closeButton} onClick={toggle} sx={{ color: 'text.primary' }}>
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
                    {plan?.totalVN} đ
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Box>
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
                  onChange={e => handleChangeMonth(e.target.value)}
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
                  <TextField fullWidth sx={{ mr: 4 }} size='small' value={inputCodeValue} onChange={(e) => setInputCodeValue(e.target.value)} placeholder='Nhập mã và nhấn Apply' />
                  <LoadingButton
                    variant='outlined'
                    onClick={handleApplyCode}
                    loading={loadingApply}
                    loadingIndicator="Loading…"
                  >
                    Apply
                  </LoadingButton>
                </Box>
                <Collapse in={settingMsgPromotionCode.isOpen}>
                  <Alert severity={settingMsgPromotionCode.type} onClose={() => { setSettingMsgPromotionCode({ isOpen: false, type: 'info', content: '' }) }}>{settingMsgPromotionCode.content}</Alert>
                </Collapse>
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
                      Số tháng
                    </Typography>
                    <Typography variant='body2'>{formatNumber.add0(month)} tháng</Typography>
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
                      Thành tiền
                    </Typography>
                    <Typography variant='body2'>{formatCurrency(amount, 0)} đ</Typography>
                  </Box>
                  {orderDetailPromotion.length > 0 && (
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
                        Khuyến mãi:
                      </Typography>
                    </Box>
                  )}

                  {orderDetailPromotion.length > 0 && orderDetailPromotion.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          mb: 2,
                          gap: 2,
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='body2' sx={{ color: 'text.info' }}>
                          {item.name}
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{ display: 'block', fontWeight: 600, color: 'primary.main', textDecoration: 'none' }}
                        >
                          {item.promotionType === PromotionType.ADDMONTH && (<span>{item.months} tháng</span>)}
                          {item.promotionType === PromotionType.DISCOUNT && (<><span>(- {item.percentage} %)</span> <span>{formatCurrency(item.amount, 0)} đ</span></>)}
                        </Typography>
                      </Box>
                    )
                  })}
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
                  <Typography sx={{ fontWeight: 600 }}>Tổng số tháng sử dụng</Typography>
                  <Typography sx={{ fontWeight: 600 }} color={'green'}>{formatNumber.add0(totalMonth)} tháng</Typography>
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
                  <Typography sx={{ fontWeight: 600 }}>Tổng tiền</Typography>
                  <Typography sx={{ fontWeight: 600 }} color={'green'}>{formatCurrency(totalAmount, 0)} đ</Typography>
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
