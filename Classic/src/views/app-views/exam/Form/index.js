import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import UserList from "../user";
import ExamItemList from "../examitem";
import ExamApi from "api/exam-api";
import { useHistory } from "react-router-dom";
import Overview from "./Overview";
import ExamReport from "../report";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const ExamForm = (props) => {
  const { mode = ADD, param } = props;

  const [form] = Form.useForm();
  const [item, setItem] = useState(null);
  const [examName, setExamName] = useState("");

  let history = useHistory();

  useEffect(() => {
    const api = new ExamApi();
    if (mode === ADD) {
      const item = api.createExam("");
      setItem(item);
    }
    if (mode === EDIT) {
      const { id } = param;
      api.get(parseInt(id)).then((response) => {
        setItem(response.data);
        setExamName(response.data.name);
      });
    }
  }, [form, mode, param, props]);

  const handleChange = (item) => {
    setItem(item);
  };

  return (
    <>
      {item && (
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
                <h4 className="mb-3">
                  {mode === "ADD" ? "Thêm mới Kỳ thi" : `${examName}`}
                </h4>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Tabs
              defaultActiveKey="info"
              style={{ marginTop: 30 }}
              activeKey={param.tab ? param.tab : "info"}
              onChange={(key) => {
                history.push(`/lms/modules/mystudies/exams/edit/${param.id}/${key}`);
              }}
            >
              {mode === EDIT && (
                <TabPane tab="Tổng quan" key="overview">
                  <Overview {...props} />
                </TabPane>
              )}
              <TabPane tab="Thông tin chung" key="info">
                {item && (
                  <GeneralField handleChange={handleChange} item={item} />
                )}
              </TabPane>
              <TabPane tab="Môn thi" key="examitems">
                <ExamItemList param={param} />
              </TabPane>
              <TabPane tab="Thí sinh" key="users">
                {item && <UserList examId={param.id} />}
              </TabPane>
              <TabPane tab="Báo cáo" key="report">
                <ExamReport examId={param.id} />
              </TabPane>
            </Tabs>
          </div>
        </Form>
      )}
    </>
  );
};

export default ExamForm;
