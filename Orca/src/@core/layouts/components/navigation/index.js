import Link from 'next/link'
import { useState } from 'react'
import { systemLinks, classLinks, examLinks, programLinks } from 'navigation'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { handleURLQueries } from '@core/layouts/utils'

const Navigation = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState('home')
  const router = useRouter()

  const isNavLinkActive = item => {
    if (router.asPath.indexOf(item.path) >= 0 || handleURLQueries(router, item.path)) {
      return true
    } else {
      return false
    }
  }

  return (
    <aside
      id='layout-menu'
      className='layout-menu menu-vertical menu bg-menu-theme'
      style={{ backgroundColor: 'white!important' }}
    >
      <div className='app-brand demo '>
        <Link href='/' className='app-brand-link'>
          <span className='app-brand-logo demo me-1 logo'>
            <span>
              <img src='/themes/default/assets/img/edu-icon.svg' style={{ width: 40 }} />
            </span>
          </span>
          <span className='app-brand-text demo menu-text fw-semibold ms-2' style={{ color: '#9b51e0' }}>
            Thi360
          </span>
        </Link>
        <a className='layout-menu-toggle menu-link text-large ms-auto'>
          <i className='mdi mdi-chevron-left-circle-outline d-xl-block align-middle mdi-20px'></i>
        </a>
      </div>
      <div className='menu-inner-shadow'></div>
      <ul className='menu-inner py-1'>
        <li
          className={clsx('menu-item', {
            'active open': isNavLinkActive({ path: '/home' })
          })}
        >
          <Link href='/home' className='menu-link'>
            <i className='menu-icon tf-icons mdi mdi-home-outline'></i>
            <div>Trang chủ</div>
          </Link>
        </li>
        <li className='menu-header fw-medium'>
          <span className='menu-header-text'></span>
        </li>
        <li
          className={clsx('menu-item', {
            'active open': isNavLinkActive({ path: '/program' }),
            open: activeMenuIndex === 'program'
          })}
          onClick={() => {
            activeMenuIndex === 'program' ? setActiveMenuIndex('') : setActiveMenuIndex('program')
          }}
        >
          <a
            className={clsx('menu-link menu-toggle', {
              active: isNavLinkActive({ path: '/program' })
            })}
          >
            <img className='menu-icon tf-icons' src='/themes/default/assets/img/icon-menu/menu-book.svg' />
            <div>Chương trình</div>
          </a>
          <ul className='menu-sub'>
            {programLinks.map(item => (
              <>
                <li className='menu-item' key={`menu-item-${item.path}`}>
                  <Link
                    href={item.path}
                    className={clsx('menu-link', {
                      active: isNavLinkActive({ path: item.path })
                    })}
                  >
                    <div> {item.title} </div>
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </li>
        <li className='menu-header fw-medium'>
          <span className='menu-header-text'></span>
        </li>
        <li
          className={activeMenuIndex === 'classes' ? 'menu-item open' : 'menu-item'}
          onClick={() => {
            activeMenuIndex === 'classes' ? setActiveMenuIndex('') : setActiveMenuIndex('classes')
          }}
        >
          <a className='menu-link menu-toggle'>
            <img className='menu-icon tf-icons' src='/themes/default/assets/img/icon-menu/menu-group.svg' />
            <div>Lớp & Học viên</div>
          </a>
          <ul className='menu-sub'>
            {classLinks.map(item => (
              <>
                <li className='menu-item' key={`menu-item-${item.path}`}>
                  <Link href={item.path} className='menu-link'>
                    <div> {item.title} </div>
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </li>
        <li className='menu-header fw-medium'>
          <span className='menu-header-text'></span>
        </li>
        <li
          className={activeMenuIndex === 'exams' ? 'menu-item open' : 'menu-item'}
          onClick={() => {
            activeMenuIndex === 'exams' ? setActiveMenuIndex('') : setActiveMenuIndex('exams')
          }}
        >
          <a className='menu-link menu-toggle'>
            <img className='menu-icon tf-icons' src='/themes/default/assets/img/icon-menu/menu-cup.svg' />
            <div>Thi &amp; kiểm tra</div>
          </a>
          <ul className='menu-sub'>
            {examLinks.map(item => (
              <>
                <li className='menu-item' key={`menu-item-${item.path}`}>
                  <Link href={item.path} className='menu-link'>
                    <div> {item.title} </div>
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </li>
        <li className='menu-header fw-medium'>
          <span className='menu-header-text'></span>
        </li>
        <li
          className='menu-item'
          onClick={() => {
            activeMenuIndex === 'exams' ? setActiveMenuIndex('') : setActiveMenuIndex('exams')
          }}
        >
          <a className='menu-link menu-toggle'>
            <img className='menu-icon tf-icons' src='/themes/default/assets/img/icon-menu/menu-setting.svg' />
            <div>Quản lý hệ thống</div>
          </a>
          <ul className='menu-sub'>
            {systemLinks.map(item => (
              <>
                <li className='menu-item' key={`menu-item-${item.path}`}>
                  <Link href={item.path} className='menu-link'>
                    <div> {item.title} </div>
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </li>
        <li className='menu-header fw-medium'>
          <span className='menu-header-text'></span>
        </li>
        <li className='menu-item'>
          <Link href='/help' className='menu-link'>
            <img className='menu-icon tf-icons' src='/themes/default/assets/img/icon-menu/menu-quest.svg' />
            <div>Hướng dẫn</div>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Navigation
