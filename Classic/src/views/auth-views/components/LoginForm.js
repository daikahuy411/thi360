import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import authService from "services/authService";

export const LoginForm = (props) => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const onLogin = (values) => {
    showLoading();

    authService.logout();
    try {
      authService.login(values.email, values.password).then((response) => {
        const { data } = response;
        hideLoading();
        if (data.isSuccess === true) {
          authService.setSession(data.value.token);
          authService.setUserProfile(data.value);
          localStorage.setItem("accessToken", data.value.token);
          history.push("/");
        } else {
          message.error("Tên đăng nhập hoặc mật khẩu không chính xác.");
        }
      });
    } catch {
      message.error("Có lỗi xảy ra trong quá trình đăng nhập.");
    }
  };

  return (
    <>
      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item
          name="email"
          label="Tên đăng nhập"
          rules={[
            {
              required: true,
              message: "Nhập tên đăng nhập",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div>
              <span>Mật khẩu</span>
            </div>
          }
          rules={[
            {
              required: true,
              message: "Nhập mật khẩu đăng nhập",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
