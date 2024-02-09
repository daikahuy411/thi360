import React, {
  useEffect,
  useState
} from 'react'

import QuestionCatalogApi from 'api/question-catalog-api'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FolderIcon from '@mui/icons-material/Folder'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
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

export default function QuestionCatalogDialog({ onClose, onOk }) {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [loading, setLoading] = useState(false)
  const [questionCatalogKeyword, setQuestionCatalogKeyword] = useState('')
  const [totalQuestionCatalog, setTotalQuestionCatalog] = useState(0)
  const [folderId, setFolderId] = useState(0)
  const [currentFolder, setCurrentFolder] = useState(null)
  const [currentCatalog, setCurrentCatalog] = useState(null)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    searchQuestionCatalogs()
    if (folderId == 0) {
      setCurrentFolder(null)
    } else {
      new QuestionCatalogApi().get(folderId).then(response => {
        setCurrentFolder(response.data)
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

  return (
    <>
      <Drawer anchor='right' onClose={onClose} open={true} variant='temporary' style={{ overflowY: 'unset' }}>
        <div style={{ width: 680 }}>
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
              Bộ Câu hỏi
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
          <div style={{ padding: 10 }}>
            {currentFolder && (
              <>
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
                          setCurrentFolder(null)
                          setFolderId(0)
                        }}
                      >
                        Bộ Câu hỏi
                      </Button>
                      {currentFolder.ancestors &&
                        currentFolder.ancestors.map(item => (
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
                      <Typography color='text.primary'>{currentFolder.name}</Typography>
                    </Breadcrumbs>
                  </Grid>
                </Grid>
                <Divider />
              </>
            )}
            <TableContainer component={Paper} style={{ marginTop: 5 }}>
              <LoadingSpinner active={loading}>
                <Grid container justifyContent='center' alignItems='center'>
                  <Grid item xs={12} md={12} lg={12}>
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
                          onChange={e => setQuestionCatalogKeyword(e.target.value)}
                          size='small'
                        />
                      </Grid>
                      <Grid item md={4}>
                        <Button
                          disabled={currentCatalog ? false : true}
                          color='primary'
                          style={{ float: 'right' }}
                          type='submit'
                          variant='contained'
                          onClick={() => {
                            if (onOk) {
                              onOk(currentCatalog)
                              onClose()
                            }
                          }}
                        >
                          Chọn
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Table sx={{}} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ width: 30 }}>STT </TableCell>
                          <TableCell style={{ width: 50 }}> </TableCell>
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
                              <TableCell>
                                <Radio
                                  checked={currentCatalog && currentCatalog.id === item.id}
                                  disabled={item.type == 1}
                                  onChange={e => {
                                    setCurrentCatalog(e.target.value ? item : null)
                                  }}
                                  value={item.id}
                                  name='radio-buttons'
                                  inputProps={{ 'aria-label': 'A' }}
                                />
                              </TableCell>
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
                                <TableCell style={{ cursor: 'pointer' }}>
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
                  <Grid item xs={12} md={12} lg={12}>
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
          </div>
        </div>
      </Drawer>
    </>
  )
}
