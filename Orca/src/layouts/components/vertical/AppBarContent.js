import Link from 'next/link'

// ** Icon Imports
import Icon from '@core/components/icon'
import NotificationDropdown from '@core/layouts/components/shared-components/NotificationDropdown'
import UserDropdown from '@core/layouts/components/shared-components/UserDropdown'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

const AppBarContent = props => {
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

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
          <li style={{ marginRight: 10 }} className='nav-item navbar-dropdown dropdown-user dropdown'>
            <a className='nav-link dropdown-toggle hide-arrow p-0' data-bs-toggle='dropdown'>
              <div className='avatar avatar-online'>
                <img src='/themes/default/assets/img/avatars/1.png' alt='' className='w-px-40 h-auto rounded-circle' />
              </div>
            </a>
            <ul className='dropdown-menu dropdown-menu-end mt-3 py-2'>
              <li>
                <a className='dropdown-item pb-2 mb-1 waves-effect' href='pages-account-settings-account.html'>
                  <div className='d-flex align-items-center'>
                    <div className='flex-shrink-0 me-2 pe-1'>
                      <div className='avatar avatar-online'>
                        <img src='assets/img/avatars/1.png' alt='' className='w-px-40 h-auto rounded-circle' />
                      </div>
                    </div>
                    <div className='flex-grow-1'>
                      <h6 className='mb-0'>John Doe</h6>
                      <small className='text-muted'>Admin</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className='dropdown-divider my-0'></div>
              </li>
              <li>
                <a className='dropdown-item waves-effect' href='pages-profile-user.html'>
                  <i className='mdi mdi-account-outline me-1 mdi-20px'></i>
                  <span className='align-middle'>My Profile</span>
                </a>
              </li>
              <li>
                <a className='dropdown-item waves-effect' href='pages-account-settings-account.html'>
                  <i className='mdi mdi-cog-outline me-1 mdi-20px'></i>
                  <span className='align-middle'>Settings</span>
                </a>
              </li>
              <li>
                <a className='dropdown-item waves-effect' href='pages-account-settings-billing.html'>
                  <span className='d-flex align-items-center align-middle'>
                    <i className='flex-shrink-0 mdi mdi-credit-card-outline me-1 mdi-20px'></i>
                    <span className='flex-grow-1 align-middle ms-1'>Billing</span>
                    <span className='flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20'>4</span>
                  </span>
                </a>
              </li>
              <li>
                <div className='dropdown-divider'></div>
              </li>
              <li>
                <a className='dropdown-item waves-effect' href='pages-faq.html'>
                  <i className='mdi mdi-help-circle-outline me-1 mdi-20px'></i>
                  <span className='align-middle'>FAQ</span>
                </a>
              </li>
              <li>
                <a className='dropdown-item waves-effect' href='pages-pricing.html'>
                  <i className='mdi mdi-currency-usd me-1 mdi-20px'></i>
                  <span className='align-middle'>Pricing</span>
                </a>
              </li>
              <li>
                <div className='dropdown-divider my-1'></div>
              </li>
              <li>
                <a className='dropdown-item waves-effect' href='auth-login-cover.html' target='_blank'>
                  <i className='mdi mdi-logout me-1 mdi-20px'></i>
                  <span className='align-middle'>Log Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className='navbar-search-wrapper search-input-wrapper d-none'>
        <input
          type='text'
          className='form-control search-input container-xxl border-0'
          placeholder='Search...'
          aria-label='Search...'
        />
        <i className='mdi mdi-close search-toggler cursor-pointer'></i>
      </div>
    </nav>
  )
}

export default AppBarContent
