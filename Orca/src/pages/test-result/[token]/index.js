import React from 'react'
import TestingApi from 'api/testing-api'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LoadingSpinner from '@core/components/loading-spinner'
import moment from 'moment'
import { Button, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import NavLink from 'next/link'
import RefreshIcon from '@mui/icons-material/Refresh'
import Icon from '@core/components/icon'

const RADIAN = Math.PI / 180

const renderCustomizedLabel = props => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return <text x={x} y={y} fill='#fff' textAnchor='middle' dominantBaseline='central'></text>
}

const TestResultPage = () => {
  const router = useRouter()
  const { token } = router.query
  const [attempt, setAttempt] = useState(null)
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const createExamAttempt = () => {
    setLoading(true)
    new TestingApi().CreateExamAttempt(attempt.examId, attempt.examItemId, attempt.testId).then(response => {
      router.push(`/testing/${response.data.value.token}`)
    })
  }

  useEffect(() => {
    if (!token) return
    setLoading(true)
    new TestingApi().GetExamAttempt(token).then(response => {
      setAttempt(response.data.value)
      setExam(response.data.value.exam)
      setLoading(false)
      setData([
        { name: 'Correct', value: response.data.value.totalCorrectQuestion, color: '#4caf50' },
        { name: 'InCorrect', value: response.data.value.totalIncorrectQuestion, color: '#f44336' },
        { name: 'NotAnswer', value: response.data.value.totalNoAnswerQuestion, color: '#aab8c2' }
      ])
    })
  }, [token])

  return (
    <LoadingSpinner active={loading}>
      <>
        {attempt && (
          <>
            <Grid container>
              <Grid item md={12}>
                {exam && (
                  <Breadcrumbs aria-label='breadcrumb'>
                    <Link underline='hover' style={{ color: 'rgba(58, 53, 65, 0.6)' }} href='/' component={NavLink}>
                      <img
                        style={{ width: 18 }}
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQVJREFUSEvtldERgyAMhpNN7CY6ApmgnaTXSZxAGKFuUjehh2c4jCDhwbs+lEcM//cnJoBw8cKL9UENcM513vsxGELEhzFm0ZhTARLxfhNdEHHQQKoAIc6uOwBQQU4BUpyIbtveGwBUkCIgJ841b4FkAWfirZADQCPeAtkBWsS1kAiQrUhE1Q4TkE+uhaPINE0jIt75UAsgnLHW+mTwZiIa1qHkzcsBDGInnIFzrvfePwGAp5hDZ0R8GWPmNAOZ+aHOEmCtDbUNQ5VbsRTyHAdrAGttpbOMkWzcHxBL91P/4Kxrao/YEq70NCh32YW+D09jqTVLkN1cFNu0ZrH1u/pCaxXm+C/ebQ4oUTUexgAAAABJRU5ErkJggg=='
                      />
                    </Link>
                    <Link
                      underline='hover'
                      style={{ color: 'rgba(58, 53, 65, 0.6)' }}
                      href={`/program/${exam.program.id}`}
                      component={NavLink}
                    >
                      {exam.program.name}
                    </Link>
                    <Link
                      underline='hover'
                      style={{ color: 'rgba(58, 53, 65, 0.6)' }}
                      href={`/program/${exam.program.id}/subject/${exam.subject.id}`}
                      component={NavLink}
                    >
                      {exam.subject.name}
                    </Link>
                    {exam.curriculum && (
                      <Link
                        underline='hover'
                        style={{ color: 'rgba(58, 53, 65, 0.6)' }}
                        href={`/program/${exam.program.id}/subject/${exam.subject.id}/${exam.curriculum.id}`}
                        component={NavLink}
                      >
                        {exam.curriculum.name}
                      </Link>
                    )}
                    {exam.curriculum &&
                      exam.curriculum.children &&
                      exam.curriculum.children.map(item => (
                        <Link
                          underline='hover'
                          key={item.id}
                          style={{ color: 'rgba(58, 53, 65, 0.6)' }}
                          href={`/program/${exam.program.id}/subject/${exam.subject.id}/${item.id}`}
                          component={NavLink}
                        >
                          {item.name}
                        </Link>
                      ))}
                    {exam && (
                      <Link
                        underline='hover'
                        style={{ color: 'rgba(58, 53, 65, 0.6)' }}
                        href={`/exam/${exam.id}`}
                        component={NavLink}
                      >
                        {exam.name}
                      </Link>
                    )}
                  </Breadcrumbs>
                )}
                <br />
              </Grid>
              <Grid item md={12}>

                <div className='box-result'>
                  <div className=''>
                    <div className='br-left '>
                      <p className='br-caption'>
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="56" height="56" rx="28" fill="#E5FFF1"></rect>
                          <path d="M35.293 22.2928L26.0001 31.5857L20.7072 26.2928L19.293 27.7071L26.0001 34.4142L36.7072 23.7071L35.293 22.2928Z" fill="#007F31"></path>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M44 28C44 36.8366 36.8366 44 28 44C19.1634 44 12 36.8366 12 28C12 19.1634 19.1634 12 28 12C36.8366 12 44 19.1634 44 28ZM42 28C42 35.732 35.732 42 28 42C20.268 42 14 35.732 14 28C14 20.268 20.268 14 28 14C35.732 14 42 20.268 42 28Z" fill="#007F31"></path>
                        </svg>
                        &nbsp;&nbsp;
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
                            <strong>{attempt.score}</strong>
                          </div>
                        </div>
                        <div className='brb-item'>
                          <div className='brb-item-inner'>
                            <div className='icon'>
                              <img alt='' src='/themes/default/assets/img/icons/testing/t_icon2.png' />
                            </div>
                            <p>Thời gian làm bài (phút)</p>
                            <strong>{attempt.totalTime}</strong>
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
                            <strong>{moment(attempt.startDate).format('DD-MM-YYYY hh:mm:ss')}</strong>
                          </div>
                        </div>
                        <div className='brb-item'>
                          <div className='brb-item-inner'>
                            <div className='icon'>
                              <img alt='' src='/themes/default/assets/img/icons/testing/t_icon2.png' />
                            </div>
                            <p>Thời gian kết thúc</p>
                            <strong>{moment(attempt.endDate).format('DD-MM-YYYY hh:mm:ss')}</strong>
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
                            <Box sx={{ height: 220 }}>
                              <ResponsiveContainer>
                                <PieChart height={240} style={{ direction: 'ltr' }}>
                                  <Pie
                                    data={data}
                                    innerRadius={60}
                                    dataKey='value'
                                    label={renderCustomizedLabel}
                                    labelLine={false}
                                  >
                                    {data.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 4, justifyContent: 'center' }}>
                              <Box
                                sx={{
                                  mr: 6,
                                  display: 'flex',
                                  alignItems: 'center',
                                  '& svg': { mr: 1.5, color: '#4caf50' }
                                }}
                              >
                                <Icon icon='mdi:circle' fontSize='0.75rem' />
                                <Typography variant='body2'>Đúng</Typography>
                              </Box>
                              <Box
                                sx={{
                                  mr: 6,
                                  display: 'flex',
                                  alignItems: 'center',
                                  '& svg': { mr: 1.5, color: '#f44336' }
                                }}
                              >
                                <Icon icon='mdi:circle' fontSize='0.75rem' />
                                <Typography variant='body2'>Sai</Typography>
                              </Box>
                              <Box
                                sx={{
                                  mr: 6,
                                  display: 'flex',
                                  alignItems: 'center',
                                  '& svg': { mr: 1.5, color: '#aab8c2' }
                                }}
                              >
                                <Icon icon='mdi:circle' fontSize='0.75rem' />
                                <Typography variant='body2'>Chưa trả lời</Typography>
                              </Box>
                            </Box>
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
                      <hr />
                      <br style={{ clear: 'both' }} />
                      <div className='br-control'>
                        <Button color='primary' variant='contained' onClick={createExamAttempt}>
                          <RefreshIcon />
                          &nbsp; Thi lại
                        </Button>
                        &nbsp;
                        <Link href={`/testing/review/${attempt.token}`}>
                          <Button color='secondary' variant='outlined'>
                            <Icon icon='bi:eye' fontSize={22} />
                            &nbsp; Xem bài làm
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='clearfix'></div>
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </>
    </LoadingSpinner>
  )
}

export default TestResultPage
