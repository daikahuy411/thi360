// ** React Imports
import { forwardRef, useState } from 'react'

// ** Icon Imports
import Icon from '@core/components/icon'
// ** Custom Components Imports
import CustomAvatar from '@core/components/mui/avatar'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const FacebookBtn = styled(IconButton)(({ theme }) => {
  return {
    color: theme.palette.common.white,
    backgroundColor: '#3B5998 !important',
    borderRadius: theme.shape.borderRadius
  }
})

const TwitterBtn = styled(IconButton)(({ theme }) => {
  return {
    margin: theme.spacing(0, 3),
    color: theme.palette.common.white,
    backgroundColor: '#55ACEE !important',
    borderRadius: theme.shape.borderRadius
  }
})

const LinkedInBtn = styled(IconButton)(({ theme }) => {
  return {
    color: theme.palette.common.white,
    backgroundColor: '#007BB6 !important',
    borderRadius: theme.shape.borderRadius
  }
})

const DialogReferEarn = () => {
  // ** States
  const [show, setShow] = useState(false)

  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', '& svg': { mb: 2 } }}>
        <Icon icon='mdi:gift-outline' fontSize='2rem' />
        <Typography variant='h6' sx={{ mb: 4 }}>
          Refer & Earn
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Use Refer & Earn modal to encourage your exiting customers refer their friends & colleague.
        </Typography>
        <Button variant='contained' onClick={() => setShow(true)}>
          Show
        </Button>
      </CardContent>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent sx={{ px: [8, 15], pt: [8, 12.5], position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Refer & Earn
            </Typography>
            <Typography variant='body2'>
              Invite your friend to vuexy, if thay sign up, you and your friend will get 30 days free trial
            </Typography>
          </Box>
          <Grid container spacing={6} sx={{ mt: 4, textAlign: 'center' }}>
            <Grid item md={4} xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CustomAvatar
                  skin='light'
                  color='primary'
                  sx={{ mb: 3, width: [70, 100], height: [70, 100], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                >
                  <Icon icon='mdi:message-outline' />
                </CustomAvatar>
                <Typography sx={{ mb: 3, fontWeight: '600' }}>Send Invitation 🤟🏻</Typography>
                <Typography>Send your referral link to your friend</Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CustomAvatar
                  skin='light'
                  color='primary'
                  sx={{ mb: 3, width: [70, 100], height: [70, 100], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                >
                  <Icon icon='mdi:clipboard-outline' />
                </CustomAvatar>
                <Typography sx={{ mb: 3, fontWeight: '600' }}>Registration 👩🏻‍💻</Typography>
                <Typography>Let them register to our services</Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CustomAvatar
                  skin='light'
                  color='primary'
                  sx={{ mb: 3, width: [70, 100], height: [70, 100], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                >
                  <Icon icon='mdi:license' />
                </CustomAvatar>
                <Typography sx={{ mb: 3, fontWeight: '600' }}>Free Trial 🎉</Typography>
                <Typography>Your friend will get 30 days free trial</Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
        <DialogContent sx={{ px: { xs: 8, sm: 15 }, pb: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <Box sx={{ mb: 8 }}>
            <Typography variant='h6' sx={{ mb: 4 }}>
              Invite your friends
            </Typography>
            <InputLabel htmlFor='refer-email' sx={{ mb: 2, display: 'inline-flex', whiteSpace: 'break-spaces' }}>
              Enter your friend’s email address and invite them to join Master 😍
            </InputLabel>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
              <TextField
                fullWidth
                size='small'
                id='refer-email'
                sx={{ mr: { xs: 0, sm: 4 } }}
                placeholder='johnDoe@email.com'
              />
              <Button variant='contained' sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
                Send
              </Button>
            </Box>
          </Box>
          <div>
            <Typography variant='h6' sx={{ mb: 4 }}>
              Share the referral link
            </Typography>
            <InputLabel htmlFor='refer-social' sx={{ mb: 2, display: 'inline-flex', whiteSpace: 'break-spaces' }}>
              You can also copy and send it or share it on your social media. 🥳
            </InputLabel>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: ['wrap', 'nowrap'],
                justifyContent: ['flex-end', 'initial']
              }}
            >
              <OutlinedInput
                fullWidth
                size='small'
                id='refer-social'
                sx={{ pr: 1.25, mr: [0, 4] }}
                placeholder='http://referral.link'
                endAdornment={
                  <InputAdornment position='end'>
                    <Button size='small'>Copy Link</Button>
                  </InputAdornment>
                }
              />
              <Box sx={{ mt: [2, 0], display: 'flex', alignItems: 'center' }}>
                <FacebookBtn>
                  <Icon icon='mdi:facebook' />
                </FacebookBtn>
                <TwitterBtn>
                  <Icon icon='mdi:twitter' />
                </TwitterBtn>
                <LinkedInBtn>
                  <Icon icon='mdi:linkedin' />
                </LinkedInBtn>
              </Box>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogReferEarn
