import React, {
  useEffect,
  useState
} from 'react'

import CatalogApi from 'api/catalog-api'
import QuestionCatalogApi from 'api/question-catalog-api'
import { CatalogType } from 'types/CatalogType'

import LoadingSpinner from '@core/components/loading-spinner'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import FolderIcon from '@mui/icons-material/Folder'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'
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
  const [selectedQuestionCatalog, setSelectedQuestionCatalog] = useState(null)
  const [loading, setLoading] = useState(false)
  const [questionCates, setQuestionCates] = useState([])
  const [totalQuestionCates, setTotalQuestionCates] = useState(0)
  const [selectedNodeId, setSelectedNodeId] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [step, setStep] = useState(1)
  const [questionCatalogKeyword, setQuestionCatalogKeyword] = useState('')
  const [totalQuestionCatalog, setTotalQuestionCatalog] = useState(0)
  const [categoryId, setCategoryId] = useState(0)
  const [showQuestionAdded, setShowQuestionAdded] = useState(false)
  const [folderId, setFolderId] = useState(0)
  const [currentQuestionCatalogFolder, setCurrentQuestionCatalogFolder] = useState(null)
  const [categoryKeyword, setCategoryKeyword] = useState('')

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

  const loadQuestionCates = item => {
    const param = {
      keyword: '',
      catalogId: item.id,
      page: page,
      limit: rowsPerPage
    }
    setLoading(true)
    new CatalogApi(CatalogType.QUESTION_CATEGORY).searches(param).then(response => {
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
    new QuestionCatalogApi().get(item.id).then(response => {
      setCurrentQuestionCatalogFolder(response.data)
    })
  }

  useEffect(() => {
    searchQuestionCatalogs()

    if (folderId == 0) {
      setCurrentQuestionCatalogFolder(null)
      setSelectedCategory(null)
    } else {
      new QuestionCatalogApi().get(folderId).then(response => {
        setCurrentQuestionCatalogFolder(response.data)
      })
    }
  }, [folderId, questionCatalogKeyword])

  const searchQuestionCatalogs = () => {
    setLoading(true)
    new QuestionCatalogApi()
      .searches({
        folderId: folderId,
        page: page,
        limit: rowsPerPage
      })
      .then(response => {
        setData(response.data.value)
        setTotalQuestionCatalog(response.data.totalItems)
        setLoading(false)
      })
  }

  /// Choose Question Category (nếu là chọn Câu hỏi, sẽ chuyển sang bước 3)
  /// Nếu chọn Danh mục câu hỏi, kết thúc
  const onSelected = items => {
    if (onOk) {
      if (type == 2) {
        setStep(3)
      } else {
        onOk(categoryId)
      }
    }
  }

  const onQuestionsSelected = items => {
    if (onOk) {
      onOk(items)
      setShowQuestionAdded(true)
    }
  }

  const onCategorySelected = nodeId => {
    setCategoryId(parseInt(nodeId))
  }

  return (
    <>
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
        <div style={{ padding: 10 }}>
          <Box>
            <Stepper nonLinear alternativeLabel>
              <Step key={'choose-catalog'} active={true} size='small'>
                <StepButton
                  onClick={() => {
                    setStep(1)
                    setSelectedQuestionCatalog(null)
                    setCurrentQuestionCatalogFolder(null)
                    setFolderId(0)
                    setCategoryId(0)
                  }}
                  color='inherit'
                >
                  Bộ câu hỏi
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
          {currentQuestionCatalogFolder && (
            <>
              <Grid container justifyContent='center' alignItems='center' style={{ paddingTop: 5, paddingBottom: 5 }}>
                <Grid item xs={12} md={10} lg={8}>
                  <Grid container>
                    <Grid item md={12} lg={12} sm={12} alignItems={'center'}>
                      <Breadcrumbs
                        aria-label='breadcrumb'
                        style={{ borderTop: '0px solid rgba(58, 53, 65, 0.12)', paddingTop: 0 }}
                      >
                        <Button
                          underline='hover'
                          color='primary'
                          onClick={() => {
                            setStep(1)
                            setSelectedQuestionCatalog(null)
                            setCurrentQuestionCatalogFolder(null)
                            setFolderId(0)
                            setCategoryId(0)
                          }}
                        >
                          Bộ Câu hỏi
                        </Button>
                        {currentQuestionCatalogFolder.ancestors &&
                          currentQuestionCatalogFolder.ancestors.map(item => (
                            <Button
                              underline='hover'
                              key={`l-${item.id}`}
                              color='primary'
                              onClick={() => {
                                setFolderId(item.id)
                              }}
                            >
                              {item.name}
                            </Button>
                          ))}
                        <Typography color='text.primary'>{currentQuestionCatalogFolder.name}</Typography>
                      </Breadcrumbs>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
            </>
          )}
          {/* BƯỚC I:  Chọn Bộ Câu hỏi */}
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
                              onChange={e => setQuestionCatalogKeyword(e.target.value)}
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
                              <TableCell style={{ width: 50 }}> </TableCell>
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
                                  {item.type == 1 && (
                                    <TableCell
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => {
                                        setFolderId(item.id)
                                      }}
                                    >
                                      <Typography variant='body1'>
                                        <FolderIcon /> &nbsp;
                                        {item.name}
                                      </Typography>
                                    </TableCell>
                                  )}
                                  {item.type != 1 && (
                                    <TableCell
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => {
                                        browseTestGroup(item)
                                      }}
                                    >
                                      {item.type != 1 && <Typography variant='body1'>{item.name}</Typography>}
                                    </TableCell>
                                  )}
                                  <TableCell>
                                    <ChevronRightIcon />
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

          {/* BƯỚC II:  Chọn Danh mục câu hỏi/ Câu hỏi dựa vào type của Option 
                1. Type=4: danh mục câu hỏi
                2. Type=2: chọn đích danh câu hỏi
            */}
          {step == 2 && selectedQuestionCatalog != null && type == 4 && (
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              style={{
                padding: 10
              }}
            >
              <Grid item xs={12} md={10} lg={8}>
                <Divider />
              </Grid>
              <Grid item xs={12} md={10} lg={8}>
                <Grid container>
                  <Grid item md={4} alignItems={'center'}>
                    {questionCates && (
                      <Typography
                        sx={{ flex: '1 1 100%', verticalAlign: 'middle', paddingTop: 3 }}
                        variant='p'
                        component='div'
                      >
                        {questionCates.length} Danh mục Câu hỏi
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      fullWidth
                      placeholder='Tìm kiếm, nhập ít nhất 3 ký tự'
                      onChange={e => setCategoryKeyword(e.target.value)}
                      size='small'
                    />
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      color='primary'
                      style={{ float: 'right' }}
                      type='submit'
                      disabled={categoryId == 0}
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
                <LoadingSpinner active={loading}>
                  <QuestionCategoryTree
                    onNodeSelected={nodeId => onCategorySelected(parseInt(nodeId))}
                    data={questionCates}
                  />
                </LoadingSpinner>
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
        <Snackbar
          open={showQuestionAdded}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={2000}
          message='Đã thêm câu hỏi'
          onClose={() => {
            setShowQuestionAdded(false)
          }}
        />
      </Dialog>
    </>
  )
}
