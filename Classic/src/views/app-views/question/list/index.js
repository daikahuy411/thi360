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
  PlusCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory, Link } from "react-router-dom";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import QuestionApi from "api/question-api";
import QuestionCatalogApi from "api/question-catalog-api";
import QuestionCategory from "views/app-views/questioncategory";
import { QuestionCategoryApi } from "api/catalog-api";
import moment from "moment";
import { TreeSelect } from "antd";

const { TabPane } = Tabs;
const { Option } = Select;
const { Search } = Input;
const { confirm } = Modal;

const QuestionList = (props) => {
  let history = useHistory();
  const [questionTypes, setQuestionTypes] = useState(null);
  const [catalog, setCatalog] = useState(null);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [questionType, setQuestionType] = useState(0);
  const [keyword, setKeyword] = useState("");

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editQuestion(row)} key={`menu-question-edit`}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Sửa</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={() => deleteQuestion(row)}
        danger
        key={`menu-question-delete`}
      >
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
          searchQuestion();
        });
      },
      onCancel() { },
    });
  };

  const addQuestion = (typeCode) => {
    history.push(
      `/lms/modules/mystudies/exams/questioncatalogs/questions/add/${typeCode}/${props.match.params.catalogId}`
    );
  };

  const editQuestion = (row) => {
    history.push(
      `/lms/modules/mystudies/exams/questioncatalogs/questions/edit/${row.id}/${props.match.params.catalogId}`
    );
  };

  const getQuestionCategories = () => {
    QuestionCategoryApi.getCategoriesByCatalogId(props.match.params.catalogId).then(
      (response) => {
        setCategories(response.data);
      }
    );
  };

  const getQuestionCatalog = () => {
    new QuestionCatalogApi()
      .get(props.match.params.catalogId)
      .then((response) => {
        setCatalog(response.data);
      });
  };

  const getAllQuestionTypes = () => {
    var questionApi = new QuestionApi();
    questionApi.getQuestionTypes().then((response) => {
      setQuestionTypes(response.data);
    });
  };

  const searchQuestion = () => {
    var questionApi = new QuestionApi();
    questionApi
      .searches({
        catalogId: props.match.params.catalogId,
        questionType: questionType,
        categoryId: categoryId,
        keyword: keyword,
        page: page,
      })
      .then((response) => {
        setData(response.data.value);
        setTotalItems(response.data.totalItems);
      });
  };

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  useEffect(() => {
    getAllQuestionTypes();
    getQuestionCatalog();
    getQuestionCategories();
  }, []);

  useEffect(() => {
    searchQuestion();
  }, [questionType, keyword, categoryId, page]);

  return (
    <>
      <Form
        layout="vertical"
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              {catalog && <h4 className="mb-3">{catalog.name} </h4>}
              <div className="mb-3">
                {/* <Button className="mr-2">Hủy bỏ</Button>
                <Button type="primary">{`Cập nhật`}</Button> */}
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs
            defaultActiveKey="questions"
            style={{ marginTop: 30 }}
            activeKey={
              props.match.params.tab ? props.match.params.tab : "questions"
            }
            onChange={(key) => {
              history.push(
                `/lms/modules/mystudies/exams/questioncatalogs/questions/list/${props.match.params.catalogId}/${key}`
              );
            }}
          >
            <TabPane tab="Ngân hàng Câu hỏi" key="questions">
              <Card>
                <Row gutter={16}>
                  <Col span={6}>
                    <Search
                      block
                      placeholder="Tìm kiếm"
                      onSearch={(value) => setKeyword(value)}
                    />
                  </Col>
                  <Col span={6}>
                    {questionTypes && (
                      <Select
                        value={questionType}
                        block
                        style={{ width: 200 }}
                        placeholder="Loại câu hỏi"
                        onChange={(value) => setQuestionType(parseInt(value))}
                      >
                        <Option key={`question-type-0`} value={0}>
                          Tất cả loại
                        </Option>
                        {questionTypes.map((item) => (
                          <Option
                            key={`question-type-${item.id}`}
                            value={item.id}
                          >
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Col>
                  <Col span={6}>
                    {categories && (
                      <TreeSelect
                        treeData={categories}
                        onClear={() => setCategoryId(0)}
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        placeholder="Chọn Danh mục câu hỏi"
                        allowClear
                        block
                        treeDefaultExpandAll
                        onChange={(value) => setCategoryId(parseInt(value))}
                      ></TreeSelect>
                    )}
                  </Col>
                  <Col span={6} style={{ textAlign: 'right' }}>
                    {questionTypes && (
                      <Dropdown overlay={gerenateCreateQuetionButton} >
                        <Button
                          type="primary"
                          icon={<PlusCircleOutlined />}

                        >
                          Thêm mới <DownOutlined />
                        </Button>
                      </Dropdown>
                    )}
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
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
                                  <th style={{ width: 220 }}>Nội dung</th>
                                  <th
                                    className="ant-table-cell"
                                    style={{ width: 180 }}
                                  >
                                    Loại câu hỏi
                                  </th>
                                  <th
                                    className="ant-table-cell"
                                    style={{ width: 210 }}
                                  >
                                    Danh mục
                                  </th>
                                  <th
                                    className="ant-table-cell"
                                    style={{ width: 90 }}
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
                                {data &&
                                  data.map((question, index) => {
                                    return (
                                      <tr
                                        className="ant-table-row"
                                        key={`tr-ans-question-${question.id}`}
                                      >
                                        <td className="ant-table-cell ">
                                          {index + 1}
                                        </td>
                                        <td className="ant-table-cell ">
                                          <Link
                                            to={`/lms/modules/mystudies/exams/questioncatalogs/questions/edit/${question.id}/${props.match.params.catalogId}`}
                                          >
                                            {question.shortContent}
                                          </Link>
                                        </td>
                                        <td className="ant-table-cell ">
                                          {question.questionTypeName}
                                          {question.questionType == 3 && (
                                            <p>
                                              {question.totalQuestion} câu hỏi
                                              con
                                            </p>
                                          )}
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
                <Row gutter={16}>
                  <Col span={24} alignItems="right" flex={"flex-end"}>
                    <Pagination
                      showSizeChanger={false}
                      className="ant-table-pagination-right ant-table-pagination"
                      total={totalItems}
                      defaultCurrent={page}
                      onChange={pageChanged}
                      pageSize={20}
                    />
                  </Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="Danh mục Câu hỏi" key="categories">
              <Row gutter={16}>
                <Col span={24} alignItems="right" flex={"flex-end"}>
                  <QuestionCategory {...props} />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default QuestionList;
