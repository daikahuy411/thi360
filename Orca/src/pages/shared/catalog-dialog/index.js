import React, {
  useEffect,
  useState
} from 'react'

import CatalogApi from 'api/catalog-api'
import OrganizationApi from 'api/organization-api'
import { CatalogType } from 'types/CatalogType'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import CatalogTree from './tree-view'

// catalogId: avaiable trong trường hợp là QuestionCategory
export default function CatalogDialog({
  categoryType,
  open,
  onClose,
  catalogId = 0,
  currentId = 0,
  onNodeSelected = null
}) {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [loading, setLoading] = useState(false)
  const [selectedNodeId, setSelectedNodeId] = useState(0)

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    const param = {
      catalogId: catalogId,
      page: page,
      limit: rowsPerPage
    }
    setLoading(true)

    if (categoryType === CatalogType.DEPARTMENT) {
      new OrganizationApi().getOrganizationTree().then(response => {
        setData(response.data.value)
        setLoading(false)
      })
    } else {
      new CatalogApi(categoryType).searches().then(response => {
        setData(response.data.value)
        setLoading(false)
      })
    }
  }

  const handleNodeSelected = nodeId => {
    setSelectedNodeId(nodeId)
  }

  const onOk = () => {
    if (onNodeSelected) {
      onNodeSelected(selectedNodeId)
      onClose()
    }
  }

  return (
    <Drawer anchor='right' onClose={onClose} open={open} variant='temporary' style={{ overflowY: 'unset' }}>
      <>
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(3.5, 5),
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            marginBottom: 2
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, fontSize: 18, textTransform: 'uppercase' }}>
            Danh mục
          </Typography>
          <IconButton
            onClick={() => onClose()}
            sx={{
              right: 20,
              top: '50%',
              position: 'absolute',
              color: 'text.secondary',
              transform: 'translateY(-50%)'
            }}
          >
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
        <Grid container>
          <Grid item md={4}>
            <IconButton aria-label='filter' style={{ display: 'none' }}>
              <FilterAltOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item md={4}>
            <TextField
              fullWidth
              placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'
              onChange={e => setKeyword(e.target.value)}
              size='small'
            />
          </Grid>
          <Grid item md={4} alignContent={'right'} alignItems={'right'}>
            <Button
              disabled={selectedNodeId == 0}
              color='primary'
              style={{ float: 'right' }}
              type='submit'
              variant='contained'
              onClick={() => {
                if (onOk) {
                  onOk()
                }
              }}
            >
              Chọn
            </Button>
          </Grid>
          <Grid item md={12} style={{ width: 260 }}>
            <Divider />
            <div style={{ overflowY: 'scroll', height: `calc(100vh - 130px)` }}>
              <TableContainer component={Paper} style={{ marginTop: 5, padding: 20 }}>
                <LoadingSpinner active={loading}>
                  {data && <CatalogTree onNodeSelected={nodeId => handleNodeSelected(nodeId)} data={data} />}
                </LoadingSpinner>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </>
    </Drawer>
  )
}
