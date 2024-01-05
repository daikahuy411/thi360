import React, {
  useEffect,
  useState
} from 'react'

import OrganizationApi from 'api/organization-api'

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

export default function ClassTree(props: Props) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleToggle = (event: any, nodeIds: string[]) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleSelect = (event: any, nodeIds: string) => {
    event.preventDefault()
    event.stopPropagation()
    if (props.onNodeSelected) {
      props.onNodeSelected(nodeIds)
    }
  }

  const fetchData = () => {
    new OrganizationApi().getClassTree().then((response: any) => {
      setData([{ id: 0, name: 'Tất cả Lớp học' }, ...response.data])
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <LoadingSpinner active={loading}>
      <TreeView
        style={{ flexGrow: 1, width: '100%' }}
        onNodeSelect={handleSelect}
        onNodeToggle={handleToggle}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {data &&
          data
            .filter(x => x.id !== props.excludedId)
            .map((item: any) => (
              <TreeNode excludedId={props.excludedId ?? 0} key={item.id} item={item} nodeId={item.id} />
            ))}
      </TreeView>
    </LoadingSpinner>
  )
}
