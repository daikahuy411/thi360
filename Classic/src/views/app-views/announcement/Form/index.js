import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import AnnouncementApi from "api/announcement-api";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const AnnouncementForm = (props) => {
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [item, setItem] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const api = new AnnouncementApi();
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

  const onFinish = () => {
    setSubmitLoading(true);
    new AnnouncementApi().save(item).then((response) => {
      setSubmitLoading(false);
      if (mode === ADD) {
        message.success(`Tạo mới thành công.`);
      }
      if (mode === EDIT) {
        message.success(`Cập nhật thành công.`);
      }
      history.push(`/lms/modules/myoffice/announcement/list/`);
    });
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
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h4 className="mb-3">
                {mode === "ADD" ? "Thêm mới thông báo" : `Sửa thông báo`}
              </h4>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => {
                    history.push(`/lms/modules/myoffice/announcement/list/`);
                  }}
                >
                  <ArrowLeftOutlined />
                  &nbsp;Quay lại
                </Button>
                <Button
                  type="primary"
                  loading={submitLoading}
                  onClick={() => onFinish()}
                  htmlType="submit"
                >
                  {mode === "ADD" ? "Thêm mới" : `Cập nhật`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="Thông tin chung" key="1">
              {item && <GeneralField handleChange={handleChange} item={item} />}
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default AnnouncementForm;
