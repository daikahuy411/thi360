import React, {
  useEffect,
  useState
} from 'react'

import TenantApi from 'api/tenant-api'
import { makeStyles } from 'tss-react/mui'

import Icon from '@core/components/icon'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const useStyles = makeStyles()(theme => {
  return {
    list: {
      width: 450
    },
    fullList: {
      width: 'auto'
    }
  }
})

export default function TenantSelector({ onClose, onNodeSelected = null }) {
  const { classes, cx } = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [selectedData, setSelectedData] = useState()
  const [selectedValue, setSelectedValue] = React.useState(null)
  const [keyword, setKeyword] = useState(null)

  const handleChange = event => {
    const selectedId = parseInt(event.target.value)
    setSelectedValue(selectedId)
    setSelectedData(data.find(x => x.id == selectedId))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage, keyword])

  const fetchData = () => {
    new TenantApi().searches({ page: page, keyword: keyword, limit: rowsPerPage }).then(response => {
      if (response.data.isSuccess) {
        setData(response.data.value)
        setTotalItem(response.data.totalItems)
      }
    })
  }

  const onOk = () => {
    if (selectedData) {
      onNodeSelected(selectedData)
      onClose()
    }
  }

  return (
    <Drawer onClose={onClose} anchor={'right'} open={true}>
      <div
        style={{
          width: 680
        }}
      >
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(3.5, 5),
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            marginBottom: 2
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            Chọn Tenant
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
              disabled={selectedValue ? false : true}
              color='primary'
              style={{ float: 'right' }}
              type='submit'
              variant='contained'
              onClick={() => {
                if (onOk) {
                  onOk()
                  onClose()
                }
              }}
            >
              Chọn
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <TableContainer component={Paper} style={{ marginTop: 5 }}>
              <Table sx={{}} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 30 }}>STT </TableCell>
                    <TableCell style={{ width: 60 }}>Chọn</TableCell>
                    <TableCell>Tên</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data.map((item, index) => (
                      <TableRow
                        key={item.name}
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Radio
                            checked={selectedValue === item.id}
                            onChange={handleChange}
                            value={item.id}
                            name='radio-buttons'
                            inputProps={{ 'aria-label': 'A' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1'>
                            [{item.id}]-{item.name}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage={'Hiển thị:'}
              rowsPerPageOptions={[20, 30, 50]}
              component='div'
              count={totalItem}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </div>
    </Drawer>
  )
}
