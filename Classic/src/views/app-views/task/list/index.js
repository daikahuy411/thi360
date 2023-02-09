import { Space, Switch, Table } from "antd";
import React, { useState } from "react";
import {
  Card,
  Pagination,
  Form,
  Select,
  Radio,
  Tabs,
  Col,
  Row,
  Input,
  Modal,
  message,
  Button,
  Menu,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import TaskEdit from "../edit";

const { Search } = Input;
const { Option } = Select;

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const TaskList = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [stat, setStat] = useState(null);
  const [status, setStatus] = useState(0);
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState(0);

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  const onEdit = (id) => {
    setId(id);
    setEditing(true);
  };

  return (
    <>
      <Form
        id="frmTaskList"
        layout="vertical"
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom">
          <div className="container-fluid">
            <Flex justifyContent="between" alignItems="center">
              <h4 style={{ marginBottom: 0 }}>Công việc</h4>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="my-4 container-fluid">
          <Row>
            <Col span={18}>
              <Search
                placeholder="Tìm kiếm"
                onSearch={(value) => {
                  setPage(1);
                  setKeyword(value);
                }}
                style={{ width: 300 }}
              />
              &nbsp;
              <Select placeholder="Chọn loại việc" value={0} name="status">
                <Option value={0}>Tất cả loại việc</Option>
                <Option value={2}>Tôi xử lý</Option>
                <Option value={1}>Tôi giao</Option>
              </Select>
              &nbsp;
              <Select placeholder="Ưu tiên" value={0} name="status">
                <Option value={0}>Tất cả mức độ</Option>
                <Option value={2}>Thấp</Option>
                <Option value={1}>Trung bình</Option>
                <Option value={1}>Cao</Option>
              </Select>
            </Col>
            <Col span={6} style={{ textAlign: "right" }}>
              <Button onClick={() => onEdit()} type="primary">
                <PlusOutlined />
                <span>Tạo mới</span>
              </Button>
            </Col>
          </Row>
          <br />
          <Card bodyStyle={{ padding: 0 }}>
            <Row>
              <Col span={24}>
                <Tabs
                  marginBottom={0}
                  defaultActiveKey={0}
                  onChange={(value) => setStatus(value)}
                  style={{ marginBottom: 0 }}
                >
                  <Tabs.TabPane
                    tab={`Đang xử lý (${
                      stat != null ? stat.totalPending : "0"
                    })`}
                    key={0}
                    value={0}
                  ></Tabs.TabPane>
                  <Tabs.TabPane
                    tab={`Đã hoàn thành (${
                      stat != null ? stat.totalApproved : "0"
                    })`}
                    key={1}
                    value={1}
                  ></Tabs.TabPane>
                  <Tabs.TabPane
                    tab={`Quá hạn (${stat != null ? stat.totalRejected : "0"})`}
                    key={2}
                    value={2}
                  ></Tabs.TabPane>
                  <Tabs.TabPane
                    tab={`Tất cả (${stat != null ? stat.totalRejected : "0"})`}
                    key={-1}
                    value={-1}
                  ></Tabs.TabPane>
                </Tabs>
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={24}>
                <div className="ant-table">
                  <div className="ant-table-container">
                    <div className="ant-table-content">
                      <table style={{ tableLayout: "auto" }}>
                        <thead className="ant-table-thead">
                          <tr>
                            <th className="ant-table-cell ant-table-selection-column">
                              <div className="ant-table-selection">
                                <label className="ant-checkbox-wrapper">
                                  <span className="ant-checkbox">
                                    <input
                                      type="checkbox"
                                      className="ant-checkbox-input"
                                      value=""
                                    />
                                    <span className="ant-checkbox-inner"></span>
                                  </span>
                                </label>
                              </div>
                            </th>
                            <th className="ant-table-cell">Name</th>
                            <th className="ant-table-cell">Age</th>
                            <th className="ant-table-cell">Address</th>
                          </tr>
                        </thead>
                        <tbody className="ant-table-tbody">
                          <tr
                            data-row-key="1"
                            className="ant-table-row ant-table-row-level-0"
                          >
                            <td className="ant-table-cell ant-table-selection-column">
                              <label className="ant-checkbox-wrapper">
                                <span className="ant-checkbox">
                                  <input
                                    type="checkbox"
                                    className="ant-checkbox-input"
                                    value=""
                                  />
                                  <span className="ant-checkbox-inner"></span>
                                </span>
                              </label>
                            </td>
                            <td className="ant-table-cell ant-table-cell-with-append">
                              <span
                                className="ant-table-row-indent indent-level-0"
                                style={{ paddingLeft: 0 }}
                              ></span>
                              <button
                                type="button"
                                className="ant-table-row-expand-icon ant-table-row-expand-icon-expanded"
                                aria-label="Collapse row"
                              ></button>
                              John Brown sr.
                            </td>
                            <td className="ant-table-cell">60</td>
                            <td className="ant-table-cell">
                              New York No. 1 Lake Park
                            </td>
                          </tr>
                          <tr
                            data-row-key="11"
                            className="ant-table-row ant-table-row-level-1"
                          >
                            <td className="ant-table-cell ant-table-selection-column ant-table-cell-row-hover">
                              <label className="ant-checkbox-wrapper">
                                <span className="ant-checkbox">
                                  <input
                                    type="checkbox"
                                    className="ant-checkbox-input"
                                    value=""
                                  />
                                  <span className="ant-checkbox-inner"></span>
                                </span>
                              </label>
                            </td>
                            <td className="ant-table-cell ant-table-cell-with-append ant-table-cell-row-hover">
                              <span
                                className="ant-table-row-indent indent-level-1"
                                style={{ paddingLeft: 15 }}
                              ></span>
                              <button
                                type="button"
                                className="ant-table-row-expand-icon ant-table-row-expand-icon-spaced"
                                aria-label="Expand row"
                              ></button>
                              John Brown
                            </td>
                            <td className="ant-table-cell ant-table-cell-row-hover">
                              42
                            </td>
                            <td className="ant-table-cell ant-table-cell-row-hover">
                              New York No. 2 Lake Park
                            </td>
                          </tr>
                          <tr
                            data-row-key="12"
                            className="ant-table-row ant-table-row-level-1"
                          >
                            <td className="ant-table-cell ant-table-selection-column">
                              <label className="ant-checkbox-wrapper">
                                <span className="ant-checkbox">
                                  <input
                                    type="checkbox"
                                    className="ant-checkbox-input"
                                    value=""
                                  />
                                  <span className="ant-checkbox-inner"></span>
                                </span>
                              </label>
                            </td>
                            <td className="ant-table-cell ant-table-cell-with-append">
                              <span
                                className="ant-table-row-indent indent-level-1"
                                style={{ paddingLeft: 15 }}
                              ></span>
                              <button
                                type="button"
                                className="ant-table-row-expand-icon ant-table-row-expand-icon-expanded"
                                aria-label="Collapse row"
                              ></button>
                              John Brown jr.
                            </td>
                            <td className="ant-table-cell">30</td>
                            <td className="ant-table-cell">
                              New York No. 3 Lake Park
                            </td>
                          </tr>
                          <tr
                            data-row-key="121"
                            className="ant-table-row ant-table-row-level-2"
                          >
                            <td className="ant-table-cell ant-table-selection-column">
                              <label className="ant-checkbox-wrapper">
                                <span className="ant-checkbox">
                                  <input
                                    type="checkbox"
                                    className="ant-checkbox-input"
                                    value=""
                                  />
                                  <span className="ant-checkbox-inner"></span>
                                </span>
                              </label>
                            </td>
                            <td className="ant-table-cell ant-table-cell-with-append">
                              <span
                                className="ant-table-row-indent indent-level-2"
                                style={{ paddingLeft: 30 }}
                              ></span>
                              <button
                                type="button"
                                className="ant-table-row-expand-icon ant-table-row-expand-icon-spaced"
                                aria-label="Expand row"
                              ></button>
                              Jimmy Brown
                            </td>
                            <td className="ant-table-cell">16</td>
                            <td className="ant-table-cell">
                              New York No. 3 Lake Park
                            </td>
                          </tr>
                          <tr
                            data-row-key="13"
                            className="ant-table-row ant-table-row-level-1"
                          >
                            <td className="ant-table-cell ant-table-selection-column">
                              <label className="ant-checkbox-wrapper">
                                <span className="ant-checkbox">
                                  <input
                                    type="checkbox"
                                    className="ant-checkbox-input"
                                    value=""
                                  />
                                  <span className="ant-checkbox-inner"></span>
                                </span>
                              </label>
                            </td>
                            <td className="ant-table-cell ant-table-cell-with-append">
                              <span
                                className="ant-table-row-indent indent-level-1"
                                style={{ paddingLeft: 15 }}
                              ></span>
                              <button
                                type="button"
                                className="ant-table-row-expand-icon ant-table-row-expand-icon-expanded"
                                aria-label="Collapse row"
                              ></button>
                              Jim Green sr.
                            </td>
                            <td className="ant-table-cell">72</td>
                            <td className="ant-table-cell">
                              London No. 1 Lake Park
                            </td>
                          </tr>
                          <tr
                            data-row-key="131"
                            className="ant-table-row ant-table-row-level-2"
                          >
                            <td className="ant-table-cell ant-table-selection-column">
                              <label className="ant-checkbox-wrapper">
                                <span className="ant-checkbox">
                                  <input
                                    type="checkbox"
                                    className="ant-checkbox-input"
                                    value=""
                                  />
                                  <span className="ant-checkbox-inner"></span>
                                </span>
                              </label>
                            </td>
                            <td className="ant-table-cell ant-table-cell-with-append">
                              <span
                                className="ant-table-row-indent indent-level-2"
                                style={{ paddingLeft: 30 }}
                              ></span>
                              <button
                                type="button"
                                className="ant-table-row-expand-icon ant-table-row-expand-icon-expanded"
                                aria-label="Collapse row"
                              ></button>
                              Jim Green
                            </td>
                            <td className="ant-table-cell">42</td>
                            <td className="ant-table-cell">
                              London No. 2 Lake Park
                            </td>
                          </tr>
                          <tr
                            data-row-key="1311"
                            className="ant-table-row ant-table-row-level-3"
                          >
                            <td className="ant-table-cell ant-table-selection-column">
                              <label className="ant-checkbox-wrapper">
                                <span className="ant-checkbox">
                                  <input
                                    type="checkbox"
                                    className="ant-checkbox-input"
                                    value=""
                                  />
                                  <span className="ant-checkbox-inner"></span>
                                </span>
                              </label>
                            </td>
                            <td className="ant-table-cell ant-table-cell-with-append">
                              <span
                                className="ant-table-row-indent indent-level-3"
                                style={{ paddingLeft: 45 }}
                              ></span>
                              <button
                                type="button"
                                className="ant-table-row-expand-icon ant-table-row-expand-icon-spaced"
                                aria-label="Expand row"
                              ></button>
                              Jim Green jr.
                            </td>
                            <td className="ant-table-cell">25</td>
                            <td className="ant-table-cell">
                              London No. 3 Lake Park
                            </td>
                          </tr>
                          <tr
                            data-row-key="1312"
                            className="ant-table-row ant-table-row-level-3"
                          >
                            <td className="ant-table-cell ant-table-selection-column">
                              <label className="ant-checkbox-wrapper">
                                <span className="ant-checkbox">
                                  <input
                                    type="checkbox"
                                    className="ant-checkbox-input"
                                    value=""
                                  />
                                  <span className="ant-checkbox-inner"></span>
                                </span>
                              </label>
                            </td>
                            <td className="ant-table-cell ant-table-cell-with-append">
                              <span
                                className="ant-table-row-indent indent-level-3"
                                style={{ paddingLeft: 45 }}
                              ></span>
                              <button
                                type="button"
                                className="ant-table-row-expand-icon ant-table-row-expand-icon-spaced"
                                aria-label="Expand row"
                              ></button>
                              Jimmy Green sr.
                            </td>
                            <td className="ant-table-cell">18</td>
                            <td className="ant-table-cell">
                              London No. 4 Lake Park
                            </td>
                          </tr>
                          <tr
                            data-row-key="2"
                            className="ant-table-row ant-table-row-level-0"
                          >
                            <td className="ant-table-cell ant-table-selection-column">
                              <label className="ant-checkbox-wrapper">
                                <span className="ant-checkbox">
                                  <input
                                    type="checkbox"
                                    className="ant-checkbox-input"
                                    value=""
                                  />
                                  <span className="ant-checkbox-inner"></span>
                                </span>
                              </label>
                            </td>
                            <td className="ant-table-cell ant-table-cell-with-append">
                              <span
                                className="ant-table-row-indent indent-level-0"
                                style={{ paddingLeft: 0 }}
                              ></span>
                              <button
                                type="button"
                                className="ant-table-row-expand-icon ant-table-row-expand-icon-spaced"
                                aria-label="Expand row"
                              ></button>
                              Joe Black
                            </td>
                            <td className="ant-table-cell">32</td>
                            <td className="ant-table-cell">
                              Sidney No. 1 Lake Park
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
                  total={totalItem}
                  pageSize={1}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </Form>
      {editing && <TaskEdit onClose={() => setEditing(false)} id={id} />}
    </>
  );
};

export default TaskList;
