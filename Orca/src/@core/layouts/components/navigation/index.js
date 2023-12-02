import Link from 'next/link'
import { useState } from 'react'
import { systemLinks, classLinks, examLinks, programLinks } from 'navigation'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { handleURLQueries } from '@core/layouts/utils'
import { useAuth } from 'hooks/useAuth'

const Navigation = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState('home')
  const router = useRouter()
  const auth = useAuth()

  // console.log(auth.user)

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
      <div
        className='app-brand demo '
        style={{ padding: 20, background: '#fff', textAlign: 'center', display: 'block' }}
      >
        <Link href='/' className='app-brand-link' style={{ display: 'inline-block' }}>
          <span className='app-brand-logo demo me-1 logo'>
            <img src='/themes/default/assets/img/edu-icon.svg' />
          </span>
          <br />
        </Link>
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
        {auth && auth.user && auth.user.roles && auth.user.roles.length > 0 && (
          <>
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
              className={activeMenuIndex === 'systems' ? 'menu-item open' : 'menu-item'}
              onClick={() => {
                activeMenuIndex === 'systems' ? setActiveMenuIndex('') : setActiveMenuIndex('systems')
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
          </>
        )}
        <li className='menu-header fw-medium'>
          <span className='menu-header-text'></span>
        </li>
        <li
          className={clsx('menu-item', {
            'active open': isNavLinkActive({ path: '/help' }),
            open: activeMenuIndex === 'help'
          })}
          onClick={() => {
            activeMenuIndex === 'help' ? setActiveMenuIndex('') : setActiveMenuIndex('help')
          }}
        >
          <Link href='http://help.thi360.com' target='_blank' className='menu-link'>
            <img className='menu-icon tf-icons' src='/themes/default/assets/img/icon-menu/menu-quest.svg' />
            <div>Hướng dẫn</div>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Navigation
