import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  Button,
  Row,
  Col,
  Input,
  Tree,
  Select,
  Card,
  Progress,
  Modal,
  Pagination,
  message,
  Empty,
  Menu,
} from "antd";
import { PlusOutlined, TeamOutlined } from "@ant-design/icons";
import {
  ClockCircleOutlined,
  ArrowRightOutlined,
  FolderOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import CourseApi from "api/course-api";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import { CourseCategoryApi } from "api/catalog-api";

const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;

const List = (props) => {
  let history = useHistory();

  const [data, setData] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [treeData, setTreeData] = useState(null);
  const [status, setStatus] = useState(-1);
  const [categoryId, setCategoryId] = useState(0);

  const onSelect = (selectedKeys, info) => {
    setPage(1);
    if (info.selectedNodes.length > 0) {
      setCategoryId(parseInt(info.selectedNodes[0].key));
    } else {
      setCategoryId(0);
    }
  };

  const deleteItem = (id) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new CourseApi().delete({ id: id }).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewItem(row.id)} key={1}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Sửa</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => deleteItem(row.id)} danger key={2}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  const viewItem = (id) => {
    history.push(`/lms/modules/mystudies/courses/edit/${id}/overview`);
  };

  const addItem = () => {
    history.push(`/lms/modules/mystudies/courses/add`);
  };

  useEffect(() => {
    CourseCategoryApi.getAll().then((response) => {
      setTreeData(response.data);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, keyword, categoryId, keyword, status]);

  const fetchData = () => {
    new CourseApi()
      .searches({
        Page: page,
        Limit: 10,
        Keyword: keyword,
        Status: status,
        CategoryId: categoryId,
      })
      .then((response) => {
        setData(response.data.value);
        setTotalItem(response.data.totalItems);
      });
  };

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center">
            <h4 style={{ marginBottom: 0 }}>Khóa học </h4>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="my-4 container-fluid">
        <Card bodyStyle={{ padding: 0 }}>
          <Row gutter={0}>
            <Col xs={24} sm={24} md={7}>
              <div style={{ width: "100%" }}>
                {treeData && treeData.length > 0 && (
                  <Tree
                    showIcon
                    className="draggable-tree"
                    autoExpandParent={true}
                    defaultExpandAll={true}
                    draggable={false}
                    blockNode
                    onSelect={onSelect}
                    treeData={treeData}
                  />
                )}
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={17}
              style={{ borderLeft: "1px solid rgb(230, 235, 241)" }}
            >
              <div className="p-4">
                <div className="container-fluid">
                  <Row>
                    <Col span={10}>
                      <Search
                        placeholder="Tìm kiếm"
                        onSearch={(value) => {
                          setPage(1);
                          setKeyword(value);
                        }}
                        style={{ width: 300 }}
                      />
                    </Col>
                    <Col span={8}>
                      <Select
                        placeholder="Chọn Trạng thái"
                        defaultValue={status}
                        className="w-100"
                        value={status}
                        name="status"
                        onChange={(value) => {
                          setPage(1);
                          setStatus(value);
                        }}
                      >
                        <Option value={-1}>Tất cả</Option>
                        <Option value={0}>Đang soạn thảo</Option>
                        <Option value={1}>Đang diễn ra</Option>
                        <Option value={2}>Kết thúc</Option>
                      </Select>
                    </Col>
                    <Col span={6} style={{ textAlign: "right" }}>
                      <Button onClick={() => addItem()} type="primary">
                        <PlusOutlined />
                        <span>Tạo mới</span>
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={24}>
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
                                            style={{ width: 25 }}
                                          >
                                            #
                                          </th>
                                          <th className="ant-table-cell">
                                            Tên khóa học
                                          </th>
                                          <th
                                            className="ant-table-cell"
                                            style={{ width: 100 }}
                                          >
                                            Lượt học
                                          </th>
                                          <th
                                            className="ant-table-cell"
                                            style={{ width: 100 }}
                                          >
                                            Học viên
                                          </th>
                                          <th
                                            className="ant-table-cell"
                                            style={{ width: 180 }}
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
                                          data.map((item, index) => {
                                            return (
                                              <tr
                                                className="ant-table-row"
                                                key={`tr-ans-question-${item.id}`}
                                              >
                                                <td className="ant-table-cell ">
                                                  {index + 1}
                                                </td>
                                                <td className="ant-table-cell ">
                                                  <div>
                                                    <div>
                                                      <FolderOutlined />
                                                      &nbsp;
                                                      <span className="text-muted">
                                                        {item.categoryName}
                                                      </span>
                                                    </div>
                                                    <div className="mb-0">
                                                      <Link
                                                        to={`/lms/modules/mystudies/courses/edit/${item.id}/overview`}
                                                        style={{ fontSize: 16 }}
                                                      >
                                                        [{item.id}]-{item.name}
                                                      </Link>
                                                    </div>
                                                    {item.isSpecificDuration && (
                                                      <div className="">
                                                        <ClockCircleOutlined />
                                                        &nbsp;
                                                        {moment(
                                                          item.startDate
                                                        ).format(
                                                          "YYYY-MM-DD HH:mm"
                                                        )}
                                                        &nbsp;
                                                        <ArrowRightOutlined />
                                                        &nbsp;
                                                        {moment(
                                                          item.endDate
                                                        ).format(
                                                          "YYYY-MM-DD HH:mm"
                                                        )}
                                                      </div>
                                                    )}
                                                    <div>
                                                      <span color="secondary">
                                                        {item.statusName}
                                                      </span>
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="ant-table-cell ">
                                                  {item.totalAttempt}
                                                </td>
                                                <td className="ant-table-cell ">
                                                  {item.totalUser}
                                                </td>
                                                <td className="ant-table-cell ">
                                                  {moment(
                                                    item.createdTime
                                                  ).format("YYYY-MM-DD HH:mm")}
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
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={6}>
                      <span color="secondary">
                        Tổng số {totalItem} bản ghi.
                      </span>
                    </Col>
                    <Col span={18} alignItems="right" flex={"flex-end"}>
                      <Pagination
                        showSizeChanger={false}
                        className="ant-table-pagination-right ant-table-pagination"
                        total={totalItem}
                        defaultCurrent={page}
                        onChange={pageChanged}
                        pageSize={10}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default List;
