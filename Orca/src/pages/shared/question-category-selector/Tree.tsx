import React from 'react'

import QuestionCategoryApi from 'api/question-category-api'
import Folder from 'interfaces/Folder'

import LoadingSpinner from '@core/components/loading-spinner'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import TreeView from '@mui/lab/TreeView'

import TreeNode from './TreeNode'

export interface Props {
  onNodeSelected: (nodeIds: string) => void
  excludedId?: number
  catalogId?: number
}

export interface States {
  data?: Array<Folder>
  excludedId: number
  loading: boolean
}

export default class FolderTree extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = {
      excludedId: this.props.excludedId ? this.props.excludedId : 0,
      loading: false
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

  UNSAFE_componentWillReceiveProps = (nextProps: any) => {
    if (nextProps.data) {
      this.setState({
        data: nextProps.data
      })
    }
  }

  fetchData = () => {
    this.setState({ loading: true })
    new QuestionCategoryApi().getByCatalog(this.props.catalogId).then((response: any) => {
      this.setState({ data: response.data, loading: false })
    })
  }

  componentDidMount = () => {
    this.fetchData()
  }

  render() {
    return (
      <>
        <LoadingSpinner active={this.state.loading} minHeight={0}>
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
        </LoadingSpinner>
      </>
    )
  }
}
