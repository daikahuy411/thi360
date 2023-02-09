import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  message,
  Divider,
  Checkbox,
  Tooltip,
  Card,
} from "antd";
import UserApi from "api/user-api";
import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import * as yup from "yup";
import UserSelector from "views/app-views/shared/userSelector";
import SubTaskEdit from "../subtask/edit";
import TaskFormdit from "./Form";

const { Option } = Select;

const TaskEdit = (props) => {
  const [isValidForm, setIsValidForm] = useState(false);
  const [item, setItem] = useState({ id: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [form] = Form.useForm();
  const [editSubtask, setEditSubTask] = useState(false);

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
    if (props.id != 0) {
      // new UserApi().getUserProfile(props.id).then((response) => {
      //   setItem(response.data);
      // });
    }
  }, [props.id]);

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

  const addSub = () => {
    setEditSubTask(true);
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
  };

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
      title="Tạo mới Công việc"
      width={680}
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
          {props.id === 0 && (
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
      <TaskFormdit
        onAddSub={() => {
          setEditSubTask(true);
        }}
      />
      {editSubtask && <SubTaskEdit onClose={() => setEditSubTask(false)} />}
    </Drawer>
  );
};

export default TaskEdit;
