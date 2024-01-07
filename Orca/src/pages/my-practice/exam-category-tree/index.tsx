import React, {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'

import LoadingSpinner from '@core/components/loading-spinner'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import TreeView from '@mui/lab/TreeView'
import Grid from '@mui/material/Grid'

import TreeNode from './TreeNode'

export interface Props {
  onNodeSelected: (nodeIds: string) => void
}

export default function ExamCategoryTree(props: Props) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

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
    setLoading(true)
    new V1Api().getExamCategories().then((response: any) => {
      setData([{ key: '0', title: 'Tất cả' }, ...response.data.value])
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <LoadingSpinner active={loading}>
      <Grid container spacing={6}>
        <Grid item md={12} lg={12} alignContent={'right'}>
          <TreeView
            style={{ flexGrow: 1, width: '100%' }}
            onNodeSelect={handleSelect}
            onNodeToggle={handleToggle}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            {data && data.map((item: any) => <TreeNode key={item.key} item={item} nodeId={item.key} />)}
          </TreeView>
        </Grid>
      </Grid>
    </LoadingSpinner>
  )
}
