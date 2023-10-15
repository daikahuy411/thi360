import * as React from 'react'
import { useEffect, useState } from 'react'
import V1Api from 'api/v1-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import LoadingSpinner from '@core/components/loading-spinner'

const HomePage = () => {
  const router = useRouter()
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    new V1Api().getRecentExams().then(response => {
      setExams(response.data)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <div className='container-xxl flex-grow-1 container-p-y'>
        <section className='Home-banner'>
          <label>Sẵn sàng cho kỳ thi của bạn</label>
          <br />
          <br />
          <p>Thực hiện các bài kiểm tra thử của chúng tôi bao nhiêu tùy thích MIỄN PHÍ!</p>
          {/* <button type="button" className="btn btn-outline-primary btn-sm waves-effect text-white">Thi thử</button> */}
        </section>
        <br />
        <LoadingSpinner active={loading}>
          <section className='Home-exam'>
            <div className='ba-title'>
              <h2> Kỳ thi xem gần đây </h2>
            </div>
            <div className='He-box'>
              <div className='row g2'>
                {exams &&
                  exams.map(item => (
                    <div className='col-md-3 col-sm-6' key={`recent-exam-${item.id}`}>
                      <Link href={`/exam/${item.id}`} style={{ cursor: 'pointer' }}>
                        <div className='Heb-detail'>
                          <span>
                            <img src='/themes/default/assets/img/icons/exam1.png' />
                          </span>
                          <label>{item.name}</label>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </LoadingSpinner>
        {/* <section className="Home-tips">
          <div className="ba-title">
            <h2> Mẹo trong ngày </h2>
          </div>
          <div className="Ht-box owl-carousel owl-theme">
            <a href="" className="Htb-detail">
              <span><img src="/themes/default/assets/img/edu-icon.svg" /></span>
              <article>
                <label>Tiêu đề mẹo 1</label>
                <p>Đây là mô tả mẹo, Đây là mô tả mẹo, mô tả dài 2 dòng nếu dài quá sẽ ...</p>
              </article>
            </a>
            <a href="" className="Htb-detail">
              <span><img src="/themes/default/assets/img/edu-icon.svg" /></span>
              <article>
                <label>Tiêu đề mẹo 1</label>
                <p>Đây là mô tả mẹo, Đây là mô tả mẹo, mô tả dài 2 dòng nếu dài quá sẽ ...</p>
              </article>
            </a>
            <a href="" className="Htb-detail">
              <span><img src="/themes/default/assets/img/edu-icon.svg" /></span>
              <article>
                <label>Tiêu đề mẹo 1</label>
                <p>Đây là mô tả mẹo, Đây là mô tả mẹo, mô tả dài 2 dòng nếu dài quá sẽ ...</p>
              </article>
            </a>
          </div>
        </section> */}
        <br />
        <section className='Home-why'>
          <div className='ba-title'>
            <h2> Tại sao nên sử dụng Thi360.com? </h2>
          </div>
          <div className='Hw-box'>
            <div className='row g-2'>
              <div className='col-md-4 col-sm-6'>
                <div className='Hwb-detail'>
                  <span style={{ background: '#D9D9D9' }}>
                    <img src='' />
                  </span>
                  <label>Take recent actual IELTS Tests</label>
                  <p>
                    Real IELTS Listening and IELTS Reading tests based on actual IELTS tests and following the Cambridge
                    IELTS book format.
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hwb-detail'>
                  <span style={{ background: '#D9D9D9' }}>
                    <img src='' />
                  </span>
                  <label>Take recent actual IELTS Tests</label>
                  <p>
                    Real IELTS Listening and IELTS Reading tests based on actual IELTS tests and following the Cambridge
                    IELTS book format.
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hwb-detail'>
                  <span style={{ background: '#D9D9D9' }}>
                    <img src='' />
                  </span>
                  <label>Take recent actual IELTS Tests</label>
                  <p>
                    Real IELTS Listening and IELTS Reading tests based on actual IELTS tests and following the Cambridge
                    IELTS book format.
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hwb-detail'>
                  <span style={{ background: '#D9D9D9' }}>
                    <img src='' />
                  </span>
                  <label>Take recent actual IELTS Tests</label>
                  <p>
                    Real IELTS Listening and IELTS Reading tests based on actual IELTS tests and following the Cambridge
                    IELTS book format.
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hwb-detail'>
                  <span style={{ background: '#D9D9D9' }}>
                    <img src='' />
                  </span>
                  <label>Take recent actual IELTS Tests</label>
                  <p>
                    Real IELTS Listening and IELTS Reading tests based on actual IELTS tests and following the Cambridge
                    IELTS book format.
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hwb-detail'>
                  <span style={{ background: '#D9D9D9' }}>
                    <img src='' />
                  </span>
                  <label>Take recent actual IELTS Tests</label>
                  <p>
                    Real IELTS Listening and IELTS Reading tests based on actual IELTS tests and following the Cambridge
                    IELTS book format.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <section className='Home-num1'>
          <div className='ba-title'>
            <h2> Số #1 về luyện thi trực tuyến </h2>
          </div>
          <div className='Hn-box'>
            <div className='row g-2'>
              <div className='col-md-4 col-sm-6'>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/countri.svg' />
                  </span>
                  <p>
                    120+<span>Countries</span>
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/test.svg' />
                  </span>
                  <p>
                    28.000.000+<span>Test Takers</span>
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/complete.svg' />
                  </span>
                  <p>
                    7.000.000+<span>Completed Tests</span>
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/academic.svg' />
                  </span>
                  <p>
                    100+<span>Academic Tests</span>
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/general.svg' />
                  </span>
                  <p>
                    20+<span>General Training Tests</span>
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/quest.svg' />
                  </span>
                  <p>
                    10,000+<span>Total Questions</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage
