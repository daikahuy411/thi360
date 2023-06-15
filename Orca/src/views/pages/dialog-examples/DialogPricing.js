// ** React Imports
import {
  forwardRef,
  useState
} from 'react'

// ** Component Import
import PricingPlans from 'views/pages/pricing/PricingPlans'

// ** Icon Imports
import Icon from '@core/components/icon'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogPricing = ({ data }) => {
  // ** States
  const [show, setShow] = useState(false)
  const [plan, setPlan] = useState('annually')

  const handleChange = e => {
    if (e.target.checked) {
      setPlan('annually')
    } else {
      setPlan('monthly')
    }
  }

  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', '& svg': { mb: 2 } }}>
        <Icon icon='mdi:currency-usd' fontSize='2rem' />
        <Typography variant='h6' sx={{ mb: 4 }}>
          Pricing
        </Typography>
        <Typography sx={{ mb: 3 }}>Elegant pricing options dialog popup example, easy to use in any page.</Typography>
        <Button variant='contained' onClick={() => setShow(true)}>
          Show
        </Button>
      </CardContent>
      <Dialog
        fullWidth
        open={show}
        scroll='body'
        maxWidth='lg'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent sx={{ px: { xs: 8, sm: 15 }, py: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Subscription Plan
            </Typography>
            <Typography variant='body2'>
              All plans include 40+ advanced tools and features to boost your product. Choose the best plan to fit your
              needs.
            </Typography>
          </Box>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <InputLabel
              htmlFor='modal-pricing-switch'
              sx={{ fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
            >
              Monthly
            </InputLabel>
            <Switch onChange={handleChange} id='modal-pricing-switch' checked={plan === 'annually'} />
            <InputLabel
              htmlFor='modal-pricing-switch'
              sx={{ fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
            >
              Annually
            </InputLabel>
          </Box>
          <PricingPlans data={data} plan={plan} />
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant='body2' sx={{ mb: 2.5 }}>
              Still Not Convinced? Start with a 14-day FREE trial!
            </Typography>
            <Button variant='contained' onClick={() => setShow(false)}>
              Start your trial
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogPricing
