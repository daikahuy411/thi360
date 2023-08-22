import React, { useEffect, useState } from 'react'

import QuestionCatalogApi from 'api/question-catalog-api'
import { makeStyles } from 'tss-react/mui'

import Icon from '@core/components/icon'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
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

export default function QuestionCatalogSelector({ onClose, onOk }) {
  const { classes, cx } = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedData, setSelectedData] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedTestGroup, setSelectedTestGroup] = useState(null)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const handleSelectAll = event => {
    const selected = event.target.checked ? data.map(t => t.id) : []
    setSelectedData(selected)
    if (event.target.checked) {
      var newSelected = selectedUsers
      newSelected.push(...data)
      setSelectedUsers(newSelected)
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectOne = (event, user) => {
    const id = user.id
    const selectedIndex = selectedData.indexOf(id)
    let newSelectedData = []
    if (selectedIndex === -1) {
      newSelectedData = newSelectedData.concat(selectedData, id)
    } else if (selectedIndex === 0) {
      newSelectedData = newSelectedData.concat(selectedData.slice(1))
    } else if (selectedIndex === selectedData.length - 1) {
      newSelectedData = newSelectedData.concat(selectedData.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelectedData = newSelectedData.concat(
        selectedData.slice(0, selectedIndex),
        selectedData.slice(selectedIndex + 1)
      )
    }
    setSelectedData(newSelectedData)

    var newSelectedUsers = selectedUsers
    if (selectedIndex === -1) {
      newSelectedUsers.push(user)
    } else {
      newSelectedUsers = newSelectedUsers.filter(x => x.id != id)
    }
    setSelectedUsers(newSelectedUsers)
  }

  useEffect(() => {
    new QuestionCatalogApi().getAll().then(response => {
      setData(response.data)
    })
  }, [])

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
            Chọn Bộ Câu hỏi
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
        {!selectedTestGroup && (
          <Grid container>
            <Grid item md={4}>
              <IconButton aria-label='filter'>
                <FilterAltOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item md={4}>
              <TextField fullWidth placeholder='Tìm kiếm' size='small' />
            </Grid>
            <Grid item md={4} alignContent={'right'} alignItems={'right'}></Grid>
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
                            <IconButton
                              onClick={() => {
                                setSelectedTestGroup(item)
                              }}
                            >
                              <ChevronRightIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        )}
        {selectedTestGroup && (
          <>
            <ListItem button onClick={() => setSelectedTestGroup(null)}>
              <ListItemText primary='Back to main menu' />
              <ChevronLeftIcon />
            </ListItem>
            <b>Show category of {selectedTestGroup.name}</b>
          </>
        )}
      </div>
    </Drawer>
  )
}
