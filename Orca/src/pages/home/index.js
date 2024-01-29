import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import { useAuth } from 'hooks/useAuth'
import Head from 'next/head'
import Link from 'next/link'

import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import CustomAvatar from '@core/components/mui/avatar'
import Box from '@mui/material/Box'
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
        <section className='Home-banner'>
          {/* <img src='/themes/default/assets/img/intro.png' /> */}
          {/* <label>Sẵn sàng cho kỳ thi của bạn</label> */}
          <h1 className='' style={{ fontSize: 36 }}>
            Giải pháp Thi trực tuyến Thi360.com.
          </h1>
          <br />
          <h2 className='' style={{ fontSize: 18 }}>
            Hệ thống Thi và tổ chức Thi trực tuyến toàn diện cho Học viên và Giáo viên, Trung tâm, Nhà trường.
          </h2>
          {/* <p>Thực hiện các bài kiểm tra thử của chúng tôi bao nhiêu tùy thích MIỄN PHÍ!</p> */}
          {/* <button type='button' className='btn btn-outline-primary btn-sm waves-effect text-white'>
            Thi thử
          </button> */}
        </section>
        <br />
        <LoadingSpinner active={loading} minHeight={0}>
          <>
            {auth.user && exams && (
              <>
                <div className='row'>
                  <div className='col-12 text-center'>
                    <div className='section-heading'>
                      <h2>Kỳ thi xem gần đây </h2>
                    </div>
                    <p>Top 6 Kỳ thi tham gia gần nhất </p>
                  </div>
                </div>
                <br />
                <section className='Home-exam'>
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
              </>
            )}
          </>
        </LoadingSpinner>

        <div className='row'>
          <div className='col-12 text-center'>
            <div className='section-heading'>
              <h2>Chuẩn bị cho Kỳ thi của bạn</h2>
            </div>
            <p>Hãy trải nghiệm hệ thống thi online ngay hôm nay và khám phá sự tiến bộ trong học tập của bạn</p>
          </div>
        </div>
        <br />
        <Card>
          <CardContent>
            <Grid container spacing={6} sx={{ textAlign: 'center' }}>
              <Grid item md={4} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CustomAvatar
                    skin='light'
                    color='primary'
                    sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                  >
                    <Icon icon='mdi:star-outline' />
                  </CustomAvatar>
                  <Typography sx={{ mb: 3, fontWeight: '600' }}>Ngân hàng Câu hỏi phong phú, chất lượng.</Typography>
                  <Typography>
                    Bạn có thể lựa chọn nhiều môn học khác nhau, từ toán học, ngữ văn, khoa học đến lịch sử và ngoại
                    ngữ..
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={4} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CustomAvatar
                    skin='light'
                    color='primary'
                    sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                  >
                    <Icon icon='mdi:progress-check' />
                  </CustomAvatar>
                  <Typography sx={{ mb: 3, fontWeight: '600' }}>Dễ dàng theo dõi sự tiến bộ.</Typography>
                  <Typography>
                    Bạn cũng có thể theo dõi tiến độ học tập và tiến bộ của mình qua các báo cáo chi tiết.
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={4} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CustomAvatar
                    skin='light'
                    color='primary'
                    sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                  >
                    <Icon icon='mdi:medal' />
                  </CustomAvatar>
                  <Typography sx={{ mb: 3, fontWeight: '600' }}>2 chế độ Ôn luyện và Thi- Kiểm tra</Typography>
                  <Typography>Bạn cũng có thể tùy chỉnh cách làm bài thi và thời gian làm bài.</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br />

        <br />
        <br />
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='section-heading'>
              <h2>3 bước để trải nghiệm LMS miễn phí với đầy đủ tính năng</h2>
            </div>
            <p>Đăng ký dùng thử miễn phí với đầy đủ tính năng để khám phá hệ thống.</p>
          </div>
        </div>
        <br />
        <Card>
          <CardContent>
            <Grid container spacing={6} sx={{ textAlign: 'center' }}>
              <Grid item md={4} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CustomAvatar
                    skin='light'
                    color='primary'
                    sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                  >
                    <Icon icon='mdi:account-plus-outline' />
                  </CustomAvatar>
                  <Typography sx={{ mb: 3, fontWeight: '600' }}>1. Đăng ký và xác nhận tài khoản</Typography>
                  <Typography>Đăng ký tài khoản hoặc Đăng nhập qua Google/Facebook.</Typography>
                </Box>
              </Grid>
              <Grid item md={4} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CustomAvatar
                    skin='light'
                    color='primary'
                    sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                  >
                    <Icon icon='mdi:school-outline' />
                  </CustomAvatar>
                  <Typography sx={{ mb: 3, fontWeight: '600' }}>2. Đăng ký tài khoản Giáo viên</Typography>
                  <Typography>Gửi yêu cầu đăng ký Hồ sơ giáo viên cho chúng tôi.</Typography>
                </Box>
              </Grid>
              <Grid item md={4} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CustomAvatar
                    skin='light'
                    color='primary'
                    sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                  >
                    <Icon icon='mdi:speedometer' />
                  </CustomAvatar>
                  <Typography sx={{ mb: 3, fontWeight: '600' }}>3. Đăng ký sử dụng gói Miễn phí</Typography>
                  <Typography>
                    Sử dụng gói Miễn phí dành cho Giáo viên để sử dụng LMS miễn phí với đầy đủ tính năng.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br />
        <br />
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='section-heading'>
              <h2>Tổ chức Thi online dễ dàng với Thi360 LMS</h2>
            </div>
            <p>
              Hãy để phần mềm dễ dàng vận hành của chúng tôi giúp bạn tiết kiệm thời gian và nỗ lực trong quá trình quản
              lý và vận hành. Đừng để công việc trở nên phức tạp hơn cần thiết. Hãy trải nghiệm sự dễ dàng và hiệu quả
              ngay hôm nay với phần mềm của chúng tôi.
            </p>
          </div>
        </div>
        <br />
        <Card>
          <div className='row bg-white border-radius-15 py-4'>
            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature p-4'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-map-alt text-medium'>
                      <CustomAvatar
                        skin='light'
                        color='primary'
                        sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                      >
                        <Icon icon='mdi:rocket-launch' />
                      </CustomAvatar>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>Đầy đủ nghiệp vụ</h5>
                    <p className='text-sm'>
                      Giải pháp hoàn hảo cho nhu cầu nghiệp vụ của bạn. Với cam kết cung cấp nghiệp vụ đầy đủ và tiện
                      lợi, chúng tôi đảm bảo rằng bạn sẽ tiết kiệm thời gian và nỗ lực trong quá trình làm việc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature p-4'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-direction-alt text-medium'>
                      <span className='ti-map-alt text-medium'>
                        <CustomAvatar
                          skin='light'
                          color='primary'
                          sx={{
                            mb: 3,
                            width: [70, 80],
                            height: [70, 80],
                            '& svg': { fontSize: ['2.2rem', '2.5rem'] }
                          }}
                        >
                          <Icon icon='mdi:lifebuoy' />
                        </CustomAvatar>
                      </span>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>Hướng dẫn chi tiết</h5>
                    <p className='text-sm'>
                      Tài liệu hướng dẫn cung cấp cho bạn một hướng dẫn chi tiết và dễ hiểu về cách sử dụng hệ thống.
                      Hãy khám phá chức năng thông qua tài liệu hướng dẫn đầy đủ và chi tiết.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature p-4'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-layout text-medium'>
                      <CustomAvatar
                        skin='light'
                        color='primary'
                        sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                      >
                        <Icon icon='mdi:chat-processing-outline' />
                      </CustomAvatar>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>Hỗ trợ 24/7</h5>
                    <p className='text-sm'>
                      Với cam kết sẵn sàng phục vụ bạn mọi lúc, mọi nơi, chúng tôi đảm bảo rằng bạn sẽ luôn có sự hỗ trợ
                      khi cần thiết.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature px-4 pt-10'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-search text-medium'>
                      <CustomAvatar
                        skin='light'
                        color='primary'
                        sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                      >
                        <Icon icon='mdi:help-circle-outline' />
                      </CustomAvatar>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>8 dạng câu hỏi phổ biến</h5>
                    <p className='text-sm'>
                      Hệ thống cung cấp 8 dạng câu hỏi Trắc nghiệm và Tự luận phổ biến đáp ứng hầu hết các dạng thi thực
                      tế.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature px-4 pt-10'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-split-h text-medium'>
                      <CustomAvatar
                        skin='light'
                        color='primary'
                        sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                      >
                        <Icon icon='mdi:tune-vertical-variant' />
                      </CustomAvatar>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>2 chế độ Kỳ thi</h5>
                    <p className='text-sm'>
                      Chế độ Ôn luyện cho phép Học viên dễ dàng Ôn thi đạt hiệu quả tốt nhất. Chế độ Kiểm tra mô phỏng
                      bài thư như thật với nhiều tùy chọn hiển thị đáp án sau khi nộp bài.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature px-4 pt-10'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-loop text-medium'>
                      <span className='ti-split-h text-medium'>
                        <CustomAvatar
                          skin='light'
                          color='primary'
                          sx={{
                            mb: 3,
                            width: [70, 80],
                            height: [70, 80],
                            '& svg': { fontSize: ['2.2rem', '2.5rem'] }
                          }}
                        >
                          <Icon icon='mdi:marker' />
                        </CustomAvatar>
                      </span>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>Chấm điểm tự luận</h5>
                    <p className='text-sm'>
                      Hệ thống cung cấp chức năng Chấm điểm tự luận cho Giáo viên chấm bài thi có câu hỏi Tự luận một
                      cách dễ dàng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature p-4'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-check-box text-medium'>
                      <CustomAvatar
                        skin='light'
                        color='primary'
                        sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                      >
                        <Icon icon='mdi:flash-outline' />
                      </CustomAvatar>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>Tùy biến Cấu trúc đề thi</h5>
                    <p className='text-sm'>
                      Tùy biến cấu trúc đề thi theo các phần thi. Mỗi phần thi có thể lấy câu hỏi trực tiếp hoặc ngẫu
                      nhiên linh hoạt. Ngoài ra, Giáo viên có thể định nghĩa điểm cho từng phần thi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature p-4'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-cloud-up text-medium'>
                      <CustomAvatar
                        skin='light'
                        color='primary'
                        sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                      >
                        <Icon icon='mdi:database-outline' />
                      </CustomAvatar>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>Báo cáo chi tiết</h5>
                    <p className='text-sm'>
                      Cung cấp báo cáo chi tiết kết quả thi của Học viên trong Kỳ thi. Báo cáo chi tiết tỷ lệ đúng/sai
                      trên câu hỏi trong đề thi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature p-4'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-headphone-alt text-medium'>
                      <CustomAvatar
                        skin='light'
                        color='primary'
                        sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                      >
                        <Icon icon='mdi:file-word-outline' />
                      </CustomAvatar>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>Xuất đề thi offline</h5>
                    <p className='text-sm'>Giáo viên có thể xuất Đề thi dưới dạng word để thi offline.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature p-4'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-paint-bucket text-medium'>
                      <CustomAvatar
                        skin='light'
                        color='primary'
                        sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                      >
                        <Icon icon='mdi:thumb-up' />
                      </CustomAvatar>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>Giao diện thân thiện</h5>
                    <p className='text-sm'>
                      Với giao diện người dùng thân thiện và dễ sử dụng, bạn sẽ có thể nhanh chóng làm quen và bắt đầu
                      sử dụng phần mềm một cách dễ dàng. .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature p-4'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-thumb-up ti-settings text-medium'>
                      <CustomAvatar
                        skin='light'
                        color='primary'
                        sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                      >
                        <Icon icon='mdi:navigation' />
                      </CustomAvatar>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>Điều hướng thông minh</h5>
                    <p className='text-sm'>
                      Không chỉ cung cấp các tính năng đầy đủ, phần mềm của chúng tôi còn mang lại sự tiện lợi tuyệt
                      đối, giúp bạn dễ dàng điều hướng và tận dụng tối đa các tính năng.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-sm-12 col-md-6 col-lg-4 p-0'>
              <div className='single-feature p-4'>
                <div className='row'>
                  <div className='col-lg-3 col-12 text-right text-gradient'>
                    <span className='ti-plus text-medium'>
                      <CustomAvatar
                        skin='light'
                        color='primary'
                        sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                      >
                        <Icon icon='mdi:more' />
                      </CustomAvatar>
                    </span>
                  </div>
                  <div className='col-lg-9 col-12'>
                    <h5>&amp; nhiều tính năng khác</h5>
                    <p className='text-sm'>
                      Truy cập trang Hướng dẫn để khám phá các tính năng khác mà Thi360 cung cấp giúp Giáo viên dễ dàng
                      tổ chức Kỳ thi online.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <br />
        <br />
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='section-heading'>
              <h2>Bạn cần trợ giúp</h2>
            </div>
            <p>Chúng tôi luôn sẵn sàng trợ giúp 🤩</p>
          </div>
        </div>
        <br />
        <Card>
          <CardContent>
            <Grid container spacing={6} sx={{ textAlign: 'center' }}>
              <Grid item md={4} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CustomAvatar
                    skin='light'
                    color='primary'
                    sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                  >
                    <Icon icon='mdi:phone-dial-outline' />
                  </CustomAvatar>
                  <Typography sx={{ mb: 3, fontWeight: '600' }}>0988.397.448</Typography>
                  <Typography>Gọi vào hotline hoặc nhắn tin, chúng tôi sẽ gọi lại.</Typography>
                </Box>
              </Grid>
              <Grid item md={4} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CustomAvatar
                    skin='light'
                    color='primary'
                    sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                  >
                    <Icon icon='mdi:star-outline' />
                  </CustomAvatar>
                  <Typography sx={{ mb: 3, fontWeight: '600' }}>Zalo: </Typography>
                  <Typography>Hỗ trợ thông qua Zalo.</Typography>
                </Box>
              </Grid>
              <Grid item md={4} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CustomAvatar
                    skin='light'
                    color='primary'
                    sx={{ mb: 3, width: [70, 80], height: [70, 80], '& svg': { fontSize: ['2.2rem', '2.5rem'] } }}
                  >
                    <Icon icon='mdi:facebook' />
                  </CustomAvatar>
                  <Typography sx={{ mb: 3, fontWeight: '600' }}>Facebook</Typography>
                  <Typography>Hỗ trợ thông qua Facebook.</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br />
        <br />
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='section-heading'>
              <h2> Số #1 về Thi trực tuyến</h2>
            </div>
          </div>
        </div>
        <br />
        <Card>
          <CardContent style={{ padding: 30 }}>
            <Grid container>
              <Grid md={4} lg={4} alignContent={'center'} alignItems={'center'}>
                <div className='Hnb-detail' style={{ marginBottom: 40 }}>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/countri.svg' />
                  </span>
                  <p>
                    10+<span>Chương trình</span>
                  </p>
                </div>
              </Grid>
              <Grid md={4} lg={4}>
                <div className='Hnb-detail' style={{ marginBottom: 40 }}>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/test.svg' />
                  </span>
                  <p>
                    10.000+<span>Thành viên</span>
                  </p>
                </div>
              </Grid>
              <Grid md={4} lg={4}>
                <div className='Hnb-detail' style={{ marginBottom: 40 }}>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/test.svg' />
                  </span>
                  <p>
                    10.000+<span>Thành viên</span>
                  </p>
                </div>
              </Grid>
              <Grid md={4} lg={4}>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/academic.svg' />
                  </span>
                  <p>
                    100+<span>Chủ đề</span>
                  </p>
                </div>
              </Grid>
              <Grid md={4} lg={4}>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/general.svg' />
                  </span>
                  <p>
                    30,000+<span>Đề thi</span>
                  </p>
                </div>
              </Grid>
              <Grid md={4} lg={4}>
                <div className='Hnb-detail'>
                  <span>
                    <img src='/themes/default/assets/img/icon-numb/quest.svg' />
                  </span>
                  <p>
                    1,000,0000+<span>Câu hỏi</span>
                  </p>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default HomePage
