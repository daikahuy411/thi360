import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import LessonPlanApi from "api/lesson-plan-api";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Overview from "./Overview";
import CommentList from "../comments/list";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";
const PROCESS = "PROCESS";

const LessonPlanForm = (props) => {
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [item, setItem] = useState({ id: 0, name: "", users: [] });
  const [lessonPlanId, setLessonPlanId] = useState(0);

  let history = useHistory();

  useEffect(() => {
    const api = new LessonPlanApi();
    if (mode === ADD) {
      const item = { id: 0, type: 2, name: "", users: [] };
      setItem(item);
    }
    if (mode === EDIT || mode === PROCESS) {
      const { id } = param;
      setLessonPlanId(id);
      api.get(parseInt(id)).then((response) => {
        setItem(response.data);
      });
    }
  }, [form, mode, param, props]);

  const handleChange = (item) => {
    setItem(item);
  };

  return (
    <Form
      layout="vertical"
      form={form}
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
              {mode === "ADD" ? "Thêm mới Giáo án" : `${item.name}`}
            </h4>
            <div className="mb-3">
              <Button
                onClick={() => {
                  if (mode !== PROCESS) {
                    history.push(`/lms/modules/mylesson/lessonplans/myplans`);
                  } else {
                    history.push(`/lms/modules/mylesson/lessonplans/assignedplans`);
                  }
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
            if (mode !== PROCESS) {
              history.push(`/lms/modules/mylesson/lessonplans/edit/${param.id}/${key}`);
            } else {
              history.push(`/lms/modules/mylesson/lessonplans/process/${param.id}/${key}`);
            }
          }}
        >
          {mode !== ADD && (
            <TabPane tab="Tổng quan" key="overview">
              <Overview {...props} />
            </TabPane>
          )}
          {mode !== PROCESS && (
            <TabPane tab="Thông tin chung" key="info">
              <GeneralField
                mode={mode}
                organziationId={lessonPlanId}
                item={item}
              />
            </TabPane>
          )}
          {mode !== ADD && (
            <TabPane tab="Ý kiến" key="comment" disabled={item.id === 0}>
              <CommentList {...props} />
            </TabPane>)}
        </Tabs>
      </div>
    </Form>
  );
};

export default LessonPlanForm;
