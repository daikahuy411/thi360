import { Form, Button, Col, Row, Input, message, Card, Checkbox } from "antd";
import { PostCategoryApi } from "api/catalog-api";
import React from "react";

class PostCategoryEdit extends React.Component {
  item = { name: "", description: "" };
  state = {
    visible: false,
    item: this.props.item ? this.props.item : this.item,
    isLoading: false,
    isLoading1: false,
  };

  componentDidMount = () => {
    if (this.props.item) {
      PostCategoryApi.get(this.props.item.id).then((response) => {
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
        PostCategoryApi.save(item).then((response) => {
          this.setState({ isLoading1: false, isLoading: false });
          message.success("Cập nhật thành công.");
          if (this.props.onSaved) {
            this.props.onSaved();
          }
          if (!isContinue) {
            this.props.onClose();
          } else {
            this.setState({ item: this.item });
          }
        });
      }
    );
  };

  render() {
    return (
      <Card>
        <Form layout="vertical" hideRequiredMark>
          {this.props.parent && (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Danh mục cha">
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
                rules={[{ required: true, message: "Please enter user name" }]}
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
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item>
                <Checkbox
                  checked={this.state.item.showOnHomePage}
                  name="showOnHomePage"
                  onChange={(event) => this.handleChange(event)}
                >
                  Hiển thị tin ở trang Tin tức
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                Hủy bỏ
              </Button>
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
    );
  }
}

export default PostCategoryEdit;
