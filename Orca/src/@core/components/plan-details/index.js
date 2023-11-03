// ** Icon Imports
import Icon from '@core/components/icon'
import CustomChip from '@core/components/mui/chip'
import { hexToRGBA } from '@core/utils/hex-to-rgba'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6),
  paddingTop: theme.spacing(14.75),
  borderRadius: theme.shape.borderRadius
}))

// ** Styled Component for the wrapper of all the features of a plan
const BoxFeature = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  '& > :not(:first-of-type)': {
    marginTop: theme.spacing(4)
  }
}))

const PlanDetails = props => {
  // ** Props
  const { plan, data, isCurrentPlan, currentPlanItem, addPayment } = props

  console.log('isCurrentPlan:', isCurrentPlan)
  console.log('currentPlanItem:', currentPlanItem)
  console.log('data:', data)

  const renderFeatures = () => {
    return data?.planBenefitsObject.map((item, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component='span' sx={{ display: 'inline-flex', color: 'text.secondary', mr: 2 }}>
          <Icon icon='mdi:circle-outline' fontSize='0.75rem' />
        </Box>
        <Typography variant='body2'>{item.name}</Typography>
      </Box>
    ))
  }

  const handleClick = () => {
    if (!isCurrentPlan) {

      props.addPayment()
    } else {
      if (data.price != 0) {
        props.addPayment()
      }
    }


  }
  return (
    <BoxWrapper
      sx={{
        border: theme =>
          !data?.isPopular
            ? `1px solid ${theme.palette.divider}`
            : `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`
      }}
    >
      {data?.isPopular ? (
        <CustomChip
          skin='light'
          label='Phổ biến'
          color='primary'
          sx={{
            top: 12,
            right: 12,
            height: 24,
            position: 'absolute',
            '& .MuiChip-label': {
              px: 1.75,
              fontWeight: 600,
              fontSize: '0.75rem'
            }
          }}
        />
      ) : null}
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
        <img
          style={{ width: '230px', height: '205px' }}
          width={data?.imgWidth}
          src={`${data?.imageSrc}`}
          height={data?.imgHeight}
          alt={`${data?.name.toLowerCase().replace(' ', '-')}-plan-img`}
        />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          {data?.name}
        </Typography>
        <Typography variant='body2'>{data?.subtitle}</Typography>
        <Box sx={{ my: 7, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant='h3' sx={{ fontWeight: 600, color: 'primary.main', lineHeight: 1.17 }}>
              {data.totalVN}
            </Typography>
            <Typography variant='body2' sx={{ mt: 1.6, fontWeight: 600, alignSelf: 'flex-start' }}>
              đ
            </Typography>
            <Typography variant='body2' sx={{ mb: 1.6, fontWeight: 600, alignSelf: 'flex-end' }}>
              /tháng
            </Typography>
          </Box>
        </Box>
      </Box>
      <BoxFeature>{renderFeatures()}</BoxFeature>
      <Button
        onClick={
          handleClick
          // (isCurrentPlan) ? null : () => props.addPayment()
        }
        fullWidth
        color={(isCurrentPlan && currentPlanItem[0].status == 1) ? 'success' : 'primary'}
        variant={isCurrentPlan ? 'contained' : 'outlined'}
      >
        {(isCurrentPlan && currentPlanItem[0].status == 1) ? 'Đang sử dụng' : (isCurrentPlan && currentPlanItem[0].status == 5) ? 'Đã đăng ký' : 'Đăng ký'}
      </Button>
    </BoxWrapper >
  )
}

export default PlanDetails
