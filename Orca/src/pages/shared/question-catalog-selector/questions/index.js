import React, {
  useEffect,
  useState
} from 'react'

import QuestionApi from 'api/question-api'
import moment from 'moment'
import Link from 'next/link'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
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

import QuestionCategoryTree from '../question-category-tree'

const Questions = props => {
  const { catalogId, onOk, questionCates } = props
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [totalItems, setTotalItems] = useState(0)
  const [selected, setSelected] = useState([]) //selected ids
  const isSelected = id => selected.indexOf(id) !== -1
  const [selectedRecords, setSelectedRecords] = useState([])
  const [keyword, setKeyword] = useState('')
  const [categoryId, setCategoryId] = useState(0)

  const searchQuestion = () => {
    if (!catalogId || catalogId == 0) return

    setLoading(true)
    new QuestionApi()
      .searches({
        catalogId: catalogId,
        questionType: 0,
        categoryId: categoryId,
        keyword: keyword,
        page: page ,
        limit: rowsPerPage
      })
      .then(response => {
        if (response.data.isSuccess) {
          setData(response.data.value)
          setTotalItems(response.data.totalItems)
          setLoading(false)
        }
      })
  }

  useEffect(() => {
    searchQuestion()
  }, [catalogId, categoryId, page, keyword, rowsPerPage])

  const onSelected = () => {
    if (onOk) {
      onOk(selectedRecords)
      setSelected([])
      setSelectedRecords([])
    }
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.id)
      setSelected(newSelecteds)
      setSelectedRecords(data)
      return
    }
    setSelected([])
    setSelectedRecords([])
  }

  const handleSelectClick = (event, name) => {
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

    const selectedRecords = data.filter(item => newSelected.includes(item.id))
    const oldSelectedRecords = [...selectedRecords]
    setSelectedRecords(oldSelectedRecords.concat(selectedRecords))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const onCategoryChanged = nodeId => {
    setCategoryId(parseInt(nodeId))
  }

  return (
    <>
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
            disabled={selected.length == 0}
            color='primary'
            style={{ float: 'right' }}
            type='submit'
            variant='contained'
            onClick={onSelected}
          >
            Chọn
          </Button>
        </Grid>
        <Grid item md={12}>
          <Divider />
        </Grid>

        <Grid item md={12} lg={12}>
          <table style={{ width: '100%' }}>
            <tr>
              <td
                style={{
                  width: '20%',
                  padding: 5,
                  verticalAlign: 'top',
                  borderRight: '1px solid rgba(58, 53, 65, 0.12)'
                }}
              >
                <QuestionCategoryTree
                  onNodeSelected={nodeId => onCategoryChanged(nodeId)}
                  data={[{ id: 0, key: 0, title: 'Tất cả' }, ...questionCates]}
                />
              </td>
              <td style={{ verticalAlign: 'top', padding: 5 }}>
                <TableContainer component={Paper} style={{ marginTop: 5 }}>
                  <LoadingSpinner active={loading}>
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
                          <TableCell align='center' style={{ width: 40 }}>
                            Xem
                          </TableCell>
                          <TableCell style={{ width: 160 }}>Mã</TableCell>
                          <TableCell>Nội dung</TableCell>
                          <TableCell style={{ width: 180 }}>Danh mục</TableCell>
                          <TableCell style={{ width: 180 }}>Loại câu hỏi</TableCell>
                          <TableCell style={{ width: 180 }}>Ngày tạo</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data &&
                          data.map((row, index) => {
                            const isItemSelected = isSelected(row.id)
                            const labelId = `enhanced-table-checkbox-${index}`

                            return (
                              <TableRow
                                hover
                                tabIndex={-1}
                                role='checkbox'
                                key={row.id}
                                selected={isItemSelected}
                                aria-checked={isItemSelected}
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
                                    onClick={event => handleSelectClick(event, row.id)}
                                  />
                                </TableCell>
                                <TableCell component='th' scope='row' align='right'>
                                  <IconButton
                                    component={Link}
                                    href={`/apps/question-catalog/${row.catalogId}/questions/${row.id}`}
                                  >
                                    <Icon icon='mdi:eye-outline' fontSize={20} />
                                  </IconButton>
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                  <Typography variant='body1'>{row.id}</Typography>
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                  {row.shortContent}
                                </TableCell>
                                <TableCell>
                                  {row.categoryName ? (
                                    <Chip
                                      icon={<Icon icon='mdi:tag' />}
                                      label={row.categoryName}
                                      color='secondary'
                                      variant='outlined'
                                    />
                                  ) : null}
                                </TableCell>
                                <TableCell>{row.questionTypeName}</TableCell>
                                <TableCell>
                                  <Typography variant='body1'>
                                    {moment(row.createdTime).format('DD-MM-YYYY HH:mm')}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                      </TableBody>
                    </Table>
                  </LoadingSpinner>
                </TableContainer>
              </td>
            </tr>
          </table>
          <Divider />
          <TablePagination
            labelRowsPerPage='Hiển thị'
            rowsPerPageOptions={[20, 30, 50]}
            component='div'
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Questions
