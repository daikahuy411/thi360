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
import { useAuth } from 'hooks/useAuth'

const HomePage = () => {
  const router = useRouter()
  const auth = useAuth()
  const [exams, setExams] = useState([])
  const [postCates, setPostCates] = useState([])
  const [loading, setLoading] = useState(false)
  const [postLoading, setPostLoading] = useState(false)

  useEffect(() => {
    if (auth.user) {
      setLoading(true)
      new V1Api().getRecentExams().then(response => {
        setExams(response.data)
        setLoading(false)
      })
    }

    setPostLoading(true)
    new V1Api().getHomePagePosts().then(response => {
      setPostCates(response.data)
      setPostLoading(false)
    })
  }, [])

  return (
    <>
      <div className='container-xxl flex-grow-1 container-p-y'>
        <section className='Home-banner' style={{ backgroundColor: '#6F2F74', color: 'white' }}>
          {/* <img src='/themes/default/assets/img/intro.png' /> */}
          {/* <label>Sẵn sàng cho kỳ thi của bạn</label> */}
          <h1 className='' style={{ color: 'white', fontSize: 36 }}>
            Thi360 Testing online
          </h1>
          <h2 class="" style={{ color: 'white', fontSize: 20 }}>The Most Comprehensive Preparation App for All Exams </h2>
          {/* <p>Thực hiện các bài kiểm tra thử của chúng tôi bao nhiêu tùy thích MIỄN PHÍ!</p> */}
          {/* <button type='button' className='btn btn-outline-primary btn-sm waves-effect text-white'>
            Thi thử
          </button> */}
        </section>
        <br />
        <LoadingSpinner active={loading} minHeight={0}>
          <>
            {auth.user && (
              <section className='Home-exam'>
                <div className='ba-title'>
                  <h2> Kỳ thi xem gần đây </h2>
                </div>
                <div className='He-box'>
                  <div className='row g2'>
                    {exams &&
                      exams.map(item => (
                        <div className='col-md-2 col-sm-4' key={`recent-exam-${item.id}`}>
                          <Link href={`/exam/${item.id}`} style={{ cursor: 'pointer' }}>
                            <div className='Heb-detail'>
                              <span>
                                <img src='/images/home/grad-icon.svg' />
                              </span>
                              <label>{item.name}</label>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </section>
            )}
          </>
        </LoadingSpinner>

        <LoadingSpinner active={postLoading} minHeight={0}>
          <>
            {postCates &&
              postCates.map(item => (
                <section className='Home-exam'>
                  <div className='ba-title'>
                    <h2> {item.name} </h2>
                  </div>
                  <div className='He-box'>
                    <div className='row g2'>
                      {item.posts &&
                        item.posts.map(p => (
                          <div className='col-md-3 col-sm-6' key={`recent-exam-${p.id}`}>
                            <Link href={`/exam/${p.id}`} style={{ cursor: 'pointer' }}>
                              <div className='Heb-detail'>
                                <span>
                                  <img src='/themes/default/assets/img/icons/exam1.png' />
                                </span>
                                <label>{p.name}</label>
                              </div>
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                </section>
              ))}
          </>
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

        <section className='Home-why'>
          <div className='ba-title'>
            <h2> Tại sao nên sử dụng Thi360.com? </h2>
          </div>
          <div className='Hw-box'>
            <div className='row g-2'>
              <div className='col-md-12 col-sm-12'>
                <br />
                <img src='/images/home/Screenshot_316.png' style={{ width: '100%' }} />
                <br />
                <img src='/images/home/Screenshot_315.png' style={{ width: '100%' }} />
                <br />
              </div>
            </div>
          </div>
        </section>

        <section className='Home-why'>
          <div className='ba-title'>
            <h2> Tại sao nên sử dụng Thi360.com? </h2>
          </div>
          <div className='Hw-box'>
            <div className='row g-2'>
              <div className='col-md-3 col-sm-6'>
                <div className='Hwb-detail'>
                  <span>
                    <img src='/images/home/why-folders_0_0.png' />
                  </span>
                  <label>Ngân hàng Câu hỏi lớn, chất lượng</label>
                  <p>
                    Real IELTS Listening and IELTS Reading tests based on actual IELTS tests and following the Cambridge
                    IELTS book format.
                  </p>
                </div>
              </div>
              <div className='col-md-3 col-sm-6'>
                <div className='Hwb-detail'>
                  <span>
                    <img src='/images/home/why-online-meeting_0_0.png' />
                  </span>
                  <label>Dễ dàng sử dụng</label>
                  <p>
                    Real IELTS Listening and IELTS Reading tests based on actual IELTS tests and following the Cambridge
                    IELTS book format.
                  </p>
                </div>
              </div>
              <div className='col-md-3 col-sm-6'>
                <div className='Hwb-detail'>
                  <span>
                    <img src='/images/home/why-bullets_0_0.png' />
                  </span>
                  <label>Chế độ Luyện tập và Thi thử</label>
                  <p>
                    Real IELTS Listening and IELTS Reading tests based on actual IELTS tests and following the Cambridge
                    IELTS book format.
                  </p>
                </div>
              </div>
              <div className='col-md-3 col-sm-6'>
                <div className='Hwb-detail'>
                  <span>
                    <img src='/images/home/why-chart_0_0.png' style={{ width: 60, height: 60 }} />
                  </span>
                  <label>Theo dõi tiến trình ôn luyện</label>
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
                    10+<span>Chương trình</span>
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/test.svg' />
                  </span>
                  <p>
                    10.000+<span>Thành viên</span>
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/complete.svg' />
                  </span>
                  <p>
                    10,000+<span>Lượt thi</span>
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/academic.svg' />
                  </span>
                  <p>
                    100+<span>Chủ đề</span>
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/general.svg' />
                  </span>
                  <p>
                    30,000+<span>Đề thi</span>
                  </p>
                </div>
              </div>
              <div className='col-md-4 col-sm-6'>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/quest.svg' />
                  </span>
                  <p>
                    1,000,0000+<span>Câu hỏi</span>
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
