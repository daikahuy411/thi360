import { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  Button,
  Row,
  Col,
  Modal,
  Pagination,
  message,
  Menu,
  Card,
  Empty,
  Input,
} from "antd";
import {
  PlusOutlined,
  BranchesOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import DocumentApi from "api/document-api";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Filter from "../filter";
import authService from "services/authService";
import Role from "enum/Role";

const { confirm } = Modal;
const { Search } = Input;

const DocumentManageList = () => {
  let history = useHistory();
  const [data, setData] = useState(null);
  const [keyWord, setKeyword] = useState("");
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    keyWord: "",
    organizationCatalogId: 0,
    topicCatalogId: 0,
    areaCatalogId: 0,
    positionCatalogId: 0,
  });
  const [openAdvanceSearch, setOpenAdvanceSearch] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const dropdownMenu = (item) => (
    <Menu>
      <Menu.Item key="1" onClick={() => permissions(item.id)}>
        <BranchesOutlined />
        <span className="ml-2">Phân quyền</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => overview(item.id)}>
        <EyeOutlined />
        <span className="ml-2">Xem chi tiết</span>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => edit(item.id)}>
        <EditOutlined />
        <span className="ml-2">Chỉnh sửa</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" onClick={() => deleteItem(item.id)} danger>
        <DeleteOutlined />
        <span className="ml-2">Xóa</span>
      </Menu.Item>
    </Menu>
  );

  const deleteItem = (id) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new DocumentApi().delete({ id: id }).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  const fetchData = () => {
    new DocumentApi()
      .getDocument(
        keyWord,
        page,
        limit,
        filters.documentType >= 0 ? filters.documentType : null,
        //filters.documentType,
        filters.organizationCatalogId,
        filters.topicCatalogId,
        filters.areaCatalogId,
        filters.positionCatalogId
      )
      .then((response) => {
        setData(response.data.value);
        setTotalItem(response.data.totalItems);
      });
  };

  const permissions = (id) => {
    history.push(`/lms/modules/myoffice/document/edit/${id}/permissions`);
  };

  const overview = (id) => {
    history.push(`/lms/modules/myoffice/document/edit/${id}/overview`);
  };

  const edit = (id) => {
    history.push(`/lms/modules/myoffice/document/edit/${id}/info`);
  };

  const add = () => {
    history.push(`/lms/modules/myoffice/document/add`);
  };

  useEffect(() => {
    fetchData();
  }, [keyWord, filters, page]);

  const changeKeyword = (value) => {
    setKeyword(value);
    const currentFilters = Object.assign({}, filters);
    currentFilters["keyWord"] = value;
    setFilters({ ...currentFilters });
  };

  const advanceSearch = () => {
    setOpenAdvanceSearch(true);
  };

  useEffect(() => {
    var userProfile = authService.getUserProfile();
    if (Object.keys(userProfile).length === 0) {
      authService.logout();
      return;
    }
    setUserProfile(userProfile);
  }, []);

  const hasAddPermission = () => {
    const accessRoles = [Role.ADMINISTRATOR, Role.EDITOR];
    return (
      accessRoles.filter((value) => userProfile.roles.includes(value)).length >
      0
    );
  };

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center">
            <h4 style={{ marginBottom: 0 }}>Văn bản</h4>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className={`my-2 container-fluid`}>
        <Row gutter={16}>
          <Col span={8}>
            <Search
              placeholder="Tìm kiếm"
              onSearch={(value) => changeKeyword(value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={4}></Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button className="ml-2" onClick={() => advanceSearch()}>
              <FilterOutlined />
              <span>Tìm kiếm nâng cao</span>
            </Button>
            {hasAddPermission && (
              <>
                &nbsp;
                <Button type="primary" className="ml-2" onClick={() => add()}>
                  <PlusOutlined />
                  <span>Thêm mới</span>
                </Button>
              </>
            )}
          </Col>
        </Row>
        <Card className={`my-2`} bodyStyle={{ padding: 0 }}>
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
                          <th className="ant-table-cell" style={{ width: 120 }}>
                            {" "}
                            Số hiệu{" "}
                          </th>
                          <th className="ant-table-cell" style={{ width: 120 }}>
                            {" "}
                            Loại VB{" "}
                          </th>
                          <th className="ant-table-cell"> Trích yếu </th>
                          <th className="ant-table-cell" style={{ width: 210 }}>
                            {" "}
                            Chủ đề{" "}
                          </th>
                          <th className="ant-table-cell" style={{ width: 210 }}>
                            {" "}
                            Lĩnh vực{" "}
                          </th>
                          <th className="ant-table-cell" style={{ width: 180 }}>
                            {" "}
                            Người ký{" "}
                          </th>
                          <th className="ant-table-cell" style={{ width: 210 }}>
                            Ngày ban hành
                          </th>
                          <th className="ant-table-cell" style={{ width: 90 }}>
                            {" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="ant-table-tbody">
                        {data.map((item, index) => {
                          return (
                            <tr
                              className="ant-table-row ant-table-row-level-0"
                              key={`tr-plan-lesson-row-${index}`}
                            >
                              <td className="ant-table-cell ">
                                {index + 1 + (page - 1) * limit}
                              </td>
                              <td className="ant-table-cell ">
                                {item.documentCode}
                              </td>
                              <td className="ant-table-cell ">
                                {item.documentTypeName}
                              </td>
                              <td className="ant-table-cell ">
                                <a onClick={() => overview(item.id)}>{item.summary}</a>
                                <div>
                                  <span className="text-muted">
                                    {item.documentStatusName}
                                  </span>
                                </div>
                              </td>
                              <td className="ant-table-cell ">
                                {item.topicName}
                              </td>
                              <td className="ant-table-cell ">
                                {item.areaName}
                              </td>
                              <td className="ant-table-cell ">
                                {item.signer} - {item.positionName}
                              </td>
                              <td className="ant-table-cell ">
                                {moment(item.issuedDate).format(
                                  "DD-MM-YYYY HH:mm"
                                )}
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
        {(!data || data.length === 0) && (
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={24} xl={24} xxl={24}>
              <Empty
                description={"Hiện tại chưa có dữ liệu..."}
                style={{ marginTop: 50 }}
              />
            </Col>
          </Row>
        )}
        {totalItem > 0 && (
          <Row gutter={16}>
            <Col span={24} alignItems="right" flex={"flex-end"}>
              <Pagination
                showSizeChanger={false}
                className="ant-table-pagination-right ant-table-pagination"
                total={totalItem}
                defaultCurrent={page}
                onChange={pageChanged}
                pageSize={limit}
              />
            </Col>
          </Row>
        )}
        {openAdvanceSearch && (
          <Filter
            filters={filters}
            onOK={(filters) => {
              setFilters(filters);
              setOpenAdvanceSearch(false);
            }}
            onClose={() => {
              setOpenAdvanceSearch(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default DocumentManageList;
