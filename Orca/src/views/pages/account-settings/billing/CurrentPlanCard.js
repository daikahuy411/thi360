// ** React Imports
import { useState } from 'react'

// ** Component Import
import PricingPlans from 'views/pages/pricing/PricingPlans'

// ** Icon Imports
import Icon from '@core/components/icon'
// ** Custom Components Imports
import CustomChip from '@core/components/mui/chip'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import LinearProgress from '@mui/material/LinearProgress'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

const CurrentPlanCard = ({ data }) => {
  // ** State
  const [open, setOpen] = useState(false)
  const [userInput, setUserInput] = useState('yes')
  const [plan, setPlan] = useState('annually')
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)
  const [openPricingDialog, setOpenPricingDialog] = useState(false)

  const handleChange = e => {
    if (e.target.checked) {
      setPlan('annually')
    } else {
      setPlan('monthly')
    }
  }
  const handleClose = () => setOpen(false)
  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  const handleConfirmation = value => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader title='Current Plan' />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 6 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>Your Current Plan is Basic</Typography>
                <Typography sx={{ color: 'text.secondary' }}>A simple start for everyone</Typography>
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>Active until Dec 09, 2021</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  We will send you a notification upon Subscription expiration
                </Typography>
              </Box>
              <div>
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: 600 }}>$199 Per Month</Typography>
                  <CustomChip label='Popular' size='small' color='primary' skin='light' />
                </Box>
                <Typography sx={{ color: 'text.secondary' }}>Standard plan for small to medium businesses</Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Alert
                severity='warning'
                sx={{ mb: 6 }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close'>
                    <Icon icon='mdi:close' fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>We need your attention!</AlertTitle>
                Your plan requires update
              </Alert>

              <div>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Days</Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>24 of 30 Days</Typography>
                </Box>
                <LinearProgress
                  value={75}
                  variant='determinate'
                  sx={{ my: 1.5, height: 8, borderRadius: 6, '& .MuiLinearProgress-bar': { borderRadius: 6 } }}
                />
                <Typography variant='caption'>6 days remaining until your plan requires update</Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: 3, gap: 4, display: 'flex', flexWrap: 'wrap' }}>
                <Button variant='contained' onClick={() => setOpenPricingDialog(true)}>
                  Upgrade Plan
                </Button>
                <Button variant='outlined' color='secondary' onClick={() => setOpen(true)}>
                  Cancel Subscription
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: '85%', textAlign: 'center', '& svg': { mb: 4, color: 'warning.main' } }}>
              <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
              <Typography>Are you sure you would like to cancel your subscription?</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' onClick={() => handleConfirmation('yes')}>
            Yes
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth maxWidth='xs' open={secondDialogOpen} onClose={handleSecondDialogClose}>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 14,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon
              fontSize='5.5rem'
              icon={userInput === 'yes' ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
            />
            <Typography variant='h4' sx={{ mb: 8 }}>
              {userInput === 'yes' ? 'Unsubscribed!' : 'Cancelled'}
            </Typography>
            <Typography>
              {userInput === 'yes' ? 'Your subscription cancelled successfully.' : 'Unsubscription Cancelled!'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        scroll='body'
        maxWidth='lg'
        open={openPricingDialog}
        onClose={() => setOpenPricingDialog(false)}
        onBackdropClick={() => setOpenPricingDialog(false)}
      >
        <DialogContent sx={{ px: { xs: 8, sm: 15 }, py: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setOpenPricingDialog(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Find the right plan for your site
            </Typography>
            <Typography variant='body2'>
              Get started with us - it's perfect for individuals and teams. Choose a subscription plan that meets your
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
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CurrentPlanCard
