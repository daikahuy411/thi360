import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import Icon from "../util-components/Icon";
import NavSearch from "./NavSearch";
import { toggleCollapsedNav, onMobileNavToggle } from "redux/actions/Theme";
import {
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from "constants/ThemeConstant";
import utils from "utils";
import NavProfile from "./NavProfile";
import modulesConfig from "configs/ModuleConfig";
import IntlMessage from "../util-components/IntlMessage";
import { Link, useLocation } from "react-router-dom";
import authService from "services/authService";
import { useHistory } from "react-router-dom";

const { Header } = Layout;
const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

export const HeaderNav = (props) => {
  const {
    navCollapsed,
    mobileNav,
    headerNavColor,
    toggleCollapsedNav,
    onMobileNavToggle,
    isMobile,
    currentTheme,
  } = props;
  const [searchActive, setSearchActive] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  let location = useLocation();
  let history = useHistory();

  const onSearchClose = () => {
    setSearchActive(false);
  };

  useEffect(() => {
    var userProfile = authService.getUserProfile();
    if (Object.keys(userProfile).length === 0) {
      authService.logout();
      return;
    }
    setUserProfile(userProfile);
  }, []);

  const logOut = () => {
    authService.logout();
    window.location.href = "/lms/auth/login";
  }

  const onToggle = () => {
    if (!isMobile) {
      toggleCollapsedNav(!navCollapsed);
    } else {
      onMobileNavToggle(!mobileNav);
    }
  };

  const isNavTop = false; //navType === NAV_TYPE_TOP ? true : false;
  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(
        currentTheme === "dark" ? "#00000" : "#ffffff"
      );
    }
    return utils.getColorContrast(headerNavColor);
  };
  const navMode = mode();
  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return "0px";
    }
    if (navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
      return `${SIDE_NAV_WIDTH}px`;
    }
  };

  useEffect(() => {
    if (!isMobile) {
      onSearchClose();
    }
  });

  const hasAccessMenu = (menuRoles) => {
    return menuRoles.filter(value => userProfile.roles.includes(value)).length > 0;
  };

  const headerColor = '#3e4eb2'; //"rgb(8, 27, 75)"

  return (
    <Header
      className={`app-header ${navMode}`}
      style={{ backgroundColor: headerColor }}
    >
      <div className={`app-header-wrapper ${isNavTop ? "layout-top-nav" : ""}`}>
        <Logo logoType={navMode} />
        <div className="nav" style={{ width: `calc(100% - ${getNavWidth()})` }}>
          <div className="nav-left">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">
              {isNavTop && !isMobile ? null : (
                <li
                  className="ant-menu-item ant-menu-item-only-child"
                  onClick={() => {
                    onToggle();
                  }}
                >
                  {navCollapsed || isMobile ? (
                    <MenuUnfoldOutlined
                      style={{ color: "white" }}
                      className="nav-icon"
                    />
                  ) : (
                    <MenuFoldOutlined
                      style={{ color: "white" }}
                      className="nav-icon"
                    />
                  )}
                </li>
              )}
              {userProfile && modulesConfig.map((item, index) => (
                <>
                  {(!item.roles || item.roles.length === 0 || hasAccessMenu(item.roles)) && (
                    <li
                      key={`menu-top-item-${index}`}
                      style={{ color: "white" }}
                      className={
                        location.pathname.indexOf(item.module) >= 0
                          ? "ant-menu-item ant-menu-item-header-selected ant-menu-item ant-menu-item-only-child ant-menu-item-header"
                          : "ant-menu-item ant-menu-item-only-child ant-menu-item-header"
                      }
                    >
                      <Icon type={item.icon} style={{ color: "white" }} />
                      <span>{setLocale(true, item.title)}</span>
                      {item.path ? <Link to={item.path} /> : null}
                    </li>
                  )}
                </>
              ))}
            </ul>
            {/* <MenuContent topNavColor={'#fff'} type={NAV_TYPE_TOP} localization={true} /> */}
          </div>
          <div className="nav-right">
            <NavProfile signOut={logOut} />
          </div>
          <NavSearch active={searchActive} close={onSearchClose} />
        </div>
      </div>
    </Header>
  );
};

const mapStateToProps = ({ theme }) => {
  const {
    navCollapsed,
    navType,
    headerNavColor,
    mobileNav,
    currentTheme,
    direction,
  } = theme;
  return {
    navCollapsed,
    navType,
    headerNavColor,
    mobileNav,
    currentTheme,
    direction,
  };
};

export default connect(mapStateToProps, {
  toggleCollapsedNav,
  onMobileNavToggle,
})(HeaderNav);
