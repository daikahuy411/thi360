import React from 'react'
import TestingApi from 'api/testing-api'
import { useEffect, useState } from 'react'
import V1Api from 'api/v1-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LoadingSpinner from '@core/components/loading-spinner'
import moment from 'moment'
import ReactApexcharts from '@core/components/react-apexcharts'
import { useTheme } from '@mui/material/styles'
import { Button } from '@mui/material'

const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#32baff',
  series5: '#ffa1a1'
}

const TestResultPage = () => {
  const router = useRouter()
  const { token } = router.query
  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)
  const theme = useTheme()

  const chart = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  }

  useEffect(() => {
    if (!token) return
    setLoading(true)
    new TestingApi().GetExamAttempt(token).then(response => {
      setAttempt(response.data.value)
      setLoading(false)
    })
  }, [token])

  return (
    <LoadingSpinner active={loading}>
      <>
        {attempt && (
          <div className='tutor-single-course-main-content'>
            <div className='box-result'>
              <div className=''>
                <div className='br-left '>
                  <p className='br-caption'>
                    <strong>{attempt.name}</strong>
                  </p>
                  <hr />
                  <div className='br-bar'>
                    <div className='brb-item'>
                      <div className='brb-item-inner'>
                        <div className='icon'>
                          <img alt='' src='/themes/default/assets/img/icons/testing/t_icon1.png' />
                        </div>
                        <p>Tên đăng nhập</p>
                        <strong>{attempt.user.userName}</strong>
                      </div>
                    </div>
                    <div className='brb-item'>
                      <div className='brb-item-inner'>
                        <div className='icon'>
                          <img alt='' src='/themes/default/assets/img/icons/testing/t_icon1.png' />
                        </div>
                        <p>Họ tên</p>
                        <strong>{attempt.user.fullName}</strong>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className='br-bar'>
                    <div className='brb-item'>
                      <div className='brb-item-inner'>
                        <div className='icon'>
                          <img alt='' src='/themes/default/assets/img/icons/testing/t_icon1.png' />
                        </div>
                        <p>Điểm</p>
                        <strong>{attempt.user.score}</strong>
                      </div>
                    </div>
                    <div className='brb-item'>
                      <div className='brb-item-inner'>
                        <div className='icon'>
                          <img alt='' src='/themes/default/assets/img/icons/testing/t_icon2.png' />
                        </div>
                        <p>Thời gian làm bài</p>
                        <strong>{attempt.duration}</strong>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className='br-bar'>
                    <div className='brb-item'>
                      <div className='brb-item-inner'>
                        <div className='icon'>
                          <img alt='' src='/themes/default/assets/img/icons/testing/t_icon2.png' />
                        </div>
                        <p>Thời gian bắt đầu</p>
                        <strong>{moment(attempt.startDate).format('DD-MM-YYYY hh:mm')}</strong>
                      </div>
                    </div>
                    <div className='brb-item'>
                      <div className='brb-item-inner'>
                        <div className='icon'>
                          <img alt='' src='/themes/default/assets/img/icons/testing/t_icon2.png' />
                        </div>
                        <p>Thời gian kết thúc</p>
                        <strong>{moment(attempt.endDate).format('DD-MM-YYYY hh:mm')}</strong>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div
                    className='br-chart center-block'
                    style={{ textAlign: 'center', display: 'block', clear: 'both' }}
                  >
                    <div className='row'>
                      <div className='col-md-5 col-xs-12'>
                        <ReactApexcharts type='donut' height={200} options={chart.options} series={chart.series} />
                      </div>
                      <div className='col-md-7 col-xs-12'>
                        <div style={{ width: '100%' }}>
                          <div className='stats-block border-green'>
                            <span className='stats-value '>{attempt.totalCorrectQuestion}</span>{' '}
                            <span className='stats-title'>Đúng</span>
                          </div>
                          <div className='stats-block border-orange'>
                            <span className='stats-value '>{attempt.totalIncorrectQuestion}</span>{' '}
                            <span className='stats-title'>Sai</span>
                          </div>
                          <div className='stats-block border-yellow'>
                            <span className='stats-value '>{attempt.totalNoAnswerQuestion}</span>
                            <span className='stats-title'>Chưa trả lời</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br className='clearfix' />
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <b className='text-muted'> Kết quả: </b>
                      &nbsp;
                      <span className='label label-danger ' style={{ color: '#f44336', fontSize: 16 }}>
                        Không đạt
                      </span>
                    </div>
                  </div>
                  <hr />
                  <br style={{ clear: 'both' }} />
                  <div className='br-control'>
                    <button className='btn btn-primary ' style={{ cursor: 'pointer' }}>
                      Thi lại
                    </button>
                    &nbsp;
                    <Link href={`/testing/review/${attempt.token}`}>
                      <Button color='secondary'>Xem bài làm</Button>
                    </Link>
                    &nbsp;
                    <button className='btn btn-info btn-large ' style={{ cursor: 'pointer' }}>
                      Quay lại Kỳ thi
                    </button>
                  </div>
                </div>
              </div>
              <div className='br-right'></div>
              <div className='clearfix'></div>
            </div>
          </div>
        )}
      </>
    </LoadingSpinner>
  )
}

export default TestResultPage
