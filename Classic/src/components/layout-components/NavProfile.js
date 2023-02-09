import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Avatar } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import authService from "services/authService";

const menuItem = [
  {
    title: "Thay đổi thông tin",
    icon: EditOutlined,
    path: "/"
  },
  {
    title: "Cấu hình tài khoản",
    icon: SettingOutlined,
    path: "/"
  },
  //   {
  // 	title: "Thanh toán",
  // 	icon: ShopOutlined ,
  // 	path: "/"
  // },
  {
    title: "Hướng dẫn",
    icon: QuestionCircleOutlined,
    path: "/"
  }
]

export const NavProfile = ({ signOut }) => {
  const [userProfile, setUserProfile] = useState(null)
  const profileImg = "/img/avatars/thumb-1.jpg";

  const profileMenu = (
    <>
      {userProfile && (
        <div className="nav-profile nav-dropdown">
          <div className="nav-profile-header">
            <div className="d-flex">
              <Avatar size={45} src={profileImg} />
              <div className="pl-3">
                <h4 className="mb-0">{userProfile.name}</h4>
                <span className="text-muted">{userProfile.userName}</span>
                {/* <span className="text-muted">Frontend Developer</span> */}
              </div>
            </div>
          </div>
          <div className="nav-profile-body">
            <Menu>
              {/* {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })} */}
              <Menu.Item key={menuItem.length + 1} onClick={e => signOut()}>
                <span>
                  <LogoutOutlined />
                  <span className="font-weight-normal">Đăng xuất</span>
                </span>
              </Menu.Item>
            </Menu>
          </div>
        </div>)}
    </>
  );

  useEffect(() => {
    setUserProfile(authService.getUserProfile());
  }, []);

  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar size={30} src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default NavProfile
