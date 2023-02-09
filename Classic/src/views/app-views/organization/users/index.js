import React, { useState, useEffect } from "react";
import { Card, Button, Menu, Modal, message, Row, Col } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import UserApi from "api/user-api";

const { confirm } = Modal;

const UserList = (props) => {
  let history = useHistory();
  const [item, setItem] = useState(null);
  const [data, setData] = useState(null);
  const [hasChanged, setHasChanged] = useState(false);

  const add = () => {
    setItem({ organizationId: props.organizationId });
  };

  const fetchData = () => {
    if (props.organizationId == 0) return;
    new UserApi()
      .searches({ organizationId: props.organizationId })
      .then((response) => {
        setData(response.data.value);
      });
  };

  useEffect(() => {
    fetchData();
  }, [props.organizationId]);

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item key={1}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Xem chi tiết</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => deleteRow(row)} key={3} danger>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const deleteRow = (row) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new UserApi().delete(row).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Row>
        <Col span={24} className={"mb-2"} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            size="small"
            onClick={() => add()}
            icon={<PlusOutlined />}
          >
            Tạo mới Quản trị viên
          </Button>
          &nbsp;
          <Button
            type="primary"
            size="small"
            onClick={() => add()}
            icon={<FolderOutlined />}
          >
            Chọn Quản trị viên
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card>
            {data && (
              <div className="table-responsive">
                <div className="ant-table">
                  <div className="ant-table-container">
                    <div className="ant-table-content">
                      <table>
                        <thead className="ant-table-thead">
                          <tr>
                            <th
                              className="ant-table-cell"
                              style={{ width: 25 }}
                            >
                              #
                            </th>
                            <th
                              className="ant-table-cell"
                              style={{ width: 240 }}
                            >
                              Tên đăng nhập
                            </th>
                            <th className="ant-table-cell">Tên đầy đủ</th>
                            <th
                              className="ant-table-cell"
                              style={{ width: 60 }}
                            ></th>
                          </tr>
                        </thead>
                        <tbody className="ant-table-tbody">
                          {data.map((item, index) => {
                            return (
                              <tr
                                className="ant-table-row ant-table-row-level-0"
                                key={`tr-user-row-${item.id}`}
                              >
                                <td className="ant-table-cell ">{index + 1}</td>
                                <td className="ant-table-cell ">
                                  {item.userName}
                                </td>
                                <td className="ant-table-cell ">{item.name}</td>
                                <td className="ant-table-cell ">
                                  <div className="text-right">
                                    <EllipsisDropdown
                                      menu={dropdownMenu(item)}
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserList;
