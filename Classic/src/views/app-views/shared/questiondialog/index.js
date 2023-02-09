import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Select,
  Modal,
  Input,
  Button,
  Menu,
  message,
  Drawer,
  TreeSelect,
} from "antd";
import Flex from "components/shared-components/Flex";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import QuestionApi from "api/question-api";
import QuestionCatalogApi from "api/question-catalog-api";
import { QuestionCategoryApi } from "api/catalog-api";
import moment from "moment";

const { Option } = Select;
const { confirm } = Modal;

const QuestionDialog = (props) => {
  const [data, setData] = useState(null);
  const [catalogs, setCatalogs] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCatalogId, setSelectedCatalogId] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const searchQuestions = () => {
    var questionApi = new QuestionApi();
    questionApi.searches().then((response) => {
      setData(response.data.value);
    });
  };

  const getAllCatalogs = () => {
    var catalogApi = new QuestionCatalogApi();
    catalogApi.getAll().then((response) => {
      setCatalogs(response.data);
    });
  };

  const getQuestionCategories = () => {
    if (selectedCatalogId == 0) {
      setCategories([]);
    }
    QuestionCategoryApi.getCategoriesByCatalogId(selectedCatalogId).then((response) => {
      setCategories(response.data);
    });
  };

  const selectedQuestion = (question) => {
    if (props.onOK) {
      props.onOK(question);
    }
  };

  useEffect(() => {
    getAllCatalogs();
    searchQuestions();
  }, []);

  useEffect(() => {
    getQuestionCategories();
  }, [selectedCatalogId]);

  return (
    <Drawer
      title={"Ngân hàng Câu hỏi"}
      width={820}
      onClose={props.onClose}
      closable={true}
      visible={true}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={props.onClose} style={{ marginRight: 8 }}>
            Đóng
          </Button>
        </div>
      }
    >
      <Form layout="vertical">
        <Row gutter={0}>
          <Col span={8} style={{ padding: 5 }}>
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Col>
          <Col span={8} style={{ padding: 5 }}>
            {catalogs && (
              <Select
                defaultValue="All"
                className="w-100"
                placeholder="Bộ Câu hỏi"
                onChange={(value) => {
                  setSelectedCatalogId(value);
                  setSelectedCategoryId(0);
                }}
              >
                <Option value="All">Tất cả</Option>
                {catalogs.map((elm) => (
                  <Option key={elm.id} value={elm.id}>
                    {elm.name}
                  </Option>
                ))}
              </Select>
            )}
          </Col>
          <Col span={8} style={{ padding: 5 }}>
            {categories && (
              <TreeSelect
                style={{ width: "100%" }}
                treeData={categories}
                className="w-100"
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="Chọn Danh mục câu hỏi"
                allowClear
                treeDefaultExpandAll
                onChange={(value) => setSelectedCategoryId(value)}
              ></TreeSelect>
            )}
          </Col>
        </Row>
        <Row gutter={0}>
          <Col span={24} style={{ padding: 5 }}>
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
                          <th className="ant-table-cell">Nội dung</th>
                          <th className="ant-table-cell" style={{ width: 120 }}>
                            Danh mục
                          </th>
                          <th className="ant-table-cell" style={{ width: 120 }}>
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
                                <td className="ant-table-cell ">{index + 1}</td>
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
                                    onClick={() => {
                                      selectedQuestion(question);
                                    }}
                                    icon={<PlusCircleOutlined />}
                                  ></Button>
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
      </Form>
    </Drawer>
  );
};

export default QuestionDialog;
