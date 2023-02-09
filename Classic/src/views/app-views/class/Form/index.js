import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import OrganizationApi from "api/organization-api";
import { useHistory } from "react-router-dom";
import UserList from "views/app-views/user/list";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AdminList from "../../organization/users";

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";
const EDIT = "EDIT";

const ClassForm = (props) => {
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [item, setItem] = useState({ id: 0, name: "", users: [] });
  const [classId, setClassId] = useState(0);

  let history = useHistory();

  useEffect(() => {
    const api = new OrganizationApi();
    if (mode === ADD) {
      const item = { id: 0, type: 2, name: "", users: [] };
      setItem(item);
    }
    if (mode === EDIT) {
      const { id } = param;
      setClassId(id);
      api.get(parseInt(id)).then((response) => {
        setItem(response.data);
      });
    }
  }, [form, mode, param, props]);

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl);
        setUploadLoading(true);
      });
    }
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
              {mode === "ADD" ? "Thêm mới Lớp học" : `${item.name}`}
            </h4>
            <div className="mb-3">
              <Button
                onClick={() => {
                  history.push(`/lms/modules/system/classes/list`);
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
            history.push(`/lms/modules/system/classes/edit/${param.id}/${key}`);
          }}
        >
          <TabPane tab="Thông tin chung" key="info">
            <GeneralField
              organziationId={classId}
              item={item}
              // handleFieldChange={handleFieldChange}
              uploadedImg={uploadedImg}
              uploadLoading={uploadLoading}
              handleUploadChange={handleUploadChange}
            />
          </TabPane>
          <TabPane tab="Học viên" key="users" disabled={item.id === 0}>
            <UserList organizationId={classId}  />
          </TabPane>
          <TabPane tab="Quản trị viên" key="administrators" disabled={item.id === 0}>
            <AdminList organizationId={classId}  />
          </TabPane>
        </Tabs>
      </div>
    </Form>
  );
};

export default ClassForm;
