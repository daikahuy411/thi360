import React, { useState, useEffect } from "react";
import {
  Card,
  Pagination,
  Form,
  Tabs,
  Col,
  Row,
  Dropdown,
  Select,
  Input,
  Modal,
  message,
  Button,
  Menu,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import QuestionApi from "api/question-api";
import QuestionCatalogApi from "api/question-catalog-api";
import QuestionCategory from "views/app-views/questioncategory";
import { QuestionCategoryApi } from "api/catalog-api";
import moment from "moment";
import { TreeSelect } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";

const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;

const ChildrenQuestions = ({ props, parent }) => {
  let history = useHistory();
  const [questionTypes, setQuestionTypes] = useState(null);
  const [data, setData] = useState(null);
  const [parentQuesion, setParentQuestion] = useState(null);
  // const { param } = props;

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editQuestion(row)} key={1}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Sửa</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => deleteQuestion(row)} danger key={2}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const gerenateCreateQuetionButton = () => {
    return (
      <Menu>
        {questionTypes.map((item) => (
          <Menu.Item
            key={`menu-question-type-${item.id}`}
            onClick={() => {
              addQuestion(item.id);
            }}
          >
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  const deleteQuestion = (row) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new QuestionApi().delete(row).then((response) => {
          message.success("Xóa thành công.");
        });
      },
      onCancel() {},
    });
  };

  const addQuestion = (typeCode) => {
    history.push(
      `/lms/modules/assignment/questioncatalogs/questions/add/${typeCode}/${parent.catalogId}/${parent.id}`
    );
  };

  const editQuestion = (row) => {
    history.push(
      `/lms/modules/assignment/questioncatalogs/questions/edit/${row.id}/${row.catalogId}`
    );
  };

  const getQuestion = () => {
    var questionApi = new QuestionApi();
    questionApi.get(parent.id).then((response) => {
      setParentQuestion(response.data);
    });
  };

  const getAllQuestionTypes = () => {
    var questionApi = new QuestionApi();
    questionApi.getQuestionTypes().then((response) => {
      setQuestionTypes(response.data.filter((x) => x.id != 3));
    });
  };

  useEffect(() => {
    getAllQuestionTypes();
    getQuestion();
  }, []);

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3"></div>
            <div className="mr-md-3 mb-3"></div>
            <div className="mr-md-3 mb-3"></div>
          </Flex>
          <div>
            {questionTypes && (
              <Dropdown overlay={gerenateCreateQuetionButton}>
                <Button type="primary" icon={<PlusCircleOutlined />} block>
                  Thêm câu hỏi con <DownOutlined />
                </Button>
              </Dropdown>
            )}
          </div>
        </Flex>
        <Row gutter={16}>
          <Col span={24}>
            <div className="table-responsive">
              <div className="ant-table">
                <div className="ant-table-container">
                  <div className="ant-table-content">
                    <table>
                      <thead className="ant-table-thead">
                        <tr>
                          <th className="ant-table-cell" style={{ width: 25 }}>
                            #
                          </th>
                          <th className="ant-table-cell" style={{ width: 220 }}>
                            Nội dung
                          </th>
                          <th className="ant-table-cell">Loại câu hỏi</th>
                          <th className="ant-table-cell">Số câu hỏi con</th>
                          <th className="ant-table-cell">Danh mục</th>
                          <th className="ant-table-cell" style={{ width: 190 }}>
                            Ngày tạo
                          </th>
                          <th
                            className="ant-table-cell"
                            style={{ width: 60 }}
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="ant-table-tbody">
                        {parentQuesion &&
                          parentQuesion.children.map((question, index) => {
                            return (
                              <tr
                                className="ant-table-row"
                                key={`tr-ans-question-${question.id}`}
                              >
                                <td className="ant-table-cell ">{index + 1}</td>
                                <td className="ant-table-cell ">
                                  <Link
                                    to={`/lms/modules/assignment/questioncatalogs/questions/edit/${question.id}/${question.catalogId}`}
                                  >
                                    {question.shortContent}
                                  </Link>
                                </td>
                                <td className="ant-table-cell ">
                                  {question.questionTypeName}
                                </td>
                                <td className="ant-table-cell ">
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
                                  <div className="text-right">
                                    <EllipsisDropdown
                                      menu={dropdownMenu(question)}
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col span={24}>
            <Form.Item>
              <br />
              <Button
                type="dashed"
                onClick={() => {
                  addQuestion();
                }}
                className="w-100"
              >
                <PlusOutlined /> Thêm Đáp án
              </Button>
            </Form.Item>
          </Col>
        </Row> */}
      </Card>
    </>
  );
};

export default ChildrenQuestions;
