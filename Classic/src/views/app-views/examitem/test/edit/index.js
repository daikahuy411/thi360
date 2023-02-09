import { Drawer, Form, Button, Col, Row, Input, message } from "antd";
import React from "react";
import TestApi from "api/test-api";

class TestEdit extends React.Component {
  item = { name: "", description: "" };
  state = {
    visible: false,
    item: this.props.item ? this.props.item : this.item,
    isLoading: false,
  };

  componentDidMount = () => {
    if (this.props.item) {
      new TestApi().get(this.props.item.id).then((response) => {
        this.setState({ item: response.data });
      });
    }
  };

  handleChange = (event) => {
    event.persist();
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
      },
      () => {
        let item = this.state.item;
        if (this.props.parent) {
          item.parentId = this.props.parent.id;
        }
        new TestApi().save(item).then((response) => {
          this.setState({ isLoading: false });
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
      <Drawer
        title={this.props.item.name}
        width={450}
        onClose={this.props.onClose}
        visible={true}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
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
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark>
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
              <Form.Item label="Thứ tự">
                <Input
                  placeholder="Thứ tự"
                  name="order"
                  type={"number"}
                  defaultValue={this.state.item.order}
                  value={this.state.item.order}
                  onChange={this.handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    );
  }
}

export default TestEdit;
