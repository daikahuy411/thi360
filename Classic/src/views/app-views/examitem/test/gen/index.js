import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  message,
  Radio,
  Space,
} from "antd";
import React from "react";
import TestGroupApi from "api/test-group-api";
import TestApi from "api/test-api";

class GenerateTestDialog extends React.Component {
  state = {
    visible: false,
    isLoading: false,
    testGroup: null,
    request: {
      name: "",
      testGroupId: 0,
      allowDuplicateQuestionInTests: false,
      quantity: 0,
      startIndex: 1,
    },
  };

  componentDidMount = () => {
    if (this.props.testGroupId) {
      new TestGroupApi().get(this.props.testGroupId).then((response) => {
        this.setState({
          testGroup: response.data,
          request: {
            name: response.data.name,
            testGroupId: response.data.id,
            quantity: 1,
            startIndex: 1,
            allowDuplicateQuestionInTests: true,
          },
        });
      });
    }
  };

  handleChange = (event) => {
    event.persist();
    const currentItem = Object.assign({}, this.state.request);
    const targetValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    currentItem[event.target.name] = targetValue;
    this.setState({ request: currentItem });
  };

  onOk = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        new TestApi().generateTest(this.state.request).then((response) => {
          this.setState({ isLoading: false });
          message.success("Cập nhật thành công.");
          if (this.props.onGenerated) {
            this.props.onGenerated();
          }
        });
      }
    );
  };

  render() {
    return (
      <Drawer
        title={"Sinh đề thi"}
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
                this.onOk();
              }}
              loading={this.state.isLoading}
              type="primary"
            >
              Cập nhật
            </Button>
          </div>
        }
      >
        {this.state.testGroup && (
          <Form layout="vertical" hideRequiredMark>
            {/* <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Tùy chọn sinh đề">
                  <Radio.Group
                    value={2}
                    onChange={(event) => {
                      var request = this.state.request;
                      request.allowDuplicateQuestionInTests =
                        event.target.value === 1 ? true : false;
                      this.setState({ request: request });
                    }}
                  >
                    <Space direction="vertical">
                      <Radio value={1}>
                        Cho phép các đề có câu hỏi trùng nhau
                      </Radio>
                      <Radio value={2}>Các đề câu hỏi không trùng nhau</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row> */}
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Tên đề thi"
                  rules={[{ required: true, message: "Nhập Tên đề thi." }]}
                >
                  <Input
                    placeholder="Tên đề"
                    name="name"
                    defaultValue={this.state.testGroup.name}
                    value={this.state.testGroup.name}
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Số bắt đầu từ"
                  rules={[
                    { required: true, message: "Nhập Số bắt đầu của đề thi." },
                  ]}
                >
                  <Input
                    placeholder="1"
                    name="startIndex"
                    defaultValue={this.state.request.startIndex}
                    value={this.state.request.startIndex}
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                {this.state.request.allowDuplicateQuestionInTests && (
                  <Form.Item
                    label="Số đề cần sinh"
                    rules={[
                      { required: true, message: "Nhập số đề cần sinh." },
                    ]}
                  >
                    <Input
                      placeholder="10"
                      name="quantity"
                      defaultValue={this.state.request.quantity}
                      value={this.state.request.quantity}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                )}
              </Col> */}
            </Row>
          </Form>
        )}
      </Drawer>
    );
  }
}

export default GenerateTestDialog;
