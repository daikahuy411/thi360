import React, {
  useEffect,
  useState
} from 'react'

import CatalogApi from 'api/catalog-api'
import QuestionCatalogApi from 'api/question-catalog-api'
import { CategoryType } from 'types/CategoryType'

import LoadingSpinner from '@core/components/loading-spinner'
import CloseIcon from '@mui/icons-material/Close'
import FolderIcon from '@mui/icons-material/Folder'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
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
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import QuestionCategoryTree from './question-category-tree'
import Questions from './questions'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function QuestionCatalogSelector({ open, onClose, onOk, type = 2 }) {
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
  const [totalQuestionCatalog, setTotalQuestionCatalog] = useState(0)

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
    new QuestionCatalogApi().searches({ page: page, limit: rowsPerPage }).then(response => {
      setData(response.data.value)
      setTotalQuestionCatalog(response.data.totalItems)
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
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          {step == 1 && (
            <Typography sx={{ ml: 2, flex: 1, color: 'white', fontWeight: 400, textTransform: 'uppercase' }}>
              Chọn Bộ Câu hỏi
            </Typography>
          )}
          {step == 2 && type == 4 && (
            <Typography sx={{ ml: 2, flex: 1, color: 'white', fontWeight: 400, textTransform: 'uppercase' }}>
              Chọn Danh mục Câu hỏi
            </Typography>
          )}
          {step == 2 && type == 2 && (
            <Typography sx={{ ml: 2, flex: 1, color: 'white', fontWeight: 400, textTransform: 'uppercase' }}>
              Chọn Câu hỏi
            </Typography>
          )}
          <IconButton edge='start' color='inherit' onClick={onClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <LoadingSpinner active={loading}>
        <div style={{ padding: 10 }}>
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
                <StepButton color='inherit'>
                  {type == 4 && <>Chọn Danh mục câu hỏi</>}
                  {type == 2 && <>Chọn Câu hỏi</>}
                </StepButton>
              </Step>
            </Stepper>
          </Box>
          <Divider />
          {step == 1 && (
            <Grid container>
              <Grid item xs={12}>
                <TableContainer component={Paper} style={{ marginTop: 5 }}>
                  <LoadingSpinner active={loading}>
                    <Grid container justifyContent='center' alignItems='center'>
                      <Grid item xs={12} md={10} lg={8}>
                        <Grid container>
                          <Grid item md={6} alignItems={'center'}>
                            <Typography
                              sx={{ flex: '1 1 100%', verticalAlign: 'middle', paddingTop: 3 }}
                              variant='p'
                              component='div'
                            >
                              {totalQuestionCatalog} Bộ Câu hỏi
                            </Typography>
                          </Grid>
                          <Grid item md={6}>
                            <TextField
                              fullWidth
                              placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'
                              onChange={e => setKeyword(e.target.value)}
                              size='small'
                            />
                          </Grid>
                        </Grid>
                        <Divider />
                      </Grid>
                      <Grid item xs={12} md={10} lg={8}>
                        <Table sx={{}} aria-label='simple table'>
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ width: 30 }}>STT </TableCell>
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
                                  <TableCell align='center'>{index + 1}</TableCell>
                                  <TableCell
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                      browseTestGroup(item)
                                    }}
                                  >
                                    {item.type == 1 && (
                                      <Typography variant='body1'>
                                        <FolderIcon /> &nbsp;
                                        {item.name}
                                      </Typography>
                                    )}
                                    {item.type != 1 && <Typography variant='body1'>{item.name}</Typography>}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </Grid>
                      <Grid item xs={12} md={10} lg={8}>
                        <Divider />
                        <TablePagination
                          rowsPerPageOptions={[10, 20, 30, 50]}
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
                  </LoadingSpinner>
                </TableContainer>
              </Grid>
            </Grid>
          )}
          {step == 2 && selectedQuestionCatalog != null && type == 4 && questionCates && (
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              style={{
                padding: 10,
                backgroundColor: '#f5f5f5'
              }}
            >
              <Grid item xs={12} md={10} lg={8}>
                <Grid container>
                  <Grid item md={4} alignItems={'center'}>
                    <Typography
                      sx={{ flex: '1 1 100%', verticalAlign: 'middle', paddingTop: 3 }}
                      variant='p'
                      component='div'
                    >
                      {totalQuestionCatalog} Bộ Câu hỏi
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      fullWidth
                      placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'
                      onChange={e => setKeyword(e.target.value)}
                      size='small'
                    />
                  </Grid>
                  <Grid item md={4}>
                    <Button
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
              </Grid>
              <Grid item xs={12} md={10} lg={8}>
                <QuestionCategoryTree data={questionCates} />
              </Grid>
            </Grid>
          )}
          {step == 2 && selectedQuestionCatalog != null && type == 2 && questionCates && (
            <Questions
              onOk={onQuestionsSelected}
              questionCates={questionCates}
              catalogId={selectedQuestionCatalog.id}
            />
          )}
        </div>
      </LoadingSpinner>
    </Dialog>
  )
}
