import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import Assignees from "../assignees";
import CourseContents from "../contents";
import CourseApi from "api/course-api";
import { useHistory } from "react-router-dom";
import Overview from "./Overview";
import ExamReport from "../report";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CourseAnnouncements from "../announcements";
import { withRouter } from "react-router-dom";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const CourseForm = (props) => {
  const { mode = ADD, param, location, match } = props;

  const [form] = Form.useForm();
  const [item, setItem] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const api = new CourseApi();
    if (mode === ADD) {
      setItem({ id: 0, name: "" });
    }
    if (mode === EDIT) {
      const { id } = param;
      api.get(parseInt(id)).then((response) => {
        setItem(response.data);
      });
    }
  }, [form, mode, param, props]);

  const handleChange = (item) => {
    setItem(item);
  };

  return (
    <>
      {item && (
        <div
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
                  {mode === "ADD" ? "Thêm mới Khóa học" : `${item.name}`}
                </h4>
                <div className="mb-3">
                  <Button
                    onClick={() => {
                      history.push(`/lms/modules/mystudies/courses`);
                    }}
                    className="mr-2"
                  >
                    <ArrowLeftOutlined />
                    &nbsp;Quay lại
                  </Button>
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Tabs
              defaultActiveKey="info"
              style={{ marginTop: 30 }}
              activeKey={param.tab ? param.tab : "info"}
              onChange={(key) => {
                history.push(
                  `/lms/modules/mystudies/courses/edit/${param.id}/${key}`
                );
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
              <TabPane tab="Nội dung" key="contents">
                <CourseContents param={param} />
              </TabPane>
              <TabPane tab="Thông báo" key="announcements">
                <CourseAnnouncements param={param} />
              </TabPane>
              <TabPane tab="Học viên" key="assignees">
                {item && (
                  <Assignees
                    {...props}
                    // param={param}
                    // courseId={param.id}
                  />
                )}
              </TabPane>
              <TabPane tab="Báo cáo" key="report">
                <ExamReport examId={param.id} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseForm;
