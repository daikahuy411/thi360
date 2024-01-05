import React, { Component } from 'react'

import { arrayMoveImmutable } from 'array-move'
import ReactHtmlParser from 'react-html-parser'
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc'

import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'

const StyledList = styled(List)(({ theme }) => ({
  display: 'block',
  listStyle: 'none',
  '& .MuiListItem-root': {
    listStyle: 'none',
    cursor: 'move',
    border: `1px solid ${theme.palette.divider}`,
    paddingRight: theme.spacing(24),
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    }
  }
}))

const DragHandle = SortableHandle(() => (
  <ListItemSecondaryAction>
    <Button variant='contained' size='small'>
      Add
    </Button>
  </ListItemSecondaryAction>
))

const SortableList = SortableContainer(({ items }) => {
  return (
    <StyledList disablePadding>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </StyledList>
  )
})

const SortableItem = SortableElement(({ value }) => (
  <ListItem>
    <div>
      <ListItemText primary={ReactHtmlParser(value.content)} />
    </div>
    {/* <DragHandle /> */}
  </ListItem>
))

class OrderQuestion extends Component {
  state = {
    items: this.props.data
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = arrayMoveImmutable(this.state.items, oldIndex, newIndex)
    this.setState({ items: newItems })
    if (this.props.onChanged) {
      this.props.onChanged(newItems.map(item => item.id).join(';'))
    }
  }
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
  }
}

export default OrderQuestion
