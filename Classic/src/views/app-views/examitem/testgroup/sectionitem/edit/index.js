import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Card,
  message,
  Menu,
  Modal,
} from "antd";
import React from "react";
import Flex from "components/shared-components/Flex";
import TestGroupSectionItemApi from "api/test-group-section-item-api";
import QuestionDialog from "views/app-views/shared/questiondialog";
import QuestionCategoryDialog from "views/app-views/shared/questioncategorydialog";
import { QuestionCategoryApi } from "api/catalog-api";
import moment from "moment";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FolderOutlined,
  MinusOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

class SectionItemEdit extends React.Component {
  state = {
    visible: false,
    item: this.props.item ? this.props.item : { name: "", description: "" },
    isLoading: false,
    questionDialogVisible: false,
    questionCategoryDialogVisible: false,
    selectedQuestionCategory: null,
  };

  dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => this.editQuestion(row)} key={1}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Sửa</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => this.deleteQuestion(row)} danger key={2}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  componentDidMount = () => {
    if (this.props.item && this.props.item.id > 0) {
      new TestGroupSectionItemApi().get(this.props.item.id).then((response) => {
        this.setState({ item: response.data });
      });
    }
  };

  deleteQuestion = (row) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        // new QuestionApi().delete(row).then((response) => {
        //   message.success("Xóa thành công.");
        // });
      },
      onCancel() {},
    });
  };

  editQuestion = (row) => {};

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

  onQuestionCategorySelected = (categoryId) => {
    QuestionCategoryApi.get(categoryId).then((response) => {
      let item = this.state.item;
      item.questionCategory = response.data;
      this.setState({
        item: item,
      });
    });
  };

  deSelectedQuestion = (question) => {
    let item = this.state.item;
    item.questions = item.questions || [];

    item.questions = item.questions.filter(function (item) {
      return item.id !== question.id;
    });

    this.setState({ item: item });
  };

  onQuestionSelected = (question) => {
    let item = this.state.item;
    item.questions = item.questions || [];

    var existed = item.questions.find((item) => {
      return item.id === question.id;
    });

    if (existed == undefined) {
      item.questions.push(question);
      this.setState({ item: item }, () => {
        message.success("Thêm 1 câu hỏi vào cấu hình.");
      });
    } else {
      message.success("Câu hỏi đã tồn tại.");
    }
  };

  onAdd = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        let item = this.state.item;
        if (item.type === 4) {
          item.value = this.state.selectedQuestionCategory.id.toString();
        } else {
          item.value = item.questions.map((q) => q.id).join(";");
        }
        new TestGroupSectionItemApi().save(item).then((response) => {
          this.setState({ isLoading: false });
          message.success("Cập nhật thành công.");
          if (this.props.onSaved) {
            this.props.onSaved();
          }
          this.props.onClose();
        });
      }
    );
  };

  render() {
    return (
      <Drawer
        title={
          this.props.item == null
            ? "Tạo mới Cấu hình"
            : "Sửa Cấu hình bốc câu hỏi"
        }
        width={820}
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
            <Col span={8}>
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
            <Col span={8}>
              <Form.Item
                label="Hệ số điểm"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input
                  name="scoreRatio"
                  type={"number"}
                  defaultValue={this.state.item.scoreRatio}
                  value={this.state.item.scoreRatio}
                  onChange={this.handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Số câu hỏi"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input
                  name="numberOfQuestion"
                  disabled={this.state.item.type == 2}
                  defaultValue={this.state.item.numberOfQuestion}
                  value={this.state.item.numberOfQuestion}
                  onChange={this.handleChange}
                  type={"number"}
                />
              </Form.Item>
            </Col>
          </Row>
          {this.state.item.type === 4 && (
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Input
                    style={{ width: "100%" }}
                    autoComplete="off"
                    readOnly
                    value={this.state.item.questionCategory?.name}
                    suffix={
                      <div className="d-flex align-items-center">
                        <Button
                          shape="circle"
                          size="small"
                          onClick={this.onSend}
                        >
                          <DeleteOutlined />
                        </Button>
                        &nbsp;
                        <Button
                          shape="circle"
                          type="primary"
                          size="small"
                          onClick={() => {
                            this.setState({
                              questionCategoryDialogVisible: true,
                            });
                          }}
                        >
                          <FolderOutlined />
                        </Button>
                      </div>
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
          {this.state.item.type === 2 && (
            <Row gutter={16}>
              <Col span={24}>
                <Card title="Danh sách Câu hỏi">
                  <div className="table-responsive">
                    <div className="ant-table">
                      <div className="ant-table-container">
                        <div className="ant-table-content">
                          <table>
                            <thead className="ant-table-thead">
                              <tr>
                                <th
                                  className="ant-table-cell"
                                  style={{ width: 25 }}
                                >
                                  #
                                </th>
                                <th className="ant-table-cell">Nội dung</th>
                                <th
                                  className="ant-table-cell"
                                  style={{ width: 160 }}
                                >
                                  Danh mục
                                </th>
                                <th
                                  className="ant-table-cell"
                                  style={{ width: 120 }}
                                >
                                  Ngày tạo
                                </th>
                                <th
                                  className="ant-table-cell"
                                  style={{ width: 60 }}
                                ></th>
                              </tr>
                            </thead>
                            <tbody className="ant-table-tbody">
                              {this.state.item &&
                                this.state.item.questions &&
                                this.state.item.questions.map(
                                  (question, index) => {
                                    return (
                                      <tr
                                        className="ant-table-row"
                                        key={`tr-ans-question-${question.id}`}
                                      >
                                        <td className="ant-table-cell ">
                                          {index + 1}
                                        </td>
                                        <td className="ant-table-cell ">
                                          {question.shortContent}
                                          {question.questionTypeName}
                                          {question.totalQuestion}
                                        </td>
                                        <td className="ant-table-cell ">
                                          {question.categoryName}
                                        </td>
                                        <td className="ant-table-cell ">
                                          {moment(question.createdTime).format(
                                            "YYYY-MM-DD"
                                          )}
                                        </td>
                                        <td className="ant-table-cell ">
                                          <Button
                                            size="small"
                                            onClick={() => {
                                              this.deSelectedQuestion(question);
                                            }}
                                            icon={<DeleteOutlined />}
                                          ></Button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              <tr
                                className="ant-table-row"
                                key={`tr-ans-question-0`}
                              >
                                <td
                                  className="ant-table-cell "
                                  colSpan={5}
                                  textAlign="center"
                                  align="center"
                                  alignItems="center"
                                >
                                  <Button
                                    color="primary"
                                    icon={<PlusOutlined />}
                                    type="dashed"
                                    onClick={() => {
                                      this.setState({
                                        questionDialogVisible: true,
                                      });
                                    }}
                                    className="w-100"
                                  >
                                    Chọn Câu hỏi
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          )}
        </Form>
        {this.state.questionDialogVisible && (
          <QuestionDialog
            onOK={this.onQuestionSelected}
            onClose={() => {
              this.setState({ questionDialogVisible: false });
            }}
          />
        )}
        {this.state.questionCategoryDialogVisible && (
          <QuestionCategoryDialog
            onOK={this.onQuestionCategorySelected}
            onClose={() => {
              this.setState({
                questionCategoryDialogVisible: false,
              });
            }}
          />
        )}
      </Drawer>
    );
  }
}

export default SectionItemEdit;
