import React, {
  useEffect,
  useState
} from 'react'

import CatalogApi from 'api/catalog-api'
import QuestionCatalogApi from 'api/question-catalog-api'
import { CategoryType } from 'types/CategoryType'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Stepper from '@mui/material/Stepper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import Questions from './Questions'
import TreeRow from './TreeRow'

export default function QuestionCatalogSelector({ onClose, onOk, type = 2 }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [selectedData, setSelectedData] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedQuestionCatalog, setSelectedQuestionCatalog] = useState(null)
  const [loading, setLoading] = useState(false)
  const [questionCates, setQuestionCates] = useState([])
  const [totalQuestionCates, setTotalQuestionCates] = useState(0)
  const [selectedNodeId, setSelectedNodeId] = useState(0)
  const [selectedNodeIds, setSelectedNodeIds] = useState([0])
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [step, setStep] = useState(1)
  const [keyword, setKeyword] = useState('')

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

  const loadQuestionCates = item => {
    const param = {
      keyword: keyword,
      catalogId: item.id,
      page: page == 0 ? 1 : page + 1,
      limit: rowsPerPage
    }
    setLoading(true)
    new CatalogApi(CategoryType.QUESTION_CATEGORY).searches(param).then(response => {
      setQuestionCates(response.data.value)
      setTotalQuestionCates(response.data.totalItems)
      setLoading(false)
    })
  }

  const browseTestGroup = item => {
    setSelectedNodeId(0)
    setSelectedQuestionCatalog(item)
    loadQuestionCates(item)
    setStep(2)
  }

  const handleNodeSelected = item => {
    if (type == 4) {
      setSelectedNodeId(item.key)
      setSelectedNode(item)
    } else {
      setSelectedNodeIds(item)
    }
  }

  useEffect(() => {
    setLoading(true)
    new QuestionCatalogApi().searches({ page: page }).then(response => {
      setData(response.data.value)
      setLoading(false)
    })
  }, [])

  /// Choose Question Category (nếu là chọn Câu hỏi, sẽ chuyển sang bước 3)
  /// Nếu chọn Danh mục câu hỏi, kết thúc
  const onSelected = items => {
    if (onOk) {
      if (type == 2) {
        setStep(3)
      } else {
        onOk(selectedNode)
      }
    }
  }

  const onQuestionsSelected = items => {
    if (onOk) {
      onOk(items)
    }
  }

  return (
    <Drawer onClose={onClose} anchor={'right'} open={true}>
      <div
        style={{
          width: 980
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
          {step == 1 && (
            <Typography variant='h6' sx={{ fontWeight: 400, textTransform: 'uppercase' }}>
              Chọn Bộ Câu hỏi
            </Typography>
          )}
          {step == 2 && (
            <Typography variant='h6' sx={{ fontWeight: 400, textTransform: 'uppercase' }}>
              Chọn Danh mục Câu hỏi
            </Typography>
          )}
          {step == 3 && (
            <Typography variant='h6' sx={{ fontWeight: 400, textTransform: 'uppercase' }}>
              Chọn Câu hỏi
            </Typography>
          )}
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
        <Box>
          <Stepper nonLinear alternativeLabel>
            <Step key={'choose-catalog'} active={true} size='small'>
              <StepButton
                onClick={() => {
                  setStep(1)
                  setSelectedQuestionCatalog(null)
                }}
                color='inherit'
              >
                Chọn Bộ câu hỏi
              </StepButton>
            </Step>
            <Step
              key={'choose-category'}
              active={selectedQuestionCatalog != null}
              onClick={() => {
                setStep(2)
              }}
            >
              <StepButton color='inherit'>Chọn Danh mục câu hỏi</StepButton>
            </Step>
            {type == 2 && (
              <Step key={'choose-question'} active={step === 3}>
                <StepButton color='inherit'>Chọn Câu hỏi</StepButton>
              </Step>
            )}
          </Stepper>
        </Box>
        <Divider />
        {step == 1 && (
          <Grid container>
            <Grid item md={4}>
              <IconButton aria-label='filter' style={{display: 'none'}}>
                <FilterAltOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item md={4}>
              <TextField fullWidth placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'  onChange={e => setKeyword(e.target.value)} size='small' />
            </Grid>
            <Grid item md={4} alignContent={'right'} alignItems={'right'}></Grid>
            <Grid item xs={12}>
              <Divider />
              <TableContainer component={Paper} style={{ marginTop: 5 }}>
                <LoadingSpinner active={loading}>
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
                            hover
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
                                  browseTestGroup(item)
                                }}
                              >
                                <ChevronRightIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                browseTestGroup(item)
                              }}
                            >
                              <Typography variant='body1'>{item.name}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </LoadingSpinner>
              </TableContainer>
              <Divider />
              <TablePagination
                rowsPerPageOptions={[20, 30, 50]}
                labelRowsPerPage='Hiển thị'
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
        {step == 2 && selectedQuestionCatalog != null && (
          <>
            <Grid container>
              <Grid item md={4}>
                <IconButton aria-label='filter' style={{display: 'none'}}>
                  <FilterAltOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid item md={4}>
                <TextField fullWidth placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'  onChange={e => setKeyword(e.target.value)} size='small' />
              </Grid>
              <Grid item md={4} alignContent={'right'} alignItems={'right'}>
                <Button
                  disabled={(type == 4 && selectedNodeId == 0) || (type == 2 && selectedNodeIds.length == 0)}
                  color='primary'
                  style={{ float: 'right' }}
                  type='submit'
                  variant='contained'
                  onClick={onSelected}
                >
                  Chọn
                </Button>
              </Grid>
            </Grid>
            <Divider />
            <TableContainer component={Paper} style={{ marginTop: 5 }}>
              <LoadingSpinner active={loading}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 60 }}>Chọn</TableCell>
                      <TableCell>Tên</TableCell>
                      <TableCell align='right' style={{ width: 180 }}>
                        Ngày tạo
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {type == 2 && questionCates && (
                      <TreeRow
                        mode={'multi'}
                        onSelected={handleNodeSelected}
                        selectedValue={selectedNodeId}
                        key={'all-category-1'}
                        item={{ key: 0, title: 'Tất cả', children: [...questionCates] }}
                        currentId={-1}
                        level={0}
                      />
                    )}
                    {type == 4 &&
                      questionCates &&
                      questionCates.map((item, index) => (
                        <TreeRow
                          mode={type == 4 ? 'single' : 'multi'}
                          onSelected={handleNodeSelected}
                          selectedValue={selectedNodeId}
                          key={index}
                          item={item}
                          currentId={-1}
                          level={0}
                        />
                      ))}
                  </TableBody>
                </Table>
              </LoadingSpinner>
            </TableContainer>
            <TablePagination
              labelRowsPerPage='Hiển thị'
              rowsPerPageOptions={[20, 30, 50]}
              component='div'
              count={totalQuestionCates}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
        {step === 3 && <Questions onOk={onQuestionsSelected} catalogId={selectedQuestionCatalog.id} />}
      </div>
    </Drawer>
  )
}
