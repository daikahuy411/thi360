import React from 'react'

import Catalog from 'interfaces/Catalog'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import TreeView from '@mui/lab/TreeView'

import TreeNode from './TreeNode'

export interface Props {
  onNodeSelected: (nodeIds: string) => void
  data?: Array<Catalog>
  excludedId?: number
}

export interface States {}

export default class CatalogTree extends React.Component<Props, States> {
  handleToggle = (event: any, nodeIds: string[]) => {
    event.preventDefault()
    event.stopPropagation()
  }

  handleSelect = (event: any, nodeIds: string) => {
    event.preventDefault()
    event.stopPropagation()
    if (this.props.onNodeSelected) {
      this.props.onNodeSelected(nodeIds)
    }
  }

  render() {
    return (
      <TreeView
        style={{ flexGrow: 1, maxWidth: '400' }}
        onNodeSelect={this.handleSelect}
        onNodeToggle={this.handleToggle}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {this.props.data &&
          this.props.data.map((item: any) => (
            <TreeNode excludedId={this.props.excludedId} key={item.key} item={item} nodeId={item.key} />
          ))}
      </TreeView>
    )
  }
}
