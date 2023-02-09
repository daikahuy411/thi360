import { Drawer, Form, Button, Col, Row, Input, message } from "antd";
import QuestionCatalogApi from "api/question-catalog-api";
import React from "react";

class QuestionCatalogEdit extends React.Component {
  state = {
    visible: false,
    item: this.props.item ? this.props.item : { name: "", description: "" },
    isLoading: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
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

  onAdd = () => {
    this.setState({ isLoading: true }, () => {
      new QuestionCatalogApi().save(this.state.item).then((response) => {
        this.setState({ isLoading: false });
        message.success("Cập nhật thành công.");
        if (this.props.onSaved) {
          this.props.onSaved();
        }
      });
    });
  };

  render() {
    return (
      <Drawer
        title="Tạo mới Bộ câu hỏi"
        width={420}
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
              onClick={this.onAdd}
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
                  placeholder="Tên Bộ câu hỏi"
                  name="name"
                  defaultValue={this.state.item.name}
                  onChange={this.handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  name="description"
                  defaultValue={this.state.item.description}
                  rows={4}
                  onChange={this.handleChange}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    );
  }
}

export default QuestionCatalogEdit;
