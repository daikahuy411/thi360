// ** React Imports
import { forwardRef, Fragment, useState } from 'react'

// ** Configs Imports
import themeConfig from 'configs/themeConfig'

// ** Icon Imports
import Icon from '@core/components/icon'
// ** Hooks Imports
import { useSettings } from '@core/hooks/useSettings'
import Autocomplete from '@mui/material/Autocomplete'
import Avatar from '@mui/material/Avatar'
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
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const data = [
  {
    avatar: '1.png',
    value: 'Can Edit',
    name: 'Lester Palmer',
    email: 'pe@vogeiz.net'
  },
  {
    avatar: '2.png',
    value: 'owner',
    name: 'Mittie Blair',
    email: 'peromak@zukedohik.gov'
  },
  {
    avatar: '3.png',
    value: 'Can Comment',
    name: 'Marvin Wheeler',
    email: 'rumet@jujpejah.net'
  },
  {
    avatar: '4.png',
    value: 'Can View',
    name: 'Nannie Ford',
    email: 'negza@nuv.io'
  },
  {
    avatar: '5.png',
    value: 'Can Edit',
    name: 'Julian Murphy',
    email: 'lunebame@umdomgu.net'
  },
  {
    avatar: '6.png',
    value: 'Can View',
    name: 'Sophie Gilbert',
    email: 'ha@sugit.gov'
  },
  {
    avatar: '7.png',
    value: 'Can Comment',
    name: 'Chris Watkins',
    email: 'zokap@mak.org'
  },
  {
    avatar: '8.png',
    value: 'Can Edit',
    name: 'Adelaide Nichols',
    email: 'ujinomu@jigo.com'
  }
]

const options = [
  {
    avatar: '1.png',
    name: 'Chandler Bing'
  },
  {
    avatar: '2.png',
    name: 'Rachel Green'
  },
  {
    avatar: '3.png',
    name: 'Joey Tribbiani'
  },
  {
    avatar: '4.png',
    name: 'Pheobe Buffay'
  },
  {
    avatar: '5.png',
    name: 'Ross Geller'
  },
  {
    avatar: '8.png',
    name: 'Monica Geller'
  }
]

const DialogShareProject = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // ** Var
  const { direction } = settings

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', '& svg': { mb: 2 } }}>
        <Icon icon='mdi:file-document-outline' fontSize='2rem' />
        <Typography variant='h6' sx={{ mb: 4 }}>
          Share Project
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Elegant Share Project options modal popup example, easy to use in any page.
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
              Share Project
            </Typography>
            <Typography variant='body2'>Share project with a team members</Typography>
          </Box>
          <InputLabel
            htmlFor='add-members'
            sx={{ mb: 2, display: 'inline-flex', fontWeight: 500, fontSize: ['1.125rem', '1.25rem'] }}
          >
            Add Members
          </InputLabel>
          <Autocomplete
            autoHighlight
            sx={{ mb: 6 }}
            id='add-members'
            options={options}
            ListboxComponent={List}
            getOptionLabel={option => option.name}
            renderInput={params => <TextField {...params} size='small' placeholder='Add project members...' />}
            renderOption={(props, option) => (
              <ListItem {...props}>
                <ListItemAvatar>
                  <Avatar src={`/images/avatars/${option.avatar}`} alt={option.name} sx={{ height: 28, width: 28 }} />
                </ListItemAvatar>
                <ListItemText primary={option.name} />
              </ListItem>
            )}
          />
          <Typography variant='h6'>{`${data.length} Members`}</Typography>
          <List dense sx={{ mb: 3 }}>
            {data.map(member => {
              return (
                <ListItem key={member.name} sx={{ px: 0, py: 2, display: 'flex', flexWrap: 'wrap' }}>
                  <ListItemAvatar>
                    <Avatar src={`/images/avatars/${member.avatar}`} alt={member.name} />
                  </ListItemAvatar>
                  <ListItemText sx={{ m: 0 }} primary={member.name} secondary={member.email} />
                  <ListItemSecondaryAction sx={{ right: 0 }}>
                    {hidden ? (
                      <IconButton
                        size='small'
                        aria-haspopup='true'
                        onClick={handleClick}
                        aria-controls='modal-share-examples'
                      >
                        <Icon icon='mdi:chevron-down' fontSize={20} />
                      </IconButton>
                    ) : (
                      <Fragment>
                        <Button
                          color='secondary'
                          aria-haspopup='true'
                          onClick={handleClick}
                          sx={{ textTransform: 'capitalize' }}
                          aria-controls='modal-share-examples'
                          endIcon={<Icon icon='mdi:chevron-down' fontSize={20} />}
                        >
                          {member.value}
                        </Button>
                      </Fragment>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
              <Icon icon='mdi:account-multiple-outline' />
              <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                {`Public to ${themeConfig.templateName} - ThemeSelection`}
              </Typography>
            </Box>
            <Button sx={{ '& svg': { mr: 2 } }}>
              <Icon icon='mdi:link-variant' fontSize={20} />
              Copy Project Link
            </Button>
          </Box>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
            id='modal-share-examples'
            anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
          >
            <MenuItem value='owner' sx={{ fontSize: '0.875rem' }} onClick={handleClose}>
              Owner
            </MenuItem>
            <MenuItem value='Can Edit' sx={{ fontSize: '0.875rem' }} onClick={handleClose}>
              Can Edit
            </MenuItem>
            <MenuItem value='Can Comment' sx={{ fontSize: '0.875rem' }} onClick={handleClose}>
              Can Comment
            </MenuItem>
            <MenuItem value='Can View' sx={{ fontSize: '0.875rem' }} onClick={handleClose}>
              Can View
            </MenuItem>
          </Menu>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogShareProject
