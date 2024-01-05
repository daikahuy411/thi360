import React, { Component } from 'react'

import { arrayMoveImmutable } from 'array-move'
import ReactHtmlParser from 'react-html-parser'
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc'

import Button from '@mui/material/Button'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import { styled } from '@mui/material/styles'

const StyledList = styled('div')(({ theme }) => ({
  display: 'block',
  listStyle: 'none',
  '& .MuiListItem-root': {
    listStyle: 'none',
    padding: 10,
    marginTop: 5,
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
        <SortableItem key={`item-${value.id}`} index={index} value={value} />
      ))}
    </StyledList>
  )
})

const SortableItem = SortableElement(({ value }) => (
  <div className='MuiListItem-root'>
    <div>{ReactHtmlParser(value.content)}</div>
    {/* <DragHandle /> */}
  </div>
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
