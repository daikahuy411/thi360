import Link from 'next/link'
import UserDropdown from '@core/layouts/components/shared-components/UserDropdown'

const AppBarContent = props => {
  return (
    <nav
      className='layout-navbar navbar navbar-expand-xl navbar-detached align-items-center'
      id='layout-navbar'
      style={{ backgroundColor: '#fff' }}
    >
      <div className='layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0   d-xl-none '>
        <a className='nav-item nav-link px-0 me-xl-4' href='#'>
          <i className='mdi mdi-menu mdi-24px'></i>
        </a>
      </div>
      <div className='navbar-nav-right d-flex align-items-center' id='navbar-collapse'>
        <div className='navbar-nav align-items-center'>
          <h3 className='mb-0 f-24'>Trang chủ</h3>
        </div>
        <ul className='navbar-nav flex-row align-items-center ms-auto'>
          <li className='nav-item' style={{ marginRight: 10 }}>
            <Link
              href={'/pricing'}
              className='btn btn-primary waves-effect waves-light btn-sm'
              style={{ textTransform: 'none' }}
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
