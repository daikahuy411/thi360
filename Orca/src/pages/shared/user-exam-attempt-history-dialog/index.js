import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import TestingApi from 'api/testing-api'
import moment from 'moment'
import Link from 'next/link'

import LoadingSpinner from '@core/components/loading-spinner'
import CloseIcon from '@mui/icons-material/Close'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function UserExamAttemptHistoryDialog({ examId, user, onClose, open }) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (examId == 0 || !user) return
    fetchData()
  }, [examId, user])

  const fetchData = () => {
    setLoading(true)
    new TestingApi()
      .UserExamAttemptHistory({ examId: examId, testId: 0, userId: user.userId, examItemId: 0 })
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
          {user && (
            <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
              Lịch sử thi của người dùng - {user.fullName}
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
                  <th>Đề thi</th>
                  <th style={{ width: 120 }}>Câu đúng</th>
                  <th style={{ width: 120 }}>Câu sai</th>
                  <th style={{ width: 140 }}>Chưa trả lời</th>
                  <th style={{ width: 160 }}>Điểm</th>
                  <th style={{ width: 160 }}>Trạng thái</th>
                  <th style={{ width: 190 }}>Bắt đầu</th>
                  <th style={{ width: 190 }}>Kết thúc</th>
                  <th style={{ textAlign: 'left', width: 150 }}>Thao tác</th>
                </tr>
              </thead>
              <tbody className='table-border-bottom-0'>
                {data &&
                  data.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td>{row.name}</td>
                      <td>
                        <Typography noWrap variant='body1'>
                          {row.totalCorrectQuestion}
                        </Typography>
                      </td>
                      <td>
                        <Typography noWrap variant='body1'>
                          {row.totalIncorrectQuestion}
                        </Typography>
                      </td>
                      <td>{row.totalNoAnswerQuestion}</td>
                      <td>{row.score}</td>
                      <td>{row.status}</td>
                      <td>
                        <Typography variant='body1'>{moment(row.startDate).format('DD-MM-YYYY HH:mm')}</Typography>
                      </td>
                      <td>
                        <Typography variant='body1'>{moment(row.endDate).format('DD-MM-YYYY HH:mm')}</Typography>
                      </td>
                      <td className='' style={{ textAlign: 'left' }}>
                        <Link href={`/testing/review/${row.token}`} target='_blank'>
                          <Button variant='contained' size='small' style={{ textAlign: 'left', width: 120 }}>
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
