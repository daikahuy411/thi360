import { useState } from 'react'

import TestGroupSectionApi from 'api/test-group-section-api'
import TestGroupSectionItemApi from 'api/test-group-section-item-api'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Draggable from 'react-draggable'
import toast from 'react-hot-toast'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import { selectTestGroupSection } from 'store/slices/testGroupSectionSlice'
import { selectedTestGroup } from 'store/slices/testGroupSlice'

import Icon from '@core/components/icon'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const ItemsTable = ({ data }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { testGroupId, sectionId } = router.query
  const currentTestGroup = useSelector(selectedTestGroup)

  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = () => {
    if (selected.length > 0) {
      new TestGroupSectionItemApi()
        .deleteMultiple(selected)
        .then(response => {
          setOpenDelete(false)
          if (response.data.isSuccess) {
            toast.success('Xóa dữ liệu thành công.')
            setSelected([])
            new TestGroupSectionApi().get(sectionId).then(response => {
              dispatch(selectTestGroupSection(response.data))
            })
          }
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }

  /*
   * handle checkbox
   */
  const [selected, setSelected] = useState([])
  const isSelected = name => selected.indexOf(name) !== -1

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.id)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }
  /*
   * end handle checkbox
   */

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
        {/* &nbsp; &nbsp;
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
        </Tooltip> */}
        &nbsp; &nbsp;
        <Tooltip title='Delete'>
          <IconButton
            sx={{ color: 'text.secondary' }}
            onClick={handleClickOpenDelete}
            disabled={selected.length > 0 ? false : true}
          >
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </Tooltip>
        &nbsp; &nbsp;
        <Button
          variant='contained'
          component={Link}
          href={`/apps/test-group/${testGroupId}/sections/${sectionId}/items/0`}
          style={{ width: 180 }}
          color='primary'
          startIcon={<Icon icon='mdi:plus' />}
        >
          Cấu hình
        </Button>
      </Toolbar>
      <Divider />
      {/* <Grid container>
        <Grid item md={3} lg={3}>
          <IconButton aria-label='filter' style={{ display: 'none' }}>
            <FilterAltOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item md={3} lg={3}>
          <TextField
            fullWidth
            placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'
            onChange={e => setKeyword(e.target.value)}
            size='small'
          />
        </Grid>
      </Grid> */}
      <TableContainer component={Paper} style={{ marginTop: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  onChange={handleSelectAllClick}
                  checked={data.length > 0 && selected.length === data.length}
                  indeterminate={selected.length > 0 && selected.length < data.length}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </TableCell>
              <TableCell style={{ width: 30 }}>Sửa</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Loại cấu hình</TableCell>
              <TableCell>Số câu hỏi</TableCell>
              <TableCell style={{ width: 180}}>Ngày tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow
                    key={row.name}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': {
                        border: 0
                      }
                    }}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={event => handleClick(event, row.id)}
                      />
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <IconButton
                        aria-label='filter'
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
                      <Typography variant='body1'>{row.typeName}</Typography>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <Typography variant='body1'>{row.numberOfQuestion}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>{moment(row.createdTime).format('DD-MM-YYYY HH:mm')}</Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Xác nhận
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa phần thi đã chọn không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDelete}>
            {' '}
            Hủy bỏ{' '}
          </Button>
          <Button onClick={handleDelete} color='error'>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ItemsTable
