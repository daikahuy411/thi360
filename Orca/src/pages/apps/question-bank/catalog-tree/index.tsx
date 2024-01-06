import React, {
  useEffect,
  useState
} from 'react'

import QuestionCatalogApi from 'api/question-catalog-api'

// import {
//   SampleTree,
//   Tree
// } from 'react-lazy-paginated-tree'
import LoadingSpinner from '@core/components/loading-spinner'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import TreeView from '@mui/lab/TreeView'
import Grid from '@mui/material/Grid'
import TablePagination from '@mui/material/TablePagination'
import TextField from '@mui/material/TextField'

import TreeNode from './TreeNode'

export interface Props {
  onNodeSelected: (nodeIds: string) => void
}

export default function QuestionCatalogTree(props: Props) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [totalItems, setTotalItems] = useState(0)
  const [keyword, setKeyword] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

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
    new QuestionCatalogApi().getCatalogTree({ page: page, keyword: keyword }).then((response: any) => {
      setData([{ id: 0, name: 'Tất cả Bộ Câu hỏi' }, ...response.data.value])
      setTotalItems(response.data.totalItems)
    })
  }

  useEffect(() => {
    fetchData()
  }, [keyword, page, rowsPerPage])

  return (
    <LoadingSpinner active={loading}>
      <Grid container spacing={6}>
        <Grid item md={12} lg={12} alignContent={'center'}>
          <TextField
            fullWidth
            placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'
            onChange={e => setKeyword(e.target.value)}
            size='small'
          />
        </Grid>
        {/* <Grid item>
          <Tree nodes={SampleTree} useLocalState={true} />
        </Grid> */}
        <Grid item md={12} lg={12} alignContent={'right'}>
          <TreeView
            style={{ flexGrow: 1, width: '100%' }}
            onNodeSelect={handleSelect}
            onNodeToggle={handleToggle}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            {data && data.map((item: any) => <TreeNode key={item.id} item={item} nodeId={item.id} />)}
          </TreeView>
        </Grid>
        <Grid item md={12} lg={12} alignContent={'right'}>
          <TablePagination
            labelRowsPerPage='Hiển thị'
            rowsPerPageOptions={[]}
            component='div'
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </LoadingSpinner>
  )
}
