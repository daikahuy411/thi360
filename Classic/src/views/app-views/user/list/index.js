import React, { useState, useEffect } from "react";
import { Card, Button, Menu, Modal, message, Row, Col } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  FileExcelOutlined,
  EditOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import UserEdit from "../edit";
import UserApi from "api/user-api";
import OrganizationApi from "api/organization-api";

const { confirm } = Modal;

const UserList = (props) => {
  let history = useHistory();
  const [onEditing, setOnEditing] = useState(false);
  const [item, setItem] = useState(null);
  const [data, setData] = useState(null);
  const [hasChanged, setHasChanged] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [userEditMode, setUserEditMode] = useState("ADD");

  const editItem = (item) => {
    setUserEditMode("EDIT");
    setOnEditing(true);
    setItem(item);
  };

  const add = () => {
    setUserEditMode("ADD");
    setItem({ organizationId: props.organizationId, organization: organization, hasPassword: true });
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
    fetchData();
  };

  const loadOrg = () => {
    if (props.organizationId == 0) return;
    new OrganizationApi().get(props.organizationId).then((response) => {
      setOrganization(response.data);
    });
  };

  const fetchData = () => {
    new UserApi()
      .searches({ organizationId: props.organizationId })
      .then((response) => {
        setData(response.data.value);
      });
  };

  useEffect(() => {
    loadOrg();
    fetchData();
  }, [props.organizationId]);

  const dropdownMenu = (row) => (
    <Menu>
      {/* <Menu.Item onClick={() => viewDetails(row)} key={1}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Xem chi tiết</span>
        </Flex>
      </Menu.Item> */}
      <Menu.Item onClick={() => editItem(row)} key={2}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Sửa</span>
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

  const viewDetails = (row) => {
    history.push(`/lms/questions/edit/${row.id}`);
  };

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
      onCancel() { },
    });
  };

  return (
    <>
      <div className="container">
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              onClick={() => add()}
              icon={<PlusOutlined />}
            >
              Thêm mới
            </Button>
          </Col>
        </Row>
        <br />
        <Card>
          {data && (
            <div className="table-responsive">
              <div className="ant-table">
                <div className="ant-table-container">
                  <div className="ant-table-content">
                    <table>
                      <thead className="ant-table-thead">
                        <tr>
                          <th className="ant-table-cell" style={{ width: 25 }}>
                            #
                          </th>
                          <th className="ant-table-cell" style={{ width: 240 }}>
                            {" "}
                            Tên đăng nhập
                          </th>
                          <th className="ant-table-cell">Tên đầy đủ</th>
                          <th className="ant-table-cell" style={{ width: 120 }}>
                            Giới tính
                          </th>
                          <th className="ant-table-cell" style={{ width: 180 }}>
                            Lớp
                          </th>
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
                              <td className="ant-table-cell ">{item.fullName}</td>
                              <td className="ant-table-cell ">{item.genderName}</td>
                              <td className="ant-table-cell ">
                                {item.organizationName}
                              </td>
                              <td className="ant-table-cell ">
                                <div className="text-right">
                                  <EllipsisDropdown menu={dropdownMenu(item)} />
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
      </div>
      {onEditing && (
        <UserEdit
          item={item}
          mode={userEditMode}
          onSaved={() => {
            onSaved();
          }}
          onClose={onEditClosed}
        />
      )}
    
    </>
  );
};

export default UserList;
