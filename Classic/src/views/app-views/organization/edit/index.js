import { Card, Form, Button, Col, Row, Input, message, Checkbox, Select } from "antd";
import OrganizationApi from "api/organization-api";
import React from "react";
import OrganizationTree from 'views/app-views/shared/organizationtree';
import moment from "moment";
import {
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import UserRoles from "../useroles";
import Role from "enum/Role";

const { Option } = Select;

class OrganizationEdit extends React.Component {
  item = { name: "", description: "", type: 1 };
  state = {
    visible: false,
    item: this.props.item ? this.props.item : this.item,
    isLoading: false,
    isLoading1: false,
    openUserDialog: false,
  };

  componentDidMount = () => {
    if (this.props.item) {
      new OrganizationApi().get(this.props.item.id).then((response) => {
        this.setState({ item: response.data });
      });
    }
  };

  handleChange = (event) => {
    const currentItem = Object.assign({}, this.state.item);
    const targetValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    currentItem[event.target.name] = targetValue;
    this.setState({ item: currentItem });
  };

  handleSelectChange = (field, value) => {
    const currentItem = Object.assign({}, this.state.item);
    currentItem[field] = value;
    this.setState({ item: currentItem });
  };

  onAdd = (isContinue) => {
    this.setState(
      {
        isLoading: isContinue ? false : true,
        isLoading1: isContinue ? true : false,
      },
      () => {
        let item = this.state.item;
        if (this.props.parent) {
          item.parentId = this.props.parent.id;
        }
        new OrganizationApi().save(item).then((response) => {
          this.setState({ isLoading1: false, isLoading: false });
          message.success("Cập nhật thành công.");
          if (this.props.onSaved) {
            this.props.onSaved();
          }
        });
      }
    );
  };

  updateUserRoles = (fieldName, users) => {
    var item = this.state.item;
    item[fieldName] = users;
    this.setState({ item: item });
  }

  render() {
    return (
      <>
        <Card>
          <Form layout="vertical" hideRequiredMark>
            {this.props.parent && (
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Đơn vị cha">
                    <Input
                      defaultValue={this.props.parent.name}
                      value={this.props.parent.name}
                      readOnly
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Tên"
                  rules={[{ required: true, message: "Nhập vào tên" }]}
                >
                  <Input
                    placeholder="Tên"
                    name="name"
                    defaultValue={this.state.item.name}
                    value={this.state.item.name}
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Mô tả">
                  <Input.TextArea
                    name="description"
                    defaultValue={this.state.item.description}
                    value={this.state.item.description}
                    rows={4}
                    onChange={this.handleChange}
                    placeholder="Mô tả"
                  />
                </Form.Item>
              </Col>
            </Row>
            {this.state.item.type == 1 && (
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item>
                    <Checkbox
                      checked={this.state.item.isSite}
                      name="isSite"
                      onChange={(event) => this.handleChange(event)}
                    >
                      Miền dữ liệu độc lập
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            )}
            {this.state.item.type == 2 && (
              <>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Khối">
                      <Select
                        placeholder="Chọn Khối"
                        defaultValue={this.state.item.group}
                        value={this.state.item.group}
                        name="group"
                        onChange={(value) => this.handleSelectChange("group", value)}
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
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Đơn vị">
                      <OrganizationTree value={this.state.item.parentId > 0 ? this.state.item.parentId.toString() : ""} onChange={(value) => {
                        this.handleSelectChange("parentId", value);
                      }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <UserRoles role={Role.TEACHER}
                      onChanged={(users) => { this.updateUserRoles("teachers", users) }}
                      typeName="Giáo viên chủ nhiệm"
                      items={this.state.item.teachers} />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <UserRoles role={Role.SUBJECTTEACHER}
                      onChanged={(users) => { this.updateUserRoles("subjectTeachers", users) }}
                      typeName="Giáo viên bộ môn"
                      items={this.state.item.subjectTeachers} />
                  </Col>
                </Row>
              </>
            )}
            <Row gutter={16}>
              <Col span={24}>
                <Button
                  style={{ marginRight: 8 }}
                  onClick={() => {
                    this.onAdd(false);
                  }}
                  loading={this.state.isLoading}
                  type="primary"
                >
                  Cập nhật
                </Button>
                {this.props.item == null && (
                  <Button
                    onClick={() => {
                      this.onAdd(true);
                    }}
                    loading={this.state.isLoading1}
                    type="primary"
                  >
                    Cập nhật và Tiếp tục
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Card>
      </>
    );
  }
}

export default OrganizationEdit;
