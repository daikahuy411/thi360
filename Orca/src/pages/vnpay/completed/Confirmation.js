import {
  useEffect,
  useState
} from 'react'

import moment from 'moment'
// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PromotionType } from 'types/OrderType'

// ** Icon Imports
import Icon from '@core/components/icon'
// ** Custom Components Imports
import CustomChip from '@core/components/mui/chip'
import {
  formatCurrency,
  FormatNumber
} from '@core/utils/format'
import {
  Alert,
  AlertTitle,
  Button,
  Collapse
} from '@mui/material'
// ** MUI Imports
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  '& .MuiListItem-root': {
    padding: theme.spacing(5),
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6
    },
    '&:last-of-type': {
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6
    },
    '&:not(:last-of-type)': {
      borderBottom: 0
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: theme.spacing(4),
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    },
    '& .remove-item': {
      top: '0.5rem',
      right: '0.625rem',
      position: 'absolute',
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

const HorizontalList = styled(List)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  borderRadius: 6,
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiListItem-root': {
    padding: theme.spacing(5),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },
  [theme.breakpoints.down('md')]: {
    display: 'block',
    '& .MuiListItem-root': {
      '&:not(:last-of-type)': {
        borderRight: 0,
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  }
}))

const Confirmation = (props) => {
  const { orderInfo, isSuccess, status } = props
  const router = useRouter()
  const formatNumber = new FormatNumber()
  const searchParams = new URLSearchParams(document.location.search)

  const [orderDetailMain, setOrderDetailMain] = useState()
  const [orderDetailPromotion, setOrderDetailPromotion] = useState([])

  const [countDownValue, setCountDownValue] = useState()

  useEffect(() => {
    if (orderInfo && orderInfo.orderDetail) {
      const mainItem = orderInfo.orderDetail.filter(d => d.type == 0)
      const promotionItem = orderInfo.orderDetail.filter(d => d.type != 0)
      setOrderDetailMain(mainItem[0])
      setOrderDetailPromotion(promotionItem)
    }

    handleStatusAlert()

  }, [props])

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDownValue > 0)
        setCountDownValue(countDownValue - 1);
      if (countDownValue == 0)
        handleRedirect('/')
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownValue])

  const handleStatusAlert = () => {
    if (isSuccess) {
      setCountDownValue(50000)
    } else {
      if (!isSuccess && status == 1) {
        setCountDownValue(50000)
      } else if (!isSuccess && status == 404) {
        setCountDownValue(5)
      }
    }
  }
  const handleRedirect = (link) => {
    router.push(link)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          {!isSuccess && status == 24 && (
            <Typography variant='h5' sx={{ mb: 4 }}> Giao dịch không thành công! </Typography>
          )}

          {!isSuccess && status == 404 && (
            <Typography variant='h5' sx={{ mb: 4 }}> Xảy ra lỗi! </Typography>
          )}

          {isSuccess && (
            <>
              <Typography variant='h5' sx={{ mb: 4 }} >
                Giao dịch thành công! 😇
              </Typography>
              <Typography sx={{ mb: 4, color: 'text.secondary' }}>
                Gói đăng ký của bạn đã được giao dịch hoàn tất lúc &nbsp;
                <Icon icon='mdi:clock-time-five-outline' fontSize={20} /> {moment(orderInfo?.createdTime).format('DD-MM-YYYY hh:mm:ss')}!
              </Typography>
              <Typography sx={{ mb: 4, color: 'text.secondary' }}>
                Gói được kích hoạt tự động với thời gian sử dụng từ ngày <strong>{moment(orderInfo?.fromDate).format('DD-MM-YYYY hh:mm:ss')}</strong> đến ngày <strong>{moment(orderInfo?.toDate).format('DD-MM-YYYY hh:mm:ss')}</strong>.
              </Typography>
            </>
          )}



          {/* <Typography sx={{ color: 'text.secondary' }}>
            We sent an email to{' '}
            <Box
              href='/'
              component={Link}
              onClick={e => e.preventDefault()}
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              john.doe@example.com
            </Box>{' '}
            with your order confirmation and receipt.
          </Typography>
          <Typography sx={{ mb: 4, color: 'text.secondary' }}>
            If the email hasn't arrived within two minutes, please check your spam folder to see if the email was routed
            there.
          </Typography> */}
        </Box>

        <Collapse in={true}>
          {!isSuccess && status == 1 && (
            <Alert severity="info">
              <AlertTitle>Thông báo</AlertTitle>
              Gói dịch vụ của bạn đã được đăng ký, Bạn sẽ được chuyển hướng sau <strong>{formatNumber.add0(countDownValue)}</strong> giây — hoặc bạn có thể <strong onClick={handleRedirect} style={{ cursor: 'pointer' }}>Chuyển hướng ngay</strong>
            </Alert>
          )}

          {isSuccess && (
            <Alert severity="success">
              <AlertTitle>Thành công</AlertTitle>
              Gói dịch vụ của bạn đã được thanh toán thành công, Bạn sẽ được chuyển hướng sau <strong>{formatNumber.add0(countDownValue)}</strong> giây — hoặc <strong>Chuyển hướng ngay</strong>
            </Alert>
          )}

          {!isSuccess && status == 0 && (
            <Alert severity="error">
              <AlertTitle>Xảy ra lỗi</AlertTitle>
              Xảy ra lỗi trong quá trình xử lý — <strong onClick={handleRedirect} style={{ cursor: 'pointer' }}>Về trang chủ!</strong>
            </Alert>
          )}

          {!isSuccess && status == 404 && (
            <Alert severity="error">
              <AlertTitle>Xảy ra lỗi</AlertTitle>
              Giao dịch của bạn không tồn tại, Bạn sẽ được chuyển hướng sau <strong>{formatNumber.add0(countDownValue)}</strong> giây — hoặc bạn có thể <strong onClick={handleRedirect} style={{ cursor: 'pointer' }}>Về trang chủ!</strong> ngay
            </Alert>
          )}

          {!isSuccess && status == 4 && (
            <Alert severity="warning">
              <AlertTitle>Cảnh báo</AlertTitle>
              Bạn không có quyền thực hiện chức năng này.
            </Alert>
          )}

          {!isSuccess && status == 24 && (
            <Alert severity="warning">
              <AlertTitle>Thông báo</AlertTitle>
              Giao dịch không thành công do: Khách hàng đã hủy giao dịch - <strong onClick={handleRedirect} style={{ cursor: 'pointer' }}>Về trang chủ</strong>
            </Alert>
          )}
        </Collapse>
      </Grid>
      {orderInfo && (
        <>
          <Grid item xs={12} md={8} xl={9}>
            <StyledList>
              <ListItem>
                <ListItemAvatar>
                  <img width={80} src={orderInfo?.pricingPlan?.imageSrc} alt='' />
                </ListItemAvatar>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={8}>
                    <ListItemText primary={`Gói ${orderInfo?.pricingPlan?.name} dành cho ${orderInfo?.pricingPlan?.typeName}`} />
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ mr: 2, color: 'text.disabled' }}>Thời gian:</Typography>
                      <Typography
                        href='/'
                        component={Link}
                        onClick={e => e.preventDefault()}
                        sx={{ mr: 4, color: 'primary.main', textDecoration: 'none' }}
                      >
                        {orderInfo && (
                          `${orderInfo.totalMonth} tháng`
                        )}
                      </Typography>
                      {orderInfo && orderInfo.promotionCode && (
                        <>
                          Mã giảm giá: <CustomChip size='small' skin='light' color='success' label={orderInfo.promotionCode} />
                        </>
                      )}

                    </Box>
                  </Grid>
                  <Grid
                    item
                    sm={4}
                    xs={12}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}
                  >
                    <Typography sx={{ color: 'primary.main' }}>{orderInfo?.pricingPlan?.price ? formatCurrency(orderInfo?.pricingPlan?.price, 0) : '0'} đ/1 tháng</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </StyledList>
            <Box sx={{ mt: 10, display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: '5px' }}>
              <Button variant="contained" onClick={() => handleRedirect('/')}>Về trang chủ</Button>
              <Button variant="contained" color="success" onClick={() => handleRedirect('/')}>Lịch sử giao dịch</Button>
              <Button variant="contained" color="info" onClick={() => handleRedirect('/program')}>Luyện đề ngay</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} xl={3}>
            <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
              <CardContent>
                <Typography sx={{ mb: 4, fontWeight: 600 }}>Chi tiết</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant='body2' sx={{ color: 'text.primary' }}> Số tiền </Typography>
                    <Typography variant='body2'>{orderDetailMain?.amount ? formatCurrency(orderDetailMain?.amount, 0) : ''} đ</Typography>
                  </Box>
                  <Box
                    sx={{
                      mb: 4,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant='body2' sx={{ color: 'text.primary' }}> Số tháng </Typography>
                    <Typography variant='body2'>{formatNumber.add0(orderDetailMain?.months)} tháng</Typography>
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
                      Khuyến mãi <CustomChip size='small' skin='light' color='success' label='Free' />
                    </Typography>
                  </Box>
                  {orderDetailPromotion.length > 0 && orderDetailPromotion.map((item, index) => {
                    return (
                      <Box
                        key={`box-${item.id}`}
                        sx={{
                          gap: 2,
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='body2' sx={{ color: 'text.primary' }}>
                          {item.promotionType == PromotionType.ADDMONTH && (`Tặng thêm`)}
                          {item.promotionType == PromotionType.DISCOUNT && (`Giảm giá`)}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Typography variant='body2' sx={{ mr: 2 }}>
                            {item.promotionType === PromotionType.ADDMONTH && (<span>{formatNumber.add0(item.months)} tháng</span>)}
                            {item.promotionType === PromotionType.DISCOUNT && (<><span>(-{item.percentage} %)</span> <span>{formatCurrency(item?.amount, 0)} đ</span></>)}
                          </Typography>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              </CardContent>
              <Divider sx={{ m: '0 !important' }} />
              <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
                <Box
                  sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Typography sx={{ fontWeight: 600 }}>Tổng số tháng</Typography>
                  <Typography sx={{ fontWeight: 600 }} color={'green'}>{formatNumber.add0(orderInfo.totalMonth)} tháng</Typography>
                </Box>
                <Box
                  sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Typography sx={{ fontWeight: 600 }}>Tổng tiền</Typography>
                  <Typography sx={{ fontWeight: 600 }} color={'green'}>{orderInfo ? formatCurrency(orderInfo.totalAmount, 0) : ''} đ</Typography>
                </Box>
              </CardContent>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default Confirmation
