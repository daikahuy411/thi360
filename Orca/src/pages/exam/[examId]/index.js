import * as React from 'react'
import { useEffect, useState } from 'react'
import V1Api from 'api/v1-api'
import NavLink from 'next/link'
import { useRouter } from 'next/router'
import LoadingSpinner from '@core/components/loading-spinner'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import TestingApi from 'api/testing-api'
import CircularProgress from '@mui/material/CircularProgress'

const ExamPage = () => {
  const router = useRouter()
  const { examId } = router.query
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const createExamAttempt = (examItemId, testId) => {
    setLoading(true)
    new TestingApi().CreateExamAttempt(parseInt(examId), examItemId, testId).then(response => {
      router.push(`/testing/${response.data.value.token}`)
    })
  }

  useEffect(() => {
    if (!examId || examId == 0) {
      return
    }
    setLoading(true)
    new V1Api().getExam(examId).then(response => {
      setExam(response.data)
      setLoading(false)
    })
  }, [examId])

  return (
    <>
      <Grid container>
        <Grid item md={12}>
          {exam && (
            <Breadcrumbs aria-label='breadcrumb'>
              <Link underline='hover' color='inherit' href='/' component={NavLink}>
                <img
                  style={{ width: 18 }}
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQVJREFUSEvtldERgyAMhpNN7CY6ApmgnaTXSZxAGKFuUjehh2c4jCDhwbs+lEcM//cnJoBw8cKL9UENcM513vsxGELEhzFm0ZhTARLxfhNdEHHQQKoAIc6uOwBQQU4BUpyIbtveGwBUkCIgJ841b4FkAWfirZADQCPeAtkBWsS1kAiQrUhE1Q4TkE+uhaPINE0jIt75UAsgnLHW+mTwZiIa1qHkzcsBDGInnIFzrvfePwGAp5hDZ0R8GWPmNAOZ+aHOEmCtDbUNQ5VbsRTyHAdrAGttpbOMkWzcHxBL91P/4Kxrao/YEq70NCh32YW+D09jqTVLkN1cFNu0ZrH1u/pCaxXm+C/ebQ4oUTUexgAAAABJRU5ErkJggg=='
                />
              </Link>
              <Link underline='hover' color='inherit' href={`/program/${exam.program.id}`} component={NavLink}>
                {exam.program.name}
              </Link>
              <Link
                underline='hover'
                color='inherit'
                href={`/program/${exam.program.id}/subject/${exam.subject.id}`}
                component={NavLink}
              >
                {exam.subject.name}
              </Link>
              {exam.curriculum && (
                <Link
                  underline='hover'
                  color='inherit'
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
                    color='inherit'
                    href={`/program/${exam.program.id}/subject/${exam.subject.id}/${item.id}`}
                    component={NavLink}
                  >
                    {item.name}
                  </Link>
                ))}
            </Breadcrumbs>
          )}
          <br />
        </Grid>
        <Grid item md={12} alignContent={'center'}>
          <LoadingSpinner active={loading}>
            {/* className='container-xxl flex-grow-1 container-p-y' */}
            <div>
              <div className='box-all'>
                <div className='box-content'>
                  {exam && (
                    <div className='card card-action mb-3'>
                      <div className='card-body'>
                        <div className='detail-title'>
                          <span>
                            <img src='/themes/default/assets/img/edu-icon.svg' />
                          </span>
                          <article>
                            <h3>{exam.name}</h3>
                            <div className='col-md d-flex flex-column align-items-start'>
                              <div className='onChange-event-ratings mb-3'></div>
                            </div>
                            <p>{exam.content}</p>
                          </article>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='card card-action mb-3'>
                    <div className='card-body'>
                      <div className='nav-align-top mb-4'>
                        <ul className='nav nav-pills mb-3' role='tablist'>
                          <li className='nav-item'>
                            <button
                              type='button'
                              className='nav-link active'
                              data-bs-toggle='tab'
                              data-bs-target='#tab1'
                            >
                              Đề thi
                            </button>
                          </li>
                          <li className='nav-item'>
                            <button type='button' className='nav-link ' data-bs-toggle='tab' data-bs-target='#tab2'>
                              Nhận xét
                            </button>
                          </li>
                          {/* <li className="nav-item">
                          <button type="button" className="nav-link" data-bs-toggle="tab" data-bs-target="#tab3">Thống kê</button>
                        </li>
                        <li className="nav-item">
                          <button type="button" className="nav-link" data-bs-toggle="tab" data-bs-target="#tab4">Mô tả</button>
                        </li> */}
                        </ul>
                        <div className='tab-content p-0'>
                          <div className='tab-pane active show' id='tab1'>
                            <div className='d-flex align-items-center justify-content-between mb-4'>
                              {exam && (
                                <p className='mb-0 text-black'>
                                  <img src='/themes/default/assets/img/icon-dethi.svg' />{' '}
                                  <b> {exam.examItems[0].tests.length} đề thi</b>
                                </p>
                              )}
                              <div className='d-flex align-items-center justify-content-end'>
                                <input
                                  className='form-control me-3'
                                  type='text'
                                  placeholder='Từ khóa ...'
                                  style={{ width: 300 }}
                                />
                                <select className='form-select' style={{ width: 170 }}>
                                  <option key='exam-status-0' selected>
                                    Loại đề thi
                                  </option>
                                  <option key='exam-status-1' value='1'>
                                    Tất cả
                                  </option>
                                  <option key='exam-status-2' value='2'>
                                    Tự luận
                                  </option>
                                  <option key='exam-status-3' value='3'>
                                    Trắc nghiệm
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className='table-responsive table-border'>
                              <table className='table table-striped'>
                                <thead>
                                  <tr>
                                    <th style={{ width: 30 }}>STT</th>
                                    <th style={{ width: 60 }}>%</th>
                                    <th>Đề thi</th>
                                    <th style={{ width: 200 }}>Số câu hỏi</th>
                                    <th style={{ width: 200 }}>Loại đề thi</th>
                                    <th style={{ textAlign: 'right', width: 300 }}>Thao tác</th>
                                  </tr>
                                </thead>
                                <tbody className='table-border-bottom-0'>
                                  {exam &&
                                    exam.examItems[0].tests.map((row, index) => (
                                      <tr key={row.id}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td>
                                          <CircularProgress
                                            size={32}
                                            value={100}
                                            thickness={5}
                                            variant='determinate'
                                            sx={{ position: 'absolute', color: 'customColors.trackBg' }}
                                          />
                                          <CircularProgress
                                            size={32}
                                            thickness={5}
                                            value={50}
                                            sx={{ color: '#4caf50' }}
                                            variant='determinate'
                                          />
                                        </td>
                                        <td>
                                          <div>{row.name}</div>
                                          {row.link && (
                                            <div>
                                              <a href={row.link} rel="noreferrer" target={'_blank'}>{row.link}</a>
                                            </div>
                                          )}
                                          {row.userTestAttemptTracking && (
                                            <p>{row.userTestAttemptTracking.totalPassed}</p>
                                          )}
                                          {row.userTestAttemptTracking && (
                                            <p>{row.userTestAttemptTracking.totalFailed}</p>
                                          )}
                                        </td>
                                        <td>{row.totalQuestion}</td>
                                        <td>{row.testTypeName}</td>
                                        <td className=''>
                                          <div className='d-flex align-items-center justify-content-end'>
                                            <Button
                                              variant='contained'
                                              size='small'
                                              onClick={() => {
                                                createExamAttempt(exam.examItems[0].id, row.id)
                                              }}
                                            >
                                              Thi thử
                                            </Button>
                                            &nbsp;
                                            <Button variant='outlined' size='small'>
                                              Luyện tập
                                            </Button>
                                            &nbsp;
                                            <IconButton
                                              aria-label='more'
                                              id='long-button'
                                              aria-controls={open ? 'long-menu' : undefined}
                                              aria-expanded={open ? 'true' : undefined}
                                              aria-haspopup='true'
                                              onClick={handleClick}
                                            >
                                              <MoreVertIcon />
                                            </IconButton>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className='tab-pane fade' id='tab2'>
                            <div className='row'>
                              <div className='col-sm-6'>
                                <div className='total-rating'>
                                  <h1>
                                    3.0
                                    <p>550 Nhận xét</p>
                                  </h1>
                                  <ul>
                                    <li>
                                      <span className='mdi mdi-star'></span>
                                      <div className='progress'>
                                        <div
                                          className='progress-bar'
                                          role='progressbar'
                                          style={{ width: '15%' }}
                                          aria-valuenow='15'
                                          aria-valuemin='0'
                                          aria-valuemax='100'
                                        ></div>
                                      </div>
                                    </li>
                                    <li>
                                      <span className='mdi mdi-star'></span>
                                      <div className='progress'>
                                        <div
                                          className='progress-bar'
                                          role='progressbar'
                                          style={{ width: '25%' }}
                                          aria-valuenow='25'
                                          aria-valuemin='0'
                                          aria-valuemax='100'
                                        ></div>
                                      </div>
                                    </li>
                                    <li>
                                      <span className='mdi mdi-star'></span>
                                      <div className='progress'>
                                        <div
                                          className='progress-bar'
                                          role='progressbar'
                                          style={{ width: '45%' }}
                                          aria-valuenow='45'
                                          aria-valuemin='0'
                                          aria-valuemax='100'
                                        ></div>
                                      </div>
                                    </li>
                                    <li>
                                      <span className='mdi mdi-star'></span>
                                      <div className='progress'>
                                        <div
                                          className='progress-bar'
                                          role='progressbar'
                                          style={{ width: '65%' }}
                                          aria-valuenow='65'
                                          aria-valuemin='0'
                                          aria-valuemax='100'
                                        ></div>
                                      </div>
                                    </li>
                                    <li>
                                      <span className='mdi mdi-star'></span>
                                      <div className='progress'>
                                        <div
                                          className='progress-bar'
                                          role='progressbar'
                                          style={{ width: '85%' }}
                                          aria-valuenow='85'
                                          aria-valuemin='0'
                                          aria-valuemax='100'
                                        ></div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className='d-flex align-items-center justify-content-between'>
                                <article className='d-flex align-items-center'>
                                  <p className='mb-0'>Bạn nhận xét như thế nào về kỳ thi này? :</p>
                                  <div className='col-md d-flex flex-column align-items-start'>
                                    <div className='onChange-event-ratings mb-1'></div>
                                  </div>
                                </article>
                                <button
                                  type='button'
                                  className='btn btn-outline-primary waves-effect btn-sm'
                                  data-bs-toggle='modal'
                                  data-bs-target='#modalCenter'
                                >
                                  Viết bài nhận xét
                                </button>
                              </div>

                              <hr className='my-2' />

                              <div className='detail-comment'>
                                <div className='dc-list'>
                                  <div className='dc-name'>
                                    <span>
                                      <img
                                        src='assets/img/avatars/1.png'
                                        alt=''
                                        className='w-px-40 h-auto rounded-circle'
                                      />
                                    </span>
                                    <label>Kiều Chí Công</label>
                                  </div>
                                  <div className='dc-rate mb-2'>
                                    <div className='basic-ratings'></div>
                                    <p>29 tháng 8, 2023</p>
                                  </div>
                                  <div className='dc-text'>
                                    <p>Đây là nội dung nhận xét</p>
                                  </div>
                                </div>

                                <div className='dc-list'>
                                  <div className='dc-name'>
                                    <span>
                                      <img
                                        src='assets/img/avatars/1.png'
                                        alt=''
                                        className='w-px-40 h-auto rounded-circle'
                                      />
                                    </span>
                                    <label>Kiều Chí Công</label>
                                  </div>
                                  <div className='dc-rate mb-2'>
                                    <div className='basic-ratings'></div>
                                    <p>29 tháng 8, 2023</p>
                                  </div>
                                  <div className='dc-text'>
                                    <p>Đây là nội dung nhận xét</p>
                                  </div>
                                </div>

                                <a href='#modalCenter-comment' data-bs-toggle='modal'>
                                  <b>Xem tất cả bài nhận xét</b>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LoadingSpinner>
        </Grid>
      </Grid>
    </>
  )
}

export default ExamPage
