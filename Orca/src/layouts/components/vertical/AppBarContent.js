import Link from 'next/link'
import UserDropdown from '@core/layouts/components/shared-components/UserDropdown'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const AppBarContent = props => {
  const [path, setPath] = useState('')
  const [page, setPage] = useState('')
  const router = useRouter()

  useEffect(() => {
    let currentPage = ''
    if (router.asPath.indexOf('/home') > -1) {
      currentPage = 'Trang chủ'
    }
    if (router.asPath.indexOf('/apps') > -1) {
      currentPage = 'LMS'
    }
    if (router.asPath.indexOf('/program') > -1) {
      currentPage = 'Chương trình'
    }
    if (router.asPath.indexOf('/help') > -1) {
      currentPage = 'Hướng dẫn'
    }
    if (router.asPath.indexOf('/exam') > -1) {
      currentPage = 'Kỳ thi'
    }
    if (router.asPath.indexOf('/user-profile/profile') > -1) {
      currentPage = 'Trang cá nhân'
    }
    if (router.asPath.indexOf('/account-settings') > -1) {
      currentPage = 'Thông tin tài khoản'
    }
    if (router.asPath.indexOf('/attemp-history') > -1) {
      currentPage = 'Lịch sử thi'
    }
    if (router.asPath.indexOf('/test-result') > -1) {
      currentPage = 'Kết quả thi'
    }
    if (router.asPath.indexOf('/pricing') > -1) {
      currentPage = 'Bảng giá'
    }
    if (router.asPath.indexOf('/post/') > -1) {
      currentPage = 'Tin bài'
    }
    if (router.asPath.indexOf('/apps/class') > -1) {
      currentPage = 'Quản lý Lớp học'
    }
    if (router.asPath.indexOf('/apps/user') > -1) {
      currentPage = 'Quản lý Học viên'
    }
    if (router.asPath.indexOf('/apps/post') > -1) {
      currentPage = 'Quản lý Tin bài'
    }
    if (router.asPath.indexOf('/apps/post-category') > -1) {
      currentPage = 'Quản lý Danh mục Tin bài'
    }
    if (router.asPath.indexOf('/apps/exam') > -1) {
      currentPage = 'Quản lý Kỳ thi'
    }

    setPage(currentPage)
  }, [router])

  return (
    <nav
      className='layout-navbar navbar navbar-expand-xl navbar-detached align-items-center'
      id='layout-navbar'
      style={{ backgroundColor: '#fff' }}
    >
      <div className='layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0   d-xl-none '>
        <a className='nav-item nav-link px-0 me-xl-4'>
          <i className='mdi mdi-menu mdi-24px'></i>
        </a>
      </div>
      <div className='navbar-nav-right d-flex align-items-center' id='navbar-collapse'>
        <div className='navbar-nav align-items-center' style={{ paddingLeft: 10 }}>
          <h3 className='mb-0' style={{fontSize: '1.2rem'}}>{page}</h3>
          {path}
        </div>
        <ul className='navbar-nav flex-row align-items-center ms-auto'>
          <li className='nav-item' style={{ marginRight: 10 }}>
            <Link
              href={'/pricing'}
              className='btn btn-primary waves-effect waves-light btn-sm'
              style={{ textTransform: 'none', fontSize: 14 }}
            >
              <img className='me-3' src='/themes/default/assets/img/coin.svg' />
              Bảng giá&nbsp;&nbsp;
            </Link>
          </li>
        </ul>
        <UserDropdown />
      </div>
    </nav>
  )
}

export default AppBarContent
