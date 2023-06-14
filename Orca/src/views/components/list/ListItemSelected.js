// ** React Imports
import { useState } from 'react'

// ** Icon Imports
import Icon from '@core/components/icon'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
// ** MUI Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'

const ListItemSelected = () => {
  // ** State
  const [selectedIndex, setSelectedIndex] = useState(1)

  const handleListItemClick = index => {
    setSelectedIndex(index)
  }

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
          <ListItemAvatar>
            <Avatar src='/images/avatars/2.png' alt='Caroline Black' sx={{ height: 32, width: 32 }} />
          </ListItemAvatar>
          <ListItemText primary='Caroline Black' />
          <ListItemSecondaryAction>
            <IconButton edge='end'>
              <Icon icon='mdi:message-text-outline' fontSize={20} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
          <ListItemAvatar>
            <Avatar src='/images/avatars/1.png' alt='Alfred Copeland' sx={{ height: 32, width: 32 }} />
          </ListItemAvatar>
          <ListItemText primary='Alfred Copeland' />
          <ListItemSecondaryAction>
            <IconButton edge='end'>
              <Icon icon='mdi:message-text-outline' fontSize={20} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2)}>
          <ListItemAvatar>
            <Avatar src='/images/avatars/8.png' alt='Celia Schneider' sx={{ height: 32, width: 32 }} />
          </ListItemAvatar>
          <ListItemText primary='Celia Schneider' />
          <ListItemSecondaryAction>
            <IconButton edge='end'>
              <Icon icon='mdi:message-text-outline' fontSize={20} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
    </List>
  )
}

export default ListItemSelected
