import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form, Select, message, Button } from "antd";
import Flex from "components/shared-components/Flex";
import OrganizationApi from "api/organization-api";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Nhập vào nội dung câu hỏi",
    },
  ],
};

const GeneralField = (props) => {
  const [item, setItem] = useState(props.item);
  const [submitLoading, setSubmitLoading] = useState(false);

  let history = useHistory();

  const handleChange = (event) => {
    const currentItem = Object.assign({}, item);
    const targetValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    currentItem[event.target.name] = targetValue;
    setItem({ ...currentItem });
  };

  const handleSelectChange = (field, value) => {
    const currentItem = Object.assign({}, item);
    currentItem[field] = value;
    setItem({ ...currentItem });
    if (props.handleChange) {
      props.handleChange(currentItem);
    }
  };

  const onFinish = () => {
    setSubmitLoading(true);
    new OrganizationApi().save(item).then((response) => {
      setSubmitLoading(false);
      if (item.id === 0) {
        message.success(`Tạo mới thành công.`);
        history.push(`/lms/modules/system/classes/edit/${response.data.id}`);
      }
      if (item.id > 0) {
        message.success(`Cập nhật thành công.`);
      }
    });
  };

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  return (
    item && (
      <Row gutter={16}>
        <Col span={24}>
          <Flex justifyContent="between">
            <div className="mb-3">&nbsp;</div>
            <div className="mb-3">
              <Button
                type="primary"
                onClick={() => onFinish()}
                loading={submitLoading}
              >
                Cập nhật
              </Button>
            </div>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={17}>
          <Card title="Thông tin">
            <Form.Item label="Tên lớp" rules={rules.name}>
              <Input
                name="name"
                value={item.name}
                onChange={handleChange}
                defaultValue={props.item?.name}
              />
            </Form.Item>
            <Form.Item label="Khối">
              <Select
                placeholder="Chọn Khối"
                defaultValue={item.group}
                value={item.group}
                name="group"
                onChange={(value) => handleSelectChange("group", value)}
              >
                <Option value={0}>Chọn</Option>
                <Option value={1}>Khối 1</Option>
                <Option value={2}>Khối 2</Option>
                <Option value={3}>Khối 3</Option>
                <Option value={4}>Khối 4</Option>
                <Option value={5}>Khối 5</Option>
                <Option value={6}>Khối 6</Option>
                <Option value={7}>Khối 7</Option>
                <Option value={8}>Khối 8</Option>
                <Option value={9}>Khối 9</Option>
                <Option value={10}>Khối 10</Option>
                <Option value={11}>Khối 11</Option>
                <Option value={12}>Khối 12</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Mô tả">
              <Input.TextArea
                name="description"
                value={item.description}
                onChange={handleChange}
                defaultValue={props.item?.description}
                rows={4}
              />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={7}>
          <Card title="Ảnh đại diện">
          </Card>
        </Col>
      </Row>
    )
  );
};

export default GeneralField;
