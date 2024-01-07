import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import Head from 'next/head'
import NavLink from 'next/link'
import { useRouter } from 'next/router'

import LoadingSpinner from '@core/components/loading-spinner'
import { FormatNumber } from '@core/utils/format'
import HomeIcon from '@mui/icons-material/Home'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Pagination from '@mui/material/Pagination'

const AssignmentPage = () => {
  const router = useRouter()
  const formatNumber = new FormatNumber()
  const [exams, setExams] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    new V1Api().getMyAssignment().then(response => {
      setExams(response.data.value)
      setTotalItems(response.data.totalItems)
      setLoading(false)
    })
  }, [router, page])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <>
      <Head>
        <title>Thi - Kiểm tra</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label='breadcrumb' style={{ marginBottom: 5 }}>
            <Link
              underline='hover'
              component={NavLink}
              sx={{ display: 'flex', alignItems: 'center' }}
              color='inherit'
              href='/'
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
            </Link>
          </Breadcrumbs>
        </Grid>
        <Grid item md={12}>
          <div className='box-all'>
            <LoadingSpinner active={loading}>
              <div className='box-content'>
                <div className='card card-action mb-5'>
                  <div className='card-body'>
                    <div className='row g-1'>
                      <div className={'col-md-12'}>
                        <div className='tab-content py-0'>
                          <div className='tab-pane fade show active' id='tab1'>
                            <div className='TC-Title'>
                              <h2>
                                <span>
                                  <img src='/themes/default/assets/img/icon-kythi.svg' />
                                </span>
                                {formatNumber.add0(totalItems)} kỳ thi
                              </h2>
                              <div className='input-group' style={{ display: 'none' }}>
                                <select className='form-select' id='inputGroupSelect03'>
                                  <option selected=''>Tất cả</option>
                                  <option value='1'>Hoàn thành</option>
                                  <option value='2'>Chưa hoàn thành</option>
                                </select>
                              </div>
                            </div>
                            {exams &&
                              exams.map((item, index) => (
                                <div key={`exam-${item.id}`}>
                                  <NavLink href={`/my-assignment/exams/${item.id}`} className='TC-detail'>
                                    <article style={{ width: '100%' }}>
                                      <label>
                                        {(page - 1) * rowsPerPage + index + 1}.&nbsp;{item.name}
                                      </label>
                                      {item.userExamAttemptTracking && (
                                        <>
                                          <p>
                                            <img src='/themes/default/assets/img/icon-dethi.svg' /> Hoàn thành:{' '}
                                            <span>100</span>/1000 Đề thi
                                          </p>
                                          <span className='line-full' style={{ display: 'inline-block', width: '50%' }}>
                                            <span className='line-percent lp-10'></span>
                                          </span>
                                        </>
                                      )}
                                    </article>
                                    <span className='TCD-icon mdi mdi-chevron-right'></span>
                                  </NavLink>
                                </div>
                              ))}
                            {totalPages > 1 && (
                              <div>
                                <br />
                                <Pagination
                                  count={totalPages}
                                  size='large'
                                  component='div'
                                  color='primary'
                                  page={page}
                                  onChange={handleChangePage}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </LoadingSpinner>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default AssignmentPage
