import { Drawer, Form, Button, Col, Row, Input, message, Checkbox } from "antd";
import UserApi from "api/user-api";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import CatalogApi from "api/catalog-api";

let schema = yup.object().shape({
  name: yup.string().required("Tên đầy đủ không được để trống."),
});

const yupSync = {
  async validator({ field }, value) {
    await schema.validateSyncAt(field, { [field]: value });
  },
};

const CatalogEdit = (props) => {
  const [isValidForm, setIsValidForm] = useState(false);
  const [item, setItem] = useState(props.item);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const [form] = Form.useForm();

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

  const validateForm = () => {
    form
      .validateFields(["name"])
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

  const onSave = (isContinue) => {
    validateForm();

    setIsLoading(isContinue ? false : true);
    setIsLoading1(isContinue ? false : true);

    const currentItem = Object.assign({}, item);

    const { type } = props;
    new CatalogApi(type)
      .save(currentItem)
      .then((response) => {
        setIsLoading(false);
        setIsLoading1(false);
        setItem({});
        message.success("Cập nhật thành công.");
        if (props.onSaved) {
          props.onSaved();
        }
        if (!isContinue) {
          props.onClose();
        } else {
          setItem(currentItem);
        }
      })
      .catch((error) => {
      });
  };

  return (
    <Drawer
      title="Tạo mới"
      width={520}
      onClose={props.onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 80 }}
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
            onClick={() => onSave()}
            disabled={!isValidForm}
            loading={isLoading}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Cập nhật
          </Button>
          {props.item.id === 0 && (
            <Button
              disabled={!isValidForm}
              onClick={() => {
                onSave(true);
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
        <Form form={form} layout="vertical" hideRequiredMark autoComplete="off" initialValues={item}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="name" label="Tên"
                rules={[yupSync]}>
                <Input
                  name="name"
                  value={item.name}
                  placeholder=""
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Thứ tự"
                name="order"
              >
                <Input
                  name="order"
                  value={item.order}
                  type={"number"}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Checkbox value={item.enabled}
                  name="enabled"
                  checked={item.enabled}
                  onChange={handleChange}  >
                  Kích hoạt
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};

export default CatalogEdit;
