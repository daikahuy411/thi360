import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Menu,
  Pagination,
  Input,
  Row,
  Col,
  Tree,
  Modal,
  Select,
  message,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  FileExcelOutlined,
  HomeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import UserEdit from "../../user/edit";
import UserApi from "api/user-api";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import InnerAppLayout from "layouts/inner-app-layout";
import OrganizationApi from "api/organization-api";
import moment from "moment";
import Role, { getRoleName } from "enum/Role";
import UserImportDialog from "views/app-views/user/import";

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

const Users = (props) => {
  const [onEditing, setOnEditing] = useState(false);
  const [item, setItem] = useState(null);
  const [data, setData] = useState([]);
  const [orgId, setOrgId] = useState(0);
  const [treeData, setTreeData] = useState([]);
  const [mode, setMode] = useState("ADD");
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [keyWord, setKeyword] = useState("");
  const [role, setRole] = useState(props.role != null ? props.role : '');
  const [openImportExcelDialog, setOpenImportExcelDialog] = useState(false);
  const [isDayBoarding, setIsDayBoarding] = useState(-1);

  const fetchOrgs = () => {
    new OrganizationApi().searchesOrganizations().then((response) => {
      let treeNodes = [{ title: "Tất cả", key: 0 }];
      response.data.map((item) => {
        treeNodes.push(populateNode(item));
      });
      setTreeData(treeNodes);
    });
  };

  const populateNode = (node) => {
    var treeNode = {
      title: node.name,
      key: node.id,
      children: [],
    };
    if (node.isSite === true) {
      treeNode.icon = <HomeOutlined />;
    }
    if (node.children && node.children.length > 0) {
      node.children.map((item) => {
        treeNode.children.push(populateNode(item));
      });
    }
    return treeNode;
  };

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  const editItem = (item) => {
    setMode("EDIT");
    setItem(item);
    setOnEditing(true);
  };

  const add = () => {
    setItem({ organizationId: props.organizationId, hasPassword: true, id: '0' });
    setMode("ADD");
    setOnEditing(true);
  };

  const onEditClosed = () => {
    // if (hasChanged) {
    //   fetchData();
    //   setHasChanged(false);
    // }
    setOnEditing(false);
  };

  const onSaved = () => {
    // setHasChanged(true);
    fetchData();
  };

  const fetchData = () => {
    new UserApi().searches({ OrganizationId: orgId, isDayBoarding: isDayBoarding, Roles: [role], Keyword: keyWord, Page: page })
      .then((response) => {
        setData(response.data.value);
        setTotalItems(response.data.totalItems);
      });
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  useEffect(() => {
    fetchData();
  }, [orgId, page, keyWord, role, isDayBoarding]);

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

  const onSelectOrg = (selectedKeys, info) => {
    if (info.selectedNodes.length > 0) {
      setOrgId(info.selectedNodes[0].key);
    } else {
      setOrgId(0);
    }
  };

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center">
            <h4 style={{ marginBottom: 0 }}>Người dùng</h4>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="my-4 container-fluid">
        <Row gutter={16}>
          <Col span={6}>
            <Search
              placeholder="Tìm kiếm"
              onSearch={(value) => setKeyword(value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="Vai trò người dùng"
              value={role}
              style={{ width: "100%" }}
              onChange={(value) => setRole(value)}
            >
              <Option value={""}>Tất cả</Option>
              {Object.keys(Role).map((role) => (
                <Option value={Role[role]}>{getRoleName(Role[role])}</Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder=""
              value={isDayBoarding}
              style={{ width: "100%" }}
              onChange={(value) => setIsDayBoarding(value)}
            >
              <Option value={-1}>Tất cả</Option>
              <Option value={1}>Bán trú</Option>
              <Option value={0}>Ngoại trú</Option>
            </Select>
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>

            <Button
              type="primary"
              onClick={() => setOpenImportExcelDialog(true)}
              icon={<FileExcelOutlined />}
            >
              Import
            </Button>&nbsp;

            <Button onClick={() => add()} type="primary" className="ml-2">
              <PlusOutlined />
              <span>Thêm mới</span>
            </Button>
          </Col>
        </Row>
        <br />
        <InnerAppLayout
          sideContent={
            <div className="w-100" style={{ width: 500 }}>
              {treeData && treeData.length > 0 && (
                <Tree
                  autoExpandParent={true}
                  defaultExpandAll={false}
                  showIcon
                  className="draggable-tree"
                  draggable={false}
                  blockNode
                  onSelect={onSelectOrg}
                  treeData={treeData}
                />
              )}
            </div>
          }
          mainContent={
            <div className="p-4">
              <div className="container-fluid">
                <Row gutter={16}>
                  <Col span={24}>
                    <div className="pb-3 pt-3">Tổng số <b>{totalItems}</b> bản ghi.</div>
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
                                      <th
                                        className="ant-table-cell"
                                        style={{ width: 120 }}
                                      >
                                        Đơn vị
                                      </th>
                                      <th
                                        className="ant-table-cell"
                                        style={{ width: 120 }}
                                      >
                                        Ngày tạo
                                      </th>
                                      <th
                                        className="ant-table-cell"
                                        style={{ width: 80 }}
                                      >
                                        Thao tác
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
                                          <td className="ant-table-cell "
                                            style={{ width: 25 }}
                                          >
                                            {(page - 1) * 20 + index + 1}
                                          </td>
                                          <td className="ant-table-cell ">
                                            {item.userName}
                                            <br />
                                            {item.fullName}
                                            <br />
                                            {item.email}
                                            {item.isDayBoarding && (
                                              <span className="text-muted">Bán trú</span>
                                            )}
                                          </td>
                                          <td className="ant-table-cell ">
                                            {item.organizationName}
                                          </td>
                                          <td className="ant-table-cell ">
                                            {moment(item.createdTime).format(
                                              "YYYY-MM-DD"
                                            )}
                                          </td>
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
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          }
          sideContentWidth={500}
          sideContentGutter={false}
          border
        />
        {openImportExcelDialog && (
          <UserImportDialog onClose={() => setOpenImportExcelDialog(false)} />
        )}
        {onEditing && (
          <UserEdit
            item={item}
            onSaved={() => {
              onSaved();
            }}
            mode={mode}
            onClose={onEditClosed}
          />
        )}
      </div>
    </>
  );
};

export default Users;
