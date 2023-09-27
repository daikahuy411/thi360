import * as React from 'react'
import { useEffect, useState } from 'react'
import V1Api from 'api/v1-api'
import NavLink from 'next/link'
import { useRouter } from 'next/router'
import HomeIcon from '@mui/icons-material/Home'
import clsx from 'clsx'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import LoadingSpinner from '@core/components/loading-spinner'

const SubjectPage = () => {
  const router = useRouter()
  const { programId, subjectId } = router.query
  const [curriculums, setCurriculums] = useState([])
  const [program, setProgram] = useState(null)
  const [subject, setSubject] = useState(null)
  const [exams, setExams] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(false)
  const [curriculum, setCurriculum] = useState(null)
  const [curriculumId, setCurriculumId] = useState(0)

  useEffect(() => {
    if (!programId || programId == 0) {
      return
    }
    new V1Api().getCurriculums(programId, subjectId[0]).then(response => {
      setCurriculums(response.data)
      setCurriculum(response.data[0])
    })

    new V1Api().getProgramCatalog(programId).then(response => {
      setProgram(response.data)
    })

    new V1Api().getSubjectCatalog(programId, subjectId[0]).then(response => {
      setSubject(response.data)
    })

    if (subjectId && subjectId.length > 0) {
      setLoading(true)
      let id = subjectId.length > 1 ? subjectId[1] : 0
      new V1Api().searchExams({ subjectId: subjectId[0], curriculumId: id, programId: programId }).then(response => {
        setExams(response.data.value)
        setTotalItems(response.data.totalItems)
        setLoading(false)
      })
    }
  }, [programId, subjectId])

  useEffect(() => {
    if (!subjectId) {
      return
    }
    setLoading(true)
    new V1Api()
      .searchExams({ subjectId: subjectId[0], curriculumId: curriculumId, programId: programId })
      .then(response => {
        setExams(response.data.value)
        setTotalItems(response.data.totalItems)
        setLoading(false)
      })
  }, [curriculum, curriculumId])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link
              underline='hover'
              component={NavLink}
              sx={{ display: 'flex', alignItems: 'center' }}
              color='inherit'
              href='/'
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
            </Link>
            {program && (
              <Link
                underline='hover'
                component={NavLink}
                sx={{ display: 'flex', alignItems: 'center' }}
                color='inherit'
                href={`/program/${programId}`}
              >
                {program.name}
              </Link>
            )}
            {subject && <Typography color='text.primary'>{subject.name}</Typography>}
          </Breadcrumbs>
          <br />
        </Grid>
        <Grid item md={12}>
          <div className='ba-title'>
            <h2>
              <a href='Page-Chuongtrinh.html'>
                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALRJREFUSEvt1MENwjAMBdBvlUGSTcoGrMCBSmwBU3CECUo3YBS6CDIKEqhSD/6uFYlDe037X/TjRlD5kcr5WAGz4f+r6LJ7pgZouyHfzO0DvkMu4RuRK4AWoudDn08WQlc0DVdg7O4pW+FlnQKWhlNAJNwEouEU0Ig8BEil95fq9jjkken++455Bp+xDCAmUHYSQSgggtDADFHdM3+zC/ghta4Kz/TQU7QkdPqNuyIvuAJmY2/bdVYZoOuJcwAAAABJRU5ErkJggg==' />
                Toán
              </a>
            </h2>
          </div>
          <div>
            <ul className='list-badge px-0' style={{ display: 'block' }}>
              {curriculums &&
                curriculum &&
                curriculums.map(item => (
                  <li key={`curriculum-${item.id}`} style={{ display: 'inline-block', marginBottom: 4, cursor: 'pointer' }}>
                    <a
                      onClick={() => {
                        setCurriculum(item)
                      }}
                    >
                      <span className={item.id == curriculum.id ? 'badge rounded-pill active' : 'badge rounded-pill'}>
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div className='box-all'>
            <LoadingSpinner active={loading}>
              <div className='box-content'>
                <div className='card card-action mb-5'>
                  <div className='card-alert'></div>
                  {curriculum && (
                    <div className='card-header'>
                      <div className='card-action-title'>
                        <b>{curriculum.name}</b>
                      </div>
                    </div>
                  )}
                  <div className='card-body'>
                    <div className='row g-1'>
                      <div className='col-md-4'>
                        {curriculum && (
                          <div className='list-group list-badge list-left'>
                            {curriculum.children.map(child => (
                              <a
                                style={{ cursor: 'pointer' }}
                                key={`curriculum-child-${child.id}`}
                                onClick={() => setCurriculumId(child.id)}
                                className={clsx('list-group-item list-group-item-action', {
                                  'active': curriculumId == child.id,
                                })}
                              >
                                {child.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className='col-md-8'>
                        <div className='tab-content py-0'>
                          <div className='tab-pane fade show active' id='tab1'>
                            <div className='TC-Title'>
                              <h2>
                                <span>
                                  <img src='/themes/default/assets/img/icon-kythi.svg' />
                                </span>
                                {totalItems} kỳ thi
                              </h2>
                              <div className='input-group'>
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
                                  <NavLink href={`/exam/${item.id}`} className='TC-detail'>
                                    <article style={{ width: '100%' }}>
                                      <label>
                                        {index + 1}.&nbsp;{item.name}
                                      </label>
                                      {item.curriculum && <Typography>{item.curriculum.name}</Typography>}
                                      <p>
                                        <img src='/themes/default/assets/img/icon-dethi.svg' /> Hoàn thành:{' '}
                                        <span>100</span>/1000 Đề thi
                                      </p>
                                      <span className='line-full' style={{ display: 'inline-block', width: '50%' }}>
                                        <span className='line-percent lp-10'></span>
                                      </span>
                                    </article>
                                    <span className='TCD-icon mdi mdi-chevron-right'></span>
                                  </NavLink>
                                </div>
                              ))}
                            <div>
                              <br />
                              <Pagination
                                count={totalItems}
                                size='large'
                                rowsPerPageOptions={[20, 50, 100]}
                                component='div'
                                page={1}
                                rowsPerPage={20}
                                color='primary'
                              />
                            </div>
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

export default SubjectPage
