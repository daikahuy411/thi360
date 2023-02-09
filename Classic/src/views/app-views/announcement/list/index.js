import React, { useState, useEffect } from "react";
import {
  Card,
  Pagination,
  Form,
  Col,
  Row,
  Input,
  Modal,
  message,
  Button,
  Menu,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory, Link } from "react-router-dom";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import AnnouncementApi from "api/announcement-api";
import moment from "moment";

const { confirm } = Modal;
const { Search } = Input;

const AnnouncementList = (props) => {
  let history = useHistory();
  const [data, setData] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => edit(row)} key={1}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Sửa</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => remove(row)} danger key={2}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const remove = (row) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new AnnouncementApi().delete(row).then((response) => {
          message.success("Xóa thành công.");
          searches();
        });
      },
      onCancel() {},
    });
  };

  const add = () => {
    history.push(`/lms/modules/myoffice/announcement/add`);
  };

  const edit = (row) => {
    history.push(`/lms/modules/myoffice/announcement/edit/${row.id}/`);
  };

  const searches = () => {
    var api = new AnnouncementApi();
    api.searches().then((response) => {
      setData(response.data);
      setTotalItem(response.data.totalItems);
    });
  };

  useEffect(() => {
    searches();
  }, [page, keyword]);

  return (
    <>
      <Form
        layout="vertical"
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom">
          <div className="container-fluid">
            <Flex justifyContent="between" alignItems="center">
              <h4 style={{ marginBottom: 0 }}>Thông báo </h4>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="my-4 container-fluid">
          <Row>
            <Col span={8}>
              <Search
                placeholder="Tìm kiếm"
                onSearch={(value) => {
                  setPage(1);
                  setKeyword(value);
                }}
                style={{ width: 300 }}
              />
            </Col>
            <Col span={16} style={{ textAlign: "right" }}>
              <Button onClick={() => add()} type="primary">
                <PlusOutlined />
                <span>Tạo mới</span>
              </Button>
            </Col>
          </Row>
          <br />
          <Card bodyStyle={{ padding: 0 }}>
            <Row gutter={16}>
              <Col span={24}>
                <div className="table-responsive">
                  <div className="ant-table">
                    <div className="ant-table-container">
                      <div className="ant-table-content">
                        <table>
                          <thead className="ant-table-thead">
                            <tr>
                              <th
                                className="ant-table-cell"
                                style={{ width: 50 }}
                              >
                                #
                              </th>
                              <th className="ant-table-cell">Tiêu đề</th>
                              <th
                                className="ant-table-cell"
                                style={{ width: 120 }}
                              >
                                Kích hoạt
                              </th>
                              <th
                                className="ant-table-cell"
                                style={{ width: 210 }}
                              >
                                Ngày tạo
                              </th>
                              <th
                                className="ant-table-cell"
                                style={{ width: 60 }}
                              ></th>
                            </tr>
                          </thead>
                          <tbody className="ant-table-tbody">
                            {data &&
                              data.map((announcement, index) => {
                                return (
                                  <tr
                                    className="ant-table-row"
                                    key={`tr-ans-question-${announcement.id}`}
                                  >
                                    <td className="ant-table-cell ">
                                      {index + 1}
                                    </td>
                                    <td className="ant-table-cell ">
                                      <Link
                                        to={`/lms/modules/myoffice/announcement/edit/${announcement.id}/`}
                                      >
                                        {announcement.name}
                                      </Link>
                                    </td>
                                    <td className="ant-table-cell ">
                                      {announcement.enabled && (
                                        <span className="text-muted">Có</span>
                                      )}
                                      {!announcement.enabled && (
                                        <span className="text-muted">
                                          Không
                                        </span>
                                      )}
                                    </td>
                                    <td className="ant-table-cell ">
                                      {moment(announcement.createdTime).format(
                                        "YYYY-MM-DD HH:mm"
                                      )}
                                    </td>
                                    <td className="ant-table-cell ">
                                      <div className="text-right">
                                        <EllipsisDropdown
                                          menu={dropdownMenu(announcement)}
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
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24} alignItems="right" flex={"flex-end"}>
                <Pagination
                  showSizeChanger={false}
                  pageChanged={pageChanged}
                  className="ant-table-pagination-right ant-table-pagination"
                  total={totalItem}
                  pageSize={1}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </Form>
    </>
  );
};

export default AnnouncementList;
