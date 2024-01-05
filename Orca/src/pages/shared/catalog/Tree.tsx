import React from 'react'

import OrganizationApi from 'api/organization-api'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import TreeView from '@mui/lab/TreeView'

import CatalogApi from '../../../api/catalog-api'
import Catalog from '../../../interfaces/Catalog'
import { CatalogType } from '../../../types/CatalogType'
import TreeNode from './TreeNode'

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
    if(this.props.catalogType === CatalogType.DOCUMENT_ORGANIZATION ){
      new OrganizationApi().getOrganizationTree().then((response: any) => {
        this.setState({ data: response.data })
    });
    }else{
      new CatalogApi(this.props.catalogType).getAll().then((response: any) => {
        this.setState({ data: response.data })
      })
    }    
  }

  componentDidMount = () => {
    if (this.props.autoLoad) {
      this.fetchData()
    }
  }

  render() {
    return (
      <TreeView
        key={'tree-view'}
        className='tree-view-ssss'
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
            .map((item: any, index: number) => (
              <TreeNode excludedId={this.state.excludedId} key={index} item={item} nodeId={item.id} />
            ))}
      </TreeView>
    )
  }
}
