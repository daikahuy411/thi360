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
          <h2 class='' style={{ color: 'white', fontSize: 20 }}>
            The Most Comprehensive Preparation App for All Exams{' '}
          </h2>
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
        <br />
        <section className="mb5-l mb4-5 fixed-width-container ph3 ph0-l">
          <div className="flex flex-column w-100">
            <h3 className="home_head__DVePE tc mb3 mt0">Start your preparation</h3>
            <div className="home-section-container">
              <div className="home-section-item" style={{ backgroundImage: "url('https://gs-post-images.grdp.co/2021/3/group-38-2x-img1614867563918-41.png-rs-high-webp.png')" }}>
                <span className="white fw7 f4-l f5">Online Classroom Program</span>
                <span className="white mb4 f6 w-70 h2-5">Live &amp; Recorded courses by Top Faculty</span>
                <a className="mt-auto link" href="/">
                  <span className="secondary mr2 f5 f6-l">Explore Courses</span>
                  <svg version="1.1" width="8" height="8" className="svg-f-secondary" viewBox="0 0 30 48" preserveAspectRatio="" style={{ strokeWwidth: 1 }}>
                    <path d="M0 4.7C6.4 11.1 12.8 17.5 19.4 24 12.9 30.4 6.5 36.7 0.1 43.1c1.7 1.7 3.3 3.3 4.7 4.7 8-8 16.1-16 24.2-24 -8.1-8-16.1-16-24.2-24C3.4 1.3 1.8 2.9 0 4.7z"></path>
                    <path d="M0 4.7c1.8-1.8 3.4-3.4 4.9-4.9 8 8 16.1 16 24.2 24 -8.1 8-16.1 16-24.2 24 -1.5-1.5-3.1-3.1-4.7-4.7C6.5 36.7 12.9 30.4 19.4 24 12.8 17.5 6.4 11.1 0 4.7z"></path>
                  </svg>
                </a>
              </div>
              <div className="home-section-item" style={{ backgroundImage: "url('https://gs-post-images.grdp.co/2021/3/group-38-2x-img1614867563918-41.png-rs-high-webp.png')" }}>
                <span className="white fw7 f4-l f5">Test Series</span>
                <span className="white mb4 f6 w-70 h2-5">Practice unlimited mock tests and get your All India Rank</span>
                <a className="mt-auto link" href="/">
                  <span className="secondary mr2 f5 f6-l">Explore Test Series</span>
                  <svg version="1.1" width="8" height="8" className="svg-f-secondary" viewBox="0 0 30 48" preserveAspectRatio="" style={{ strokeWwidth: 1 }}>
                    <path d="M0 4.7C6.4 11.1 12.8 17.5 19.4 24 12.9 30.4 6.5 36.7 0.1 43.1c1.7 1.7 3.3 3.3 4.7 4.7 8-8 16.1-16 24.2-24 -8.1-8-16.1-16-24.2-24C3.4 1.3 1.8 2.9 0 4.7z"></path>
                    <path d="M0 4.7c1.8-1.8 3.4-3.4 4.9-4.9 8 8 16.1 16 24.2 24 -8.1 8-16.1 16-24.2 24 -1.5-1.5-3.1-3.1-4.7-4.7C6.5 36.7 12.9 30.4 19.4 24 12.8 17.5 6.4 11.1 0 4.7z"></path>
                  </svg>
                </a>
              </div>
              <div className="home-section-item" style={{ backgroundImage: "url('https://gs-post-images.grdp.co/2021/3/group-38-2x-img1614867563918-41.png-rs-high-webp.png')" }}>
                <span className="white fw7 f4-l f5">Free Videos</span>
                <span className="white mb4 f6 w-70 h2-5">High Quality Content for Complete Conceptual Clarity</span>
                <a className="mt-auto link" href="/">
                  <span className="secondary mr2 f5 f6-l">Explore Free Videos</span>
                  <svg version="1.1" width="8" height="8" className="svg-f-secondary" viewBox="0 0 30 48" preserveAspectRatio="" style={{ strokeWwidth: 1 }}>
                    <path d="M0 4.7C6.4 11.1 12.8 17.5 19.4 24 12.9 30.4 6.5 36.7 0.1 43.1c1.7 1.7 3.3 3.3 4.7 4.7 8-8 16.1-16 24.2-24 -8.1-8-16.1-16-24.2-24C3.4 1.3 1.8 2.9 0 4.7z"></path>
                    <path d="M0 4.7c1.8-1.8 3.4-3.4 4.9-4.9 8 8 16.1 16 24.2 24 -8.1 8-16.1 16-24.2 24 -1.5-1.5-3.1-3.1-4.7-4.7C6.5 36.7 12.9 30.4 19.4 24 12.8 17.5 6.4 11.1 0 4.7z"></path>
                  </svg>
                </a>
              </div>
              <div className="home-section-item" style={{ backgroundImage: "url('https://gs-post-images.grdp.co/2021/3/group-38-2x-img1614867563918-41.png-rs-high-webp.png')" }}>
                <span className="white fw7 f4-l f5">Previous Year Papers</span>
                <span className="white mb4 f6 w-70 h2-5">Practice past years' question papers and get exam ready</span>
                <a className="mt-auto link" href="/">
                  <span className="secondary mr2 f5 f6-l">Explore Papers</span>
                  <svg version="1.1" width="8" height="8" className="svg-f-secondary" viewBox="0 0 30 48" preserveAspectRatio="" style={{ strokeWwidth: 1 }}>
                    <path d="M0 4.7C6.4 11.1 12.8 17.5 19.4 24 12.9 30.4 6.5 36.7 0.1 43.1c1.7 1.7 3.3 3.3 4.7 4.7 8-8 16.1-16 24.2-24 -8.1-8-16.1-16-24.2-24C3.4 1.3 1.8 2.9 0 4.7z"></path>
                    <path d="M0 4.7c1.8-1.8 3.4-3.4 4.9-4.9 8 8 16.1 16 24.2 24 -8.1 8-16.1 16-24.2 24 -1.5-1.5-3.1-3.1-4.7-4.7C6.5 36.7 12.9 30.4 19.4 24 12.8 17.5 6.4 11.1 0 4.7z"></path>
                  </svg>
                </a>
              </div>
              <div className="home-section-item" style={{ backgroundImage: "url('https://gs-post-images.grdp.co/2021/3/group-38-2x-img1614867563918-41.png-rs-high-webp.png')" }}>
                <span className="white fw7 f4-l f5">Free Quizzes</span>
                <span className="white mb4 f6 w-70 h2-5">Attempt topic wise quizzes for improving your score</span>
                <a className="mt-auto link" href="/">
                  <span className="secondary mr2 f5 f6-l">Explore Quizzes</span>
                  <svg version="1.1" width="8" height="8" className="svg-f-secondary" viewBox="0 0 30 48" preserveAspectRatio="" style={{ strokeWwidth: 1 }}>
                    <path d="M0 4.7C6.4 11.1 12.8 17.5 19.4 24 12.9 30.4 6.5 36.7 0.1 43.1c1.7 1.7 3.3 3.3 4.7 4.7 8-8 16.1-16 24.2-24 -8.1-8-16.1-16-24.2-24C3.4 1.3 1.8 2.9 0 4.7z"></path>
                    <path d="M0 4.7c1.8-1.8 3.4-3.4 4.9-4.9 8 8 16.1 16 24.2 24 -8.1 8-16.1 16-24.2 24 -1.5-1.5-3.1-3.1-4.7-4.7C6.5 36.7 12.9 30.4 19.4 24 12.8 17.5 6.4 11.1 0 4.7z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
        <br />
        <section className='mb5-l mb4-5 fixed-width-container ph3 ph0-l'>
          <div className='flex flex-column w-100'>
            <div className='ba-title'>
              <h2> Tại sao nên sử dụng Thi360.com? </h2>
            </div>
            <div className='flex justify-between'>
              <div className='flex flex-column items-center w-30'>
                <img
                  src='https://grdp.co/cdn-cgi/image/quality=100,width=200,f=auto/https://gs-post-images.grdp.co/2021/8/group-6-2x-img1629283053211-98.png-rs-high-webp.png'
                  className='w4-2-l h4-l w3 h2-5 mb3 '
                  alt='Online Classroom Program'
                />
                <p
                  className='mv0 primary f6 f3-l fw7-l fw5 tc'
                  style={{ color: 'rgb(129, 53, 136)', fontWeight: 'bold', fontSize: '1.5rem' }}
                >
                  Online Classroom Program
                </p>
                <p className='mv0 f5 fw7 tc dn db-l'>by Top Faculty</p>
              </div>
              <div className='flex flex-column items-center w-30'>
                <img
                  src='https://grdp.co/cdn-cgi/image/quality=100,width=200,f=auto/https://gs-post-images.grdp.co/2021/8/illustrations-live-courses-2x-img1629272458441-51.png-rs-high-webp.png'
                  className='w4-2-l h4-l w3 h2-5 mb3 mh2 mh4-l'
                  alt='Comprehensive Study Material'
                />
                <p
                  className='mv0 primary f6 f3-l fw7-l fw5 tc'
                  style={{ color: 'rgb(129, 53, 136)', fontWeight: 'bold', fontSize: '1.5rem' }}
                >
                  Comprehensive Study Material
                </p>
                <p className='mv0 f5 fw7 tc dn db-l'>for All Exams</p>
              </div>
              <div className='flex flex-column items-center w-30'>
                <img
                  src='https://grdp.co/cdn-cgi/image/quality=100,width=200,f=auto/https://gs-post-images.grdp.co/2021/8/group-19-woman-mask-2-2x-img1629283123665-66.png-rs-high-webp.png'
                  className='w4-2-l h4-l w3 h2-5 mb3 '
                  alt='Latest Pattern Test Series'
                />
                <p
                  className='mv0 primary f6 f3-l fw7-l fw5 tc'
                  style={{ color: 'rgb(129, 53, 136)', fontWeight: 'bold', fontSize: '1.5rem' }}
                >
                  Latest Pattern Test Series
                </p>
                <p className='mv0 f5 fw7 tc dn db-l'>with Detailed Analysis</p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className='Home-why'>
          <div className='ba-title'>
            <h2> Tại sao nên sử dụng Thi360.com? </h2>
          </div>
          <div className='Hw-box'>
            <div className='row g-2'>
              <div className='col-md-12 col-sm-12'>
                <br />
                <img src='/images/home/Screenshot_315.png' style={{ width: '100%' }} />
                <br />
              </div>
            </div>
          </div>
        </section> */}
        {/* <section className='Home-why'>
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
        </section> */}
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
