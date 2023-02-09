import React, { useState, useEffect } from "react";
import { Form, Row, Col, Select, Input, Button, Drawer } from "antd";
import QuestionCatalogApi from "api/question-catalog-api";
import { QuestionCategoryApi } from "api/catalog-api";
import { TreeSelect } from "antd";

const { Option } = Select;

const QuestionCategoryDialog = (props) => {
  const [catalogs, setCatalogs] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCatalogId, setSelectedCatalogId] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

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

  useEffect(() => {
    getAllCatalogs();
  }, []);

  useEffect(() => {
    getQuestionCategories();
  }, [selectedCatalogId]);

  const onOK = () => {
    if (props.onOK) {
      props.onOK(selectedCategoryId);
    }
  };

  return (
    <Drawer
      title={"Danh mục Câu hỏi"}
      width={460}
      onClose={props.onClose}
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
          &nbsp;
          <Button
            color="primay"
            type="primary"
            onClick={onOK}
            disabled={selectedCategoryId == 0}
          >
            Đồng ý
          </Button>
        </div>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={0}>
          <Col span={24}>
            <Form.Item label="Bộ Câu hỏi">
              {catalogs && (
                <Select
                  defaultValue="0"
                  className="w-100"
                  onChange={(value) => {
                    setSelectedCatalogId(value);
                    setSelectedCategoryId(0);
                  }}
                  placeholder="Bộ câu hỏi"
                >
                  <Option value="0">Chọn Bộ câu hỏi</Option>
                  {catalogs.map((elm) => (
                    <Option key={elm.id} value={elm.id}>
                      {elm.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Danh mục Câu hỏi">
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
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default QuestionCategoryDialog;
