import React, { useState, useEffect } from "react";
import { Form, Row, Col, Select, Input, Button, Drawer, Tree } from "antd";
import OrganizationApi from "api/organization-api";

const OrganizationSelector = (props) => {
  const [data, setData] = useState(null);
  const [checkedKeys, setCheckedKeys] = useState([]);

  const fetchData = () => {
    new OrganizationApi().getOrganizationTree().then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };

  const onOK = () => {
    if (props.onOK) {
      props.onOK(checkedKeys);
    }
  };

  return (
    <>
      <Drawer
        title={"Đơn vị"}
        width={620}
        onClose={props.onClose}
        visible={true}
        bodyStyle={{ paddingBottom: 0 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <span style={{ marginRight: 10 }}>
              Đã chọn <b>{checkedKeys.length}</b> bản ghi
            </span>
            <Button
              disabled={checkedKeys.length === 0}
              onClick={onOK}
              style={{ marginRight: 8 }}
              type="primary"
              color="primary"
            >
              Đồng ý
            </Button>
          </div>
        }
      >
        <Row>
          <Col span={24}>
            {data && (
              <Tree
                style={{ width: "100%" }}
                treeData={data}
                checkable
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                className="w-100"
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="Chọn Đơn vị"
                allowClear
                treeDefaultExpandAll
              ></Tree>
            )}
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default OrganizationSelector;
