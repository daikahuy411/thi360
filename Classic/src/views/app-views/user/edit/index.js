import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  message,
  Checkbox,
  Tooltip,
  Card,
} from "antd";
import UserApi from "api/user-api";
import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import OrganizationApi from "api/organization-api";
import * as yup from "yup";
import { Roles, getRoleName } from "enum/Role";
import Role from "enum/Role";
import OrganizationTree from 'views/app-views/shared/organizationtree';

const { Option } = Select;

const UserEdit = (props) => {
  const [isValidForm, setIsValidForm] = useState(false);
  const [item, setItem] = useState(props.item);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [form] = Form.useForm();

  let hasPasswordSchema = yup.object().shape({
    firstName: yup.string().required("Tên không được để trống."),
    hasPassword: yup.boolean(),
    lastName: yup.string().required("Họ không được để trống."),
    userName: yup.string().required("Tên đăng nhập không được để trống."),
    passwordHash: yup
      .string()
      .required("Mật khẩu không được để trống.")
      .min(6, "Mật khẩu it nhất có 6 ký tự."),
  });

  let noPasswordSchema = yup.object().shape({
    firstName: yup.string().required("Tên không được để trống."),
    hasPassword: yup.boolean(),
    lastName: yup.string().required("Họ không được để trống."),
    userName: yup.string().required("Tên đăng nhập không được để trống."),
  });

  const yupSync = {
    async validator({ field }, value) {
      if (item.hasPassword) {
        await hasPasswordSchema.validateSyncAt(field, { [field]: value });
      } else {
        await noPasswordSchema.validateSyncAt(field, { [field]: value });
      }
    },
  };

  useEffect(() => {
    if (props.item.id != '0') {
      new UserApi().getUserProfile(props.item.id).then((response) => {
        setItem(response.data);
      });
    }
  }, [props.item]);

  useEffect(() => {
    validateForm();
  }, [item]);

  const handleChange = (event) => {
    validateForm();
    const currentItem = Object.assign({}, item);
    const targetValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    currentItem[event.target.name] = targetValue;
    setItem(currentItem);
  };

  const addOrRemoveRole = (checked, role) => {
    let currentItem = item;
    currentItem.roles = item.roles || [];
    if (checked && currentItem.roles.indexOf(role) < 0) {
      currentItem.roles.push(role);
    }
    if (!checked && currentItem.roles.indexOf(role) >= 0) {
      currentItem.roles.splice(currentItem.roles.indexOf(role), 1);
    }
    setItem({ ...currentItem });
  }

  const validateForm = () => {
    form
      .validateFields(["firstName", "lastName", "userName", "passwordHash"])
      .then((values) => {
        setIsValidForm(true);
      })
      .catch((errorInfo) => {
        if (
          errorInfo &&
          errorInfo.errorFields &&
          errorInfo.errorFields.length > 0
        ) {
          setIsValidForm(false);
        }
      });
  };

  const resetForm = () => {
    let cloneItem = { ...item };
    cloneItem.userName = "";
    cloneItem.firstName = "";
    cloneItem.lastName = "";
    cloneItem.email = "";
    cloneItem.mobile = "";
    cloneItem.address = "";
    setItem({ ...cloneItem });
  };

  const onAdd = (isContinue) => {
    validateForm();

    setIsLoading(isContinue ? false : true);
    setIsLoading1(isContinue ? false : true);

    const currentItem = Object.assign({}, item);
    new UserApi()
      .save(currentItem)
      .then((response) => {
        setIsLoading(false);
        setIsLoading1(false);
        message.success("Cập nhật thành công.");
        if (props.onSaved) {
          props.onSaved();
        }
        if (!isContinue) {
          props.onClose();
        } else {
          resetForm();
        }
      })
      .catch((error) => {
        var errors = [];
        Object.keys(error.response.data).forEach((key) => {
          errors.push({ name: key, errors: error.response.data[key] });
        });
        form.setFields(errors);
        setIsLoading(false);
        setIsLoading1(false);
      });
  };

  return (
    <Drawer
      title="Tạo mới người dùng"
      width={520}
      onClose={props.onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 0 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={props.onClose} style={{ marginRight: 8 }}>
            Hủy bỏ
          </Button>
          <Button
            onClick={() => {
              onAdd(false);
            }}
            disabled={!isValidForm}
            loading={isLoading}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Cập nhật
          </Button>
          {props.mode === "ADD" && (
            <Button
              disabled={!isValidForm}
              onClick={() => {
                onAdd(true);
              }}
              loading={isLoading1}
              type="primary"
            >
              Cập nhật và Tiếp tục
            </Button>
          )}
        </div>
      }
    >
      {item && (
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          autoComplete="off"
          initialValues={item}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="lastName" rules={[yupSync]} label="Họ">
                <Input
                  name="lastName"
                  placeholder=""
                  value={item.lastName}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="firstName" rules={[yupSync]} label="Tên">
                <Input
                  name="firstName"
                  placeholder=""
                  value={item.firstName}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tên đăng nhập"
                name="userName"
                rules={[yupSync]}
              >
                <Input
                  autoComplete="new-password"
                  name="userName"
                  disabled={props.mode === "EDIT"}
                  defaultValue={item.userName}
                  value={item.userName}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {item.hasPassword && (
                <Form.Item
                  label="Mật khẩu"
                  rules={[yupSync]}
                  name="passwordHash"
                >
                  {(props.mode === "ADD" || changePassword) && (
                    <Input
                      name="passwordHash"
                      autoComplete="new-password"
                      type={"password"}
                      onChange={handleChange}
                      suffix={
                        <Tooltip title="Mật khẩu có tối đa 6 ký tự, bao gồm ít nhất 1 ký tự đặc biệt và ít nhất 1 ký tự không phải là số.">
                          <InfoCircleOutlined
                            style={{ color: "rgba(0,0,0,.45)" }}
                          />
                        </Tooltip>
                      }
                    />
                  )}
                </Form.Item>
              )}
            </Col>
            {props.mode === "EDIT" && (
              <Col span={24}>
                <Form.Item>
                  <Checkbox
                    name="hasPassword"
                    onChange={(e) => {
                      item.hasPassword = e.target.checked;
                      setItem(item);
                      setChangePassword(e.target.checked);
                    }}
                  >
                    Đổi mật khẩu
                  </Checkbox>
                </Form.Item>
              </Col>
            )}
            <Col span={12}>
              <Form.Item label="Giới tính">
                <Select
                  onChange={(value) => {
                    const currentItem = Object.assign({}, item);
                    currentItem.gender = parseInt(value);
                    setItem(currentItem);
                  }}
                  name="gender"
                  value={item.gender}
                  defaultValue={item.gender}
                  placeholder="Chọn giới tính"
                >
                  <Option key={"gender-1"} value={-1}>
                    Chọn
                  </Option>
                  <Option key={"gender-2"} value={0}>
                    Nam
                  </Option>
                  <Option key={"gender-3"} value={1}>
                    Nữ
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Địa chỉ">
                <Input name="address"
                  value={item.address}
                  onChange={handleChange} placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email">
                <Input name="email"
                  value={item.email}
                  onChange={handleChange} placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số điện thoại">
                <Input name="phoneNumber"
                  value={item.phoneNumber}
                  onChange={handleChange} placeholder="" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Đơn vị">
                <OrganizationTree
                  value={item.organizationId ? item.organizationId.toString() : ""}
                  onChange={(value) => {
                    const currentItem = Object.assign({}, item);
                    currentItem.organizationId = parseInt(value);
                    setItem(currentItem);
                  }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Checkbox
                  checked={item.isDayBoarding}
                  onChange={(e) => {
                    const currentItem = Object.assign({}, item);
                    currentItem.isDayBoarding = e.target.checked;
                    setItem(currentItem);
                  }}>Bán trú</Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Card title="Phân quyền">
                  {Roles.map((role) => (
                    <Row>
                      <Col span={24}>
                        <Checkbox value={role} key={role} checked={item.roles && item.roles.indexOf(role) >= 0} onChange={(event) => {
                          addOrRemoveRole(event.target.checked, role);
                        }} name={role}>{getRoleName(role)}</Checkbox>
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};

export default UserEdit;
