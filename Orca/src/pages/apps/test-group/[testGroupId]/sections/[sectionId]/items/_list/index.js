import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedTestGroup } from 'store/slices/testGroupSlice'

import Icon from '@core/components/icon'
import EditIcon from '@mui/icons-material/Edit'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

const ItemsTable = ({ data }) => {
  const router = useRouter()
  const { testGroupId, sectionId } = router.query
  const currentTestGroup = useSelector(selectedTestGroup)

  // useEffect(() => {
  //   if (!testGroupId || testGroupId == 0) return
  //   if (currentTestGroup && currentTestGroup.id > 0) {
  //     var section = currentTestGroup.sections.find(x => x.id === parseInt(sectionId))
  //     setData(section.items || [])
  //   }
  // }, [testGroupId, sectionId])

  return (
    <>
      <Toolbar style={{ padding: 0 }}>
        <Typography sx={{ flex: '1 1 50%' }} variant='h5' id='tableTitle' component='div'>
          {data.length} Cấu hình
        </Typography>
        &nbsp; &nbsp;
        <Tooltip title='Import'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='mdi:upload' />
          </IconButton>
        </Tooltip>
        &nbsp; &nbsp;
        <Tooltip title='Import'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='mdi:download' />
          </IconButton>
        </Tooltip>
        &nbsp; &nbsp;
        <Tooltip title='Delete'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </Tooltip>
        &nbsp; &nbsp;
        <Button
          variant='contained'
          component={Link}
          href={`/apps/test-group/${testGroupId}/sections/${sectionId}/items/add`}
          style={{ width: 180 }}
          color='primary'
          startIcon={<Icon icon='mdi:plus' />}
        >
          Cấu hình
        </Button>
      </Toolbar>
      <Divider />
      <Grid container>
        <Grid item md={3} lg={3}>
          <IconButton aria-label='filter' style={{display: 'none'}}>
            <FilterAltOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item md={3} lg={3}>
          <TextField fullWidth placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'  onChange={e => setKeyword(e.target.value)} size='small' />
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  // onChange={onSelectAllClick}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                // indeterminate={numSelected > 0 && numSelected < rowCount}
                />
              </TableCell>
              <TableCell style={{ width: 30 }}>Sửa</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Loại cấu hình</TableCell>
              <TableCell>Số câu hỏi</TableCell>
              <TableCell style={{ width: 180 }}>Ngày tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map(row => (
                <TableRow
                  key={row.name}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0
                    }
                  }}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox />
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <IconButton
                      aria-label='filter' style={{display: 'none'}}
                      component={Link}
                      href={`/apps/test-group/${testGroupId}/sections/${sectionId}/items/${row.id}`}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Typography variant='body1'>{row.name}</Typography>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.typeName}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.numberOfQuestion}
                  </TableCell>
                  <TableCell>{moment(row.createdTime).format('DD-MM-YYYY HH:mm')}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ItemsTable
