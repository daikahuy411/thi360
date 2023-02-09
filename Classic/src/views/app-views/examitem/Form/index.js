import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message, Breadcrumb } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import TestGroupField from "../testgroup";
import Test from "../test/";
import ExamItemApi from "api/exam-item-api";
import ExamApi from "api/exam-api";
import { useHistory, Link } from "react-router-dom";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const ExamItemForm = (props) => {
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [item, setItem] = useState(null);
  const [examItemName, setExamItemName] = useState("");

  let history = useHistory();

  useEffect(() => {
    const examItemApi = new ExamItemApi();
    if (mode === ADD) {
      const { examId } = param;

      new ExamApi().get(examId).then((response) => {
        const item = {
          id: 0,
          name: "",
          examId: examId,
          testGroupId: 0,
          exam: { ...response.data },
        };
        setItem(item);
      });
    }
    if (mode === EDIT) {
      const { id } = param;
      examItemApi.get(parseInt(id)).then((response) => {
        setItem(response.data);
        setExamItemName(response.data.name);
      });
    }
  }, [form, mode, param, props]);

  const handleChange = (item) => {
    setItem({ ...item });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/lms/exams/list">Kỳ thi</Link>
              </Breadcrumb.Item>
              {item && (
                <Breadcrumb.Item>
                  <Link to={`/lms/exams/edit/${item.exam.id}/examitems`}>
                    {item.exam.name}
                  </Link>
                </Breadcrumb.Item>
              )}
            </Breadcrumb>
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h4 className="mb-3">
                {mode === "ADD" ? "Thêm mới Môn thi" : `${examItemName}`}
              </h4>
              <div className="mb-3"></div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs
            defaultActiveKey="info"
            style={{ marginTop: 30 }}
            activeKey={param.tab ? param.tab : "info"}
            onChange={(key) => {
              history.push(`/lms/examitems/edit/${param.id}/${key}`);
            }}
          >
            <TabPane tab="Thông tin chung" key="info">
              {item && <GeneralField handleChange={handleChange} item={item} />}
            </TabPane>
            <TabPane tab="Cấu trúc Đề thi" key="testgroup">
              {item && <TestGroupField testGroupId={item.testGroupId} />}
            </TabPane>
            <TabPane tab="Đề thi" key="test">
              {item && <Test testGroupId={item.testGroupId} />}
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ExamItemForm;
