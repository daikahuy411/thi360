import React, { useState, useEffect } from "react";
import { Card, Button, Menu, Form, Input } from "antd";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import { Collapse } from "antd";
import MetaDataApi from "api/meta-data-api";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";

const { Panel } = Collapse;

const Settings = (props) => {
  let history = useHistory();
  const [onEditing, setOnEditing] = useState(false);
  const [item, setItem] = useState(null);
  const [data, setData] = useState();
  const [hasChanged, setHasChanged] = useState(false);

  const editItem = (item) => {
    setOnEditing(true);
    setItem(item);
  };

  const add = () => {
    setItem({ organizationId: props.organizationId });
    setOnEditing(true);
  };

  const onEditClosed = () => {
    if (hasChanged) {
      fetchData();
      setHasChanged(false);
    }
    setOnEditing(false);
  };

  const onSaved = () => {
    setHasChanged(true);
  };

  const fetchData = () => {
    new MetaDataApi().getSetting().then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center">
            <h4 style={{ marginBottom: 0 }}>Cấu hình hệ thống</h4>
            <div>
              <Button onClick={() => add()} type="primary" className="ml-2">
                <span> Cập nhật</span>
              </Button>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="my-4 container-fluid">
        <Card>
          <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
            <Flex className="mb-1" mobileFlex={false}>
              <div className="mr-md-3 mb-3">
              </div>
              <div className="mb-3"></div>
            </Flex>
            <div>
            </div>
          </Flex>
          <Collapse bordered={false} defaultActiveKey={["1"]}>
            <Panel
              header="Thông tin chung"
              key="1"
              style={{ borderBottom: "none" }}
            >
              <Form name="basic" labelCol={{ span: 4 }}>
                <Form.Item label="Tiêu đề trang web">
                  <Input
                    name="name"
                    // value={item.name}
                    // onChange={handleFieldChange}
                  />
                </Form.Item>
                <Form.Item label="Mô tả trang web">
                  <Input.TextArea
                    name="description"
                    rows={2}
                    // value={item.description}
                    // onChange={handleFieldChange}
                  />
                </Form.Item>
              </Form>
            </Panel>
          </Collapse>
        </Card>
      </div>
    </>
  );
};

export default Settings;
