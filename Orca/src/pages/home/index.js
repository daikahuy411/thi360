import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import { useAuth } from 'hooks/useAuth'
import Head from 'next/head'
import Link from 'next/link'

import LoadingSpinner from '@core/components/loading-spinner'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const HomePage = () => {
  const auth = useAuth()
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (auth.user) {
      setLoading(true)
      new V1Api().getRecentExams().then(response => {
        setExams(response.data)
        setLoading(false)
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Trang chủ Thi360 - Trang tài liệu, đề thi, luyện đề online, website giáo dục tại Việt Nam</title>
      </Head>
      <div className='container-xxl flex-grow-1 container-p-y'>
        <section className='Home-banner' style={{ color: '#6F2F74' }}>
          {/* <img src='/themes/default/assets/img/intro.png' /> */}
          {/* <label>Sẵn sàng cho kỳ thi của bạn</label> */}
          <h1 className='' style={{ fontSize: 28, color: '#813588' }}>
            Thi360 Testing online
          </h1>
          <h2 class='' style={{ fontSize: 18, color: '#813588' }}>
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

        <section className='Home-exam'>
          <div className='ba-title'>
            <h2> Start your preparation</h2>
          </div>
          {/* <h3 className="home_head__DVePE tc mb3 mt0">Start your preparation</h3> */}
          <div className='He-box'>
            <Grid container md={12} spacing={6}>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant='h6' color='text.primary'>
                      Online Classroom Program
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Live &amp; Recorded courses by Top Faculty
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant='h6' color='text.primary'>
                      Online Classroom Program
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Live &amp; Recorded courses by Top Faculty
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant='h6' color='text.primary'>
                      Online Classroom Program
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Live &amp; Recorded courses by Top Faculty
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant='h6' color='text.primary'>
                      Online Classroom Program
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Live &amp; Recorded courses by Top Faculty
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </section>
        <br />
        <section className='mb5-l mb4-5  ph3 ph0-l'>
          <div className='flex flex-column w-100'>
            <div className='ba-title'>
              <h2> Tại sao nên sử dụng Thi360.com? </h2>
            </div>
            <div className='flex justify-between'>
              <div className='flex flex-column items-center w-30'>
                <img
                  src='https://grdp.co/cdn-cgi/image/quality=100,width=200,f=auto/https://gs-post-images.grdp.co/2021/8/group-6-2x-img1629283053211-98.png-rs-high-webp.png'
                  className=''
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
                  className='mh2 mh4-l'
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
                  className=''
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
