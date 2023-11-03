import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import TestingApi from 'api/testing-api'
import LoadingSpinner from '@core/components/loading-spinner'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function TestAttemptHistoryDialog({ onClose, open, test }) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!test) return
    fetchData()
  }, [test])

  const fetchData = () => {
    setLoading(true)
    new TestingApi()
      .UserExamAttemptHistory({ testId: test.id, examId: test.examId, examItemId: test.examItemId })
      .then(response => {
        const data = response.data
        if (data.isSuccess) {
          setData(data.value)
          setLoading(false)
        }
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
      })
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          {test && (
            <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
              Lịch sử thi - {test.name}
            </Typography>
          )}
          <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <LoadingSpinner active={loading}>
        <div style={{ padding: 10 }}>
          <div className='table-responsive table-border'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th style={{ width: 30, textAlign: 'center' }}>STT</th>
                  <th style={{ width: 80 }}>Câu đúng</th>
                  <th style={{ width: 80 }}>Câu sai</th>
                  <th style={{ width: 80 }}>Chưa trả lời</th>
                  <th style={{ width: 160 }}>Điểm</th>
                  <th style={{ width: 90 }}>Trạng thái</th>
                  <th style={{ width: 120 }}>Bắt đầu</th>
                  <th style={{ width: 120 }}>Kết thúc</th>
                  <th style={{ textAlign: 'left', width: 80 }}>Thao tác</th>
                </tr>
              </thead>
              <tbody className='table-border-bottom-0'>
                {data &&
                  data.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td>{row.totalCorrectQuestion}</td>
                      <td>{row.totalIncorrectQuestion}</td>
                      <td>{row.totalNoAnswerQuestion}</td>
                      <td>{row.score}</td>
                      <td>{row.status}</td>
                      <td>{row.startDate}</td>
                      <td>{row.endDate}</td>
                      <td className='' style={{ textAlign: 'left', width: 80 }}>
                        <Link href='/'>
                          <Button variant='contained' size='small'>
                            Xem lại
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </LoadingSpinner>
    </Dialog>
  )
}
