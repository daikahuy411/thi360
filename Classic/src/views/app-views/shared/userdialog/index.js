import React, { useState, useEffect } from "react";
import {
  Form, Row, Col, Select, Button, Drawer, Checkbox, Input,
  Pagination,
} from "antd";
import Flex from "components/shared-components/Flex";
import OrganizationApi from "api/organization-api";
import UserApi from "api/user-api";
import {
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Role, { getRoleName } from "enum/Role";

const { Search } = Input;
const { Option } = Select;

const UserDialog = (props) => {
  const [data, setData] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [orgId, setOrgId] = useState(0);
  const [keyWord, setKeyword] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [role, setRole] = useState(props.role != null ? props.role : '');

  const searchUsers = () => {
    new UserApi().searches({ OrganizationId: orgId, Roles: [role], Keyword: keyWord, Page: page }).then((response) => {
      setData(response.data.value);
      setTotalItems(response.data.totalItems);
    });
  };

  const getAllOrg = () => {
    var orgApi = new OrganizationApi();
    orgApi.getAll().then((response) => {
      setOrgs(response.data);
    });
  };

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  const onOK = () => {
    if (props.onOK) {
      props.onOK(selectedUsers);
    }
  };

  const handleSelectAll = (event) => {
    const selected = event.target.checked ? data.map((t) => t.id) : [];
    setSelectedData(selected);
    if (event.target.checked) {
      var newSelected = selectedUsers;
      newSelected.push(...data);
      setSelectedUsers(newSelected);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectOne = (event, user) => {
    const id = user.id;
    const selectedIndex = selectedData.indexOf(id);
    let newSelectedData = [];
    if (selectedIndex === -1) {
      newSelectedData = newSelectedData.concat(selectedData, id);
    } else if (selectedIndex === 0) {
      newSelectedData = newSelectedData.concat(selectedData.slice(1));
    } else if (selectedIndex === selectedData.length - 1) {
      newSelectedData = newSelectedData.concat(selectedData.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedData = newSelectedData.concat(
        selectedData.slice(0, selectedIndex),
        selectedData.slice(selectedIndex + 1)
      );
    }
    setSelectedData(newSelectedData);

    var newSelectedUsers = selectedUsers;
    if (selectedIndex === -1) {
      newSelectedUsers.push(user);
    }
    else {
      newSelectedUsers = newSelectedUsers.filter(x => x.id != id);
    }
    setSelectedUsers(newSelectedUsers);
  };

  useEffect(() => {
    searchUsers();
  }, [orgId, page, keyWord, role]);

  useEffect(() => {
    getAllOrg();
  }, []);

  return (
    <Drawer
      title={"Người dùng"}
      width={820}
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
            Đã chọn <b>{selectedData.length}</b> bản ghi
          </span>
          <Button
            disabled={selectedData.length === 0}
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
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={8}>
            <Search
              placeholder="Tìm kiếm"
              onSearch={(value) => setKeyword(value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={8}>
            {orgs && (
              <Select
                defaultValue="0"
                onChange={(value) => {
                  setOrgId(value);
                }}
                className="w-100"
                style={{ minWidth: 180 }}
                placeholder="Lớp"
              >
                <Option value="0">Tất cả Lớp</Option>
                {orgs.map((elm) => (
                  <Option key={elm.id} value={elm.id}>
                    {elm.name}
                  </Option>
                ))}
              </Select>
            )}
          </Col>
          {!props.roles && (
            <Col span={8}>
              <Select
                placeholder="Vai trò người dùng"
                value={role}
                style={{ width: "100%" }}
                onChange={(value) => setRole(value)}
              >
                <Option value={""}>Tất cả vai trò</Option>
                {Object.keys(Role).map((role) => (
                  <Option value={Role[role]}>{getRoleName(Role[role])}</Option>
                ))}
              </Select>
            </Col>
          )}
        </Row>
        <Row>
          <Col span={24}>
            <div className="table-responsive">
              <div className="ant-table">
                <div className="ant-table-container">
                  <div className="ant-table-content">
                    <table>
                      <thead className="ant-table-thead">
                        <tr>
                          <th className="ant-table-cell" style={{ width: 25 }}>
                            <Checkbox
                              checked={selectedData.length === data.length}
                              color="primary"
                              indeterminate={
                                selectedData.length > 0 &&
                                selectedData.length < data.length
                              }
                              onChange={handleSelectAll}
                            />
                          </th>
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
                          <th
                            className="ant-table-cell"
                            style={{ width: 120 }}
                          >
                            Đơn vị
                          </th>
                        </tr>
                      </thead>
                      <tbody className="ant-table-tbody">
                        {data.map((item, index) => {
                          return (
                            <tr
                              key={`tr-administrator-${item.id}`}
                              className="ant-table-row ant-table-row-level-0"
                            >
                              <td className="ant-table-cell ">
                                <Checkbox
                                  checked={
                                    selectedData.indexOf(item.id) !== -1
                                  }
                                  color="primary"
                                  onChange={(event) =>
                                    handleSelectOne(event, item)
                                  }
                                  value={selectedData.indexOf(item.id) !== -1}
                                />
                              </td>
                              <td className="ant-table-cell "
                                style={{ width: 25 }}
                              >
                                {index + 1}
                              </td>
                              <td className="ant-table-cell ">
                                {item.userName}
                                <br />
                                {item.fullName}
                                <br />
                                {item.email}
                              </td>
                              <td className="ant-table-cell ">
                                {item.organizationName}
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
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} alignItems="right" flex={"flex-end"}>
            <Pagination
              showSizeChanger={false}
              className="ant-table-pagination-right ant-table-pagination"
              total={totalItems}
              defaultCurrent={page}
              onChange={pageChanged}
              pageSize={20}
            />
          </Col>
        </Row>
      </Form>
    </Drawer >
  );
};

export default UserDialog;
