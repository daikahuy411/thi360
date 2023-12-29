import React, { Component } from 'react'

import { arrayMoveImmutable } from 'array-move'
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc'

const SortableItem = SortableElement(({ value }) => <li>
  <DragHandle />
  {value}</li>)

const DragHandle = SortableHandle(() => <span>::</span>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  )
})

class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMoveImmutable(items, oldIndex, newIndex)
    }))
  }
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
  }
}

export default SortableComponent
