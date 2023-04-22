import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import TreeView from '@mui/lab/TreeView'
import React from 'react'
import CatalogApi from '../../../api/catalog-api'
import { CatalogType } from "../../../types/CatalogType";
import TreeNode from './TreeNode'
import Catalog from '../../../interfaces/Catalog'

export interface Props {
  onNodeSelected: (nodeIds: string) => void
  autoLoad?: boolean
  data?: Array<Catalog>
  excludedId?: number
  catalogType: CatalogType
  acl?: boolean
}

export interface States {
  data?: Array<Catalog>
  excludedId: number
}

export default class CatalogTree extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = {
      data: this.props.data,
      excludedId: this.props.excludedId ? this.props.excludedId : 0
    }
  }

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

  fetchData = () => {
    new CatalogApi(this.props.catalogType).getAll().then((response: any) => {
      this.setState({ data: response.data })
    })
  }

  componentDidMount = () => {
    if (this.props.autoLoad) {
      this.fetchData()
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
        {this.state.data &&
          this.state.data
            .filter(x => x.id !== this.state.excludedId)
            .map((item: any) => (
              <TreeNode excludedId={this.state.excludedId} key={item.id} item={item} nodeId={item.id} />
            ))}
      </TreeView>
    )
  }
}
