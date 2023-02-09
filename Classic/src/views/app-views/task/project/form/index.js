import { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import ProjectApi from "api/project-api";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Overview from "./overview";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";
const PROCESS = "PROCESS";

const ProjectForm = (props) => {
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [item, setItem] = useState({ id: 0, name: "", users: [] });
  const [projectId, setProjectId] = useState(0);

  let history = useHistory();

  useEffect(() => {
    const api = new ProjectApi();
    if (mode === ADD) {
      const item = { id: 0, type: 2, name: "", users: [] };
      setItem(item);
    }
    if (mode === EDIT) {
      const { id } = param;
      setProjectId(id);
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
              {mode === "ADD" ? "Thêm mới Dự án" : `Dự án ${item.name}`}
            </h4>
            <div className="mb-3">
              <Button
                onClick={() => {
                    history.push(`/lms/modules/myoffice/task/project`);
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
            if (mode !== ADD) {
              history.push(`/lms/modules/myoffice/task/projects/edit/${param.id}/${key}`);
            }
          }}
        >
          {mode !== ADD && (
            <TabPane tab="Tổng quan" key="overview">
              <Overview item={item} />
            </TabPane>
          )}
          {mode !== PROCESS && (
            <TabPane tab="Thông tin chung" key="info">              
              <GeneralField
                mode={mode}
                item={item}
              />
            </TabPane>
          )}
        </Tabs>
      </div>
    </Form>
  );
};

export default ProjectForm;
